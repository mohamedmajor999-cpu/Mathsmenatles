import utils from "./utils.js";
import scratchblocks from "../libs/scratchblocks/scratchblocks.min.es.js";

scratchblocks.loadLanguages({
    fr: {
        "commands": {
          "MOTION_MOVESTEPS": "avancer de %1 pas",
          "MOTION_TURNRIGHT": "tourner @turnRight de %1 degrés",
          "MOTION_TURNLEFT": "tourner @turnLeft de %1 degrés",
          "MOTION_POINTINDIRECTION": "s'orienter à %1",
          "MOTION_POINTTOWARDS": "s'orienter vers %1",
          "MOTION_GOTOXY": "aller à x: %1 y: %2",
          "MOTION_GOTO": "aller à %1",
          "MOTION_GLIDESECSTOXY": "glisser en %1 secondes à x: %2 y: %3",
          "MOTION_GLIDETO": "glisser en %1 secondes à %2",
          "MOTION_CHANGEXBY": "ajouter %1 à x",
          "MOTION_SETX": "mettre x à %1",
          "MOTION_CHANGEYBY": "ajouter %1 à y",
          "MOTION_SETY": "mettre y à %1",
          "MOTION_SETROTATIONSTYLE": "fixer le sens de rotation %1",
          "LOOKS_SAYFORSECS": "dire %1 pendant %2 secondes",
          "LOOKS_SAY": "dire %1",
          "LOOKS_THINKFORSECS": "penser à %1 pendant %2 secondes",
          "LOOKS_THINK": "penser à %1",
          "LOOKS_SHOW": "montrer",
          "LOOKS_HIDE": "cacher",
          "LOOKS_SWITCHCOSTUMETO": "basculer sur le costume %1",
          "LOOKS_NEXTCOSTUME": "costume suivant",
          "LOOKS_NEXTBACKDROP_BLOCK": "arrière-plan suivant",
          "LOOKS_SWITCHBACKDROPTO": "basculer sur l'arrière-plan %1",
          "LOOKS_SWITCHBACKDROPTOANDWAIT": "basculer sur l'arrière-plan %1 et attendre",
          "LOOKS_CHANGEEFFECTBY": "ajouter %2 à l'effet %1",
          "LOOKS_SETEFFECTTO": "mettre l'effet %1 à %2",
          "LOOKS_CLEARGRAPHICEFFECTS": "annuler les effets graphiques",
          "LOOKS_CHANGESIZEBY": "ajouter %1 à la taille",
          "LOOKS_SETSIZETO": "mettre la taille à %1 % de la taille initiale",
          "LOOKS_GOTOFRONTBACK": "aller à l'%1 plan",
          "LOOKS_GOFORWARDBACKWARDLAYERS": "déplacer de %2 plans vers l'%1",
          "SOUND_PLAY": "jouer le son %1",
          "SOUND_CHANGEEFFECTBY": "ajouter %2 à l'effet %1",
          "SOUND_SETEFFECTO": "mettre l'effet %1 à %2",
          "SOUND_CLEAREFFECTS": "annuler tous les effets sonores",
          "SOUND_PLAYUNTILDONE": "jouer le son %1 jusqu'au bout",
          "SOUND_STOPALLSOUNDS": "arrêter tous les sons",
          "music.playDrumForBeats": "jouer du tambour %1 pendant %2 temps",
          "music.restForBeats": "faire une pause pendant %1 temps",
          "music.playNoteForBeats": "jouer la note %1 pendant %2 temps",
          "music.setInstrument": "choisir l'instrument n° %1",
          "SOUND_CHANGEVOLUMEBY": "ajouter %1 au volume",
          "SOUND_SETVOLUMETO": "mettre le volume à %1%",
          "music.changeTempo": "ajouter %1 au tempo",
          "music.setTempo": "mettre le tempo à %1",
          "pen.clear": "effacer tout",
          "pen.stamp": "estampiller",
          "pen.penDown": "stylo en position d'écriture",
          "pen.penUp": "relever le stylo",
          "pen.setColor": "mettre la couleur du stylo à %1",
          "pen.changeHue": "ajouter %1 à la couleur du stylo",
          "pen.setColorParam": "mettre la %1 du stylo à %2",
          "pen.changeColorParam": "ajouter %2 à la %1 du stylo",
          "pen.setHue": "mettre la couleur du stylo à %1",
          "pen.changeShade": "ajouter %1 à l'intensité du stylo",
          "pen.setShade": "mettre l'intensité du stylo à %1",
          "pen.changeSize": "ajouter %1 à la taille du stylo",
          "pen.setSize": "mettre la taille du stylo à %1",
          "EVENT_WHENFLAGCLICKED": "quand @greenFlag est cliqué",
          "EVENT_WHENKEYPRESSED": "quand la touche %1 est pressée",
          "EVENT_WHENTHISSPRITECLICKED": "quand ce sprite est cliqué",
          "EVENT_WHENSTAGECLICKED": "quand la scène est cliquée",
          "EVENT_WHENBACKDROPSWITCHESTO": "quand l'arrière-plan bascule sur %1",
          "EVENT_WHENGREATERTHAN": "quand le %1 > %2",
          "EVENT_WHENBROADCASTRECEIVED": "quand je reçois %1",
          "EVENT_BROADCAST": "envoyer à tous %1",
          "EVENT_BROADCASTANDWAIT": "envoyer à tous %1 et attendre",
          "CONTROL_WAIT": "attendre %1 secondes",
          "CONTROL_REPEAT": "répéter %1 fois",
          "CONTROL_FOREVER": "répéter indéfiniment",
          "CONTROL_IF": "si %1 alors",
          "CONTROL_WAITUNTIL": "attendre jusqu'à ce que %1",
          "CONTROL_REPEATUNTIL": "répéter jusqu'à ce que %1",
          "CONTROL_STOP": "stop %1",
          "CONTROL_STARTASCLONE": "quand je commence comme un clone",
          "CONTROL_CREATECLONEOF": "créer un clone de %1",
          "CONTROL_DELETETHISCLONE": "supprimer ce clone",
          "SENSING_ASKANDWAIT": "demander %1 et attendre",
          "videoSensing.videoToggle": "%1 la vidéo",
          "videoSensing.setVideoTransparency": "mettre la transparence de la vidéo à %1",
          "videoSensing.whenMotionGreaterThan": "quand le mouvement de la vidéo > %1",
          "SENSING_RESETTIMER": "réinitialiser le chronomètre",
          "DATA_SETVARIABLETO": "mettre %1 à %2",
          "DATA_CHANGEVARIABLEBY": "ajouter %2 à %1",
          "DATA_SHOWVARIABLE": "montrer la variable %1",
          "DATA_HIDEVARIABLE": "cacher la variable %1",
          "DATA_ADDTOLIST": "ajouter %1 à %2",
          "DATA_DELETEOFLIST": "supprimer l'élément %1 de %2",
          "DATA_DELETEALLOFLIST": "supprimer tous les éléments de la liste %1",
          "MOTION_IFONEDGEBOUNCE": "rebondir si le bord est atteint",
          "DATA_INSERTATLIST": "insérer %1 en position %2 de %3",
          "DATA_REPLACEITEMOFLIST": "remplacer l'élément %1 de la liste %2 par %3",
          "DATA_SHOWLIST": "montrer la liste %1",
          "DATA_HIDELIST": "cacher la liste %1",
          "SENSING_OF_XPOSITION": "abscisse x",
          "SENSING_OF_YPOSITION": "ordonnée y",
          "SENSING_OF_DIRECTION": "direction",
          "SENSING_OF_COSTUMENUMBER": "numéro de costume",
          "LOOKS_COSTUMENUMBERNAME": "%1 du costume",
          "SENSING_OF_SIZE": "taille",
          "SENSING_OF_BACKDROPNAME": "nom de l'arrière-plan",
          "LOOKS_BACKDROPNUMBERNAME": "%1 de l'arrière-plan",
          "SENSING_OF_BACKDROPNUMBER": "numéro de l'arrière-plan",
          "SOUND_VOLUME": "volume",
          "music.getTempo": "tempo",
          "SENSING_TOUCHINGOBJECT": "touche le %1 ?",
          "SENSING_TOUCHINGCOLOR": "couleur %1 touchée ?",
          "SENSING_COLORISTOUCHINGCOLOR": "couleur %1 touche %2 ?",
          "SENSING_DISTANCETO": "distance de %1",
          "SENSING_ANSWER": "réponse",
          "SENSING_KEYPRESSED": "touche %1 pressée ?",
          "SENSING_MOUSEDOWN": "souris pressée ?",
          "SENSING_MOUSEX": "souris x",
          "SENSING_MOUSEY": "souris y",
          "SENSING_SETDRAGMODE": "mettre mode de glissement à %1",
          "SENSING_LOUDNESS": "volume sonore",
          "videoSensing.videoOn": "%1 de la vidéo de %2",
          "SENSING_TIMER": "chronomètre",
          "SENSING_OF": "%1 de %2",
          "SENSING_CURRENT": "%1 actuelle",
          "SENSING_DAYSSINCE2000": "jours depuis 2000",
          "SENSING_USERNAME": "nom d'utilisateur",
          "OPERATORS_ADD": "%1 + %2",
          "OPERATORS_SUBTRACT": "%1 - %2",
          "OPERATORS_MULTIPLY": "%1 * %2",
          "OPERATORS_DIVIDE": "%1 / %2",
          "OPERATORS_RANDOM": "nombre aléatoire entre %1 et %2",
          "OPERATORS_LT": "%1 < %2",
          "OPERATORS_EQUALS": "%1 = %2",
          "OPERATORS_GT": "%1 > %2",
          "OPERATORS_AND": "%1 et %2",
          "OPERATORS_OR": "%1 ou %2",
          "OPERATORS_NOT": "non %1",
          "OPERATORS_JOIN": "regrouper %1 et %2",
          "OPERATORS_LETTEROF": "lettre %1 de %2",
          "OPERATORS_LENGTH": "longueur de %1",
          "OPERATORS_MOD": "%1 modulo %2",
          "OPERATORS_ROUND": "arrondi de %1",
          "OPERATORS_MATHOP": "%1 de %2",
          "OPERATORS_CONTAINS": "%1 contient %2 ?",
          "DATA_ITEMOFLIST": "élément %1 de %2",
          "DATA_ITEMNUMOFLIST": "position de %1 dans %2",
          "DATA_LENGTHOFLIST": "longueur de %1",
          "DATA_LISTCONTAINSITEM": "%1 contient %2 ?",
          "CONTROL_ELSE": "sinon",
          "SENSING_USERID": "id de l'utilisateur",
          "SENSING_LOUD": "fort ?",
          "text2speech.speakAndWaitBlock": "prononcer %1",
          "text2speech.setVoiceBlock": "choisir la voix du %1",
          "text2speech.setLanguageBlock": "mettre la langue à %1",
          "translate.translateBlock": "traduire %1 en %2",
          "translate.viewerLanguage": "langue",
          "makeymakey.whenKeyPressed": "quand la touche %1 pressée",
          "makeymakey.whenKeysPressedInOrder": "quand %1 sont pressés dans l'ordre",
          "microbit.whenButtonPressed": "quand le bouton %1 est appuyé",
          "microbit.isButtonPressed": "bouton %1 appuyé ?",
          "microbit.whenGesture": "quand %1",
          "microbit.displaySymbol": "afficher %1",
          "microbit.displayText": "afficher le texte %1",
          "microbit.clearDisplay": "effacer l'écran",
          "microbit.whenTilted": "quand incliné %1",
          "microbit.isTilted": "incliné %1 ?",
          "microbit.tiltAngle": "angle d'inclinaison %1",
          "microbit.whenPinConnected": "quand la broche %1 est connectée",
          "ev3.motorTurnClockwise": "faire tourner le moteur %1 dans ce sens-ci pendant %2 secondes",
          "ev3.motorTurnCounterClockwise": "faire tourner le moteur %1 dans ce sens-là pendant %2 secondes",
          "ev3.motorSetPower": "mettre la puissance du moteur %1 à %2 %",
          "ev3.getMotorPosition": "position du moteur %1",
          "ev3.whenButtonPressed": "quand le bouton %1 est appuyé",
          "ev3.whenDistanceLessThan": "quand la distance < %1",
          "ev3.whenBrightnessLessThan": "quand la luminosité < %1",
          "ev3.buttonPressed": "bouton %1 appuyé ?",
          "ev3.getDistance": "distance",
          "ev3.getBrightness": "luminosité",
          "ev3.beepNote": "jouer la note %1 pendant %2 secondes",
          "wedo2.motorOn": "allumer %1",
          "wedo2.motorOff": "éteindre %1",
          "wedo2.startMotorPower": "set %1 power to %2",
          "wedo2.setMotorDirection": "mettre la direction de %1 à %2",
          "wedo2.whenDistance": "quand la distance %1 %2",
          "wedo2.getDistance": "distance",
          "wedo2.motorOnFor": "allumer %1 pendant %2 secondes",
          "wedo2.setLightHue": "mettre la couleur de la lampe à %1",
          "wedo2.playNoteFor": "jouer la note %1 pendant %2 secondes",
          "wedo2.whenTilted": "quand incliné %1",
          "wedo2.isTilted": "incliné %1 ?",
          "wedo2.getTiltAngle": "angle d'inclinaison %1",
          "gdxfor.whenGesture": "quand %1",
          "gdxfor.whenForcePushedOrPulled": "quand le capteur de force est %1",
          "gdxfor.getForce": "force",
          "gdxfor.whenTilted": "quand incliné %1",
          "gdxfor.isTilted": "incliné %1 ?",
          "gdxfor.getTilt": "angle d'inclinaison %1",
          "gdxfor.isFreeFalling": "tombe ?",
          "gdxfor.getSpin": "vitesse de rotation %1",
          "gdxfor.getAcceleration": "accélération %1",
          "boost.motorOnFor": "faire tourner le moteur %1 pendant %2 secondes",
          "boost.motorOnForRotation": "faire tourner le moteur %1 de %2 rotations",
          "boost.motorOn": "allumer le moteur %1",
          "boost.motorOff": "éteindre le moteur %1",
          "boost.setMotorPower": "mettre la vitesse du moteur %1 à %2 %",
          "boost.setMotorDirection": "mettre la direction du moteur %1 à %2",
          "boost.getMotorPosition": "position du moteur %1",
          "boost.whenColor": "quand une brique %1 est vue",
          "boost.seeingColor": "brique %1 vue ?",
          "boost.whenTilted": "quand incliné %1",
          "boost.getTiltAngle": "angle d'inclinaison %1",
          "boost.setLightHue": "mettre la couleur de la lampe à %1"
        },
        "dropdowns": {},
        "ignorelt": [],
        "soundEffects": [
          "hauteur",
          "stéréo gauche/droite"
        ],
        "microbitWhen": [
          "bougé",
          "secoué",
          "sauté"
        ],
        "osis": [
          "autres scripts dans sprite"
        ],
        "definePrefix": [
          "définir"
        ],
        "defineSuffix": [],
        "palette": {
          "Motion": "Mouvement",
          "Looks": "Apparence",
          "Sound": "Son",
          "Events": "Événements",
          "Control": "Contrôle",
          "Sensing": "Capteurs",
          "Operators": "Opérateurs",
          "Variables": "Variables",
          "My Blocks": "Mes Blocs"
        },
        "math": [
          "abs",
          "plancher",
          "plafond",
          "racine",
          "sin",
          "cos",
          "tan",
          "asin",
          "acos",
          "atan",
          "ln",
          "log",
          "e^",
          "10^"
        ],
        "aliases": {
          "tourner gauche de %1 degrés": "MOTION_TURNLEFT",
          "tourner droite de %1 degrés": "MOTION_TURNRIGHT",
          "quand le drapeau vert pressé": "EVENT_WHENFLAGCLICKED",
          "fin": "scratchblocks:end"
        },
        "name": "Français",
        "percentTranslated": 100
      } })

// Figures
export default class Figure {
    constructor(obj, id, target, size){
        this.type = obj.type;
        this.content = obj.content;
        this.boundingbox = obj.boundingbox;
        this.axis = obj.axis;
        this.grid = obj.grid;
        this.id = id;
        this.keepAspect = (obj.keepAspect!==undefined)?obj.keepAspect:true;
        this.size = size;//[w,h]
        this.imgSrc = obj.imgSrc||false;
        this.figure = undefined;
        this.displayed = false;
        this.create(target);
    }
    /**
     * construct de destination DOM element
     * @param {destination} destination DOMelement
     */
    create(destination){
        if(this.type === "chart"){
            let div = utils.create("div",{id:"div-dest-canvas-"+this.id});
            let canvas = document.createElement("canvas");
            canvas.id = this.id;
            if(this.size !== undefined){
                div.style.width = this.size[0]+"px";
                div.style.height = this.size[1]+"px";
            }
            div.appendChild(canvas);
            destination.appendChild(div);
        } else if(this.type === "graph"){
            let div = document.createElement("div");
            div.id=this.id;
            div.className = "jsxbox fig";
            destination.appendChild(div);
        } else if(this.type === "svg"){
            let div = document.createElement("div");
            div.id=this.id;
            destination.appendChild(div);
        } else if(this.type === 'scratch') {
            let div = document.createElement("div");
            div.className = "scratchblocks";
            div.id=this.id;
            destination.appendChild(div);
        }
    }
    /**
     * Crée une copie de la figure dans une nouvelle instance
     * @param {Figure} figure instance d'une figure
     * @returns false si figure n'est pas une instance de figure, sinon la nouvelle instance
     */
    static copyFig(figure, target){
        if(!figure instanceof Figure){
            return false;
        }
        return new this(
                figure,
                figure.id,
                target,
                figure.size
            );
    }
    /**
     * Affiche / cache le graphique dans le corrigé
     */
    toggle(){
        let elt;
        if(this.type ==="chart")
            elt = document.getElementById(this.id).parentNode;
        else if(this.type ==="graph" || this.type === "svg")
            elt = document.getElementById(this.id);
        let cln = elt.className; // div contenant
        if(cln.indexOf("visible")<0){
            utils.addClass(elt,"visible");
            this.display();
        } else {
            utils.removeClass(elt,"visible");
        }
    }
    /**
     * Crée la figure
     * @param {window object} destination 
     * @returns nothing if displayed yet
     */
    display(destination){
        if(this.displayed) return;
        else this.displayed = true;
        // destination is the window destination object if defined
        if(this.type === "svg"){
            let target;
            if(destination === undefined){
                target = document.getElementById(this.id);
                //this.figure = new Chart(target, this.content);
            } else {
                target = destination.document.getElementById(this.id);
                //this.figure = new destination.Chart(target, this.content);
            }
            target.innerHTML = this.content;
        } else if(this.type === "chart"){ // Chart.js
            let target;
            if(destination === undefined){
                target = document.getElementById(this.id);
                //this.figure = new Chart(target, this.content);
            } else {
                target = destination.document.getElementById(this.id);
                //this.figure = new destination.Chart(target, this.content);
            }
            //debug("Chart data", target, utils.clone(this.content));
            this.figure = new Chart(target, this.content);
        } else if(this.type === "graph"){ //JSXGraph
            try{
                //debug(this);
                if(destination === undefined){
                    this.figure = JXG.JSXGraph.initBoard(this.id, {boundingbox:this.boundingbox, keepaspectratio: this.keepAspect, showNavigation: false, showCopyright: false,registerEvents:false, axis:this.axis, grid:this.grid});
                } else {
                    this.figure = destination.JXG.JSXGraph.initBoard(this.id, {boundingbox:this.boundingbox, keepaspectratio: this.keepAspect, showNavigation: false, showCopyright: false,registerEvents:false, axis:this.axis, grid:this.grid});
                }
                let content = utils.clone(this.content);
                let elements = [];
                // content est un tableau de tableaux à 2, 3 ou 4 éléments
                // le premier contient le type d'élément à créer
                // le 2e contient la "commande", généralement un tableau de 2 coordonnées, ou éléments
                // le 3e contient les options pour la création (affichage, taille, ...)
                // le 4e contient la référence à un élément précédemment créé pour l'utiliser dans la commande.
                // pour ce 4e, il faut bien compter les contents en partant de zéro.
                for(let i=0,len=content.length;i<len;i++){
                    let type = content[i][0];
                    let commande = content[i][1];
                    let options = false;
                    let reference = false;
                    if(content[i][2] !== undefined)
                        options = content[i][2];
                    if(content[i][3] !== undefined){
                        reference = elements[content[i][3]];
                        // normalement, il faut remplacer la référence dans la commande
                        commande.forEach(function(elt,index){
                            if(typeof elt === "string")
                                if(elt.indexOf("ref")===0){
                                    commande[index] = elements[Number(elt.substr(3))];
                                }
                        })
                    }
                    if(type === "functiongraph"){
                        let formule = commande;
                        if(!options)
                            this.figure.create("functiongraph", [function(x){return eval(formule)}], {strokeWidth:2});
                        else
                            this.figure.create("functiongraph", [function(x){return eval(formule)}], options);
                    } else if(type==="jessiescript") {
                        if(this.figure.jc === undefined){
                            this.figure.jc = new JXG.JessieCode();
                            this.figure.jc.use(this.figure);
                        }
                        this.figure.jc.parse(commande);
                    } else if(["text", "point","axis", "line", "segment", "angle", "polygon", "transform","intersection"].indexOf(type)>-1){
                        if(!options)
                            elements[i] = this.figure.create(type, commande);
                        else
                            elements[i] = this.figure.create(type,commande,options);
                    }
                }
            } catch(error){
                utils.debug("Figure", error, this);
            }
        } else if(this.type === "scratch"){
            const target = document.getElementById(this.id)
            const code = this.content.join('\n')
            const doc = scratchblocks.parse(code, {style: 'scratch3', languages: ['fr']});
            const svg = scratchblocks.render(doc, {style: 'scratch3', languages: ['fr']});
            target.appendChild(svg);
        }
    }
}
