export default function verificaPares(array) {
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