import protos from './mods/protos.js';
import utils from './mods/utils.js';
import common from './mods/common.js';
import cart from './mods/cart.js';
import Figure from './mods/figure.js';

const MM = {};
MM.version = utils.getVersion()

const content = document.getElementById("creator-content");
const pageOrientations = ["portrait", "paysage"]
const parameters = {};
let fontSize = "1";

document.getElementById('flipall').onclick = () => {
    let rotate = true;
    const elements = document.querySelectorAll('.flip-card-inner')
    const nbOfElements = elements.length
    let count = 0
    elements.forEach(el => {
        if (el.classList.contains('rotate')) count++
    })
    elements.forEach(el => {
        if (count < nbOfElements)
            el.classList.add('rotate')
        else
            el.classList.remove('rotate')
    })
}
function refresh() {
    makePage()
    common.mathRender(['.question', '.answer'])
}

function fontSizePlus() {
    fontSize = fontSize * 1.25
    content.style['font-size'] = fontSize + 'em'
}
function fontSizeMinus() {
    fontSize = fontSize * 0.8
    content.style['font-size'] = fontSize + 'em'
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
function getRandomPastelColor() {
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
function setRandomTint(numberOfTints) {
    if (numberOfTints === undefined) {
        return []
    }
    let tints = [Math.round(360 * Math.random())]
    if (numberOfTints === 2) {
        tints.push(tints[0] + 180)
    } else if (numberOfTints === 3) {
        tints.push(tints[0] + 120)
        tints.push(tints[0] + 240)
    } else {
        tints.push(tints[0] + 90)
        tints.push(tints[0] + 180)
        tints.push(tints[0] - 90)
    }
    return tints
}
function makePage() {
    if (parameters.alea) {
        common.setSeed(parameters.alea);
    }
    content.innerHTML = "";
    MM.memory = {};
    common.generateQuestions(parameters);
    if (parameters.carts.length === 2) {
        content.classList.add('hasTwoChildren')
        tints = setRandomTint(2)
    }
    parameters.arrayOfQuestionsAndAnswers = []
    for (let indexOfCart = 0; indexOfCart < parameters.carts.length; indexOfCart++) {
        parameters.arrayOfQuestionsAndAnswers[indexOfCart] = []
        // stockage des références des questions
        for (const [activityNumber, activity] of parameters.carts[indexOfCart].activities.entries()) {
            for (let questionNumber = 0; questionNumber < activity.questions.length; questionNumber++) {
                parameters.arrayOfQuestionsAndAnswers[indexOfCart].push([activityNumber, questionNumber])
            }
        }
        // mélange des questions
        if (!parameters.carts[indexOfCart].ordered) {
            parameters.arrayOfQuestionsAndAnswers[indexOfCart] = utils.shuffle(parameters.arrayOfQuestionsAndAnswers[indexOfCart])
        }
    }
    for (let indexOfCart = 0; indexOfCart < parameters.arrayOfQuestionsAndAnswers.length; indexOfCart++) {
        const nbOfQuestions = parameters.carts[indexOfCart].activities.map(activity => activity.questions.length).reduce((a, b) => a + b, 0);
        // create container
        const containerOfCart = utils.create('section', { className: 'wall-section' });
        let nbOfCards = 0
        for (let i = 0; i < parameters.arrayOfQuestionsAndAnswers[indexOfCart].length; i++) {
            const [activityNumber, questionNumber] = parameters.arrayOfQuestionsAndAnswers[indexOfCart][i];
            const activity = parameters.carts[indexOfCart].activities[activityNumber];
            nbOfCards++
            let colorCard;
            if (parameters.carts.length === 2) {
                colorCard = setRandomPaletteOfTint(tints[indexOfCart])
            } else {
                colorCard = getRandomPastelColor()
            }
            const container = utils.create('article', { className: "tuile" });
            const flipCardInner = utils.create('div', { className: 'flip-card-inner' })
            const artQuestion = utils.create('div', { className: 'question flip-card-front' })
            artQuestion.style.backgroundColor = colorCard
            const buttonSolution = utils.create('div', { className: 'interrogation', innerText: '?', title: 'Cliquer pour afficher la correction' })
            buttonSolution.style['padding-bottom'] = '0.6rem solid transparent'
            buttonSolution.style['padding-right'] = '0.6rem solid transparent'
            const divq = utils.create("div");
            if (activity.consigne)
                divq.appendChild(utils.create('div', { innerHTML: '<i>' + activity.consigne + '</i>' }))
            const artCorrection = utils.create("div", { className: "answer flip-card-back" })
            artCorrection.style.backgroundColor = colorCard
            buttonSolution.onclick = () => {
                flipCardInner.classList.toggle('rotate')
            }
            const divr = utils.create("div");
            if (activity.type === "latex" || activity.type === "" || activity.type === undefined) {
                const span = utils.create("span", { className: "math", innerHTML: activity.questions[questionNumber] });
                const spanCorrection = utils.create("span", { className: "math", innerHTML: activity.answers[questionNumber] });
                divq.appendChild(span);
                divr.appendChild(spanCorrection);
            } else {
                divq.innerHTML = activity.questions[questionNumber];
                divr.innerHTML = activity.answers[questionNumber];
            }
            artQuestion.appendChild(divq);
            flipCardInner.appendChild(artQuestion)
            // figures
            if (activity.figures[questionNumber] !== undefined) {
                MM.memory["f" + indexOfCart + "-" + i] = new Figure(utils.clone(activity.figures[questionNumber]), "f" + indexOfCart + "-" + i, divq);
            }
            artCorrection.appendChild(divr)
            flipCardInner.appendChild(artCorrection)
            container.appendChild(flipCardInner)
            container.appendChild(utils.create('div', { className: 'numero', innerText: nbOfCards }))
            const fullScreenBtn = utils.create('button', { className: 'fullscreen', innerText: '' })
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
                    const ratio = Math.min(4, Math.max(endWidth / initWidth, endHeight / initHeight))
                    container.style['font-size'] = ratio * 100 + '%'
                } else {
                    container.classList.remove('fullscreen')
                    container.style['font-size'] = ''
                    window.scrollTo(0, scrollY)
                }
            }
            const navigation = utils.create('div', { className: 'navigation' })
            if (nbOfCards > 1) {
                const prevBtn = utils.create('button', { className: 'prev', innerHTML: '<?xml version="1.0" ?><svg id="Outline" height="48" width="48" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#262626;}</style></defs><path transform="rotate(180 256 256)" class="cls-1" d="M357,249.84,169.05,101.3a11.34,11.34,0,0,0-18.37,8.9V405.77A11.34,11.34,0,0,0,169,414.7l188-147a11.34,11.34,0,0,0,0-17.83ZM173.36,382.51V133.61L331.63,258.69Z"/></svg>' })
                prevBtn.onclick = () => {
                    fullScreenBtn.click()
                    container.previousElementSibling.getElementsByClassName('fullscreen')[0].click()
                }
                navigation.appendChild(prevBtn)
            } else if (nbOfCards === 1) {
                const prevBtn = utils.create('button', { className: 'prev disabled', innerText: '' })
                navigation.appendChild(prevBtn)
            }
            if (nbOfCards < nbOfQuestions) {
                const nextBtn = utils.create('button', { className: 'next', innerHTML: '<?xml version="1.0" ?><svg id="Outline" height="48" width="48" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#262626;}</style></defs><path class="cls-1" d="M357,249.84,169.05,101.3a11.34,11.34,0,0,0-18.37,8.9V405.77A11.34,11.34,0,0,0,169,414.7l188-147a11.34,11.34,0,0,0,0-17.83ZM173.36,382.51V133.61L331.63,258.69Z"/></svg>' })
                nextBtn.onclick = () => {
                    fullScreenBtn.click()
                    container.nextElementSibling.getElementsByClassName('fullscreen')[0].click()
                }
                navigation.appendChild(nextBtn)
            } else if (nbOfCards === nbOfQuestions) {
                const nextBtn = utils.create('button', { className: 'next disabled', innerText: '' })
                navigation.appendChild(nextBtn)
            }
            container.appendChild(fullScreenBtn)
            container.appendChild(buttonSolution)
            container.appendChild(navigation)
            containerOfCart.appendChild(container)
        }
        content.appendChild(containerOfCart)
    }
    if (!utils.isEmpty(MM.memory)) {
        setTimeout(function () {
            for (const k in MM.memory) {
                if (k !== "dest")
                    MM.memory[k].display();
            }
        }, 300);
    }
}

function checkURL(urlString) {
    const vars = utils.getUrlVars(urlString);
    if (vars.embed !== undefined) {
        // cas d'une activité embeded, on vérifie que l'url est conforme
        let expression =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        let regex = new RegExp(expression);
        if (vars.embed.match(regex))
            MM.embededIn = vars.embed;
    }
    if (window.opener === null) {
        const $destination = document.getElementById('zoom');
        const buttonEdit = utils.create('button', {
            innerHTML: '<svg height="48" width="48" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="31.833" cy="32" fill="#76C2AF" r="32"/><path d="M28 23v-9H15a3 3 0 00-3 3v34a3 3 0 003 3h22a3 3 0 003-3V26h-9a3 3 0 01-3-3z" fill="#231F20" opacity=".2"/><path d="M37 12H15a3 3 0 00-3 3v34a3 3 0 003 3h22a3 3 0 003-3V15a3 3 0 00-3-3z" fill="#E0E0D1"/><path fill="#231F20" d="M16 19h10v2H16zM16 35h20v2H16zM16 30h20v2H16zM16 25h20v2H16zM16 40h20v2H16z" opacity=".2"/><g opacity=".2"><path fill="#231F20" d="M16 45h20v2H16z"/></g><g opacity=".2"><path d="M55.121 21.864l-7.071-7.071a3 3 0 00-4.243 0l-3.536 3.536-.707.707-16.262 16.263-1.886 9.428-.943 4.714 4.714-.943 9.428-1.886 16.263-16.263.707-.707 3.536-3.536a2.998 2.998 0 000-4.242z" fill="#231F20"/></g><g><path d="M50.879 28.435a3 3 0 01-4.243 0l-7.071-7.071a3 3 0 010-4.243l4.243-4.243a3 3 0 014.243 0l7.071 7.071a3 3 0 010 4.243l-4.243 4.243z" fill="#C75C5C"/></g><g><path fill="#E0995E" d="M23.301 33.385l16.97-16.97 2.83 2.828-16.971 16.97z"/></g><g><path fill="#F5CF87" d="M24.715 37.627L43.1 19.242l5.657 5.657-18.385 18.385z"/></g><g><path fill="#E0995E" d="M31.786 41.87l16.97-16.97 2.829 2.828-16.97 16.97z"/></g><g><path fill="#4F5D73" d="M20.473 47.527l4.714-.943-3.771-3.771z"/><path fill="#FFF" d="M23.302 33.385l-1.886 9.428 3.771 3.771 9.428-1.886-1.414-1.414v-2.828h-5.657v-5.657h-2.828z"/></g></svg>',
            className: 'edit-btn',
            title: 'Éditer les activités du panneau'
        });
        buttonEdit.onclick = () => {
            let url = window.location.href.replace('wall.html', 'index.html') + '&edit&type=wall';
            // add alea key
            url = url.replace(/,a=[\d\w]*,/, ',a=' + parameters.alea + ',');
            window.location.href = url
        }
        $destination.appendChild(buttonEdit);
    }
    if (vars.c !== undefined) {
        if (vars.a) {
            parameters.alea = vars.a;
        } else {
            parameters.alea = common.setSeed();
        }
        // paramètres des activités des paniers
        let json = vars.c;
        //document.getElementById("nbDominos").value = parameters.nb
        parameters.titreFiche = decodeURI(vars.t);
        if (vars.t !== false)
            document.getElementById("creator-title").innerHTML = parameters.titreFiche
        if (vars.logo) {
            let locate = ''
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                locate = '/public/'
            }
            document.getElementById("creator-title").prepend(utils.create("img", { src: locate + 'img/partners/logo_m_h32.png', className: 'logo' }))
            document.getElementById("creator-title").appendChild(utils.create("img", { src: locate + 'img/partners/Logo_B_h32.png', className: 'logo' }))
        }
        // allcarts contient des promises qu'il faut charger
        parameters.carts = []
        let allcarts = []
        for (const i in json) {
            parameters.carts[i] = new cart(i);
            allcarts.push(parameters.carts[i].import(json[i], false, MM.version));
        }
        // on attend le résultat de toutes les promesses pour mettre à jour les affichages.
        Promise.all(allcarts).then(data => {
            refresh()
        }).catch(err => {
            // erreur à l'importation :(
            // fichier et line de l'erreur
            let stack = err.stack.split('\n');
            stack.splice(0, 2)
            let alert = utils.create("div",
                {
                    id: "messageerreur",
                    className: "message",
                    innerHTML: "Impossible de charger le panier :(<br>" + err + "<br>" + stack
                });
            console.log(err.stack)
            document.getElementById("creator-content").appendChild(alert);
        });
    }
}
checkURL();