import protos from './mods/protos.js';
import utils from './mods/utils.js';
import common from './mods/common.js';
import cart from './mods/cart.js';
import Zoom from './mods/zoom.js';
import Figure from './mods/figure.js';

const MM={};
MM.version = utils.getVersion()
const content = document.getElementById("creator-content");
const pageOrientations = ["portrait","paysage"]
let pageHeight = 275; // cm
let pageFormat = 0;// portrait
let questionBackgroundColor = "#ffffff"
let answerBackgroundColor = '#ffffff'
let numBackgroundColor = '#8193e5'
let zoom
const parameters = {questColor:questionBackgroundColor, ansColor:answerBackgroundColor, numColor:numBackgroundColor};

//let zoom;

function changePadding(nb){
    parameters.padding = Number(nb)
    refresh()
}

document.getElementById("inputPadding").oninput = (evt)=>{
    changePadding(evt.target.value);
}

function changeSeparator(percent) {
    parameters.separation = Number(percent)
    refresh()
}
document.getElementById('inputSeparator').oninput = (evt) => {
    changeSeparator(evt.target.value)
}

document.getElementById('inputseparationh').oninput = () => {
    setSeparationh()
}
function setSeparationh () {
    if(document.getElementById('inputseparationh').checked){
        parameters.separationh = true
    } else {
        parameters.separationh = false
    }
    refresh()
}

document.getElementById('inputColorQuestion').value = questionBackgroundColor
document.getElementById('inputColorQuestion').onchange = (evt)=>{
    const color = evt.target.value
    parameters.questColor = color
    const questionCards = document.querySelectorAll('.question')
    for (const card of questionCards){
        card.style['background-color'] = color
        card.style['color'] = setWhiteOrBlack(color)
    }
}
document.getElementById('inputColorReponse').value = answerBackgroundColor
document.getElementById('inputColorReponse').onchange = (evt) => {
    const color = evt.target.value
    parameters.ansColor = color
    const answerCards = document.querySelectorAll('.answer')
    answerCards.forEach(card => {
        card.style['background-color'] = color
        card.style['color'] = setWhiteOrBlack(color)
    })
}
document.getElementById('inputColorNumero').value = numBackgroundColor
document.getElementById('inputColorNumero').onchange = (evt) => {
    const color = evt.target.value
    parameters.ansColor = color
    const numeros = document.querySelectorAll('.questionNumero')
    numeros.forEach(numero => {
        numero.style['background-color'] = color
        numero.style['color'] = setWhiteOrBlack(color)
    })
}
document.getElementById('title').onchange = (evt)=>{
    changeTitle(evt)
}
document.getElementById('btnValidateTitle').onclick = ()=>{
    changeTitle()
}

// actions pour la numérotation
document.getElementById('radioNo').onclick = ()=>{
    parameters.numeroter = 'no'
    refresh()
}
document.getElementById('radioQ').onclick = ()=>{
    parameters.numeroter = 'Q'
    refresh()
}

document.getElementById('fontSize').onclick = (evt) =>{
    if(evt.target.dataset.what === "in"){
        zoom.plus();
    } else if(evt.target.dataset.what === "out"){
        zoom.minus();
    } else if(evt.target.dataset.what === "reset"){
        zoom.reset();
    }
}

function changeTitle(evt) {
    let content = ''
    if (evt !== undefined)
        content = evt.target.value
    else content = document.getElementById('title').value
    document.querySelector('h1').innerText = content
    parameters.titreFiche = content
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
        if (style.innerText === undefined) continue
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
    utils.mathRender(parameters.fontType)
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
    content.innerHTML = '<h1>'+parameters.titreFiche+'</h1>';
    MM.memory = {};
    let numeroterQ = false
    if (parameters.numeroter === 'Q') numeroterQ = true
    let pageWidth = 200
    if(pageFormat !== 0) pageWidth = 287
    common.generateQuestions(parameters);
    const arrayOfFlashCardsSection = [utils.create("section",{className:"flash-section grid"+(parameters.separationh?' separationh':''), style:'grid-template-columns: '+parameters.separation+'% auto', innerHTML:'<div class="center">Questions</div><div class="center">Réponses</div>'})]
    let currentSection = 0
    let globalPrintHeight = parameters.cardHeight
    let nbOfCards = 0
    for (const [index,activity] of parameters.cart.activities.entries()) {
        for(let j=0;j<activity.questions.length;j++){
            nbOfCards++
            /*if(parameters.disposition === 'separated'){
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
            }*/
            const artQuestion = utils.create("article",{className:"question",style:'background-color:'+parameters.questColor+';color:'+setWhiteOrBlack(parameters.questColor)});
            /*if (parameters.titreQuestion !== undefined) {
                artQuestion.appendChild(utils.create('div', {className:'questionTitre', innerText:parameters.titreQuestion + (numeroterQ ? ' '+nbOfCards : '')}))
            }*/
           if(numeroterQ){
            artQuestion.appendChild(utils.create('div',{className:'questionNumero',innerText:String(nbOfCards),style:'background-color:'+parameters.numColor+';color:'+setWhiteOrBlack(parameters.numColor)}))
           }
            const divq = utils.create("div");
            artQuestion.style.padding = parameters.padding+"mm";
            const artCorrection = utils.create("article",{className:"answer",style:'background-color:'+parameters.ansColor+';color:'+setWhiteOrBlack(parameters.ansColor)});
            artCorrection.style.padding = parameters.padding+"mm";
            const divr = utils.create("div");
            if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                const span = utils.create("span");
                span.innerHTML = '$$'+activity.questions[j]+'$$'
                const spanCorrection = utils.create("span");
                spanCorrection.innerHTML = '$$'+activity.answers[j]+'$$'
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
            if(activity.figuresCorrection[j] !== undefined){
                MM.memory["fc"+index+"-"+j] = new Figure(utils.clone(activity.figuresCorrection[j]), "fc"+index+"-"+j, divr);
            }
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
        /*const resteDeCartes = section.childNodes.length%nombreDeCartesParLigne
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
        }*/
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
    // Add Button Edit parameters of document
    // check if has been opened directly
    if (window.opener === null) {
        const $destination = document.getElementById('creator-menu');
        const buttonEdit = utils.create('button', {
             innerHTML: '🖋️ Éditer',
             className: 'noprint fright',
             title:'Refaire la sélection de questions' });
        buttonEdit.onclick = () => {
            let url = window.location.href.replace('fichememo.html', 'index.html') + '&edit&type=cartesflash';
            // add alea key
            url = url.replace(/,a=[\d\w]*,/, ',a=' + parameters.alea + ',');
            window.location.href = url
        }
        $destination.prepend(buttonEdit);
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
        parameters.fontType = vars.fs??'serif'
        parameters.tailleTexte=10.5;
        parameters.disposition=vars.disp||'mod1';//'mod1' or 'mod2'
        document.getElementById('btnRectoVerso').innerText = parameters.disposition==='mod1'?'Modèle 1':'Modèle 2 (R/V)'
        zoom = new Zoom("changeFontSize","#creator-content",true,"pt",parameters.tailleTexte);
        document.getElementById("fontSize").appendChild(zoom.createCursor());
        parameters.titreFiche=decodeURI(vars.t);
        document.getElementById('title').value = parameters.titreFiche
        document.querySelector("html").style["fontSize"] = parameters.tailleTexte+"pt";
        // alcarts contient des promises qu'il faut charger
        parameters.cart = new cart(0);
        parameters.cart.import(json[0],false, MM.version).then(()=>{
            document.getElementById('inputPadding').value = vars.ch||5
            parameters.padding = Number(document.getElementById('inputPadding').value)
            document.getElementById('inputSeparator').value = vars.cw||50
            parameters.separation = document.getElementById('inputSeparator').value
            parameters.separationh = document.getElementById('inputseparationh').checked ? true : false
            parameters.questColor = document.getElementById('inputColorQuestion').value
            parameters.ansColor = document.getElementById('inputColorReponse').value
            parameters.numColor = document.getElementById('inputColorNumero').value
            parameters.numeroter = document.getElementById('radioNo').checked ? 'no':'Q'
            refresh()
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