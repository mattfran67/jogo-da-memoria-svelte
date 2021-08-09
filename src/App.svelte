<script>
	import { afterUpdate } from 'svelte';
	import Carta from './components/Carta.svelte';
	import Modal from './components/Modal.svelte';

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
	
	let cartas = [];
	
	afterUpdate(() => {
		viradas = verificaViradas(cartas);
		if (viradas) {
			setTimeout(() => cartas = viradas, 2000);
		}
	});

	function mudarQtdePares({ detail }) {
		const valor = Number(detail.valor);
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

{#if cartas.length}
	<div class="flex">
		{#each cartas as carta, i}
		<Carta
		virada={carta.virada}
		valor={carta.valor}
		on:click={() => virarCarta(i, carta)}
		/>
		{/each}
	</div>

	{#if cartas.every(carta => carta.completa)}
		<Modal on:selecionar={mudarQtdePares}>
			<p>Parabens você ganhou!!</p>
		</Modal>
	{/if}
{:else}
	<Modal on:selecionar={mudarQtdePares}/>
{/if}

<style>
	.flex {
		width: 310px;
		display: flex;
		flex-wrap: wrap;
		gap: 2px
	}
</style>