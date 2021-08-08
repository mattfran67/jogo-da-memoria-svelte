import arrayAleatorio from "./arrayAleatorio";

export default function embaralhaCartas(array, valor) {
  const novasCartas = array.slice(0, valor);
  const cartasEmbaralhadas = arrayAleatorio(novasCartas.concat(novasCartas));
  
  return cartasEmbaralhadas;
}