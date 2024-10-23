import { ComputeEngine } from '../libs/compute-engine/compute-engine.esm.js';
const ce = new ComputeEngine()

function analyseReponse (goodAnswer, userAnswer, typeOfAnswer = false) {
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