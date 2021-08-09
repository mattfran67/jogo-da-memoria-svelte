<script>
  import { createEventDispatcher, onDestroy } from "svelte";

  let tempo = 0;
  let intervalo;

  const dispatch = createEventDispatcher();

  export function iniciar() {
    intervalo = setInterval(() => tempo++, 1000);
  }

  export function parar() {
    clearInterval(intervalo);
    dispatch('tempo', {tempo});
    tempo = 0;
  }

  onDestroy(() => {
    clearInterval(intervalo);
  });
</script>

<span>Tempo: {tempo}</span>

<style>
</style>