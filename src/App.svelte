<script>
	import { afterUpdate } from 'svelte';
	import verificaViradas from './utils/verificaViradas';
	import verificaPares from './utils/verificaPares';
	
	let viradas;
	let cartasBase = Array(12)
		.fill(null)
		.map((_, index) => ({
			valor: index,
			virada: false,
			completa: false
		}));
	
	let cartas = [];
	
	afterUpdate(() => {
		viradas = verificaViradas(cartas);
		if (viradas) {
			setTimeout(() => cartas = viradas, 2000);
		}
	});

	function mudarQtdePares({ target }) {
		const valor = Number(target.value);
		const novasCartas = cartasBase.slice(0, valor);
		cartas = novasCartas.concat(novasCartas);
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

<select on:change={mudarQtdePares}>
	<option value="3">3 Pares</option>
	<option value="6">6 Pares</option>
	<option value="12">12 Pares</option>
</select>

<div class="flex">
	{#each cartas as carta, i}
		<div class:virada={carta.virada} on:click={() => virarCarta(i, carta)}>{carta.valor}</div>
	{:else}
		<p>Insira a quantidade de pares</p>
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
	
	.flex div {
		width: 50px;
		height: 50px;
		border: 1px solid;
		display: flex;
		justify-content: center;
		align-items: center;
		background: black;
		color: black;
		cursor: pointer;
	}
	
	div.virada {
		background: white;
	}
</style>