// Node.js
// F8 pour lancer dans Visual Studio Code
// Analyse la structure et crée le fichier de référence aux exercices
// remplace le fichier scan.php
const fs = require("fs");
const path = require("path");
const listOfActivities = {};
const { off } = require("process");
const getAllFiles = function(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
 
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push([file,
                      path.join(__dirname, dirPath, "/", file),
                      fs.statSync(dirPath + "/" + file).mtime
                    ])
    }
  })
  return arrayOfFiles
};
const structure = JSON.parse(fs.readFileSync("./structure.json"));
// initialisation du nombre de fichiers/activités
structure.activitiesNumber=0;
for (let niveau in structure){
  // initialisation du nombre d'activités par niveau.
  structure[niveau].activitiesNumber=0;
  for(let theme in structure[niveau].themes){
    for (let chapter in structure[niveau].themes[theme].chapitres){
      structure[niveau].themes[theme].chapitres[chapter] = {
        "n":structure[niveau].themes[theme].chapitres[chapter],//name
        e:[]};//exercices
    }
  }
}
for (const niveau in structure){
  let now = new Date().getTime()-30*24*3600*1000;
  if(niveau === "activitiesNumber")continue;
  let listOfFiles = getAllFiles("./N"+niveau);
  listOfFiles.forEach(function(fichierExo){
    let nouveau = false;
    let dt = new Date(fichierExo[2]).getTime();
    if(dt > now){nouveau = true;console.log(fichierExo[0])}
    //console.log(fichierExo);
    let json = JSON.parse(fs.readFileSync(fichierExo[1]));
    const ID = fichierExo[0].replace('.json', '')
    listOfActivities[ID]=json;
    let exo = {"u":"N"+niveau+"/"+fichierExo[0], "t":json.title+(json.speech?" 📣":""),"new":nouveau, id:ID};
    // descriptif
    if(json.description !== undefined){
      exo.d = json.description;
    }
    structure.activitiesNumber++;
    for(let i in json.dest){
      let codechap = json.dest[i];
      let destLevel = codechap.match(/(^\d+|T|G|K|H)/i)[0];
      let themecode = codechap.match(/^(\d+|T|G|K|H)[A-Z]/i)[0];
      if(structure[destLevel] !== undefined){
        structure[destLevel].activitiesNumber++;
        structure[destLevel].themes[themecode].chapitres[codechap].e.push(exo);
      }
    }
  })
}
// rangement alpha des exercices
for(const niveau in structure){
  for(const them in structure[niveau].themes){
    for (const chap in structure[niveau].themes[them].chapitres){
      if(structure[niveau].themes[them].chapitres[chap].e.length)
        structure[niveau].themes[them].chapitres[chap].e.sort((a,b)=>{
          let fa = a.t.toLowerCase();
          let fb = b.t.toLowerCase();
          if(fa < fb) return -1;
          if(fa > fb) return 1;
          return 0;
        })
    }
  }
}
// création d'un fichier html qui contient toutes les références aux exercices avec chacun un lien vers index.html?u=ID de l'exercice
fs.writeFileSync("../liste-des-exercices.html",
  "<!DOCTYPE html><html lang='fr'><head><meta charset='utf-8'><title>Liste des exercices</title></head><body>"+
  Object.keys(listOfActivities).map(
    id => `<p><a href='index.html?u=${id}'>${listOfActivities[id].title}</a> (niveaux : ${listOfActivities[id].dest.join(", ")})</p>` + listOfActivities[id].description !== undefined ? `<p>${listOfActivities[id].description}</p>` : ""
  ).join("")+
  "</body></html>"
);
let dataActivities = JSON.stringify(listOfActivities);
fs.writeFileSync("../../src/js/mods/theactivities.js","export {theactivities as default};"+
"const theactivities="+dataActivities);
let data = JSON.stringify(structure);
fs.writeFileSync("../../src/js/mods/content.js", "export {content as default};const content="+data);
