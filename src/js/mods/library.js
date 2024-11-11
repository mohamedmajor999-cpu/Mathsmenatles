import { utils, _ } from './utils.js';
import content from "./content.js";
//import theactivities from "./theactivities.js";
// import MM from "./MM.js";

export { library as default };
// lecture de la bibliotheque
const library = {
  ordre: { "grille-ecole": ["11", "10", "9", "8", "7"], "grille-college": ["6", "5", "4", "3"], "grille-lycee": ["2", "G", "K", "T", 'H'] },
  /**
   * Ouvre un fichier de la library
   * @param {String} url adresse du fichier à ouvrir
   */
  load: async function (url, version) {
    // pour le développement, on peut lire une activité qui n'a pas encore été intégrée dans la bibliothèque
    // en fournissant ?u=id de l'activité.
    let source = ''
    if (location.hostname === '127.0.0.1') source = '../public/'
    const result = await fetch(source + "library/" + url + "?v" + version);
    if (result.status) {
      const data = await result.json();
      let regexp = /\/(.*)\./;
      url = regexp.exec(url)[1];
      return [data, url]
    } else {
      console.log(result)
      return false
    }
  },
  /**
   * 
   * @param {String} url url du json à récupérer
   */
  loadJSON: async function (url, version) {
    let source = ''
    if (location.hostname === '127.0.0.1') source = '../public/'
    const r = await fetch(source + "library/" + url + "?v" + version)
    if (r.ok === true) return r.json()
    throw new Error('Erreur de chargement de l\'activité')
  },
  /**
   * Récupère les données d'une activité lors d'un import venant du chargement d'un panier préconfiguré.
   * @param {String} url adresse
   * @returns Promesse de chargement du fichier à charger
   */
  import: async function (url, version) {
    let source = ''
    if (location.hostname === '127.0.0.1') source = '../public/'
    const r = await fetch(source + "library/" + url + "?v" + version)
    if (r.ok === true) return r.json()
    throw new Error('Problème de chargement de l\'activité')
  },
  /**
   * Ouvre le fichier de description de toutes les activités disponibles sur MathsMentales
   */
  openContents: function () {
    return content
  },
  /**
   * Affiche la liste des activités provenant d'une recherche ou d'un niveau à afficher (base=true)
   * @param {String} level Niveau à afficher
   * @param {Boolean} base Niveau de base ou pas
   * @returns 
   */
  displayContent: function (level, base = false) {
    let now = new Date().getTime(); // date du jour, pour afficher les mises à jour récentes
    if (content === undefined) { console.log("Pas de bibliothèque"); return false; }
    let niveau = { nom: "Recherche", themes: {} };
    // Cas d'un code correspondant à MMv1
    if (_.isObject(level)) {
      niveau.nom = "Cette activité a été répartie en plusieurs";
      // on cherche les titres
      for (let exo in level) {
        let found = false; // le titre n'est pas encore trouvé
        for (let niv in content) {
          if (found) break;
          if (_.isObject(content[niv])) {
            for (let theme in content[niv].themes) {
              if (found) break;
              for (let chap in content[niv].themes[theme].chapitres) {
                if (found) break;
                if (content[niv].themes[theme].chapitres[chap].e.length > 0) {
                  if (found) break;
                  for (let i = 0; i < content[niv].themes[theme].chapitres[chap].e.length; i++) {
                    if (content[niv].themes[theme].chapitres[chap].e[i].u === level[exo].u) {
                      level[exo].t = content[niv].themes[theme].chapitres[chap].e[i].t;
                      found = true;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
      niveau.themes[0] = {
        "nom": "Cliquer pour ouvrir une activité",
        "chapitres": { "MM1": { "n": "Cliquer sur Rechercher pour revenir ici", "e": level } }
      }
      // cas d'une recherche textuelle
    } else if (!base) {
      // recherche d'un terme
      if (level.length < 3) return false; // on ne prend pas les mots de moins de 3 lettres
      // niveaux sélectionnés
      const levels = document.querySelectorAll("#searchLevels input[name='searchlevel']:checked");
      const selectedLevels = [];
      levels.forEach((elt) => { selectedLevels.push(elt.value) });
      // construction du niveau par extraction des données.
      let chaineATrouver = level.toLowerCase().split(" ");
      for (let niv in content) {
        // on ne cherche que dans les niveaux sélectionnés. Si pas de niveau sélectionné, on prend tout.
        if (selectedLevels.length > 0 && selectedLevels.indexOf(niv) < 0) continue;
        if (_.isObject(content[niv])) { // le niveau contient de chapitres
          for (let theme in content[niv].themes) {
            for (let chap in content[niv].themes[theme].chapitres) {
              let chapExo = [];
              for (let exo = 0, lene = content[niv].themes[theme].chapitres[chap].e.length; exo < lene; exo++) {
                let lexo = content[niv].themes[theme].chapitres[chap].e[exo];
                let tt = lexo.t;
                // on prend les différents éléments
                if (chaineATrouver.every(txt => {
                  return lexo.t.toLowerCase().indexOf(txt) > -1;
                })) {
                  // we find a candidate !!!
                  chaineATrouver.forEach(txt => {
                    if (txt === '') return;
                    let reg = new RegExp(txt, "gi");
                    tt = tt.replace(reg, function (x) {
                       return '<mark>' + x + '</mark>' })
                  })
                  chapExo.push({ "u": lexo.u, "t": tt, id: lexo.id })
                } else
                  // recherche dans le code de l'exo
                  if (chaineATrouver.every(txt => {
                    return lexo.u.toLowerCase().indexOf(txt + ".") > -1
                  })) {
                    chapExo.push({ "u": lexo.u, "t": lexo.t, id: lexo.id });
                  } else
                    // recherche dans les descriptifs
                    if (lexo.d !== undefined) {
                      if (chaineATrouver.every(txt => {
                        return lexo.d.toLowerCase().indexOf(txt) > -1
                      })) {
                        chapExo.push({ "u": lexo.u, "t": lexo.t, id: lexo.id });
                      }
                    }
              }
              // si chapExo! == [], alors on créée l'arbo
              if (chapExo.length > 0) {
                if (!niveau.themes[theme]) {
                  niveau.themes[theme] = {
                    nom: content[niv].nom + "/" + content[niv].themes[theme].nom,
                    chapitres: {}
                  };
                }
                niveau.themes[theme].chapitres[chap] = { n: content[niv].themes[theme].chapitres[chap].n, e: chapExo };
              }
            }
          }
        } else continue;
      }
      // cas d'un clic sur un niveau
    } else
      niveau = content[level];
    const eltAffichage = document.getElementById("resultat-chercher");
    let html = "";
    if (!base && !_.isObject(level))
      html = "<h1 class='pointer moins' onclick='utils.deploy(this)'>Résultat de la recherche</h1>";
    else if (!_.isObject(level)) {
      html = "<h1 class='pointer moins' onclick='utils.deploy(this)'>Niveau " + niveau["nom"] + " (" + niveau["activitiesNumber"] + " act.)</h1>";
      // on vide le champ de recherche
      document.getElementById("searchinput").value = "";
    } else
      html = "<h2>Cette activité MathsMentales v1 a été répartie en plusieurs activités</h2>";
    //if(base && !_.isObject(level)) // on change l'url level est un niveau de la bibliothèque
    //MM.setHistory(niveau["nom"],"n="+level);
    // Affichage et mise en forme des données.
    let itemsNumber = 0;
    for (let i in niveau["themes"]) {
      //let first = true;
      let theme = false;
      let htmlt = "";//(first)?"<span>":"";
      htmlt += "<h2 class='pointer moins' id='rch2" + i + "'>" + niveau.themes[i].nom + "</h2>";
      for (let j in niveau["themes"][i]["chapitres"]) {
        let chapitre = false;
        let htmlc = "";//(first)?"":"<span>";
        htmlc += "<h3 id='rch3" + i + "-" + j + "' class='pointer moins'>" + niveau["themes"][i]["chapitres"][j]["n"] + "</h3>";
        htmlc += "<ul>";
        let nbexos = niveau["themes"][i]["chapitres"][j]["e"].length;
        if (nbexos) {
          itemsNumber += nbexos;
          theme = true; chapitre = true;
          for (let k = 0, len = nbexos; k < len; k++) {
            let id = niveau["themes"][i]["chapitres"][j]["e"][k].id;
            let title = niveau["themes"][i]["chapitres"][j]["e"][k]["t"];
            let url = niveau["themes"][i]["chapitres"][j]["e"][k]["u"];
            if (niveau["themes"][i]["chapitres"][j]["e"][k]["new"]) {
              htmlc += "<li id='rcli" + i + "-" + j + "-" + k + "' class='new tooltip' data-id='" + id + "' data-url='" + url + "'><input type='checkbox' class='checkitem' value='" + id + "' data-url='" + url + "'>" + title + "<div class='tooltiptext'>" + id + "</div></li>";
            } else {
              htmlc += "<li id='rcli" + i + "-" + j + "-" + k + "' class='tooltip' data-id='" + id + "' data-url='" + url + "'><input type='checkbox' class='checkitem' value='" + id + "' data-url='" + url + "'>" + title + "<div class='tooltiptext'>" + id + "</div></li>";
            }
          }
        } else {
          htmlc += "<li>Pas encore d'exercice</li>";
        }
        htmlc += "</ul>";
        if (chapitre) {
          htmlt += htmlc;//+((first)?"":"</span>");
          /*if(first === true){
              htmlt += "</span>";
              first = false;
          }*/
        }
      }
      if (theme) html += htmlt;
    }
    eltAffichage.innerHTML = html;
    let target = document.getElementById("tab-chercher");
    target.className = "tabs-content-item";
    // Nombre de colonnes en fonction du contenu
    if (itemsNumber > 40 && utils.pageWidth() > 1000) utils.addClass(target, "cols3");
    else if (itemsNumber > 20 && utils.pageWidth() > 840) utils.addClass(target, "cols2");
    document.querySelector("#header-menu a[numero='#tab-chercher']").click();
  }
}