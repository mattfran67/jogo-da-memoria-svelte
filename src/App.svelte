<script>
	import { afterUpdate } from 'svelte';
	
	let viradas;
	let cartas = [
		{valor: 1, virada: false, completa: false},
		{valor: 2, virada: false, completa: false},
		{valor: 3, virada: false, completa: false}
	];
	
	cartas = cartas.concat(cartas);
	
	afterUpdate(() => {
		console.log('ola')
		viradas = verificaViradas(cartas);
		if (viradas) {
			setTimeout(() => cartas = viradas, 2000);
		}
	});
	
	function verificaViradas(array) {
		const cartasNaoCompletas = array.filter(({ completa }) => !completa);
		const cartasViradas = cartasNaoCompletas.filter(({ virada }) => virada);

		if (cartasViradas.length < 2) return;

		let novoArray;
		if (cartasViradas[0].valor !== cartasViradas[1].valor) {
			novoArray = array.map(valor => {
				if (valor.virada && !valor.completa) {
					return {...valor, virada: false };
				}
				return valor;
			});

			return novoArray;
		}
	}
	
	function verificaPares(array) {
		const cartasNaoCompletas = array.filter(({ completa }) => !completa);
		const cartasViradas = cartasNaoCompletas.filter(({ virada }) => virada);

		if (cartasViradas.length < 2) return array;

		let novoArray;
		if (cartasViradas[0].valor === cartasViradas[1].valor) {
			novoArray = array.map(valor => {
				if (valor.virada && !valor.completa) {
					return {...valor, completa: true };
				}
				return valor;
			});
			return novoArray;
		} else {
			return array;
		}
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

<div class="flex">
	{#each cartas as carta, i}
		<div class:virada={carta.virada} on:click={() => virarCarta(i, carta)}>{carta.valor}</div>
	{/each}
</div>


<style>
	.flex {
		display: flex;
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