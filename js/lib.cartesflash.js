import protos from './mods/protos.min.js';
import utils from './mods/utils.min.js';
import common from './mods/common.min.js';
import cart from './mods/cart.min.js';
import Zoom from './mods/zoom.min.js';
import Figure from './mods/figure.min.js';
import math from './mods/math.min.js';

const MM={};
const content = document.getElementById("creator-content");
const pageOrientations = ["portrait","paysage"]
let pageHeight = 275; // cm
let pageFormat = 0;// portrait
let answersBorderColor = "#d0d0d0"
let couleurDuCoin = '#bfbfbf'
let couleurDuTexteDeco = '#bfbfbf'
const parameters = {coincolor:couleurDuCoin, bordercolor:answersBorderColor, decocolor:couleurDuTexteDeco};

//let zoom;

function changeHeight(nb){
    parameters.cardHeight = Number(nb)
    refresh()
}

function changeWidth(nb){
    parameters.cardWidth = Number(nb)
    refresh()
}

document.getElementById("inputheight").oninput = (evt)=>{
    changeHeight(evt.target.value);
}

document.getElementById("inputwidth").oninput = (evt)=>{
    changeWidth(evt.target.value);
}

document.getElementById('btnRectoVerso').onclick = (evt)=>{
    const btn = evt.target
    if(parameters.disposition === 'both'){
        parameters.disposition = 'separated'
        btn.innerText = 'Recto/Verso'
    } else {
        parameters.disposition = 'both'
        btn.innerText = 'Recto'
    }
    refresh()
}
document.getElementById('inputcolorborder').value = answersBorderColor
document.getElementById('inputcolorborder').onchange = (evt)=>{
    const color = evt.target.value
    parameters.bordercolor = color
    const answersCards = document.querySelectorAll('.flash-reponse')
    for (const card of answersCards){
        card.style.border = "1pt solid "+color
    }
}
document.getElementById('inputCoinColor').value = couleurDuCoin
document.getElementById('inputCoinColor').onchange = (evt) => {
    const color = evt.target.value
    parameters.coincolor = color
    const tousLesCoins = document.querySelectorAll('.logoq')
    tousLesCoins.forEach(el => {
        el.style['background-color'] = color
        el.style['color'] = setWhiteOrBlack(color)
    })
}
document.getElementById('inputDecoColor').value = couleurDuTexteDeco
document.getElementById('inputDecoColor').onchange = (evt) => {
    const color = evt.target.value
    parameters.decocolor = color
    const tousLesTextes = document.querySelectorAll('.identifiant')
    tousLesTextes.forEach(el => {
        el.style['color'] = color
    })
}

document.getElementById('identifiant').onchange = (evt)=>{
    const content = evt.target.value
    const cardIds = document.querySelectorAll('.identifiant')
    for (const id of cardIds){
        id.innerText = content
    }
}

function setWhiteOrBlack(color){
    const lumen = lightOrDark(color);
    if(lumen === 'dark'){
        return 'white'
    } else {
        return 'black'
    }
}
function changeOrientation(evt){
    // suppression du style de page précédent
    let pagestyle = document.querySelectorAll("head style")
    for (const style of pagestyle) {
        if(style.innerText.indexOf('MMentales')>-1){
            style.parentNode.removeChild(style);
            const newStyle = utils.create("style");
            if(pageFormat===0){
                newStyle.innerHTML = `/*MMentales*/
                @page{
                    size:A4 landscape;
                    margin:0.8cm;
                }`
                document.body.setAttribute("layout","landscape");
            } else {
                newStyle.innerHTML = `/*MMentales*/
                @page{
                    size:A4 portrait;
                    margin:0.8cm;
                }`
                document.body.removeAttribute("layout");
            }        
            document.head.appendChild(newStyle);
        }
    }
    evt.target.innerHTML = pageOrientations[pageFormat];
    pageFormat = (pageFormat+1)%2;
    refresh()
}

document.getElementById('btnPageOrientation').onclick = (evt)=>{changeOrientation(evt)}

function refresh(){
    if(pageFormat===0)pageHeight=275
    else pageHeight=190
    makePage()
    common.mathRender()
}
/**
 * function from https://codepen.io/andreaswik/pen/YjJqpK/
 * @param {*} color 
 * @returns 
 */
function lightOrDark(color) {
    let r,g,b,hsp;
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
  
      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
  
      r = color[1];
      g = color[2];
      b = color[3];
    } 
    else {
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'
      )
               );
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {
      return 'light';
    } 
    else {
      return 'dark';
    }
  }


function makePage(){
    if(parameters.alea){
        common.setSeed(parameters.alea);
    }
    content.innerHTML = "";
    MM.memory = {};
    let pageWidth = 200
    if(pageFormat !== 0) pageWidth = 287
    const nombreDeCartesParLigne = Math.floor(pageWidth/Number(parameters.cardWidth))
    common.generateQuestions(parameters);
    const arrayOfFlashCardsSection = [utils.create("section",{className:"flash-section grid", style:'grid-template-columns: repeat('+nombreDeCartesParLigne+',1fr);'})]
    if(parameters.disposition === 'separated'){arrayOfFlashCardsSection.push(utils.create("section",{className:"flash-section grid", style:'grid-template-columns: repeat('+nombreDeCartesParLigne+',1fr);'}))}
    let currentSection = 0
    let globalPrintHeight = parameters.cardHeight
    let nbOfCards = 0
    for (const [index,activity] of parameters.cart.activities.entries()) {
        for(let j=0;j<activity.questions.length;j++){
            if(parameters.disposition === 'separated'){
                nbOfCards++
                if (nbOfCards%nombreDeCartesParLigne === 1 && nbOfCards>1) {
                    globalPrintHeight += parameters.cardHeight
                }
            } else {
                nbOfCards = nbOfCards+2
                if(nbOfCards>nombreDeCartesParLigne){
                    globalPrintHeight += parameters.cardHeight
                    nbOfCards = nbOfCards%nombreDeCartesParLigne
                }
            }
            const artQuestion = utils.create("article",{className:"flash-question card recto"});
            artQuestion.style.height = parameters.cardHeight+"mm";
            artQuestion.style.width = parameters.cardWidth+"mm";
            artQuestion.appendChild(utils.create('div', {className:'logoq', innerText:'Q', style:'background-color:'+parameters.coincolor+';color:'+setWhiteOrBlack(parameters.coincolor)}))
            artQuestion.appendChild(utils.create('div', {className:'identifiant', innerText:document.getElementById('identifiant').value, style:'color:'+parameters.decocolor}))
            const divq = utils.create("div");
            const artCorrection = utils.create("article",{className:"flash-reponse card verso", style:'border:1px solid '+parameters.bordercolor});
            artCorrection.style.height = parameters.cardHeight+"mm";
            artCorrection.style.width = parameters.cardWidth+"mm";
            const divr = utils.create("div");
            if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                const span = utils.create("span",{className:"math", innerHTML:activity.questions[j]});
                const spanCorrection = utils.create("span", {className:"math", innerHTML:activity.answers[j]});
                divq.appendChild(span);
                divr.appendChild(spanCorrection);
            } else {
                divq.innerHTML = activity.questions[j];
                divr.innerHTML = activity.answers[j];
            }
            artQuestion.appendChild(divq);
            // figures
            if(activity.figures[j] !== undefined){
                MM.memory["f"+index+"-"+j] = new Figure(utils.clone(activity.figures[j]), "f"+index+"-"+j, divq);
            }
            artCorrection.appendChild(divr)
            if(globalPrintHeight > pageHeight){
                arrayOfFlashCardsSection.push(utils.create("section",{className:"flash-section grid", style:'grid-template-columns: repeat('+nombreDeCartesParLigne+',1fr);'}))
                currentSection++;
                if(parameters.disposition === 'separated'){
                    arrayOfFlashCardsSection.push(utils.create("section",{className:"flash-section grid", style:'grid-template-columns: repeat('+nombreDeCartesParLigne+',1fr);'}))
                }
                globalPrintHeight = parameters.cardHeight
            }
            let indexWhereInsertQ = currentSection
            let indexWhereInsertA = currentSection
            if(parameters.disposition === 'separated'){
                indexWhereInsertQ = 2*currentSection
                indexWhereInsertA = 2*currentSection+1
            }
            arrayOfFlashCardsSection[indexWhereInsertQ].appendChild(artQuestion)
            arrayOfFlashCardsSection[indexWhereInsertA].appendChild(artCorrection)
        }
    }
    for(const section of arrayOfFlashCardsSection){
        content.appendChild(section)
        const resteDeCartes = section.childNodes.length%nombreDeCartesParLigne
        if ( resteDeCartes > 0 ){
            for(let i=0; i<nombreDeCartesParLigne-resteDeCartes; i++){
                section.appendChild(utils.create('article'))
            }
        }
        if(parameters.disposition === 'separated'){
            const answersSections = document.querySelectorAll('.flash-section:nth-child(even)')
            for(const section of answersSections){
                for(let i=0; i<section.childNodes.length; i=i+nombreDeCartesParLigne){
                    for(let j=i+1;j<i+nombreDeCartesParLigne;j++){
                        const elem = section.childNodes[j]
                        if(elem !== undefined){
                            elem.parentNode.insertBefore(elem, section.childNodes[i])
                        }
                    }
                }
            }
        }
    }

    if(!utils.isEmpty(MM.memory)){
        setTimeout(function(){
            for(const k in MM.memory){
                if(k!=="dest")
                    MM.memory[k].display();
            }
        }, 1000);
    }
}

function checkURL(urlString){
    const vars = utils.getUrlVars(urlString);
    if(vars.embed !== undefined){
        // cas d'une activité embeded, on vérifie que l'url est conforme
        let expression = 
/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        let regex = new RegExp(expression);
        if(vars.embed.match(regex))
            MM.embededIn = vars.embed;
    }
    if(vars.c!==undefined){
        if(vars.a){
            parameters.alea = vars.a;
        } else {
            parameters.alea = common.setSeed();
        }
        // paramètres des activités des paniers
        let json = vars.c;
        // parametres globaux :
        parameters.tailleTexte=10.5;
        parameters.disposition=vars.disp||'both';//'both' or 'separated'
        document.getElementById('btnRectoVerso').innerText = parameters.disposition==='both'?'Recto':'Recto/Verso'
        //parameters.nb=Number(vars.n);
        //document.getElementById("nbDominos").value = parameters.nb
        parameters.titreFiche=decodeURI(vars.t);
        //parameters.doublons = eval(vars.d)||false;
        //if(!parameters.doublons)document.getElementById("btnnodoublon").innerHTML = "Doublons"
        // Affectation de la valeur au nombre de feuilles
        //document.getElementById("nbDominos").value = parameters.nb;
        //zoom = new Zoom("changeFontSize","#thehtml",true,"pt",parameters.tailleTexte);
        //document.getElementById("creator-menu").appendChild(zoom.createCursor());
        document.querySelector("html").style["fontSize"] = parameters.tailleTexte+"pt";
        // alcarts contient des promises qu'il faut charger
        parameters.cart = new cart(0);
        parameters.cart.import(json[0],false).then(()=>{
            document.getElementById('inputheight').value = vars.ch||55
            parameters.cardHeight = Number(document.getElementById('inputheight').value)
            document.getElementById('inputwidth').value = vars.cw||85
            changeWidth(document.getElementById('inputwidth').value)
        }).catch(err=>{
            // erreur à l'importation :(
            let alert=utils.create("div",
            {
                id:"messageerreur",
                className:"message",
                innerHTML:"Impossible de charger le panier :(<br>"+err
            });
            document.getElementById("creator-container").appendChild(alert);
        });
    }
}
checkURL();