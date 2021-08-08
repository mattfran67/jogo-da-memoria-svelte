export default function verificaViradas(array) {
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