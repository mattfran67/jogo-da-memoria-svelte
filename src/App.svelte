<script>
	import { afterUpdate } from 'svelte';
	import Carta from './components/Carta.svelte';

	import verificaViradas from './utils/verificaViradas';
	import verificaPares from './utils/verificaPares';
	import embaralhaCartas from './utils/embaralhaCartas';
	
	let viradas;
	let cartasBase = Array(12)
		.fill(null)
		.map((_, index) => ({
			valor: index,
			virada: false,
			completa: false
		}));
	
	let cartas = embaralhaCartas(cartasBase, 3);
	
	afterUpdate(() => {
		viradas = verificaViradas(cartas);
		if (viradas) {
			setTimeout(() => cartas = viradas, 2000);
		}
	});

	function mudarQtdePares({ target }) {
		const valor = Number(target.value);
		cartas = embaralhaCartas(cartasBase, valor);
	}
	
	function virarCarta(index, carta) {
		if (viradas || carta.virada) return;
		const novasCartas = cartas.map((carta, i) => {
			if (i === index) {
				return {...carta, virada: true};
			}
			return carta;
		});
		cartas = verificaPares(novasCartas);
	}
</script>

<select on:change={mudarQtdePares} disabled={viradas}>
	<option value="3">3 Pares</option>
	<option value="6">6 Pares</option>
	<option value="12">12 Pares</option>
</select>

<div class="flex">
	{#each cartas as carta, i}
		<Carta
			virada={carta.virada}
			valor={carta.valor}
			on:click={() => virarCarta(i, carta)}
		/>
	{/each}
</div>

{#if cartas.length > 1 && cartas.every(carta => carta.completa)}
	<p>Parabens você ganhou!!</p>
{/if}

<style>
	.flex {
		width: 310px;
		display: flex;
		flex-wrap: wrap;
		gap: 2px
	}
</style>