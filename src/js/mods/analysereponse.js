import { ComputeEngine } from '../libs/compute-engine/compute-engine.esm.js';
const ce = new ComputeEngine()

function analyseReponse (goodAnswer, userAnswer, typeOfAnswer = false) {
  // on utilise dfrac pour l'affichage des fractions
  if(typeof goodAnswer === "string") {
    goodAnswer = goodAnswer.replace('dfrac', 'frac');
  }
  if (typeof userAnswer === "string") {
      // suppression des &
      userAnswer = userAnswer.replace(/\&amp\;/g, "&");
      // suppression du displaystyle
      userAnswer = userAnswer.replace(/\\displaystyle/g, "");
      // remplacement de &gt; et &lt;
      userAnswer = userAnswer.replace(/&gt;/g, "\\gt").replace(/&lt;/g, "\\lt");
      userAnswer = userAnswer.replace(/>/g, "\\gt").replace(/</g, "\\lt");
      // si l'utilisateur a entré un texte \text{...}, on l'enleve
      userAnswer = userAnswer.replace(/\\text\{([^}]*)\}/g, "$1");
  }
  console.log(goodAnswer, userAnswer);
    if (typeOfAnswer !== false) {
      // confrontation de listes séparées par des ;
      if (typeOfAnswer === "liste") {
        let arrayUser = userAnswer.split(";").map(value => value.trim()).sort((a, b) => a - b);
        let arrayExpected = goodAnswer.split(";").map(value => value.trim()).sort((a, b) => a - b);
        // comparons les contenus en transformant en une chaine
        if (arrayUser.toString() === arrayExpected.toString()) {
          return true
        } else {
          return false
        }
      } else if (typeOfAnswer === "inInterval") {
        // ici la valeur doit être comprise entre les deux bornes de l'intervalle
        let minmax = goodAnswer.split("-").map(value => Number(value));
        // minmax[0] est la borne inf et minmax[1] est la borne sup;
        if (Number(userAnswer) > minmax[0] && Number(userAnswer) < minmax[1]) {
          return true
        } else {
          return false
        }
      }
    } else if (String(userAnswer).toLowerCase() == String(goodAnswer).toLowerCase()) {
      // égalité brute de chaines
      return true;
    } else {
      // usage de comparaison par le moteur de Compute engine
      const expr1 = ce.parse(String(goodAnswer));
      const expr2 = ce.parse(String(userAnswer));
      try {
        if (expr1.isSame(expr2)) {
          return true
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    }
  }

 export default analyseReponse