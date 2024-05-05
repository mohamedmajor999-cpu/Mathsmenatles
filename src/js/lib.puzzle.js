import utils from "./mods/utils.js";
import common from './mods/common.js';
import cart from './mods/cart.js';
import math from "./mods/math.js";
import Figure from './mods/figure.js';

const MM={};
let textSize = '0.35'
const parameters = {distract:false};
const $fig = document.getElementById('figure')
const $info = document.getElementById('info')
const $impression = document.getElementById('impression')
const nbQuestionsOfActivities = [];// array contenant les nombres de questions par activité
const figures = [
    "<svg id='svg5' width='1093.733' height='620' viewBox='0 0 289.383 250.708' xmlns='http://www.w3.org/2000/svg'><g fill='#fff' stroke='#1a1a1a' stroke-width='.706' stroke-linecap='round' stroke-linejoin='round'><path d='M144.692 125.354h-72.17l36.085-62.5zm36.084-62.501h-72.169l36.085-62.5zm-72.169 0h72.17l-36.085 62.5zm0 125.002h-72.17l36.085-62.501zm-36.085-62.501h72.17l-36.085 62.5z'/><path d='M216.861 125.354h-72.17l36.085-62.5z'/><path d='M180.776 187.855h-72.169l36.085-62.501zm72.17 0h-72.17l36.085-62.501z'/><path d='M144.692 125.354h72.17l-36.086 62.5zm-72.17 125.001H.352l36.085-62.5zM36.437 187.855h72.17l-36.085 62.5zm108.255 62.5h-72.17l36.085-62.5z'/><path d='M216.861 250.355h-72.17l36.085-62.5z'/><path d='M108.607 187.855h72.17l-36.085 62.5zm180.423 62.5h-72.169l36.085-62.5z'/><path d='M180.776 187.855h72.17l-36.085 62.5z'/></g><g><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${D[11]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[0]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[12]}</div></foreignObject></g><g transform='translate(72.3)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${D[10]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[13]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[14]}</div></foreignObject></g><g transform='translate(144.6)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${D[9]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[15]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[16]}</div></foreignObject></g><g transform='translate(216.9)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${D[8]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[17]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[7]}</div></foreignObject></g><g transform='translate(36.3 -62.3)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[9]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[1]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[5]}</div></foreignObject></g><g transform='translate(108.6 -62.3)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[10]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[6]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[7]}</div></foreignObject></g><g transform='translate(180.9 -62.3)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${R[11]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[8]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[6]}</div></foreignObject></g><g transform='translate(72.3 -124.6)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[3]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[2]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[1]}</div></foreignObject></g><g transform='translate(144.6 -124.6)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${R[4]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[2]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[5]}</div></foreignObject></g><g transform='translate(108.5 -187.8)'><foreignObject x='6' y='229' width='60' height='20'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[0]}</div></foreignObject><foreignObject x='151' y='-147' width='60' height='20' transform='rotate(120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[3]}</div></foreignObject><foreignObject x='-247' y='-84' width='60' height='20' transform='rotate(-120)'><div xmlns='http://www.w3.org/1999/xhtml'>${D[4]}</div></foreignObject></g><g><foreignObject x='-102.5' y='-209' width='60' height='20' transform='scale(-1)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[9]}</div></foreignObject><foreignObject x='-174.5' y='166.5' width='60' height='20' transform='rotate(-60)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[13]}</div></foreignObject><foreignObject x='187' y='41' width='60' height='20' transform='rotate(60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[12]}</div></foreignObject></g><g transform='translate(72.3)'><foreignObject x='-102.5' y='-209' width='60' height='20' transform='scale(-1)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[10]}</div></foreignObject><foreignObject x='-174.5' y='166.5' width='60' height='20' transform='rotate(-60)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[15]}</div></foreignObject><foreignObject x='187' y='41' width='60' height='20' transform='rotate(60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[14]}</div></foreignObject></g><g transform='translate(144.6)'><foreignObject x='-102.5' y='-209' width='60' height='20' transform='scale(-1)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[11]}</div></foreignObject><foreignObject x='-174.5' y='166.5' width='60' height='20' transform='rotate(-60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[17]}</div></foreignObject><foreignObject x='187' y='41' width='60' height='20' transform='rotate(60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[16]}</div></foreignObject></g><g transform='translate(36.2 -62.3)'><foreignObject x='-102.5' y='-209' width='60' height='20' transform='scale(-1)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[3]}</div></foreignObject><foreignObject x='-174.5' y='166.5' width='60' height='20' transform='rotate(-60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[6]}</div></foreignObject><foreignObject x='187' y='41' width='60' height='20' transform='rotate(60)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[5]}</div></foreignObject></g><g transform='translate(108.5 -62.3)'><foreignObject x='-102.5' y='-209' width='60' height='20' transform='scale(-1)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[4]}</div></foreignObject><foreignObject x='-174.5' y='166.5' width='60' height='20' transform='rotate(-60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[8]}</div></foreignObject><foreignObject x='187' y='41' width='60' height='20' transform='rotate(60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[2]}</div></foreignObject></g><g transform='translate(72.4 -124.6)'><foreignObject x='-102.5' y='-209' width='60' height='20' transform='scale(-1)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[0]}</div></foreignObject><foreignObject x='-174.5' y='166.5' width='60' height='20' transform='rotate(-60)'><div xmlns='http://www.w3.org/1999/xhtml'>${R[6]}</div></foreignObject><foreignObject x='187' y='41' width='60' height='20' transform='rotate(60)'><div xmlns='http://www.w3.org/1999/xhtml'>${Q[1]}</div></foreignObject></g></svg>"
]
const motif = "<svg class='svg8' width='720.504' height='1038.806' viewBox='0 0 190.633 274.851' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='#1a1a1a' stroke-width='.705' stroke-linecap='round' stroke-linejoin='round'><path d='M95.316 110.009V.353L190.28 55.18zm0 109.659V110.012l94.965 54.828zm0-109.659V.353L.35 55.18zm0 109.659V110.012L.35 164.84z'/><path d='M.353 164.839V55.183l94.965 54.828z'/><path d='M190.279 164.839V55.183L95.314 110.01zm0 109.659V164.842L95.314 219.67z'/><path d='M.353 274.498V164.842l94.965 54.828z'/></g><foreignObject x='43' y='26' width='80' height='20' transform='rotate(30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[0][0]}</div></foreignObject><foreignObject x='-67' y='-70' width='80' height='20' transform='rotate(150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[0][1]}</div></foreignObject><foreignObject x='-96' y='73' width='80' height='20' transform='rotate(-90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[0][2]}</div></foreignObject><g transform='translate(0 109.5)'><foreignObject x='43' y='26' width='80' height='20' transform='rotate(30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[2][0]}</div></foreignObject><foreignObject x='-67' y='-70' width='80' height='20' transform='rotate(150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[2][1]}</div></foreignObject><foreignObject x='-96' y='73' width='80' height='20' transform='rotate(-90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[2][2]}</div></foreignObject></g><g transform='translate(94.8 54.75)'><foreignObject x='43' y='26' width='80' height='20' transform='rotate(30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[3][0]}</div></foreignObject><foreignObject x='-67' y='-70' width='80' height='20' transform='rotate(150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[3][1]}</div></foreignObject><foreignObject x='-96' y='73' width='80' height='20' transform='rotate(-90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[3][2]}</div></foreignObject></g><g transform='translate(94.8 164.3)'><foreignObject x='43' y='26' width='80' height='20' transform='rotate(30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[4][0]}</div></foreignObject><foreignObject x='-67' y='-70' width='80' height='20' transform='rotate(150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[4][1]}</div></foreignObject><foreignObject x='-96' y='73' width='80' height='20' transform='rotate(-90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[4][2]}</div></foreignObject></g><foreignObject x='-68' y='121' width='80' height='20' transform='rotate(-30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[1][0]}</div></foreignObject><foreignObject x='70' y='-22' width='80' height='20' transform='rotate(90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[1][1]}</div></foreignObject><foreignObject x='-123' y='-69' width='80' height='20' transform='rotate(-150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[1][2]}</div></foreignObject><g transform='translate(0 109.5)'><foreignObject x='-68' y='121' width='80' height='20' transform='rotate(-30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[5][0]}</div></foreignObject><foreignObject x='70' y='-22' width='80' height='20' transform='rotate(90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[5][1]}</div></foreignObject><foreignObject x='-123' y='-69' width='80' height='20' transform='rotate(-150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[5][2]}</div></foreignObject></g><g transform='translate(94.8 -54.75)'><foreignObject x='-68' y='121' width='80' height='20' transform='rotate(-30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[6][0]}</div></foreignObject><foreignObject x='70' y='-22' width='80' height='20' transform='rotate(90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[6][1]}</div></foreignObject><foreignObject x='-123' y='-69' width='80' height='20' transform='rotate(-150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[6][2]}</div></foreignObject></g><g transform='translate(94.8 54.75)'><foreignObject x='-68' y='121' width='80' height='20' transform='rotate(-30)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[7][0]}</div></foreignObject><foreignObject x='70' y='-22' width='80' height='20' transform='rotate(90)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[7][1]}</div></foreignObject><foreignObject x='-123' y='-69' width='80' height='20' transform='rotate(-150)'><div xmlns='http://www.w3.org/1999/xhtml'>${P[7][2]}</div></foreignObject></g></svg>"
const trianglesDeValeurs = [
    ['Q[0]', 'D[3]', 'D[4]'],
    ['Q[3]', 'D[2]', 'R[1]'],
    ['R[0]', 'R[2]', 'Q[1]'],
    ['R[4]', 'Q[2]', 'D[5]'],
    ['Q[9]', 'D[1]', 'R[5]'],
    ['R[3]', 'R[6]', 'Q[5]'],
    ['Q[10]', 'Q[6]', 'R[7]'],
    ['Q[4]', 'R[8]', 'Q[7]'],
    ['R[11]', 'Q[8]', 'D[6]'],
    ['D[11]', 'D[0]', 'Q[12]'],
    ['R[9]', 'Q[13]', 'R[12]'],
    ['D[10]', 'R[13]', 'Q[14]'],
    ['R[10]', 'Q[15]', 'R[14]'],
    ['D[9]', 'R[15]', 'Q[16]'],
    ['Q[11]', 'R[17]', 'R[16]'],
    ['D[8]', 'Q[17]', 'D[7]']
]
function render(id) {
    if (id.indexOf('.')>-1){
        const contents = document.querySelectorAll(id)
        contents.forEach(el => {
            renderKtex(el)
        })
    } else {
        const content = document.getElementById(id);
        renderKtex(content)
    }
}
function renderKtex(content) {
    content.innerHTML = content.innerHTML.replace(/\$\$([^$]*)\$\$/gi, '<span class="math">$1</span>');
    content.querySelectorAll(".math").forEach(function(item){
        var texTxt = item.innerHTML.replace(/\&amp\;/g,"&");
        // recherche les nombres, décimaux ou pas
        let nbrgx = /(\d+\.*\d*)/g;
        // insère des espaces tous les 3 chiffres;
        texTxt = texTxt.replace(nbrgx, utils.toDecimalFr);
        try {
          katex.render(texTxt, item, {
            throwOnError: false,
            errorColor: "#FFF",
            colorIsTextColor: true
          });
          utils.removeClass(item,"math");
        } catch (err) {
          item.innerHTML = "<span class='err'>" + err + ' avec '+texTxt + '</span>';
        };
    })
}
document.getElementById('btn-nodistract').onclick = () => {
    parameters.distract = false
    makePage()
    render('svg5')
    render('.svg8')
    setTextSize()
}
document.getElementById('btn-distract').onclick = () => {
    parameters.distract = true
    makePage()
    render('svg5')
    render('.svg8')
    setTextSize()
}
document.getElementById('formulaSize').oninput = (evt) => {
    setTextSize(evt.target.value)
}
function setTextSize(value) {
    if(value !== undefined)
        textSize = value
    else
        value = textSize
    document.getElementById('svg5').style['font-size'] = value + 'em'
    document.querySelectorAll('.svg8').forEach(el => {
        el.style['font-size'] = String(Number(value)+0.25)+'em'
    })
}

function makePage(){
    if(parameters.alea){
        common.setSeed(parameters.alea);
    }
    // on ne veut pas de doublon sur les réponses.
    parameters.doublon = false
    const nbOfActivities = parameters.cart.activities.length
    let valuesSupp = new Array(nbOfActivities).fill(0)
    if (parameters.distract) {
        valuesSupp = new Array(nbOfActivities).fill(Math.ceil(16/nbOfActivities))
    }
    if(nbQuestionsOfActivities.length > 0) {
        for (let actid = 0; actid < parameters.cart.activities.length; actid++) {
            parameters.cart.activities[actid].nbq = nbQuestionsOfActivities[actid];
            if (parameters.distract) 
                parameters.cart.activities[actid].nbq += valuesSupp
        }
    } else {
        for (let actid = 0; actid < parameters.cart.activities.length; actid++) {
            nbQuestionsOfActivities[actid] = parameters.cart.activities[actid].nbq;
            if (parameters.distract) 
                parameters.cart.activities[actid].nbq += valuesSupp
        }
    }
    $fig.innerHTML = ""
    $info.innerHTML = ''
    MM.memory = {};
    common.generateQuestions(parameters);
    // set elements :
    let aleaCode = utils.create("div",{className:"floatright",innerHTML:"Clé : "+common.seed});
    $info.appendChild(aleaCode);
    // get the titlesheet
    let sheetTitle = parameters.titreFiche||"Puzzle MathsMentales";
    // set the titlesheet
    let header = utils.create("header",{innerHTML:sheetTitle});
    $info.appendChild(header);
    const Q = [], R = []; let D = [];
    for(let i=0;i<nbOfActivities;i++){
        const activity = parameters.cart.activities[i];
        for(let j=0;j<activity.questions.length;j++){
            let value = (Array.isArray(activity.values[j]))?activity.values[j][0]:activity.values[j];
            if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                let span = utils.create("span",{className:"math", innerHTML:activity.questions[j]});
                let spanCorrection = utils.create("span", {className:"math",innerHTML:value});
                if (j < nbQuestionsOfActivities[i]) {
                    Q.push(span.outerHTML)
                    R.push(spanCorrection.outerHTML)
                } else {
                    if (math.aleaInt(0,1))
                        D.push(span.outerHTML)
                    else
                        D.push(spanCorrection.outerHTML)
                }
            } else {
                if (j < nbQuestionsOfActivities[i]) {
                    Q.push(activity.questions[j])
                    R.push(value)
                } else {
                    if (math.aleaInt(0,1))
                        D.push(activity.questions[j])
                    else
                        D.push(value)
                }
            }    
        }
    }
    if (!parameters.distract) {
        D = new Array(16).fill('')
    }
    $fig.innerHTML = eval('`' + figures[0] + '`')
    let trianglesOfValues0 = [...trianglesDeValeurs]
    let trianglesOfValues1 = []
    for (let i=0; i<8; i++) {
        trianglesOfValues1 = trianglesOfValues1.concat(trianglesOfValues0.splice(math.aleaInt(0,trianglesOfValues0.length-1),1))
    }
    utils.shuffle(trianglesOfValues0)
    let fig1 = motif;
    for (let i=0, len=trianglesOfValues0.length; i<len; i++){
        for(let j=0; j<3; j++){
            fig1 = fig1.replace('P['+i+']['+j+']', trianglesOfValues0[i][j])
        }
    }
    let fig2 = motif;
    for (let i=0, len=trianglesOfValues1.length; i<len; i++){
        for(let j=0; j<3; j++){
            fig2 = fig2.replace('P['+i+']['+j+']', trianglesOfValues1[i][j])
        }
    }
    $impression.innerHTML = eval('`' + fig1 + fig2 + '`')
}

function refresh(){
    makePage()
    render('svg5')
    render('.svg8')
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
        // alcarts contient des promises qu'il faut charger
        parameters.cart = new cart(0);
        parameters.cart.import(json[0],false).then(()=>{
            refresh()
        }).catch(err=>{
            // erreur à l'importation :(
            let alert=utils.create("div",
            {
                id:"messageerreur",
                className:"message",
                innerHTML:"Impossible de charger le panier :(<br>"+err
            });
            $info.appendChild(alert);
            console.warn(err)
        });
    }
}
checkURL();