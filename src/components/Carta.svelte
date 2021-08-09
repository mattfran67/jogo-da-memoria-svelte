<script>
  export let virada;
  export let valor;

  const icones = [
  'face','favorite',
  'lock','lightbulb',
  'pets','savings',
  'book','stars',
  'anchor','build',
  'explore','hourglass_empty'
];
</script>

<div class:virada on:click>
  <span class="material-icons">{icones[valor]}</span>
</div>

<style>
  div {
		width: 50px;
		height: 50px;
		border: 1px solid;
		display: flex;
		justify-content: center;
		align-items: center;
		background: black;
		color: black;
		cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
	}
	
	div.virada {
		background: white;
	}
</style>