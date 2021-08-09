<script>
  import { createEventDispatcher } from "svelte";

  let valor;
  const dispatch = createEventDispatcher();

  function selecionar() {
    dispatch('selecionar', { valor });
  }
</script>

<div class="modal-fundo">
  <div>
    <slot></slot>
    <select bind:value={valor}>
      <option value="3">3 Pares</option>
      <option value="6">6 Pares</option>
      <option value="12">12 Pares</option>
    </select>
    <button on:click={selecionar}>Começar</button>
  </div>
</div>

<style>
  .modal-fundo {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: blueviolet;
  }

  .modal-fundo > div {
    background: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  } 
</style>