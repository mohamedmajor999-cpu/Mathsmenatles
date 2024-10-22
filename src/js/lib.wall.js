import protos from './mods/protos.js';
import utils from './mods/utils.js';
import common from './mods/common.js';
import cart from './mods/cart.js';
import Figure from './mods/figure.js';

const MM={};
const content = document.getElementById("creator-content");
const pageOrientations = ["portrait","paysage"]
const parameters = {};
let fontSize = "1";

document.getElementById('flipall').onclick = ()=>{
    let rotate = true;
    const elements = document.querySelectorAll('.flip-card-inner')
    const nbOfElements = elements.length
    let count = 0
    elements.forEach(el=>{
        if(el.classList.contains('rotate'))count++
    })
    elements.forEach(el=>{
        if(count<nbOfElements)
            el.classList.add('rotate')
        else
            el.classList.remove('rotate')
    })
}
function refresh(){
    makePage()
    common.mathRender(['question','answer'])
}

function fontSizePlus(){
    fontSize = fontSize * 1.25
    content.style['font-size'] = fontSize+'em'
}
function fontSizeMinus(){
    fontSize = fontSize * 0.8
    content.style['font-size'] = fontSize+'em'
}
document.getElementById('zoomin').onclick = () => {
    fontSizePlus()
}
document.getElementById('zoomout').onclick = () => {
    fontSizeMinus()
}
document.getElementById('dice').onclick = () => {
    parameters.alea = common.setSeed()
    refresh()
}
function getRandomPastelColor(){
    return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)'
}
let tints = []
function setRandomPaletteOfTint(tint) { // set random palette of a tint passed as parameter
    return 'hsl(' + tint + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)';
}
function setRandomTint(numberOfTints){
    if(numberOfTints === undefined){
        return []
    }
    let tints = [Math.round(360 * Math.random())]
    if(numberOfTints === 2){
        tints.push(tints[0]+180)
    } else if(numberOfTints === 3){
        tints.push(tints[0]+120)
        tints.push(tints[0]+240)
    } else {
        tints.push(tints[0]+90)
        tints.push(tints[0]+180)
        tints.push(tints[0]-90)
    }
    return tints
}
function makePage(){
    if(parameters.alea){
        common.setSeed(parameters.alea);
    }
    content.innerHTML = "";
    MM.memory = {};
    MM.tints = [];
    common.generateQuestions(parameters);
    if(parameters.carts.length===2){
        content.classList.add('hasTwoChildren')
        tints = setRandomTint(2)
    }
    for (let indexOfCart=0;indexOfCart< parameters.carts.length; indexOfCart++) {
        const nbOfQuestions = parameters.carts[indexOfCart].activities.map(activity => activity.questions.length).reduce((a, b) => a + b, 0);
        let nbOfCards = 0
        // create container
        const containerOfCart = utils.create('section', {className:'wall-section'});
        for (const [index,activity] of parameters.carts[indexOfCart].activities.entries()) {
            for(let j=0;j<activity.questions.length;j++){
                nbOfCards++
                let colorCard;
                if(parameters.carts.length===2){
                    colorCard = setRandomPaletteOfTint(tints[indexOfCart])
                } else {
                    colorCard = getRandomPastelColor()
                }
                const container = utils.create('article',{className:"tuile"});
                const flipCardInner = utils.create('div',{className:'flip-card-inner'})
                const artQuestion = utils.create('div',{className:'question flip-card-front'})
                artQuestion.style.backgroundColor = colorCard
                const buttonSolution = utils.create('div', {className:'interrogation', innerText:'?',title:'Cliquer pour afficher la correction'})
                buttonSolution.style['padding-bottom'] = '0.6rem solid transparent'
                buttonSolution.style['padding-right'] = '0.6rem solid transparent'
                const divq = utils.create("div");
                if(activity.consigne)
                    divq.appendChild(utils.create('div',{innerHTML:'<i>'+activity.consigne+'</i>'}))
                const artCorrection = utils.create("div",{className:"answer flip-card-back"})
                artCorrection.style.backgroundColor = colorCard
                buttonSolution.onclick = () => {
                    flipCardInner.classList.toggle('rotate')
                }
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
                flipCardInner.appendChild(artQuestion)
                // figures
                if(activity.figures[j] !== undefined){
                    MM.memory["f"+indexOfCart+"-"+index+"-"+j] = new Figure(utils.clone(activity.figures[j]), "f"+indexOfCart+"-"+index+"-"+j, divq);
                }
                artCorrection.appendChild(divr)
                flipCardInner.appendChild(artCorrection)
                container.appendChild(flipCardInner)
                container.appendChild(utils.create('div', {className:'numero', innerText:nbOfCards}))
                const fullScreenBtn = utils.create('button', {className:'fullscreen', innerText:''})
                let scrollY = 0
                fullScreenBtn.onclick = () => {
                    // récupération de la taille de la carte
                    let initWidth, initHeight, endWidth, endHeight, divWidth, divHeight
                    fullScreenBtn.classList.toggle('fullscreen')
                    fullScreenBtn.classList.toggle('fullscreenexit')
                    if (fullScreenBtn.classList.contains('fullscreenexit')) {
                        initWidth = container.getBoundingClientRect().width
                        initHeight = container.getBoundingClientRect().height
                        scrollY = window.scrollY
                        window.scrollTo(0, 0)
                        container.classList.add('fullscreen')
                        endWidth = container.getBoundingClientRect().width
                        endHeight = container.getBoundingClientRect().height
                        const ratio = Math.min(4,Math.max(endWidth / initWidth, endHeight / initHeight))
                        container.style['font-size'] = ratio*100 + '%'
                    } else {
                        container.classList.remove('fullscreen')
                        container.style['font-size'] = ''
                        window.scrollTo(0, scrollY)
                    }
                }
                const navigation = utils.create('div', {className:'navigation'})
                if(nbOfCards > 1){
                    const prevBtn = utils.create('button', {className:'prev', innerHTML:'<?xml version="1.0" ?><svg id="Outline" height="48" width="48" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#262626;}</style></defs><path transform="rotate(180 256 256)" class="cls-1" d="M357,249.84,169.05,101.3a11.34,11.34,0,0,0-18.37,8.9V405.77A11.34,11.34,0,0,0,169,414.7l188-147a11.34,11.34,0,0,0,0-17.83ZM173.36,382.51V133.61L331.63,258.69Z"/></svg>'})
                    prevBtn.onclick = () => {
                        fullScreenBtn.click()
                        container.previousElementSibling.getElementsByClassName('fullscreen')[0].click()
                    }
                    navigation.appendChild(prevBtn)                        
                } else if(nbOfCards === 1){
                    const prevBtn = utils.create('button', {className:'prev disabled', innerText:''})
                    navigation.appendChild(prevBtn)
                }
                if(nbOfCards < nbOfQuestions){
                    const nextBtn = utils.create('button', {className:'next', innerHTML:'<?xml version="1.0" ?><svg id="Outline" height="48" width="48" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#262626;}</style></defs><path class="cls-1" d="M357,249.84,169.05,101.3a11.34,11.34,0,0,0-18.37,8.9V405.77A11.34,11.34,0,0,0,169,414.7l188-147a11.34,11.34,0,0,0,0-17.83ZM173.36,382.51V133.61L331.63,258.69Z"/></svg>'})
                    nextBtn.onclick = () => {
                        fullScreenBtn.click()
                        container.nextElementSibling.getElementsByClassName('fullscreen')[0].click()
                    }
                    navigation.appendChild(nextBtn)
                } else if(nbOfCards === nbOfQuestions){
                    const nextBtn = utils.create('button', {className:'next disabled', innerText:''})
                    navigation.appendChild(nextBtn)
                }
                container.appendChild(fullScreenBtn)
                container.appendChild(buttonSolution)
                container.appendChild(navigation)
                containerOfCart.appendChild(container)
            }
        }
        content.appendChild(containerOfCart)
    }
    if(!utils.isEmpty(MM.memory)){
        setTimeout(function(){
            for(const k in MM.memory){
                if(k!=="dest")
                    MM.memory[k].display();
            }
        }, 300);
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
        //document.getElementById("nbDominos").value = parameters.nb
        parameters.titreFiche=decodeURI(vars.t);
        if(vars.t !== false)
            document.getElementById("creator-title").innerHTML = parameters.titreFiche
        if(vars.logo){
            let locate = ''
            if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
                locate = '/public/'
            }
            document.getElementById("creator-title").prepend(utils.create("img",{src:locate+'img/partners/logo_m_h32.png',className:'logo'}))
            document.getElementById("creator-title").appendChild(utils.create("img",{src:locate+'img/partners/Logo_B_h32.png',className:'logo'}))
        }
        // allcarts contient des promises qu'il faut charger
        parameters.carts = []
        let allcarts = []
        for(const i in json){
            parameters.carts[i] = new cart(i);
            allcarts.push(parameters.carts[i].import(json[i],false));
        }
        // on attend le résultat de toutes les promesses pour mettre à jour les affichages.
        Promise.all(allcarts).then(data=>{
            refresh()
        }).catch(err=>{
            // erreur à l'importation :(
            // fichier et line de l'erreur
            let stack = err.stack.split('\n');
            stack.splice(0,2)
            let alert=utils.create("div",
            {
                id:"messageerreur",
                className:"message",
                innerHTML:"Impossible de charger le panier :(<br>"+err+"<br>"+stack
            });
            console.log(err.stack)
            document.getElementById("creator-content").appendChild(alert);
        });
    }
}
checkURL();