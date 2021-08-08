export default function arrayAleatorio(array) {
  let arrayTamanho = array.length;
  let arrayFinal = [];
  
  let posicaoAletoria;
  let valorAleatorio;
  for (let i = 0; i < arrayTamanho; i++) {
    posicaoAletoria = Math.floor(Math.random() * array.length);
    valorAleatorio = array[posicaoAletoria];
    
    arrayFinal.push(valorAleatorio);
    array.splice(posicaoAletoria, 1);
  }
  
  return arrayFinal;
}