<script>
	import { afterUpdate } from 'svelte';
	import Carta from './components/Carta.svelte';
	import Modal from './components/Modal.svelte';
	import Contador from './components/Contador.svelte';

	import verificaViradas from './utils/verificaViradas';
	import verificaPares from './utils/verificaPares';
	import embaralhaCartas from './utils/embaralhaCartas';

	const tempoVirar = 1500;
	let fimDeJogo = false;
	let tempoDeJogo = 0;
	let contador = 0;
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
		setTimeout(() => {
			fimDeJogo = true
			contador.parar();
			cartas = [];
		}, tempoVirar);
	}
	
	afterUpdate(() => {
		viradas = verificaViradas(cartas);
		if (viradas) {
			setTimeout(() => cartas = viradas, tempoVirar);
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

<div class="conteudo">
	<div class="aba">
		<Contador bind:this={contador} on:tempo={pegarTempo} />
		<span>{cartas.length / 2} Pares</span>
	</div>
	<div class="grade">
		{#each cartas as carta, i}
			<Carta
				virada={carta.virada}
				valor={carta.valor}
				completa={carta.completa}
				on:click={() => virarCarta(i, carta)}
			/>
		{/each}
	</div>
</div>

{#if fimDeJogo}
	<Modal on:selecionar={mudarQtdePares}>
		<div class="vitoria">
			<div>✨Parabéns você conseguiu!!✨</div>
			<div>Tempo: {tempoDeJogo} segundos</div>
		</div>
	</Modal>
{/if}

{#if !cartas.length && !fimDeJogo}
	<Modal on:selecionar={mudarQtdePares}>
		<div class="titulo">Jogo da Memoria</div>
	</Modal>
{/if}

<style>
	.grade {
		display: grid;
    grid-template-columns: repeat(6, 100px);
    gap: 2px;
    background: white;
    padding: .5rem;
    box-shadow: 0 -8px 5px 0px rgb(0 0 0 / 10%);
	}

	.grade, .aba, .conteudo {
		border-radius: .5rem;
	}

	.titulo {
		text-transform: uppercase;
		font-size: 1.5rem;
		letter-spacing: 2px;
		font-weight: 300;
		color: #777;
		margin-bottom: .6rem;
	}

	.conteudo {
    position: relative;
    background: #913DAE;
    box-shadow: 0 0 11px 9px rgb(0 0 0 / 10%);
	}

	.aba {
		display: flex;
    justify-content: space-between;
    padding: 5px 8px;
    color: white;
		font-size: 1.5rem;
	}

	@media (max-width: 600px) {
		.grade {
			grid-template-columns: repeat(4, minmax(50px, 100px));
		}
		.vitoria {
			font-size: 1.2rem;
		}
	}
</style>