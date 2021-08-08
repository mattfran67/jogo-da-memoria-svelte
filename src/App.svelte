<script>
	import { afterUpdate } from 'svelte';
	import verificaViradas from './utils/verificaViradas';
	import verificaPares from './utils/verificaPares';
	
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