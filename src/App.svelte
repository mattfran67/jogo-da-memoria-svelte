<script>
	import { afterUpdate } from 'svelte';
	import Carta from './components/Carta.svelte';
	import Modal from './components/Modal.svelte';
	import Contador from './components/Contador.svelte';

	import verificaViradas from './utils/verificaViradas';
	import verificaPares from './utils/verificaPares';
	import embaralhaCartas from './utils/embaralhaCartas';

	let fimDeJogo;
	let tempoDeJogo;
	let contador;
	let viradas;

	let cartasBase = Array(12)
		.fill(null)
		.map((_, index) => ({
			valor: index,
			virada: false,
			completa: false
		}));
	
	let cartas = [];

	$: if (cartas.length && cartas.every(({completa}) => completa)) {
		fimDeJogo = true;
		contador.parar();
	}
	
	afterUpdate(() => {
		viradas = verificaViradas(cartas);
		if (viradas) {
			setTimeout(() => cartas = viradas, 2000);
		}
	});

	function pegarTempo({ detail }) {
		tempoDeJogo = detail.tempo;
	}
 
	function mudarQtdePares({ detail }) {
		const valor = Number(detail.valor);
		cartas = embaralhaCartas(cartasBase, valor);
		fimDeJogo = false;
		contador.iniciar();
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

<div>
	<Contador bind:this={contador} on:tempo={pegarTempo} />
	<div class="flex">
		{#each cartas as carta, i}
			<Carta
				virada={carta.virada}
				valor={carta.valor}
				on:click={() => virarCarta(i, carta)}
			/>
		{/each}
	</div>
</div>

{#if fimDeJogo}
	<Modal on:selecionar={mudarQtdePares}>
		<div>✨Parabéns você conseguiu!!✨</div>
		<div>Tempo: {tempoDeJogo}</div>
	</Modal>
{/if}

{#if !cartas.length}
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