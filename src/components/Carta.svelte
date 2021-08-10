<script>
  export let virada;
  export let valor;
  export let completa;

  const icones = [
  'face','favorite',
  'lock','lightbulb',
  'pets','savings',
  'book','stars',
  'anchor','build',
  'explore','hourglass_empty'
];
</script>

<div class:virada class="carta" on:click>
  <div class="lado">
    <span class="material-icons">star</span>
  </div>
  <div class:completa class="lado">
    <span class="material-icons">{icones[valor]}</span>
  </div>
</div>

<style>
  .carta {
    padding-top: 100%;
    color: #AC2EE8;
    background-color: white;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    position: relative;
    transform-style: preserve-3d;
    transition: all 1s;
    box-shadow: 0 0 5px 3px rgb(0 0 0 / 20%);
	}

  .carta .completa {
    color: #ccc;
  }

  .carta, .lado {
    border-radius: .5rem;
  }

  .carta .lado {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carta .lado:first-child {
    background-color: #AC2EE8;
    color: white;
  }

  .carta .lado:first-child span {
    background-color: inherit;
  }

  .lado:last-child, .virada {
    transform: rotateY(180deg);
  }

  span.material-icons {
    font-size: 5rem;
  }
</style>