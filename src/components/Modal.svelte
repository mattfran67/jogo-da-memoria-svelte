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
    background-image: linear-gradient(45deg, #913DAE, #9B50E7);
  }
  
  .modal-fundo > div {
    font-size: 1.2rem;
    background: white;
    display: flex;
    flex: 0 1 400px;
    flex-direction: column;
    border-radius: .5rem;
    text-align: center;
    padding: 1rem;
    box-shadow: 0 0 9px 4px rgb(0 0 0 / 20%);
  }
</style>