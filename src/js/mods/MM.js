import utils from "./utils.js";
import sound from "./sound.js";
import cart from "./cart.js";
import Zoom from "./zoom.js";
import Figure from "./figure.js";
import library from "./library.js";
import draw from "./draw.js";
import activity from "./activity.js";
export { MM as default }
const MM = {
    version: 7,// à mettre à jour à chaque upload pour régler les pb de cache
    content: undefined, // liste des exercices classés niveau/theme/chapitre chargé au démarrage
    introType: "321",// type of the slide's intro values : "example" "321" "nothing"
    endType: "nothing",// type of end slide's values : "correction", "nothing", "list"
    touched: false,// marker to know if the screen has been touched => online answers with virtual keyboard
    selectedCart: 0,
    seed: "", // String to initialize the randomization
    editedActivity: undefined, // object activity 
    slidersOrientation: "", // if vertical => vertical presentation for 2 sliders
    onlineState: "no", // true if user answers on computer (Cf start and online functions)
    carts: [], // max 4 carts
    steps: [],
    timers: [],
    figs: {}, // 
    userAnswers: [[], [], [], []],
    slidersNumber: 1,
    faceToFace: 'n',
    colorSelectors: [],
    colors: [],// couleurs de fond des diaporamas
    memory: [],// memoire des figures
    goodAnswers: [],// stockage des réponses attendues dans le online,
    zooms: {},// zooms créés pour chaque élément d'affichage,
    mf: {},// MathFields pour réponses en ligne
    text2speach: [],
    keyboards: {},// claviers virtuels pour réponses en ligne
    ended: true,
    embededIn: false, // variable qui contient l'url du site dans lequel MM est affiché (vérifier url)
    /**
     * Crée un grain pour la génération aléatoire des données
     * @param {String} value 
     */
    setSeed(value) {
        if (value !== undefined && value !== "sample" && value !== "checkSwitched") {
            MM.seed = value;
            document.getElementById("aleaKey").value = value;
        } else if (value === "sample") {
            MM.seed = utils.seedGenerator();
        } else if (document.getElementById("aleaInURL").checked) {
            if (document.getElementById("aleaKey").value === "") {
                MM.seed = utils.seedGenerator();
                document.getElementById("aleaKey").value = MM.seed;
            } else {
                MM.seed = document.getElementById("aleaKey").value;
            }
        } else if (value === "checkSwitched") {
            // on ne fait rien
            return false;
        } else {
            MM.seed = utils.seedGenerator();
            document.getElementById("aleaKey").value = MM.seed;
        }
        MM.initializeAlea(MM.seed);
    },
    getSeed() {
        if (document.getElementById("aleaInURL").checked) {
            if (document.getElementById("aleaKey").value === "") {
                MM.seed = utils.seedGenerator();
                document.getElementById("aleaKey").value = MM.seed;
            } else {
                MM.seed = document.getElementById("aleaKey").value;
            }
        }
        return MM.seed;
    },
    /**
    * 
    * @params {string} seed valeur d'initialisation des données aléatoires
    * return nothing
    */
    initializeAlea: function (seed) {
        if (seed) {
            if (utils.alea) delete utils.alea;
            utils.alea = new Math.seedrandom(seed);
        } else {
            if (utils.alea) delete utils.alea;
            utils.alea = new Math.seedrandom(MM.seed);
        }
    },
    /**
     * 
     * @param {DOM obj or string} element 
     * Show the selected Tab
     */
    showTab: function (element) {
        MM.resetAllTabs(); let tab, el;
        if (element === "none") return;
        if (typeof element === "string") {
            tab = element;
            el = document.querySelector("#header-menu a[numero='#" + element + "']");
        } else {
            el = element;
            tab = element.getAttribute('numero').substr(1);
        }
        utils.addClass(el, "is-active");
        document.getElementById(tab).style.display = "";
    },
    showParameters: function (id) {
        let ids = ["paramsdiapo", "paramsexos", "paramsinterro", "paramsceinture", "paramsflashcards", "paramswhogots", "paramsdominos", 'paramspuzzle', "paramscourse", "paramsduel", "paramswall"];//
        if (ids.indexOf(id) < 0) return false;
        // hide all
        for (let i = 0, len = ids.length; i < len; i++) {
            document.getElementById(ids[i]).className = "hidden";
        }
        document.getElementById(id).className = "";
    },
    resetAllTabs: function () {
        // fermeture des espaces d'annotation.
        MM.annotateThisThing(false);
        let tabsButtons = document.querySelectorAll("#header-menu .tabs-menu-link");
        let contents = document.querySelectorAll(".tabs-content-item");
        document.getElementById("tab-accueil").display = "none";
        contents.forEach(element => {
            element.style.display = "none";
        });
        utils.removeClass(document.getElementById("btnaccueil"), "is-active");
        tabsButtons.forEach(element => {
            utils.removeClass(element, "is-active");
        });
    },
    closeMessage(id) {
        let div = document.getElementById(id);
        if (div !== null) div.parentNode.removeChild(div);
        document.body.removeEventListener("click", (evt) => { if (evt.target.id === "btn-messagefin-close") { MM.closeMessage('messagefin'); MM.showTab('tab-corrige'); } });
    },
    setEndType(value) {
        this.endType = value;
    },
    setAudio(value) {
        if (this.slidersNumber > 1) {
            utils.checkRadio("audioRadio", "0");
        } else {
            this.editedActivity.audioRead = value == 1 ? true : false;
            utils.checkRadio("audioRadio", value);
        }
    },
    setAudioRepetitions(value) {
        value = Number(value);
        this.editedActivity.audioRepeat = value;
        document.getElementById("audiorepeat").value = value;
    },
    setIntroType(value) {
        if (value === "nothing") {
            this.introType = value;
            document.getElementById("radiobeforeslider1").checked = false;
            document.getElementById("radiobeforeslider2").checked = false;
        } else {
            this.introType = [];
            document.getElementById("radiobeforeslider3").checked = false;
            if (document.getElementById("radiobeforeslider1").checked) {
                this.introType.push("example")
            }
            if (document.getElementById("radiobeforeslider2").checked) {
                this.introType.push("321");
            }
            this.introType = this.introType.join("-");
            // cas où on a décheck
            if (this.introType === "") {
                document.getElementById("radiobeforeslider3").checked = true;
                this.introType = "nothing";
            }
        }
    },
    setOnlineState(value) {
        this.onlineState = value;
        // Mise à jour du champ
        document.querySelector("input[name='online'][value='" + value + "']").checked = true;
    },
    getOnlineState() {
        this.onlineState = utils.getRadioChecked("online");
    },
    editActivity: function (index) {
        index = Number(index);
        MM.editedActivity = MM.carts[MM.selectedCart].activities[index];
        MM.setTempo(MM.editedActivity.tempo);
        MM.setNbq(MM.editedActivity.nbq);
        MM.setAudio(MM.editedActivity.audioRead);
        MM.setAudioRepetitions(MM.editedActivity.audioRepeat);
        MM.carts[MM.selectedCart].editedActivityId = index;
        MM.carts[MM.selectedCart].display(MM.carts);
        MM.editedActivity.display('sample', MM);
        document.getElementById("unlinkCart").className = "";
        document.getElementById("addToCart").className = "hidden";
        document.getElementById("removeFromCart").className = "";
    },
    uneditActivity: function () {
        document.getElementById("addToCart").className = "";
        document.getElementById("removeFromCart").className = "hidden";
        document.getElementById("unlinkCart").className = "hidden";
    },
    unlinkActivity: function () {
        this.uneditActivity();
        MM.editedActivity = new activity(utils.clone(MM.editedActivity));
        MM.editedActivity.display("sample", MM);
        MM.carts[MM.selectedCart].editedActivityId = -1;
        MM.carts[MM.selectedCart].display(MM.carts);
    },
    setTempo: function (value) {
        document.getElementById("tempo-slider").value = value;
        document.getElementById('tempo-value').innerHTML = value + " s.";
    },
    setNbq: function (value) {
        document.getElementById("nbq-slider").value = value;
        document.getElementById('nbq-value').innerHTML = value;
    },
    changeTempoValue: function (value) {
        if (Number(value) < 2)
            document.getElementById('tempo-value').innerHTML = "manuel";
        else
            document.getElementById('tempo-value').innerHTML = value + " s.";
        if (MM.editedActivity) MM.editedActivity.Tempo = value;
        if (MM.carts[MM.selectedCart].editedActivityId > -1) {
            document.querySelectorAll("#cart" + (MM.selectedCart) + "-list li.active span")[0].innerHTML = value;
        }
    },
    changeNbqValue: function (value) {
        document.getElementById('nbq-value').innerHTML = value;
        if (MM.editedActivity) MM.editedActivity.nombreQuestions = value;
        if (MM.carts[MM.selectedCart].editedActivityId > -1) {
            document.querySelectorAll("#cart" + (MM.selectedCart) + "-list li.active span")[1].innerHTML = value;
        }
    },
    checkValues: function () {
        MM.changeTempoValue(document.getElementById('tempo-slider').value);
        MM.changeNbqValue(document.getElementById('nbq-slider').value);
    },
    resetCarts: function () {
        let Cart = new cart(0);
        MM.carts = [Cart];
        MM.setMinimalDisposition(0);
        MM.steps = [];
        MM.timers = [];
        MM.figs = {};
        MM.resetInterface();
    },
    resetInterface() {
        document.getElementById("divcarts").className = "hidden";
        document.getElementById("phantom").className = "";
        document.getElementById("divparams").className = "col-2 row-3";
        // on check tous les boutons radio en fonction des valeurs en méméoire
        utils.checkRadio("direction", this.slidersOrientation);
        utils.checkRadio("beforeSlider", this.introType);
        utils.checkCheckbox("beforeSlider", this.introType.split("-"));
        utils.checkRadio("endOfSlideRadio", this.endType);
        utils.checkRadio("online", this.onlineState);
        utils.checkRadio("facetoface", this.faceToFace);
        utils.checkRadio("Enonces", this.slidersNumber);
    },
    showCartInterface() {
        document.getElementById("divcarts").className = "row-4";
        document.getElementById("phantom").className = "hidden";
        document.getElementById("divparams").className = "row-3";
    },
    addCart: function () {
        this.uneditActivity();
        let cartsNb = MM.carts.length + 1;
        if (cartsNb > 4) return false;
        MM.carts[cartsNb - 1] = new cart(cartsNb - 1);
        MM.setMinimalDisposition(cartsNb - 1);
        // add cart button
        let button = utils.create("button");
        button.value = cartsNb;
        button.className = "tabs-menu-link";
        button.innerHTML = '<i class="sprite sprite-cart' + cartsNb + '"></i>';
        button.id = "button-cart" + cartsNb;
        let addcart = document.getElementById('addcart');
        let cartsMenu = document.getElementById('cartsMenu');
        let lastButton = cartsMenu.removeChild(addcart);
        cartsMenu.appendChild(button).click();
        // hide + button if 4 carts
        if (cartsNb < 4) {
            cartsMenu.appendChild(lastButton);
        }
    },
    /**
     * fonction qui récupère la liste des activités d'un panier
     * 
     * return DOM object
     */
    getCartsContent: function () {
        let div = utils.create("div", { style: "display:flex;" });
        for (let i = 0; i < MM.carts.length; i++) {
            let ul = utils.create("ul", { innerHTML: "<span class='bold'>" + MM.carts[i].title + "</span>" });
            let acts = MM.carts[i].activities;
            for (let j = 0; j < acts.length; j++) {
                let li = utils.create("li", { innerText: acts[j].title });
                ul.appendChild(li);
            }
            div.appendChild(ul);
        }
        return div;
    },
    /**
    * recrée les boutons de sélection de panier en fonction des paniers existants.
    *
    */
    restoreCartsInterface: function () {
        let cartsMenu = document.getElementById('cartsMenu');
        cartsMenu.innerHTML = `<button class="tabs-menu-link is-active" value="1" id="button-cart1"><i class="sprite sprite-cart1"></i></button>
        <button id="addcart" title="Ajouter un panier"><i class="sprite sprite-cartadd"></i></button>`;
        for (let i = 1; i < this.carts.length; i++) {
            let btnnb = i + 1;
            let button = utils.create("button", {
                value: btnnb,
                className: "tabs-menu-link",
                innerHTML: '<i class="sprite sprite-cart' + btnnb + '"></i>',
                id: "button-cart" + btnnb
            });
            let addcart = document.getElementById('addcart');
            let lastButton = cartsMenu.removeChild(addcart);
            cartsMenu.appendChild(button);
            if (btnnb < 4) {
                cartsMenu.appendChild(lastButton);
            }
        }
    },
    removeCart: function (index) {
        if (!window.confirm("Vous êtes sur le point de supprimer ce panier.\nConfirmez-vous ?")) {
            return false;
        }
        // remove last cart button
        let buttonCartToremove = document.getElementById('button-cart' + MM.carts.length);
        let cartsMenu = document.getElementById('cartsMenu');
        cartsMenu.removeChild(buttonCartToremove);
        // recreate buttonAddCart if necessary
        if (!document.getElementById("addcart")) {
            let buttonAddCart = document.createElement("button");
            buttonAddCart.id = "addcart";
            buttonAddCart.innerHTML = '<i class="sprite sprite-cartadd"></i>';
            buttonAddCart.onclick = function () {
                MM.addCart();
            }
            cartsMenu.appendChild(buttonAddCart);
        }
        // delete cart
        MM.carts.splice(index - 1, 1);
        MM.setMinimalDisposition(MM.carts.length - 1);
        // show Cart1
        MM.showCart(1);
        // rewrite all contents
    },
    showCart(index) {
        this.uneditActivity();
        index = Number(index);
        MM.selectedCart = index - 1;
        for (let i = 1, nb = MM.carts.length, btn; i <= 4; i++) {
            if (i <= nb)
                btn = document.getElementById('button-cart' + i);
            let div = document.getElementById('cart' + (i - 1));
            if (i !== index) {
                div.className = "hidden";
                if (i <= nb) utils.removeClass(btn, "is-active");
            } else {
                div.className = "cartcontent";
                if (i <= nb) utils.addClass(btn, "is-active");
            }
        }
        // show edited activity
        if (MM.carts[MM.selectedCart].editedActivityId > -1) {
            MM.carts[MM.selectedCart].activities[MM.carts[MM.selectedCart].editedActivityId].display('sample', MM);
            this.editActivity(MM.carts[MM.selectedCart].editedActivityId);
        }
    },
    emptyCart(index) {
        if (window.confirm("Vous êtes sur le point de vider ce panier.\nConfirmez-vous ?")) {
            MM.carts[index - 1].activities = [];
            MM.carts[index - 1].editedActivityId = -1;
            MM.carts[index - 1].display(MM.carts);
        } else return false;
    },
    addToCart() {
        MM.carts[MM.selectedCart].addActivity(MM.editedActivity, false, -1, MM.carts);
        // on affiche les panier
        MM.showCartInterface();
    },
    removeFromCart(id = false) {
        let cart = MM.carts[MM.selectedCart];
        let idact = id ? id : cart.editedActivityId;
        if (!id || Number(id) == Number(cart.editedActivityId)) {
            cart.editedActivityId = -1;
            document.getElementById("addToCart").className = "";
            document.getElementById("removeFromCart").className = "hidden";
            document.getElementById("unlinkCart").className = "hidden";
        }
        cart.removeActivity(idact);
    },
    /**
 * création des affichages dans les diaporamas et les zones de rappel du site.
 * @param {boolean} withAnswer insère les réponses dans le diaporama si true
 */
    populateQuestionsAndAnswers(withAnswer) {
        if (withAnswer === undefined) withAnswer = true;
        MM.figs = {}; MM.steps = []; MM.timers = []; MM.memory = {}; MM.goodAnswers = []; MM.text2speach = [];
        // length = nombre de paniers
        let length = MM.carts.length;
        let enonces = document.getElementById('enonce-content');
        let corriges = document.getElementById('corrige-content');
        if (length > 1) {
            enonces.className = "grid-" + length;
            corriges.className = "grid-" + length;
        }
        enonces.innerHTML = "";
        corriges.innerHTML = "";
        MM.copyURLtoHistory();
        // parcours des paniers
        for (let i = 0; i < length; i++) {
            MM.carts[i].actsArrays = [];
            // parcours des destinations du panier
            for (let kk = 0, clen = MM.carts[i].target.length; kk < clen; kk++) {
                let indiceSlide = 0;
                MM.goodAnswers[kk] = [];
                let slideNumber = MM.carts[i].target[kk] - 1;
                let dive = utils.create("div", { id: "de" + i + "-" + kk });
                let divc = utils.create("div", { id: "dc" + i + "-" + kk });
                MM.zooms["zc" + i + "-" + kk] = new Zoom("zc" + i + "-" + kk, "#dc" + i + "-" + kk + " ol", true);
                MM.zooms["ze" + i + "-" + kk] = new Zoom("ze" + i + "-" + kk, "#de" + i + "-" + kk + " ol", true);
                dive.appendChild(MM.zooms["ze" + i + "-" + kk].createCursor());
                divc.appendChild(MM.zooms["zc" + i + "-" + kk].createCursor());
                let addTitle = "";
                if (clen > 1) addTitle = "-" + (kk + 1);
                let titleSlider = MM.carts[i].title + addTitle;
                let h3e = utils.create("h3", { innerText: titleSlider }); // exercice's title
                let h3c = utils.create("h3", { innerText: titleSlider });// correction's title
                dive.append(h3e);
                divc.append(h3c);
                let ole = utils.create("ol");
                let olc = utils.create("ol");
                // mise en couleur des listes énoncés et corrigés. (pour bilan ou impression)
                if (MM.colors[slideNumber] !== undefined) {
                    ole.style["background"] = MM.colors[slideNumber];
                    olc.style["background"] = MM.colors[slideNumber];
                }
                let actsArray = [];
                // on fait la liste des références activités / questions pour pouvoir créer les affichages
                for (let z = 0, alen = MM.carts[i].activities.length; z < alen; z++) {
                    let activity = MM.carts[i].activities[z];
                    activity.generate();
                    MM.goodAnswers[kk][z] = utils.clone(activity.values);
                    for (let j = 0; j < activity.questions.length; j++) {
                        actsArray.push([z, j]);
                    }
                }
                // on mélange les références si on veut que tout soit mélangé.
                if (!MM.carts[i].ordered) {
                    actsArray = utils.shuffle(actsArray);
                }
                // on stocke les associations pour pouvoir comparer quand on fera le online
                MM.carts[i].actsArrays[kk] = actsArray;
                // parcours des questions
                for (let ff = 0; ff < actsArray.length; ff++) {
                    let activity = MM.carts[i].activities[actsArray[ff][0]];
                    // pour ne pas tout réécrire :
                    // j est le numéro de la question
                    let j = actsArray[ff][1];
                    let question = activity.questions[j];
                    let answer = activity.answers[j];
                    // enoncés et corrigés
                    let lie = utils.create("li");
                    let lic = document.createElement("li");
                    let tex = false; let spane, spanc;
                    if (activity.type === undefined || activity.type === "" || activity.type === "latex") {
                        tex = true;
                        spane = utils.create("span", { className: "math", innerHTML: question });
                        lie.appendChild(spane);
                        spanc = utils.create("span", { className: "math" });
                        lic.appendChild(spanc);
                    } else {
                        lie.innerHTML = question;
                    }
                    if (activity.audioRead && activity.audios[j] !== undefined && activity.audios[j] !== false) {
                        MM.text2speach[indiceSlide] = [activity.audios[j], activity.audioRepeat];
                    }
                    if (Array.isArray(answer)) {
                        if (!tex) lic.innerHTML += answer[0];
                        else spanc.innerHTML += answer[0];
                    }
                    else {
                        if (tex)
                            spanc.innerHTML += answer;
                        else
                            lic.innerHTML += answer;
                    }
                    if (activity.figures[j] !== undefined) {
                        lic.innerHTML += "&nbsp; <button data-id=\"c" + slideNumber + "-" + indiceSlide + "\">Figure</button>";
                        MM.memory['e' + slideNumber + "-" + indiceSlide] = new Figure(utils.clone(activity.figures[j]), "en" + slideNumber + "-" + indiceSlide, lie, [300, 150]);
                        MM.memory['c' + slideNumber + "-" + indiceSlide] = new Figure(utils.clone(activity.figures[j]), "cor" + slideNumber + "-" + indiceSlide, lic, [450, 225]);
                    }
                    ole.appendChild(lie);
                    olc.appendChild(lic);
                    indiceSlide++;
                }
                dive.append(ole);
                divc.append(olc);
                enonces.append(dive);
                corriges.append(divc);
                if (!utils.isEmpty(MM.memory)) {
                    setTimeout(() => {
                        console.log("affichage des figures");
                        for (let j = 0; j < indiceSlide; j++) {
                            // toutes les questions ne comportent pas de figures, on vérifie qu'il y en a.
                            if (MM.memory['e' + slideNumber + "-" + j] !== undefined)
                                MM.memory['e' + slideNumber + "-" + j].display();
                        }
                    }, 450);
                }
            }
        }
        utils.mathRender();
        //MM.zoomCorrection();
    },
    setFacetoFace(etat) {
        this.faceToFace = etat;
        if (etat === "y") {
            utils.addClass(document.getElementById("sddiv1"), "return");
            if (MM.slidersNumber > 2)
                utils.addClass(document.getElementById("sddiv2"), "return");
        } else {
            utils.removeClass(document.getElementById("sddiv1"), "return");
            utils.removeClass(document.getElementById("sddiv2"), "return");
        }
    },
    getFacetoFace() {
        this.faceToFace = utils.getRadioChecked("facetoface");
    },
    /**
     * Create a sheet of exercices
     * called by parameters
     */
    createExercicesSheet: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "exosheet");
        let value = this.setURL(params, "exosheet");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
    },
    createCourseAuxNombres: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "cansheet");
        let value = this.setURL(params, "cansheet");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
    },
    /**
     * Create a sheet of exercices
     * called by parameters
     */
    createExamSheet: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "exam");
        let value = this.setURL(params, "exam");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
    },
    createCeintureSheet: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        // vérification du nombre de questions du panier
        let nbq = 0;
        for (let i = 0; i < MM.carts[0].activities.length; i++) {
            nbq += Number(MM.carts[0].activities[i].nbq);
        }
        // calcul du nombre de questions de la ceinture
        let nbqc = Number(document.getElementById("ceintcolsval").value) * Number(document.getElementById("ceintrowsval").value);
        if (nbq < nbqc) { // si pas assez de questions dans le panier, alerter et s'arrêter
            alert("Pas assez de questions dans le panier pour alimenter la ceinture\nde " +
                document.getElementById("ceintcolsval").value + "×" + document.getElementById("ceintrowsval").value +
                "=" + nbqc + " emplacements"
            );
            return;
        } else if (nbq > nbqc) {
            if (!confirm("Vous allez créé une ceinture de " + nbqc + " emplacements\nalors que vous avez créé un panier de" +
                nbq + "questions.\nToutes ne seront donc pas imprimées. Continuer ?")) {
                return;
            }
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "ceinture");
        let value = this.setURL(params, "ceinture");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
        //MM.fiche = new ficheToPrint("ceinture",MM.carts[0],utils.getRadioChecked("ceintorientation"));
    },
    createFlashCards: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "cartesflash");
        let value = this.setURL(params, "cartesflash");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
    },
    createWall: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "wall");
        let value = this.setURL(params, "wall");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
    },
    // TODO : replace this by an independent webpage
    createWhoGots: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "whogots");
        let value = this.setURL(params, "whogots");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123")
    },
    createDominos: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "dominos");
        let value = this.setURL(params, "dominos");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
    },
    createPuzzle: function () {
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "puzzle");
        let value = this.setURL(params, "puzzle");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=1123");
    },

    duelLaunch: function () {
        if (!MM.editedActivity) return;
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        let params = this.paramsToURL(withSeed, "duel");
        let value = this.setURL(params, "duel");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,width=720");
    },
    diaporamaLaunch: function () {
        if (!MM.editedActivity) return;
        if (!MM.carts[0].activities.length) {
            MM.carts[0].addActivity(MM.editedActivity);
        }
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, "diaporama");
        let value = this.setURL(params, "diaporama");
        MM.window = window.open(value, "mywindow", "location=no,menubar=no,titlebar=no,fullscreen=yes");
    },
    /**
     * Start the slideshow
     */
    start: function () {
        this.diaporamaLaunch();
    },
    paramsToURL(withAleaSeed = false, type = "") {
        let colors = MM.colors.join("~").replace(/\,/g, "_");
        // MM.setSeed()
        if (type === "exosheet") {
            return "s=" + document.getElementById("exTxtSizeValue").value +
                ",n=" + document.getElementById("exQtyValue").value +
                ",cor=" + utils.getRadioChecked("excorr") +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                ",t=" + encodeURI(document.getElementById("extitle").value || document.getElementById("extitle").placeholder) +
                ",ex=" + encodeURI(document.getElementById("exeachex").value || document.getElementById("exeachex").placeholder) +
                this.export();
        } else if (type === "exam") {
            return "s=" + document.getElementById("intTxtSizeValue").value +
                ",n=" + document.getElementById("intQtyValue").value +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                ",t=" + encodeURI(document.getElementById("inttitle").value || document.getElementById("inttitle").placeholder) +
                ",ex=" + encodeURI(document.getElementById("inteachex").value || document.getElementById("inteachex").placeholder) +
                this.export();
        } else if (type === "cansheet") {
            return "n=" + document.getElementById("canqtyvalue").value +
                ",t=" + encodeURI(document.getElementById("cantitle").value || document.getElementById("cantitle").placeholder) +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                ",cor=" + (utils.getRadioChecked("cancorrpos") || "fin") +
                ",tm=" + (document.getElementById("cantime").value || document.getElementById("cantime").placeholder) +
                ",t1=" + encodeURI(document.getElementById("cancol1title").value || document.getElementById("cancol1title").placeholder) +
                ",t2=" + encodeURI(document.getElementById("cancol2title").value || document.getElementById("cancol2title").placeholder) +
                ",t3=" + encodeURI(document.getElementById("cancol3title").value || document.getElementById("cancol3title").placeholder) +
                this.export()
        } else if (type === "cartesflash") {
            return "disp=" + (utils.getRadioChecked("flashcarddispo")) +
                ",t=" + (document.getElementById("FCtitle").value || "Cartes Flash") +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                this.export()
        } else if (type === "wall") {
            return "t=" + utils.superEncodeURI(document.getElementById("walltitle").value) +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                this.export()
        } else if (type === "dominos") {
            return "n=" + document.getElementById("dominosNbValue").value +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                ",d=" + (document.getElementById("dominosDoublons").checked) +
                this.export();
        } else if (type === "whogots") {
            return "n=" + document.getElementById("cardsNbValue").value +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                ",d=" + (document.getElementById("WGDoublons").checked) +
                ',aff=' + (document.getElementById("WGaffirmation").value) +
                ',quest=' + (document.getElementById("WGquestion").value) +
                this.export();
        } else if (type === "puzzles") {
            return ",a=" + (withAleaSeed ? this.getSeed() : "") +
                this.export();
        } else if (type === "duel") {
            return "ty=" + utils.getRadioChecked("dueltype") +
                ",bg=" + document.getElementById("duelbackgroundselect").value +
                (utils.getRadioChecked("dueltemps") === "limit" ? ",t=" + utils.timeToSeconds(document.getElementById("dueltotaltime").value) : "") +
                this.export();
        } else if (type === "ceinture") {
            let chaine = "", t = 0;
            // liste des titres :
            let titles = document.querySelectorAll("#ceintcolumnTitle input")
            titles.forEach(inp => {
                chaine += ",t" + t + "=" + (inp.value ? utils.superEncodeURI(inp.value) : "");
                t++;
            })
            return "t=" + utils.superEncodeURI(document.getElementById("ceinttitle").value) +
                ",ke=" + document.getElementById("ceintprintToEnonce").checked +
                ",kc=" + document.getElementById("ceintprintToCorrige").checked +
                ",nc=" + document.getElementById("ceintcolsval").value +
                chaine +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                ",nr=" + document.getElementById("ceintrowsval").value +
                ",n=" + document.getElementById("ceintqtyvalue").value +
                ",cor=" + (utils.getRadioChecked("ceintcorrpos") || "fin") +
                ",pie=" + document.getElementById("ceintpiedcol").value +
                ",or=" + (utils.getRadioChecked("ceintorientation") || "portrait") +
                this.export();
        } else
            return "i=" + MM.introType +
                ",e=" + MM.endType +
                ",o=" + MM.onlineState +
                ",s=" + MM.slidersNumber +
                ",so=" + MM.slidersOrientation +
                ",f=" + MM.faceToFace +
                ",a=" + (withAleaSeed ? this.getSeed() : "") +
                ",colors=" + colors +
                ",snd=" + sound.selected +
                this.export();
    },
    setHistory(pageName, params) {
        let url = MM.setURL(params);
        history.pushState({ 'id': 'Homepage' }, pageName, url);
    },
    loadActivity(url) {
        library.load(url, MM.version).then(([json, id]) => {
            const obj = new activity(json, id);
            MM.editedActivity = obj;
            // show tab-content
            const tab = document.querySelector("a[numero$='parameters'].tabs-menu-link");
            MM.resetAllTabs();
            utils.addClass(tab, "is-active");
            document.getElementById("tab-parameters").style.display = "";
            document.getElementById("addToCart").className = "";
            document.getElementById("removeFromCart").className = "hidden";
            obj.display('sample', MM);
            MM.setHistory("Exercice", "u=" + id);
        });
    },
    /**
     * regarde les paramètres fournis dans l'url
     * et lance le diapo ou passe en mode édition
     * edit est true si appelé par l'historique pour édition
     */
    async checkURL(urlString = false, start = true, edit = false) {
        const vars = utils.getUrlVars(urlString);
        if (vars.edit !== undefined) {
            edit = true;
        }
        // cas d'une page prévue pour exercice.html
        if (vars.cor && vars.ex && location.href.indexOf("exercices.html") < 0 && !edit) {
            // on redirige vers exercice.html
            let url = new URL(location.href);
            location.href = url.origin + url.pathname.replace("index.html", "") + "exercices.html" + url.search;
        }
        if (vars.embed !== undefined) {
            // cas d'une activité embeded, on vérifie que l'url est conforme
            let expression =
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            let regex = new RegExp(expression);
            if (vars.embed.match(regex))
                MM.embededIn = vars.embed;
        }
        if (vars.n !== undefined && vars.cd === undefined && !edit) { // un niveau à afficher
            library.displayContent(vars.n, true);
            return;
        } else if (vars.u !== undefined && vars.cd === undefined && !edit) { // ancien exo MM1
            let regexp = /(\d+|T|G|K|H)/;// le fichier commence par un nombre ou un T pour la terminale
            // un paramétrage d'exercice à afficher
            if (_.isArray(vars.u)) {
                let listeURLs = [];
                // il peut y avoir plusieurs exercices correspondant à une activité MM1
                for (let i = 0; i < vars.u.length; i++) {
                    let url = vars.u[i];
                    let level = regexp.exec(url)[0];
                    listeURLs.push({ u: "N" + level + "/" + url + ".json", t: "" });
                }
                library.displayContent(listeURLs);
            } else if (vars.u !== undefined) {
                // s'il n'y a qu'une activité, on l'affiche.
                let level = regexp.exec(vars.u)[0];
                library.load("N" + level + "/" + vars.u + ".json", MM.version).then(([json, id]) => {
                    const obj = new activity(json, id);
                    MM.editedActivity = obj;
                    // show tab-content
                    const tab = document.querySelector("a[numero$='parameters'].tabs-menu-link");
                    MM.resetAllTabs();
                    utils.addClass(tab, "is-active");
                    document.getElementById("tab-parameters").style.display = "";
                    document.getElementById("addToCart").className = "";
                    document.getElementById("removeFromCart").className = "hidden";
                    obj.display('sample', MM);
                    MM.setHistory("Exercice", "u=" + id);
                });
            } else {
                let alert = utils.create("div", { className: "message", innerHTML: "Cette activité n'a pas de correspondance dans cette nouvelle version de MathsMentales.<hr class='center w50'>Vous allez être redirigé vers l'ancienne version dans 10s. <a>Go !</a>" });
                alert.onclick = utils.goToOldVersion();
                document.getElementById("tab-accueil").appendChild(alert);
                setTimeout(utils.goToOldVersion, 10000);
            }
        } else if (vars.c !== undefined) { // présence de carts MM v2 à lancer ou éditer
            // si pas d'édition, on lance le diaporama en mode autonome
            if (!edit) {
                location.href = location.href.replace("index.html", "diaporama.html");
            }
            // indique quoi faire avant le slide
            MM.introType = vars.i || "nothing";
            // indique quoi faire après le slide
            MM.endType = vars.e;
            // couleurs des diaporamas
            if (typeof vars.colors === "string") {
                let couleurs = vars.colors.split("~");
                for (let i = 0; i < couleurs.length; i++) {
                    MM.colors[i] = couleurs[i].replace(/_/g, ",");
                    document.getElementById("sddiv" + (i + 1)).style.background = MM.colors[i];
                }
            }
            // Mode online
            if (vars.o) {
                MM.onlineState = vars.o;
            }
            // Mode face to face
            if (vars.f) MM.faceToFace = vars.f;
            // nombre de diaporamas
            if (vars.s) {
                MM.slidersNumber = Number(vars.s);
            }
            // son
            if (vars.snd !== undefined) {
                if (vars.snd !== "null") {
                    sound.setSound(Number(vars.snd));
                }
            }
            // le seed d'aléatorisation est fourni et on n'est pas en mode online
            if ((vars.a && MM.onlineState === "no") || edit) {
                MM.setSeed(vars.a);
                // on check la clé de donnée incluse
                document.getElementById("aleaInURL").checked = true;
            } /*else if(MM.onlineState=="yes" || !vars.a)
                MM.setSeed(utils.seedGenerator());*/
            // on supprime tous les paniers
            MM.resetCarts();
            // orientation dans le cas de 2 diapos
            if (vars.so) {
                MM.slidersOrientation = vars.so;
            }
            // paramètres des activités des paniers
            let json = vars.c;
            // version avant le 15/08/21
            if (typeof vars.c === "string")
                json = JSON.parse(decodeURIComponent(vars.c));
            // la version à partir du 15/08/21 fonctionne avec un objet vars.c déjà construit.
            // alcarts contient des promises qu'il faut charger
            let allcarts = [];
            for (const i in json) {
                MM.carts[i] = new cart(i);
                allcarts.push(MM.carts[i].import(json[i], start, MM.version));
            }
            // on attend le résultat de toutes les promesses pour mettre à jour les affichages.
            Promise.all(allcarts).then(data => {
                // on prépare l'affichage des paniers
                MM.resetInterface();
                MM.restoreCartsInterface();
                MM.showCartInterface();
                MM.showCart(1);
                MM.editActivity(0);
                // on affiche l'interface de paramétrage si on est en mode édition
                if (edit) {
                    MM.showTab("tab-parameters");
                    // remplissage des données ceinture
                    if (utils.getTypeOfURL(urlString) === "paramsceinture") {
                        document.getElementById("ceinttitle").value = vars.t ? decodeURIComponent(vars.t) : "";
                        document.getElementById("ceintcols").value = vars.nc;
                        document.getElementById("ceintcolsval").value = vars.nc;
                        let coltitles = document.getElementById("ceintcolumnTitle");
                        coltitles.innerHTML = "";
                        for (let i = 0, tot = Number(vars.nc); i < tot; i++) {
                            if (i > 0) coltitles.appendChild(utils.create("br"));
                            coltitles.appendChild(utils.create("label", { "for": "ceinttitlecol" + (i + 1), innerHTML: "Colonne " + (i + 1) + " :" }))
                            coltitles.appendChild(utils.create("input", { "type": "text", id: "ceinttitlecol" + (i + 1), value: vars["t" + i] ? decodeURIComponent(vars["t" + i]) : "" }))
                        }
                        document.getElementById("ceintrows").value = vars.nr;
                        document.getElementById("ceintrowsval").value = vars.nr;
                        document.getElementById("ceintqty").value = vars.n;
                        document.getElementById("ceintqtyvalue").value = vars.n;
                        utils.checkRadio("ceintcorrpos", vars.cor);
                        document.getElementById("ceintpiedcol").value = vars.pie;
                        utils.checkRadio("ceintorientation", vars.o ? vars.o : "portrait");
                    }
                    // on sélectionne le menu qu'il faut
                    utils.selectOption("chooseParamType", utils.getTypeOfURL(urlString));
                    let element = document.getElementById("chooseParamType");
                    element.dispatchEvent(new Event('change', { 'bubbles': true }));
                }
            }).catch(err => {
                // erreur à l'importation :(
                let alert = utils.create("div",
                    {
                        id: "messageerreur",
                        className: "message",
                        innerHTML: "Impossible de charger les paniers :(<br>" + err
                    });
                document.getElementById("tab-accueil").appendChild(alert);
                // on fermet le message d'alerte après 3 secondes
                setTimeout(() => {
                    let div = document.getElementById('messageerreur');
                    div.parentNode.removeChild(div);
                }, 3000);
            });
        } else if (vars.cd !== undefined || vars.panier !== undefined) { // activité unique importée de MM v1
            // affichage d'un message de redirection
            let alert = utils.create("div", { className: "message", innerHTML: "Ceci est le nouveau MathsMentales, les anciennes adresses ne sont malheureusement plus compatibles.<hr class='center w50'>Vous allez être redirigé vers l'ancienne version de MathsMentales dans 6 s. <a href='javascript:utils.goToOldVersion();'>Go !</a>" });
            document.getElementById("tab-accueil").appendChild(alert);
            setTimeout(utils.goToOldVersion, 6000);
        }
    },
    // open an modal and
    // get the URL of direct access to the activity with actual parameters
    copyURL(type = "") {
        const colparams = document.getElementById("colparameters");
        let modalMessage = utils.create("div",
            {
                id: "urlCopy",
                className: "message",
                style: "padding:1.5rem",
                innerHTML: `<div>Adresse longue<div>
                <textarea readonly="true" id="bigurl" cols="38" onfocus=""></textarea><br>
                <button id="btn-urlshorter">Raccourcir l'url</button><br>
                <input readonly="true" type="url" id="shorturl" size="38">
                <div id="shortQRdiv"></div>
                `
            })
        colparams.addEventListener("click", (evt) => {
            if (evt.target.id === "btn-urlshorter") MM.getQR();
        });
        colparams.addEventListener("focus", (evt) => {
            if (["bigurl", "shorturl"].indexOf(evt.target.id) > -1) utils.copy(evt.target);
        })
        //let carts = this.export();
        let withSeed = false;
        if (document.getElementById("aleaInURL").checked) withSeed = true;
        let params = this.paramsToURL(withSeed, type);
        let close = utils.create("button", { innerHTML: "<i class='sprite sprite-closebutton32'></i>", style: "position:absolute;top:0.5rem;right:0.5rem;padding:0;background:transparent" });
        close.onclick = () => { let m = document.getElementById("urlCopy"); m.parentNode.removeChild(m) };
        modalMessage.appendChild(close);
        colparams.appendChild(modalMessage);
        //if(document.getElementById("aleaInURL").checked)params.a = MM.seed;
        let input = document.getElementById("bigurl");
        input.value = this.setURL(params, type);
        // on affiche (furtivement) le input pour que son contenun puisse être sélectionné.
        //input.className = "";
        //let value = input.value;
        navigator.clipboard.writeText(input.value);
        input.select();
        input.setSelectionRange(0, 99999);
        //document.execCommand("copy");
        //input.className ="hidden";
        //let message = document.querySelector(".button--inverse .tooltiptext").innerHTML;
        //document.querySelector(".button--inverse .tooltiptext").innerHTML = "Copié !";
        //setTimeout(()=>document.querySelector(".button--inverse .tooltiptext").innerHTML = message,2500);
    },
    copyURLtoHistory(type = "") {
        //let carts = this.export();
        const contener = document.querySelector("#tab-historique ol");
        let withSeed = true;
        let params = this.paramsToURL(withSeed, type);
        let url = this.setURL(params, type);
        let paramsSansSeed = this.paramsToURL(false, type);
        let urlSansSeed = this.setURL(paramsSansSeed, type);
        let li = utils.create("li");
        let typeName = "Panier"
        if (type === "cansheet") {
            typeName = "🏃‍♀️ Course aux nombres"
        } else if (type === "exosheet") {
            typeName = "📖 Fiche d'exercices"
        } else if (type === "exam") {
            typeName = "📝 Interrogation"
        } else if (type === "duel") {
            typeName = "💫 Duel"
        } else if (type === "ceinture") {
            typeName = "🥋 Ceinture"
        } else if (type === 'cartesflash') {
            typeName = '⚡ Cartes flash'
        } else if (type === 'puzzle') {
            typeName = '🧩 Puzzle'
        } else if (type === 'whogots') {
            typeName = '⁉️ J’ai/Qui a ?'
        } else if (type === 'dominos') {
            typeName = '🀄 Dominos'
        }
        let span = utils.create("span", { innerText: typeName + " du " + utils.getDate() + ": ", className: "bold" });
        li.appendChild(span);
        const a = utils.create("a", { href: url, innerText: "🎯 lien (mêmes données)" });
        li.appendChild(a);
        const a2 = utils.create("a", { href: urlSansSeed, innerText: "🎯 lien (autres données)" });
        li.appendChild(a2);
        let button = `
        <span class="pointer underline" data-url="${url}">🛠 éditer</span>
        <span class="pointer underline">❌ Supprimer</span>
        `;
        li.innerHTML += button;
        li.appendChild(this.getCartsContent());
        // on supprime les anciennes références à la même activité
        try {
            let lis = document.querySelectorAll("#tab-historique span[data-url='" + url + "']");
            for (let k = 0; k < lis.length; k++) {
                let parent = lis[k].parentNode;
                contener.removeChild(parent);
            }
        } catch (err) {
            console.log(err)
        }
        // insertion de l'élément
        contener.prepend(li);
        // TODO
        // on supprime les références qui datent de plus de ...
        if (window.localStorage) {
            localStorage.setItem("history", contener.innerHTML);
        }
    },
    /**
     * Enlève un élément du DOM de l'historique et enregistre localement au cas où.
     * @param {DOM element} elem 
     */
    removeFromHistory(elem) {
        if (!confirm("Supprimer cet élément : \n" + elem.childNodes[0].innerText + " ?")) return false;
        document.querySelector("#tab-historique ol").removeChild(elem);
        // sauvergarde du résultat
        if (window.localStorage) {
            localStorage.setItem("history", document.querySelector("#tab-historique ol").innerHTML);
        }
    },
    /**
     * Supprime les éléments d'un historique
     */
    removeSelectionFromHistory() {
        const CHECKED = document.querySelectorAll("#tab-historique input[class='checkhistoric']:checked");
        for (let i = CHECKED.length - 1; i >= 0; i--) {
            let parent = CHECKED[i].parentNode;
            parent.parentNode.removeChild(parent);
        }
        // sauvergarde du résultat
        if (window.localStorage) {
            this.createSelectHistory();
            localStorage.setItem("history", document.querySelector("#tab-historique ol").innerHTML);
            this.createSelectHistory();
        }
    },
    /**
     * Ajoute des cases de sélection de l'historique pour des actions groupées.
     */
    createSelectHistory() {
        if (!this.historySelectCreated) {
            this.historySelectCreated = true;
            const LISTE = document.querySelectorAll("#tab-historique > ol > li");
            for (let i = 0; i < LISTE.length; i++) {
                let input = utils.create("input", { type: "checkbox", value: i, selected: false, className: "checkhistoric" });
                LISTE[i].prepend(input);
            }
            document.getElementById("actionsSelectHist").className = "";
        } else {
            this.destroySelectHistory();
            document.getElementById("actionsSelectHist").className = "hidden";
        }
    },
    /**
     * Détruit les cases de sélection.
     */
    destroySelectHistory() {
        this.historySelectCreated = false;
        const LISTE = document.querySelectorAll("#tab-historique > ol > li > input");
        for (let i = 0; i < LISTE.length; i++) {
            LISTE[i].parentNode.removeChild(LISTE[i]);
        }
    },
    /**
     * Supprime tous les éléments de l'historique
     */
    emptyHistory() {
        if (!confirm("Confirmez-vous la suppression de tout l'historique ?")) return false;
        document.querySelector("#tab-historique ol").innerHTML = "";
        if (window.localStorage) {
            localStorage.setItem("history", "");
        }
    },
    getQR() {
        // si on n'est pas en mode edition de panier.
        if (MM.carts.length < 2 && MM.carts[0].activities.length < 2) {
            MM.carts[0].activities = [];
            MM.carts[0].addActivity(MM.editedActivity);
        }
        // on récupère l'adresse créée
        const url = document.getElementById("bigurl").value;
        // raccourcissement de l'url
        const alert = document.getElementById("shortQRdiv");
        alert.innerHTML = "";
        const div = utils.create("div", { className: 'lds-ellipsis', innerHTML: "<div></div><div></div><div></div><div></div>" });
        const div2 = utils.create("div", { innerHTML: "Génération en cours" });
        alert.appendChild(div);
        alert.appendChild(div2);
        const shorter = new XMLHttpRequest();
        shorter.onload = function () {
            try {
                alert.removeChild(div);
                alert.removeChild(div2);
                let shorturl = shorter.responseText;
                if (shorturl.indexOf("https:") !== 0) {
                    alert.appendChild(utils.create("h2", { innertext: "Problème de récupération de l'url courte" }));
                    return;
                }
                alert.appendChild(utils.create("h2", { innerText: "QRcode de l'exercice" }));
                const qrdest = utils.create("img", { id: "qrious", "title": "Clic droit pour copier l'image" });
                alert.appendChild(qrdest);
                let inputShortUrl = document.getElementById("shorturl");
                inputShortUrl.value = shorturl;
                inputShortUrl.select();
                inputShortUrl.setSelectionRange(0, 99999);
                document.execCommand("copy");
                let QR = new QRious({
                    element: qrdest,// DOM destination
                    value: shorturl,
                    size: 200,
                    padding: 12
                });
            } catch (err) {
                console.log(err);
            }
        }
        shorter.open("get", "getshort.php?url=" + encodeURIComponent(url));
        shorter.send();
    },
    // Met en mode annotation
    annotateThisThing: function (target, btnId) {
        if (target === false && MM.annotate !== undefined) {
            MM.annotate.destroy();
            MM.annotate = undefined;
        } else if (MM.annotate === undefined && _.isString(target)) {
            MM.annotate = new draw(target, btnId, this.touched);
        } else if (MM.annotate !== undefined) {
            MM.annotate.destroy();
            MM.annotate = undefined;
        }
    },
    /**
     * Création et complétion des infos de tuiles de la page d'accueil
     */
    createTuiles() {
        let grille;
        const ordre = library.ordre;
        function setContent(id, obj) {
            const elt = utils.create("article", { "className": "tuile", "title": "Cliquer pour afficher toutes les activités du niveau" });
            const titre = utils.create("h3", { "innerHTML": obj.nom });
            elt.appendChild(titre);
            const nba = utils.create("div", { "innerHTML": obj.activitiesNumber + " activités" });
            elt.onclick = () => { library.displayContent(id, true) };
            elt.appendChild(nba);
            grille.appendChild(elt);
        }
        for (const o in ordre) {
            grille = document.getElementById(o);
            for (let i = 0; i < ordre[o].length; i++) {
                if (MM.content[ordre[o][i]].activitiesNumber === undefined || MM.content[ordre[o][i]].activitiesNumber === 0 || i === "activitiesNumber") continue;
                setContent(ordre[o][i], MM.content[ordre[o][i]]);
            }
        }
    },
    /**
     * Création des checkbox pour sélectionner les niveaux dans lesquels chercher.
     */
    createSearchCheckboxes() {
        let dest = document.getElementById("searchLevels");
        const ordre = library.ordre;
        for (const o in ordre) {
            for (let i = 0; i < ordre[o].length; i++) {
                if (MM.content[ordre[o][i]].activitiesNumber === undefined || MM.content[ordre[o][i]].activitiesNumber === 0 || i === "activitiesNumber")
                    continue;
                const div = utils.create("div");
                const input = utils.create("input", { type: "checkbox", name: "searchlevel", value: ordre[o][i], className: "checkbox", id: "ccbs" + ordre[o][i] });
                input.onclick = () => { library.displayContent(document.getElementById("searchinput").value) };
                const label = utils.create("label", { for: "ccbs" + ordre[o][i], innerText: MM.content[ordre[o][i]].nom });
                label.onclick = (evt) => { document.getElementById(evt.target.for).click() };
                div.appendChild(input);
                div.appendChild(label);
                dest.appendChild(div);
            }
        }
    },
    /**
     * Export all carts as string
     * @returns String 
     */
    export() {
        let urlString = "";
        if (MM.carts[0].activities.length < 2 && MM.carts.length === 1) {
            MM.carts[0].activities = [];
            MM.carts[0].addActivity(MM.editedActivity);
        }
        MM.checkIntro();
        //MM.setSeed();
        //let carts = {};
        for (let i = 0; i < this.carts.length; i++) {
            //carts[i] = this.carts[i].export();
            urlString += this.carts[i].export();
        }
        return urlString;//carts;
    },
    setURL(string, type) {
        if (utils.baseURL.indexOf("index.html") < 0) utils.baseURL += "index.html";
        if (type === "exosheet") {
            return utils.baseURL.replace('index', 'exercices') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "exam") {
            return utils.baseURL.replace('index', 'exam') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "cansheet") {
            return utils.baseURL.replace('index', 'courseauxnombres') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "cartesflash") {
            return utils.baseURL.replace('index', 'cartesflash') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "wall") {
            return utils.baseURL.replace('index', 'wall') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "dominos") {
            return utils.baseURL.replace('index', 'dominos') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "whogots") {
            return utils.baseURL.replace('index', 'jaiquia') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "puzzle") {
            return utils.baseURL.replace('index', 'puzzle') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "duel") {
            return utils.baseURL.replace('index', 'duel') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "ceinture") {
            return utils.baseURL.replace('index', 'ceinture') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else if (type === "diaporama") {
            return utils.baseURL.replace('index', 'diaporama') + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
        } else
            return utils.baseURL + '?' + string + (MM.embededIn ? '&embed=' + MM.embededIn : "");
    },
    checkIntro: function () {
        MM.introType = utils.getRadioChecked("beforeSlider");
        MM.endType = utils.getRadioChecked("endOfSlideRadio");
    },
    showQuestions: function () {
        if (!MM.carts[0].activities.length)
            MM.carts[0].addActivity(MM.editedActivity);
        MM.setSeed();
        MM.populateQuestionsAndAnswers();
        MM.showTab(document.querySelector("[numero='#tab-enonce'].tabs-menu-link"));
        if (MM.carts.length === 1 && MM.carts[0].activities.length === 1) {
            MM.resetCarts();
            MM.editedActivity.display('sample', this);
        }
    },
    showAnswers: function () {
        if (!MM.carts[0].activities.length)
            MM.carts[0].addActivity(MM.editedActivity);
        MM.setSeed();
        MM.populateQuestionsAndAnswers();
        MM.showTab(document.querySelector("[numero='#tab-corrige'].tabs-menu-link"));
        if (MM.carts.length === 1 && MM.carts[0].activities.length === 1) {
            MM.resetCarts();
            MM.editedActivity.display('sample', this);
        }
    },
    setMinimalDisposition: function (index) {
        let radios = document.querySelectorAll("input[name='Enonces']");
        for (let i = 0, l = radios.length; i < l; i++) {
            if (i < index) {
                radios[i].disabled = true;
            } else {
                radios[i].disabled = false;
            }
            if (i === index && MM.slidersNumber <= index + 1) {
                radios[i].checked = true;
                MM.setDispositionEnonce(index + 1);
            }
        }
    },
    /**
     * déclenché par les boutons radio
     * règle l'affichage des disposition dans la fenêtre de paramétrage
     * et indique aux paniers où s'afficher
     * @param {integer} value Nombre de diaporamas à afficher
     */
    setDispositionEnonce: function (value) {
        value = Number(value);
        MM.slidersNumber = value;
        document.getElementById("facetofaceOption").className = "";
        if (value > 1) {
            // si plusieurs diapos, on rend l'audio indisponible
            MM.setAudio(0);
        }
        if (value === 1) {
            document.getElementById("sddiv1").className = "sddiv1";
            document.getElementById("sddiv2").className = "hidden";
            document.getElementById("sddiv3").className = "hidden";
            document.getElementById("sddiv4").className = "hidden";
            document.getElementById("divisionsOption").className = "hidden";
            MM.setDispositionDoubleEnonce('h');
            MM.carts[0].target = [1];
            document.getElementById("facetofaceOption").className = "hidden";
        } else if (value === 2) {
            let directions = document.querySelectorAll("input[name='direction']");
            if (directions[0].checked) { // horizontal
                MM.setDispositionDoubleEnonce('h');
            } else {
                MM.setDispositionDoubleEnonce('v');
            }
            if (MM.faceToFace === "y")
                document.getElementById("sddiv1").className = "sddiv2 return";
            else
                document.getElementById("sddiv1").className = "sddiv2";
            document.getElementById("sddiv2").className = "sddiv2";
            document.getElementById("sddiv3").className = "hidden";
            document.getElementById("sddiv4").className = "hidden";
            document.getElementById("divisionsOption").className = "";
            if (value > MM.carts.length) {
                MM.carts[0].target = [1, 2];
            } else {
                MM.carts[0].target = [1];
                MM.carts[1].target = [2];
            }
        } else if (value === 3) {
            if (MM.faceToFace === "y") {
                document.getElementById("sddiv1").className = "sddiv34 return";
                document.getElementById("sddiv2").className = "sddiv34 return";
            } else {
                document.getElementById("sddiv1").className = "sddiv34";
                document.getElementById("sddiv2").className = "sddiv34";
            }
            document.getElementById("sddiv3").className = "sddiv34";
            document.getElementById("sddiv4").className = "hidden";
            document.getElementById("divisionsOption").className = "hidden";
            MM.setDispositionDoubleEnonce('h');
            if (MM.carts.length === 1) {
                MM.carts[0].target = [1, 2, 3];
            } else if (MM.carts.length === 2) {
                MM.carts[0].target = [1, 2];
                MM.carts[1].target = [3];
            } else {
                MM.carts[0].target = [1];
                MM.carts[1].target = [2];
                MM.carts[2].target = [3];
            }
        } else if (value === 4) {
            if (MM.faceToFace === "y") {
                document.getElementById("sddiv1").className = "sddiv34 return";
                document.getElementById("sddiv2").className = "sddiv34 return";
            } else {
                document.getElementById("sddiv1").className = "sddiv34";
                document.getElementById("sddiv2").className = "sddiv34";
            }
            document.getElementById("sddiv3").className = "sddiv34";
            document.getElementById("sddiv4").className = "sddiv34";
            document.getElementById("divisionsOption").className = "hidden";
            MM.setDispositionDoubleEnonce('h');
            if (MM.carts.length === 1) {
                MM.carts[0].target = [1, 2, 3, 4];
            } else if (MM.carts.length === 2) {
                MM.carts[0].target = [1, 2];
                MM.carts[1].target = [3, 4];
            } else if (MM.carts.length === 3) {
                MM.carts[0].target = [1, 2];
                MM.carts[1].target = [3];
                MM.carts[2].target = [4];
            } else {
                MM.carts[0].target = [1];
                MM.carts[1].target = [2];
                MM.carts[2].target = [3];
                MM.carts[3].target = [4];
            }
        }
        for (let i = 0, l = MM.carts.length; i < l; i++) {
            MM.carts[i].display(MM.carts);
        }
    },
    setDispositionDoubleEnonce: function (option) {
        if (option === "h") {
            MM.slidersOrientation = "h";
            document.getElementById("screen-division").className = "";
            document.querySelector("input[name='direction'][value='h']").checked = true;
        } else {
            MM.slidersOrientation = "v";
            document.getElementById("screen-division").className = "vertical";
            document.querySelector("input[name='direction'][value='v']").checked = true;
        }
    }
}