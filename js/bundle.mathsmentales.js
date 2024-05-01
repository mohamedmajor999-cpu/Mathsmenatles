(function () {
    'use strict';

    // Javascript Objects extensions
    String.prototype.minusculesSansAccent = function(){
        var accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];
        var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

        var str = this;
        for(var i = 0; i < accent.length; i++){
            str = str.replace(accent[i], noaccent[i]);
        }
        return str.toLowerCase();
    };
    /**
     * Supprime un élément d'un tableau
     * @param {various} value 
     * @returns 
     */
    Array.prototype.removeValue = function(value){
        // the value must be unique
        let index = this.indexOf(value);
        if(index>-1) {
            this.splice(index,1);
            return true;
        } else return false;
    };
    /**
     * récupère un tableau des clés d'un tableau
     * @returns keys if array
     */
    Array.prototype.getKeys = function(){
        let table = [];
        for(let i=0,j=this.length;i<j;i++){
            table.push(i);
        }
        return table;
    };

    // Some traductions
    const moisFR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const joursFR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    const utils = {
        baseURL:window.location.href.split("?")[0].split("#")[0],
        seed: "sample",
        security:300,// max number for boucles
        modeDebug : true, 
        debug : function(){
            if(utils.modeDebug)console.log(arguments);
        },
        /**
         * objet contenant des fonctions utiles à MathsMentales
         */
        /**
         * @param {String} type of DOM element
         * @param {object} props properties of the element
         */
        create:function(type,props){
            const elt = document.createElement(type);
            for(const p in props){
                elt[p] = props[p];
            }
            return elt;
        },
        copy(DOMel){
            /*DOMel.select();
            DOMel.setSelectionRange(0,99999);
            document.execCommand("copy");*/
            let text = DOMel.value;
            navigator.clipboard.writeText(text).then(()=>{
                DOMel.className = "copied";
                setTimeout(()=>{DOMel.className="";},3000);    
            }).catch(err=>{console.log("erreur de copie dans le presse papier");});
        },
        pageWidth() {
            return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
        },
        /**
         * La transformation d'une ou d'un panier MMv1 étant assez compliquée,
         * redirection vers le dosser comportant l'ancienne version : /old
         */
        goToOldVersion(){
            window.location.href = (utils.baseURL + 'old/').replace("index.htmlold","old") +(/(^.*\/)(.*)/.exec(window.location.href)[2]);
        },
        /**
         * Performs check on radio button with name and value
         * @param {String} name 
         * @param {String} value 
         * @returns 
         */
        checkRadio(name,value){
            let domElt =  document.querySelector("input[type=radio][name='"+name+"'][value='"+value+"']");
            if(domElt)
                domElt.checked = true;
            else
                return false;
        },
        /**
         * performs check on checkbox inputs from name and values
         * @param {String} name 
         * @param {String, Array} values 
         * @returns 
         */
        checkCheckbox(name,value){
            // remise à zéro de tous les éléments
            document.querySelectorAll("input[type='checkbox'][name='"+name+"']").forEach(el=>{
                el.checked = false;
            });
            if(_.isArray(value)){
                value.forEach(el =>{
                    let domElt = document.querySelector("input[type=checkbox][name='"+name+"'][value='"+el+"']");
                    if(domElt)
                        domElt.checked = true;
                        });
            } else {
                let domElt = document.querySelector("input[type=checkbox][name='"+name+"'][value='"+value+"']");
                if(domElt)
                    domElt.checked = true;
            }
        },
        selectOption(id,value){
            let domElt = document.getElementById(id);
            for(let i=0;i<domElt.options.length;i++){
                if(domElt.options[i].value === value){
                    domElt.selectedIndex = i;
                    break;
                }
            }
        },
        getTypeOfURL(url){
            if(url.indexOf("exercices.html")>-1){
                return "paramsexos"
            } else if(url.indexOf("courseauxnombres.html")>-1){
                return "paramscourse"
            } else if(url.indexOf("dominos.html")>-1){
                return "paramsdominos"
            } else if(url.indexOf("duel.html")>-1){
                return "paramsduel"
            } else if(url.indexOf("ceinture.html")>-1){
                return "paramsceinture"
            } else return "paramsdiapo"
        },
        /**
         * 
         * @param {Array} array tableau contenant des données
         * @param {someThing} value value à rechercher
         * @returns {Number} count nombre des valeurs dans le tableau
         */
        countValue(array, value){
            let count = 0;
            for(let i=0,j=array.length;i<j;i++){
                if(array[i]===value)count++;
            }
            return count;
        },
        /**
         * Endode les accolades dans une chaine car encodeURIComponent ne le fait pas
         * @param {String} url a string corresponding an URL
         * @returns better encoded string
         */
        superEncodeURI:function(url){
            var encodedStr = '', encodeChars = ["(", ")","{","}",",","-"];
            url = encodeURIComponent(url);
            for(var i = 0, len = url.length; i < len; i++) {
              if (encodeChars.indexOf(url[i]) >= 0) {
                  var hex = parseInt(url.charCodeAt(i)).toString(16);
                  encodedStr += '%' + hex;
              }
              else {
                  encodedStr += url[i];
              }
            }
            return encodedStr;
          },
        /**
         * get data form url
         * @returns array of datas from GET vars
         */
        getUrlVars: function(urlString) {
            if(!urlString)urlString = window.location.href;
            var vars = {},
              hash;
            if(urlString.indexOf("#")>0 && urlString.indexOf("?")<0){ // cas d'une activité MMv1
                // cas d'une référence simple à l'exo
                // pour ouvrir l'éditeur sur cet exo
                let idExo = urlString.substring(urlString.indexOf("#") + 1, urlString.length);
                if(MM1toMM2[idExo].new !== undefined){
                    vars.u = MM1toMM2[idExo].new;
                }
            }
            // on fait un tableau de données qui sont séparées par le &
            var hashes = urlString.replace(/\|/g,'/').slice(urlString.indexOf('?') + 1).split('&');
            var len = hashes.length;
            // cas de la version avant le 15/08/21 - simple
            // le tilde ~ est une caractéristique des nouvelles url
            if(urlString.indexOf("~")<0){
                for (var i = 0; i < len; i++) {
                    hash = hashes[i].split('=');
                    vars[hash[0]] = hash[1];
                }
            // version après le 15/08/21
            // reconstruction de la chaine pour en faire un objet
            // la chaine est de la forme
            /* url?i=intro,e=end,o=online,s=nbsliders,so=orientation,f=facetotface,a=seed,colors=color0~color1~color2~color3
                 &p=cartId1~t=title1~c=target1~o=ordered
                _i=activityId1~o=optionsIds~q=subOptionsIds~p=???~t=durée~n=nbquestions
                _i=activityId2~o=optionsIds~q=subOptionsIds~p=???~t=durée~n=nbquestions
                &p=cartId2~t=title2~c=target2~o=ordered
                _i=activityId1~o=optionsIds~q=subOptionsIds~p=???~t=durée~n=nbquestions
                _i=activityId2~o=optionsIds~q=subOptionsIds~p=???~t=durée~n=nbquestions
              optionsIds et subOptionsIds peuvent être une liste d'id séparés par des virgules ou rien
            */
            } else {
                // données générales :
                // la virgule est le séparateur de données avec affectation
                // ces données sont les premières du tableau hashes
                hash = hashes[0].split(",");
                for(let i=0;i<hash.length;i++){
                    // le signe égal est le séparateur variable/valeur
                    let data = hash[i].split("=");
                    vars[data[0]] = data[1]?data[1]:false;
                }
                // vars.c doit contenir les carts. Dans la version après 15/08/21, vars.c est une chaine
                // on reconstruit l'objet json à partir de la chaine
                vars.c = {};
                for(let i=1;i<len;i++){
                    // on ne commence qu'à 1, le zéro ayant déjà été traité ci-dessus
                    // si la première lettre est p, on a un panier
                    if(hashes[i].indexOf("p")===0){
                        // le séparateur d'activités est le _
                        let parts = hashes[i].split("_");
                        // parts[0] contient les données du panier, que l'on stocke dans data
                        // le séparateur de couples var/valeur est ~
                        let data = parts[0].split("~");
                        let datas = {};
                        for(let j=0;j<data.length;j++){
                            // le séparateur var/valeur est =
                            let dataparts = data[j].split("=");
                            datas[dataparts[0]]=decodeURI(dataparts[1]);
                        }
                        let id = datas.p;
                        vars.c[id]={i:datas.p,t:datas.t,c:datas.c,o:datas.o,a:{},d:datas.d,at:datas.at};
                        // parts[>0] : parameters cart's activities
                        for(let j=1;j<parts.length;j++){
                            let datasActivity = parts[j].split("~");
                            vars.c[id].a[j-1] = {};
                            for(let k=0;k<datasActivity.length;k++){
                                let dataparts = datasActivity[k].split("=");
                                if(dataparts[0]==="o"){
                                    vars.c[id].a[j-1][dataparts[0]]=utils.textToTable(dataparts[1]);
                                } else if(dataparts[0]==="q"){
                                    vars.c[id].a[j-1][dataparts[0]]=utils.textToObj(dataparts[1]);
                                } else {
                                    vars.c[id].a[j-1][dataparts[0]]=dataparts[1];
                                }
                            }                            
                        }
                    } else if(hashes[i].indexOf("embed")===0){
                        let parts = hashes[i].split("=");
                        vars.embed = parts[1];
                    }
                }
            }
            return vars;
        },
        /**
         * Donne la date du moment
         * @returns date en français avec jour, heure etc
         */
        getDate(){
            let ladate = new Date(),
            lheure = ladate.getHours(),
            lesminutes = ladate.getMinutes(),
            lessecondes = ladate.getSeconds(),
           ladateComplete = joursFR[ladate.getDay()] + " " + ladate.getDate() + " " + moisFR[ladate.getMonth()] + " " + ladate.getFullYear() + " - " + ((lheure < 10) ? "0" + lheure : lheure) + ":" + ((lesminutes < 10) ? "0" + lesminutes : lesminutes) + ":" + ((lessecondes < 10) ? "0" + lessecondes : lessecondes);
           return ladateComplete;
        },
        /**
         * Transform 10:05 string to seconds string, return number
         * @param {string} timeValue 
         */
        timeToSeconds(timeValue){
            let elems = timeValue.split(":");
            return Number(elems[0])*60+Number(elems[1]);
        },
        /**
         * Create a string of six alphabetic letters
         * @returns (String) a aleatorycode
         */
        seedGenerator:function(){
            let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let code = "";
            for(let i=0;i<6;i++){
                // n'utilise pas l'outil de randomisation dirigée par le seed
                code += str[Math.floor(Math.random()*(str.length))];
            }
            return code;
        },

        /**
        * function addClass
        * Add a class to a DOM element
        * 
        * @params elt (DOMelt)
        * @params newClass (String) : string of coma separated classnames
        */
        addClass:function(elt,newClass){
            var n=0;
            newClass=newClass.split(",");
            for(let i=0;i<newClass.length;i++){
                if((" "+elt.className+" ").indexOf(" "+newClass[i]+" ")==-1){
                    elt.className+=" "+newClass[i];
                    n++;
                }
            }
            return n;
        },
        /**
         * get the DOM button originaly targeted by a click, specialy done when an image is clicked inside a button.
         * @param {evt} evt click event object
         * @returns 
         */
        getTargetWithImageInside(evt){
            let target = evt.target;
            if(evt.target.nodeName.toLowerCase()==="img"){
                target = evt.target.parentNode;
            }
            return target;
        },
        createCeintureTitres(qty){
            if(qty<1 || qty>5)return false;
            const dest = document.getElementById("ceintcolumnTitle");
            const champs = dest.querySelectorAll("input");
            const labels = dest.querySelectorAll("label");
            const br = dest.querySelectorAll("br");
            // création de champ :
            if(champs.length<qty){
                dest.appendChild(utils.create("br"));
                dest.appendChild(utils.create("label",{for:"ceinttitlecol"+qty,innerHTML:"Colonne "+qty+" : "}));
                dest.appendChild(utils.create("input",{type:"text",id:"ceinttitlecol"+qty,placeholder:"Texte, ou rien"}));
            } else if(champs.length>qty) {
                // suppression du dernier champ
                dest.removeChild(labels[champs.length-1]);
                dest.removeChild(champs[champs.length-1]);
                dest.removeChild(br[champs.length-1]);
            }
        },
        /**
         * Récupère la valeur cochée d'un groupe d'input radio
         * @param {String} name nom DOM du groupe d'input radio
         * @returns valeur du radio coché
         */
        getRadioChecked:function(name){
            let radio = document.getElementsByName(name);
            let returnValues = [];
            for(let i=0,length=radio.length;i<length;i++){
                if(radio[i].checked){
                    returnValues.push(radio[i].value);
                }
            }
            if(returnValues.length > 1) return returnValues.join("-");
            else if(returnValues.length === 1) return returnValues[0];
            else return false;
        },
        /**
         * 
         * @param {string} value id select
         * @returns string
         */
        getSelectValue:function(id){
            try {
                let select = document.getElementById(id);
                return select[select.selectedIndex].value;
            } catch(err){
                console.log(err);
            }
        },
        /**
         * renvoit un nombre si le nombre est sous forme de chaine
         * @param {String} value number
         * @returns Number typed number or string
         */
        numberIfNumber:function(value){
            if(String(Number(value))===value){
                return Number(value);
            } else {
                return value;
            }
        },
        // isEmpty, teste si un objet est vide ou pas
        // @param (Object) obj : objet ou tableau à analyser
        // return true pour vide
        // return false sinon
        isEmpty: function (obj) {
            var x;
            for (x in obj) {
                return false;
            }
            return true;
        },
        /**
         * shuffle an array
         * @param {Array} arr 
         */
        shuffle : function(arr){        
            if(!Array.isArray(arr))return false;
            let curId = arr.length;
            while(0 !== curId){
                let randId = Math.floor(utils.alea()*curId);
                curId-=1;
                let tmp = arr[curId];
                arr[curId] = arr[randId];
                arr[randId] = tmp;
            }
            return arr;
        },
        /**
         * plie ou déplie la liste des exercices
         * @param {elt} elt DOM elt
         */
        deploy(elt){
            let destClass = "hideup";
            let eltClass = "pointer plus";
            if(elt.nodeName === "H3"){
                let dest = elt.nextSibling;
                if(elt.className === eltClass){
                    eltClass="pointer moins";
                    destClass = "showdown";
                }
                elt.className = eltClass;
                dest.className = destClass;
            } else if(elt.nodeName === "H2"){
                if(elt.className === "pointer plus"){
                    eltClass = "pointer moins";
                    destClass = "showdown";
                }
                elt.className = eltClass;
                while(elt.nextSibling !== null){
                    elt = elt.nextSibling;
                    if(elt.nodeName === "H2") break;
                    if(elt.nodeName ==="UL")
                        elt.className = destClass;
                    else if(elt.nodeName === "H3")
                        elt.className = eltClass;
                }
            } else if(elt.nodeName === "H1"){
                if(elt.className === "pointer plus"){
                    eltClass = "pointer moins";
                    destClass = "showdown";
                }
                elt.className = eltClass;
                const h2 = document.querySelectorAll("#resultat-chercher h2");
                const h3 = document.querySelectorAll("#resultat-chercher h3");
                const ul = document.querySelectorAll("#resultat-chercher ul");
                h2.forEach((el)=>el.className=eltClass);
                h3.forEach((el)=>el.className=eltClass);
                ul.forEach((el)=>el.className=destClass);
            }
        },
        /**
         * fonctions utilisées pour l'import/export des activités.
         * @param {Array} array 
         * @returns 
         */
        tableToText(array){
            if(array === undefined) return "";
            if(typeof array ==="string") return array;
            return array.join(",");
        },
        textToTable(string){
            if(string === undefined || string === "") return [];
            else
            return string.split(",").map(Number);
        },
        objToText(obj){
            if(obj === undefined) return "";
            let string = "";
            let start = true;
            for(const i in obj){
                if(start){
                    string += i+"."+utils.tableToText(obj[i]);
                    start = false;
                } else {
                    string += "-"+i+"."+utils.tableToText(obj[i]);
                }
            }
            return string;
        },
        textToObj(string){
            let obj = {};
            let elts = string.split("-");
            for(let i=0;i<elts.length;i++){
                let subelts = elts[i].split(".");
                obj[subelts[0]] = utils.textToTable(subelts[1]);
            }
            return obj;
        },
        /**
        * function removeClass
        * remove a class name from a DOM element
        *
        * @param elt : DOM element
        * @param className (String) : name of classname
        */
        removeClass: function(elt, className){
            elt.classList.remove(className);
            /*if((" "+elt.className+" ").indexOf(" "+className+" ")>-1){
                var classes = elt.className.split(" "), newclasses="";
                for(let i=0;i<classes.length;i++){
                    if(classes[i] !== className)newclasses+=" "+classes[i];
                }
                elt.className = newclasses.trim();
            }*/
        },
        /**
         * checkSecurity to avoid infinite loop
         * 
         */
        checkSecurity(){
            utils.security--;
            if (utils.security < 0) {
                console.log("infinite loop");
                return false;
            }
            else return true;
        },
        toDecimalFr:function(value){
            let parties = value.split(".");
            let partieEntiere = parties[0];
            let partieDecimale = "";
            if(parties.length>1)partieDecimale = parties[1];
            if(partieEntiere.length>3){
                let s = partieEntiere.length%3;
                partieEntiere = partieEntiere.substring(0,s)+"~"+partieEntiere.substring(s).match(/\d{3}/g).join("~");
            }
            if(partieDecimale.length>3){
                let nbgp = ~~(partieDecimale.length/3);
                partieDecimale = partieDecimale.match(/\d{3}/g).join("~")+"~"+partieDecimale.substring(nbgp*3);
            }
            if(partieDecimale.length){
                partieDecimale = "{,}"+partieDecimale;
                }
            //debug(partieEntiere+partieDecimale);
            return partieEntiere+partieDecimale;
        },
        /**
         * Render the math
         * @param (dom) wtarget : window reference
         */
        mathRender: function(wtarget) {
            let contents = ["enonce-content", "corrige-content", "activityOptions", "activityDescription", "activityConsigne"];
            contents.forEach(id => {
                // search for $$ formulas $$ => span / span
                let content = document.getElementById(id).innerHTML;
                document.getElementById(id).innerHTML = content.replace(/\$\$([^$]*)\$\$/gi, '<span class="math">$1</span>');
            });
            document.querySelectorAll(".slide").forEach(elt => {
                elt.innerHTML = elt.innerHTML.replace(/\$\$([^$]*)\$\$/gi, '<span class="math">$1</span>');

            });
            if(wtarget !== undefined){
                let content = wtarget.document.getElementById("creator-content");
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
                    }            });
            }
            document.querySelectorAll(".math").forEach(function(item) {
                // transform ascii to Latex
              //var texTxt = MM.ascii2tex.parse(item.innerHTML);
            var texTxt = item.innerHTML.replace(/\&amp\;/g,"&");
              // recherche les nombres, décimaux ou pas
              let nbrgx = /(\d+\.*\d*)/g;
              // insère des espaces tous les 3 chiffres;
              
              texTxt = texTxt.replace(nbrgx, utils.toDecimalFr);
              //texTxt = texTxt.replace(/\.(\d{3})(?=(\d+))/g,"$1~");
              //texTxt = texTxt.replace(/\./g, "{,}");
              try {
                katex.render(texTxt, item, { //"\\displaystyle "+
                  throwOnError: false,
                  errorColor: "#FFF",
                  colorIsTextColor: true
                });
                utils.removeClass(item,"math");
              } catch (err) {
                item.innerHTML = "<span class='err'>" + err + ' avec '+texTxt + '</span>';
              }        });
          },
          /**
           * 
           * @param {object} someThing json object or array
           * @returns a clone of the object
           */
          clone(someThing){
              if(someThing === undefined) return false;
              else if(typeof someThing === "object"){
                  return JSON.parse(JSON.stringify(someThing));
              } else {
                  return someThing;
              }
          },
          
        /**
         * 
         * @param {Number} value 
         * @param {Number} digits
         * 
         * return {string} number with a fix digits
         */
        toDigits(value,digits){
            let puissance = Number(1+"e"+digits)-1;
            while(String(value).length < String(puissance).length){
                value = "0"+value;
            }
            return value;
        }
    };

    const sound = {
        list : [
            ["sounds/BELLHand_Sonnette de velo 2 (ID 0275)_LS.mp3","Sonette"],
            ["sounds/COMCam_Un declenchement d appareil photo (ID 0307)_LS.mp3","Reflex"],
            ["sounds/COMCell_E mail envoye (ID 1312)_LS.mp3","Email"],
            ["sounds/COMTran_Bip aerospatial 1 (ID 2380)_LS.mp3","Bip"],
            ["sounds/MUSCPerc_Cartoon agogo 2 (ID 2262)_LS.mp3","Agogo"],
            ["sounds/ROBTVox_Notification lasomarie 4 (ID 2062)_LS.mp3","Notif"],
            ["sounds/SWSH_Epee qui coupe (ID 0127)_LS.mp3","Couper"],
            ["sounds/SWSH_Epee qui fend l air (ID 0128)_LS.mp3","Fendre"],
            ["sounds/SWSH_Whoosh 3 (ID 1795)_LS.mp3","whoosh"],
            ["sounds/TOONHorn_Klaxon poire double 1 (ID 1830)_LS.mp3","Pouet"],
            ["sounds/VEHHorn_Klaxon de voiture recente 4 (ID 0260)_LS.mp3","Klaxon"],
            ["sounds/WATRSplsh_Plouf petit 6 (ID 1534)_LS.mp3","Plouf"],
            ["sounds/Anas_platyrhynchos_-_Mallard_-_XC62258.mp3","Coincoin"]
        ],
        selected:null,
        player:null,
        getPlayer(){
            // récup du player
            this.player = document.getElementById("soundplayer");
            // peuple la liste
            let slct = document.getElementById("playerlist");
            for(let i=0;i<this.list.length;i++){
                let option = utils.create("option",{value:i,innerText:this.list[i][1]});
                slct.appendChild(option);
            }
        },
        beeps(){
            this.player.src = "sounds/BEEP_Bips horaires 1 (ID 1627)_LS.mp3";
            this.play();
        },
        play(){
            try{
                if(this.selected !== null)
                this.player.play();
            }catch(err){
                console.log(err);
            }
        },
        next(){
            if(this.selected===null)this.selected=-1;
            this.setSound((this.selected+1)%this.list.length);
            this.play();
        },
        select(id){
            this.setSound(id);
            this.play();
        },
        setSound(id){
            if(this.player === null)this.getPlayer();
            this.selected = Number(id);
            if(this.selected!==null)
                this.player.src = this.list[id][0];
        }
    };

    const math = {
        premiers: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999],
        //ce:new ComputeEngine({multiply:"\\times"}),
        /**
         * 
         * @param {float} nb number to be rounded
         * @param {integer} precision may positiv or negativ
         */
        round: function(nb, precision){
            if(precision === undefined){
                return Math.round(nb);
            } else {
                if(precision < 5 && !String(nb).includes('e'))
                    return Number(Math.round(Number(nb+'e'+precision))+'e'+(-precision));
                else {
                    let z=new Big(nb);
                    return z.round(precision).toFixed();
                }
            }
        },
        valeurParDefaut: function(valeur, precision) {
            if(precision === undefined){
                return Math.floor(valeur);
            } else
            return Number(Math.floor(Number(valeur + 'e' + precision)) + 'e' + (-precision));
          },
        valeurParExces: function(valeur, precision) {
            if(precision === undefined){
                return Math.ceil(valeur);
            } else
            return Number(Math.ceil(Number(valeur + 'e' + precision)) + 'e' + (-precision));
        },
        /**
         *  
         * @param {integer} min relativ
         * @param {integer} max relativ
         * optionals
         * @param {integer} qty positiv
         * @param {string} avoid start with ^ indicates the list of exeptions,
         * & as exeption => no doble number in the list
         * prime => not a prime
         */
         aleaInt:function(min,max,...others){ // accepts 2 arguments more
            let qty=1;
            let avoid=[];
            let arrayType=false;
            utils.security = 300;
            let nodouble = false;
            let notPrime = false;
            for(let i=0;i<others.length;i++){
                if(String(Number(others[i])) === others[i] || typeof others[i]==="number"){
                    qty = others[i];
                    arrayType = true;
                } else if(typeof others[i] === "string" && others[i][0]=="^"){
                    avoid = others[i].substring(1).split(",");
                    if(avoid.indexOf("&")>-1)nodouble = true;
                    if(avoid.indexOf("prime")>-1)notPrime = true;
                    avoid = avoid.map(Number);
                }
            }
            if(min === max) return min;
            if(max<min){
                [min,max] = [max,min];
            }
            if(arrayType){
                var integers = [];
                for(let i=0;i<qty;i++){
                    let thisint = math.round(utils.alea()*(max-min))+min;
                    if(avoid.indexOf(thisint)>-1 || (nodouble && integers.indexOf(thisint)>-1) || (notPrime && math.premiers.indexOf(thisint)>-1)){
                        // do not use exeptions numbers
                        // or no double number
                        i--;
                        if(!utils.checkSecurity()) break;
                        continue;
                    }
                    integers.push(thisint);
                    if(!utils.checkSecurity()) break;
                }
                return integers;
            } else {
                let thisint;
                do{
                    thisint = math.round(utils.alea()*(max-min))+min;
                    if(!utils.checkSecurity()) break;
                }
                while (avoid.indexOf(thisint)>-1 || (notPrime && math.premiers.indexOf(thisint)>-1))
                return thisint;
            }
        },
        /**
         * 
         * @param {float} min minimal value
         * @param {float} max maximal value
         * @param {integer} precision relativ
         * optionals
         * @param {integer} qty number of values to return
         * @param {string} avoid values to avoid comma separated start with ^
         */
        aleaFloat:function(min, max, precision, ...others){
            let qty=1;
            let avoid = [];
            let nodouble = false;
            utils.security = 300;
            // check others aguments
            for(let i=0;i<others.length;i++){
                if(String(Number(others[i])) === others[i] || typeof others[i] === "number"){
                    qty = others[i];
                } else if(typeof others[i] === "string" && others[i][0]==="^"){
                    avoid = others[i].substring(1).split(",");
                    if(avoid.indexOf("&")>-1)nodouble = true;
                    avoid = avoid.map(Number);
                }
            }
            // exchange values min and max if min > max
            if(max<min){
                [min,max]=[max,min];
            }
            if(qty>1){ // more than one value
                let nb;
                var floats=[];
                for(let i=0;i<qty;i++){
                    nb = math.round(utils.alea()*(max-min)+min,precision);
                    if(avoid.indexOf(nb)>-1 || (nodouble && floats.indexOf(nb)>-1)){
                        i--;
                        if(!utils.checkSecurity()) break;
                        continue;
                       }
                    floats.push(nb);
                    if(!utils.checkSecurity()) break;
                }
                //debug(floats);
                return floats;
            } else { // one value
                let nb;
                do {
                    nb = math.round(utils.alea()*(max-min)+min,precision);
                    if(!utils.checkSecurity()) break;
                    //debug(nb);
                }
                while(avoid.indexOf(nb)>-1)
                return nb;
            }
        },
        /**
         * return one or the number
         * @param {Number} value 
         */
        unOuNombre(value){
            value = Number(value);
            if(Math.round(Math.random())){
                return 1;
            } else return value;
        },
        /**
         * 
         * @param {Number} nb 
         * @returns 
         */
        sign:function(nb){
            nb = Number(nb);
            if(nb<0) return "-"
            else return "+"
        },
        /**
         * tranform a number to a signed number
         * 
         * @param {number} nb 
         * @returns a number with his sign
         */
        signedNumber:function(nb){
            nb = Number(nb);
            if(nb===0) return "";
            else if(nb>0) return "+"+nb;
            else return nb;
        },
        /**
         * tranform the number 1 or -1 to + or -
         * 
         * @param {Number} nb 
         * @returns nothing if nb=1, - if nb=-1 the number in other cases
         */
        signIfOne:function(nb){
            nb = Number(nb);
            if(nb === 1)
                return ""
            else if(nb === -1)
                return "-"
            else return nb;
        },
        /**
         * tranform a number to a signed number and 1, -1 or 0 to +, - or ""
         * 
         * @param {Number} nb 
         * @returns a number always with sign (+/-) or only the sign if nb=1 or -1
         */
        signedNumberButOne:function(nb){
            nb = Number(nb);
            if(nb===0)return "";
            if(nb===1)return "+";
            if(nb===-1)return "-";
            if(nb>0) return "+"+nb;
            return nb;
        },
        /**
         * needsParenthesis
         * return a number with parenthesis if the number is negative
         * 
         * @param {number or string} nb 
         * @returns nb with parenthesis if nb 1st char is -
         */
        nP:function(nb){
            if(String(nb)[0]==="-")return "("+nb+")";
            else return nb;
        },
        /**
         * donne la liste des produits de 2 facteurs égaux
         * @param {integer} entier product
         * @param {integer} max factors's max value
         */
        listeProduits:function(entier, max, values=false){
            let liste = [];
            if(max === undefined)max=10;
            for(let i=1,top=Math.floor(Math.sqrt(entier));i<=top;i++){
                let reste = entier%i, quotient = ~~(entier/i);
                if(reste == 0 && i<=max && quotient<=max){
                    liste.push(i+"\\times"+quotient);
                    if(values && i!== quotient)liste.push(quotient+"\\times"+i);
                }
            }
            if(!values)
                return liste.join("; ");
            else return liste
        },
        /** 
        * donne la liste des diviseurs d'un nombre sous forme de chaine
        * @param {integer} nb nombre à décomposer
        * @param {boolean} array false ou undefined renvoie une chaine, un tableau sinon
        */
        listeDiviseurs:function(nb, array=false){
            let maxSearch = Math.floor(Math.sqrt(nb));
            let diviseurs = [];
            let grandsdiviseurs = [];
            for (let i = 1; i <= maxSearch; i++) {
              if (nb % i === 0) {
                diviseurs.push(i);
                if (i !== nb / i) // on ne met pas 2 fois le même nombre si carré parfait
                  grandsdiviseurs.unshift(nb / i);
              }
            }
            diviseurs = diviseurs.concat(grandsdiviseurs);
            if(array===true)
                return diviseurs;
            else
                return diviseurs.join("; ");
        },
        /**
         * 
         * @param {integer} nb 
         * @returns integer : le plus grand diviseur non égal au nombre
         */
        plusGrandDiviseur:function(nb){
            const liste = math.listeDiviseurs(nb,true);
            return liste[liste.length-2];
        },
        /**
         * 
         * @param {integer} nb 
         * @returns integer
         */
        plusGrandDiviseurPremier(nb){
            if(nb<2) return nb;
            let prime = 0,indice=0;
            while(math.premiers[indice]<=nb){
                indice++;
                if(nb%math.premiers[indice]==0)
                    prime=math.premiers[indice];
            }
            return prime;
        },
        /**
        *
        * donne la liste des diviseurs inférieurs à 10 sous forme de chaine
        * @param {integer} nb 
        *
        * */
        listeDiviseurs10:function(nb){
            let diviseurs = [2,3,5,9,10];
            let liste = [];
            for (let i = 0, len=diviseurs.length; i < len; i++) {
                const div = diviseurs[i];
                if(nb%div === 0)liste.push(div);
            }
            if(liste.length)return liste.join("; ");
            else return "aucun des nombres"
        },
        /**
         * 
         * @param {integer} nb
         * return un non diviseur d'un nombre
         */
        nonDiviseur(nb){
            let unnondiviseur=0;
            do { unnondiviseur = math.aleaInt(2,nb-1); }
            while (nb%unnondiviseur===0)
            return unnondiviseur;
        },
        /**
         * Retourne une fraction décimale égale au nombre décimal
         * @param {float} decimal nombre décimal
         * return fraction
         */
        fractionDecimale(decimal){
            let string = decimal.toString();
            let pointPosition = string.indexOf(".");
            // cas du nombre entier
            if(pointPosition<0) return "\\dfrac{"+decimal+"}{1}";
            else {
                let nbChiffres = string.length - pointPosition - 1;
                return "\\dfrac{"+math.round(decimal*Math.pow(10,nbChiffres),0) +"}{"+Math.pow(10,nbChiffres)+"}";
            }
            
        },
        /**
         * 
         * @param {integer} nb 
         * return un diviseur de nb
         */
        unDiviseur(nb,notOne=false,notNb=true){
            if(Number(nb)===0)return 1
            let diviseurs = math.listeDiviseurs(nb,true);
            if(notOne) diviseurs = _.rest(diviseurs); // on enlève la première valeur qui est 1.
            if(notNb) diviseurs = _.initial(diviseurs);
            return diviseurs[math.aleaInt(0,diviseurs.length-1)];
        },
        /**
         * replace parts of a string written as power
         * @param {String} value "integer1^integer2*integer3^integer4..."
         * @returns product of integers2 factors equals to integer1, ...
         */
        unpower:function(value){
            let matches = value.match(/(\d*)\^(\d*)/g);
                if(matches)
                for(let i=0,l=matches.length;i<l;i+=2){
                    value = value.replace(matches[i], math.powerToProduct(matches[i]));
                }
            return value;
        },
        /**
         * 
         * @param {String} power "int1^int2"
         * @returns return int1*int1*... with int2 factors
         */
        powerToProduct(power){
            let nb = Number(power.substring(0,power.indexOf("^")));
            let puissance = Number(power.substring(power.indexOf("^")+1));
            let a = [];
            for(let i=0;i<puissance;i++){
                a.push(nb);
            }
            return a.join("*");
        },
        /**
         * convert seconds to hours minutes & seconds
         * @param {Integer} sec number of seconds to convert
         * @returns 
         */
        sToMin(sec){
            sec = Number(sec);
            let time = "";
            if(sec>3600){
              time += ~~(sec/3600) + " h ";
              sec = sec%3600;
            }
            if(sec>60){
              time += ~~(sec/60) + " min ";
              sec = sec%60;
            }
            return time += sec;
        },
        /**
         * replace all * with \\times
         * @param {String} string ascii string where * is multiply symbol
         * @returns String
         */
        toTex(string){
            return string.replace(/\*/g, "\\times");
        },
        /**
         * retourne l'écriture simplifiée d'une racine carrée
         * @param {Integer} radicande 
         * @returns 
         */
        simplifieRacine(radicande){
            const factors = Algebrite.run('factor('+radicande+')').split('*');
            let outOfSquareR = 1;
            let inSquareR = 1;
            for(let i=0;i<factors.length;++i){
                const elt = factors[i].split("^");
                const nb = elt[0];
                const power = elt[1]===undefined?1:elt[1];
                outOfSquareR = outOfSquareR*Math.pow(nb,Math.floor(power/2));
                inSquareR = inSquareR*Math.pow(nb,power%2);
            }
            return (outOfSquareR>1?outOfSquareR:'')+(inSquareR>1?"\\sqrt{"+inSquareR+"}":'');
        },
        /**
         * Indicates if a number is divided by another
         * @param {Int} nb 
         * @param {Int} par 
         * @param {String} type type of return string w : phrase type or yn : yes/no type
         * @returns 
         */
        estDivisiblePar(nb, par, type){
            nb = Number(nb); par = Number(par);
            let reponses = {"w":[" est divisible ", "n'est pas divisible"],"yn":["oui", "non"]};
            if(nb%par === 0){
                return reponses[type][0];
            } else return reponses[type][1];
        },
        /**
         * Compare two numbers
         * @param {Int} a 
         * @param {Int} b 
         * @returns <, > or =
         */
        compare(a,b){
            if(a<b)return "\\lt";
            else if(a>b)return "\\gt";
            else return "=";
        },
        /**
         * Retourne le PGCD de deux nombres
         * @param {Int} a 
         * @param {Int} b 
         * @returns gcd of a & b
         */
        pgcd: function(a, b) {
            return Number(Algebrite.run('gcd(' + a + ',' + b + ')'));
        },
        /**
         * Retourne le PPCM de deux nombres
         * @param {Int} a integer 1
         * @param {Int} b integer 2
         * @returns lcm of a & b
         */
        ppcm: function(a, b) {
            return Algebrite.run('lcm(' + a + ',' + b + ')');
        },
        /**
         * Retourne l'inverse d'un nombre
         * @param {String} expr expression Latex ou text
         * @param {Boolean} notex default false : return as tex, else return as ascii
         * @returns inverse of expr
         */
        inverse:function(expr, notex){
            let ret;
            if(notex === undefined || notex===false) ret = Algebrite.run('printlatex(1/('+expr+'))');
            else ret = Algebrite.run('1/('+expr+')');
            return ret;
        },
        /**
         * 
         * @param {String} expr expression à calculer
         * @param {Boolean} notex default false : return as tex, else return as ascii
         * @returns 
         */
        calc:function(expr,notex){
            let ret = Algebrite.run(expr);
            if(notex === undefined || notex===false) {
                // on calcule l'affichage latex en réalisant quelques petites simplifications d'écriture (1*x=>x, 2x+0 => 2x)...
                //let parser= new AsciiMathParser()
                //ret = ret.replace(/([0-9])(\*)([a-z])/g,'$1$3').replace(/frac/g,'dfrac');
                //ret = parser.parse(ret);
                ret = Algebrite.run('printlatex('+expr+')').replace(/frac/g,'dfrac').replace(/(\d) (\\times|\\cdot) (\w)/g,'$1$3');
                //let expression = parse(expr);
                //ret = serialize(this.ce.canonical(expression)).replace(/frac/g,'dfrac');
            }
            return ret;
        },
        /**
         * Retourne des heures minutes à partir d'heures, minutes, secondes pouvant dépasser 60 ou être négatives
         * @param {Int} h nombre d'heures
         * @param {Int} m nombre de minutes
         * @param {Int} s nombre de secondes
         * @returns String as "5 h 09"
         */
        getHM(h,m,s){
            if(s===undefined)s=0;
            var d = new Date(2010,1,1,Number(h),Number(m),Number(s));
            return d.getHours()+" h "+((d.getMinutes()<10)?"0"+d.getMinutes():d.getMinutes());
        },
        /**
         * Retourne des heures minutes secondes à partir d'heures, minutes, secondes pouvant dépasser 60 ou être négatives
         * @param {Int} h nombre d'heures
         * @param {Int} m nombre de minutes
         * @param {Int} s nombres de secondes
         * @returns String as "11 h 07 min 03 s"
         */
        getHMs(h,m,s){
            if(s===undefined)s=0;
            var d = new Date(2010,1,1,Number(h),Number(m),Number(s));
            return d.getHours()+" h "+((d.getMinutes()<10)?"0"+d.getMinutes():d.getMinutes())+" min "+((d.getSeconds()<10)?"0"+d.getSeconds():d.getSeconds())+" s.";
        },
        /**
         * Simplifie une fraction à partir de son numérateur et de son dénominateur
         * @param {Int} n numérateur
         * @param {Int} d dénominateur
         * @returns tex expression of the simplified fraction
         */
        fractionSimplifiee(n,d){
            if(n<0 && d<0 || n>0 && d<0){
                n=-n;d=-d;
            }
            const gcd = math.pgcd(n,d);
            if(Number.isInteger(n/d))
                return n/d;
            else 
                return "\\dfrac{"+(n/gcd)+"}{"+(d/gcd)+"}";
        },
        /**
         * Retourne une fraction décimale simplifiée à partir d'une fraction décimale
         * @param {Int} n numérateur
         * @param {Int} d dénominateur
         * @returns tex expression of the fraction simplified
         */
        simplifyFracDec(n,d){
            while(n%10 === 0 && d%10 === 0){
                n=n/10;d=d/10;
            }
            return "\\dfrac{"+n+"}{"+d+"}";
        },
        /**
         * 
         * @param {array} operandes array of numbers
         * @param {array} operations array of symbols : +, -, *, / or q
         * @param {string} option "p" renvoie une phrase, "a" renvoie latex, "v" renvoie asccii
         * @param {boolean} ordre 1 ou 0 la première opération est le premier argument de la 2e ou pas
         */
        phrase(operandes,operations,option,ordre){
            let r;
            let phrases = {
                "+":["la somme de ${x} et de ${y}","${x}+${y}","${x}+${y}"],
                "-":["la différence entre ${x} et ${y}","${x}-${y}","${x}-${y}"],
                "*":["le produit de ${x} par ${y}","${x}\\\\times ${y}","${x}*${y}"],
                "/":["le quotient de ${x} par ${y}","${x}\\\\div ${y}","${x}/${y}"],
                "q":["le quotient de ${x} par ${y}", "\\\\dfrac{${x}}{${y}}","${x}/${y}"]
            };
            operandes[0];operandes[1];
            switch(option){
                case "p":
                    r = eval("`"+phrases[operations[0]][0]+"`");
                    break;
                case "a":
                    r = eval("`"+phrases[operations[0]][1]+"`");
                    break;
                case "v":
                    r = eval("`"+phrases[operations[0]][2]+"`");
                    break;
                }
                //debug(r);
            if(operations.length>1){// plus d'une opération
                if(ordre){ // la première operation est le premier argument
    operandes[2];                if(["*","/"].indexOf(operations[1])>-1 && ["-","+"].indexOf(operations[0])>-1)
                        ;
                } else { // la deuxième opération est le 2e argument
                    operandes[2];                if(["*","/","-"].indexOf(operations[1])>-1 && ["-","+"].indexOf(operations[0])>-1 || operations[0]==="/")
                        ;
                    }
                switch(option){
                    case "p":
                        r=eval("`"+phrases[operations[1]][0]+"`").replace("de le", "du");
                        break;
                    case "a":
                        r = eval("`"+phrases[operations[1]][1]+"`");
                        break;
                    case "v":
                        r = eval("`"+phrases[operations[1]][2]+"`");
                        break;
                }
            }
            return r;
        },
        /**
         * 
         * @param {*} a 
         * @param {*} op 
         * @param {*} b 
         * @returns 
         */
        bigDecimal(a,op,b){
            Big(a);
            return eval('x.'+op+'('+b+').toString()');
        },
            /**
         * Génère un montant aléatoire en €
         * @param {integer} billets id des billets
         * @param {boolean} entier true pour générer des montants entiers, false pour des centimes
         * @param {boolean} tot true pour donner le montant total, false pour donner un montant inférieur
         */
             montant:function(billets,entier,tot){
                let valeursBillets = [5,10,20,50,100];
                let min=Infinity;
                let total=0;
                for(let i=0,len=billets.length;i<len;i++){
                    if(min>valeursBillets[billets[i]])
                        min = valeursBillets[billets[i]];
                    total+=valeursBillets[billets[i]];
                }
                if(tot){
                    return total;
                } else {
                    if(entier){
                        return math.aleaInt(total-min+1,total);
                    } else {
                        return math.aleaFloat(total-min+1,total,2);
                }}
            },
            /**
             * Crée un texte de nombres de billets à partir d'une simple liste de billets [5,5,10,20,50,10]
             * @param {Array} billets liste de billets
             * @returns String faisant la liste des billets par groupes
             */
            listeBillets:function(billets){
                let valeursBillets = [5,10,20,50,100];
                let lesbillets = {5:0,10:0,20:0,50:0,100:0};
                let txt = "des billets : ";
                for(let i=0,len=billets.length;i<len;i++){
                     lesbillets[valeursBillets[billets[i]]]++;
                }
                for(let val in lesbillets){
                    if(lesbillets[val]>0){
                        txt += lesbillets[val]+" de "+val+" €, ";
                    }
                }
                return txt;
            },
            // JavaScript Document
            /****************************************************************************
            *________________________________________________________________________   *
            *   About       :   Convertit jusqu'à  999 999 999 999 999 (billion)        *
            *                   avec respect des accords                                *
            *_________________________________________________________________________  *			
            *   Auteur      :   GALA OUSSE Brice, Engineer programmer of management     *
            *   Mail        :   bricegala@yahoo.fr, bricegala@gmail.com                 *
            *   Tél         :   +237 99 37 95 83 / +237 79 99 82 80                     *
            *   Copyright   :   avril  2007                                             *
            * Ce document intitulé « Conversion des nombres en lettre » issu de CommentCaMarche
            * (codes-sources.commentcamarche.net) est mis à disposition sous les termes de
            * la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
            * source, dans les conditions fixées par la licence, tant que cette note    *
            * apparaît clairement.                                                      *
            *_________________________________________________________________________  *
            *****************************************************************************
            */
            NumberToLetter:function(nombre, U=null, D=null,decimalPart=false) {
                const letter = {
                    0: "zéro",
                    1: "un",
                    2: "deux",
                    3: "trois",
                    4: "quatre",
                    5: "cinq",
                    6: "six",
                    7: "sept",
                    8: "huit",
                    9: "neuf",
                    10: "dix",
                    11: "onze",
                    12: "douze",
                    13: "treize",
                    14: "quatorze",
                    15: "quinze",
                    16: "seize",
                    17: "dix-sept",
                    18: "dix-huit",
                    19: "dix-neuf",
                    20: "vingt",
                    30: "trente",
                    40: "quarante",
                    50: "cinquante",
                    60: "soixante",
                    70: "soixante-dix",
                    80: "quatre-vingt",
                    90: "quatre-vingt-dix",
                };
                const decUnit = {
                    1:"dixièmes",
                    2:"centièmes",
                    3:"millièmes",
                    4:"dix-millièmes",
                    5:"cent-millièmes",
                    6:"millionièmes",
                    7:"dix-millionièmes",
                    8:"cent-millionièmes",
                    9:"milliardièmes",
                    10:"dix-milliardièmes",
                    11:"cent-milliardièmes"
                };
                
                let n, quotient, reste, nb;
                let numberToLetter = '';
                //__________________________________
        
                if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";
                nb = parseFloat(nombre.toString().replace(/ /gi, ""));
                // nombres décimaux
                if(Math.ceil(nb) != nb){
                    nb = nombre.toString().split('.');
                    return this.NumberToLetter(nb[0]) + (U ? " " + U + " et " : " virgule ") + this.NumberToLetter(nb[1],D,D,true) + (D ? " " + D : "") + (nb[1].indexOf("0")===0? " " + decUnit[nb[1].length]:"");
                }

                if (nombre.toString().replace(/ /gi, "").length > 15) return "dépassement de capacité";
                n = nb.toString().length;
                switch (n) {
                    case 1:
                        numberToLetter = letter[nb];
                        break;
                    case 2:
                        if (nb > 19) {
                            quotient = Math.floor(nb / 10);
                            reste = nb % 10;
                            if (nb < 71 || (nb > 79 && nb < 91)) {
                                if (reste == 0) numberToLetter = letter[quotient * 10];
                                if (reste == 1) numberToLetter = letter[quotient * 10] + "-et-" + letter[reste];
                                if (reste > 1) numberToLetter = letter[quotient * 10] + "-" + letter[reste];
                            } else numberToLetter = letter[(quotient - 1) * 10] + "-" + letter[10 + reste];
                        } else numberToLetter = letter[nb];
                        break;
                    case 3:
                        quotient = Math.floor(nb / 100);
                        reste = nb % 100;
                        if (quotient == 1 && reste == 0) numberToLetter = "cent";
                        if (quotient == 1 && reste != 0) numberToLetter = "cent" + "-" + this.NumberToLetter(reste);
                        if (quotient > 1 && reste == 0) numberToLetter = letter[quotient] + "-cents";
                        if (quotient > 1 && reste != 0) numberToLetter = letter[quotient] + "-cent-" + this.NumberToLetter(reste);
                        break;
                    case 4 :
                    case 5 :
                    case 6 :
                        quotient = Math.floor(nb / 1000);
                        reste = nb - quotient * 1000;
                        if (quotient == 1 && reste == 0) numberToLetter = "mille";
                        if (quotient == 1 && reste != 0) numberToLetter = "mille" + "-" + this.NumberToLetter(reste);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + "-mille";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + "-mille-" + this.NumberToLetter(reste);
                        break;
                    case 7:
                    case 8:
                    case 9:
                        quotient = Math.floor(nb / 1000000);
                        reste = nb % 1000000;
                        if (quotient == 1 && reste == 0) numberToLetter = "un million";
                        if (quotient == 1 && reste != 0) numberToLetter = "un million" + "-" + this.NumberToLetter(reste);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + "-millions";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + "-millions-" + this.NumberToLetter(reste);
                        break;
                    case 10:
                    case 11:
                    case 12:
                        quotient = Math.floor(nb / 1000000000);
                        reste = nb - quotient * 1000000000;
                        if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
                        if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + "-" + this.NumberToLetter(reste);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + "-milliards";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + "-milliards-" + this.NumberToLetter(reste);
                        break;
                    case 13:
                    case 14:
                    case 15:
                        quotient = Math.floor(nb / 1000000000000);
                        reste = nb - quotient * 1000000000000;
                        if (quotient == 1 && reste == 0) numberToLetter = "un billion";
                        if (quotient == 1 && reste != 0) numberToLetter = "un billion" + "-" + this.NumberToLetter(reste);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + "-billions";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + "-billions-" + this.NumberToLetter(reste);
                        break;
                }//fin switch
                /*respect de l'accord de quatre-vingt*/
                if (numberToLetter.substr(numberToLetter.length - "quatre-vingt".length, "quatre-vingt".length) == "quatre-vingt") numberToLetter = numberToLetter + "s";
                return numberToLetter;
            },
            NumberToFraction:function(nombre,speech=false, U=null, D=null,last=0) {
                const letter = {
                    0: "zéro",
                    1: "un",
                    2: "deux",
                    3: "trois",
                    4: "quatre",
                    5: "cinq",
                    6: "six",
                    7: "sept",
                    8: "huit",
                    9: "neuf",
                    10: "dix",
                    11: "onze",
                    12: "douze",
                    13: "treize",
                    14: "quatorze",
                    15: "quinze",
                    16: "seize",
                    17: "dix-sept",
                    18: "dix-huit",
                    19: "dix-neuf",
                    20: "vingt",
                    30: "trente",
                    40: "quarante",
                    50: "cinquante",
                    60: "soixante",
                    70: "soixante-dix",
                    80: "quatre-vingt",
                    90: "quatre-vingt-dix",
                };
                const ends = {
                    1:"unièmes",
                    2:"deuxièmes",
                    3:"troisièmes",
                    4:"quatrièmes",
                    5:"cinquièmes",
                    6:"sixièmes",
                    7:"septièmes",
                    8:"huitièmes",
                    9:"neuvièmes",
                    10:"dixièmes",
                    11: "onzièmes",
                    12: "douzièmes",
                    13: "treizièmes",
                    14: "quatorzièmes",
                    15: "quinzièmes",
                    16: "seizièmes",
                    17: "dix-septièmes",
                    18: "dix-huitièmes",
                    19: "dix-neuvièmes",
                    20: "vingtièmes",
                    30: "trentièmes",
                    40: "quarantièmes",
                    50: "cinquantièmes",
                    60: "soixantièmes",
                    70: "soixante-dixièmes",
                    80: "quatre-vingtièmes",
                    90: "quatre-vingt-dixièmes",
                };
                const units = {
                    2:"demis",
                    3:"tiers",
                    4:"quarts"
                };
                
                let n, quotient, reste, nb;
                let numberToLetter = '';
                if(nombre<0){
                    return numberToLetter = 'sur moins '+this.NumberToLetter(-nombre);
                }
                //__________________________________
        
                if (nombre.toString().replace(/ /gi, "").length > 15) return "dépassement de capacité";
                if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";
        
                nb = parseFloat(nombre.toString().replace(/ /gi, ""));
                if(Math.ceil(nb) != nb){
                    nb = nombre.toString().split('.');
                    return this.NumberToFraction(nb[0]) + (U ? " " + U + " et " : " virgule ") + this.NumberToFraction(nb[1]) + (D ? " " + D : "");
                }
                n = nb.toString().length;
                switch (n) {
                    case 1:
                        if(nb<5 && nb > 1 && last==0){
                            numberToLetter = units[nb];
                        } else if(last < 2) {
                            numberToLetter = ends[nb];
                        } else {
                            numberToLetter = letter[nb];
                        }
                        break;
                    case 2:
                        if (nb > 19) {
                            quotient = Math.floor(nb / 10);
                            reste = nb % 10;
                            if (nb < 71 || (nb > 79 && nb < 91)) {
                                if (reste == 0) numberToLetter = ends[quotient * 10];
                                if (reste == 1) numberToLetter = letter[quotient * 10] + "-et-" + ends[reste];
                                if (reste > 1) numberToLetter = letter[quotient * 10] + "-" + ends[reste];
                            } else numberToLetter = letter[(quotient - 1) * 10] + "-" + ends[10 + reste];
                        } else numberToLetter = ends[nb];
                        break;
                    case 3:
                        quotient = Math.floor(nb / 100);
                        reste = nb % 100;
                        if (quotient == 1 && reste == 0) numberToLetter = "centièmes";
                        if (quotient == 1 && reste != 0) numberToLetter = "cent" + " " + this.NumberToFraction(reste,speech,U,D,1);
                        if (quotient > 1 && reste == 0) numberToLetter = letter[quotient] + " centièmes";
                        if (quotient > 1 && reste != 0) numberToLetter = letter[quotient] + " cent " + this.NumberToFraction(reste,speech,U,D,1);
                        break;
                    case 4 :
                    case 5 :
                    case 6 :
                        quotient = Math.floor(nb / 1000);
                        reste = nb - quotient * 1000;
                        if (quotient == 1 && reste == 0) numberToLetter = "millièmes";
                        if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + this.NumberToFraction(reste,speech,U,D,false);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " millièmes";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " mille " + this.NumberToFraction(reste,speech,U,D,1);
                        break;
                    case 7:
                    case 8:
                    case 9:
                        quotient = Math.floor(nb / 1000000);
                        reste = nb % 1000000;
                        if (quotient == 1 && reste == 0) numberToLetter = "millionièmes";
                        if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + this.NumberToFraction(reste,speech,U,D,1);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " millionièmes";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " millions " + this.NumberToFraction(reste,speech,U,D,1);
                        break;
                    case 10:
                    case 11:
                    case 12:
                        quotient = Math.floor(nb / 1000000000);
                        reste = nb - quotient * 1000000000;
                        if (quotient == 1 && reste == 0) numberToLetter = "milliardièmes";
                        if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + this.NumberToFraction(reste,speech,U,D,1);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " milliardièmes";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " milliards " + this.NumberToFraction(reste,speech,U,D,1);
                        break;
                    case 13:
                    case 14:
                    case 15:
                        quotient = Math.floor(nb / 1000000000000);
                        reste = nb - quotient * 1000000000000;
                        if (quotient == 1 && reste == 0) numberToLetter = "billionièmes";
                        if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + this.NumberToFraction(reste,speech,U,D,2);
                        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " billionièmes";
                        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToFraction(quotient,speech,U,D,2) + " billions " + this.NumberToFraction(reste,speech,U,D,1);
                        break;
                }//fin switch
                /*respect de l'accord de quatre-vingt*/
                if (numberToLetter.substr(numberToLetter.length - "quatre-vingt".length, "quatre-vingt".length) == "quatre-vingt") numberToLetter = numberToLetter + "s";
                if(last<2 && speech)
                    numberToLetter = numberToLetter.replace('-'," ").replace("vingtièmes","vin tièmes").replace("soixantièmes","soissantièmes");
                return numberToLetter;
            }
    };

    // Figures
    class Figure {
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
                            });
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
            }
        }
    }

    const content={"2":{"nom":"2nde","themes":{"2N":{"nom":"Nombres et calculs","chapitres":{"2N1":{"n":"Manipuler les nombres réels","e":[{"u":"N5/5DC1.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"5DC1"},{"u":"NK/Ko13.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"Ko13"},{"u":"N6/6NE1.json","t":"Calculer le carré d'un décimal simple","new":false,"id":"6NE1"},{"u":"N3/3NB3.json","t":"Calculs avec les puissances","new":false,"id":"3NB3"},{"u":"N3/3NB1.json","t":"Calculs avec les puissances de 10","new":false,"id":"3NB1"},{"u":"N3/3NB4.json","t":"Calculs complexes avec des puissances","new":false,"id":"3NB4"},{"u":"N3/3NB2.json","t":"Calculs complexes avec puissances de 10","new":false,"id":"3NB2"},{"u":"N5/5DC4.json","t":"Déterminer si un tableau est de proportionnalité","new":false,"id":"5DC4","d":"Utilisation des différentes méthodes pour savoir si un tableau est de proportionnalité"},{"u":"N4/4NA1.json","t":"Ecriture scientifique et décimaux","new":false,"id":"4NA1"},{"u":"N4/4NA3.json","t":"Encadrer une racine carrée entre deux entiers consécutifs","new":false,"id":"4NA3","d":"Donner l'entier immédiatement inférieur et l'entier immédiatement supérieur à une racine carrée"},{"u":"N2/2N12.json","t":"Equation avec une valeur absolue","new":false,"id":"2N12","d":"Résoudre les équations de la forme $$|x-a|=b$$"},{"u":"N6/6NA4.json","t":"Lecture sur une droite graduée","new":false,"id":"6NA4","d":"Lecture abscisse sur droite graduée"},{"u":"N3/3DD5.json","t":"Lien entre coefficient de fonction linéaire et pourcentage","new":false,"id":"3DD5"},{"u":"NK/Ko11.json","t":"Lien entre coefficient multiplicateur et pourcentage","new":false,"id":"Ko11"},{"u":"N2/2N11.json","t":"Manipuler les racines carrées","new":false,"id":"2N11","d":"Simplifier une écriture impliquant des racines carrées"},{"u":"N5/5NC9.json","t":"Pourcentage d'une quantité","new":false,"id":"5NC9"},{"u":"N4/4NA7.json","t":"Puissances de 2","new":false,"id":"4NA7","d":"Connaissance des valeurs décimales puissances de 2"},{"u":"N4/4NA4.json","t":"Racines de carrés parfaits","new":false,"id":"4NA4"},{"u":"N5/5DC3.json","t":"Tableaux de proportionnalité","new":false,"id":"5DC3","d":"Calcul de données dans un tableau de proportionnalité"}]},"2N2":{"n":"Utiliser les notions de multiple, diviseur et de nombre premier","e":[{"u":"N5/5NC7.json","t":"Ajouter des fractions 📣","new":false,"id":"5NC7"},{"u":"N6/6ND10.json","t":"Division entière, division euclidienne","new":false,"id":"6ND10","d":"Pour répondre, donner le quotient, puis le reste si nécessaire, séparés d'un point-virgule"},{"u":"N5/5ND1.json","t":"Décomposer en facteurs premiers","new":false,"id":"5ND1","d":"Écrire le produit à l'aide du signe ×. Possibilité d'utiliser la notation avec des puissances."},{"u":"N5/5ND3.json","t":"Liste des diviseurs","new":false,"id":"5ND3"},{"u":"N4/4NC3.json","t":"Produit de fractions","new":false,"id":"4NC3"},{"u":"N4/4NC4.json","t":"Quotient de fractions","new":false,"id":"4NC4"},{"u":"N5/5NC8.json","t":"Soustraire des fractions","new":false,"id":"5NC8"},{"u":"N5/5ND4.json","t":"Trouver le plus grand diviseur commun","new":false,"id":"5ND4","d":"PGCD de deux nombres"}]},"2N3":{"n":"Utiliser le calcul littéral","e":[{"u":"N5/5NE3.json","t":"Calculer une expression","new":false,"id":"5NE3"},{"u":"N5/5NE5.json","t":"Calculer une expression produit (5e)","new":false,"id":"5NE5"},{"u":"N5/5NE10.json","t":"Calculer une expression à coefficients positifs","new":false,"id":"5NE10"},{"u":"N3/3ND2.json","t":"Développer une identité remarquable","new":false,"id":"3ND2"},{"u":"N4/4NE4.json","t":"Développer à l'aide de la distributivité","new":false,"id":"4NE4"},{"u":"NK/Ko21.json","t":"Développer à l'aide de la distributivité","new":false,"id":"Ko21"},{"u":"N3/3ND1.json","t":"Factoriser avec les identités remarquables","new":false,"id":"3ND1"},{"u":"N4/4NE5.json","t":"Factoriser une somme","new":false,"id":"4NE5"},{"u":"N3/3ND3.json","t":"Opposé d'une expression littérale (supprimer les parenthèses)","new":false,"id":"3ND3"},{"u":"N3/3ND4.json","t":"Réduire avec des parenthèses","new":false,"id":"3ND4"},{"u":"N5/5NE2.json","t":"Réduire un produit","new":false,"id":"5NE2"},{"u":"N5/5NE11.json","t":"Réduire un produit de monomes","new":true,"id":"5NE11"},{"u":"N4/4NE2.json","t":"Réduire une expression du premier degré","new":false,"id":"4NE2"},{"u":"N5/5NE6.json","t":"Réduire une expression du premier degré (coeffs positifs)","new":false,"id":"5NE6","d":"Réduire une expression du premier degrés dont les coefficients sonts tous positifs"},{"u":"N4/4NE3.json","t":"Réduire une expression du second degré","new":false,"id":"4NE3"},{"u":"N5/5NE7.json","t":"Réduire une expression du second degré (coeffs positifs)","new":false,"id":"5NE7","d":"Réduire une expression littérale du second degré dont les coefficients sont tous positifs."},{"u":"N5/5NE1.json","t":"Réduire une somme","new":false,"id":"5NE1"},{"u":"N4/4NE1.json","t":"Réduire une somme de produits","new":false,"id":"4NE1"},{"u":"N4/4NE7.json","t":"Résoudre une équation de type a ± x = b","new":false,"id":"4NE7"},{"u":"N4/4NE8.json","t":"Résoudre une équation de type ax = b","new":false,"id":"4NE8"},{"u":"N4/4NE6.json","t":"Résoudre une équation de type x ± a = b","new":false,"id":"4NE6"},{"u":"N4/4NE9.json","t":"Résoudre une équation du premier degré","new":false,"id":"4NE9"},{"u":"NK/Ko22.json","t":"Résoudre une équation du premier degré","new":false,"id":"Ko22"},{"u":"N3/3ND6.json","t":"Résoudre une équation produit nul","new":false,"id":"3ND6"},{"u":"N3/3ND5.json","t":"Résoudre une équation se ramenant à x² = a","new":false,"id":"3ND5"},{"u":"N3/3ND5.json","t":"Résoudre une équation se ramenant à x² = a","new":false,"id":"3ND5"},{"u":"N5/5NE4.json","t":"Tester une égalité","new":false,"id":"5NE4","d":"Tester des égalités de"}]}}},"2D":{"nom":"Statistiques et probabilités","chapitres":{"2D1":{"n":"Utiliser l’information chiffrée et statistique descriptive","e":[{"u":"N5/5DA2.json","t":"Calculs statistiques : moyenne, médiane, étendue de 2 à 5 valeurs","new":false,"id":"5DA2","d":"Pour le mode online, séparer les valeurs par le point-virugle."},{"u":"N4/4DC2.json","t":"Pourcentage global d'évolutions successives en pourcentage","new":false,"id":"4DC2"}]},"2D2":{"n":"Modéliser le hasard, calculer des probabilités","e":[]},"2D3":{"n":"Échantillonnage","e":[]}}},"2G":{"nom":"Géométrie","chapitres":{"2G1":{"n":"Manipuler les vecteurs du plan","e":[{"u":"N2/2G11.json","t":"Calculer les coordonnées d'un vecteur","new":false,"id":"2G11"},{"u":"N2/2G15.json","t":"Colinéarité de deux vecteurs","new":false,"id":"2G15"},{"u":"N2/2G14.json","t":"Déterminant de deux vecteurs","new":false,"id":"2G14"},{"u":"N2/2G13.json","t":"Produit d'un vecteur par un nombre","new":false,"id":"2G13"},{"u":"N2/2G12.json","t":"Somme et différence de deux vecteurs","new":false,"id":"2G12"}]},"2G2":{"n":"Résoudre des problèmes de géométrie","e":[{"u":"NG/GS13.json","t":"Calcul de probabilités (intersection) sur arbre","new":false,"id":"GS13","d":"Calculer la probabilité d'une intersection (arbre)"},{"u":"NG/GS14.json","t":"Calcul de probabilités totales sur arbre","new":false,"id":"GS14","d":"Calculer une probabilité totale"},{"u":"NG/GS11.json","t":"Calcul de probabilités-événement contraire","new":false,"id":"GS11","d":"arbre de probabilités-événement contraire"},{"u":"N4/4GB7.json","t":"Calculer une longueur à l'aide de l'égalité de Pythagore","new":false,"id":"4GB7","d":"Utiliser l'égalité de Pythagore dans un triangle rectangle"},{"u":"N4/4GB8.json","t":"Déterminer si un triangle est rectangle","new":false,"id":"4GB8","d":"Utiliser l'égalité de Pythagore ou la propriété des angles pour savoir si un triangle est rectangle"},{"u":"N4/4GB1.json","t":"Ecrire l'égalité de Pythagore","new":false,"id":"4GB1","d":"Observer le schéma du triangle rectangle pour écrire l'égalité de Pythagore"},{"u":"N5/5GB3.json","t":"Existence d'un triangle.","new":false,"id":"5GB3","d":"Déterminer l'existence ou non d'un triangle en fonction des côtés ou des angles"},{"u":"N4/4GB4.json","t":"Exprimer cosinus, sinus, tangente","new":false,"id":"4GB4","d":"Écrire le quotient égal au cosinus, au sinus ou à la tangente d'un angle dans un triangle rectangle"},{"u":"NG/GS12.json","t":"Lecture de probabilités sur arbre","new":false,"id":"GS12","d":"Lire une probabilité (conditionnelle)"},{"u":"N5/5GB2.json","t":"Mesure d'un 3e angle, cas particuliers.","new":false,"id":"5GB2","d":"Déterminer la mesure d'un angle en degré dans un triangle particulier"},{"u":"N4/4GB10.json","t":"Prouver que des droites sont parallèles (Thalès)","new":false,"id":"4GB10","d":"Vérifier si des quotients sont égaux ou qu'il y a une proportion entre les triangles"},{"u":"N4/4GB9.json","t":"Théorème de Thalès (calculer)","new":false,"id":"4GB9","d":"Calculer une longueur grâce au théorème de Thalès"},{"u":"N4/4GB2.json","t":"Théorème de Thalès (égalité)","new":false,"id":"4GB2","d":"Observer la figure pour écrire l'égalité des quotients grâce au théorème de Thalès"},{"u":"N5/5GB1.json","t":"Trouver la mesure d'un 3e angle, en degrés.","new":false,"id":"5GB1","d":"Déterminer la mesure d'un angle en degré dans un triangle quelconque"},{"u":"N4/4GB5.json","t":"Trouver la relation trigonométrique.","new":false,"id":"4GB5","d":"Déterminer s'il faut utiliser le sinus, le cosinus ou la tangente à partir des données connues dans un triangle rectangle."},{"u":"N4/4GB6.json","t":"Utiliser la calculatrice avec sinus, cosinus, tangente","new":false,"id":"4GB6","d":"Calculer le sinus, le cosinus ou la tangente d'un angle aigu en degrés. Déterminer un angle aigu à partir de son sinus, de son cosinus ou de sa tangente dans un triangle rectangle."},{"u":"N4/4GB3.json","t":"Vocabulaire du triangle rectangle","new":false,"id":"4GB3","d":"Hypoténuse, côté opposé, côté adjacent"}]},"2G3":{"n":"Représenter et caractériser les droites du plan","e":[{"u":"NK/Ko41.json","t":"Signe d'une fonction affine","new":false,"id":"Ko41","d":"Dresser le tableau de signe d'une fonction affine"}]}}},"2F":{"nom":"Fonctions","chapitres":{"2F1":{"n":"Répertoire de fonctions de référence","e":[{"u":"N3/3DD2.json","t":"Vocabulaire image, antécédent","new":false,"id":"3DD2"}]},"2F2":{"n":"Représenter algébriquement et graphiquement les fonctions","e":[{"u":"N3/3DD9.json","t":"Calcul d'antécédent par une fonction affine","new":false,"id":"3DD9"},{"u":"N3/3DD8.json","t":"Calcul d'image par une fonction affine","new":false,"id":"3DD8"},{"u":"N3/3DD3.json","t":"Différencier fonction affine et linéaire par la R.G.","new":false,"id":"3DD3"},{"u":"N3/3DD4.json","t":"Déterminer le coefficient d'une fonction affine","new":false,"id":"3DD4"},{"u":"N3/3DD6.json","t":"Lectures graphiques d'images et d'antécédents","new":false,"id":"3DD6","d":"pas correction en ligne"},{"u":"N3/3DD1.json","t":"Lire l'ordonnée à l'origine","new":false,"id":"3DD1"},{"u":"N3/3DD7.json","t":"Résolution graphiques d'équations","new":false,"id":"3DD7","d":"pas correction en ligne"}]},"2F3":{"n":"Etudier les variations et les extremums d'une fonction","e":[]}}},"2A":{"nom":"Algorithmique et programmation","chapitres":{"2A1":{"n":"Utiliser les variables et les instructions élémentaires","e":[]},"2A2":{"n":"Notion de fonction","e":[]}}}},"activitiesNumber":87},"3":{"nom":"3e","themes":{"3N":{"nom":"Nombres et calculs","chapitres":{"3NA":{"n":"Connaissance des nombres","e":[{"u":"N6/6NC2.json","t":"Arrondir un nombre décimal 📣","new":false,"id":"6NC2","d":"Donner le décimal le plus proche en fonction de la précision demandée."},{"u":"N6/6NB2.json","t":"Comparaison de fractions à 1 📣","new":false,"id":"6NB2","d":"Comparer en utilisant l'un des symboles >, < ou ="},{"u":"N6/6NB3.json","t":"Comparaison de fractions 📣","new":false,"id":"6NB3","d":"Comparer des fractions, avec 1 ou entre elles. Utiliser <, > ou ="},{"u":"N5/5NA3.json","t":"Comparer des décimaux relatifs","new":false,"id":"5NA3","d":"Donner le plus petit ou le plus grand de deux nombres."},{"u":"N5/5NA4.json","t":"Comparer des décimaux relatifs avec >, <, =","new":false,"id":"5NA4","d":"Utiliser les symboles <, > ou =."},{"u":"N6/6NB4.json","t":"Décomposition de fraction en entier + fraction inférieure à 1 📣","new":false,"id":"6NB4","d":"Écrire une fraction en utilisant la décomposition qui correspond aux notations anglo saxones."},{"u":"N5/5NA6.json","t":"Décomposition de fraction en entier - fraction inférieure à 1 📣","new":false,"id":"5NA6","d":"Écrire une fraction en utilisant une décomposition."},{"u":"N6/6NB8.json","t":"Déterminer si des fractions sont égales 📣","new":false,"id":"6NB8","d":"Deux fractions sont données, dire si elles sont égales ou non."},{"u":"N6/6ND14.json","t":"Déterminer si un nombre est un multiple, un diviseur d'un autre nombre","new":false,"id":"6ND14"},{"u":"N4/4NA1.json","t":"Ecriture scientifique et décimaux","new":false,"id":"4NA1"},{"u":"N4/4NA3.json","t":"Encadrer une racine carrée entre deux entiers consécutifs","new":false,"id":"4NA3","d":"Donner l'entier immédiatement inférieur et l'entier immédiatement supérieur à une racine carrée"},{"u":"N4/4NA2.json","t":"Inverse d'un nombre","new":false,"id":"4NA2"},{"u":"N6/6NA4.json","t":"Lecture sur une droite graduée","new":false,"id":"6NA4","d":"Lecture abscisse sur droite graduée"},{"u":"N6/6NB7.json","t":"Moitié, double ... 📣","new":false,"id":"6NB7","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N5/5NA2.json","t":"Opposé d'un nombre","new":false,"id":"5NA2","d":"Donner l'opposé d'un nombre, positif, ou négatif. Mode online : pour les fractions, laisser les numérateurs et dénominateurs positifs et mettre le moins devant la fraction négative."},{"u":"N6/6NC8.json","t":"Place du chiffre 9 dans un décimal 📣","new":true,"id":"6NC8","d":"Ne pas utiliser en mode online pour le moment"},{"u":"N5/5NA5.json","t":"Pourcentage et fractions simples 📣","new":false,"id":"5NA5","d":"Donner le pourcentage correspondant à une fraction."},{"u":"N4/4NA8.json","t":"Préfixes et puissances de 10","new":false,"id":"4NA8","d":"Ne pas utiliser en exercice online sur smarphone !"},{"u":"N4/4NA6.json","t":"Puissance de relatif","new":false,"id":"4NA6","d":"Donner l'écriture décimale d'une puissance, attention aux parenthèses !"},{"u":"N4/4NA7.json","t":"Puissances de 2","new":false,"id":"4NA7","d":"Connaissance des valeurs décimales puissances de 2"},{"u":"N4/4NA4.json","t":"Racines de carrés parfaits","new":false,"id":"4NA4"},{"u":"N4/4NA5.json","t":"Sens des puissances de 10","new":false,"id":"4NA5","d":"Donner l'écriture décimale d'une puissance de 10, ou la puissance de 10 correspondant à une écriture décimale"},{"u":"N6/6NB5.json","t":"Simplifier une fraction 📣","new":false,"id":"6NB5","d":"Écrire une fraction égale avec numérateur et dénominateurs les plus petits possibles"},{"u":"N5/5NA1.json","t":"Traduire un relatif par une phrase","new":true,"id":"5NA1","d":"La réponse positive peut être précédée d'un signe +, ou pas."},{"u":"N6/6NB6.json","t":"Trouver la fraction égale 📣","new":false,"id":"6NB6","d":"Compléter une fraction en donnant le nombre manquant"},{"u":"N6/6NB1.json","t":"Valeur décimale de fraction simple 📣","new":false,"id":"6NB1","d":"Donner l'écriture décimale d'une fraction, donner une fraction égale à une écriture décimale"}]},"3NB":{"n":"Calculer avec les nombres","e":[{"u":"N5/5NC1.json","t":"Addition de relatifs","new":false,"id":"5NC1"},{"u":"N5/5NC7.json","t":"Ajouter des fractions 📣","new":false,"id":"5NC7"},{"u":"N6/6NE1.json","t":"Calculer le carré d'un décimal simple","new":false,"id":"6NE1"},{"u":"N3/3NB3.json","t":"Calculs avec les puissances","new":false,"id":"3NB3"},{"u":"N3/3NB1.json","t":"Calculs avec les puissances de 10","new":false,"id":"3NB1"},{"u":"N3/3NB4.json","t":"Calculs complexes avec des puissances","new":false,"id":"3NB4"},{"u":"N3/3NB2.json","t":"Calculs complexes avec puissances de 10","new":false,"id":"3NB2"},{"u":"N5/5NC4.json","t":"Carrés de relatifs","new":false,"id":"5NC4"},{"u":"N6/6ND13.json","t":"Carrés des nombres entiers","new":false,"id":"6ND13"},{"u":"N4/4NC1.json","t":"Connaître les carrés parfaits","new":false,"id":"4NC1"},{"u":"N5/5NC3.json","t":"Distance entre deux points","new":false,"id":"5NC3"},{"u":"N8/8NE5.json","t":"Diviser un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE5","d":"Division de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N4/4NC2.json","t":"Diviser un décimal par 0,1, 0,01, 0,001","new":false,"id":"4NC2"},{"u":"N8/8NE3.json","t":"Diviser un décimal par 10, 100, 1000 📣","new":false,"id":"8NE3","d":"Division de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N6/6NE7.json","t":"Division par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6NE7"},{"u":"N6/6NE8.json","t":"Division par 75, 7,5 ou 0,75","new":false,"id":"6NE8"},{"u":"N6/6ND15.json","t":"Ecrire l'opération correspondant à la phrase","new":false,"id":"6ND15","d":""},{"u":"N5/5NC12.json","t":"Enchaînements d'opérations en écriture fractionnaire","new":false,"id":"5NC12","d":"Opérations nécessitant des étapes de calcul dont les résultats sont entiers."},{"u":"N7/7NB1.json","t":"Fraction de quantité 📣","new":false,"id":"7NB1","d":"Éviter le mode online pour la première activité, elle ne sera pas correctement corrigée"},{"u":"N5/5NC5.json","t":"Multiplication de relatifs","new":false,"id":"5NC5"},{"u":"N6/6NE5.json","t":"Multiplication dérivées des tables","new":false,"id":"6NE5"},{"u":"N6/6ND7.json","t":"Multiplication à trou, trouver une multiplication 📣","new":false,"id":"6ND7","d":"Trouver un produit, un facteur"},{"u":"N6/6NE6.json","t":"Multiplications astucieuses","new":false,"id":"6NE6"},{"u":"N8/8NE6.json","t":"Multiplier des dixièmes, des centaines, des millièmes par 10, 100, 1000 📣","new":false,"id":"8NE6"},{"u":"N6/6NE3.json","t":"Multiplier par 1,5; 2,5; 3,5","new":false,"id":"6NE3"},{"u":"N6/6ND19.json","t":"Multiplier par 101, 102, 99, 98","new":false,"id":"6ND19"},{"u":"N6/6ND18.json","t":"Multiplier par 11, 12, 9, 19, 21, 15","new":false,"id":"6ND18"},{"u":"N6/6ND17.json","t":"Multiplier par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6ND17"},{"u":"N6/6NE4.json","t":"Multiplier par 75; 7,5; 0,75","new":false,"id":"6NE4"},{"u":"N6/6ND16.json","t":"Multiplier par un multiple de 10","new":false,"id":"6ND16"},{"u":"N6/6ND21.json","t":"Multiplier par un multiple de 10, 100, 1000","new":false,"id":"6ND21"},{"u":"N8/8NE4.json","t":"Multiplier un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE4","d":"Multiplication de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N6/6NE2.json","t":"Multiplier un décimal par 0,1, 0,01, 0,001","new":false,"id":"6NE2"},{"u":"N8/8NE2.json","t":"Multiplier un décimal par 10, 100, 1000 📣","new":false,"id":"8NE2","d":"Multiplication de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N4/4NC5.json","t":"Multiplier un décimal par une puissance de 10 📣","new":false,"id":"4NC5","d":"Multiplication de nombres décimaux tirés au hasard par une puissance négative ou positive de 10 comprise entre -5 et 5"},{"u":"N6/6NE9.json","t":"Multiplier un entier par 0,1 0,01 0,001","new":false,"id":"6NE9"},{"u":"N5/5NC9.json","t":"Pourcentage d'une quantité","new":false,"id":"5NC9"},{"u":"N5/5NC10.json","t":"Pourcentage d'une quantité (simple)","new":false,"id":"5NC10","d":"Calculer 10%,, 20%, 30%, 40%, 50%, 25%, 75%, 33%"},{"u":"N4/4NC3.json","t":"Produit de fractions","new":false,"id":"4NC3"},{"u":"N4/4NC4.json","t":"Quotient de fractions","new":false,"id":"4NC4"},{"u":"N5/5NC6.json","t":"Quotient de relatifs","new":false,"id":"5NC6"},{"u":"N6/6NF1.json","t":"Rendre la monnaie","new":false,"id":"6NF1"},{"u":"N5/5NC2.json","t":"Soustraction de relatifs","new":false,"id":"5NC2"},{"u":"N5/5NC8.json","t":"Soustraire des fractions","new":false,"id":"5NC8"},{"u":"N6/6ND24.json","t":"Suites additives, multiplicatives","new":false,"id":"6ND24","d":"Trouver le terme ou le facteur suivant"},{"u":"N6/6ND23.json","t":"Écrire la phrase correspondant à l'opération","new":false,"id":"6ND23","d":""}]},"3NC":{"n":"Notion de divisibilité et nombres premiers","e":[{"u":"N5/5ND2.json","t":"Critères de divisibilité","new":false,"id":"5ND2","d":"Trouver si un nombre est divisible par 2, 3, 5, 9 ou 10"},{"u":"N6/6ND10.json","t":"Division entière, division euclidienne","new":false,"id":"6ND10","d":"Pour répondre, donner le quotient, puis le reste si nécessaire, séparés d'un point-virgule"},{"u":"N5/5ND1.json","t":"Décomposer en facteurs premiers","new":false,"id":"5ND1","d":"Écrire le produit à l'aide du signe ×. Possibilité d'utiliser la notation avec des puissances."},{"u":"N5/5ND3.json","t":"Liste des diviseurs","new":false,"id":"5ND3"},{"u":"N5/5ND5.json","t":"Reconnaître un nombre premier","new":false,"id":"5ND5"},{"u":"N5/5ND4.json","t":"Trouver le plus grand diviseur commun","new":false,"id":"5ND4","d":"PGCD de deux nombres"}]},"3ND":{"n":"Utiliser le calcul littéral","e":[{"u":"N5/5NE9.json","t":"Appliquer un programme de calcul","new":false,"id":"5NE9","d":"Un programme de calcul étant proposé, il est demandé de l'appliquer à un nombre donné."},{"u":"N5/5NE3.json","t":"Calculer une expression","new":false,"id":"5NE3"},{"u":"N5/5NE5.json","t":"Calculer une expression produit (5e)","new":false,"id":"5NE5"},{"u":"N5/5NE10.json","t":"Calculer une expression à coefficients positifs","new":false,"id":"5NE10"},{"u":"N3/3ND2.json","t":"Développer une identité remarquable","new":false,"id":"3ND2"},{"u":"N4/4NE4.json","t":"Développer à l'aide de la distributivité","new":false,"id":"4NE4"},{"u":"NK/Ko21.json","t":"Développer à l'aide de la distributivité","new":false,"id":"Ko21"},{"u":"N3/3ND1.json","t":"Factoriser avec les identités remarquables","new":false,"id":"3ND1"},{"u":"N4/4NE5.json","t":"Factoriser une somme","new":false,"id":"4NE5"},{"u":"N3/3ND3.json","t":"Opposé d'une expression littérale (supprimer les parenthèses)","new":false,"id":"3ND3"},{"u":"N3/3ND4.json","t":"Réduire avec des parenthèses","new":false,"id":"3ND4"},{"u":"N5/5NE2.json","t":"Réduire un produit","new":false,"id":"5NE2"},{"u":"N5/5NE11.json","t":"Réduire un produit de monomes","new":true,"id":"5NE11"},{"u":"N4/4NE2.json","t":"Réduire une expression du premier degré","new":false,"id":"4NE2"},{"u":"N5/5NE6.json","t":"Réduire une expression du premier degré (coeffs positifs)","new":false,"id":"5NE6","d":"Réduire une expression du premier degrés dont les coefficients sonts tous positifs"},{"u":"N4/4NE3.json","t":"Réduire une expression du second degré","new":false,"id":"4NE3"},{"u":"N5/5NE7.json","t":"Réduire une expression du second degré (coeffs positifs)","new":false,"id":"5NE7","d":"Réduire une expression littérale du second degré dont les coefficients sont tous positifs."},{"u":"N5/5NE1.json","t":"Réduire une somme","new":false,"id":"5NE1"},{"u":"N4/4NE1.json","t":"Réduire une somme de produits","new":false,"id":"4NE1"},{"u":"N4/4NE7.json","t":"Résoudre une équation de type a ± x = b","new":false,"id":"4NE7"},{"u":"N4/4NE8.json","t":"Résoudre une équation de type ax = b","new":false,"id":"4NE8"},{"u":"N4/4NE6.json","t":"Résoudre une équation de type x ± a = b","new":false,"id":"4NE6"},{"u":"N4/4NE9.json","t":"Résoudre une équation du premier degré","new":false,"id":"4NE9"},{"u":"NK/Ko22.json","t":"Résoudre une équation du premier degré","new":false,"id":"Ko22"},{"u":"N3/3ND6.json","t":"Résoudre une équation produit nul","new":false,"id":"3ND6"},{"u":"N3/3ND5.json","t":"Résoudre une équation se ramenant à x² = a","new":false,"id":"3ND5"},{"u":"N5/5NE4.json","t":"Tester une égalité","new":false,"id":"5NE4","d":"Tester des égalités de"},{"u":"N5/5NE8.json","t":"Écrire l'expression littérale correspondante","new":false,"id":"5NE8","d":"Un programme de calcul étant proposé, il est demandé une expression algébrique correspondante."}]}}},"3D":{"nom":"Organisation et gestion de données, fonctions","chapitres":{"3DA":{"n":"Interpréter, représenter et traiter des données","e":[{"u":"N5/5DA2.json","t":"Calculs statistiques : moyenne, médiane, étendue de 2 à 5 valeurs","new":false,"id":"5DA2","d":"Pour le mode online, séparer les valeurs par le point-virugle."},{"u":"N5/5DA1.json","t":"Données les plus/moins représentées","new":false,"id":"5DA1","d":"Observer et trouver la donnée la plus ou la moins représentée. Ne pas utiliser en mode online pour le moment."}]},"3DB":{"n":"Notions de probabilités","e":[]},"3DC":{"n":"Problèmes de proportionnalité","e":[{"u":"N5/5DC1.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"5DC1"},{"u":"NK/Ko13.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"Ko13"},{"u":"N4/4DC1.json","t":"Calculer une 4e proportionnelle (calculatrice)","new":false,"id":"4DC1","d":""},{"u":"N5/5DC4.json","t":"Déterminer si un tableau est de proportionnalité","new":false,"id":"5DC4","d":"Utilisation des différentes méthodes pour savoir si un tableau est de proportionnalité"},{"u":"N4/4DC2.json","t":"Pourcentage global d'évolutions successives en pourcentage","new":false,"id":"4DC2"},{"u":"N5/5DC3.json","t":"Tableaux de proportionnalité","new":false,"id":"5DC3","d":"Calcul de données dans un tableau de proportionnalité"}]},"3DD":{"n":"Notion de fonction","e":[{"u":"N3/3DD9.json","t":"Calcul d'antécédent par une fonction affine","new":false,"id":"3DD9"},{"u":"N3/3DD8.json","t":"Calcul d'image par une fonction affine","new":false,"id":"3DD8"},{"u":"N3/3DD3.json","t":"Différencier fonction affine et linéaire par la R.G.","new":false,"id":"3DD3"},{"u":"N3/3DD4.json","t":"Déterminer le coefficient d'une fonction affine","new":false,"id":"3DD4"},{"u":"N3/3DD6.json","t":"Lectures graphiques d'images et d'antécédents","new":false,"id":"3DD6","d":"pas correction en ligne"},{"u":"N3/3DD5.json","t":"Lien entre coefficient de fonction linéaire et pourcentage","new":false,"id":"3DD5"},{"u":"NK/Ko11.json","t":"Lien entre coefficient multiplicateur et pourcentage","new":false,"id":"Ko11"},{"u":"N3/3DD1.json","t":"Lire l'ordonnée à l'origine","new":false,"id":"3DD1"},{"u":"N3/3DD7.json","t":"Résolution graphiques d'équations","new":false,"id":"3DD7","d":"pas correction en ligne"},{"u":"N3/3DD2.json","t":"Vocabulaire image, antécédent","new":false,"id":"3DD2"}]}}},"3M":{"nom":"Grandeurs et mesures","chapitres":{"3MA":{"n":"Calculs de grandeurs","e":[{"u":"N6/6MC1.json","t":"Aires des figures usuelles 📣","new":false,"id":"6MC1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N5/5MA1.json","t":"Aires et périmètres des figures usuelles en fonction d'une inconnue","new":false,"id":"5MA1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N4/4MA2.json","t":"Calculer avec des grandeurs composées","new":false,"id":"4MA2","d":"Trouver une donnée à partir des deux autres."},{"u":"N4/4MA1.json","t":"Convertir des grandeurs composées","new":false,"id":"4MA1","d":"Passer d'une unité à une autre"},{"u":"N6/6GD1.json","t":"Lien entre aire d'un carré et côté 📣","new":false,"id":"6GD1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N6/6MA1.json","t":"Périmètre des figures usuelles 📣","new":false,"id":"6MA1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N5/5MA2.json","t":"Volumes de prismes simples","new":false,"id":"5MA2","d":"Calculer le volume d'un cube, d'un pavé droit, d'un prisme droit."},{"u":"N5/5MA3.json","t":"Volumes de pyramides et cônes","new":false,"id":"5MA3","d":"Calculer le volume d'une pyramide à base carrée, rectangulaire ou triangulaire."},{"u":"N5/5MA4.json","t":"Volumes de solides circulaires","new":false,"id":"5MA4","d":"Calculer le volume exact d'un cylindre, d'un cône, d'une boule."}]},"3MB":{"n":"Effet des transformations","e":[{"u":"N4/4MB1.json","t":"Calcul de longueurs dans les agrandissement et réductions","new":false,"id":"4MB1","d":"Calculer une longueur connaissant la longueur correspondante et le coefficient."},{"u":"N4/4MB2.json","t":"Déterminer le coefficient d'un agrandissement ou d'une réduction","new":false,"id":"4MB2","d":"Trouver le coefficient d'un agrandissement ou d'une réduction."}]}}},"3G":{"nom":"Espace et géométrie","chapitres":{"3GA":{"n":"Représenter l'espace","e":[{"u":"N6/6GB1.json","t":"Caractéristiques du prisme droit 📣","new":false,"id":"6GB1","d":"Vocabulaire et comptage "}]},"3GB":{"n":"Notions de géométrie pour démontrer","e":[{"u":"N4/4GB7.json","t":"Calculer une longueur à l'aide de l'égalité de Pythagore","new":false,"id":"4GB7","d":"Utiliser l'égalité de Pythagore dans un triangle rectangle"},{"u":"N4/4GB8.json","t":"Déterminer si un triangle est rectangle","new":false,"id":"4GB8","d":"Utiliser l'égalité de Pythagore ou la propriété des angles pour savoir si un triangle est rectangle"},{"u":"N4/4GB1.json","t":"Ecrire l'égalité de Pythagore","new":false,"id":"4GB1","d":"Observer le schéma du triangle rectangle pour écrire l'égalité de Pythagore"},{"u":"N5/5GB3.json","t":"Existence d'un triangle.","new":false,"id":"5GB3","d":"Déterminer l'existence ou non d'un triangle en fonction des côtés ou des angles"},{"u":"N4/4GB4.json","t":"Exprimer cosinus, sinus, tangente","new":false,"id":"4GB4","d":"Écrire le quotient égal au cosinus, au sinus ou à la tangente d'un angle dans un triangle rectangle"},{"u":"N5/5GB2.json","t":"Mesure d'un 3e angle, cas particuliers.","new":false,"id":"5GB2","d":"Déterminer la mesure d'un angle en degré dans un triangle particulier"},{"u":"N4/4GB10.json","t":"Prouver que des droites sont parallèles (Thalès)","new":false,"id":"4GB10","d":"Vérifier si des quotients sont égaux ou qu'il y a une proportion entre les triangles"},{"u":"N4/4GB9.json","t":"Théorème de Thalès (calculer)","new":false,"id":"4GB9","d":"Calculer une longueur grâce au théorème de Thalès"},{"u":"N4/4GB2.json","t":"Théorème de Thalès (égalité)","new":false,"id":"4GB2","d":"Observer la figure pour écrire l'égalité des quotients grâce au théorème de Thalès"},{"u":"N5/5GB1.json","t":"Trouver la mesure d'un 3e angle, en degrés.","new":false,"id":"5GB1","d":"Déterminer la mesure d'un angle en degré dans un triangle quelconque"},{"u":"N4/4GB5.json","t":"Trouver la relation trigonométrique.","new":false,"id":"4GB5","d":"Déterminer s'il faut utiliser le sinus, le cosinus ou la tangente à partir des données connues dans un triangle rectangle."},{"u":"N4/4GB6.json","t":"Utiliser la calculatrice avec sinus, cosinus, tangente","new":false,"id":"4GB6","d":"Calculer le sinus, le cosinus ou la tangente d'un angle aigu en degrés. Déterminer un angle aigu à partir de son sinus, de son cosinus ou de sa tangente dans un triangle rectangle."},{"u":"N4/4GB3.json","t":"Vocabulaire du triangle rectangle","new":false,"id":"4GB3","d":"Hypoténuse, côté opposé, côté adjacent"}]}}},"3A":{"nom":"Algorithmique et programmation","chapitres":{"3AA":{"n":"Ecrire, mettre au point, exécuter un programme","e":[]}}},"3L":{"nom":"Leçons","chapitres":{"3LN":{"n":"Nombres et calculs","e":[{"u":"N3/3LN1.json","t":"Équations","new":false,"id":"3LN1","d":"16 questions sur les équations"}]},"3LM":{"n":"Grandeurs et mesures","e":[]},"3LG":{"n":"Espace et Géométrie","e":[]},"3LD":{"n":"Organisation et gestion de données","e":[]}}}},"activitiesNumber":150},"4":{"nom":"4e","themes":{"4N":{"nom":"Nombres et calculs","chapitres":{"4NA":{"n":"Connaissance des nombres","e":[{"u":"N6/6NC2.json","t":"Arrondir un nombre décimal 📣","new":false,"id":"6NC2","d":"Donner le décimal le plus proche en fonction de la précision demandée."},{"u":"N6/6NB2.json","t":"Comparaison de fractions à 1 📣","new":false,"id":"6NB2","d":"Comparer en utilisant l'un des symboles >, < ou ="},{"u":"N6/6NB3.json","t":"Comparaison de fractions 📣","new":false,"id":"6NB3","d":"Comparer des fractions, avec 1 ou entre elles. Utiliser <, > ou ="},{"u":"N5/5NA3.json","t":"Comparer des décimaux relatifs","new":false,"id":"5NA3","d":"Donner le plus petit ou le plus grand de deux nombres."},{"u":"N5/5NA4.json","t":"Comparer des décimaux relatifs avec >, <, =","new":false,"id":"5NA4","d":"Utiliser les symboles <, > ou =."},{"u":"N6/6NE10.json","t":"Complément à l'unité","new":false,"id":"6NE10","d":"Trouver le complément qui donne une unité entière"},{"u":"N6/6NB4.json","t":"Décomposition de fraction en entier + fraction inférieure à 1 📣","new":false,"id":"6NB4","d":"Écrire une fraction en utilisant la décomposition qui correspond aux notations anglo saxones."},{"u":"N5/5NA6.json","t":"Décomposition de fraction en entier - fraction inférieure à 1 📣","new":false,"id":"5NA6","d":"Écrire une fraction en utilisant une décomposition."},{"u":"N6/6NB8.json","t":"Déterminer si des fractions sont égales 📣","new":false,"id":"6NB8","d":"Deux fractions sont données, dire si elles sont égales ou non."},{"u":"N6/6ND14.json","t":"Déterminer si un nombre est un multiple, un diviseur d'un autre nombre","new":false,"id":"6ND14"},{"u":"N4/4NA1.json","t":"Ecriture scientifique et décimaux","new":false,"id":"4NA1"},{"u":"N4/4NA3.json","t":"Encadrer une racine carrée entre deux entiers consécutifs","new":false,"id":"4NA3","d":"Donner l'entier immédiatement inférieur et l'entier immédiatement supérieur à une racine carrée"},{"u":"N4/4NA2.json","t":"Inverse d'un nombre","new":false,"id":"4NA2"},{"u":"N6/6NA4.json","t":"Lecture sur une droite graduée","new":false,"id":"6NA4","d":"Lecture abscisse sur droite graduée"},{"u":"N6/6NB7.json","t":"Moitié, double ... 📣","new":false,"id":"6NB7","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N5/5NA2.json","t":"Opposé d'un nombre","new":false,"id":"5NA2","d":"Donner l'opposé d'un nombre, positif, ou négatif. Mode online : pour les fractions, laisser les numérateurs et dénominateurs positifs et mettre le moins devant la fraction négative."},{"u":"N6/6NC8.json","t":"Place du chiffre 9 dans un décimal 📣","new":true,"id":"6NC8","d":"Ne pas utiliser en mode online pour le moment"},{"u":"N5/5NA5.json","t":"Pourcentage et fractions simples 📣","new":false,"id":"5NA5","d":"Donner le pourcentage correspondant à une fraction."},{"u":"N4/4NA8.json","t":"Préfixes et puissances de 10","new":false,"id":"4NA8","d":"Ne pas utiliser en exercice online sur smarphone !"},{"u":"N4/4NA6.json","t":"Puissance de relatif","new":false,"id":"4NA6","d":"Donner l'écriture décimale d'une puissance, attention aux parenthèses !"},{"u":"N4/4NA7.json","t":"Puissances de 2","new":false,"id":"4NA7","d":"Connaissance des valeurs décimales puissances de 2"},{"u":"N4/4NA4.json","t":"Racines de carrés parfaits","new":false,"id":"4NA4"},{"u":"N4/4NA5.json","t":"Sens des puissances de 10","new":false,"id":"4NA5","d":"Donner l'écriture décimale d'une puissance de 10, ou la puissance de 10 correspondant à une écriture décimale"},{"u":"N6/6NB5.json","t":"Simplifier une fraction 📣","new":false,"id":"6NB5","d":"Écrire une fraction égale avec numérateur et dénominateurs les plus petits possibles"},{"u":"N5/5NA1.json","t":"Traduire un relatif par une phrase","new":true,"id":"5NA1","d":"La réponse positive peut être précédée d'un signe +, ou pas."},{"u":"N6/6NB6.json","t":"Trouver la fraction égale 📣","new":false,"id":"6NB6","d":"Compléter une fraction en donnant le nombre manquant"},{"u":"N6/6NB1.json","t":"Valeur décimale de fraction simple 📣","new":false,"id":"6NB1","d":"Donner l'écriture décimale d'une fraction, donner une fraction égale à une écriture décimale"}]},"4NB":{"n":"Comparaison des nombres","e":[]},"4NC":{"n":"Calculer avec les nombres","e":[{"u":"N5/5NC1.json","t":"Addition de relatifs","new":false,"id":"5NC1"},{"u":"N5/5NC7.json","t":"Ajouter des fractions 📣","new":false,"id":"5NC7"},{"u":"N6/6NE1.json","t":"Calculer le carré d'un décimal simple","new":false,"id":"6NE1"},{"u":"N5/5NC4.json","t":"Carrés de relatifs","new":false,"id":"5NC4"},{"u":"N6/6ND13.json","t":"Carrés des nombres entiers","new":false,"id":"6ND13"},{"u":"N4/4NC1.json","t":"Connaître les carrés parfaits","new":false,"id":"4NC1"},{"u":"N5/5NC3.json","t":"Distance entre deux points","new":false,"id":"5NC3"},{"u":"N8/8NE5.json","t":"Diviser un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE5","d":"Division de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N4/4NC2.json","t":"Diviser un décimal par 0,1, 0,01, 0,001","new":false,"id":"4NC2"},{"u":"N8/8NE3.json","t":"Diviser un décimal par 10, 100, 1000 📣","new":false,"id":"8NE3","d":"Division de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N6/6NE7.json","t":"Division par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6NE7"},{"u":"N6/6NE8.json","t":"Division par 75, 7,5 ou 0,75","new":false,"id":"6NE8"},{"u":"N6/6ND15.json","t":"Ecrire l'opération correspondant à la phrase","new":false,"id":"6ND15","d":""},{"u":"N5/5NC12.json","t":"Enchaînements d'opérations en écriture fractionnaire","new":false,"id":"5NC12","d":"Opérations nécessitant des étapes de calcul dont les résultats sont entiers."},{"u":"N7/7NB1.json","t":"Fraction de quantité 📣","new":false,"id":"7NB1","d":"Éviter le mode online pour la première activité, elle ne sera pas correctement corrigée"},{"u":"N5/5NC5.json","t":"Multiplication de relatifs","new":false,"id":"5NC5"},{"u":"N6/6NE5.json","t":"Multiplication dérivées des tables","new":false,"id":"6NE5"},{"u":"N6/6ND7.json","t":"Multiplication à trou, trouver une multiplication 📣","new":false,"id":"6ND7","d":"Trouver un produit, un facteur"},{"u":"N6/6NE6.json","t":"Multiplications astucieuses","new":false,"id":"6NE6"},{"u":"N8/8NE6.json","t":"Multiplier des dixièmes, des centaines, des millièmes par 10, 100, 1000 📣","new":false,"id":"8NE6"},{"u":"N6/6NE3.json","t":"Multiplier par 1,5; 2,5; 3,5","new":false,"id":"6NE3"},{"u":"N6/6ND19.json","t":"Multiplier par 101, 102, 99, 98","new":false,"id":"6ND19"},{"u":"N6/6ND18.json","t":"Multiplier par 11, 12, 9, 19, 21, 15","new":false,"id":"6ND18"},{"u":"N6/6ND17.json","t":"Multiplier par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6ND17"},{"u":"N6/6NE4.json","t":"Multiplier par 75; 7,5; 0,75","new":false,"id":"6NE4"},{"u":"N6/6ND16.json","t":"Multiplier par un multiple de 10","new":false,"id":"6ND16"},{"u":"N6/6ND21.json","t":"Multiplier par un multiple de 10, 100, 1000","new":false,"id":"6ND21"},{"u":"N8/8NE4.json","t":"Multiplier un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE4","d":"Multiplication de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N6/6NE2.json","t":"Multiplier un décimal par 0,1, 0,01, 0,001","new":false,"id":"6NE2"},{"u":"N8/8NE2.json","t":"Multiplier un décimal par 10, 100, 1000 📣","new":false,"id":"8NE2","d":"Multiplication de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N4/4NC5.json","t":"Multiplier un décimal par une puissance de 10 📣","new":false,"id":"4NC5","d":"Multiplication de nombres décimaux tirés au hasard par une puissance négative ou positive de 10 comprise entre -5 et 5"},{"u":"N6/6NE9.json","t":"Multiplier un entier par 0,1 0,01 0,001","new":false,"id":"6NE9"},{"u":"N5/5NC9.json","t":"Pourcentage d'une quantité","new":false,"id":"5NC9"},{"u":"N5/5NC10.json","t":"Pourcentage d'une quantité (simple)","new":false,"id":"5NC10","d":"Calculer 10%,, 20%, 30%, 40%, 50%, 25%, 75%, 33%"},{"u":"N4/4NC3.json","t":"Produit de fractions","new":false,"id":"4NC3"},{"u":"N4/4NC4.json","t":"Quotient de fractions","new":false,"id":"4NC4"},{"u":"N5/5NC6.json","t":"Quotient de relatifs","new":false,"id":"5NC6"},{"u":"N6/6NF1.json","t":"Rendre la monnaie","new":false,"id":"6NF1"},{"u":"N5/5NC2.json","t":"Soustraction de relatifs","new":false,"id":"5NC2"},{"u":"N5/5NC8.json","t":"Soustraire des fractions","new":false,"id":"5NC8"},{"u":"N6/6ND24.json","t":"Suites additives, multiplicatives","new":false,"id":"6ND24","d":"Trouver le terme ou le facteur suivant"},{"u":"N6/6ND23.json","t":"Écrire la phrase correspondant à l'opération","new":false,"id":"6ND23","d":""}]},"4ND":{"n":"Notion de divisibilité et nombres premiers","e":[{"u":"N5/5ND2.json","t":"Critères de divisibilité","new":false,"id":"5ND2","d":"Trouver si un nombre est divisible par 2, 3, 5, 9 ou 10"},{"u":"N6/6ND10.json","t":"Division entière, division euclidienne","new":false,"id":"6ND10","d":"Pour répondre, donner le quotient, puis le reste si nécessaire, séparés d'un point-virgule"},{"u":"N5/5ND1.json","t":"Décomposer en facteurs premiers","new":false,"id":"5ND1","d":"Écrire le produit à l'aide du signe ×. Possibilité d'utiliser la notation avec des puissances."},{"u":"N5/5ND3.json","t":"Liste des diviseurs","new":false,"id":"5ND3"},{"u":"N5/5ND5.json","t":"Reconnaître un nombre premier","new":false,"id":"5ND5"},{"u":"N5/5ND4.json","t":"Trouver le plus grand diviseur commun","new":false,"id":"5ND4","d":"PGCD de deux nombres"}]},"4NE":{"n":"Utiliser le calcul littéral","e":[{"u":"N5/5NE9.json","t":"Appliquer un programme de calcul","new":false,"id":"5NE9","d":"Un programme de calcul étant proposé, il est demandé de l'appliquer à un nombre donné."},{"u":"N5/5NE3.json","t":"Calculer une expression","new":false,"id":"5NE3"},{"u":"N5/5NE5.json","t":"Calculer une expression produit (5e)","new":false,"id":"5NE5"},{"u":"N5/5NE10.json","t":"Calculer une expression à coefficients positifs","new":false,"id":"5NE10"},{"u":"N4/4NE4.json","t":"Développer à l'aide de la distributivité","new":false,"id":"4NE4"},{"u":"NK/Ko21.json","t":"Développer à l'aide de la distributivité","new":false,"id":"Ko21"},{"u":"N4/4NE5.json","t":"Factoriser une somme","new":false,"id":"4NE5"},{"u":"N5/5NE2.json","t":"Réduire un produit","new":false,"id":"5NE2"},{"u":"N5/5NE11.json","t":"Réduire un produit de monomes","new":true,"id":"5NE11"},{"u":"N4/4NE2.json","t":"Réduire une expression du premier degré","new":false,"id":"4NE2"},{"u":"N5/5NE6.json","t":"Réduire une expression du premier degré (coeffs positifs)","new":false,"id":"5NE6","d":"Réduire une expression du premier degrés dont les coefficients sonts tous positifs"},{"u":"N4/4NE3.json","t":"Réduire une expression du second degré","new":false,"id":"4NE3"},{"u":"N5/5NE7.json","t":"Réduire une expression du second degré (coeffs positifs)","new":false,"id":"5NE7","d":"Réduire une expression littérale du second degré dont les coefficients sont tous positifs."},{"u":"N5/5NE1.json","t":"Réduire une somme","new":false,"id":"5NE1"},{"u":"N4/4NE1.json","t":"Réduire une somme de produits","new":false,"id":"4NE1"},{"u":"N4/4NE7.json","t":"Résoudre une équation de type a ± x = b","new":false,"id":"4NE7"},{"u":"N4/4NE8.json","t":"Résoudre une équation de type ax = b","new":false,"id":"4NE8"},{"u":"N4/4NE6.json","t":"Résoudre une équation de type x ± a = b","new":false,"id":"4NE6"},{"u":"N4/4NE9.json","t":"Résoudre une équation du premier degré","new":false,"id":"4NE9"},{"u":"NK/Ko22.json","t":"Résoudre une équation du premier degré","new":false,"id":"Ko22"},{"u":"N5/5NE4.json","t":"Tester une égalité","new":false,"id":"5NE4","d":"Tester des égalités de"},{"u":"N5/5NE8.json","t":"Écrire l'expression littérale correspondante","new":false,"id":"5NE8","d":"Un programme de calcul étant proposé, il est demandé une expression algébrique correspondante."}]}}},"4D":{"nom":"Organisation et gestion de données, fonctions","chapitres":{"4DA":{"n":"Interpréter, représenter et traiter des données","e":[{"u":"N5/5DA2.json","t":"Calculs statistiques : moyenne, médiane, étendue de 2 à 5 valeurs","new":false,"id":"5DA2","d":"Pour le mode online, séparer les valeurs par le point-virugle."},{"u":"N5/5DA1.json","t":"Données les plus/moins représentées","new":false,"id":"5DA1","d":"Observer et trouver la donnée la plus ou la moins représentée. Ne pas utiliser en mode online pour le moment."}]},"4DB":{"n":"Notions de probabilités","e":[]},"4DC":{"n":"Problèmes de proportionnalité","e":[{"u":"N5/5DC1.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"5DC1"},{"u":"NK/Ko13.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"Ko13"},{"u":"N4/4DC1.json","t":"Calculer une 4e proportionnelle (calculatrice)","new":false,"id":"4DC1","d":""},{"u":"N5/5DC4.json","t":"Déterminer si un tableau est de proportionnalité","new":false,"id":"5DC4","d":"Utilisation des différentes méthodes pour savoir si un tableau est de proportionnalité"},{"u":"N4/4DC2.json","t":"Pourcentage global d'évolutions successives en pourcentage","new":false,"id":"4DC2"},{"u":"N5/5DC3.json","t":"Tableaux de proportionnalité","new":false,"id":"5DC3","d":"Calcul de données dans un tableau de proportionnalité"},{"u":"N5/5DC2.json","t":"Utiliser l'échelle d'une carte, d'un plan, d'un modèle réduit","new":false,"id":"5DC2","d":"Ne pas utiliser la saisie en ligne pour le moment."}]},"4DD":{"n":"Notion de fonction","e":[]}}},"4M":{"nom":"Grandeurs et mesures","chapitres":{"4MA":{"n":"Calculs de grandeurs","e":[{"u":"N6/6MC1.json","t":"Aires des figures usuelles 📣","new":false,"id":"6MC1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N5/5MA1.json","t":"Aires et périmètres des figures usuelles en fonction d'une inconnue","new":false,"id":"5MA1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N4/4MA2.json","t":"Calculer avec des grandeurs composées","new":false,"id":"4MA2","d":"Trouver une donnée à partir des deux autres."},{"u":"N4/4MA1.json","t":"Convertir des grandeurs composées","new":false,"id":"4MA1","d":"Passer d'une unité à une autre"},{"u":"N6/6GD1.json","t":"Lien entre aire d'un carré et côté 📣","new":false,"id":"6GD1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N6/6MA1.json","t":"Périmètre des figures usuelles 📣","new":false,"id":"6MA1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N5/5MA2.json","t":"Volumes de prismes simples","new":false,"id":"5MA2","d":"Calculer le volume d'un cube, d'un pavé droit, d'un prisme droit."},{"u":"N5/5MA3.json","t":"Volumes de pyramides et cônes","new":false,"id":"5MA3","d":"Calculer le volume d'une pyramide à base carrée, rectangulaire ou triangulaire."},{"u":"N5/5MA4.json","t":"Volumes de solides circulaires","new":false,"id":"5MA4","d":"Calculer le volume exact d'un cylindre, d'un cône, d'une boule."}]},"4MB":{"n":"Effet des transformations","e":[{"u":"N4/4MB1.json","t":"Calcul de longueurs dans les agrandissement et réductions","new":false,"id":"4MB1","d":"Calculer une longueur connaissant la longueur correspondante et le coefficient."},{"u":"N4/4MB2.json","t":"Déterminer le coefficient d'un agrandissement ou d'une réduction","new":false,"id":"4MB2","d":"Trouver le coefficient d'un agrandissement ou d'une réduction."}]}}},"4G":{"nom":"Espace et géométrie","chapitres":{"4GA":{"n":"Représenter l'espace","e":[{"u":"N6/6GB1.json","t":"Caractéristiques du prisme droit 📣","new":false,"id":"6GB1","d":"Vocabulaire et comptage "}]},"4GB":{"n":"Notions de géométrie pour démontrer","e":[{"u":"N4/4GB7.json","t":"Calculer une longueur à l'aide de l'égalité de Pythagore","new":false,"id":"4GB7","d":"Utiliser l'égalité de Pythagore dans un triangle rectangle"},{"u":"N4/4GB8.json","t":"Déterminer si un triangle est rectangle","new":false,"id":"4GB8","d":"Utiliser l'égalité de Pythagore ou la propriété des angles pour savoir si un triangle est rectangle"},{"u":"N4/4GB1.json","t":"Ecrire l'égalité de Pythagore","new":false,"id":"4GB1","d":"Observer le schéma du triangle rectangle pour écrire l'égalité de Pythagore"},{"u":"N5/5GB3.json","t":"Existence d'un triangle.","new":false,"id":"5GB3","d":"Déterminer l'existence ou non d'un triangle en fonction des côtés ou des angles"},{"u":"N4/4GB4.json","t":"Exprimer cosinus, sinus, tangente","new":false,"id":"4GB4","d":"Écrire le quotient égal au cosinus, au sinus ou à la tangente d'un angle dans un triangle rectangle"},{"u":"N5/5GB2.json","t":"Mesure d'un 3e angle, cas particuliers.","new":false,"id":"5GB2","d":"Déterminer la mesure d'un angle en degré dans un triangle particulier"},{"u":"N4/4GB10.json","t":"Prouver que des droites sont parallèles (Thalès)","new":false,"id":"4GB10","d":"Vérifier si des quotients sont égaux ou qu'il y a une proportion entre les triangles"},{"u":"N4/4GB9.json","t":"Théorème de Thalès (calculer)","new":false,"id":"4GB9","d":"Calculer une longueur grâce au théorème de Thalès"},{"u":"N4/4GB2.json","t":"Théorème de Thalès (égalité)","new":false,"id":"4GB2","d":"Observer la figure pour écrire l'égalité des quotients grâce au théorème de Thalès"},{"u":"N5/5GB1.json","t":"Trouver la mesure d'un 3e angle, en degrés.","new":false,"id":"5GB1","d":"Déterminer la mesure d'un angle en degré dans un triangle quelconque"},{"u":"N4/4GB5.json","t":"Trouver la relation trigonométrique.","new":false,"id":"4GB5","d":"Déterminer s'il faut utiliser le sinus, le cosinus ou la tangente à partir des données connues dans un triangle rectangle."},{"u":"N4/4GB6.json","t":"Utiliser la calculatrice avec sinus, cosinus, tangente","new":false,"id":"4GB6","d":"Calculer le sinus, le cosinus ou la tangente d'un angle aigu en degrés. Déterminer un angle aigu à partir de son sinus, de son cosinus ou de sa tangente dans un triangle rectangle."},{"u":"N4/4GB3.json","t":"Vocabulaire du triangle rectangle","new":false,"id":"4GB3","d":"Hypoténuse, côté opposé, côté adjacent"}]}}},"4A":{"nom":"Algorithmique et programmation","chapitres":{"4AA":{"n":"Ecrire, mettre au point, exécuter un programme","e":[]}}},"4L":{"nom":"Leçons","chapitres":{"4LN":{"n":"Nombres et calculs","e":[{"u":"N5/5LN1.json","t":"Leçon : enchainement d'opérations","new":false,"id":"5LN1","d":"16 questions sur priorités opératoires, notation quotient, distributivité"},{"u":"N5/5LN2.json","t":"Leçon : nombres relatifs","new":false,"id":"5LN2","d":"16 questions sur Notion, somme, différence, repérage"},{"u":"N5/5LN3.json","t":"Leçon : Proportionnalité","new":false,"id":"5LN3","d":"18 questions sur la proportionnalité entre grandeurs"},{"u":"N3/3LN1.json","t":"Équations","new":false,"id":"3LN1","d":"16 questions sur les équations"}]},"4LM":{"n":"Grandeurs et mesures","e":[]},"4LG":{"n":"Espace et Géométrie","e":[{"u":"N5/5LG2.json","t":"Leçon : solides","new":false,"id":"5LG2","d":"12 questions sur Notion, somme, différence, repérage"},{"u":"N5/5LG1.json","t":"Leçon : symétries","new":false,"id":"5LG1","d":"15 questions sur les symétries"},{"u":"N5/5LG3.json","t":"Leçon : triangle","new":false,"id":"5LG3","d":"Questions sur les triangles"}]},"4LD":{"n":"Organisation et gestion de données","e":[]}}}},"activitiesNumber":138},"5":{"nom":"5e","themes":{"5N":{"nom":"Nombres et calculs","chapitres":{"5NA":{"n":"Connaissance des nombres","e":[{"u":"N6/6NC2.json","t":"Arrondir un nombre décimal 📣","new":false,"id":"6NC2","d":"Donner le décimal le plus proche en fonction de la précision demandée."},{"u":"N6/6NB2.json","t":"Comparaison de fractions à 1 📣","new":false,"id":"6NB2","d":"Comparer en utilisant l'un des symboles >, < ou ="},{"u":"N6/6NB3.json","t":"Comparaison de fractions 📣","new":false,"id":"6NB3","d":"Comparer des fractions, avec 1 ou entre elles. Utiliser <, > ou ="},{"u":"N5/5NA3.json","t":"Comparer des décimaux relatifs","new":false,"id":"5NA3","d":"Donner le plus petit ou le plus grand de deux nombres."},{"u":"N5/5NA4.json","t":"Comparer des décimaux relatifs avec >, <, =","new":false,"id":"5NA4","d":"Utiliser les symboles <, > ou =."},{"u":"N6/6NC7.json","t":"Comparer des nombres décimaux 📣","new":false,"id":"6NC7","d":"Pour comparer les nombres, utiliser l'un des symboles <, > ou ="},{"u":"N6/6NE10.json","t":"Complément à l'unité","new":false,"id":"6NE10","d":"Trouver le complément qui donne une unité entière"},{"u":"N6/6NB4.json","t":"Décomposition de fraction en entier + fraction inférieure à 1 📣","new":false,"id":"6NB4","d":"Écrire une fraction en utilisant la décomposition qui correspond aux notations anglo saxones."},{"u":"N5/5NA6.json","t":"Décomposition de fraction en entier - fraction inférieure à 1 📣","new":false,"id":"5NA6","d":"Écrire une fraction en utilisant une décomposition."},{"u":"N6/6NB8.json","t":"Déterminer si des fractions sont égales 📣","new":false,"id":"6NB8","d":"Deux fractions sont données, dire si elles sont égales ou non."},{"u":"N6/6ND14.json","t":"Déterminer si un nombre est un multiple, un diviseur d'un autre nombre","new":false,"id":"6ND14"},{"u":"N6/6NC6.json","t":"Intercaler un nombre entre deux autres 📣","new":false,"id":"6NC6","d":"Trouver un nombre entre deux valeurs données"},{"u":"N6/6NA4.json","t":"Lecture sur une droite graduée","new":false,"id":"6NA4","d":"Lecture abscisse sur droite graduée"},{"u":"N6/6NB7.json","t":"Moitié, double ... 📣","new":false,"id":"6NB7","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N5/5NA2.json","t":"Opposé d'un nombre","new":false,"id":"5NA2","d":"Donner l'opposé d'un nombre, positif, ou négatif. Mode online : pour les fractions, laisser les numérateurs et dénominateurs positifs et mettre le moins devant la fraction négative."},{"u":"N6/6NC8.json","t":"Place du chiffre 9 dans un décimal 📣","new":true,"id":"6NC8","d":"Ne pas utiliser en mode online pour le moment"},{"u":"N6/6NA1.json","t":"Place du chiffre 9 📣","new":false,"id":"6NA1"},{"u":"N5/5NA5.json","t":"Pourcentage et fractions simples 📣","new":false,"id":"5NA5","d":"Donner le pourcentage correspondant à une fraction."},{"u":"N6/6NA2.json","t":"Quel est le chiffre des ... ? (entiers) 📣","new":false,"id":"6NA2"},{"u":"N6/6NC9.json","t":"Quel est le chiffre des / le nombre de (entier) ... ? (décimaux) 📣","new":false,"id":"6NC9","d":"Donner le chiffre d'un rang. Donner le nombre entier d'un rang."},{"u":"N6/6NB5.json","t":"Simplifier une fraction 📣","new":false,"id":"6NB5","d":"Écrire une fraction égale avec numérateur et dénominateurs les plus petits possibles"},{"u":"N5/5NA1.json","t":"Traduire un relatif par une phrase","new":true,"id":"5NA1","d":"La réponse positive peut être précédée d'un signe +, ou pas."},{"u":"N6/6NB6.json","t":"Trouver la fraction égale 📣","new":false,"id":"6NB6","d":"Compléter une fraction en donnant le nombre manquant"},{"u":"N6/6NB1.json","t":"Valeur décimale de fraction simple 📣","new":false,"id":"6NB1","d":"Donner l'écriture décimale d'une fraction, donner une fraction égale à une écriture décimale"}]},"5NB":{"n":"Comparaison des nombres","e":[{"u":"N5/5NB1.json","t":"Encadrer une fraction entre deux entiers consécutifs 📣","new":false,"id":"5NB1","d":"Trouver le nombre entier qui précède et le nombre qui suit une fraction."}]},"5NC":{"n":"Calculer avec les nombres","e":[{"u":"N5/5NC1.json","t":"Addition de relatifs","new":false,"id":"5NC1"},{"u":"N5/5NC7.json","t":"Ajouter des fractions 📣","new":false,"id":"5NC7"},{"u":"N6/6NE1.json","t":"Calculer le carré d'un décimal simple","new":false,"id":"6NE1"},{"u":"N6/6ND12.json","t":"Calculs avec parenthèses","new":false,"id":"6ND12"},{"u":"N6/6ND11.json","t":"Calculs successifs (6e)","new":false,"id":"6ND11"},{"u":"N5/5NC4.json","t":"Carrés de relatifs","new":false,"id":"5NC4"},{"u":"N6/6ND13.json","t":"Carrés des nombres entiers","new":false,"id":"6ND13"},{"u":"N4/4NC1.json","t":"Connaître les carrés parfaits","new":false,"id":"4NC1"},{"u":"N5/5NC3.json","t":"Distance entre deux points","new":false,"id":"5NC3"},{"u":"N6/6ND22.json","t":"Distribuer pour calculer","new":false,"id":"6ND22","d":"Décomposer un nombre pour calculer un produit"},{"u":"N8/8NE5.json","t":"Diviser un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE5","d":"Division de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N8/8NE3.json","t":"Diviser un décimal par 10, 100, 1000 📣","new":false,"id":"8NE3","d":"Division de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N6/6NE7.json","t":"Division par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6NE7"},{"u":"N6/6NE8.json","t":"Division par 75, 7,5 ou 0,75","new":false,"id":"6NE8"},{"u":"N6/6ND15.json","t":"Ecrire l'opération correspondant à la phrase","new":false,"id":"6ND15","d":""},{"u":"N6/6ND20.json","t":"Enchaînements d'opérations","new":false,"id":"6ND20"},{"u":"N5/5NC12.json","t":"Enchaînements d'opérations en écriture fractionnaire","new":false,"id":"5NC12","d":"Opérations nécessitant des étapes de calcul dont les résultats sont entiers."},{"u":"N6/6ND9.json","t":"Factoriser pour calculer","new":false,"id":"6ND9"},{"u":"N7/7NB1.json","t":"Fraction de quantité 📣","new":false,"id":"7NB1","d":"Éviter le mode online pour la première activité, elle ne sera pas correctement corrigée"},{"u":"N5/5NC5.json","t":"Multiplication de relatifs","new":false,"id":"5NC5"},{"u":"N6/6NE5.json","t":"Multiplication dérivées des tables","new":false,"id":"6NE5"},{"u":"N6/6ND7.json","t":"Multiplication à trou, trouver une multiplication 📣","new":false,"id":"6ND7","d":"Trouver un produit, un facteur"},{"u":"N6/6NE6.json","t":"Multiplications astucieuses","new":false,"id":"6NE6"},{"u":"N8/8NE6.json","t":"Multiplier des dixièmes, des centaines, des millièmes par 10, 100, 1000 📣","new":false,"id":"8NE6"},{"u":"N6/6NE3.json","t":"Multiplier par 1,5; 2,5; 3,5","new":false,"id":"6NE3"},{"u":"N6/6ND19.json","t":"Multiplier par 101, 102, 99, 98","new":false,"id":"6ND19"},{"u":"N6/6ND18.json","t":"Multiplier par 11, 12, 9, 19, 21, 15","new":false,"id":"6ND18"},{"u":"N6/6ND17.json","t":"Multiplier par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6ND17"},{"u":"N6/6NE4.json","t":"Multiplier par 75; 7,5; 0,75","new":false,"id":"6NE4"},{"u":"N6/6ND16.json","t":"Multiplier par un multiple de 10","new":false,"id":"6ND16"},{"u":"N6/6ND21.json","t":"Multiplier par un multiple de 10, 100, 1000","new":false,"id":"6ND21"},{"u":"N8/8NE4.json","t":"Multiplier un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE4","d":"Multiplication de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N6/6NE2.json","t":"Multiplier un décimal par 0,1, 0,01, 0,001","new":false,"id":"6NE2"},{"u":"N8/8NE2.json","t":"Multiplier un décimal par 10, 100, 1000 📣","new":false,"id":"8NE2","d":"Multiplication de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N6/6NE9.json","t":"Multiplier un entier par 0,1 0,01 0,001","new":false,"id":"6NE9"},{"u":"N5/5NC9.json","t":"Pourcentage d'une quantité","new":false,"id":"5NC9"},{"u":"N5/5NC10.json","t":"Pourcentage d'une quantité (simple)","new":false,"id":"5NC10","d":"Calculer 10%,, 20%, 30%, 40%, 50%, 25%, 75%, 33%"},{"u":"N5/5NC11.json","t":"Programmes de calcul « somme et différence »","new":false,"id":"5NC11","d":"À un nombre on ajoute un deuxième et on soustrait un troisième"},{"u":"N5/5NC6.json","t":"Quotient de relatifs","new":false,"id":"5NC6"},{"u":"N6/6NF1.json","t":"Rendre la monnaie","new":false,"id":"6NF1"},{"u":"N5/5NC2.json","t":"Soustraction de relatifs","new":false,"id":"5NC2"},{"u":"N5/5NC8.json","t":"Soustraire des fractions","new":false,"id":"5NC8"},{"u":"N6/6ND24.json","t":"Suites additives, multiplicatives","new":false,"id":"6ND24","d":"Trouver le terme ou le facteur suivant"},{"u":"N6/6ND23.json","t":"Écrire la phrase correspondant à l'opération","new":false,"id":"6ND23","d":""}]},"5ND":{"n":"Notion de divisibilité et nombres premiers","e":[{"u":"N5/5ND2.json","t":"Critères de divisibilité","new":false,"id":"5ND2","d":"Trouver si un nombre est divisible par 2, 3, 5, 9 ou 10"},{"u":"N6/6ND10.json","t":"Division entière, division euclidienne","new":false,"id":"6ND10","d":"Pour répondre, donner le quotient, puis le reste si nécessaire, séparés d'un point-virgule"},{"u":"N5/5ND1.json","t":"Décomposer en facteurs premiers","new":false,"id":"5ND1","d":"Écrire le produit à l'aide du signe ×. Possibilité d'utiliser la notation avec des puissances."},{"u":"N5/5ND3.json","t":"Liste des diviseurs","new":false,"id":"5ND3"},{"u":"N5/5ND5.json","t":"Reconnaître un nombre premier","new":false,"id":"5ND5"},{"u":"N5/5ND4.json","t":"Trouver le plus grand diviseur commun","new":false,"id":"5ND4","d":"PGCD de deux nombres"}]},"5NE":{"n":"Utiliser le calcul littéral","e":[{"u":"N5/5NE9.json","t":"Appliquer un programme de calcul","new":false,"id":"5NE9","d":"Un programme de calcul étant proposé, il est demandé de l'appliquer à un nombre donné."},{"u":"N5/5NE3.json","t":"Calculer une expression","new":false,"id":"5NE3"},{"u":"N5/5NE5.json","t":"Calculer une expression produit (5e)","new":false,"id":"5NE5"},{"u":"N5/5NE10.json","t":"Calculer une expression à coefficients positifs","new":false,"id":"5NE10"},{"u":"N5/5NE2.json","t":"Réduire un produit","new":false,"id":"5NE2"},{"u":"N5/5NE11.json","t":"Réduire un produit de monomes","new":true,"id":"5NE11"},{"u":"N5/5NE6.json","t":"Réduire une expression du premier degré (coeffs positifs)","new":false,"id":"5NE6","d":"Réduire une expression du premier degrés dont les coefficients sonts tous positifs"},{"u":"N5/5NE7.json","t":"Réduire une expression du second degré (coeffs positifs)","new":false,"id":"5NE7","d":"Réduire une expression littérale du second degré dont les coefficients sont tous positifs."},{"u":"N5/5NE1.json","t":"Réduire une somme","new":false,"id":"5NE1"},{"u":"N5/5NE4.json","t":"Tester une égalité","new":false,"id":"5NE4","d":"Tester des égalités de"},{"u":"N5/5NE8.json","t":"Écrire l'expression littérale correspondante","new":false,"id":"5NE8","d":"Un programme de calcul étant proposé, il est demandé une expression algébrique correspondante."}]}}},"5D":{"nom":"Organisation et gestion de données, fonctions","chapitres":{"5DA":{"n":"Interpréter, représenter et traiter des données","e":[{"u":"N5/5DA2.json","t":"Calculs statistiques : moyenne, médiane, étendue de 2 à 5 valeurs","new":false,"id":"5DA2","d":"Pour le mode online, séparer les valeurs par le point-virugle."},{"u":"N5/5DA1.json","t":"Données les plus/moins représentées","new":false,"id":"5DA1","d":"Observer et trouver la donnée la plus ou la moins représentée. Ne pas utiliser en mode online pour le moment."}]},"5DB":{"n":"Notions de probabilités","e":[]},"5DC":{"n":"Problèmes de proportionnalité","e":[{"u":"N5/5DC1.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"5DC1"},{"u":"NK/Ko13.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"Ko13"},{"u":"N5/5DC4.json","t":"Déterminer si un tableau est de proportionnalité","new":false,"id":"5DC4","d":"Utilisation des différentes méthodes pour savoir si un tableau est de proportionnalité"},{"u":"N5/5DC3.json","t":"Tableaux de proportionnalité","new":false,"id":"5DC3","d":"Calcul de données dans un tableau de proportionnalité"},{"u":"N5/5DC2.json","t":"Utiliser l'échelle d'une carte, d'un plan, d'un modèle réduit","new":false,"id":"5DC2","d":"Ne pas utiliser la saisie en ligne pour le moment."}]},"5DD":{"n":"Notion de fonction","e":[]}}},"5M":{"nom":"Grandeurs et mesures","chapitres":{"5MA":{"n":"Calculs de grandeurs","e":[{"u":"N6/6MC1.json","t":"Aires des figures usuelles 📣","new":false,"id":"6MC1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N5/5MA1.json","t":"Aires et périmètres des figures usuelles en fonction d'une inconnue","new":false,"id":"5MA1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N7/7MA1.json","t":"Conversions vers les unités de base","new":false,"id":"7MA1","d":"Conversions des multiples et sous-multiples des m, L et g vers les m, L et g"},{"u":"N6/6GD1.json","t":"Lien entre aire d'un carré et côté 📣","new":false,"id":"6GD1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N6/6MA1.json","t":"Périmètre des figures usuelles 📣","new":false,"id":"6MA1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N5/5MA2.json","t":"Volumes de prismes simples","new":false,"id":"5MA2","d":"Calculer le volume d'un cube, d'un pavé droit, d'un prisme droit."}]},"5MB":{"n":"Effet des transformations","e":[]}}},"5G":{"nom":"Espace et géométrie","chapitres":{"5GA":{"n":"Représenter l'espace","e":[{"u":"N6/6GB1.json","t":"Caractéristiques du prisme droit 📣","new":false,"id":"6GB1","d":"Vocabulaire et comptage "}]},"5GB":{"n":"Notions de géométrie pour démontrer","e":[{"u":"N5/5GB3.json","t":"Existence d'un triangle.","new":false,"id":"5GB3","d":"Déterminer l'existence ou non d'un triangle en fonction des côtés ou des angles"},{"u":"N5/5GB2.json","t":"Mesure d'un 3e angle, cas particuliers.","new":false,"id":"5GB2","d":"Déterminer la mesure d'un angle en degré dans un triangle particulier"},{"u":"N5/5GB1.json","t":"Trouver la mesure d'un 3e angle, en degrés.","new":false,"id":"5GB1","d":"Déterminer la mesure d'un angle en degré dans un triangle quelconque"}]}}},"5A":{"nom":"Algorithmique et programmation","chapitres":{"5AA":{"n":"Ecrire, mettre au point, exécuter un programme","e":[]}}},"5L":{"nom":"Leçons","chapitres":{"5LN":{"n":"Nombres et calculs","e":[{"u":"N5/5LN1.json","t":"Leçon : enchainement d'opérations","new":false,"id":"5LN1","d":"16 questions sur priorités opératoires, notation quotient, distributivité"},{"u":"N5/5LN2.json","t":"Leçon : nombres relatifs","new":false,"id":"5LN2","d":"16 questions sur Notion, somme, différence, repérage"},{"u":"N5/5LN3.json","t":"Leçon : Proportionnalité","new":false,"id":"5LN3","d":"18 questions sur la proportionnalité entre grandeurs"}]},"5LM":{"n":"Grandeurs et mesures","e":[]},"5LG":{"n":"Espace et Géométrie","e":[{"u":"N5/5LG2.json","t":"Leçon : solides","new":false,"id":"5LG2","d":"12 questions sur Notion, somme, différence, repérage"},{"u":"N5/5LG1.json","t":"Leçon : symétries","new":false,"id":"5LG1","d":"15 questions sur les symétries"},{"u":"N5/5LG3.json","t":"Leçon : triangle","new":false,"id":"5LG3","d":"Questions sur les triangles"}]},"5LD":{"n":"Organisation et gestion de données","e":[]}}}},"activitiesNumber":109},"6":{"nom":"6e","themes":{"6N":{"nom":"Nombres et calculs","chapitres":{"6NA":{"n":"Utiliser et représenter les grands nombres entiers","e":[{"u":"N8/8NA3.json","t":"Ajouter des unités, dizaines ... à un entier 📣","new":false,"id":"8NA3","d":"Somme d'un nombre entier avec des unités, dizaines, centaines..."},{"u":"N8/8NA2.json","t":"Ajouter une unité, une dizaine ... à un entier 📣","new":false,"id":"8NA2","d":"Somme d'un nombre entier avec une unité, une dizaine, une centaine, sans retenue."},{"u":"N8/8NA1.json","t":"Encadrer des entiers","new":false,"id":"8NA1"},{"u":"N9/9NA1.json","t":"Nombre de, chiffre des ... ? 📣","new":false,"id":"9NA1","d":"Indiquer le chiffre de, ou le nombre (entier) d'unités, dizaines, ..."},{"u":"N6/6NA1.json","t":"Place du chiffre 9 📣","new":false,"id":"6NA1"},{"u":"N6/6NA2.json","t":"Quel est le chiffre des ... ? (entiers) 📣","new":false,"id":"6NA2"},{"u":"N10/10NB1.json","t":"Écrire en chiffres jusqu'à 1000 📣","new":false,"id":"10NB1","d":"Écriture en chiffres des nombres inférieurs à 1000"},{"u":"N10/10NB2.json","t":"Écrire en lettres jusqu'à 1000","new":false,"id":"10NB2","d":"Écriture en lettres des nombres inférieurs à 1000"}]},"6NB":{"n":"Utiliser et représenter des fractions simples","e":[{"u":"N5/5NC7.json","t":"Ajouter des fractions 📣","new":false,"id":"5NC7"},{"u":"N6/6NB2.json","t":"Comparaison de fractions à 1 📣","new":false,"id":"6NB2","d":"Comparer en utilisant l'un des symboles >, < ou ="},{"u":"N6/6NB3.json","t":"Comparaison de fractions 📣","new":false,"id":"6NB3","d":"Comparer des fractions, avec 1 ou entre elles. Utiliser <, > ou ="},{"u":"N6/6NB4.json","t":"Décomposition de fraction en entier + fraction inférieure à 1 📣","new":false,"id":"6NB4","d":"Écrire une fraction en utilisant la décomposition qui correspond aux notations anglo saxones."},{"u":"N6/6NB8.json","t":"Déterminer si des fractions sont égales 📣","new":false,"id":"6NB8","d":"Deux fractions sont données, dire si elles sont égales ou non."},{"u":"N5/5NB1.json","t":"Encadrer une fraction entre deux entiers consécutifs 📣","new":false,"id":"5NB1","d":"Trouver le nombre entier qui précède et le nombre qui suit une fraction."},{"u":"N7/7NB1.json","t":"Fraction de quantité 📣","new":false,"id":"7NB1","d":"Éviter le mode online pour la première activité, elle ne sera pas correctement corrigée"},{"u":"N6/6NB7.json","t":"Moitié, double ... 📣","new":false,"id":"6NB7","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N6/6NB5.json","t":"Simplifier une fraction 📣","new":false,"id":"6NB5","d":"Écrire une fraction égale avec numérateur et dénominateurs les plus petits possibles"},{"u":"N6/6NB6.json","t":"Trouver la fraction égale 📣","new":false,"id":"6NB6","d":"Compléter une fraction en donnant le nombre manquant"},{"u":"N6/6NB1.json","t":"Valeur décimale de fraction simple 📣","new":false,"id":"6NB1","d":"Donner l'écriture décimale d'une fraction, donner une fraction égale à une écriture décimale"}]},"6NC":{"n":"Utiliser et représenter les nombres décimaux","e":[{"u":"N6/6NC2.json","t":"Arrondir un nombre décimal 📣","new":false,"id":"6NC2","d":"Donner le décimal le plus proche en fonction de la précision demandée."},{"u":"N6/6NC7.json","t":"Comparer des nombres décimaux 📣","new":false,"id":"6NC7","d":"Pour comparer les nombres, utiliser l'un des symboles <, > ou ="},{"u":"N6/6NC5.json","t":"Donner l'écriture décimale d'un nombre de dizaines, centaines, etc. 📣","new":false,"id":"6NC5"},{"u":"N6/6NC1.json","t":"Décompositions décimales 📣","new":false,"id":"6NC1","d":"Passer d'une écriture décimale à une décomposition parfois à l'aide de fractions décimales."},{"u":"N6/6NC10.json","t":"Encadrer un décimal (6e) 📣","new":false,"id":"6NC10","d":"Donner les deux nombres encadrant, le plus petit d'abord, séparés par un point-virgule"},{"u":"N6/6NC3.json","t":"Encadrer un décimal 📣","new":false,"id":"6NC3","d":"Donner les deux nombres encadrant, le plus petit d'abord, séparés par un point-virgule"},{"u":"N6/6NC6.json","t":"Intercaler un nombre entre deux autres 📣","new":false,"id":"6NC6","d":"Trouver un nombre entre deux valeurs données"},{"u":"N6/6NC4.json","t":"Ordre de grandeur d'une opération 📣","new":false,"id":"6NC4","d":"Trouver un ordre de grandeur d'une somme (addition), une différence (soustraction), un produit (multiplication)"},{"u":"N6/6NC8.json","t":"Place du chiffre 9 dans un décimal 📣","new":true,"id":"6NC8","d":"Ne pas utiliser en mode online pour le moment"},{"u":"N6/6NC9.json","t":"Quel est le chiffre des / le nombre de (entier) ... ? (décimaux) 📣","new":false,"id":"6NC9","d":"Donner le chiffre d'un rang. Donner le nombre entier d'un rang."},{"u":"N5/5DC2.json","t":"Utiliser l'échelle d'une carte, d'un plan, d'un modèle réduit","new":false,"id":"5DC2","d":"Ne pas utiliser la saisie en ligne pour le moment."}]},"6ND":{"n":"Calculer avec des nombres entiers","e":[{"u":"N6/6ND1.json","t":"Additions de petit entiers 📣","new":false,"id":"6ND1"},{"u":"N8/8ND1.json","t":"Ajouter, soustraire 9, 11, 19... 📣","new":false,"id":"8ND1"},{"u":"N9/9NE3.json","t":"Calculer astucieusement en mariant 2 nombres 📣","new":false,"id":"9NE3"},{"u":"N6/6ND12.json","t":"Calculs avec parenthèses","new":false,"id":"6ND12"},{"u":"N6/6ND11.json","t":"Calculs successifs (6e)","new":false,"id":"6ND11"},{"u":"N6/6ND13.json","t":"Carrés des nombres entiers","new":false,"id":"6ND13"},{"u":"N6/6ND3.json","t":"Complément à 10, 100, 1000 📣","new":false,"id":"6ND3"},{"u":"N6/6ND4.json","t":"Complément à une dizaine, une centaine 📣","new":false,"id":"6ND4"},{"u":"N4/4NC1.json","t":"Connaître les carrés parfaits","new":false,"id":"4NC1"},{"u":"N5/5ND2.json","t":"Critères de divisibilité","new":false,"id":"5ND2","d":"Trouver si un nombre est divisible par 2, 3, 5, 9 ou 10"},{"u":"N6/6ND22.json","t":"Distribuer pour calculer","new":false,"id":"6ND22","d":"Décomposer un nombre pour calculer un produit"},{"u":"N6/6ND10.json","t":"Division entière, division euclidienne","new":false,"id":"6ND10","d":"Pour répondre, donner le quotient, puis le reste si nécessaire, séparés d'un point-virgule"},{"u":"N6/6ND14.json","t":"Déterminer si un nombre est un multiple, un diviseur d'un autre nombre","new":false,"id":"6ND14"},{"u":"N6/6ND15.json","t":"Ecrire l'opération correspondant à la phrase","new":false,"id":"6ND15","d":""},{"u":"N6/6ND20.json","t":"Enchaînements d'opérations","new":false,"id":"6ND20"},{"u":"N6/6ND9.json","t":"Factoriser pour calculer","new":false,"id":"6ND9"},{"u":"N6/6ND7.json","t":"Multiplication à trou, trouver une multiplication 📣","new":false,"id":"6ND7","d":"Trouver un produit, un facteur"},{"u":"N6/6ND19.json","t":"Multiplier par 101, 102, 99, 98","new":false,"id":"6ND19"},{"u":"N6/6ND18.json","t":"Multiplier par 11, 12, 9, 19, 21, 15","new":false,"id":"6ND18"},{"u":"N6/6ND17.json","t":"Multiplier par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6ND17"},{"u":"N6/6ND16.json","t":"Multiplier par un multiple de 10","new":false,"id":"6ND16"},{"u":"N6/6ND21.json","t":"Multiplier par un multiple de 10, 100, 1000","new":false,"id":"6ND21"},{"u":"N9/9NE1.json","t":"Multiplier un entier par 10, 100, 1000 📣","new":false,"id":"9NE1","d":""},{"u":"N9/9NE2.json","t":"Repérer les nombres qui se marient bien 📣","new":false,"id":"9NE2","d":""},{"u":"N6/6ND2.json","t":"Somme d'entiers de 2 à 4 chiffres 📣","new":false,"id":"6ND2"},{"u":"N6/6ND5.json","t":"Somme de nombres qui se marient bien 📣","new":false,"id":"6ND5"},{"u":"N6/6ND8.json","t":"Soustractions d'entiers 📣","new":false,"id":"6ND8"},{"u":"N6/6ND24.json","t":"Suites additives, multiplicatives","new":false,"id":"6ND24","d":"Trouver le terme ou le facteur suivant"},{"u":"N6/6ND6.json","t":"Tables de multiplications classiques 📣","new":false,"id":"6ND6"},{"u":"N6/6ND23.json","t":"Écrire la phrase correspondant à l'opération","new":false,"id":"6ND23","d":""}]},"6NE":{"n":"Calculer avec des nombres décimaux","e":[{"u":"N8/8NE1.json","t":"Ajouter un nombre décimal et ... 📣","new":false,"id":"8NE1","d":"Somme d'un nombre décimal avec un nombre de dixièmes, un petit décimal, un décimal quelconque"},{"u":"N6/6NE1.json","t":"Calculer le carré d'un décimal simple","new":false,"id":"6NE1"},{"u":"N6/6NE10.json","t":"Complément à l'unité","new":false,"id":"6NE10","d":"Trouver le complément qui donne une unité entière"},{"u":"N8/8NE5.json","t":"Diviser un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE5","d":"Division de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N8/8NE3.json","t":"Diviser un décimal par 10, 100, 1000 📣","new":false,"id":"8NE3","d":"Division de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N7/7NE2.json","t":"Diviser un entier par 10, 100, 1000 📣","new":false,"id":"7NE2"},{"u":"N6/6NE7.json","t":"Division par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6NE7"},{"u":"N6/6NE8.json","t":"Division par 75, 7,5 ou 0,75","new":false,"id":"6NE8"},{"u":"N6/6NE5.json","t":"Multiplication dérivées des tables","new":false,"id":"6NE5"},{"u":"N6/6NE6.json","t":"Multiplications astucieuses","new":false,"id":"6NE6"},{"u":"N8/8NE6.json","t":"Multiplier des dixièmes, des centaines, des millièmes par 10, 100, 1000 📣","new":false,"id":"8NE6"},{"u":"N6/6NE3.json","t":"Multiplier par 1,5; 2,5; 3,5","new":false,"id":"6NE3"},{"u":"N6/6NE4.json","t":"Multiplier par 75; 7,5; 0,75","new":false,"id":"6NE4"},{"u":"N8/8NE4.json","t":"Multiplier un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE4","d":"Multiplication de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N6/6NE2.json","t":"Multiplier un décimal par 0,1, 0,01, 0,001","new":false,"id":"6NE2"},{"u":"N8/8NE2.json","t":"Multiplier un décimal par 10, 100, 1000 📣","new":false,"id":"8NE2","d":"Multiplication de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N6/6NE9.json","t":"Multiplier un entier par 0,1 0,01 0,001","new":false,"id":"6NE9"},{"u":"N7/7NE1.json","t":"Somme astucieuse avec des décimaux 📣","new":false,"id":"7NE1","d":"Ajouter deux décimaux qui se marient bien et un nombre entier"}]},"6NF":{"n":"Résoudre des problèmes avec des calculs","e":[{"u":"N6/6NF1.json","t":"Rendre la monnaie","new":false,"id":"6NF1"}]}}},"6M":{"nom":"Grandeurs et mesures","chapitres":{"6MA":{"n":"Longueurs, masses","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."},{"u":"N7/7MA1.json","t":"Conversions vers les unités de base","new":false,"id":"7MA1","d":"Conversions des multiples et sous-multiples des m, L et g vers les m, L et g"},{"u":"N6/6MA1.json","t":"Périmètre des figures usuelles 📣","new":false,"id":"6MA1","d":"Pas encore compatible avec la saisie en ligne"}]},"6MB":{"n":"Durées","e":[{"u":"N7/7MC1.json","t":"Ajouter retirer des durées, calculer un horaire, une durée 📣","new":false,"id":"7MC1","d":"Donner la réponse en indiquant l'heure au format 9h05"},{"u":"N7/7MC2.json","t":"Conversions de durées 📣","new":false,"id":"7MC2","d":"Conversions par interprétation de reste."},{"u":"N8/8MC1.json","t":"Conversions heures minutes <=> heures décimales 📣","new":false,"id":"8MC1"}]},"6MC":{"n":"Aires","e":[{"u":"N6/6MC1.json","t":"Aires des figures usuelles 📣","new":false,"id":"6MC1","d":"Pas encore compatible avec la saisie en ligne"},{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."}]},"6MD":{"n":"Contenances et volumes","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."},{"u":"N5/5MA2.json","t":"Volumes de prismes simples","new":false,"id":"5MA2","d":"Calculer le volume d'un cube, d'un pavé droit, d'un prisme droit."}]},"6ME":{"n":"Angles","e":[{"u":"N8/8ME1.json","t":"Reconnaître un angle 📣","new":false,"id":"8ME1"}]},"6MF":{"n":"Résoudre des problèmes","e":[]}}},"6G":{"nom":"Espace et géométrie","chapitres":{"6GA":{"n":"Se repérer et se déplacer dans l'espace","e":[]},"6GB":{"n":"Reconnaitre, nommer, décrire, etc. des solides","e":[{"u":"N6/6GB1.json","t":"Caractéristiques du prisme droit 📣","new":false,"id":"6GB1","d":"Vocabulaire et comptage "}]},"6GC":{"n":"Reconnaitre, nommer, décrire, etc. des figures planes","e":[{"u":"N6/6GC1.json","t":"Reconnaître un objet géométrique 📣","new":false,"id":"6GC1","d":"Différencier les lignes géométriques de base"}]},"6GD":{"n":"Utiliser quelques relations géométriques","e":[{"u":"N6/6GD1.json","t":"Lien entre aire d'un carré et côté 📣","new":false,"id":"6GD1","d":"Pas encore compatible avec la saisie en ligne"}]}}}},"activitiesNumber":93},"7":{"nom":"CM2","themes":{"7N":{"nom":"Nombres et calculs","chapitres":{"7NA":{"n":"Utiliser et représenter les grands nombres entiers","e":[{"u":"N8/8NA3.json","t":"Ajouter des unités, dizaines ... à un entier 📣","new":false,"id":"8NA3","d":"Somme d'un nombre entier avec des unités, dizaines, centaines..."},{"u":"N8/8NA2.json","t":"Ajouter une unité, une dizaine ... à un entier 📣","new":false,"id":"8NA2","d":"Somme d'un nombre entier avec une unité, une dizaine, une centaine, sans retenue."},{"u":"N8/8NA1.json","t":"Encadrer des entiers","new":false,"id":"8NA1"},{"u":"N9/9NA1.json","t":"Nombre de, chiffre des ... ? 📣","new":false,"id":"9NA1","d":"Indiquer le chiffre de, ou le nombre (entier) d'unités, dizaines, ..."},{"u":"N6/6NA1.json","t":"Place du chiffre 9 📣","new":false,"id":"6NA1"},{"u":"N6/6NA2.json","t":"Quel est le chiffre des ... ? (entiers) 📣","new":false,"id":"6NA2"},{"u":"N10/10NB1.json","t":"Écrire en chiffres jusqu'à 1000 📣","new":false,"id":"10NB1","d":"Écriture en chiffres des nombres inférieurs à 1000"},{"u":"N10/10NB2.json","t":"Écrire en lettres jusqu'à 1000","new":false,"id":"10NB2","d":"Écriture en lettres des nombres inférieurs à 1000"}]},"7NB":{"n":"Utiliser et représenter des fractions simples","e":[{"u":"N6/6NB4.json","t":"Décomposition de fraction en entier + fraction inférieure à 1 📣","new":false,"id":"6NB4","d":"Écrire une fraction en utilisant la décomposition qui correspond aux notations anglo saxones."},{"u":"N7/7NB1.json","t":"Fraction de quantité 📣","new":false,"id":"7NB1","d":"Éviter le mode online pour la première activité, elle ne sera pas correctement corrigée"}]},"7NC":{"n":"Utiliser et représenter les nombres décimaux","e":[{"u":"N6/6NC7.json","t":"Comparer des nombres décimaux 📣","new":false,"id":"6NC7","d":"Pour comparer les nombres, utiliser l'un des symboles <, > ou ="},{"u":"N6/6NC1.json","t":"Décompositions décimales 📣","new":false,"id":"6NC1","d":"Passer d'une écriture décimale à une décomposition parfois à l'aide de fractions décimales."},{"u":"N6/6NC6.json","t":"Intercaler un nombre entre deux autres 📣","new":false,"id":"6NC6","d":"Trouver un nombre entre deux valeurs données"},{"u":"N6/6NC8.json","t":"Place du chiffre 9 dans un décimal 📣","new":true,"id":"6NC8","d":"Ne pas utiliser en mode online pour le moment"},{"u":"N6/6NC9.json","t":"Quel est le chiffre des / le nombre de (entier) ... ? (décimaux) 📣","new":false,"id":"6NC9","d":"Donner le chiffre d'un rang. Donner le nombre entier d'un rang."}]},"7ND":{"n":"Calculer avec des nombres entiers","e":[{"u":"N6/6ND1.json","t":"Additions de petit entiers 📣","new":false,"id":"6ND1"},{"u":"N8/8ND1.json","t":"Ajouter, soustraire 9, 11, 19... 📣","new":false,"id":"8ND1"},{"u":"N9/9NE3.json","t":"Calculer astucieusement en mariant 2 nombres 📣","new":false,"id":"9NE3"},{"u":"N6/6ND3.json","t":"Complément à 10, 100, 1000 📣","new":false,"id":"6ND3"},{"u":"N6/6ND4.json","t":"Complément à une dizaine, une centaine 📣","new":false,"id":"6ND4"},{"u":"N5/5ND2.json","t":"Critères de divisibilité","new":false,"id":"5ND2","d":"Trouver si un nombre est divisible par 2, 3, 5, 9 ou 10"},{"u":"N6/6ND10.json","t":"Division entière, division euclidienne","new":false,"id":"6ND10","d":"Pour répondre, donner le quotient, puis le reste si nécessaire, séparés d'un point-virgule"},{"u":"N10/10ND1.json","t":"Moitié, double ... 📣","new":false,"id":"10ND1","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N6/6ND7.json","t":"Multiplication à trou, trouver une multiplication 📣","new":false,"id":"6ND7","d":"Trouver un produit, un facteur"},{"u":"N6/6ND19.json","t":"Multiplier par 101, 102, 99, 98","new":false,"id":"6ND19"},{"u":"N6/6ND18.json","t":"Multiplier par 11, 12, 9, 19, 21, 15","new":false,"id":"6ND18"},{"u":"N6/6ND17.json","t":"Multiplier par 2, 5, 20, 50, 4, 25, 0,5, 0,25","new":false,"id":"6ND17"},{"u":"N9/9NE1.json","t":"Multiplier un entier par 10, 100, 1000 📣","new":false,"id":"9NE1","d":""},{"u":"N9/9NE2.json","t":"Repérer les nombres qui se marient bien 📣","new":false,"id":"9NE2","d":""},{"u":"N6/6ND2.json","t":"Somme d'entiers de 2 à 4 chiffres 📣","new":false,"id":"6ND2"},{"u":"N6/6ND5.json","t":"Somme de nombres qui se marient bien 📣","new":false,"id":"6ND5"},{"u":"N6/6ND8.json","t":"Soustractions d'entiers 📣","new":false,"id":"6ND8"},{"u":"N6/6ND6.json","t":"Tables de multiplications classiques 📣","new":false,"id":"6ND6"},{"u":"N10/10ND2.json","t":"Variations autour des tables de multiplication 📣","new":false,"id":"10ND2"}]},"7NE":{"n":"Calculer avec des nombres décimaux","e":[{"u":"N8/8NE1.json","t":"Ajouter un nombre décimal et ... 📣","new":false,"id":"8NE1","d":"Somme d'un nombre décimal avec un nombre de dixièmes, un petit décimal, un décimal quelconque"},{"u":"N6/6NE10.json","t":"Complément à l'unité","new":false,"id":"6NE10","d":"Trouver le complément qui donne une unité entière"},{"u":"N8/8NE5.json","t":"Diviser un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE5","d":"Division de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N8/8NE3.json","t":"Diviser un décimal par 10, 100, 1000 📣","new":false,"id":"8NE3","d":"Division de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N7/7NE2.json","t":"Diviser un entier par 10, 100, 1000 📣","new":false,"id":"7NE2"},{"u":"N6/6NE5.json","t":"Multiplication dérivées des tables","new":false,"id":"6NE5"},{"u":"N8/8NE6.json","t":"Multiplier des dixièmes, des centaines, des millièmes par 10, 100, 1000 📣","new":false,"id":"8NE6"},{"u":"N6/6NE3.json","t":"Multiplier par 1,5; 2,5; 3,5","new":false,"id":"6NE3"},{"u":"N6/6NE4.json","t":"Multiplier par 75; 7,5; 0,75","new":false,"id":"6NE4"},{"u":"N8/8NE4.json","t":"Multiplier un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE4","d":"Multiplication de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N8/8NE2.json","t":"Multiplier un décimal par 10, 100, 1000 📣","new":false,"id":"8NE2","d":"Multiplication de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N7/7NE1.json","t":"Somme astucieuse avec des décimaux 📣","new":false,"id":"7NE1","d":"Ajouter deux décimaux qui se marient bien et un nombre entier"}]},"7NF":{"n":"Résoudre des problèmes avec des calculs","e":[{"u":"N6/6NF1.json","t":"Rendre la monnaie","new":false,"id":"6NF1"}]},"7NG":{"n":"Organisation et gestion de données","e":[]},"7NH":{"n":"Problèmes de proportionnalité","e":[{"u":"N5/5DC2.json","t":"Utiliser l'échelle d'une carte, d'un plan, d'un modèle réduit","new":false,"id":"5DC2","d":"Ne pas utiliser la saisie en ligne pour le moment."}]}}},"7M":{"nom":"Grandeurs et mesures","chapitres":{"7MA":{"n":"Longueurs et périmètres","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."},{"u":"N7/7MA1.json","t":"Conversions vers les unités de base","new":false,"id":"7MA1","d":"Conversions des multiples et sous-multiples des m, L et g vers les m, L et g"}]},"7MB":{"n":"Aires","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."}]},"7MC":{"n":"Durées","e":[{"u":"N7/7MC1.json","t":"Ajouter retirer des durées, calculer un horaire, une durée 📣","new":false,"id":"7MC1","d":"Donner la réponse en indiquant l'heure au format 9h05"},{"u":"N7/7MC2.json","t":"Conversions de durées 📣","new":false,"id":"7MC2","d":"Conversions par interprétation de reste."},{"u":"N8/8MC1.json","t":"Conversions heures minutes <=> heures décimales 📣","new":false,"id":"8MC1"}]},"7MD":{"n":"Volumes et contenances","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."}]},"7ME":{"n":"Angles","e":[{"u":"N8/8ME1.json","t":"Reconnaître un angle 📣","new":false,"id":"8ME1"}]},"7MF":{"n":"Résoudre des problèmes impliquant des grandeurs","e":[]},"7MG":{"n":"Proportionnalité","e":[]}}},"7G":{"nom":"Espace et géométrie","chapitres":{"7GA":{"n":"Se repérer et se déplacer dans l'espace","e":[]},"7GB":{"n":"Reconnaitre, nommer, décrire, etc. des solides","e":[]},"7GC":{"n":"Reconnaitre, nommer, décrire, etc. des figures planes","e":[]},"7GD":{"n":"Utiliser quelques relations géométriques","e":[]}}}},"activitiesNumber":56},"8":{"nom":"CM1","themes":{"8N":{"nom":"Nombres et calculs","chapitres":{"8NA":{"n":"Utiliser et représenter les grands nombres entiers","e":[{"u":"N8/8NA3.json","t":"Ajouter des unités, dizaines ... à un entier 📣","new":false,"id":"8NA3","d":"Somme d'un nombre entier avec des unités, dizaines, centaines..."},{"u":"N8/8NA2.json","t":"Ajouter une unité, une dizaine ... à un entier 📣","new":false,"id":"8NA2","d":"Somme d'un nombre entier avec une unité, une dizaine, une centaine, sans retenue."},{"u":"N8/8NA1.json","t":"Encadrer des entiers","new":false,"id":"8NA1"},{"u":"N9/9NA1.json","t":"Nombre de, chiffre des ... ? 📣","new":false,"id":"9NA1","d":"Indiquer le chiffre de, ou le nombre (entier) d'unités, dizaines, ..."},{"u":"N10/10NB1.json","t":"Écrire en chiffres jusqu'à 1000 📣","new":false,"id":"10NB1","d":"Écriture en chiffres des nombres inférieurs à 1000"},{"u":"N10/10NB2.json","t":"Écrire en lettres jusqu'à 1000","new":false,"id":"10NB2","d":"Écriture en lettres des nombres inférieurs à 1000"}]},"8NB":{"n":"Utiliser et représenter des fractions simples","e":[]},"8NC":{"n":"Utiliser et représenter les nombres décimaux","e":[{"u":"N6/6NC7.json","t":"Comparer des nombres décimaux 📣","new":false,"id":"6NC7","d":"Pour comparer les nombres, utiliser l'un des symboles <, > ou ="},{"u":"N6/6NC6.json","t":"Intercaler un nombre entre deux autres 📣","new":false,"id":"6NC6","d":"Trouver un nombre entre deux valeurs données"}]},"8ND":{"n":"Calculer avec des nombres entiers","e":[{"u":"N8/8ND1.json","t":"Ajouter, soustraire 9, 11, 19... 📣","new":false,"id":"8ND1"},{"u":"N9/9NE3.json","t":"Calculer astucieusement en mariant 2 nombres 📣","new":false,"id":"9NE3"},{"u":"N6/6ND3.json","t":"Complément à 10, 100, 1000 📣","new":false,"id":"6ND3"},{"u":"N6/6ND4.json","t":"Complément à une dizaine, une centaine 📣","new":false,"id":"6ND4"},{"u":"N5/5ND2.json","t":"Critères de divisibilité","new":false,"id":"5ND2","d":"Trouver si un nombre est divisible par 2, 3, 5, 9 ou 10"},{"u":"N10/10ND1.json","t":"Moitié, double ... 📣","new":false,"id":"10ND1","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N6/6ND7.json","t":"Multiplication à trou, trouver une multiplication 📣","new":false,"id":"6ND7","d":"Trouver un produit, un facteur"},{"u":"N9/9NE1.json","t":"Multiplier un entier par 10, 100, 1000 📣","new":false,"id":"9NE1","d":""},{"u":"N9/9NE2.json","t":"Repérer les nombres qui se marient bien 📣","new":false,"id":"9NE2","d":""},{"u":"N6/6ND2.json","t":"Somme d'entiers de 2 à 4 chiffres 📣","new":false,"id":"6ND2"},{"u":"N6/6ND5.json","t":"Somme de nombres qui se marient bien 📣","new":false,"id":"6ND5"},{"u":"N6/6ND8.json","t":"Soustractions d'entiers 📣","new":false,"id":"6ND8"},{"u":"N10/10ND2.json","t":"Variations autour des tables de multiplication 📣","new":false,"id":"10ND2"}]},"8NE":{"n":"Calculer avec des nombres décimaux","e":[{"u":"N8/8NE1.json","t":"Ajouter un nombre décimal et ... 📣","new":false,"id":"8NE1","d":"Somme d'un nombre décimal avec un nombre de dixièmes, un petit décimal, un décimal quelconque"},{"u":"N8/8NE5.json","t":"Diviser un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE5","d":"Division de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N8/8NE3.json","t":"Diviser un décimal par 10, 100, 1000 📣","new":false,"id":"8NE3","d":"Division de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N8/8NE6.json","t":"Multiplier des dixièmes, des centaines, des millièmes par 10, 100, 1000 📣","new":false,"id":"8NE6"},{"u":"N8/8NE4.json","t":"Multiplier un décimal (simple) par 10, 100, 1000 📣","new":false,"id":"8NE4","d":"Multiplication de nombres à 1, 2 ou 3 chiffres significatifs par 10, 100, 1000"},{"u":"N8/8NE2.json","t":"Multiplier un décimal par 10, 100, 1000 📣","new":false,"id":"8NE2","d":"Multiplication de nombres tirés au hasard par 10, 100, 1000 ou à 3 chiffres significatifs"},{"u":"N6/6ND6.json","t":"Tables de multiplications classiques 📣","new":false,"id":"6ND6"}]},"8NF":{"n":"Résoudre des problèmes avec des calculs","e":[]},"8NG":{"n":"Organisation et gestion de données","e":[]},"8NH":{"n":"Problèmes de proportionnalité","e":[]}}},"8M":{"nom":"Grandeurs et mesures","chapitres":{"8MA":{"n":"Longueurs et périmètres","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."}]},"8MB":{"n":"Aires","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."}]},"8MC":{"n":"Durées","e":[{"u":"N7/7MC1.json","t":"Ajouter retirer des durées, calculer un horaire, une durée 📣","new":false,"id":"7MC1","d":"Donner la réponse en indiquant l'heure au format 9h05"},{"u":"N8/8MC1.json","t":"Conversions heures minutes <=> heures décimales 📣","new":false,"id":"8MC1"}]},"8MD":{"n":"Volumes et contenances","e":[{"u":"N8/8MA1.json","t":"Conversions classiques","new":false,"id":"8MA1","d":"Éviter d'utiliser en mode online, les corrections ne seront pas correctes et le clavier virtuel n'est pas adapté."}]},"8ME":{"n":"Angles","e":[{"u":"N8/8ME1.json","t":"Reconnaître un angle 📣","new":false,"id":"8ME1"}]},"8MF":{"n":"Résoudre des problèmes impliquant des grandeurs","e":[]},"8MG":{"n":"Proportionnalité","e":[]}}},"8G":{"nom":"Espace et géométrie","chapitres":{"8GA":{"n":"Se repérer et se déplacer dans l'espace","e":[]},"8GB":{"n":"Reconnaitre, nommer, décrire, etc. des solides","e":[]},"8GC":{"n":"Reconnaitre, nommer, décrire, etc. des figures planes","e":[]},"8GD":{"n":"Utiliser quelques relations géométriques","e":[]}}}},"activitiesNumber":34},"9":{"nom":"CE2","themes":{"9N":{"nom":"Nombres et calculs","chapitres":{"9NA":{"n":"Comprendre et utiliser les nombres entiers","e":[{"u":"N9/9NA1.json","t":"Nombre de, chiffre des ... ? 📣","new":false,"id":"9NA1","d":"Indiquer le chiffre de, ou le nombre (entier) d'unités, dizaines, ..."}]},"9NB":{"n":"Nommer, lire, écrire, représenter des entiers","e":[{"u":"N10/10NB1.json","t":"Écrire en chiffres jusqu'à 1000 📣","new":false,"id":"10NB1","d":"Écriture en chiffres des nombres inférieurs à 1000"},{"u":"N10/10NB2.json","t":"Écrire en lettres jusqu'à 1000","new":false,"id":"10NB2","d":"Écriture en lettres des nombres inférieurs à 1000"}]},"9NC":{"n":"Utiliser et représenter les nombres décimaux","e":[{"u":"N6/6NC7.json","t":"Comparer des nombres décimaux 📣","new":false,"id":"6NC7","d":"Pour comparer les nombres, utiliser l'un des symboles <, > ou ="},{"u":"N6/6NC6.json","t":"Intercaler un nombre entre deux autres 📣","new":false,"id":"6NC6","d":"Trouver un nombre entre deux valeurs données"}]},"9ND":{"n":"Calculer avec des entiers : faits numériques","e":[{"u":"N10/10ND1.json","t":"Moitié, double ... 📣","new":false,"id":"10ND1","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N6/6ND8.json","t":"Soustractions d'entiers 📣","new":false,"id":"6ND8"},{"u":"N10/10ND2.json","t":"Variations autour des tables de multiplication 📣","new":false,"id":"10ND2"}]},"9NE":{"n":"Calculer avec des entiers : calcul mental","e":[{"u":"N9/9NE3.json","t":"Calculer astucieusement en mariant 2 nombres 📣","new":false,"id":"9NE3"},{"u":"N9/9NE1.json","t":"Multiplier un entier par 10, 100, 1000 📣","new":false,"id":"9NE1","d":""},{"u":"N9/9NE2.json","t":"Repérer les nombres qui se marient bien 📣","new":false,"id":"9NE2","d":""},{"u":"N6/6ND6.json","t":"Tables de multiplications classiques 📣","new":false,"id":"6ND6"}]},"9NF":{"n":"Calculer avec des entiers : calcul en ligne","e":[]},"9NG":{"n":"Calculer avec des entiers : calcul en posé","e":[]},"9NH":{"n":"Résoudre des problèmes","e":[]}}},"9M":{"nom":"Grandeurs et mesures","chapitres":{"9MA":{"n":"Longueurs","e":[]},"9MB":{"n":"Masses","e":[]},"9MC":{"n":"Dates et durées","e":[{"u":"N7/7MC1.json","t":"Ajouter retirer des durées, calculer un horaire, une durée 📣","new":false,"id":"7MC1","d":"Donner la réponse en indiquant l'heure au format 9h05"}]},"9MD":{"n":"Contenances","e":[]},"9ME":{"n":"Résoudre des problèmes","e":[]}}},"9G":{"nom":"Espace et géométrie","chapitres":{"9GA":{"n":"Se repérer et se déplacer","e":[]},"9GB":{"n":"Reconnaitre, nommer, décrire, etc. des solides","e":[]},"9GC":{"n":"Reconnaitre, nommer, décrire, etc. des figures planes","e":[]}}}},"activitiesNumber":13},"10":{"nom":"CE1","themes":{"10N":{"nom":"Nombres et calculs","chapitres":{"10NA":{"n":"Comprendre et utiliser les nombres entiers","e":[]},"10NB":{"n":"Nommer, lire, écrire, représenter des entiers","e":[{"u":"N10/10NB1.json","t":"Écrire en chiffres jusqu'à 1000 📣","new":false,"id":"10NB1","d":"Écriture en chiffres des nombres inférieurs à 1000"},{"u":"N10/10NB2.json","t":"Écrire en lettres jusqu'à 1000","new":false,"id":"10NB2","d":"Écriture en lettres des nombres inférieurs à 1000"}]},"10NC":{"n":"Résoudre des problèmes avec des entiers","e":[]},"10ND":{"n":"Calculer avec des entiers : faits numériques","e":[{"u":"N10/10ND1.json","t":"Moitié, double ... 📣","new":false,"id":"10ND1","d":"Calculer le double, la moitié, le tiers, le triple, le quart ou le quadruple d'un nombre entier."},{"u":"N10/10ND2.json","t":"Variations autour des tables de multiplication 📣","new":false,"id":"10ND2"}]},"10NE":{"n":"Calculer avec des entiers : calcul mental","e":[{"u":"N10/10NE1.json","t":"Tables de Multiplications de 1 à 5 📣","new":false,"id":"10NE1"}]},"10NF":{"n":"Calculer avec des entiers : calcul en ligne","e":[]},"10NG":{"n":"Calculer avec des entiers : calcul en posé","e":[]}}},"10M":{"nom":"Grandeurs et mesures","chapitres":{"10MA":{"n":"Longueurs","e":[]},"10MB":{"n":"Masses","e":[]},"10MC":{"n":"Dates et durées","e":[]},"10MD":{"n":"Contenances","e":[]},"10ME":{"n":"Résoudre des problèmes","e":[]}}},"10G":{"nom":"Espace et géométrie","chapitres":{"10GA":{"n":"Se repérer et se déplacer","e":[]},"10GB":{"n":"Reconnaitre, nommer, décrire, etc. des solides","e":[]},"10GC":{"n":"Reconnaitre, nommer, décrire, etc. des figures planes","e":[]}}}},"activitiesNumber":5},"11":{"nom":"CP","themes":{"11N":{"nom":"Nombres et calculs","chapitres":{"11NA":{"n":"Comprendre et utiliser des entiers","e":[]},"11NB":{"n":"Nommer, lire, écrire, représenter des entiers","e":[]},"11NC":{"n":"Résoudre les problèmes","e":[]},"11ND":{"n":"Calculer avec des entiers","e":[]}}},"11M":{"nom":"Grandeurs et mesures","chapitres":{"11MA":{"n":"Comparer, estimer, lexique des longueurs","e":[]},"11MB":{"n":"Comparer, estimer, lexique des masses","e":[]},"11MC":{"n":"Comparer, estimer, lexique des dates et durées","e":[]},"11MD":{"n":"Résoudre des problèmes","e":[]}}},"11G":{"nom":"Espace et géométrie","chapitres":{"11GA":{"n":"Se repérer, se déplacer","e":[]},"11GB":{"n":"Reconnaitre, nommer, décrire des solides","e":[]},"11GC":{"n":"Figures géométriques","e":[]}}}},"activitiesNumber":0},"G":{"nom":"1re Gén","themes":{"GL":{"nom":"Algèbre","chapitres":{"GL1":{"n":"Suites, modèles discrets","e":[{"u":"NG/GL11.json","t":"Nature d'une suite","new":false,"id":"GL11"}]},"GL2":{"n":"Équations, fonctions polynomes du second degré","e":[]}}},"GA":{"nom":"Analyse","chapitres":{"GA1":{"n":"Dérivation","e":[{"u":"NG/GA14.json","t":"Dérivée de fonction composée / g(ax+b)","new":false,"id":"GA14","d":"Trouver la dérivée des fonctions polynomes à partir de $$g(ax+b)'=ag'(ax+b)$$"},{"u":"NG/GA11.json","t":"Dérivée de fonction polynomiale","new":false,"id":"GA11","d":"Trouver la dérivée des fonctions polynomes à partir de $$(x^n)'=nx^n-1$$"},{"u":"NG/GA13.json","t":"Dérivée de fonction produit","new":false,"id":"GA13","d":"Trouver la dérivée des fonctions polynomes à partir de $$(uv)'=u'v+uv'$$"},{"u":"NK/Ko42.json","t":"Dérivée de fonctions polynomiales","new":false,"id":"Ko42","d":"Trouver la dérivée des fonctions polynomes à partir de $$(x^n)'=nx^n-1$$"},{"u":"NG/GA12.json","t":"Dérivée de fonctions quotient","new":false,"id":"GA12","d":"Trouver la dérivée des fonctions de la forme f(x)/g(x)"}]},"GA2":{"n":"Variations et courbes","e":[]},"GA3":{"n":"Exponentielle","e":[]},"GA4":{"n":"Fonctions trigonométriques","e":[{"u":"NG/GA41.json","t":"Valeurs du cercle trigonométrique","new":false,"id":"GA41","d":"Connaitre les valeurs réelles des angles, éviter pour le moment la saisie par le clavier virtuel de l'application"},{"u":"NG/GA42.json","t":"Valeurs remarquables de trigonométrie","new":false,"id":"GA42","d":"Valeurs exactes de certains angles en radians"}]},"GA5":{"n":"Second degré","e":[{"u":"NG/GA51.json","t":"Calculer delta","new":false,"id":"GA51","d":""},{"u":"NG/GA52.json","t":"Mettre sous forme canonique","new":false,"id":"GA52","d":""}]}}},"GG":{"nom":"Géométrie","chapitres":{"GG1":{"n":"Calcul vectoriel et produit scalaire","e":[]},"GG2":{"n":"Géométrie repérée","e":[]}}},"GS":{"nom":"Probabilités et statistiques","chapitres":{"GS1":{"n":"Probabilités conditionnelles et indépendance","e":[{"u":"NG/GS13.json","t":"Calcul de probabilités (intersection) sur arbre","new":false,"id":"GS13","d":"Calculer la probabilité d'une intersection (arbre)"},{"u":"NG/GS14.json","t":"Calcul de probabilités totales sur arbre","new":false,"id":"GS14","d":"Calculer une probabilité totale"},{"u":"NG/GS11.json","t":"Calcul de probabilités-événement contraire","new":false,"id":"GS11","d":"arbre de probabilités-événement contraire"},{"u":"NG/GS12.json","t":"Lecture de probabilités sur arbre","new":false,"id":"GS12","d":"Lire une probabilité (conditionnelle)"}]},"GS2":{"n":"Variables aléatoires réelles","e":[]}}},"GP":{"nom":"Algorithmique et programmation","chapitres":{"GP1":{"n":"Contenu","e":[]}}},"GE":{"nom":"Vocabulaire ensembliste et logique","chapitres":{"GE1":{"n":"Contenu","e":[]}}}},"activitiesNumber":14},"K":{"nom":"1/T Tech","themes":{"KL":{"nom":"Algèbre","chapitres":{"KL1":{"n":"Suites, modèles discrets","e":[]},"KL2":{"n":"Équations, fonctions polynomes du second degré","e":[]}}},"KA":{"nom":"Analyse","chapitres":{"KA1":{"n":"Dérivation","e":[]},"KA2":{"n":"Variations et courbes","e":[]},"KA5":{"n":"Second degré","e":[]}}},"Ko":{"nom":"Automatismes","chapitres":{"Ko1":{"n":"Calculs numériques","e":[{"u":"N5/5NC7.json","t":"Ajouter des fractions 📣","new":false,"id":"5NC7"},{"u":"NK/Ko13.json","t":"Augmenter ou réduire en pourcentage","new":false,"id":"Ko13"},{"u":"NK/Ko11.json","t":"Lien entre coefficient multiplicateur et pourcentage","new":false,"id":"Ko11"},{"u":"NK/Ko12.json","t":"Produit de fractions à réduire","new":false,"id":"Ko12"}]},"Ko2":{"n":"Calcul littéral","e":[{"u":"NK/Ko21.json","t":"Développer à l'aide de la distributivité","new":false,"id":"Ko21"},{"u":"NK/Ko22.json","t":"Résoudre une équation du premier degré","new":false,"id":"Ko22"}]},"Ko3":{"n":"Calcul de probabilité","e":[{"u":"NG/GS13.json","t":"Calcul de probabilités (intersection) sur arbre","new":false,"id":"GS13","d":"Calculer la probabilité d'une intersection (arbre)"},{"u":"NG/GS12.json","t":"Lecture de probabilités sur arbre","new":false,"id":"GS12","d":"Lire une probabilité (conditionnelle)"}]},"Ko4":{"n":"Fonctions","e":[{"u":"N3/3DD9.json","t":"Calcul d'antécédent par une fonction affine","new":false,"id":"3DD9"},{"u":"N3/3DD8.json","t":"Calcul d'image par une fonction affine","new":false,"id":"3DD8"},{"u":"NK/Ko42.json","t":"Dérivée de fonctions polynomiales","new":false,"id":"Ko42","d":"Trouver la dérivée des fonctions polynomes à partir de $$(x^n)'=nx^n-1$$"},{"u":"N3/3DD6.json","t":"Lectures graphiques d'images et d'antécédents","new":false,"id":"3DD6","d":"pas correction en ligne"},{"u":"N3/3DD7.json","t":"Résolution graphiques d'équations","new":false,"id":"3DD7","d":"pas correction en ligne"},{"u":"NK/Ko41.json","t":"Signe d'une fonction affine","new":false,"id":"Ko41","d":"Dresser le tableau de signe d'une fonction affine"}]}}},"KS":{"nom":"Probabilités et statistiques","chapitres":{"KS1":{"n":"Tableaux de probabilités et probabilités conditionnelles","e":[]},"KS2":{"n":"Variables aléatoires réelles","e":[]},"KS3":{"n":"Arbres de probabilités","e":[]}}}},"activitiesNumber":14},"T":{"nom":"Tale","themes":{"TC":{"nom":"Nombres complexes","chapitres":{"TC1":{"n":"Point de vue algébrique","e":[{"u":"NT/TC11.json","t":"Calculs de base avec un complexe","new":false,"id":"TC11","d":"Conjugué, module, carré, inverse"},{"u":"NT/TC12.json","t":"Calculs simples avec des complexes","new":false,"id":"TC12","d":"Somme, produit, quotient"}]},"TC2":{"n":"Point de vue géométrique","e":[]},"TC3":{"n":"Trigonométrie","e":[]},"TC4":{"n":"Equations polynomiales","e":[]}}},"TA":{"nom":"Arithmétique","chapitres":{"TA1":{"n":"Contenu","e":[]}}},"TM":{"nom":"Graphes et matrices","chapitres":{"TMG":{"n":"Graphes","e":[]},"TMM":{"n":"Matrices","e":[]}}}},"activitiesNumber":2},"activitiesNumber":231};

    // lecture de la bibliotheque
    const library = {
        ordre:{"grille-ecole":["11","10","9","8","7"],"grille-college":["6","5","4","3"],"grille-lycee":["2","G","K","T"]},
        /**
         * Affiche une activité dans l'onglet de paramètres
         * @param {JSON} json description de l'objet
         */
        open:function(json, id){
            let obj = new activity(json, id);
            MM.editedActivity = obj;
            // show tab-content
            let tab = document.querySelector("a[numero$='parameters'].tabs-menu-link");
            MM.resetAllTabs();
            utils.addClass(tab, "is-active");
            document.getElementById("tab-parameters").style.display = "";
            document.getElementById("addToCart").className = "";
            document.getElementById("removeFromCart").className = "hidden";
            obj.display();
        },
        /**
         * Ouvre un fichier de la library
         * @param {String} url adresse du fichier à ouvrir
         */
        load:function(url,id){
            // pour le développement, on peut lire une activité qui n'a pas encore été intégrée dans la bibliothèque
            // en fournissant ?u=id de l'activité.
            fetch("library/"+url+"?v"+MM.version)
                .then(r => r.json())
                .then(body => {
                    let regexp = /\/(.*)\./;
                    url = regexp.exec(url)[1];
                    MM.setHistory("Exercice","u="+url);
                    this.open(body, url);
            })  .catch(e => console.log);
        },
        /**
         * 
         * @param {String} url url du json à récupérer
         */
        loadJSON:async function(url){
            const r = await fetch("library/"+url+"?v"+MM.version);
            if (r.ok === true) return r.json()
            throw new Error('Erreur de chargement de l\'activité')
        },
        /**
         * Récupère les données d'une activité lors d'un import venant du chargement d'un panier préconfiguré.
         * @param {String} url adresse
         * @returns Promesse de chargement du fichier à charger
         */
        import:async function(url){
            const r = await fetch("library/"+url+"?v"+MM.version);
            if(r.ok === true) return r.json()
            throw new Error('Problème de chargement de l\'activité')
        },
        /**
         * Ouvre le fichier de description de toutes les activités disponibles sur MathsMentales
         */
        openContents:function(){
            /*let reader = new XMLHttpRequest();
            reader.onload = function(){
                MM.content = JSON.parse(reader.responseText);
                // remplissage de la grille d'accueil
                MM.createTuiles();
                // création des tuiles des niveaux
                MM.createSearchCheckboxes();
                // check if parameters from URL
                MM.checkURL();
                if(MM.embededIn){
                    window.parent.postMessage({url: window.location.href, ready:"ok"}, MM.embededIn);
                }        
            }
            reader.open("get", "library/content.json?v"+MM.version, true);
            reader.send();*/
            MM.content = content;
                // remplissage de la grille d'accueil
            MM.createTuiles();
            // création des tuiles des niveaux
            MM.createSearchCheckboxes();
            // check if parameters from URL
            MM.checkURL();
            if(MM.embededIn){
                window.parent.postMessage({url: window.location.href, ready:"ok"}, MM.embededIn);
            }        
        },
        /**
         * Affiche la liste des activités provenant d'une recherche ou d'un niveau à afficher (base=true)
         * @param {String} level Niveau à afficher
         * @param {Boolean} base Niveau de base ou pas
         * @returns 
         */
        displayContent:function(level,base=false){
            new Date().getTime(); // date du jour, pour afficher les mises à jour récentes
            if(MM.content === undefined) {console.log("Pas de bibliothèque"); return false;}
            let niveau={nom:"Recherche",themes:{}};
            // Cas d'un code correspondant à MMv1
            if(_.isObject(level)){
                niveau.nom = "Cette activité a été répartie en plusieurs";
                // on cherche les titres
                    for(let exo in level){
                    let found = false; // le titre n'est pas encore trouvé
                    for(let niv in MM.content){
                        if(found) break;
                        if(_.isObject(MM.content[niv])){
                            for(let theme in MM.content[niv].themes){
                                if(found) break;
                                for(let chap in MM.content[niv].themes[theme].chapitres){
                                    if(found) break;
                                    if(MM.content[niv].themes[theme].chapitres[chap].e.length>0){
                                        if(found) break;
                                        for(let i=0;i<MM.content[niv].themes[theme].chapitres[chap].e.length;i++){
                                            if(MM.content[niv].themes[theme].chapitres[chap].e[i].u === level[exo].u){
                                                level[exo].t = MM.content[niv].themes[theme].chapitres[chap].e[i].t;
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
                    "nom":"Cliquer pour ouvrir une activité",
                    "chapitres":{"MM1":{"n":"Cliquer sur Rechercher pour revenir ici","e":level}}
                };
                // cas d'une recherche textuelle
            } else if(!base){
                // recherche d'un terme
                if(level.length<3)return false; // on ne prend pas les mots de moins de 3 lettres
                // niveaux sélectionnés
                const levels = document.querySelectorAll("#searchLevels input[name='searchlevel']:checked");
                const selectedLevels = [];
                levels.forEach((elt)=>{selectedLevels.push(elt.value);});
                // construction du niveau par extraction des données.
                let chaineATrouver = level.toLowerCase().split(" ");
                for(let niv in MM.content){
                    // on ne cherche que dans les niveaux sélectionnés. Si pas de niveau sélectionné, on prend tout.
                    if(selectedLevels.length > 0 && selectedLevels.indexOf(niv)<0) continue;
                    if(_.isObject(MM.content[niv])){ // le niveau contient de chapitres
                        for(let theme in MM.content[niv].themes){
                            for(let chap in MM.content[niv].themes[theme].chapitres){
                                let chapExo=[];
                                for(let exo=0,lene=MM.content[niv].themes[theme].chapitres[chap].e.length;exo<lene;exo++){
                                    let lexo = MM.content[niv].themes[theme].chapitres[chap].e[exo];
                                    let tt = lexo.t;
                                    // on prend les différents éléments
                                    if(chaineATrouver.every(txt=>{
                                        return lexo.t.toLowerCase().indexOf(txt)>-1;
                                    })){
                                        // we find a candidate !!!
                                        chaineATrouver.forEach(txt =>{
                                            let reg = new RegExp(txt,"gi");
                                            tt = tt.replace(reg,function(x){return '<mark data-url="'+lexo.u+'" data-id="'+lexo.id+'" id="rcli'+theme+'-'+chap+'-mark">'+x+'</mark>'});
                                        });
                                        chapExo.push({"u":lexo.u, "t":tt, id:lexo.id});
                                    } else
                                    // recherche dans le code de l'exo
                                    if(chaineATrouver.every(txt=>{
                                        return lexo.u.toLowerCase().indexOf(txt+".")>-1
                                    })){
                                        chapExo.push({"u":lexo.u,"t":lexo.t, id:lexo.id});
                                    } else
                                    // recherche dans les descriptifs
                                    if(lexo.d !== undefined){
                                        if(chaineATrouver.every(txt=>{
                                            return lexo.d.toLowerCase().indexOf(txt)>-1
                                        })){
                                            chapExo.push({"u":lexo.u,"t":lexo.t, id:lexo.id});
                                        }
                                    }
                                }
                                // si chapExo! == [], alors on créée l'arbo
                                if(chapExo.length>0){
                                    if(!niveau.themes[theme]){
                                        niveau.themes[theme]={
                                            nom:MM.content[niv].nom+"/"+MM.content[niv].themes[theme].nom,
                                            chapitres:{}
                                        };
                                    }
                                    niveau.themes[theme].chapitres[chap] = {n:MM.content[niv].themes[theme].chapitres[chap].n,e:chapExo};
                                }
                            }
                        }    
                    } else continue;
                }
                // cas d'un clic sur un niveau
            } else 
                niveau = MM.content[level];
            const eltAffichage = document.getElementById("resultat-chercher");
            let html = "";
            if(!base && !_.isObject(level))
                html = "<h1 class='pointer moins' onclick='utils.deploy(this)'>Résultat de la recherche</h1>";
            else if(!_.isObject(level)){
                html = "<h1 class='pointer moins' onclick='utils.deploy(this)'>Niveau "+niveau["nom"]+" ("+niveau["activitiesNumber"]+" act.)</h1>";
                // on vide le champ de recherche
                document.getElementById("searchinput").value = "";
            }else 
                html = "<h2>Cette activité MathsMentales v1 a été répartie en plusieurs activités</h2>";
            if(base && !_.isObject(level)) // on change l'url level est un niveau de la bibliothèque
                MM.setHistory(niveau["nom"],"n="+level);
            // Affichage et mise en forme des données.
            let itemsNumber = 0;
            for(let i in niveau["themes"]){
                //let first = true;
                let theme = false;
                let htmlt = "";//(first)?"<span>":"";
                htmlt += "<h2 class='pointer moins' id='rch2"+i+"'>"+niveau.themes[i].nom+"</h2>";
                for(let j in niveau["themes"][i]["chapitres"]){
                    let chapitre = false;
                    let htmlc="";//(first)?"":"<span>";
                    htmlc += "<h3 id='rch3"+i+"-"+j+"' class='pointer moins'>"+niveau["themes"][i]["chapitres"][j]["n"]+"</h3>";
                    htmlc += "<ul>";
                    let nbexos = niveau["themes"][i]["chapitres"][j]["e"].length;
                    if(nbexos){
                        itemsNumber += nbexos;
                        theme=true;chapitre=true;
                        for(let k=0,len=nbexos;k<len;k++){
                            let id = niveau["themes"][i]["chapitres"][j]["e"][k].id;
                            let title = niveau["themes"][i]["chapitres"][j]["e"][k]["t"];
                            let url = niveau["themes"][i]["chapitres"][j]["e"][k]["u"];
                            if(niveau["themes"][i]["chapitres"][j]["e"][k]["new"]){
                                htmlc += "<li id='rcli"+i+"-"+j+"-"+k+"' class='new tooltip' data-id='"+id+"' data-url='"+url+"'><input type='checkbox' class='checkitem' value='"+id+"' data-url='"+url+"'>"+title+"<div class='tooltiptext'>"+id+"</div></li>";
                            } else {
                                htmlc += "<li id='rcli"+i+"-"+j+"-"+k+"' class='tooltip' data-id='"+id+"' data-url='"+url+"'><input type='checkbox' class='checkitem' value='"+id+"' data-url='"+url+"'>"+title+"<div class='tooltiptext'>"+id+"</div></li>";
                            }
                        }
                    } else {
                        htmlc += "<li>Pas encore d'exercice</li>";
                    }
                    htmlc += "</ul>";
                    if(chapitre){
                        htmlt+=htmlc;//+((first)?"":"</span>");
                        /*if(first === true){
                            htmlt += "</span>";
                            first = false;
                        }*/
                    }
                }
                if(theme)html+=htmlt;
            }
            eltAffichage.innerHTML = html;
            let target = document.getElementById("tab-chercher");
            target.className = "tabs-content-item";
            // Nombre de colonnes en fonction du contenu
            if(itemsNumber > 40 && utils.pageWidth()>1000) utils.addClass(target,"cols3");
            else if(itemsNumber > 20 && utils.pageWidth()>840) utils.addClass(target, "cols2");
            document.querySelector("#header-menu a[numero='#tab-chercher']").click();
        }
    };

    // lecture des fichiers exercice
    /**
    * Structure d'un fichier exercice
    * {
        'title':'short description',
        'ID':'generatedId',
        'description':'long description',
        'figure': used if graphics
        'options':[{}, {}, ...}], // ojects {"name":"NameOfOption", 'vars':{}, 'question':'pattern'||['pattern0','pattern1',...], answers:'pattern'||[], value:'valuepattern'||[]}
            if one of vars, question, answer or value not defined take it from defaults values on bottom
        'vars':{'a':'pattern', 'b':'pattern', ...}, // pattern can be a list ['value0', 'value1'], or a range "value0_value1", or a list of ranges, Integers, Decimals, letters
        to avoid certains numbers in range, add _^a,b => -5_15_^0,1,-1 will choose integers between -5 and 15 but not 0, 1 or -1
        vars can refer to a previous defined var. You have do prefixed with : like 'b' : ':a+:a' b is the sum of a and a
        'question':'pattern with :a & :b' || [pattern0, pattern1,...] || [[pattern0,pattern1,...], [pattern0,pattern1,...],...]
        'answer':'pattern' || [pattern0, pattern1,...], if question and answer are arrays with same, they are associated 1-1
        'value':'value' or [value0, value1, ...] // accepted values for online answers
    }
    */
    class activity {
        /**
         * Création d'une activité à partir d'un objet javascript ou d'un code d'activité
         * @param {json ou string} obj 
         */
        constructor(obj, id=''){
            if(_.isObject(obj)){
                this.setParams(obj, id);
            } else if(_.isString(obj)){
                this.id = obj;
            }
        }
        /**
         * 
         * @param {Object} obj objet javascript contenant les paramètres d'une activités
         */
        setParams(obj, id){
            this.id = id!==''?id:obj.id||obj.ID;
            this.type = obj.type; // undefined => latex , "text" can include math, with $$ around
            this.figure = obj.figure; // for graphics description
            this.title = obj.title;  // title of de activity
            this.description = obj.description; // long description
            this.speech = obj.speech||false;
            this.vars = obj.vars;
            this.consts = obj.consts;
            this.repeat = obj.repeat||false; // question & answers peuvent être répétées ou pas
            this.options = utils.clone(obj.options)||undefined;
            this.questionPatterns = utils.clone(obj.questionPatterns)||obj.question;
            this.shortQuestionPatterns = utils.clone(obj.shortQuestionPatterns)||obj.shortq||false;
            this.answerPatterns = utils.clone(obj.answerPatterns) || obj.answer;
            this.valuePatterns = utils.clone(obj.valuePatterns) || obj.value;
            this.questions = utils.clone(obj.questions)||[];
            this.audios = utils.clone(obj.audios)||[];
            this.audioQuestionPatterns = utils.clone(obj.audioQuestionPatterns)||obj.audio||false;
            this.audioRead = obj.audioRead||false;// lecture audio si true
            this.audioRepeat = obj.audioRepeat||1;
            this.shortQuestions = utils.clone(obj.shortQuestions)||[];
            this.answers = utils.clone(obj.answers)||[];
            this.samples = utils.clone(obj.samples)||[];// samples of answers, for online answer
            this.values = utils.clone(obj.values)||[];
            this.figures = utils.clone(obj.figures)||[]; // generetad figures paramaters
            this.examplesFigs = {}; // genrated graphics from Class Figure
            this.chosenOptions = utils.clone(obj.chosenOptions)||[]; // options choisies (catégories)
            this.chosenQuestions = utils.clone(obj.chosenQuestions)||{}; // questions parmi les options (sous catégories)
            this.chosenQuestionTypes = utils.clone(obj.chosenQuestionTypes)||[]; // pattern parmi les questions
            this.tempo = utils.clone(obj.tempo) || this.Tempo;
            this.nbq = utils.clone(obj.nbq) || this.nombreQuestions;
            this.getOptionHistory = [];
            this.getPatternHistory = {global:[]};
            this.keys = obj.keys||[];
            this.keyBoards = [];
            this.textSize = obj.textSize||false;
            this.valueType = obj.valueType||false;
            this.consigne = obj.consigne||false;
        }
        initialize(){
            this.questions = [];
            this.shortQuestions = [];
            this.answers = [];
            this.values = [];
            this.figures = [];
            this.audios = [];
            this.examplesFigs = {};
            this.intVarsHistoric = {};
            this.getOptionHistory = [];
            this.getPatternHistory = {global:[]};
            this.keyBoards = [];
        }
        get nombreQuestions(){
            if(document.getElementById("nbq-slider"))
                return Number(document.getElementById("nbq-slider").value);
            else return 10
        }
        set nombreQuestions(value){
            this.nbq = Number(value);
        }
        get Tempo(){
            if(document.getElementById("tempo-slider"))
                return Number(document.getElementById("tempo-slider").value);
            else return 8; 
        }
        set Tempo(value){
            this.tempo = Number(value);
        }
        /**
         * export data to reproduce the choices another time
         */
        export(){
            /*return {
                i:this.id,
                o:this.chosenOptions,
                q:this.chosenQuestions,
                p:this.chosenQuestionTypes,
                t:this.tempo,
                n:this.nbq
            };*/
            return "i="+this.id+
            "~o="+utils.tableToText(this.chosenOptions)+
            "~q="+utils.objToText(this.chosenQuestions)+
            "~p="+this.chosenQuestionTypes+
            "~t="+this.tempo+
            "~n="+this.nbq+
            (this.audioRead===true?"~au="+this.audioRead+"~ar="+this.audioRepeat:"");
        }
        /**
         * import datas et crée l'objet activité à partir d'un json
         * appelé par l'import de l'activité (utilise Promises)
         * 
         * @param (JSON) obj
         * @param (String) id : id de destination de l'activité
         */
        static import(obj, id){
            /* load */
            let regexp = /^(\d{1,2}|T|G|K)/;// le fichier commence par un nombre ou un T pour la terminale
            let level = regexp.exec(obj.i)[0];
            let url = "N"+level+"/"+obj.i+".json";
            return library.import(url).then((json)=>{
                let act = new this(json);
                act.id = obj.i;
                act.chosenOptions = obj.o;
                act.chosenQuestionTypes = obj.p;
                act.chosenQuestions = obj.q;
                act.tempo = obj.t;
                act.nbq = obj.n;
                act.audioRead = (obj.au)?true:false;
                act.audioRepeat = obj.ar?obj.ar:2;
                return [id,act];
            },err=>{utils.debug(err);});
        }
        /**
         * getOption
         * 
         * return uniqueId (Integer)
         * 
         * Si plusieurs options sont disponibles, on va tirer dans les différentes options
         * (qui peuvent avoir été sélectionnées) mélangées pour éviter les répétitions trop suivies
         * Ainsi si les options choisies sont [0,2,5]
         * Les tirages successifs verront se succéder les 3 valeurs avant de les mélanger et
         * de recommencer exemple : [2,0,5] puis [5,2,0] puis [0,5,2]
         * 
         */
        getOption(){
            if(!this.options) return false;
            let ret = 0;
            // si l'historique de piochage est vide, on le remplit des options choisies mélangées
            if(this.getOptionHistory.length === 0){
                if(this.chosenOptions.length === 1){
                    this.getOptionHistory = utils.clone(this.chosenOptions);
                } else if(this.chosenOptions.length > 1){
                    // on pense à cloner la table, sinon celle-ci est touchée par les manipulations suivantes
                    this.getOptionHistory = utils.shuffle(utils.clone(this.chosenOptions));
                } else {
                    // Array.from(Array(integer).keys()) créé un tableau [0,1,2,...integer-1]
                    this.getOptionHistory = utils.shuffle(Array.from(Array(this.options.length).keys()));
                }
            }
            // on prend la première option de l'historique
            ret = this.getOptionHistory[0];
            // on supprime la première option de l'historique
            this.getOptionHistory.shift();
            return ret;
        }
        setMath(content){
            if(this.type === undefined || this.type === "latex"){
                return '<span class="math">'+content+"</span>";
            } else return content;
        }
        /**
         * Display the activity editor
         */
        display(cle="sample"){
            this.initialize();
            document.getElementById("param-title-act").innerHTML = this.id;
            // affichages
            document.getElementById('activityTitle').innerHTML = this.title;
            if(this.speech){
                MM.audioSamples = [];
                document.getElementById("voix").classList.remove("hidden");
                if(this.audioRead){
                    MM.setAudio(1);
                } else {
                    MM.setAudio(0);
                }
            } else {
                document.getElementById("voix").classList.add("hidden");
                this.audioRead = false;
                MM.setAudio(0);
            }
            if(this.description)
                document.getElementById('activityDescription').innerHTML = this.description;
            else
                document.getElementById('activityDescription').innerHTML = "";
            const consigne = document.getElementById('activityConsigne');
            if(this.consigne){
                consigne.innerHTML = '<b>Consigne générale :</b><br><blockquote class="consigneText">'+this.consigne+'</bloquote>';
            } else {
                consigne.innerHTML = '';
            }
            // affichage d'exemple(s)
            let examples = document.getElementById('activityOptions');
            examples.innerHTML = "";
            MM.setSeed(cle);
            if(this.options !== undefined && this.options.length > 0){
                let colors = ['',' red',' orange',' blue', ' green', ' grey',];
                // Ajout de la possibilité de tout cocher ou pas
                let p = utils.create("span",{className:"bold"});
                let hr = utils.create("hr");
                let input = utils.create("input",{type:"checkbox",id:"checkalloptions",className:"checkbox blue",id:"chckallopt"});
                //input.setAttribute("onclick","MM.editedActivity.setOption('all',this.checked)");
                p.appendChild(input);
                p.appendChild(document.createTextNode(" Tout (dé)sélectionner"));
                examples.appendChild(p);
                examples.appendChild(hr);
                let optionsLen = 0;
                // affichage des options
                for(let i=0;i<this.options.length;i++){
                    this.generate(1,i,false);// génère un cas par option (si plusieurs)
                    if(this.audios.length>0){
                        for(let audio of this.audios){
                            if(audio)
                                MM.audioSamples.push(audio);
                        }
                    }
                    let p = utils.create("span");
                    let input = utils.create("input",{id:"o"+i,type:"checkbox",value:i,defaultChecked:(this.chosenOptions.indexOf(i)>-1)?true:false,className:"checkbox"+colors[i%colors.length]});
                    p.appendChild(input);
                    p.innerHTML += " "+this.options[i]["name"] + " :";
                    let ul = document.createElement("ul");
                    if(Array.isArray(this.questions[0])){
                        if(this.figures[0]){
                            let div = utils.create("div");
                            this.examplesFigs[i] = new Figure(utils.clone(this.figures[0]), "fig-ex"+i, div);
                            p.appendChild(div);
                        }
                        for(let jj=0; jj<this.questions[0].length;jj++){
                            optionsLen++;
                            let li = utils.create("li",{className:"tooltip"});
                            let checked = "";
                            if(this.chosenQuestions[i]){
                                if(this.chosenQuestions[i].indexOf(jj)>-1)
                                    checked = "checked";
                            }
                            li.innerHTML = "<input class='checkbox"+colors[i%colors.length]+"' type='checkbox' id='o"+i+"-"+jj+"' value='"+i+"-"+jj+"'"+checked+"> "+this.setMath(this.questions[0][jj]);
                            // answer
                            let span = utils.create("span",{className:"tooltiptext"});
                            if(Array.isArray(this.answers[0]))
                                span.innerHTML = this.setMath(String(this.answers[0][jj]));
                            else {
                                span.innerHTML = this.setMath(String(this.answers[0]));
                            }
                            li.appendChild(span);
                            ul.appendChild(li);
                        }
                    } else {
                        optionsLen++;
                        let li = utils.create("li",{className:"tooltip",innerHTML:this.setMath(this.questions[0])});
                        if(this.figures[0]){
                            this.examplesFigs[i] = new Figure(utils.clone(this.figures[0]), "fig-ex"+i, li);
                        }
                        let span = utils.create("span",{className:"tooltiptext"});
                        if(Array.isArray(this.answers[0]))
                            span.innerHTML = this.setMath(this.answers[0][0]);
                        else
                            span.innerHTML = this.setMath(this.answers[0]);
                        li.appendChild(span);
                        ul.appendChild(li);
                    }
                    p.appendChild(ul);
                    examples.appendChild(p);
                }
                // si plus de 3 options/sous-options, 2 colonnes seulement si panier non affiché.
                if(optionsLen>3 && document.getElementById("phantom").className===""){
                    utils.addClass(document.getElementById("divparams"),"colsx2");
                }
            } else {
                // no option
                this.generate(1);
                if(this.audios.length>0){
                    for(let audio of this.audios){
                        if(audio)
                            MM.audioSamples.push(audio);
                    }
                }
                let p = document.createElement("span");
                let ul = document.createElement("ul");
                if(Array.isArray(this.questions[0])){
                    for(let jj=0; jj<this.questions[0].length;jj++){
                        let li = document.createElement("li");
                        li.className = "tooltip";
                        li.innerHTML = "<input type='checkbox' class='checkbox' value='"+jj+"' onclick='MM.editedActivity.setQuestionType(this.value, this.checked);' ><span class='math'>"+this.questions[0][jj]+"</span>";
                        let span = document.createElement("span");
                        span.className = "tooltiptext";
                        if(Array.isArray(this.answers[0])){
                            span.innerHTML = this.setMath(this.answers[0][jj]);
                        } else {
                            span.innerHTML = this.setMath(this.answers[0]);
                        }
                        li.appendChild(span);
                        ul.appendChild(li);
                    }
                } else {
                    let li = document.createElement("li");
                    li.className = "tooltip";
                    li.innerHTML = this.setMath(this.questions[0]);
                    if(this.figures[0]){
                        this.examplesFigs[0] = new Figure(utils.clone(this.figures[0]), "fig-ex"+0, li);
                    }
                    let span = document.createElement("span");
                    span.className = "tooltiptext";
                    span.innerHTML = this.setMath(this.answers[0]);
                    li.appendChild(span);
                    ul.appendChild(li);
                }
                p.appendChild(ul);
                /*let p1 = document.createElement("p"); // affiche la réponse
                p1.innerHTML = this.setMath(this.answers[0]);
                p.appendChild(p1);*/
                // display answer
                examples.appendChild(p);
            }
            if(!utils.isEmpty(this.examplesFigs)){
                // it has to take his time... 
                setTimeout(()=>{
                    for(let i in this.examplesFigs){
                        this.examplesFigs[i].display();
                    }
                }, 300);
            }
            utils.mathRender();
        }
        replaceQuestionInAnswer(answer,question){
            // check if question as to be written in answer or shortquestion
            // index needed to find the question
            // if :question|5 suppress the last 5 caracters
            // if :question|-5 suppress the 5 firsts caracters
            let regex = /:question(\|(\-{0,1}(\d)+))*/;
            let detection;
            if(_.isArray(answer) && _.isArray(question)){
                // same sizes
                for(const [index,ans] of answer.entries()){
                    if((detection = ans.match(regex)) !== null){
                        if(detection[2]!== undefined){
                            const numberOfCaracteresToDelete = -Number(detection[2]);
                            if (numberOfCaracteresToDelete < 0)
                                answer[index] = ans.replace(regex, question[index].slice(0,numberOfCaracteresToDelete));
                            else 
                                answer[index] = ans.replace(regex, question[index].slice(numberOfCaracteresToDelete));
                        } else
                            answer[index] = ans.replace(regex, question[index]);
                    }
                }
                return answer
            } else if(_.isString(answer) && _.isArray(question)) {
                if((detection = answer.match(regex)) !== null){
                    const listOfAnswers = [];
                    for (const [index,quest] of question.entries()) {
                        if(detection[2]!== undefined){
                            const numberOfCaracteresToDelete = -Number(detection[2]);
                            if (numberOfCaracteresToDelete < 0)
                                listOfAnswers[index] = answer.replace(regex, question[index].slice(0,numberOfCaracteresToDelete));
                            else
                                listOfAnswers[index] = answer.replace(regex, question[index].slice(numberOfCaracteresToDelete));
                        } else
                            listOfAnswers[index] = answer.replace(regex, question[index]);
                    }
                    return listOfAnswers
                } else return answer
            } else if(_.isArray(answer) && _.isString(question)){
                for(const [index,ans] of answer.entries()){
                    if((detection = ans.match(regex)) !== null){
                        if(detection[2]!== undefined) {
                            const numberOfCaracteresToDelete = -Number(detection[2]);
                            if (numberOfCaracteresToDelete < 0)
                                answer[index]=ans.replace(regex, question.slice(0,numberOfCaracteresToDelete));
                            else
                                answer[index]=ans.replace(regex, question.slice(numberOfCaracteresToDelete));
                        } else
                            answer[index]=ans.replace(regex, question);
                    }
                }
                return answer
            } else if(_.isString(answer) && _.isString(question)){
                if((detection = answer.match(regex)) !== null){
                    if(detection[2]!== undefined) {
                        const numberOfCaracteresToDelete = -Number(detection[2]);
                        if (numberOfCaracteresToDelete < 0)
                            answer = answer.replace(regex, question.slice(0,numberOfCaracteresToDelete));
                        else
                            answer = answer.replace(regex, question.slice(numberOfCaracteresToDelete));
                    } else
                        answer = answer.replace(regex, question);
                }
                return answer
            }
            else return answer
        }
        /**
         * getPattern
         * récupère 1 pattern unique
         * @param {integer} option id de l'option dont dépend le pattern
         * 
         * return uniqueId (Integer)
         */
        getPattern(option){
            // l'utilisateur a choisi plusieurs types de questions, on prend l'une des valeurs
            if(this.chosenQuestionTypes.length > 0){
                if(this.getPatternHistory.global.length === 0){
                    this.getPatternHistory.global = utils.shuffle(utils.clone(this.chosenQuestionTypes));
                }
                let ret = this.getPatternHistory.global[0];
                this.getPatternHistory.global.shift();
                return ret;
            }
            // no option mais plusieurs pattern possibles
            if(option === false && Array.isArray(this.questionPatterns)){
                if(this.getPatternHistory.global.length === 0){
                    this.getPatternHistory.global = utils.shuffle(Array.from(Array(this.questionPatterns.length).keys()));
                }
                let ret = this.getPatternHistory.global[0];
                this.getPatternHistory.global.shift();
                return ret;
            }
            if(option === false)return false;
            // if option, patterns ?
            if(!Array.isArray(this.chosenQuestions[option])){
                this.chosenQuestions[option] = [];
            }
            if(!Array.isArray(this.getPatternHistory[option])){
                this.getPatternHistory[option] = [];
            }
            // no pattern chosen : we choose one
            if(this.chosenQuestions[option].length === 0 && Array.isArray(this.options[option].question)){
                if(this.getPatternHistory[option].length === 0){
                    this.getPatternHistory[option] = utils.shuffle(Array.from(Array(this.options[option].question.length).keys()));
                }
                let ret = this.getPatternHistory[option][0];
                this.getPatternHistory[option].shift();
                return ret;
            } else if(this.chosenQuestions[option].length === 0 && !this.options[option].question && Array.isArray(this.questionPatterns)){
                // no question in option, but global question is an array
                if(this.getPatternHistory.global.length === 0){
                    this.getPatternHistory.global = utils.shuffle(Array.from(Array(this.questionPatterns.length).keys()));
                }
                let ret = this.getPatternHistory.global[0];
                this.getPatternHistory.global.shift();
                return ret;
            } else if(this.chosenQuestions[option].length > 0){
                // list of patterns chosen, we pick one
                if(this.getPatternHistory[option].length === 0){
                    this.getPatternHistory[option] = utils.shuffle(utils.clone(this.chosenQuestions[option]));
                }
                let ret = this.getPatternHistory[option][0];
                this.getPatternHistory[option].shift();
                return ret;
            } else return false;
        }
        /**
         * setOption
         * 
         * @param {string} value optionId || optionID-renderID
         * @param {boolean} check check state
         * 
         */
        setOption(value, check){
            var optionId, renderId;
            if(value === "all"){
                this.chosenOptions = [];
                for(let i=0,len=this.options.length;i<len;i++){
                    this.chosenQuestions[i] = [];
                    let lenq = 0;
                    if(typeof this.options[i].question === "object") lenq = this.options[i].question.length;
                    else if( typeof this.questionPatterns === "object")lenq = this.questionPatterns.length;
                    if(check){
                        this.chosenOptions.push(i);
                        for (let j=0; j<lenq; j++){
                            this.chosenQuestions[i].push(j);
                            document.getElementById("o"+i+"-"+j).checked = true;
                        }
                        document.getElementById("o"+i).checked = true;
                    } else {
                        for (let j=0; j<lenq; j++){
                            document.getElementById("o"+i+"-"+j).checked = false;
                        }
                        document.getElementById("o"+i).checked = false;
                    }
                }
            } else if(value.indexOf("-")>-1){
                let Ids = value.split("-");
                optionId = Number(Ids[0]); renderId = Number(Ids[1]);
                if(check){ // checkbox checked
                    document.getElementById("o"+optionId).checked = true;
                    if(this.chosenOptions.indexOf(optionId)<0){
                        this.chosenOptions.push(optionId);
                    }
                    if(!Array.isArray(this.chosenQuestions[optionId])){
                        this.chosenQuestions[optionId] = [renderId];
                    } else if(this.chosenQuestions[optionId].indexOf(renderId)<0){
                        this.chosenQuestions[optionId].push(renderId);
                    }
                } else { // checkbox unchecked
                    if(this.chosenQuestions[optionId].removeValue(renderId)){
                        if(this.chosenQuestions[optionId].length === 0){
                            this.chosenOptions.removeValue(optionId);
                            document.getElementById("o"+optionId).checked = false;
                        }
                    }
                }
            } else {
                optionId = Number(value);
                if(check){ // check all values
                    // not already chosen
                    if(this.chosenOptions.indexOf(optionId)<0){
                        this.chosenOptions.push(optionId);
                    }
                    this.chosenQuestions[optionId] = [];
                    if(typeof this.options[optionId].question === "object"){
                        for (let i=0; i<this.options[optionId].question.length; i++){
                            this.chosenQuestions[optionId].push(i);
                            document.getElementById("o"+optionId+"-"+i).checked = true;
                        }
                    } else if(Array.isArray(this.questionPatterns)){
                        for (let i=0; i<this.questionPatterns.length; i++){
                            this.chosenQuestions[optionId].push(i);
                            document.getElementById("o"+optionId+"-"+i).checked = true;
                        }
                    }
            } else { // uncheck all values
                    if(this.chosenOptions.removeValue(optionId)){
                        if(typeof this.options[optionId].question === "object"){
                            for(let i=0; i<this.options[optionId].question.length; i++){
                                document.getElementById("o"+optionId+"-"+i).checked = false;
                            }
                            delete this.chosenQuestions[optionId];
                        } else if(Array.isArray(this.questionPatterns)){
                            for(let i=0; i<this.questionPatterns.length; i++){
                                document.getElementById("o"+optionId+"-"+i).checked = false;
                            }
                            delete this.chosenQuestions[optionId];
                        }
                    }
                }
            }
            // check or uncheck the allcheckboxes
            let boxes = document.querySelectorAll("#activityOptions input[type=checkbox]");
            let tocheck = true;
            for(const checkbox of boxes){
                if(checkbox.id === "chckallopt")continue;
                if(!checkbox.checked){
                    tocheck = false;
                    break;
                }
            }
            document.getElementById("chckallopt").checked = tocheck;
        }
        /**
         * 
         * @param {integer} value index of the choosen question type
         * @param {boolean} check true if check, false if not
         */
        setQuestionType(value,check){
            let questionId = Number(value);
            if(check){
                // not already chosen
                if(this.chosenQuestionTypes.indexOf(questionId)<0){
                    this.chosenQuestionTypes.push(questionId);
                }
            } else {
                this.chosenQuestionTypes.removeValue(questionId);
            }
        }
        /**
         * 
         * @param {string} chaine : chaine où se trouve la variable 
         * @param {integer} index : 
         */
        replaceVars(chaine, questiontext){
            function onlyVarw(all,p1,p2,decal,chaine){
                return "this.wVars['"+p1+"']"+p2;
            }
            function onlyVarc(all,p1,p2,decal,chaine){
                return "this.cConsts['"+p1+"']"+p2;
            }
            if(typeof chaine === "string"){
                for(const c in this.wVars){
                    let regex = new RegExp(":("+c+")([^\\w\\d])", 'g');
                    chaine = chaine.replace(regex, onlyVarw);
                }
                for(const c in this.cConsts){
                    let regex = new RegExp(":("+c+")([^\\w\\d])", 'g');
                    chaine = chaine.replace(regex, onlyVarc);
                }
                //debug("Chaine à parser", chaine);
                let result = "";
                // doublage des \ caractères d'échapement.
                try { result = eval("`"+chaine.replace(/\\/g,"\\\\")+"`");}
                catch(error){
                    utils.debug(error, "Error replacing vars with "+chaine);
                }
                // return number if this is one
                if(!isNaN(result) && result !== '' && result.indexOf('+')<0){
                    return parseFloat(result);
                } else return result;
            } else if(typeof chaine === "object"){
                // case 1 : it's an array
                if(_.isArray(chaine)){
                    for(let i=0;i<chaine.length;++i){
                        chaine[i] = this.replaceVars(chaine[i],questiontext);
                    }
                    // case 2 : it's an object
                } else for(const i in chaine){
                    chaine[i] = this.replaceVars(chaine[i],questiontext);
                }
                return chaine;
            } else return chaine;
        }
        /**
        * 
        * générateur de questions et réponses
        * 
        * generate this.questions, this.answers and this.values
        * @param {integer} n number of questions to create
        * @param {integer} option id of an option (optional)
        * @param {integer} patt id of question pattern (otional)
        * @param {boolean} sample if true generate a sample question to show before starting slideshow
        * return nothing
        * utilise des variables de travail this.cVars, this.cConsts, this.cFigure, this.cQuestion, this.cShortQ, this.cAnswer, this.cValue qui vont contenir les différentes définitions, this.wVars contient les variables où les variables vont être remplacées par les valeurs générées
        * 
        */
        generate(n=this.nbq, opt, patt, sample){
            // optionNumber is the number of the choosen option
            // patternNumber is the number of the choosen sub option
            let optionNumber, patternNumber, lenQ=false;
            // variables de travail
            this.wVars={};
            let loopProtect = 0, maxLoop = 100;
            // vidage de figures pour éviter les traces.
            this.figures = [];
            // données pour éviter une répétition acharnée des variables entières
            //utils.debug("génération de questions pour "+this.title, n+" questions");
            this.intVarsHistoric = {};
            for(let i=0;i<n;i++){
                this.cFigure = undefined;
                this.ckeyBoard = undefined;
                optionNumber = opt!==undefined?opt:this.getOption();
                patternNumber = patt!==undefined?patt:this.getPattern(optionNumber);
                // cas d'une option qui a été choisie
                if(optionNumber !== false){
                    // set chosen vars
                    if(this.options[optionNumber].vars === undefined){
                        // pas de variable définie dans l'option, on prend les variables globales
                        this.cVars = this.vars;
                    } else if(this.vars !== undefined) {
                        // des variables des deux côtés, on merge
                        this.cVars = Object.assign({}, this.vars, this.options[optionNumber].vars);
                    } else {
                        // pas de variables globales définies.
                        this.cVars = this.options[optionNumber].vars;
                    }
                    if(this.options[optionNumber].consts === undefined) {
                        this.cConsts = utils.clone(this.consts);
                    } else if(this.consts !== undefined){
                        this.cConsts = Object.assign({},utils.clone(this.options[optionNumber].consts),utils.clone(this.options[optionNumber].consts));
                    } else this.cConsts = utils.clone(this.options[optionNumber].consts);
                    if(patternNumber !== false){
                        // la question est définie dans l'option, avec un pattern défini
                        if(this.options[optionNumber].question !== undefined){
                            this.cQuestion = this.options[optionNumber].question[patternNumber];
                            lenQ = this.options[optionNumber].question.length;
                            if(this.options[optionNumber].shortq !== undefined)
                                this.cShortQ = this.options[optionNumber].shortq[patternNumber]||false;
                            if(this.options[optionNumber].audio !== undefined){
                                this.cAudio = this.options[optionNumber].audio[patternNumber]||false;
                            }
                        } else { // elle est définie globalement
                            this.cQuestion = this.questionPatterns[patternNumber];
                            this.cShortQ = this.shortQuestionPatterns[patternNumber]||false;
                            this.cAudio = this.audioQuestionPatterns[patternNumber]||false;
                            lenQ = this.questionPatterns.length;
                        }
                    } else if(this.options[optionNumber].question === undefined){ // question définie globalement
                        this.cQuestion = this.questionPatterns;
                        this.cShortQ = this.shortQuestionPatterns||false;
                        this.cAudio = this.audioQuestionPatterns||false;
                    } else {
                        this.cQuestion = this.options[optionNumber].question; // question définie dans l'option
                        this.cShortQ = this.options[optionNumber].shortq||false;
                        this.cAudio = this.options[optionNumber].audio||false;
                    }
                    // traitement des réponses
                    if(this.options[optionNumber].answer === undefined){ //des réponses sont définies pour l'option
                        this.cAnswer = this.answerPatterns;
                    } else this.cAnswer = this.options[optionNumber].answer; // on prend la réponse définie globalement
                    // traitement des valeurs attendues de réponse en ligne
                    if(this.options[optionNumber].value === undefined){
                        this.cValue = this.valuePatterns?this.valuePatterns:this.cAnswer;
                    } else this.cValue = this.options[optionNumber].value;
                    if(Array.isArray(this.cAnswer) && lenQ){ // on a un tableau de réponses différentes
                        // si autant de types de réponses que de types de questions, raccord 1<->
                        if(this.cAnswer.length === lenQ){
                            this.cAnswer = this.cAnswer[patternNumber]; // same answer index as question index
                        } else { // alea answer
                            this.cAnswer = this.cAnswer[math.aleaInt(0,this.cAnswer.length-1)];
                        }
                        if(this.cValue.length === lenQ){ // same values index as question index
                            this.cValue = this.cValue[patternNumber];
                        }
                    }
                    // traitement des figures (optionnel)
                    if(this.options[optionNumber].figure !== undefined){
                        this.cFigure = utils.clone(this.options[optionNumber].figure);
                    } else if(this.figure !== undefined){
                        this.cFigure = utils.clone(this.figure);
                    }
                    // traitement du clavier (optionnel)
                    if(this.options[optionNumber].keys !== undefined){
                        this.ckeyBoard = this.options[optionNumber].keys;
                    } else if(this.keys !== undefined){
                        this.ckeyBoard = this.keys;
                    }
                } else {
                    this.cVars = this.vars;
                    this.cConsts = utils.clone(this.consts);
                    if(patternNumber!==false){
                        this.cQuestion = this.questionPatterns[patternNumber];
                        this.cShortQ = this.shortQuestionPatterns[patternNumber]||false;
                        this.cAudio = this.audioQuestionPatterns[patternNumber]||false;
                    } else {
                        this.cQuestion = this.questionPatterns;
                        this.cShortQ = this.shortQuestionPatterns||false;
                        this.cAudio = this.audioQuestionPatterns||false;
                    }
                    if(Array.isArray(this.answerPatterns) && this.answerPatterns.length===this.questionPatterns.length){
                        this.cAnswer = this.answerPatterns[patternNumber];
                    } else {
                        this.cAnswer = this.answerPatterns;
                    }
                    this.cValue = this.valuePatterns?this.valuePatterns:this.cAnswer;
                    if(this.figure !== undefined){
                        this.cFigure = utils.clone(this.figure);
                    }
                    if(this.keys !== undefined){
                        this.ckeyBoard = this.keys;
                    }
                }
                // values generation
                for(const name in this.cVars) {
                    this.wVars[name]=this.cVars[name];
                    if(typeof this.wVars[name] === "string" && this.wVars[name].indexOf("\$\{")>-1){
                        // var is defined with other variable, we replace the variable with her value
                        this.wVars[name] = this.replaceVars(this.wVars[name]);
                    }
                    if(typeof this.wVars[name] === "object"){
                        // var is defined with an array of values
                        // we sort one of them
                        // but it can content some vars value
                        this.wVars[name] = this.replaceVars(this.wVars[name][math.aleaInt(0,this.wVars[name].length-1)]);
                    } else if(typeof this.wVars[name] === "string" && this.wVars[name].indexOf("_")>-1){
                        // var is defined with a min-max interval within a string
                        var bornes = this.wVars[name].split("_");
                        if(bornes[0].indexOf("d")>-1) {// float case
                            this.wVars[name] = math.aleaFloat(Number(bornes[0].substring(1)), Number(bornes[1]), Number(bornes[2]), bornes[3], bornes[4]);
                        } else { // integer case
                            // on va faire un historique des données et tourner dessus, sous certaines conditions.
                            // pour cela, on va compter le nombre de valeurs entières possibles pour chaque variable.
                            if(this.intVarsHistoric[name] === undefined){
                                let nbValues = Math.abs(Number(bornes[1])-Number(bornes[0]))+1;
                                let max = Math.max(Number(bornes[0]),Number(bornes[1]));
                                let min = Math.min(Number(bornes[0]),Number(bornes[1]));
                                let primes = [];
                                let objContraintes = false;
                                if(bornes[2]){
                                    if(bornes[2].indexOf("^")>-1){
                                        objContraintes = bornes[2];
                                    }
                                }
                                if(bornes[3]){
                                    if(bornes[3].indexOf("^")>-1){
                                        objContraintes = bornes[3];
                                    }
                                }
                                if(objContraintes){
                                    let liste = objContraintes.substring(1).split(",");
                                    // on liste les nombre premiers à éviter
                                    if(liste.indexOf("prime")>-1){
                                        for(let i=0;i<math.premiers.length;i++){
                                            if(math.premiers[i]<=max && math.premiers[i]>=min){
                                                primes.push(math.premiers[i]);
                                            } else if(math.premiers[i]>max) {
                                                break;
                                            }
                                        }
                                    }
                                    nbValues = nbValues - liste.length - primes.length + (liste.indexOf("prime")>-1?1:0)+(liste.indexOf("&")>-1?1:0);
                                }
                                this.intVarsHistoric[name]=[];
                                this.intVarsHistoric[name+"-length"]=nbValues;
                                //utils.debug(name,nbValues);
                            }
                            let entier;
                            // on tire un entier au hasard tant qu'il n'est pas dans l'historique
                            let protectionLoop = 0;
                            do {
                                entier = math.aleaInt(Number(bornes[0]), Number(bornes[1]), bornes[2], bornes[3]);
                                protectionLoop++;
                                if(protectionLoop>100)break;
                            } while (this.intVarsHistoric[name].indexOf(entier)>-1)// l'index 0 est réservé à la taille du tableau
                            // on stocke dans le tableau
                            this.intVarsHistoric[name].push(entier);
                            // si le tableau est plein, on le vide
                            if(this.intVarsHistoric[name].length >= this.intVarsHistoric[name+"-length"]){
                                //utils.debug("reinitialisation",utils.clone(this.intVarsHistoric[name]));
                                this.intVarsHistoric[name].splice(0);
                            }
                            this.wVars[name] = entier;
                        }
                    }
                }
                // il peut y avoir des variables utilisées dans les constantes. bizarre, mais pratique
                if(this.cConsts !== undefined){
                    this.cConsts = this.replaceVars(this.cConsts);
                    // il faut retraiter les wVars au cas où elles contiennent des constantes
                    this.wVars = this.replaceVars(this.wVars);
                }
                if(!sample){
                // question text generation
                let thequestion = this.replaceVars(utils.clone(this.cQuestion));
                let theaudio = false;
                let thevalue = this.replaceVars(utils.clone(this.cValue));
                let theshort = false;
                if(this.cShortQ){
                    theshort = this.replaceVars(utils.clone(this.cShortQ));
                }
                if(this.cAudio){
                    theaudio = this.replaceVars(utils.clone(this.cAudio));
                }
                loopProtect++;
                // on évite les répétitions
                if(this.questions.indexOf(thequestion)<0 || this.values.indexOf(thevalue)<0 || this.repeat){
                    // cas d'une répétition autorisée, on va éviter que cela arrive quand même dans les 5 précédents.
                    // généralement les VRAI/FAUX, ou 2 réponses possibles seulement.
                    if(typeof this.repeat === "number"){
                        // pour les données binaire, on fera attention à ce que cela ne se répète pas trop de fois d'affilée
                        let last2Values = this.values.slice(-this.repeat);
                        let count = 0;
                        for(let i=0;i<last2Values.length;i++){
                            if(last2Values[i]===thevalue)count++;
                        }
                        // on a 2 occurences de la valeur, on n'en veut pas 3.
                        if(count>=2){
                            i--;
                            if(loopProtect<maxLoop) // attention à pas tourner en rond
                                continue;
                            else { // on tourne en rond, donc on arrête le script
                                utils.debug("To many loops");
                                break;
                            }
                        }
                        // autres cas de répétitions
                    } else if(this.repeat){
                        // on extrait les 5 dernières questions et réponses (il y a des activités avec des questions identiques mais pas les mêmes réponses)
                        let last5Questions = this.questions.slice(-5); // ça marche, même si le tableau a moins de 5 éléménts
                        let last5values = this.values.slice(-5);
                        // on teste la présence de la question dans l'extrait
                        if(last5Questions.indexOf(thequestion)>-1 && last5values.indexOf(thevalue)>-1){
                            // on a trouvé la question dans la série, on ne prend pas et on passe à la génération suivante
                            i--;
                            if(loopProtect<maxLoop) // attention à pas tourner en rond
                                continue;
                            else { // on tourne en rond, donc on arrête le script
                                utils.debug("Pas assez de données pour éviter les répétitions");
                                break;
                            }
                        }
                    }
                    this.questions[i] = thequestion;
                    this.shortQuestions[i] = this.replaceQuestionInAnswer(this.replaceVars(theshort),thequestion);
                    this.audios[i] = theaudio;
                    this.answers[i] = this.replaceQuestionInAnswer(this.replaceVars(utils.clone(this.cAnswer)),thequestion);
                    this.values[i] = thevalue;
                    if(this.cFigure!== undefined){
                        this.figures[i] = {
                            "type":this.cFigure.type,
                            "content":this.replaceVars(utils.clone(this.cFigure.content)),
                            "boundingbox":this.cFigure.boundingbox,
                            "axis":this.cFigure.axis,
                            "grid":this.cFigure.grid?true:false,
                            "keepAspect":(this.cFigure.keepAspect!==undefined)?this.cFigure.keepAspect:true
                        };
                    }
                    if(this.ckeyBoard !== undefined){
                        this.keyBoards[i] = utils.clone(this.ckeyBoard);
                    }
                } else {
                    i--;
                    if(loopProtect<maxLoop) // avoid too many attempts 
                        continue;
                    else {
                        utils.debug("Pas assez de données pour éviter les répétitions");
                        break;
                    }
                }
            } else {
                    this.sample = {
                        question:this.replaceVars(this.cQuestion)
                    };
                    if(this.cShortQ)this.sample.shortQuestion = this.replaceVars(this.cShortQ);
                    this.sample.answer=this.replaceQuestionInAnswer(this.replaceVars(this.cAnswer),this.sample.question);
                    this.sample.audio=this.replaceQuestionInAnswer(this.replaceVars(this.cAudio),this.sample.question);
                    if(this.cFigure !== undefined){
                        this.sample.figure = {
                            "type":this.cFigure.type,
                            "content":this.replaceVars(this.cFigure.content),
                            "boundingbox":this.cFigure.boundingbox,
                            "axis":this.cFigure.axis,
                            "grid":this.cFigure.grid?true:false,
                            "keepAspect":(this.cFigure.keepAspect!==undefined)?this.cFigure.keepAspect:true
                        };
                    }
                }
            }
        }
        generateSample(){
            let option = this.getOption();
            this.generate(1,option,this.getPattern(option),true);
        }
    }

    class cart {
        constructor(id){
            this.id = id;
            this.activities = [];
            this.ordered = true;// les questions sont présentées par groupe d'activité
            this.sortable = undefined;
            this.editedActivityId = -1;
            this.target = [id]; // Indicates where to display the cart.
            this.nbq = 0;
            this.time = 0;
            this.title = "Diapo "+(id+1);
            this.loaded = false;
            this.progress='normal';// type of progress : 'normal', 'thenanswer', 'withanswer'
            this.showAnswerTime=10;
        }
        /**
         * Export datas of the cart to put in an url
         * @returns urlString
         */
        export(){
            let urlString = "&p="+this.id+
                "~t="+encodeURI(this.title)+
                "~c="+this.target+
                "~o="+this.ordered+
                '~d='+this.progress+
                '~at='+this.showAnswerTime;
            for(let i=0,l=this.activities.length;i<l;i++){
                urlString += "_"+this.activities[i].export();
            }
            return urlString;
        }
        /**
         * Importe un panier et toutes ses activités
         * @param {json} obj objet importé d'un exo téléchargé
         * @param {Boolean} start if true, will make start slideshow when all is ready
         */
        import(obj,start=false){
            // à revoir
            this.title = obj.t;
            this.target = obj.c;
            if(obj.o==="false" || !obj.o){
                this.ordered = false;
            } else {
                this.ordered = true;
            }
            if(obj.d === undefined){
                this.progress = 'normal';
                this.showAnswerTime = 2;
            } else {
                this.progress = obj.d;
                this.showAnswerTime = Number(obj.at);
            }
            // activités, utilise Promise
            let activities = [];
            for(const i in obj.a){
                activities.push(activity.import(obj.a[i],i));
            }
            return Promise.all(activities).then(data=>{
                data.forEach((table)=>{
                    this.activities[table[0]] = table[1];
                });
                //MM.editedActivity = this.activities[activities.length-1];
                this.loaded = true;
                // si dans contexte de MM
                if(document.querySelector("#tab-parameters") !== null){
                    // on crée l'affichage du panier chargé dans le contexte de l'interface de config de MM
                    this.display();
                }
                if(start)
                    MM.checkLoadedCarts();

            }).catch(err=>{
                let alert = utils.create(
                    "div",
                    {
                        id:"messageerreur",
                        className:"message",
                        innerHTML:"Impossible de charger tous les exercices :(<br>"+err
                    });
                    const destmessage = document.getElementById("tab-accueil");
                    if (destmessage !== null)
                        destmessage.appendChild(alert);
                    else document.body.appendChild(alert);
                    setTimeout(()=>{
                        let div=document.getElementById('messageerreur');
                        div.parentNode.removeChild(div);
                    },3000);
                });
        }
        /**
         * Ducplicate this object
         */
        duplicate(){
            if(MM.carts.length<4){
                // on ajoute un panier et l'affiche
                MM.addCart();
                // on affecte des copies des activités à ce nouveau panier.
                let cart = MM.carts[MM.carts.length-1];
                for(let i=0;i<this.activities.length;i++){
                    cart.addActivity(this.activities[i]);
                }
                cart.ordered = this.ordered;
                cart.progress = this.progress;
                cart.showAnswerTime = this.showAnswerTime;
                // on affiche le panier.
                cart.display();
            }

        }
        addActivity(obj,nbQuestions=false){
            this.editedActivityId = -1;
            let temp = new activity(obj);
            if(nbQuestions){
                temp.nbq = nbQuestions;
            }
            this.activities.push(temp);
            this.display();
        }
        /**
         * remove an activity from the list
         * @param {integer} index of the activity
         */
        removeActivity(index){
            if(this.editedActivityId === index){this.editedActivityId = -1;}
            else if(this.editedActivityId > index){this.editedActivityId--;}        this.activities.splice(index,1);
            this.display();
        }
        /**
         * Change the order of the activities in conformity to the li order after a move
         * @param {integer} oldIndex old index of the activity
         * @param {integer} newIndex new index of the activity
         */
        exchange(oldIndex, newIndex){
            let indexes = this.activities.getKeys();
            let tempindexes = indexes[oldIndex];
            let temp = this.activities[oldIndex];
            this.activities.splice(oldIndex, 1);
            indexes.splice(oldIndex,1);
            this.activities.splice(newIndex, 0, temp);
            indexes.splice(newIndex, 0, tempindexes);
            this.editedActivityId =  Number(indexes.indexOf(this.editedActivityId));
            this.display();// refresh order
        }
        /**
         * display the cart in his content area
         */
        display(){
            document.querySelector("#cart"+this.id+" h3").innerText=this.title;
            let dom = document.getElementById("cart"+(this.id)+"-list");
            dom.innerHTML = "";
            this.time = 0;
            this.nbq = 0;
            let spanOrder = document.querySelector("#cart"+this.id+" span[data-ordered]");
            if(this.ordered){
                spanOrder.innerHTML = "ordonné";
                spanOrder.dataset["ordered"] = "true";
            } else {
                spanOrder.innerHTML = "mélangé";
                spanOrder.dataset["ordered"] = "false";
            }
            for(let i=0,l=this.activities.length; i<l;i++){
                let li = document.createElement("li");
                let activity = this.activities[i];
                this.time += Number(activity.tempo)*Number(activity.nbq);
                this.nbq += Number(activity.nbq);
                li.innerHTML = "<img src='img/editcart.png' align='left' data-actid='"+i+"' title=\"Editer l'activité\"><img src='img/removefromcart.png' data-actidtoremove='"+i+"' title='Enlever du panier' class='removefromcartbutton'>"+(activity.audioRead==true?activity.title:activity.title.replace("📣 ","")) + " (<span>"+activity.tempo + "</span> s. / <span>"+activity.nbq+"</span> quest.)";
                if(MM.carts[this.id].editedActivityId === i){
                    li.className = "active";
                }
                dom.appendChild(li);
            }
            let spans = document.querySelectorAll("#cart"+(this.id)+" div.totaux span");
            spans[0].innerHTML = math.sToMin(this.time);
            spans[1].innerHTML = this.nbq;
            spans[2].innerHTML = this.target;
            this.setProgress(this.progress);
            // détruit le sortable si déjà effectif.
            if(this.sortable)this.sortable.destroy();
            this.sortable = new Sortable(dom, {
                animation:150,
                ghostClass:'ghost-movement',
                onEnd : evt=>MM.carts[this.id].exchange(evt.oldIndex, evt.newIndex)
            });
        }
        /**
         * 
         * @param {Object} objImage DOM object of the clicked image
         */
        changeOrder(objImage) {
            if(objImage.dataset["ordered"] === "true"){
                objImage.innerHTML = "mélangé";
                //objImage.src = "img/iconfinder_windy_1054934.png";
                objImage.title = "Affichage mélangé des questions";
                objImage.dataset["ordered"] = "false";
                this.ordered = false;
            } else {
                objImage.innerHTML = "ordonné";
                //objImage.src = "img/iconfinder_stack_1054970.png";
                objImage.title = "Affichage dans l'ordre des activités";
                objImage.dataset["ordered"] = "true";
                this.ordered = true;
            }
        }
        changeProgress(objHTML, type) {
            if ((objHTML.dataset['progress'] === 'normal' && type===undefined) || type === 'thenanswer') {
                objHTML.dataset['progress'] = 'thenanswer';
                objHTML.innerHTML = '';
                const container = document.createElement('div');
                container.className = 'numberInputContainer';
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 2;
                input.max = 120;
                input.value = String(this.showAnswerTime);
                input.title = 'Durée d\'affichage\nde la correction\naprès la question';
                input.oninput = (evt)=>{this.showAnswerTime = evt.target.value;};
                input.onclick = (e)=>{e.stopPropagation();};
                container.appendChild(input);
                const unit = document.createElement('span');
                unit.innerText = 's.';
                container.appendChild(unit);
                const closeButton = document.createElement('button');
                closeButton.innerText = '×';
                container.appendChild(closeButton);
                closeButton.onclick = (e) => {e.stopPropagation();this.changeProgress(objHTML, 'withanswer');};
                objHTML.appendChild(container);
                this.progress = 'thenanswer';
            } else if ((objHTML.dataset['progress'] === 'thenanswer' && type === undefined) || type === 'withanswer') {
                objHTML.dataset['progress'] = 'withanswer';
                objHTML.innerText = 'avec';
                objHTML.title = 'Le corrigé est affiché\navec la question';
                this.progress = 'withanswer';
            } else {
                objHTML.dataset['progress'] = 'normal';
                objHTML.innerText = 'sans';
                objHTML.title = 'Le corrigé n\'est pas affiché';
                this.progress = 'normal';
            }
        }
        setProgress(value='normal'){
            const answerChornoContainer = document.getElementById('progress-cart'+(Number(this.id)+1));
            if(answerChornoContainer === null){return}
            if(value === ''){
                this.changeProgress(answerChornoContainer, 'normal');
            } else {
                if (value === 'normal') {
                    this.changeProgress(answerChornoContainer, 'normal');
                }
                else if (value === 'thenanswer') {
                    this.changeProgress(answerChornoContainer, 'thenanswer');
                }
                else if (value === 'withanswer') {
                    this.changeProgress(answerChornoContainer, 'withanswer');
                }
            }
        }
        setShowAnswerTime(value) {
            const answerChronoDisplayValue = document.getElementById('answer-chrono-display-value');
            document.getElementById('answer-chrono-range').value = String(value);
            this.showAnswerTime = Number(value);
            answerChronoDisplayValue.innerText = String(value) + ' s.';
        }
    }

    class steps {
        constructor(obj){
            this.step = 0;
            this.size = Number(obj.size);
            this.container = obj.container;
        }
        addSize(value){
            this.size += Number(value);
        }
        display(){
            let ul = document.createElement("ul");
            ul.className = "steps is-balanced has-gaps is-medium is-horizontal has-content-above has-content-centered";
            for(let i=0;i<this.size;i++){
                let li = utils.create("li",{className:"steps-segment"});
                let span = document.createElement("span");
                if(i === this.step){
                    span.className = "steps-marker is-hollow";
                    span.innerHTML = this.step+1;
                    li.appendChild(span);
                    //let div = utils.create("div",{className:"steps-content",innerHTML:this.step+1});
                    //li.appendChild(div);
                    li.className += " is-active";
                } else {
                    span.className = "steps-marker";
                    li.appendChild(span);
                    /*let div = document.createElement("div");
                    div.innerHTML = "&nbsp;";
                    div.className = "steps-content";
                    li.appendChild(div);*/
                }
                ul.appendChild(li);
            }
            if(this.container.hasChildNodes()){
                let node = this.container.childNodes[0];
                this.container.replaceChild(ul, node);
            } else {
                this.container.appendChild(ul);
            }
        }
        nextStep(){
            this.step++;
            this.display();
            if(this.step >= this.size)
                return false;
            return this.step;
        }
    }

    class Zoom {
        /**
         * @param {Integer} id id unique du zoom
         * @param {String} targetSelector Id de l'élément du DOM à zoomer/dézoomer
         * @param {boolean} normaltarget indicate if targetSelector is the targeted elem (true) or children span
         */
        constructor(id,targetSelector,normaltarget=false,unit="em",value=1,associateTarget=''){
            this.target = targetSelector;
            this.id=id;
            this.value = value;
            this.normaltarget = normaltarget;
            this.unite=unit;
            this.associateTarget=associateTarget;
        }
        changeSize(value,obj=false){
            if(value===10 && obj){
                obj.value = 1;
            }
            let dest = document.querySelectorAll(this.target);// undefined;
            /*if(this.normaltarget)
                dest = document.querySelectorAll(this.target);
            else 
                dest = document.querySelectorAll(this.target+ " > span");*/
            dest.forEach(elt=>elt.style.fontSize = value+this.unite);
        }
        minus(){
            if(this.unite === "em"){
                if(this.value<0.3)return;
                if(this.value<=1)
                    this.value-=0.1;
                else {
                    this.value-=0.5;
                }
            } else if(this.unite === "pt"){
                if(this.value < 7) return;
                if(this.value <= 16)
                    this.value -= 1;
                else this.value -= 2;
            }
            this.changeSize(this.value);
        }
        plus(){
            if(this.unite === "em"){
                if(this.value>=6)return;
                if(this.value<1)this.value+=0.1;
                else this.value +=0.5;
            } else if(this.unite === "pt"){
                if(this.value>28)return;
                if(this.value<16)this.value+=1;
                else this.value += 2;
            }
            this.changeSize(this.value);
        }
        reset(){
            if(this.unite==="em")this.value=1;
            else if(this.unite==="pt")this.value=11;
            this.changeSize(this.value);
        }
        createCursor(){
            let div = utils.create("div",{id:this.id, className:"zoom"});
            let span = utils.create("span",{className:"zoom-A1 pointer","data-what":"reset",innerText:"A", "data-zoom": this.id, "data-assoc":this.associateTarget, ondblclick:this.reset});
            let btn2 = `<button class="zoominbtn" data-what="in" data-zoom="${this.id}"><svg
        data-zoom="${this.id}"
        data-assoc="${this.associateTarget}"
        data-what="in"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
        data-zoom="${this.id}"
        data-assoc="${this.associateTarget}"
        data-what="in"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.3431 15.2426C17.6863 12.8995 17.6863 9.1005 15.3431 6.75736C13 4.41421 9.20101 4.41421 6.85786 6.75736C4.51472 9.1005 4.51472 12.8995 6.85786 15.2426C9.20101 17.5858 13 17.5858 15.3431 15.2426ZM16.7574 5.34315C19.6425 8.22833 19.8633 12.769 17.4195 15.9075C17.4348 15.921 17.4498 15.9351 17.4645 15.9497L21.7071 20.1924C22.0976 20.5829 22.0976 21.2161 21.7071 21.6066C21.3166 21.9971 20.6834 21.9971 20.2929 21.6066L16.0503 17.364C16.0356 17.3493 16.0215 17.3343 16.008 17.319C12.8695 19.7628 8.32883 19.542 5.44365 16.6569C2.31946 13.5327 2.31946 8.46734 5.44365 5.34315C8.56785 2.21895 13.6332 2.21895 16.7574 5.34315ZM10.1005 7H12.1005V10H15.1005V12H12.1005V15H10.1005V12H7.10052V10H10.1005V7Z"
          fill="currentColor"
        />
      </svg></button>`;
          let btn1 = `<button class="zoomoutbtn" data-what="out" data-zoom="${this.id}"><svg
      data-zoom="${this.id}"
      data-assoc="${this.associateTarget}"
      data-what="out"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
      data-zoom="${this.id}"
      data-assoc="${this.associateTarget}"
      data-what="out"
      fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.3431 15.2426C17.6863 12.8995 17.6863 9.1005 15.3431 6.75736C13 4.41421 9.20101 4.41421 6.85786 6.75736C4.51472 9.1005 4.51472 12.8995 6.85786 15.2426C9.20101 17.5858 13 17.5858 15.3431 15.2426ZM16.7574 5.34315C19.6425 8.22833 19.8633 12.769 17.4195 15.9075C17.4348 15.921 17.4498 15.9351 17.4645 15.9497L21.7071 20.1924C22.0976 20.5829 22.0976 21.2161 21.7071 21.6066C21.3166 21.9971 20.6834 21.9971 20.2929 21.6066L16.0503 17.364C16.0356 17.3493 16.0215 17.3343 16.008 17.319C12.8695 19.7628 8.32883 19.542 5.44365 16.6569C2.31946 13.5327 2.31946 8.46734 5.44365 5.34315C8.56785 2.21895 13.6332 2.21895 16.7574 5.34315ZM7.10052 10V12H15.1005V10L7.10052 10Z"
        fill="currentColor"
      />
    </svg></button>`;
            div.innerHTML += btn1;
            div.appendChild(span);
            div.innerHTML += btn2;
            return div;
        }
    }

    // Timer
    class timer {
        constructor(slideid, cartId){
            this.durations = []; 
            this.durationId = 0; // id of the currect duration timer
            this.startTime = 0; // start time of the timer
            this.endTime = 0; // end time of the timer
            this.timeLeft = 0; // remaining time until the end of the timer
            this.percent = 0; // width of the progressbar
            this.id = slideid; // slider's number
            this.cartId = cartId;
            this.answerShowTime = 0;
            this.answerShown = false;
            this.break = false; // break state
            this.timer = false; // interval
            this.ended = false; // indicates if all has ended
        }
        getTimeLeft(){
            this.timeLeft = this.endTime - Date.now();
            this.percent = Math.max(Math.round(100 - this.timeLeft/10/this.durations[this.durationId]), 0);
            this.display();
            if(this.timeLeft <= 0){
                if (MM.carts[this.cartId].progress !== 'thenanswer'){
                    this.stop();
                    MM.nextSlide(this.id);    
                } else {
                    if(!this.answerShown){
                        MM.showTheAnswer(this.id, false);
                        this.answerShown = true;
                    }
                    if (this.timeLeft <= -this.answerShowTime){
                        this.stop();
                        MM.nextSlide(this.id);
                    }
                    this.percent = 100 - Math.max(Math.round(-this.timeLeft/this.answerShowTime*100), 0);
                    this.display();
                }
            }
        }
        addDuration(value){
            this.durations.push(value);
        }
        start(id){
            this.stop(); // just in case;
            if(this.ended) return false;
            this.break = false;
            const btnPause = document.querySelectorAll("#slider"+this.id+" .slider-nav img")[1];
            if(MM.onlineState==="no"){
                btnPause.src="img/slider-pause.png";
                utils.removeClass(btnPause,"blink_me");
            }
            if(id>-1){
                this.timeLeft = this.durations[id]*1000;
                this.durationId = id;
                this.answerShown = false;
                this.answerShowTime = MM.carts[this.cartId].showAnswerTime*1000;
            }
            this.startTime = Date.now();
            this.endTime = this.startTime + this.timeLeft;
            if(this.timer){
                clearInterval(this.timer);
                this.timer = false;
            }
            // si pas de durée, avancement manuel.
            if(this.durations[id]==0){
                const btnPauseTimer = document.querySelector("#btn-timer-pause"+this.id);
                if(btnPauseTimer !== null) btnPauseTimer.classList.add("hidden");
                return;
            } else {
                this.timer = setInterval(this.getTimeLeft.bind(this),50);
            }
        }
        pause(){
            if(this.ended) return false;
            if(this.break){
                this.break = false;
                this.start();
                return false;
            } else {
                this.break = true;
                this.stop();
                let btnPause = document.querySelectorAll("#slider"+this.id+" .slider-nav img")[1];
                btnPause.src="img/slider-play.png";
                utils.addClass(btnPause,"blink_me");
            }
        }
        stop(){
            if(this.timer){
                clearInterval(this.timer);
                this.timer = false;
            }        
        }
        end(){
            this.stop();
            this.ended = true;
            MM.messageEndSlide(this.id,this.durationId);
            setTimeout(MM.endSliders,3000);// if all of the timers ended together
        }
        display(){
            document.querySelector("#slider"+this.id+" progress").value = this.percent;
        }
    }

    /**
     * keyboard interactif
     * Permet d'entrer des données, traitées ensuite par MathLive
     * 
     */
    const keysSVG ={
        enterKey : `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.1495 13.4005C18.2541 13.4005 19.1495 12.5051 19.1495 11.4005V3.40051H21.1495V11.4005C21.1495 13.6097 19.3587 15.4005 17.1495 15.4005H6.84398L10.6286 19.1852L9.21443 20.5994L2.85046 14.2354L9.21443 7.87146L10.6286 9.28567L6.5138 13.4005H17.1495Z" fill="currentColor" />
              </svg>`,
        backspaceKey: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.7427 8.46448L19.1569 9.87869L17.0356 12L19.157 14.1214L17.7428 15.5356L15.6214 13.4142L13.5 15.5355L12.0858 14.1213L14.2072 12L12.0859 9.87878L13.5002 8.46457L15.6214 10.5858L17.7427 8.46448Z"
      fill="currentColor" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.58579 19L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.58579 5H22.5857V19H8.58579ZM9.41421 7L4.41421 12L9.41421 17H20.5857V7H9.41421Z"
      fill="currentColor"
    /></svg>`,
        leftArrowKey : `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
      fill="currentColor" />
  </svg>`,
        rightArrowKey:`<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
      fill="currentColor" />
  </svg>`,
      undoKey:`<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5.33929 4.46777H7.33929V7.02487C8.52931 6.08978 10.0299 5.53207 11.6607 5.53207C15.5267 5.53207 18.6607 8.66608 18.6607 12.5321C18.6607 16.3981 15.5267 19.5321 11.6607 19.5321C9.51025 19.5321 7.58625 18.5623 6.30219 17.0363L7.92151 15.8515C8.83741 16.8825 10.1732 17.5321 11.6607 17.5321C14.4222 17.5321 16.6607 15.2935 16.6607 12.5321C16.6607 9.77065 14.4222 7.53207 11.6607 7.53207C10.5739 7.53207 9.56805 7.87884 8.74779 8.46777L11.3393 8.46777V10.4678H5.33929V4.46777Z"
    fill="currentColor" />
</svg>`,
    redoKey:`<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M13.1459 11.0499L12.9716 9.05752L15.3462 8.84977C14.4471 7.98322 13.2242 7.4503 11.8769 7.4503C9.11547 7.4503 6.87689 9.68888 6.87689 12.4503C6.87689 15.2117 9.11547 17.4503 11.8769 17.4503C13.6977 17.4503 15.2911 16.4771 16.1654 15.0224L18.1682 15.5231C17.0301 17.8487 14.6405 19.4503 11.8769 19.4503C8.0109 19.4503 4.87689 16.3163 4.87689 12.4503C4.87689 8.58431 8.0109 5.4503 11.8769 5.4503C13.8233 5.4503 15.5842 6.24474 16.853 7.52706L16.6078 4.72412L18.6002 4.5498L19.1231 10.527L13.1459 11.0499Z"
  fill="currentColor" />
</svg>`,
    srqt:`<svg width="1em" height="1em" viewBox="0 0 8.467 8.467" xmlns="http://www.w3.org/2000/svg"><path d="M.982 5.817l.506-.595.865 1.66L4.03 1.529h3.15" fill="none" stroke="#000" stroke-width=".529"/></svg>`
    };
     class keyBoard {
        /**
         * 
         * @param {Integer} target champ MathLive à alimenter
         * @param {Array} keys touches à afficher
         * @param {DOMelt} displayContener élément du DOM où ajouter le clavier à afficher
         * @param {String} sliderId Id du slider contenant
         * @param {String} keyboardId Id du keyboard.
         */
        constructor(target,keys,displayContener,sliderId,keyboardId){
            this.keyConf = {
                "÷":["key colored","÷",()=>{this.targetField.executeCommand(["insert","\\div"]);this.focus();}],
                "×":["key colored","×",()=>{this.targetField.executeCommand(["insert","\\times"]);this.focus();}],
                "*":["key colored","×",()=>{this.targetField.executeCommand(["insert","\\times"]);this.focus();}],
                "-":["key colored","−",()=>{this.targetField.executeCommand(["insert","-"]);this.focus();}],
                "(":["key colored","( )",()=>{this.targetField.executeCommand(["insert","(#0)"]);this.focus();}],
                "{":["key colored","{ }",()=>{this.targetField.executeCommand(["insert","{#0;#0}"]);this.focus();}],
                "x²":["key times colored","x²",()=>{this.targetField.executeCommand(["insert","^2"]);this.focus();}],
                "√":["key colored",keysSVG.srqt,()=>{this.targetField.executeCommand(["insert","\\sqrt{#0}"]);this.focus();}],
                "/":["key colored","/",()=>{this.targetField.executeCommand(["insert","\\dfrac{#0}{#0}"]);this.focus();}],
                "pi":["key colored","π",()=>{this.targetField.executeCommand(["insert","\\pi"]);this.focus();}],
                "^":["key colored","x<sup>n</sup>",()=>{this.targetField.executeCommand(["insert","^{#0}",{format:"latex"}]),this.focus();}],
                "10n":["key colored","10<sup>n</sup>",()=>{this.targetField.executeCommand(["insert","10^{#0}",{format:"latex"}]),this.focus();}],
                "h":["key colored","h",()=>{this.targetField.executeCommand(["insert","h"]),this.focus();}],
                "min":["key colored","min",()=>{this.targetField.executeCommand(["insert","min"]),this.focus();}],
                "aigu":["key colored","aig",()=>{this.targetField.executeCommand(["insert","aigu"]),this.focus();}],
                "obtus":["key colored","obt",()=>{this.targetField.executeCommand(["insert","obtus"]),this.focus();}],
                "droit":["key colored","drt",()=>{this.targetField.executeCommand(["insert","droit"]),this.focus();}],
                "o":["key colored","O",()=>{this.targetField.executeCommand(["insert","\\text{oui}"]),this.focus();}],
                "n":["key colored","N",()=>{this.targetField.executeCommand(["insert","\\text{non}"]),this.focus();}],
                "V":["key colored","V",()=>{this.targetField.executeCommand(["insert","\\text{VRAI}"]),this.focus();}],
                "F":["key colored","F",()=>{this.targetField.executeCommand(["insert","\\text{FAUX}"]),this.focus();}],
                "A":["key colored","A",()=>{this.targetField.executeCommand(["insert","\\text{affine non linéaire}"]),this.focus();}],
                "L":["key colored","L",()=>{this.targetField.executeCommand(["insert","\\text{linéaire}"]),this.focus();}],
                "l":["key colored","L",()=>{this.targetField.executeCommand(["insert","\\text{ L}"]),this.focus();}],
                "m":["key colored","m",()=>{this.targetField.executeCommand(["insert","\\text{ m}"]),this.focus();}],
                "g":["key colored","g",()=>{this.targetField.executeCommand(["insert","\\text{ g}"]),this.focus();}],
                "%":["key colored","%",()=>{this.targetField.executeCommand(["insert","\\%"]),this.focus();}]
            };
            this.targetField = target;
            this.sliderId = sliderId;
            try{
                if(keys === undefined){
                    this.defaut();
                } else {
                    this.create(keys);
                }
                if(keyboardId !== undefined){
                    this.content.id = keyboardId;
                }
                displayContener.appendChild(this.content);
            } catch(err){
                console.log("Création de clavier "+keyboardId+"\n"+ err);
            }
        }
        /**
         * give the focus to the target if only one player
         */
        focus(){
            if(MM.slidersNumber<2)
                this.targetField.focus();
        }
        /**
         * 
         * @param {string} className liste des classes de la touche
         * @param {display} display html à afficher sur la touche
         * @param {function} afunction ()=>{} à éxécuter à l'appui de la touche
         */
        addKey(className,display=undefined,afunction){
            if(display === undefined){
                let elm;
                if(className ==="_"){
                    elm = utils.create("div");                
                } else if(["a","b","c","e","i","t",":","u","v","x","y","z","€",";","<",">","=","+","°"].indexOf(className)>-1){
                    elm =utils.create("div",{className:"key times colored",innerHTML:className});
                    if(MM.touched)
                        elm.ontouchend = ()=>{this.targetField.executeCommand(["insert",className]);this.focus();};
                    else
                        elm.onclick = ()=>{this.targetField.executeCommand(["insert",className]);this.focus();};
                } else {
                    elm =utils.create("div",{className:this.keyConf[className][0],innerHTML:this.keyConf[className][1]});
                    if(MM.touched)
                        elm.ontouchend = this.keyConf[className][2];
                    else
                        elm.onclick = this.keyConf[className][2];
                }
                this.content.appendChild(elm);
            } else {
                let elm =utils.create("div",{className:className,innerHTML:display});
                try {
                    if(MM.touched)
                        elm.ontouchend = afunction;
                    else 
                        elm.onclick = afunction;
                } catch (err){
                    console.log("Erreur de création de touche\n"+err);
                }
                this.content.appendChild(elm);
            }
        }
        create(config=[]){
            if(config === "alphabetique"){
                this.content = utils.create("div",{className:"alphakey-base"});
                ["0","1","2","3","4","5","6","7","8","9"].forEach(val=>{
                    this.addKey("key colored",val,()=>{this.targetField.executeCommand(["insert",val]);this.focus();});
                });
                ["A","Z","E","R","T","Y","U","I","O","P"].forEach(val=>{
                    this.addKey("key",val,()=>{this.targetField.executeCommand(["insert",val]);this.focus();});
                });
                ["A","S","D","F","G","H","J","K","L","M"].forEach(val=>{
                    this.addKey("key",val,()=>{this.targetField.executeCommand(["insert",val]);this.focus();});
                });
                ["W","X","C","V","B","N",",","."].forEach(val=>{
                    this.addKey("key",val,()=>{this.targetField.executeCommand(["insert",val]);this.focus();});
                });
                // touche correction
                this.addKey("key colored",keysSVG.backspaceKey, ()=>{this.targetField.executeCommand("deleteBackward");this.focus();});
                // touche enter
                this.addKey("key colored",keysSVG.enterKey,()=>{
                    this.targetField.executeCommand("complete");
                    this.targetField.dispatchEvent(new KeyboardEvent('keyup',{'key':'Enter'}));
                });

            } else {
                this.content = utils.create("div",{className:"numkey-base"});
                /** Première ligne */
                // touches 7 8 et 9
                ["7","8","9"].forEach((val)=>{
                    this.addKey("key",val,()=>{this.targetField.executeCommand(["insert",val]);this.focus();});
                });
                if(config[0]!== undefined)
                    this.addKey(config[0]);
                // touche diviser
                else
                    this.addKey("÷");
                // touche Backspace
                this.addKey("key backspace",keysSVG.backspaceKey, ()=>{this.targetField.executeCommand("deleteBackward");this.focus();});
                // trou
                this.content.appendChild(utils.create("div"));
                // touche parenthèses
                if(config[4]!==undefined)
                    this.addKey(config[4]);
                else this.addKey("(");
                // touche lettre x
                if(config[5]!==undefined)
                    this.addKey(config[5]);
                else this.addKey("x");
                /** Deuxième ligne */
                // touches 7 8 et 9
                ["4","5","6"].forEach((val)=>{
                    this.addKey("key",val,()=>{this.targetField.executeCommand(["insert",val]);this.focus();});
                });
                // touche multiplier
                if(config[1]!==undefined)
                    this.addKey(config[1]);
                else this.addKey("×");
                // touche Enter
                this.addKey("key enter",keysSVG.enterKey,()=>{
                    this.targetField.executeCommand("complete");
                    this.targetField.dispatchEvent(new KeyboardEvent('keyup',{'key':'Enter'}));
                    //MM.nextSlide(this.sliderId);
                });
                // trou
                this.content.appendChild(utils.create("div"));
                // touche carré
                if(config[6]!==undefined)
                    this.addKey(config[6]);
                else this.addKey("x²");
                // touche racine
                if(config[7]!==undefined)
                    this.addKey(config[7]);
                else this.addKey("√");
                /** Troisième ligne */
                // touches 7 8 et 9
                ["1","2","3"].forEach((val)=>{
                    this.addKey("key",val,()=>{this.targetField.executeCommand(["insert",val]);this.focus();});
                });
                // touche moins
                if(config[2]!==undefined)
                    this.addKey(config[2]);
                else this.addKey("-");
                // trou
                this.content.appendChild(utils.create("div"));
                // touche annuler
                this.addKey("key action",keysSVG.undoKey,()=>{this.targetField.executeCommand("undo");this.focus();});
                // touche refaire
                this.addKey("key action",keysSVG.redoKey,()=>{this.targetField.executeCommand("redo");this.focus();});
                /** Quatrième ligne */
                // touches 0 
                this.addKey("key zero","0",()=>{this.targetField.executeCommand(["insert","0"]);this.focus();});
                // touches , 
                this.addKey("key",",",()=>{this.targetField.executeCommand(["insert","."]);this.focus();});
                // touche plus
                if(config[3]!==undefined)
                    this.addKey(config[3]);
                else this.addKey("+");
                // trou
                this.content.appendChild(utils.create("div"));
                // touche flèche gauche
                this.addKey("key action",keysSVG.leftArrowKey,()=>{this.targetField.executeCommand("moveToPreviousChar");this.focus();});
                // touche refaire
                this.addKey("key action",keysSVG.rightArrowKey,()=>{this.targetField.executeCommand("moveToNextChar");this.focus();});
            }
        }
        /**
         * crée un clavier par défaut
         */
        defaut(){
            this.create();
        }
        show(){

        }
        hide(){

        }
    }

    class ficheToPrint {
        constructor(type,cart,orientation='portrait'){
            this.type = type; // type = exos, interro, ceinture
            this.activities = cart.activities;
            if(orientation ==="portrait")
                this.wsheet = window.open("pagetoprint.html","mywindow","location=no,menubar=no,titlebar=no,width=794");
            else
                this.wsheet = window.open("pagetoprintlandscape.html","mywindow","location=no,menubar=no,titlebar=no,width=1123");
            this.wsheet.onload = function(){MM.fiche.populate();};
            this.nbq = undefined;
            if(this.type === "whogots" && this.activities.length === 1){
                this.nbq = document.getElementById("cardsNbValue").value;
            } else if(this.type === "dominos" && this.activities.length === 1){
                this.nbq = document.getElementById("dominosNbValue").value;
            }
        }
        generateQuestions(){
            // vidage des questions/réponses
            for(let index=0;index<this.activities.length;index++){
                this.activities[index].initialize();
            }
            // generate questions and answers
            for(let index=0;index<this.activities.length;index++){
                const activity = this.activities[index];
                activity.generate(this.nbq);
            }
        }
        populate(){
            // taille des caractères
            this.wsheet.document.getElementsByTagName('html')[0].className = "s"+document.getElementById('exTxtSizeValue').value.replace(".","");
            this.content = this.wsheet.document.getElementById("creator-content");
            this.docsheet = this.wsheet.document;
            MM.setSeed();
            if(this.type === "exo"){
                this.createExoSheet();
            } else if(this.type === "exam"){
                this.createInterroSheet();
            } else if(this.type === "ceinture"){
                this.createCeintureSheet();
            } else if(this.type === "flashcard"){
                this.generateQuestions();
                this.createFlashCards();
            } else if(this.type === "whogots"){
                this.generateQuestions();
                this.createWhoGots();
            } else if(this.type === "dominos"){
                this.generateQuestions();
                this.createDominos();
            }
            // render the math
            utils.mathRender(this.wsheet);
            // Pour pouvoir éditer l'activité en cours d'édition si unique
            if(MM.carts.length === 1 && MM.carts[0].activities.length === 1){
                MM.resetCarts();
                MM.editedActivity.display();
            }
        }
        /**
         * 
         * @param {string} type element name
         * @param {string} className
         * @param {string} innerHTML
         */
        create(type,params){
            let elm = this.docsheet.createElement(type);
            for(let i in params){
                elm[i] = params[i];
            }
            return elm;
        }
        createExoSheet(){
            let correction = "end";
            let radios = document.getElementsByName("excorr");
            for (let index = 0; index < radios.length; index++) {
                if(radios[index].checked)
                    correction = radios[index].value;
            }
            let script = this.create("script",{text:`function changecols(dest,nb){document.getElementById(dest).className="grid g"+nb};
        function pagebreak(){let cor=document.querySelectorAll('.correction'),btn=document.getElementById('btn-break');if(cor[0].className==="correction"){for(i=0;i<cor.length;i++){cor[i].className="correction pagebreak";}btn.innerText='Corrigé à la suite des énoncés';}else {for(i=0;i<cor.length;i++){cor[i].className="correction";}btn.innerText='Corrigé sur page séparée';}}
        `});
            this.docsheet.head.appendChild(script);
            if(correction === "end")
                this.docsheet.getElementById('creator-menu').innerHTML += "<button id='btn-break' onclick='pagebreak();'>Corrigé sur page séparée</button>";

            MM.memory = {};

            for(let qty=0;qty<document.getElementById("exQtyValue").value;qty++){
                this.generateQuestions();

                // si plus d'une interro, on introduit un pagebreak
                if(qty>0)
                    this.content.appendChild(this.create("footer"));
            // set elements :
            let aleaCode = this.create("div",{className:"floatright",innerHTML:"Clé : "+MM.seed+" p."+(qty+1)});
            this.content.appendChild(aleaCode);
            // get the titlesheet
            let sheetTitle = document.getElementById("extitle").value||"Fiche d'exercices";
            // set the titlesheet
            let header = this.create("header",{innerHTML:sheetTitle});
            this.content.appendChild(header);
            // get the exercice title
            let exTitle = document.getElementById("exeachex").value||"Exercice n°";
            // get the position of the correction
            let correctionContent = this.create("div",{className:"correction"});
            let titleCorrection = this.create("header", {className:"clearfix",innerHTML:"Correction des exercices"});
            if(correction === "end"){
                correctionContent.appendChild(titleCorrection);
            }
            // in case of figures
            // create a shit because of the li float boxes
            let divclear = this.create("div", {className:"clearfix"});
            for(let i=0;i<this.activities.length;i++){
                const activity = this.activities[i];
                let sectionEnonce = this.create("section",{id:"enonce"+qty+"-"+i,className:"enonce"});
                let sectionCorrection = this.create("section",{id:"corrige"+qty+"-"+i});
                let input = `<input id="nbcols${qty}-${i}" class="noprint fright" value="2" title="Nb de colonnes" type="number" size="2" min="1" max="6" oninput="changecols('ol${qty}-${i}',this.value)">`;
                sectionEnonce.innerHTML += input;
                let h3 = this.create("h3", {className:"exercice-title",innerHTML:exTitle+(i+1)+" : "+activity.title});
                sectionEnonce.appendChild(h3);
                let ol = this.create("ol",{id:"ol"+qty+"-"+i,className:"grid g2"});
                let olCorrection = this.create("ol", {className:"corrige"});
                for(let j=0;j<activity.questions.length;j++){
                    let li = this.create("li",{className:"c3"});
                    let liCorrection = this.create("li");
                    if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                        let span = this.create("span",{className:"math", innerHTML:activity.questions[j]});
                        let spanCorrection = this.create("span", {className:"math",innerHTML:activity.answers[j]});
                        li.appendChild(span);
                        liCorrection.appendChild(spanCorrection);
                    } else {
                        li.innerHTML = activity.questions[j];
                        liCorrection.innerHTML = activity.answers[j];
                    }
                    ol.appendChild(li);
                    // figures
                    if(activity.figures[j] !== undefined){
                        if(i===0 && j=== 0)MM.memory["dest"] = this.wsheet;
                        MM.memory[qty+"-"+"f"+i+"-"+j] = new Figure(utils.clone(activity.figures[j]), qty+"-"+"f"+i+"-"+j,li);
                    }
                    olCorrection.appendChild(liCorrection);
                }
                sectionEnonce.appendChild(ol);
                let ds = divclear.cloneNode(true);
                sectionEnonce.appendChild(ds);
                // affichage de la correction
                if(correction !== "end" ){
                    let hr = this.docsheet.createElement("hr");
                    hr.style.width = "50%";
                    sectionEnonce.appendChild(hr);
                    sectionEnonce.appendChild(olCorrection);
                } else {
                    let h3correction = h3.cloneNode(true);
                    sectionCorrection.appendChild(h3correction);
                    sectionCorrection.appendChild(olCorrection);
                    correctionContent.appendChild(sectionCorrection);
                }
                this.content.appendChild(sectionEnonce);
            }
            if(correctionContent.hasChildNodes){
                this.content.appendChild(correctionContent);
                let ds = divclear.cloneNode(true);
                this.content.appendChild(ds);
            }
        }
            if(!utils.isEmpty(MM.memory)){
                setTimeout(function(){
                    for(const k in MM.memory){
                        if(k!=="dest")
                            MM.memory[k].display(MM.memory["dest"]);
                    }
                }, 300);
            }
        }
        createInterroSheet(){
            // in case of figures
            MM.memory = {};
            let script = this.create("script",{text:`
        function changecols(dest,nb){document.getElementById(dest).className="grid g"+nb};
        function cacheEspaceReponse(){
            document.querySelectorAll(".interro article").forEach(el=>{
                el.classList.toggle("invisible");
            })
        }
        function changeheight(dest,nb){
            let elts = document.querySelectorAll("#"+dest+" .interro article");
            for(let i=0;i<elts.length;i++){
                elts[i].style.height = nb+"pt";
            }
        }
        `});
            this.docsheet.head.appendChild(script);
            this.docsheet.getElementById("creator-menu").innerHTML += `<button onclick="cacheEspaceReponse()">Espcace Reponse</button>`;
            for(let qty=0;qty<document.getElementById("intQtyValue").value;qty++){
                this.generateQuestions();
                // si plus d'une interro, on introduit un pagebreak
                if(qty>0)
                    this.content.appendChild(this.create("footer"));
                // set elements :
                let aleaCode = this.create("div",{className:"floatright",innerHTML:"Clé : "+MM.seed+" p."+(qty+1)});
                this.content.appendChild(aleaCode);
                // get the titlesheet
                let sheetTitle = document.getElementById("inttitle").value||"Interrogation écrite";
                // set the titlesheet
                let header = this.create("header",{innerHTML:sheetTitle});
                this.content.appendChild(header);
                let div1 = this.create("div",{className:"studenName",innerHTML:"Nom, prénom, classe :"});
                this.content.appendChild(div1);
                let div2 = this.create("div",{className:"remarques",innerHTML:"Remarques :"});
                this.content.appendChild(div2);
                // get the exercice title
                let exTitle = document.getElementById("inteachex").value||"Exercice n°";
                let correctionContent = this.create("div",{className:"correction"});
                let titleCorrection = this.create("header", {className:"clearfix",innerHTML:"Correction des exercices"});
                correctionContent.appendChild(titleCorrection);
                let divclear = this.create("div",{className: "clearfix"});
                for (let i = 0; i < this.activities.length; i++) {
                    const activity = this.activities[i];
                    let sectionEnonce = this.create("section",{id:"section"+qty+"-"+i});
                    let sectionCorrection = this.create("section");
                    let input = `<input id="nbcols${qty}-${i}" class="noprint fright" value="30" title="Taille réponse" type="number" size="3" min="10" max="200" oninput="changeheight('ol${qty}-${i}',this.value)">`;
                    sectionEnonce.innerHTML += input;
                    input = `<input id="nbcols${qty}-${i}" class="noprint fright" value="2" title="Nb de colonnes" type="number" size="2" min="1" max="6" oninput="changecols('ol${qty}-${i}',this.value)">`;
                    sectionEnonce.innerHTML += input;
                    let h3 = this.create("h3", {className:"exercice-title",innerHTML:exTitle+(i+1)+" : "+activity.title});
                    sectionEnonce.appendChild(h3);
                    let ol = this.create("ol",{id:"ol"+qty+"-"+i,className:"grid g2"});
                    let olCorrection = this.create("ol", {className:"corrige"});
                    for(let j=0;j<activity.questions.length;j++){
                        let li = this.create("li",{className:"interro"});
                        let liCorrection = this.create("li");
                        if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                            let span = this.create("span",{className:"math", innerHTML:activity.questions[j]});
                            let spanCorrection = this.create("span", {className:"math", innerHTML:activity.answers[j]});
                            li.appendChild(span);
                            liCorrection.appendChild(spanCorrection);
                        } else {
                            li.innerHTML = activity.questions[j];
                            liCorrection.innerHTML = activity.answers[j];
                        }
                        ol.appendChild(li);
                        // figures
                        if(activity.figures[j] !== undefined){
                            if(i===0 && j=== 0)MM.memory["dest"] = this.wsheet;
                            MM.memory["f"+qty+"-"+i+"-"+j] = new Figure(utils.clone(activity.figures[j]), "f"+qty+"-"+i+"-"+j,li);
                        }                
                        let article = this.create("article");
                        li.appendChild(article);
                        olCorrection.appendChild(liCorrection);
                    }
                    sectionEnonce.appendChild(ol);
                    let ds = divclear.cloneNode(true);
                    sectionEnonce.appendChild(ds);
                    let h3correction = h3.cloneNode(true);
                    sectionCorrection.appendChild(h3correction);
                    sectionCorrection.appendChild(olCorrection);
                    correctionContent.appendChild(sectionCorrection);
                    this.content.appendChild(sectionEnonce);
                }
                // insert footer for print page break
                this.content.appendChild(this.create("footer",{innerHTML:"Fin"}));
                // insert correction
                this.content.appendChild(correctionContent);
                let ds = divclear.cloneNode(true);
                this.content.appendChild(ds);
            }
            if(!utils.isEmpty(MM.memory)){
                setTimeout(function(){
                    for(const k in MM.memory){
                        if(k!=="dest")
                            MM.memory[k].display(MM.memory["dest"]);
                    }
                }, 300);
            }
        }
        createCeintureSheet(){
            // in case of figures
            MM.memory = {};
            const nbCeintures = document.getElementById("ceintqtyvalue").value;
            const nbcols = Number(document.getElementById("ceintcolsval").value);
            const nbrows = Number(document.getElementById("ceintrowsval").value);
            const posCorrection = utils.getRadioChecked("ceintcorrpos"); // fin ou apres
            let script = this.create("script",{text:`
        let exercicesColumn = Array(${nbcols}).fill("column");
        let nbcols = ${nbcols};
        /*
        * change la hauteur des cases réponses, et de l'élément question si réponse dessous plutôt que dessus
        */
        function changeHeight(nb){
            let elts = document.querySelectorAll(".ans");
            for(let i=0;i<elts.length;i++){
                elts[i].style.height = nb+"pt";
            }
        }
        /*
        * change la taille des caractères d'une colonne
        */
        function changeFontSize(dest,value){
            // il peut y avoir plusieurs sujets, donc on doit faire un traitement multiple
            let elts = document.querySelectorAll(".question"+dest);
            for(let i=0;i<elts.length;i++){
                elts[i].style.fontSize = value+"pt";
            }
        }
        /*
        * change la taille des caractères de toutes les colonnes
        */
       function changeAllFontSize(value){
            let elts = document.querySelectorAll(".quest");
            for(let i=0;i<elts.length;i++){
                elts[i].style.fontSize = value+"pt";
            }
       }
        /*
        * change la disposition des lignes d'exercices d'une colonne
        * dest : id de la colonne où changer la place des réponses.
        * (String) how : column/columnv pour colonnes en ligne ou verticales
        */
        function setDispositionReponse(dest,how){
            let setr="auto auto",setc="none";
            if(how==="row"){
                setr="none";setc="max-content auto";
            }
            // il peut y avoir plusieurs sujets, donc on doit faire un traitement multiple
            let elts = document.querySelectorAll(".col"+dest);
            for(let i=0;i<elts.length;i++){
                elts[i].style["grid"] = setr+" / "+setc;
            }
        }
        /*
        * Change la disposition de toutes les lignes d'exercices
        */
        function setDispositionReponseAll(how){
            let setr="auto auto",setc="none";
            let selindex = 1;
            if(how==="row"){
                setr="none";setc="max-content auto";
                selindex = 0;
            }
            // on sélectionne toutes colonnes
            let elts = document.querySelectorAll(".ceinture .grid .grid");
            for(let i=0;i<elts.length;i++){
                elts[i].style["grid"] = setr+" / "+setc;
            }
            // on met les valeurs des autres input à cette valeur
            let inputs = document.querySelectorAll(".selectpos");
            for(let i=0;i<inputs.length;i++){
                inputs[i].selectedIndex = selindex;
            }
        }
        /*
        * Change la largeur des colonnes
        */
        function changeWidth(dest,nb){
            let elts = document.querySelectorAll(".ceinture-content");
            if(elts[0].style["grid-template-columns"].indexOf("auto")>-1){
                for(let i=0;i<elts.length;i++){
                    let stylecols = elts[i].style["grid-template-columns"].split(" ");
                    let style = Array(stylecols.length).fill("1fr").join(" ");
                    elts[i].style["grid-template-columns"] = style;
                }
            }
            for(let i=0;i<elts.length;i++){
                let style = elts[i].style["grid-template-columns"];
                let stylecols = style.split(" ");
                stylecols[dest-1] = nb+"fr";
                style = stylecols.join(" ");
                elts[i].style["grid-template-columns"] = style;
            }
        }
        /*
        * change la couleur du fond des réponses
        * what : bg (background) || bd (border)
        */
       function changeColor(hexa,what){
           let elts = document.querySelectorAll(".ans");
           let styleAttr = "background-color";
           let styleVal = hexa;
           if(what==="bd"){
                styleAttr="border";
                if(hexa==="none")styleVal = "none";
                else styleVal="1pt solid "+hexa;
           }
           for(let i=0;i<elts.length;i++){
               elts[i].style[styleAttr] = styleVal;
           }
       }
       /** 
        * Change la couleur du cadre des réponses
        *
        */
       function changeBorder(bool){
        if(bool){
            changeColor(document.getElementById("colorpicker2").value,'bd');
        } else {
            changeColor('none','bd');
        }
       }
       /**
        * Change l'ordre d'une colonne 
        * (Integer) colId : numéro entier de la colonne (commence par 1)
        */
       function changeOrder(colId){
           // on récupère l'ensemble des tableaux
            let tableaux = document.querySelectorAll(".ceinture-content");
            for(let i=0;i<tableaux.length;i++){
                // on récupère les celulles de la colonne choisie:
                let cels = tableaux[i].querySelectorAll(".col"+colId);
                // on crée un tableau des clés de lignes
                let cles = [...Array(cels.length)].map((a,b)=>b+1);
                // on mélange les clés
                cles.sort(()=>Math.random()-0.5);
                // on met les celulles dans l'ordre
                for(let j=0;j<cels.length;j++){
                    cels[j].style["grid-row"]=cles[j];
                }
            }
       }
       /**
        * Affiche ou pas les figures dans la colonne
        * */
       function displayFigures(idcol){
           let btn, elts;
           if(idcol === 'all'){
                btn = document.getElementById('btndisplayfig');
                elts = document.querySelectorAll('.quest');
                idcol = "Toutes";
           } else {
                btn = document.getElementById('btndisplayfig'+idcol);
                elts = document.querySelectorAll('.question'+idcol);
           }
           if(btn.innerHTML === idcol+" on"){
                elts.forEach(el=>{
                    el.classList.add("nofig");
                })
                btn.innerHTML = idcol+" off";
            } else {
                elts.forEach(el=>{
                    el.classList.remove("nofig");
                })
                btn.innerHTML = idcol+" on";
            }
       }
       /*
       * toggle l'affichage de l'espace d'évaluation de la ceinture
       */
       function displayEval(){
        let btn=document.getElementById("btndisplayeval"), headers = document.querySelectorAll(".ceinture-header");
        if (btn.innerHTML ==="Évaluation"){
            btn.innerHTML = "no Éval";
            headers.forEach(el=>{
                el.classList.add("evaluation")
            })
        } else {
            btn.innerHTML ="Évaluation";
            headers.forEach(el=>{
                el.classList.remove("evaluation")
            })
        }
       }
       `});
            this.docsheet.head.appendChild(script);
            let headnoprint = utils.create("section",{className:"noprint",id:"headnoprint"});
            headnoprint.innerHTML += "<span>Lignes :</span>"+`<input id="inputheight" value="20" title="Hauteur en pt" type="number" size="3" min="10" max="200" oninput="changeHeight(this.value)">`;
            headnoprint.innerHTML += "<span>Texte</span>";
            for(let i=1;i<=nbcols;i++){
                let input = `<input id="fsize${i}" value="10" title="Taille énoncé colonne ${i}" type="number" size="3" min="8" max="16" step="0.5" oninput="changeFontSize('${i}',this.value)">`;
                headnoprint.innerHTML += input;
            }
            headnoprint.innerHTML += "Tous "+`<input id="fsize" value="10" title="Taille énoncé toutes colonnes" type="number" size="3" min="8" max="16" step="0.5" oninput="changeAllFontSize(this.value)"> `;
            headnoprint.innerHTML += "<span>Largeur colonne</span>";
            for(let i=1;i<=nbcols;i++){
                let input = `<input id="asize${i}" value="1" title="Taille colonne ${i}" type="number" size="3" min="0.5" max="4" step="0.1" oninput="changeWidth(${i},this.value)">`;
                headnoprint.innerHTML += input;
            }
            headnoprint.appendChild(utils.create("br"));
            headnoprint.innerHTML += "<strong>Réponse</strong> ";
            for(let i=1;i<=nbcols;i++){
                let input = `<select class="selectpos" oninput="setDispositionReponse(${i},this.value)">
            <option value="row">à côté</option>
            <option value="column">dessous</option>
            </select>`;
                headnoprint.innerHTML += input;
            }
            headnoprint.innerHTML += `<span>Tous</span> 
        <select oninput="setDispositionReponseAll(this.value)">
            <option value="row">à côté</option>
            <option value="column">dessous</option>
            </select>`;
            headnoprint.innerHTML+= ` Coul <input type="color" id="colorpicker" oninput="changeColor(this.value,'bg')" value="#ECECEC"> Cadre avec <input type="checkbox" value="true" onclick="changeBorder(this.checked)"> <input type="color" value="#111111" id="colorpicker2" oninput="changeColor(this.value,'bd')" size="8">`;
            headnoprint.innerHTML += `<br>Mélanger la colonne : `;
            for(let i=1;i<=nbcols;i++){
                let bouton = `<button onclick="changeOrder(${i})">${i}</button> `;
                headnoprint.innerHTML += bouton;
            }
            headnoprint.innerHTML += " Figure : ";
            for(let i=1;i<=nbcols;i++){
                let bouton = `<button onclick="displayFigures(${i})" id="btndisplayfig${i}">${i} on</button> `;
                headnoprint.innerHTML += bouton;
            }
            headnoprint.innerHTML += `<button onclick="displayFigures('all')" id="btndisplayfig">Toutes on</button> `;
            headnoprint.innerHTML += `<button onclick="displayEval()" id="btndisplayeval">sans Éval.</button>`;
            this.content.appendChild(headnoprint);
            let correction;
            if(posCorrection === "fin"){
                correction = utils.create("div",{id:"correction",className:"pagebreak"});
                correction.appendChild(utils.create("div",{innerHTML:"Correction"}));
            }
            // on crée autant de ceintures que demandées      
            for(let qty=0;qty<nbCeintures;qty++){
                // un conteneur pour la ceinture
                let ceinture = utils.create("div",{className:"ceinture"});
                // un conteneur pour le corrigé
                let corrige = utils.create("div",{className:"ceintCorrige corrige"});
                this.generateQuestions();
                let header = utils.create("div",{className:"ceinture-header evaluation"});
                // Entêtes
                let bloc1 = utils.create("div",{className:"border-black ceinture-titre", innerHTML:document.getElementById("ceinttitle").value||"Ceinture"});
                let bloc2 = utils.create("div",{className:"border-black", innerHTML:"NOM :<br>Classe :"});
                let cleseed = "";
                if(document.getElementById("ceintprintToEnonce").checked)cleseed = "Clé : "+MM.seed+"<br> ";
                let bloc3 = this.create("div",{className:"border-black", innerHTML:cleseed+"grille "+(qty+1)});
                let blocevaluation = this.create("div",{className:"border-black evaluation",innerHTML:"□ Validée<br>□ non Validée"});
                header.appendChild(bloc1);
                header.appendChild(bloc2);
                header.appendChild(blocevaluation);
                header.appendChild(bloc3);
                ceinture.appendChild(header);
                // entête du corrigé
                if(document.getElementById("ceintprintToCorrige").checked)cleseed = "Clé : "+MM.seed+" / ";
                else cleseed="";
                corrige.appendChild(utils.create("div",{innerHTML:(document.getElementById("ceinttitle").value||"Ceinture")+"<br>"+cleseed+"grille : "+(qty+1), className:"border-black"}));
                // un repère de colonne
                let colsid=0;
                // le css directement dans le DOM pour pouvoir le modifier ensuite
                let stylecols = Array(nbcols).fill("auto").join(" ");
                let stylerows = Array(nbrows).fill("auto").join(" ");
                const divColonnes = utils.create("div",{className:"ceinture-content grid",style:"grid-template-columns:"+stylecols+";grid-template-rows:"+(stylerows+1)});
                let divColsCorrige = utils.create("div",{className:"ceinture-corrige grid",style:"grid-template-columns:"+stylecols+";grid-template-rows:"+stylerows});
                // conteners corrections et enoncés (objet de tableaux)
                let divCorr={},cols={};
                let nbq = 0;
                for(let i=0;i<this.activities.length;i++){
                    const activity = this.activities[i];
                    for(let j=0;j<activity.questions.length;j++){
                        if(nbq%nbrows === 0){
                            // nouvelle colonne
                            colsid++;
                            cols[colsid]=[];
                            // on donne  à la colonne une classe pour pouvoir modifier des choses dedans.
                            divCorr[colsid]=[];
                            let titre = document.getElementById("ceinttitlecol"+colsid).value;
                            if(titre!==""){
                                cols[colsid].push(utils.create("div",{innerHTML:titre,className:"ceinture-titre-colonne border-black"}));
                            }
                        }
                        nbq++;
                        let ligne = utils.create("div",{className:"grid border-black col"+colsid,style:"grid-column:"+colsid});
                        let ligneCorr = utils.create("div",{className:"grid border-black"});
                        if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                            let divq = utils.create("div",{className:"question"+colsid+" quest"});
                            let span = utils.create("span",{className:"math", innerHTML:activity.shortQuestions[j]||activity.questions[j]});
                            divq.appendChild(span);
                            ligne.appendChild(divq);                        
                        } else {
                            ligne.appendChild(utils.create("div",{innerHTML:activity.shortQuestions[j]||activity.questions[j],className:"question"+colsid+" quest"}));
                        }
                        let value = activity.values[j];
                        if(Array.isArray(value))value=value[0];
                        let spanc = utils.create("span", {className:"math", innerHTML:value});
                        ligneCorr.appendChild(spanc);
                        divCorr[colsid].push(ligneCorr);
                        let divans = utils.create("div",{className:"bg-grey ans answer"+colsid,style:"height:20pt;"});
                        ligne.appendChild(divans);
                        //divs[colsid-1].appendChild(ligne);
                        cols[colsid].push(ligne);
                        if(nbq%nbrows === 0 && nbrows>0){
                            let pied = document.getElementById("ceintpiedcol").value;
                            if(pied !== ""){
                                cols[colsid].push(utils.create("div",{innerHTML:pied,className:"ceinture-pied-colonne border-black"}));
                            }
                        }
                    }
                }
                // on insère les enfants
                for(let i=0;i<cols[1].length;i++){
                    for(let j=1;j<=nbcols;j++){
                        divColonnes.appendChild(cols[j][i]);
                    }
                }
                ceinture.appendChild(divColonnes);
                this.content.appendChild(ceinture);

                for(let i=0;i<divCorr[1].length;i++){
                    for(let j=1;j<=nbcols;j++){
                        divColsCorrige.appendChild(divCorr[j][i]);
                    }
                }
                corrige.appendChild(divColsCorrige);
                if(posCorrection === "fin")
                    correction.appendChild(corrige);
                else {
                    this.content.appendChild(corrige);
                }
            }
            //this.content.appendChild(utils.create("div",{className:"footer"}));
            // on ajoute la correction à la fin.
            if(posCorrection ==="fin")
                this.content.appendChild(correction);
        }
        createFlashCards(){
            // in case of figures
            MM.memory = {};
            let script = this.create("script",{text:`
        function changeheight(nb){
            let elts = document.querySelectorAll(".card");
            for(let i=0;i<elts.length;i++){
                elts[i].style.height = nb+"mm";
            }
        }
        `});
            this.docsheet.head.appendChild(script);
            // set elements :
            let aleaCode = this.create("div",{className:"floatright",innerHTML:"Clé : "+MM.seed});
            this.content.appendChild(aleaCode);
            let input = `<input class="noprint fright" value="55" title="Taille cartes" type="number" size="3" min="30" max="180" oninput="changeheight(this.value)">`;
            this.content.innerHTML += input;
            // get the titlesheet
            let sheetTitle = document.getElementById("FCtitle").value||"Cartes Flash";
            // set the titlesheet
            let header = this.create("header",{innerHTML:sheetTitle});
            this.content.appendChild(header);
            let sectionCartes = this.create("section",{className:"flash-section grid g2"});
            for (let i = 0; i < this.activities.length; i++) {
                const activity = this.activities[i];
                for(let j=0;j<activity.questions.length;j++){
                    let artQuestion = this.create("article",{className:"flash-question card"});
                    let divq = this.create("div");
                    let artCorrection = this.create("article",{className:"flash-reponse card"});
                    let divr = this.create("div");
                    if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                        let span = this.create("span",{className:"math", innerHTML:activity.questions[j]});
                        let spanCorrection = this.create("span", {className:"math", innerHTML:activity.answers[j]});
                        divq.appendChild(span);
                        divr.appendChild(spanCorrection);
                    } else {
                        divq.innerHTML = activity.questions[j];
                        divr.innerHTML = activity.answers[j];
                    }
                    artQuestion.appendChild(divq);
                    artCorrection.appendChild(divr);
                    sectionCartes.appendChild(artQuestion);
                    // figures
                    if(activity.figures[j] !== undefined){
                        if(i===0 && j=== 0)MM.memory["dest"] = this.wsheet;
                        MM.memory["f"+i+"-"+j] = new Figure(utils.clone(activity.figures[j]), "f"+i+"-"+j, divq);
                    }
                    sectionCartes.appendChild(artCorrection);
                }
            }
            this.content.appendChild(sectionCartes);
            if(!utils.isEmpty(MM.memory)){
                setTimeout(function(){
                    for(const k in MM.memory){
                        if(k!=="dest")
                            MM.memory[k].display(MM.memory["dest"]);
                    }
                }, 300);
            }
        }
        createWhoGots(){
            // in case of figures
            MM.memory = {};
            let script = this.create("script",{text:`
        function changeheight(nb){
            let elts = document.querySelectorAll(".whogot-carte");
            for(let i=0;i<elts.length;i++){
                elts[i].style.height = nb+"mm";
            }
        }
        function changewidth(nb){
            let elts = document.querySelectorAll(".whogot-carte");
            for(let i=0;i<elts.length;i++){
                elts[i].style.width = nb+"mm";
            }
        }
        `});
            let WGquestion = document.getElementById("WGquestion").value?document.getElementById("WGquestion").value:"Qui a ?";
            let WGaffirmation = document.getElementById("WGaffirmation").value?document.getElementById("WGaffirmation").value:"J'ai ...";
            this.docsheet.head.appendChild(script);
            // set elements :
            let aleaCode = this.create("div",{className:"floatright",innerHTML:"Clé : "+MM.seed});
            this.content.appendChild(aleaCode);
            let input = `<input class="noprint fright" value="55" title="Hauteur cartes" type="number" size="3" min="30" max="180" oninput="changeheight(this.value)">
        <input class="noprint fright" value="55" title="Largeur cartes" type="number" size="3" min="30" max="180" oninput="changewidth(this.value)">`;
            this.content.innerHTML += input;
            // get the titlesheet
            let sheetTitle = document.getElementById("FCtitle").value||"J'ai / Qui a ?";
            // set the titlesheet
            let header = this.create("header",{innerHTML:sheetTitle});
            this.content.appendChild(header);
            let sectionCartes = this.create("section",{className:"whogot-section"});
            //Nombre de cartes
            let nbOfCards = 0;
            for (let i = 0; i < this.activities.length; i++) {
                const activity = this.activities[i];
                for(let j=0;j<activity.questions.length;j++){
                    nbOfCards++;
                    let carte = this.create("article", {className:"whogot-carte",id:"carte"+nbOfCards});
                    let artQuestion = this.create("article",{className:"whogot-question",innerHTML:"<h3>"+WGquestion+"</h3>"});
                    let divq = this.create("div");
                    if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                        let span = this.create("span",{className:"math", innerHTML:activity.questions[j]});
                        divq.appendChild(span);
                    } else {
                        divq.innerHTML = activity.questions[j];
                    }
                    artQuestion.appendChild(divq);
                    carte.appendChild(artQuestion);
                    // figures
                    if(activity.figures[j] !== undefined){
                        if(MM.memory["dest"]===undefined)MM.memory["dest"] = this.wsheet;
                        MM.memory["f"+nbOfCards] = new Figure(utils.clone(activity.figures[j]), "f"+nbOfCards, divq);
                    }
                    sectionCartes.appendChild(carte);
                }
            }
            this.content.appendChild(sectionCartes);
            // numéro de la carte où placer la réponse, décalé de 1 par rapport aux questions
            let numAnswer = 1;
            for (let i = 0; i < this.activities.length; i++) {
                const activity = this.activities[i];
                for(let j=0;j<activity.questions.length;j++){
                    numAnswer++;
                    let carte = this.docsheet.getElementById("carte"+(numAnswer>nbOfCards?1:numAnswer));
                    let artCorrection = this.create("article",{className:"whogot-reponse",innerHTML:"<h3>"+WGaffirmation+"</h3"});
                    let divr = this.create("div");
                    let answer = activity.values[j];
                    if(_.isArray(answer))answer = answer[0];
                    if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                        let spanCorrection = this.create("span", {className:"math", innerHTML:answer});
                        divr.appendChild(spanCorrection);
                    } else {
                        divr.innerHTML = "<span class='math'>"+answer+"</span>";
                    }
                    artCorrection.appendChild(divr);
                    let hr = this.create("hr");
                    carte.prepend(hr);
                    carte.prepend(artCorrection);
                }
            }
            if(!utils.isEmpty(MM.memory)){
                setTimeout(function(){
                    for(const k in MM.memory){
                        if(k!=="dest")
                            MM.memory[k].display(MM.memory["dest"]);
                    }
                }, 300);
            }
        }
        createDominos(){
            // in case of figures
            MM.memory = {};
            let script = this.create("script",{text:`
        function changeheight(nb){
            let elts = document.querySelectorAll(".dominos-carte");
            for(let i=0;i<elts.length;i++){
                elts[i].style.height = nb+"mm";
            }
        }
        function changewidth(nb){
            let elts = document.querySelectorAll(".dominos-carte");
            for(let i=0;i<elts.length;i++){
                elts[i].style.width = nb+"mm";
            }
        }
        function melanger(){
            let content = document.querySelector(".dominos-section");
            // on récupère l'ensemble des dominos 
            let tableau = document.querySelectorAll(".dominos-carte");
            // on crée un tableau des clés de lignes
            let cles = [...Array(tableau.length)].map((a,b)=>b);
            // on mélange les clés
            cles.sort(()=>Math.random()-0.5);
            // on met les celulles dans l'ordre mélangé
            for(let j=0,l=cles.length;j<l;j++){
                content.removeChild(tableau[cles[j]]);
                content.appendChild(tableau[cles[j]]);
            }
        }
        `});
            this.docsheet.head.appendChild(script);
            // set elements :
            let aleaCode = this.create("div",{className:"floatright",innerHTML:"Clé : "+MM.seed});
            this.content.appendChild(aleaCode);
            let input = `<div class="noprint fright"><button onclick="melanger()">Mélanger l'ordre</button> Largeur : 
        <input value="60" title="Largeur domino" type="number" size="3" min="60" max="180" oninput="changewidth(this.value)">
        Hauteur :
        <input value="25" title="Hauteur domino" type="number" size="3" min="25" max="180" oninput="changeheight(this.value)">
        </div>`;
            this.content.innerHTML += input;
            // get the titlesheet
            let sheetTitle = "<h1>Dominos</h1>";
            // set the titlesheet
            let header = this.create("header",{innerHTML:sheetTitle});
            this.content.appendChild(header);
            let sectionCartes = this.create("section",{className:"dominos-section"});
            let nbOfCards=0;
            for (let i = 0; i < this.activities.length; i++) {
                const activity = this.activities[i];
                for(let j=0;j<activity.questions.length;j++){
                    nbOfCards++;
                    let carte = this.create("article", {className:"dominos-carte",id:"domino"+nbOfCards});
                    let hr = this.create("div",{className:"barrev",innerHTML:"&nbsp;"});
                    carte.appendChild(hr);
                    let artQuestion = this.create("article",{className:"dominos-question"});
                    let divq = this.create("div");
                    if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                        let span = this.create("span",{className:"math", innerHTML:activity.questions[j]});
                        divq.appendChild(span);
                    } else {
                        divq.innerHTML = activity.questions[j];
                    }
                    artQuestion.appendChild(divq);
                    carte.appendChild(artQuestion);
                    // figures
                    if(activity.figures[j] !== undefined){
                        if(MM.memory["dest"]===undefined)MM.memory["dest"] = this.wsheet;
                        MM.memory["f"+nbOfCards] = new Figure(utils.clone(activity.figures[j]), "f"+nbOfCards, divq);
                    }
                    sectionCartes.appendChild(carte);
                }
            }
            this.content.appendChild(sectionCartes);
            let numAnswer=1;
            for (let i = 0; i < this.activities.length; i++) {
                const activity = this.activities[i];
                for(let j=0;j<activity.questions.length;j++){
                    numAnswer++;
                    let carte = this.docsheet.getElementById("domino"+(numAnswer>nbOfCards?1:numAnswer));
                    let artCorrection = this.create("article",{className:"dominos-reponse"});
                    let divr = this.create("div");
                    let answer = activity.values[j];
                    if(_.isArray(answer))answer = answer[0];
                    if(activity.type === "latex" || activity.type === "" || activity.type === undefined){
                        let spanCorrection = this.create("span", {className:"math", innerHTML:answer});
                        divr.appendChild(spanCorrection);
                    } else {
                        divr.innerHTML = "<span class='math'>"+answer+"</span>";
                    }
                    artCorrection.appendChild(divr);
                    carte.prepend(artCorrection);
                }
            }
            if(!utils.isEmpty(MM.memory)){
                setTimeout(function(){
                    for(const k in MM.memory){
                        if(k!=="dest")
                            MM.memory[k].display(MM.memory["dest"]);
                    }
                }, 300);
            }
        }
    }

    /**
     * offer the possibility to anotate the page
     * designed for interactive screens
     * 
     * @param {String} tgt id de l'élément à couvrir
     * @param {String} btnId id du bouton qui déclenche le draw pour changer son image
     * 
     * fonctionne avec une variable d'environnement, ici MM.touched qui prend true si on a des évennements touch
     * détecté ainsi :
     *     let listener = function(evt){
            // the user touched the screen!
            MM.touched = true;
            window.removeEventListener('touchstart',listener,false);
        }
        window.addEventListener('touchstart',listener,false);
     * également dans le css :
    #corrige-content #painting, #divparams #painting {
      position: absolute;
      display:block;
      cursor: url(../img/iconfinder_pencil.png), auto;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      z-index: 40;
    }
     */
    class draw {
        constructor(tgt,btnId){
            // creation du canva et instanciation
            const target = document.getElementById(tgt);
            let c = utils.create("canvas",{
                id:"painting",
                width:target.offsetWidth,
                height:target.offsetHeight+30
            });
            // changement d'aspect du bouton "annoter"
            this.btn = document.querySelector("#"+btnId + " img");
            this.btn.src = "img/iconfinder_pencil_activ.png";
            //insertion du canvas dans 
            target.appendChild(c);
            this.canvas = c;
            if(btnId.indexOf("btn-sample")>-1){
                this.canvas.style.top = 0;
                this.canvas.style.left = 0;
            }
            else {
                this.canvas.style.top = target.offsetTop+"px";
                this.canvas.style.left = target.offsetLeft+"px";
            }
            this.mouse = {x:0,y:0};
            const mouvement = (event)=>{
                let target = event.target;
                let evt = event;
                if(MM.touched){
                    target=event.touches[0].target;
                    evt = event.touches[0];
                }
                this.mouse.x = evt.pageX - target.getBoundingClientRect().x;
                this.mouse.y = evt.pageY - target.getBoundingClientRect().y;
                if(this.enableDraw){
                    if(!this.started){
                        this.started = true;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.mouse.x,this.mouse.y);
                    } else {
                        this.ctx.lineTo(this.mouse.x,this.mouse.y);
                        this.ctx.stroke();
                    }
                }
                if(event.touches){
                    event.preventDefault();
                }
            };
            const yesDraw = (event)=>{
                this.enableDraw = true;
                if(event.touches){
                    event.preventDefault();
                }
            };
            const noDraw = (event)=>{
                this.enableDraw = false;this.started = false;
                if(event.touches){
                    event.preventDefault();
                }
            };
            this.ctx = this.canvas.getContext('2d');
            this.ctx.strokeStyle = "grey";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.stroke();
            this.ctx.strokeStyle = "blue";
            this.ctx.lineWidth = 1;
            this.ctx.shadowBlur = 1;
            this.ctx.shadowColor = 'blue';
            this.ctx.lineJoin = "round";
            this.ctx.lineCap = "round";
            this.canvas.addEventListener("mousemove",mouvement, false);
            this.canvas.addEventListener('mousedown', yesDraw, false);
            this.canvas.addEventListener('mouseup',noDraw,false);
            this.canvas.addEventListener('mouseout',noDraw,false);
            if(MM.touched){
                this.canvas.addEventListener("touchmove",mouvement, false);
                this.canvas.addEventListener('touchstart', yesDraw, false);
                this.canvas.addEventListener('touchend', noDraw,false);
            }
        }
        // destroy canvas
        destroy(){
            this.btn.src = "img/iconfinder_pencil_1055013.png";
            this.canvas.parentNode.removeChild(this.canvas);
            this.canvas = undefined;
            this.ctx = undefined;
        }
    }

    const MM = {
        version:7,// à mettre à jour à chaque upload pour régler les pb de cache
        content:undefined, // liste des exercices classés niveau/theme/chapitre chargé au démarrage
        introType:"321",// type of the slide's intro values : "example" "321" "nothing"
        endType:"nothing",// type of end slide's values : "correction", "nothing", "list"
        touched:false,// marker to know if the screen has been touched => online answers with virtual keyboard
        selectedCart:0,
        seed:"", // String to initialize the randomization
        editedActivity:undefined, // object activity 
        slidersOrientation: "", // if vertical => vertical presentation for 2 sliders
        onlineState:"no", // true if user answers on computer (Cf start and online functions)
        carts:[], // max 4 carts
        steps:[],
        timers:[],
        figs:{}, // 
        userAnswers:[[],[],[],[]],
        slidersNumber:1,
        faceToFace:'n',
        colorSelectors:[],
        colors:[],// couleurs de fond des diaporamas
        memory:[],// memoire des figures
        goodAnswers:[],// stockage des réponses attendues dans le online,
        zooms:{},// zooms créés pour chaque élément d'affichage,
        mf:{},// MathFields pour réponses en ligne
        text2speach:[],
        keyboards:{},// claviers virtuels pour réponses en ligne
        ended:true,
        embededIn:false, // variable qui contient l'url du site dans lequel MM est affiché (vérifier url)
        /**
         * Crée un grain pour la génération aléatoire des données
         * @param {String} value 
         */
         setSeed(value){
            if(value !== undefined && value !== "sample" && value !== "checkSwitched"){
                MM.seed = value;
                document.getElementById("aleaKey").value = value;
            } else if(value === "sample"){
                MM.seed = utils.seedGenerator();
            } else if(document.getElementById("aleaInURL").checked === true){
                if(document.getElementById("aleaKey").value === ""){
                    MM.seed = utils.seedGenerator();
                    document.getElementById("aleaKey").value = MM.seed;
                } else {
                    MM.seed = document.getElementById("aleaKey").value;
                }
            } else if(value === "checkSwitched") {
                // on ne fait rien
                return false;
            } else {
                MM.seed = utils.seedGenerator();
                document.getElementById("aleaKey").value = MM.seed;
            }
            MM.initializeAlea(MM.seed);
        },
        /**
        * 
        * @params {string} seed valeur d'initialisation des données aléatoires
        * return nothing
        */
        initializeAlea:function(seed){
            if(seed){
                if(utils.alea)delete utils.alea;
                utils.alea = new Math.seedrandom(seed);
            } else {
                if(utils.alea)delete utils.alea;
                utils.alea = new Math.seedrandom(MM.seed);
            }
        },
        /**
         * 
         * @param {DOM obj or string} element 
         * Show the selected Tab
         */
        showTab:function(element){
            MM.resetAllTabs();let tab, el;
            if(element === "none")return;
            if(typeof element === "string"){
                tab = element;
                el = document.querySelector("#header-menu a[numero='#"+element+"']");
            } else {
                el = element;
                tab = element.getAttribute('numero').substr(1);
            }
            utils.addClass(el, "is-active");
            document.getElementById(tab).style.display = "";
        },
        showParameters:function(id){
            let ids = ["paramsdiapo","paramsexos", "paramsinterro", "paramsceinture", "paramsflashcards", "paramswhogots", "paramsdominos", "paramscourse", "paramsduel", "paramswall"];//
            if(ids.indexOf(id)<0) return false;
            // hide all
            for(let i=0,len=ids.length;i<len;i++){
                document.getElementById(ids[i]).className = "hidden";
            }
            document.getElementById(id).className = "";
        },
        resetAllTabs : function(){
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
        closeMessage(id){
            let div=document.getElementById(id);
            if(div !== null) div.parentNode.removeChild(div);
            document.body.removeEventListener("click",(evt)=>{if(evt.target.id==="btn-messagefin-close"){MM.closeMessage('messagefin');MM.showTab('tab-corrige');}});
        },
        setEndType(value){
            this.endType = value;
        },
        setAudio(value){
            if(this.slidersNumber>1){
                utils.checkRadio("audioRadio","0");
            } else {
                this.editedActivity.audioRead = value==1?true:false;
                utils.checkRadio("audioRadio",value);
            }
        },
        setAudioRepetitions(value){
            value = Number(value);
            this.editedActivity.audioRepeat = value;
            document.getElementById("audiorepeat").value = value;
        },
        setIntroType(value){
            if(value === "nothing"){
                this.introType = value;
                document.getElementById("radiobeforeslider1").checked = false;
                document.getElementById("radiobeforeslider2").checked = false;
            } else {
                this.introType = [];
                document.getElementById("radiobeforeslider3").checked = false;
                if(document.getElementById("radiobeforeslider1").checked){
                    this.introType.push("example");
                }
                if(document.getElementById("radiobeforeslider2").checked){
                    this.introType.push("321");
                }
                this.introType = this.introType.join("-");
                // cas où on a décheck
                if(this.introType === ""){
                    document.getElementById("radiobeforeslider3").checked = true;
                    this.introType = "nothing";
                }
            }
        },
        setOnlineState(value){
            this.onlineState = value;
            // Mise à jour du champ
            document.querySelector("input[name='online'][value='"+value+"']").checked = true;
        },
        getOnlineState(){
            this.onlineState = utils.getRadioChecked("online");
        },
        editActivity:function(index){
            index = Number(index);
            MM.editedActivity = MM.carts[MM.selectedCart].activities[index];
            MM.setTempo(MM.editedActivity.tempo);
            MM.setNbq(MM.editedActivity.nbq);
            MM.setAudio(MM.editedActivity.audioRead);
            MM.setAudioRepetitions(MM.editedActivity.audioRepeat);
            MM.carts[MM.selectedCart].editedActivityId = index;
            MM.carts[MM.selectedCart].display();
            MM.editedActivity.display();
            document.getElementById("unlinkCart").className = "";
            document.getElementById("addToCart").className = "hidden";
            document.getElementById("removeFromCart").className = "";
        },
        uneditActivity:function(){
            document.getElementById("addToCart").className = "";
            document.getElementById("removeFromCart").className = "hidden";
            document.getElementById("unlinkCart").className = "hidden";
        },
        unlinkActivity:function(){
            this.uneditActivity();
            MM.editedActivity = new activity(utils.clone(MM.editedActivity));
            MM.editedActivity.display();
            MM.carts[MM.selectedCart].editedActivityId = -1;
            MM.carts[MM.selectedCart].display();
        },
        setTempo:function(value){
            document.getElementById("tempo-slider").value = value;
            document.getElementById('tempo-value').innerHTML = value+" s.";
        },
        setNbq:function(value){
            document.getElementById("nbq-slider").value = value;
            document.getElementById('nbq-value').innerHTML = value;
        },
        changeTempoValue:function(value){
            if(Number(value)<2)
                document.getElementById('tempo-value').innerHTML = "manuel";
            else
                document.getElementById('tempo-value').innerHTML = value+" s.";
            if(MM.editedActivity)MM.editedActivity.Tempo = value;
            if(MM.carts[MM.selectedCart].editedActivityId > -1){
                document.querySelectorAll("#cart"+(MM.selectedCart)+"-list li.active span")[0].innerHTML = value;
            }
        },
        changeNbqValue:function(value){ 
            document.getElementById('nbq-value').innerHTML = value;
            if(MM.editedActivity)MM.editedActivity.nombreQuestions = value;
            if(MM.carts[MM.selectedCart].editedActivityId > -1){
                document.querySelectorAll("#cart"+(MM.selectedCart)+"-list li.active span")[1].innerHTML = value;
            }
        },
        checkValues:function(){
            MM.changeTempoValue(document.getElementById('tempo-slider').value);
            MM.changeNbqValue(document.getElementById('nbq-slider').value);
        },
        resetCarts:function(){
            let Cart = new cart(0);
            MM.carts=[Cart];
            MM.setMinimalDisposition(0);
            MM.steps=[];
            MM.timers=[];
            MM.figs={};
            MM.resetInterface();
        },
        resetInterface(){
            document.getElementById("divcarts").className="hidden";
            document.getElementById("phantom").className="";
            document.getElementById("divparams").className="col-2 row-3";
            // on check tous les boutons radio en fonction des valeurs en méméoire
            utils.checkRadio("direction",this.slidersOrientation);
            utils.checkRadio("beforeSlider",this.introType);
            utils.checkCheckbox("beforeSlider", this.introType.split("-"));
            utils.checkRadio("endOfSlideRadio",this.endType);
            utils.checkRadio("online",this.onlineState);
            utils.checkRadio("facetoface",this.faceToFace);
            utils.checkRadio("Enonces",this.slidersNumber);
        },
        showCartInterface(){
            document.getElementById("divcarts").className="row-4";
            document.getElementById("phantom").className="hidden";
            document.getElementById("divparams").className="row-3";
        },
        addCart:function(){
            this.uneditActivity();
            let cartsNb = MM.carts.length+1;
            if(cartsNb>4) return false;
            MM.carts[cartsNb-1] = new cart(cartsNb-1);
            MM.setMinimalDisposition(cartsNb-1);
            // add cart button
            let button = utils.create("button");
            button.value = cartsNb;
            button.className = "tabs-menu-link";
            button.innerHTML = '<img src="img/cart'+cartsNb+'.png">';
            button.id = "button-cart"+cartsNb;
            let addcart = document.getElementById('addcart');
            let cartsMenu = document.getElementById('cartsMenu');
            let lastButton = cartsMenu.removeChild(addcart);
            cartsMenu.appendChild(button).click();
            // hide + button if 4 carts
            if(cartsNb < 4){
                cartsMenu.appendChild(lastButton);
            }
        },
        /**
         * fonction qui récupère la liste des activités d'un panier
         * 
         * return DOM object
         */
        getCartsContent:function(){
            let div = utils.create("div",{style:"display:flex;"});
            for(let i=0;i<MM.carts.length;i++){
                let ul = utils.create("ul",{innerHTML:"<span class='bold'>"+MM.carts[i].title+"</span>"});
                let acts = MM.carts[i].activities;
                for(let j=0;j<acts.length;j++){
                    let li = utils.create("li", {innerText:acts[j].title});
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
        restoreCartsInterface:function(){
            let cartsMenu = document.getElementById('cartsMenu');
            cartsMenu.innerHTML = `<button class="tabs-menu-link is-active" value="1" id="button-cart1"><img src="img/cart1.png"></button>
        <button id="addcart" title="Ajouter un panier"><img src="img/cartadd.png"></button>`;
            for(let i=1;i<this.carts.length;i++){
                let btnnb = i+1;
                let button = utils.create("button",{
                    value:btnnb,
                    className:"tabs-menu-link",
                    innerHTML:'<img src="img/cart'+btnnb+'.png">',
                    id:"button-cart"+btnnb
                });
                let addcart = document.getElementById('addcart');
                let lastButton = cartsMenu.removeChild(addcart);
                cartsMenu.appendChild(button);
                if(btnnb < 4){
                    cartsMenu.appendChild(lastButton);
                }    
            }
        },
        removeCart:function(index){
            if(!window.confirm("Vous êtes sur le point de supprimer ce panier.\nConfirmez-vous ?")){
                return false;
            }
            // remove last cart button
            let buttonCartToremove = document.getElementById('button-cart'+MM.carts.length);
            let cartsMenu = document.getElementById('cartsMenu');
            cartsMenu.removeChild(buttonCartToremove);
            // recreate buttonAddCart if necessary
            if(!document.getElementById("addcart")){
                let buttonAddCart = document.createElement("button");
                buttonAddCart.id = "addcart";
                buttonAddCart.innerHTML = '<img src="img/cartadd.png">';
                buttonAddCart.onclick = function(){
                    MM.addCart();
                };
                cartsMenu.appendChild(buttonAddCart);
            }
            // delete cart
            MM.carts.splice(index-1,1);
            MM.setMinimalDisposition(MM.carts.length-1);
            // show Cart1
            MM.showCart(1);
            // rewrite all contents
        },
        showCart(index){
            this.uneditActivity();
            index = Number(index);
            MM.selectedCart = index-1;
            for (let i=1,nb=MM.carts.length,btn;i<=4;i++){
                if(i<=nb)
                    btn = document.getElementById('button-cart'+i);
                let div = document.getElementById('cart'+(i-1));
                if(i!==index){
                    div.className = "hidden";
                    if(i<=nb)utils.removeClass(btn,"is-active");
                } else {
                    div.className = "cartcontent";
                    if(i<=nb)utils.addClass(btn,"is-active");
                }
            }
            // show edited activity
            if(MM.carts[MM.selectedCart].editedActivityId > -1){
                MM.carts[MM.selectedCart].activities[MM.carts[MM.selectedCart].editedActivityId].display();
                this.editActivity(MM.carts[MM.selectedCart].editedActivityId);
            }
        },
        emptyCart(index){
            if(window.confirm("Vous êtes sur le point de vider ce panier.\nConfirmez-vous ?")){
                MM.carts[index-1].activities = [];
                MM.carts[index-1].editedActivityId = -1;
                MM.carts[index-1].display();
            } else return false;
        },
        addToCart(){
            MM.carts[MM.selectedCart].addActivity(MM.editedActivity);
            // on affiche les panier
            MM.showCartInterface();
        },
        removeFromCart(id=false){
            let cart = MM.carts[MM.selectedCart];
            let idact = id?id:cart.editedActivityId;
            if(!id || Number(id) == Number(cart.editedActivityId)){
                cart.editedActivityId = -1;
                document.getElementById("addToCart").className = "";
                document.getElementById("removeFromCart").className = "hidden";
                document.getElementById("unlinkCart").className = "hidden";
            }
            cart.removeActivity(idact);
        },
        /**
         * regarde si tous les paniers sont chargés
         * si oui, on lance le diaporama.
         */
        checkLoadedCarts(start=false){
            let loaded = true;
            for(const panier of this.carts){
                if(!panier.loaded)
                    loaded = false;
            }
            if(loaded){
                if(start)
                    MM.start();
                else {
                    const tabaccueil = document.getElementById("tab-accueil");
                    let message = `Tu as suivi un lien d'activité préconfigurée MathsMentales.<br>Clique ci-dessous pour démarrer.<br><br><button class="button--primary" id="btn-message-start"> Démarrer le diaporama </button>`;
                    if(MM.carts.length === 1 && sound.selected===null)
                        message += `<br><br><button class="button--info" id="btn-message-sound">Avec du son</button>`;
                    if(MM.carts.length===1 && MM.carts[0].target.length===1)
                        message +=`<br><br> ou <button class="button--success" id="btn-message-interact"> Commencer (interactif)</button>`;
                    let alert=utils.create("div",{id:"messageinfo",className:"message",innerHTML:message});
                    tabaccueil.appendChild(alert);
                    tabaccueil.addEventListener("click",(evt)=>{
                        switch (evt.target.id){
                            case "btn-message-start":
                                MM.closeMessage('messageinfo');MM.start();
                                break;
                            case "btn-message-sound":
                                sound.next();
                                break;
                            case "btn-message-interact":
                                MM.closeMessage('messageinfo');MM.setOnlineState('yes');MM.start();
                                break;
                        }
                    });
                }
            } else {
                let messageinfo = document.getElementById("messageinfo");
                if(messageinfo !== null){
                    messageinfo.innerHTML +="<br><br>Le chargement n'est pas encore terminé. Patience...";
                }
            }
        },
        /**
         * création des affichages dans les diaporamas et les zones de rappel du site.
         * @param {boolean} withAnswer insère les réponses dans le diaporama si true
         */
        populateQuestionsAndAnswers(withAnswer){
            MM.figs = {};MM.steps=[];MM.timers=[];MM.memory={};MM.goodAnswers=[];MM.text2speach=[];
            // length = nombre de paniers
            let length=MM.carts.length;
            let enonces = document.getElementById('enonce-content');
            let corriges = document.getElementById('corrige-content');
            if(length>1){
                enonces.className = "grid-"+length;
                corriges.className = "grid-"+length;
            }
            enonces.innerHTML="";
            corriges.innerHTML="";
            MM.copyURLtoHistory();
            // parcours des paniers
            for(let i=0;i<length;i++){
                MM.carts[i].actsArrays = [];
                // parcours des destinations du panier
                for(let kk=0,clen=MM.carts[i].target.length;kk<clen;kk++){
                    let indiceSlide = 0;
                    MM.goodAnswers[kk]=[];
                    let slideNumber = MM.carts[i].target[kk]-1;
                    let slider = document.getElementById("slider"+slideNumber);
                    if(MM.colors[slideNumber]!==undefined){
                        slider.style["background"] = MM.colors[slideNumber];
                    }
                    let addTitle = "";
                    if(clen>1)addTitle = "-"+(kk+1);
                    let titleSlider = MM.carts[i].title+addTitle;
                    document.querySelector("#slider"+slideNumber+" .slider-title").innerHTML = titleSlider;
                    let sliderSteps = document.querySelector("#slider"+slideNumber+" .steps-container");
                    let dive = utils.create("div",{id:"de"+i+"-"+kk});
                    let divc = utils.create("div",{id:"dc"+i+"-"+kk});
                    MM.zooms["zc"+i+"-"+kk] = new Zoom("zc"+i+"-"+kk,"#dc"+i+"-"+kk+" ol", true);
                    MM.zooms["ze"+i+"-"+kk] = new Zoom("ze"+i+"-"+kk,"#de"+i+"-"+kk+" ol", true);
                    dive.appendChild(MM.zooms["ze"+i+"-"+kk].createCursor());
                    divc.appendChild(MM.zooms["zc"+i+"-"+kk].createCursor());
                    let h3e = utils.create("h3",{innerText:titleSlider}); // exercice's title
                    let h3c = utils.create("h3",{innerText:titleSlider});// correction's title
                    dive.append(h3e);
                    divc.append(h3c);
                    let ole = utils.create("ol");
                    let olc = utils.create("ol");
                    // mise en couleur des listes énoncés et corrigés. (pour bilan ou impression)
                    if(MM.colors[slideNumber]!==undefined){
                        ole.style["background"] = MM.colors[slideNumber];
                        olc.style["background"] = MM.colors[slideNumber];
                    }
                    MM.steps[slideNumber] = new steps({size:0, container:sliderSteps});
                    MM.timers[slideNumber] = new timer(slideNumber, i);
                    let actsArray=[];
                    // on fait la liste des références activités / questions pour pouvoir créer les affichages
                    for(let z=0,alen=MM.carts[i].activities.length;z<alen;z++){
                        let activity = MM.carts[i].activities[z];
                        activity.generate();
                        MM.goodAnswers[kk][z]=utils.clone(activity.values);
                        MM.steps[slideNumber].addSize(activity.nbq);
                        for(let j=0;j<activity.questions.length;j++){
                            actsArray.push([z,j]);
                        }
                    }
                    // on mélange les références si on veut que tout soit mélangé.
                    if(!MM.carts[i].ordered){
                        actsArray = utils.shuffle(actsArray);
                    }
                    // on stocke les associations pour pouvoir comparer quand on fera le online
                    MM.carts[i].actsArrays[kk] = actsArray;
                    // parcours des questions
                    for(let ff=0;ff<actsArray.length;ff++){
                        let activity = MM.carts[i].activities[actsArray[ff][0]];
                        // pour ne pas tout réécrire :
                        // j est le numéro de la question
                        let j = actsArray[ff][1];
                        let question = activity.questions[j];
                        let answer = activity.answers[j];
                        let fontSize = activity.textSize || false;
                        // slides
                        let color = ff%2?" pair":" impair";
                        let div = utils.create("div",{className:"slide w3-animate-top"+(indiceSlide>0?" hidden":"")+color,id:"slide"+slideNumber+"-"+indiceSlide});
                        if(activity.consigne !== false){
                            div.appendChild(utils.create('div',{className:'consigne',innerHTML:activity.consigne}));
                        }
                        let span = utils.create("span",{innerHTML:question});
                        if(fontSize)span.className=fontSize;
                        let answerHiddenState = ' hidden';
                        if (MM.carts[i].progress === 'withanswer'){ answerHiddenState = '';}
                        let spanAns = utils.create("span",{className:"answerInSlide" + answerHiddenState});
                        if(Array.isArray(answer))
                            spanAns.innerHTML =answer[0];
                        else
                            spanAns.innerHTML =answer;
                        if(fontSize)spanAns.className+=" "+fontSize;
                        // timers
                        MM.timers[slideNumber].addDuration(activity.tempo);
                        // enoncés et corrigés
                        let lie = utils.create("li");
                        let lic = document.createElement("li");
                        let tex = false; let spane,spanc;
                        if(activity.type === undefined || activity.type === "" || activity.type === "latex"){
                            tex = true;
                            spane = utils.create("span",{className:"math", innerHTML:question});
                            lie.appendChild(spane);
                            spanc = utils.create("span",{className:"math"});
                            lic.appendChild(spanc);
                            span.className +=" math";
                            spanAns.className += " math";
                            } else {
                            lie.innerHTML=question;
                        }
                        div.appendChild(span);
                        if(MM.onlineState !=="yes"){
                            // include answer if not online state
                            div.appendChild(spanAns);
                        }
                        if(activity.audioRead && activity.audios[j]!==undefined && activity.audios[j]!==false){
                            MM.text2speach[indiceSlide] = [activity.audios[j],activity.audioRepeat];
                        }
                        // insertion du div dans le slide
                        slider.appendChild(div);

                        if(Array.isArray(answer)){
                                if(!tex)lic.innerHTML += answer[0];
                                else spanc.innerHTML += answer[0];
                            }
                        else {
                            if(tex)
                                spanc.innerHTML += answer;
                            else
                                lic.innerHTML += answer;
                        }
                        if(activity.figures[j] !== undefined){
                            lic.innerHTML += "&nbsp; <button data-id=\"c"+slideNumber+"-"+indiceSlide+"\">Figure</button>";
                            MM.figs[slideNumber+"-"+indiceSlide] = new Figure(utils.clone(activity.figures[j]), "c"+slideNumber+"-"+indiceSlide, div);
                            MM.memory['e'+slideNumber+"-"+indiceSlide] = new Figure(utils.clone(activity.figures[j]), "en"+slideNumber+"-"+indiceSlide, lie,[300,150]);
                            MM.memory['c'+slideNumber+"-"+indiceSlide] = new Figure(utils.clone(activity.figures[j]), "cor"+slideNumber+"-"+indiceSlide, lic,[450,225]);
                        }
                        ole.appendChild(lie);
                        olc.appendChild(lic);
                        indiceSlide++;
                    }
                    dive.append(ole);
                    divc.append(olc);
                    enonces.append(dive);
                    corriges.append(divc);
                    MM.steps[slideNumber].display();
                    if(!utils.isEmpty(MM.figs)){
                        setTimeout(function(){
                        for(let j=0;j<indiceSlide;j++){
                            // toutes les questions ne comportent pas de figures, on vérifie qu'il y en a.
                            if(MM.memory['e'+slideNumber+"-"+j] !== undefined)
                                MM.memory['e'+slideNumber+"-"+j].display();
                        }
                    });
                    }
                }
            }
            utils.mathRender();
            //MM.zoomCorrection();
        },
        /**
         * todo : à revoir, le offsetHeight semble ne pas se mettre à jour. Peut-être un pb de timing. Utiliser les promises ?
         */
        zoomCorrection(){
            if(MM.zooms["zc0-0"]!==undefined){
                let maxH = window.innerHeight;
                let bodyH = document.body.offsetHeight;
                let count = 0;
                while(bodyH<maxH && count<2){
                    count++;
                    MM.zooms["zc0-0"].plus();
                    bodyH = document.body.offsetHeight;
                }
            }
        },
        /**
         * Create the user inputs to answer the questions
         * Ne fonctionnera qu'avec un panier unique
         * 
         */
        createUserInputs:function(){
            MM.mf = {};
            MM.keyboards = {};
            //let slider=0,slide = 0;
            for(let slider=0,len=MM.carts[0].target.length;slider<len;slider++){
                const actArray = MM.carts[0].actsArrays[slider];
                for(let slide=0,len2=actArray.length;slide<len2;slide++){
                    document.getElementById("slider"+slider);
                    const element = document.getElementById("slide"+slider+"-"+slide);
                    const ID = 'ansInput'+slider+'-'+slide;
                    MM.mf[ID] = new MathfieldElement({
                        smartMode:true,
                        virtualKeyboardMode:'off',
                        fontsDirectory:'../katex/fonts',
                   });
                   //if(MM.touched){
                        let keys = MM.carts[0].activities[actArray[slide][0]].keyBoards[actArray[slide][1]] || undefined;
                        MM.keyboards[ID]= new keyBoard(MM.mf[ID],keys,element,slider);
                        // si on affiche une figure, on diminue la taille du champ de réponse.
                        if(MM.figs[slider+"-"+slide]!== undefined){
                            MM.mf[ID].style.fontSize = "0.333em";
                        }
                    //}
                   MM.mf[ID].id = ID;
                   MM.mf[ID].target = element;
                   MM.mf[ID].addEventListener("keyup",function(event){
                        if(event.key === "Enter" || event.code === "NumpadEnter"){
                            MM.nextSlide(slider);
                            event.preventDefault();
                    }
                    });
                    element.appendChild(MM.mf[ID]);
                    element.appendChild(utils.create("div",{style:"height:270px;"}));
                }
            }
        },
        setFacetoFace(etat){
            this.faceToFace = etat;
            if(etat === "y"){
                utils.addClass(document.getElementById("sddiv1"),"return");
                if(MM.slidersNumber>2)
                    utils.addClass(document.getElementById("sddiv2"),"return");
            } else {
                utils.removeClass(document.getElementById("sddiv1"),"return");
                utils.removeClass(document.getElementById("sddiv2"),"return");
            }
        },
        getFacetoFace(){
            this.faceToFace = utils.getRadioChecked("facetoface");
        },
        /**
         * Create a sheet of exercices
         * called by parameters
         */
        createExercicesSheet:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,"exosheet");
            let value = this.setURL(params,"exosheet");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=1123");
        },
        createCourseAuxNombres:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,"cansheet");
            let value = this.setURL(params,"cansheet");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=1123");
        },
        /**
         * Create a sheet of exercices
         * called by parameters
         */
        createExamSheet:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,"exam");
            let value = this.setURL(params,"exam");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=1123");
        },
        createCeintureSheet:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            // vérification du nombre de questions du panier
            let nbq = 0;
            for(let i=0;i<MM.carts[0].activities.length;i++){
                nbq += Number(MM.carts[0].activities[i].nbq);
            }
            // calcul du nombre de questions de la ceinture
            let nbqc = Number(document.getElementById("ceintcolsval").value)*Number(document.getElementById("ceintrowsval").value);
            if(nbq<nbqc){ // si pas assez de questions dans le panier, alerter et s'arrêter
                alert("Pas assez de questions dans le panier pour alimenter la ceinture\nde "+
                document.getElementById("ceintcolsval").value+"×"+document.getElementById("ceintrowsval").value+
                "="+nbqc+" emplacements"
                );
                return;
            } else if(nbq>nbqc){
                if(!confirm("Vous allez créé une ceinture de "+nbqc+" emplacements\nalors que vous avez créé un panier de"+
                nbq+"questions.\nToutes ne seront donc pas imprimées. Continuer ?")){
                    return;
                }
            }
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,"ceinture");
            let value = this.setURL(params,"ceinture");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=1123");
            //MM.fiche = new ficheToPrint("ceinture",MM.carts[0],utils.getRadioChecked("ceintorientation"));
        },
        createFlashCards:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,"cartesflash");
            let value = this.setURL(params,"cartesflash");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=1123");
        },
        createWall:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,"wall");
            let value = this.setURL(params,"wall");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=1123");
        },
        createWhoGots:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            MM.fiche = new ficheToPrint("whogots",MM.carts[0]);
        },
        createDominos:function(){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,"dominossheet");
            let value = this.setURL(params,"dominossheet");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=1123");
        },
        duelLaunch:function(){
            if(!MM.editedActivity) return;
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            let withSeed = false;
            let params = this.paramsToURL(withSeed,"duel");
            let value = this.setURL(params,"duel");
            MM.window = window.open(value,"mywindow","location=no,menubar=no,titlebar=no,width=720");
        },
        /**
         * Start the slideshow
         */
        start:function(samedata=false){
            if(!MM.carts[0].activities.length){
                MM.carts[0].addActivity(MM.editedActivity);
            }
            MM.getOnlineState();
            if(MM.onlineState === "yes"){
                MM.userAnswers = [[],[],[],[]];
                // security there should not be more than 1 cart for the online use
                // TODO à adapter pour le mode duel
                if(MM.carts.length > 1){
                    for(let i=1,len=MM.carts.length;i<len;i++){
                        delete MM.carts[i];
                    }
                }
                // cacher le menu de commandes général
                document.querySelector("#slideshow-container > header").className="hidden";
            } else {
                // montrer le menu de commandes général
                document.querySelector("#slideshow-container > header").className="";
            }
            MM.showTab("none");
            // check if an option has been chosen
            MM.checkIntro();
            MM.createSlideShows();
            // if restart true, we restart with same values
            if(!samedata){
                MM.setSeed();
            }else {
                MM.setSeed(document.getElementById("aleaKey").value);
            }
            MM.populateQuestionsAndAnswers();
            if(MM.introType === "321"){
                document.getElementById("countdown-container").className = "";
                if(sound.selected){
                    setTimeout(()=>{sound.beeps();},800);
                    setTimeout(()=>{sound.setSound(sound.selected);},3500);
                }
                setTimeout(function(){
                    document.getElementById("countdown-container").className = "hidden";
                    if(MM.onlineState === "yes") { // create inputs for user
                        MM.createUserInputs();
                    }
                    MM.showSlideShows();
                    MM.startTimers();
                },3600);
            } else if(MM.introType.indexOf("example")>-1){
                // on affiche un exemple
                MM.showSampleQuestion();
                MM.showSlideShows();
            } else {
                // on démarre directement
                if(MM.onlineState === "yes") { // create inputs for user
                    MM.createUserInputs();
                }
                MM.showSlideShows();
                MM.startTimers();
            }
            this.ended=false;// utilisé à la fin du diapo
        },
        paramsToURL(withAleaSeed=false,type=""){
            let colors = MM.colors.join("~").replace(/\,/g,"_");
            MM.setSeed();
            if(type==="exosheet"){
                return "s="+document.getElementById("exTxtSizeValue").value+
                    ",n="+document.getElementById("exQtyValue").value+
                    ",cor="+utils.getRadioChecked("excorr")+
                    ",a="+(withAleaSeed?MM.seed:"")+
                    ",t="+encodeURI(document.getElementById("extitle").value||document.getElementById("extitle").placeholder)+
                    ",ex="+encodeURI(document.getElementById("exeachex").value||document.getElementById("exeachex").placeholder)+
                    this.export();
            }else if(type==="exam"){
                return "s="+document.getElementById("intTxtSizeValue").value+
                    ",n="+document.getElementById("intQtyValue").value+
                    ",a="+(withAleaSeed?MM.seed:"")+
                    ",t="+encodeURI(document.getElementById("inttitle").value||document.getElementById("inttitle").placeholder)+
                    ",ex="+encodeURI(document.getElementById("inteachex").value||document.getElementById("inteachex").placeholder)+
                    this.export();
            } else if(type==="cansheet"){
                return "n="+document.getElementById("canqtyvalue").value+
                ",t="+encodeURI(document.getElementById("cantitle").value||document.getElementById("cantitle").placeholder)+
                ",a="+(withAleaSeed?MM.seed:"")+
                ",cor="+(utils.getRadioChecked("cancorrpos")||"fin")+
                ",tm="+(document.getElementById("cantime").value||document.getElementById("cantime").placeholder)+
                ",t1="+encodeURI(document.getElementById("cancol1title").value||document.getElementById("cancol1title").placeholder)+
                ",t2="+encodeURI(document.getElementById("cancol2title").value||document.getElementById("cancol2title").placeholder)+
                ",t3="+encodeURI(document.getElementById("cancol3title").value||document.getElementById("cancol3title").placeholder)+
                this.export()
            } else if(type==="cartesflash"){
                return "disp="+(utils.getRadioChecked("flashcarddispo"))+
                ",t="+(document.getElementById("FCtitle").value||"Cartes Flash")+
                ",a="+(withAleaSeed?MM.seed:"")+
                this.export()
            } else if(type === "wall"){
                return "t="+utils.superEncodeURI(document.getElementById("walltitle").value)+
                ",a="+(withAleaSeed?MM.seed:"")+
                this.export()
            } else if(type==="dominossheet"){
                return "n="+document.getElementById("dominosNbValue").value+
                ",a="+(withAleaSeed?MM.seed:"")+
                ",d="+(document.getElementById("dominosDoublons").checked)+
                this.export();
            } else if(type === "duel"){
                return "ty="+utils.getRadioChecked("dueltype")+
                ",bg="+document.getElementById("duelbackgroundselect").value+
                (utils.getRadioChecked("dueltemps")==="limit"?",t="+utils.timeToSeconds(document.getElementById("dueltotaltime").value):"")+
                this.export();
            } else if(type==="ceinture"){
                let chaine = "",t=0;
                // liste des titres :
                let titles = document.querySelectorAll("#ceintcolumnTitle input");
                titles.forEach(inp =>{
                    chaine += ",t"+t+"="+(inp.value?utils.superEncodeURI(inp.value):"");
                    t++;
                });
                return "t="+utils.superEncodeURI(document.getElementById("ceinttitle").value)+
                ",ke="+document.getElementById("ceintprintToEnonce").checked+
                ",kc="+document.getElementById("ceintprintToCorrige").checked+
                ",nc="+document.getElementById("ceintcolsval").value+
                chaine+
                ",a="+(withAleaSeed?MM.seed:"")+
                ",nr="+document.getElementById("ceintrowsval").value+
                ",n="+document.getElementById("ceintqtyvalue").value+
                ",cor="+(utils.getRadioChecked("ceintcorrpos")||"fin")+
                ",pie="+document.getElementById("ceintpiedcol").value+
                ",or="+(utils.getRadioChecked("ceintorientation")||"portrait")+
                this.export();
            } else
            return "i="+MM.introType+
                ",e="+MM.endType+
                ",o="+MM.onlineState+
                ",s="+MM.slidersNumber+
                ",so="+MM.slidersOrientation+
                ",f="+MM.faceToFace+
                ",a="+(withAleaSeed?MM.seed:"")+
                ",colors="+colors+
                ",snd="+sound.selected+
                this.export();
        },
        setHistory(pageName,params){
            let url = MM.setURL(params);
            history.pushState({'id':'Homepage'},pageName,url);
        },
        /**
         * regarde les paramètres fournis dans l'url
         * et lance le diapo ou passe en mode édition
         * edit est true si appelé par l'historique pour édition
         */
        checkURL(urlString=false,start=true,edit=false){
            const vars = utils.getUrlVars(urlString);
            // cas d'une page prévue pour exercice.html
            if(vars.cor && vars.ex && location.href.indexOf("exercices.html")<0 && !edit){
                // on redirige vers exercice.html
                let url = new URL(location.href);
                location.href= url.origin+url.pathname.replace("index.html","")+"exercices.html"+url.search;
            }
            if(vars.embed !== undefined){
                // cas d'une activité embeded, on vérifie que l'url est conforme
                let expression = 
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                let regex = new RegExp(expression);
                if(vars.embed.match(regex))
                    MM.embededIn = vars.embed;
            }
            if(vars.n!== undefined && vars.cd===undefined && !edit){ // un niveau à afficher
                library.displayContent(vars.n,true);
                return;
            } else if(vars.u!==undefined && vars.cd === undefined && !edit){ // ancien exo MM1
                let regexp = /(\d+|T|G|K)/;// le fichier commence par un nombre ou un T pour la terminale
                // un paramétrage d'exercice à afficher
                 if(_.isArray(vars.u)){
                     let listeURLs = [];
                     // il peut y avoir plusieurs exercices correspondant à une activité MM1
                     for(let i=0;i<vars.u.length;i++){
                        let url = vars.u[i];
                        let level = regexp.exec(url)[0];
                        listeURLs.push({u:"N"+level+"/"+url+".json",t:""});
                    }
                    library.displayContent(listeURLs);
                 } else if(vars.u !== undefined) {
                     // s'il n'y a qu'une activité, on l'affiche.
                    let level = regexp.exec(vars.u)[0];
                    library.load("N"+level+"/"+vars.u+".json", vars.u);
                } else {
                    let alert = utils.create("div",{className:"message",innerHTML:"Cette activité n'a pas de correspondance dans cette nouvelle version de MathsMentales.<hr class='center w50'>Vous allez être redirigé vers l'ancienne version dans 10s. <a>Go !</a>"});
                    alert.onclick =  utils.goToOldVersion();
                    document.getElementById("tab-accueil").appendChild(alert);
                    setTimeout(utils.goToOldVersion,10000);
                }
            } else if(vars.c!==undefined){ // présence de carts MM v2 à lancer ou éditer
                let alert = utils.create("div",{id:'messageinfo',className:"message",innerHTML:"Chargement de l'activité MathsMentales.<br>Merci pour la visite."});
                document.getElementById("tab-accueil").appendChild(alert);
                if(vars.o === "yes" && !edit){
                    // cas d'un truc online : message à valider !
                    start = false;
                    alert.innerHTML += "<br><br>";
                    let button = utils.create("button",{innerHTML:"Commencer !"});
                    button.onclick = ()=>{MM.closeMessage('messageinfo');MM.checkLoadedCarts(true);};
                    alert.appendChild(button);
                    //<button onclick="MM.closeMessage('messageinfo');MM.checkLoadedCarts(true)"> Commencer !
                    //</button>`;
                } else {
                    setTimeout(()=>{
                        MM.closeMessage('messageinfo');
                    },3000);
                }
                // indique quoi faire avant le slide
                MM.introType = vars.i||"nothing";
                // indique quoi faire après le slide
                MM.endType = vars.e;
                // couleurs des diaporamas
                if(typeof vars.colors === "string"){
                    let couleurs = vars.colors.split("~");
                    for(let i=0;i<couleurs.length;i++){
                        MM.colors[i]=couleurs[i].replace(/_/g,",");
                        document.getElementById("sddiv"+(i+1)).style.background = MM.colors[i];
                    }
                }
                // Mode online
                if(vars.o){
                    MM.onlineState = vars.o;
                }
                // Mode face to face
                if(vars.f)MM.faceToFace = vars.f;
                // nombre de diaporamas
                if(vars.s){
                    MM.slidersNumber = Number(vars.s);
                }
                // son
                if(vars.snd !== undefined){
                    if(vars.snd !== "null"){
                        sound.setSound(Number(vars.snd));
                    }
                }
                // le seed d'aléatorisation est fourni et on n'est pas en mode online
                if((vars.a && MM.onlineState === "no") || edit){
                    MM.setSeed(vars.a);
                    // on check la clé de donnée incluse
                    document.getElementById("aleaInURL").checked = true;
                } /*else if(MM.onlineState=="yes" || !vars.a)
                    MM.setSeed(utils.seedGenerator());*/
                // on supprime tous les paniers
                MM.resetCarts();
                // orientation dans le cas de 2 diapos
                if(vars.so){
                    MM.slidersOrientation = vars.so;
                }
                // paramètres des activités des paniers
                let json = vars.c;
                // version avant le 15/08/21
                if(typeof vars.c === "string")
                    json = JSON.parse(decodeURIComponent(vars.c));
                // la version à partir du 15/08/21 fonctionne avec un objet vars.c déjà construit.
                // alcarts contient des promises qu'il faut charger
                let allcarts = [];
                for(const i in json){
                    MM.carts[i] = new cart(i);
                    allcarts.push(MM.carts[i].import(json[i],start));
                }
                // on attend le résultat de toutes les promesses pour mettre à jour les affichages.
                Promise.all(allcarts).then(data=>{
                    // on prépare l'affichage des paniers
                    MM.resetInterface();
                    MM.restoreCartsInterface();
                    MM.showCartInterface();
                    MM.showCart(1);
                    MM.editActivity(0);
                // on affiche l'interface de paramétrage si on est en mode édition
                    if(edit) {
                        MM.showTab("tab-parameters");
                        // remplissage des données ceinture
                        if(utils.getTypeOfURL(urlString) === "paramsceinture"){
                            document.getElementById("ceinttitle").value = vars.t?decodeURIComponent(vars.t):"";
                            document.getElementById("ceintcols").value = vars.nc;
                            document.getElementById("ceintcolsval").value = vars.nc;
                            let coltitles = document.getElementById("ceintcolumnTitle");
                            coltitles.innerHTML = "";
                            for(let i=0,tot=Number(vars.nc);i<tot;i++){
                                if(i>0)coltitles.appendChild(utils.create("br"));
                                coltitles.appendChild(utils.create("label",{"for":"ceinttitlecol"+(i+1),innerHTML:"Colonne "+(i+1)+" :"}));
                                coltitles.appendChild(utils.create("input",{"type":"text",id:"ceinttitlecol"+(i+1),value:vars["t"+i]?decodeURIComponent(vars["t"+i]):""}));
                            }
                            document.getElementById("ceintrows").value=vars.nr;
                            document.getElementById("ceintrowsval").value=vars.nr;
                            document.getElementById("ceintqty").value=vars.n;
                            document.getElementById("ceintqtyvalue").value=vars.n;
                            utils.checkRadio("ceintcorrpos",vars.cor);
                            document.getElementById("ceintpiedcol").value=vars.pie;
                            utils.checkRadio("ceintorientation",vars.o?vars.o:"portrait");
                        }
                        // on sélectionne le menu qu'il faut
                        utils.selectOption("chooseParamType",utils.getTypeOfURL(urlString));
                        let element = document.getElementById("chooseParamType");
                        element.dispatchEvent(new Event('change', { 'bubbles': true }));
                    }
                }).catch(err=>{
                    // erreur à l'importation :(
                    let alert=utils.create("div",
                    {
                        id:"messageerreur",
                        className:"message",
                        innerHTML:"Impossible de charger les paniers :(<br>"+err
                    });
                    document.getElementById("tab-accueil").appendChild(alert);
                    // on fermet le message d'alerte après 3 secondes
                    setTimeout(()=>{
                        let div=document.getElementById('messageerreur');
                        div.parentNode.removeChild(div);
                    },3000);
                });
            } else if(vars.cd !== undefined || vars.panier !== undefined){ // activité unique importée de MM v1
                // affichage d'un message de redirection
                let alert = utils.create("div",{className:"message",innerHTML:"Ceci est le nouveau MathsMentales, les anciennes adresses ne sont malheureusement plus compatibles.<hr class='center w50'>Vous allez être redirigé vers l'ancienne version de MathsMentales dans 6 s. <a href='javascript:utils.goToOldVersion();'>Go !</a>"});
                document.getElementById("tab-accueil").appendChild(alert);
                setTimeout(utils.goToOldVersion,6000);
            }
        },
        // open an modal and
        // get the URL of direct access to the activity with actual parameters
        copyURL(type=""){
            const colparams = document.getElementById("colparameters");
            let modalMessage = utils.create("div",
                {
                    id:"urlCopy",
                    className:"message",
                    style:"padding:1.5rem",
                    innerHTML:`<div>Adresse longue<div>
                <textarea readonly="true" id="bigurl" cols="38" onfocus=""></textarea><br>
                <button id="btn-urlshorter">Raccourcir l'url</button><br>
                <input readonly="true" type="url" id="shorturl" size="38">
                <div id="shortQRdiv"></div>
                `
                });
            colparams.addEventListener("click",(evt)=>{
                if(evt.target.id === "btn-urlshorter")MM.getQR();
            });
            colparams.addEventListener("focus",(evt)=>{
                if(["bigurl","shorturl"].indexOf(evt.target.id)>-1)utils.copy(evt.target);
            });
            //let carts = this.export();
            let withSeed = false;
            if(document.getElementById("aleaInURL").checked)withSeed = true;
            let params = this.paramsToURL(withSeed,type);
            let close = utils.create("button",{innerHTML:"<img src='img/closebutton32.png'>",style:"position:absolute;top:0.5rem;right:0.5rem;padding:0;background:transparent"});
            close.onclick = ()=>{let m = document.getElementById("urlCopy");m.parentNode.removeChild(m);};
            modalMessage.appendChild(close);
            colparams.appendChild(modalMessage);
            //if(document.getElementById("aleaInURL").checked)params.a = MM.seed;
            let input = document.getElementById("bigurl");
            input.value = this.setURL(params,type);
            // on affiche (furtivement) le input pour que son contenun puisse être sélectionné.
            //input.className = "";
            //let value = input.value;
            navigator.clipboard.writeText(input.value);
            input.select();
            input.setSelectionRange(0,99999);
            //document.execCommand("copy");
            //input.className ="hidden";
            //let message = document.querySelector(".button--inverse .tooltiptext").innerHTML;
            //document.querySelector(".button--inverse .tooltiptext").innerHTML = "Copié !";
            //setTimeout(()=>document.querySelector(".button--inverse .tooltiptext").innerHTML = message,2500);
        },
        copyURLtoHistory(type=""){
            //let carts = this.export();
            const contener = document.querySelector("#tab-historique ol");
            let withSeed = true;
            let params = this.paramsToURL(withSeed,type);
            let url = this.setURL(params,type);
            let paramsSansSeed = this.paramsToURL(false,type);
            let urlSansSeed = this.setURL(paramsSansSeed,type);
            let li = utils.create("li");
            let typeName = "Panier";
            if(type==="cansheet"){
                typeName = "🏃‍♀️ Course aux nombres";
            } else if(type==="exosheet"){
                typeName = "📖 Fiche d'exercices";
            } else if(type==="exam"){
                typeName = "📝 Interrogation";
            } else if(type==="duel"){
                typeName = "💫 Duel";
            } else if(type==="ceinture"){
                typeName = "🥋 Ceinture";
            } else if(type === 'cartesflash'){
                typeName = '⚡ Cartes flash';
            }
            let span = utils.create("span", {innerText:typeName+" du "+utils.getDate()+": ",className:"bold"});
            li.appendChild(span);
            const a = utils.create("a",{href:url,innerText:"🎯 lien (mêmes données)"});
            li.appendChild(a);
            const a2 = utils.create("a",{href:urlSansSeed,innerText:"🎯 lien (autres données)"});
            li.appendChild(a2);
            let button = `
        <span class="pointer underline" data-url="${url}">🛠 éditer</span>
        <span class="pointer underline">❌ Supprimer</span>
        `;
            li.innerHTML += button;
            li.appendChild(this.getCartsContent());
            // on supprime les anciennes références à la même activité
            try{
                let lis = document.querySelectorAll("#tab-historique span[data-url='"+url+"']");
                for(let k=0;k<lis.length;k++){
                    let parent = lis[k].parentNode;
                    contener.removeChild(parent);
                }
            } catch(err){
                console.log(err);
            }
            // insertion de l'élément
            contener.prepend(li);
            // TODO
            // on supprime les références qui datent de plus de ...
            if(window.localStorage){
                localStorage.setItem("history",contener.innerHTML);
            }
        },
        /**
         * Enlève un élément du DOM de l'historique et enregistre localement au cas où.
         * @param {DOM element} elem 
         */
        removeFromHistory(elem){
            if(!confirm("Supprimer cet élément : \n"+elem.childNodes[0].innerText+" ?"))return false;
            document.querySelector("#tab-historique ol").removeChild(elem);
            // sauvergarde du résultat
            if(window.localStorage){
                localStorage.setItem("history",document.querySelector("#tab-historique ol").innerHTML);
            }
        },
        /**
         * Supprime les éléments d'un historique
         */
        removeSelectionFromHistory(){
            const CHECKED = document.querySelectorAll("#tab-historique input[class='checkhistoric']:checked");
            for(let i=CHECKED.length-1;i>=0;i--){
                let parent = CHECKED[i].parentNode;
                parent.parentNode.removeChild(parent);
            }
            // sauvergarde du résultat
            if(window.localStorage){
                this.createSelectHistory();
                localStorage.setItem("history",document.querySelector("#tab-historique ol").innerHTML);
                this.createSelectHistory();
            }
        },
        /**
         * Ajoute des cases de sélection de l'historique pour des actions groupées.
         */
        createSelectHistory(){
            if(!this.historySelectCreated){
                this.historySelectCreated=true;
                const LISTE = document.querySelectorAll("#tab-historique > ol > li");
                for(let i=0;i<LISTE.length;i++){
                    let input = utils.create("input",{type:"checkbox",value:i,selected:false,className:"checkhistoric"});
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
        destroySelectHistory(){
            this.historySelectCreated = false;
            const LISTE = document.querySelectorAll("#tab-historique > ol > li > input");
            for(let i=0;i<LISTE.length;i++) {
                LISTE[i].parentNode.removeChild(LISTE[i]);
            }
        },
        /**
         * Supprime tous les éléments de l'historique
         */
        emptyHistory(){
            if(!confirm("Confirmez-vous la suppression de tout l'historique ?"))return false;
            document.querySelector("#tab-historique ol").innerHTML = "";
            if(window.localStorage){
                localStorage.setItem("history","");
            }
        },
        generatePage(){
            window.alert("Fonctionalité en cours de développement.");
        },
        generateCode(){
            window.alert("Fonctionnalité en cours de développement");
        },
        getQR(){
            // si on n'est pas en mode edition de panier.
            if(MM.carts.length < 2 && MM.carts[0].activities.length < 2){
                MM.carts[0].activities = [];
                MM.carts[0].addActivity(MM.editedActivity);
            }
            // on récupère l'adresse créée
            let url = document.getElementById("bigurl").value;
            // raccourcissement de l'url
            let alert = document.getElementById("shortQRdiv");
            alert.innerHTML = "";
            let div = utils.create("div",{className:'lds-ellipsis',innerHTML:"<div></div><div></div><div></div><div></div>"});
            let div2 = utils.create("div",{innerHTML:"Génération en cours"});
            alert.appendChild(div);
            alert.appendChild(div2);
            let shorter = new XMLHttpRequest();
            shorter.onload = function(){
                alert.removeChild(div);
                alert.removeChild(div2);
                let shorturl = shorter.responseText;
                if(shorturl.indexOf("http:")!==0){
                    alert.appendChild(utils.create("h2",{innertext:"Problème de récupération de l'url courte"}));
                    return;
                }
                alert.appendChild(utils.create("h2",{innerText:"QRcode de l'exercice"}));
                let qrdest = utils.create("img",{id:"qrious","title":"Clic droit pour copier l'image"});
                alert.appendChild(qrdest);
                let inputShortUrl = document.getElementById("shorturl");
                inputShortUrl.value = shorturl;
                inputShortUrl.select();
                inputShortUrl.setSelectionRange(0,99999);
                document.execCommand("copy");
                new QRious({
                    element: qrdest,// DOM destination
                    value : shorturl,
                    size: 200,
                    padding:12
                });
            };
            shorter.open("get","getshort.php?url="+encodeURIComponent(url));
            shorter.send();
        },
        // Met en mode annotation
        annotateThisThing:function(target,btnId){
            if(target === false && MM.annotate !== undefined){
                MM.annotate.destroy();
                MM.annotate = undefined;
            } else if(MM.annotate === undefined && _.isString(target)){
                MM.annotate = new draw(target,btnId);
            } else if(MM.annotate !== undefined) {
                MM.annotate.destroy();
                MM.annotate = undefined;
            }
        },
        /**
         * Création et complétion des infos de tuiles de la page d'accueil
         */
        createTuiles(){
            let grille;
            const ordre = library.ordre;
            function setContent(id,obj){
                const elt = utils.create("article",{"className":"tuile","title":"Cliquer pour afficher toutes les activités du niveau"});
                const titre = utils.create("h3",{"innerHTML":obj.nom});
                elt.appendChild(titre);
                const nba = utils.create("div",{"innerHTML":obj.activitiesNumber+" activités"});
                elt.onclick = ()=>{library.displayContent(id,true);};
                elt.appendChild(nba);
                grille.appendChild(elt);
            }
            for(const o in ordre){
                grille = document.getElementById(o);
                for(let i=0;i<ordre[o].length;i++){
                    if(MM.content[ordre[o][i]].activitiesNumber === undefined || MM.content[ordre[o][i]].activitiesNumber ===0 || i==="activitiesNumber")continue;
                    setContent(ordre[o][i],MM.content[ordre[o][i]]);
                }
            }    
        },
        /**
         * Création des checkbox pour sélectionner les niveaux dans lesquels chercher.
         */
        createSearchCheckboxes(){
            let dest = document.getElementById("searchLevels");
            const ordre = library.ordre;
            for(const o in ordre){
                for(let i=0;i<ordre[o].length;i++){
                    if(MM.content[ordre[o][i]].activitiesNumber === undefined || MM.content[ordre[o][i]].activitiesNumber ===0 || i==="activitiesNumber")
                        continue;
                    const div = utils.create("div");
                    const input = utils.create("input",{type:"checkbox",name:"searchlevel",value:ordre[o][i],className:"checkbox",id:"ccbs"+ordre[o][i]});
                    input.onclick = ()=>{library.displayContent(document.getElementById("searchinput").value);};
                    const label = utils.create("label",{for:"ccbs"+ordre[o][i], innerText:MM.content[ordre[o][i]].nom});
                    label.onclick = (evt)=>{document.getElementById(evt.target.for).click();};
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
        export(){
            let urlString = "";
            if(MM.carts[0].activities.length < 2 && MM.carts.length === 1){
                MM.carts[0].activities = [];
                MM.carts[0].addActivity(MM.editedActivity);
            }
            MM.checkIntro();
            //MM.setSeed();
            //let carts = {};
            for(let i=0;i<this.carts.length;i++){
                //carts[i] = this.carts[i].export();
                urlString += this.carts[i].export();
            }
            return urlString;//carts;
        },
        setURL(string,type){
            if(utils.baseURL.indexOf("index.html")<0) utils.baseURL+="index.html";
            if(type==="exosheet"){
                return utils.baseURL.replace('index','exercices')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else if(type==="exam"){
                return utils.baseURL.replace('index','exam')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else if(type==="cansheet"){
                return utils.baseURL.replace('index','courseauxnombres')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else if(type==="cartesflash"){
                return utils.baseURL.replace('index','cartesflash')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else if(type==="wall"){
                return utils.baseURL.replace('index','wall')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else if(type==="dominossheet"){
                return utils.baseURL.replace('index','dominos')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else if(type==="duel"){
                return utils.baseURL.replace('index','duel')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else if(type==="ceinture"){
                return utils.baseURL.replace('index','ceinture')+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
            } else
                return utils.baseURL+'?'+string+(MM.embededIn?'&embed='+MM.embededIn:"");
        },
        checkIntro:function(){
            MM.introType = utils.getRadioChecked("beforeSlider");
            MM.endType = utils.getRadioChecked("endOfSlideRadio");
        },
        startTimers:function(){
            if(MM.text2speach[0]!==undefined){
                MM.speech.speak(MM.text2speach[0]);
            }
            if(MM.onlineState === "yes" && !MM.touched){
                document.getElementById("ansInput0-0").focus();
            }
            for(let i=0,k=MM.timers.length;i<k;i++){
                MM.timers[i].start(0);
            }
        },
        showSampleQuestion:function(){
            let nb = MM.slidersNumber;
            MM.setSeed("sample");
            let container = document.getElementById("slideshow");
            let assocSliderActivity=[];
            // génération des données aléatoires pour les exemples
            for(let i=0,len=MM.carts.length;i<len;i++){
                MM.carts[i].activities[0].generateSample();
                for(let j=0;j<MM.carts[i].target.length;j++){
                    assocSliderActivity[MM.carts[i].target[j]-1] = i;
                }
            }
            let divSample = utils.create("div",{id:"sampleLayer",className:"sample"});
            // creation des emplacements d'affichage
            let facteurZoom = 1;
            for(let i=0;i<nb;i++){
                let div = utils.create("div",{id:"sample"+i});
                if(nb === 1){div.className = "slider-1";facteurZoom=3;}
                else if(nb===2){div.className = "slider-2";facteurZoom=2;}
                else div.className = "slider-34";
                let nextActivity = "";
                if(MM.carts[assocSliderActivity[i]].activities.length>1) {
                    nextActivity = `<button title="Activité suivante du panier" data-actid="0" id="ButtonNextAct${i}"><img src="img/slider-next.png"></button>`;
                }
                div.innerHTML = `Exemple `;
                MM.zooms['zsample'+i] = new Zoom('zsample'+i, "#sampleSlide"+i, true, "em", facteurZoom, 'zs'+i);
                div.appendChild(MM.zooms['zsample'+i].createCursor());
                div.innerHTML += `<div class="slider-nav">
            <button title="Annoter l'exemple" id="btn-sample-annotate${i}"><img src="img/iconfinder_pencil_1055013.png"></button>
            <button title="Montrer la réponse" id="btn-sample-showanswer${i}"><img src="img/slider-solution.png"></button>
            <button title="Autre exemple" id="btn-newsample${i}"><img src="img/newsample.png"></button>
            ${nextActivity}
            <button title="Démarrer le diaporama" id="btn-sample-start${i}"><img src="img/fusee.png"></button>
            </div>`;
                let divContent = utils.create("div",{className:"slide",id:"sampleSlide"+i});
                let span = utils.create("span",{id:"sample"+i+"-enonce"});
                let spanAnswer = utils.create("span",{id:"sample"+i+"-corr",className:"hidden"});
                divContent.appendChild(span);
                divContent.appendChild(spanAnswer);
                div.appendChild(divContent);
                // math or not ?
                // insert content
                divSample.appendChild(div);
            }
            container.appendChild(divSample);
            // ajout des données dans les emplacements
            for(let i=0;i<MM.carts.length;i++){
                for(let y=0;y<MM.carts[i].target.length;y++){
                    let sN = MM.carts[i].target[y]-1;
                    let act = MM.carts[i].activities[0];
                    document.getElementById("sample"+sN+"-enonce").innerHTML = act.sample.question;
                    document.getElementById("sample"+sN+"-corr").innerHTML = act.sample.answer;
                    if(act.type === undefined || act.type==="" || act.type === "latex"){
                        document.getElementById("sample"+sN+"-enonce").className = "math";
                        document.getElementById("sample"+sN+"-corr").className += " math";
                    }
                    if(act.sample.figure !== undefined){
                        let fig = new Figure(utils.clone(act.sample.figure), "sample-c"+sN, document.getElementById("sampleSlide"+sN));
                        setTimeout(function(){fig.display();},100);
                    }
                }
            }
            utils.mathRender();
        },
        showQuestions:function(){
            if(!MM.carts[0].activities.length)
                MM.carts[0].addActivity(MM.editedActivity);
            MM.createSlideShows();
            MM.setSeed();
            MM.populateQuestionsAndAnswers();
            MM.showTab(document.querySelector("[numero='#tab-enonce'].tabs-menu-link"));
            if(MM.carts.length === 1 && MM.carts[0].activities.length === 1){
                MM.resetCarts();
                MM.editedActivity.display();
            }
        },
        showAnswers:function(){
            if(!MM.carts[0].activities.length)
                MM.carts[0].addActivity(MM.editedActivity);
            MM.createSlideShows();
            MM.setSeed();
            MM.populateQuestionsAndAnswers();
            MM.showTab(document.querySelector("[numero='#tab-corrige'].tabs-menu-link"));
            if(MM.carts.length === 1 && MM.carts[0].activities.length === 1){
                MM.resetCarts();
                MM.editedActivity.display();
            }    
        },
        /**
         * 
         * 
         */
        createSlideShows:function(){
            MM.zooms={};
            MM.zooms["thezoom"] = new Zoom("thezoom","#slideshow .slide", true);
            let insertTo = document.querySelector("#slideshow-container header");
            let ispresent = insertTo.querySelector("#thezoom");
            if(ispresent){
                insertTo.removeChild(ispresent);
            }
            insertTo.appendChild(MM.zooms["thezoom"].createCursor());
            // pour compenser une erreur abominable créée lors de la création des urls.
            if(isNaN(MM.slidersNumber)){
                // on va checker le slidersNumber d'après les paniers
                let nb = 0;
                for(let i=0;i<MM.carts.length;i++){
                    nb+=MM.carts[i].target.length;
                }
                if(nb<5)MM.slidersNumber = nb;
            }
            let nb = MM.slidersNumber;
            let container = document.getElementById("slideshow");
            container.innerHTML = "";
            if(MM.slidersOrientation === "v")utils.addClass(container,"vertical");
            else utils.removeClass(container,"vertical");
            if(MM.faceToFace==="y") utils.addClass(container,"return");
            else utils.removeClass(container,"return");
            let facteurZoom = 1;
            for(let i=0;i<nb;i++){
                let div = document.createElement("div");
                div.id = "slider"+i;
                if(nb === 1){div.className = "slider-1";facteurZoom=3;}
                else if(nb===2){div.className = "slider-2";facteurZoom=2;}
                else  {div.className = "slider-34";}
                // facetoface option
                /*if(nb>1 && MM.faceToFace==="y" && i===0)div.className += " return";
                else if(nb>2 && MM.faceToFace==="y" && i===1)div.className +=" return";*/
                let innerH = `<div class="slider-head"><div class="slider-nav">
            <button title="Arrêter le diaporama" id="btn-timer-end${i}"><img src="img/slider-stop.png" /></button>`;
                if(MM.onlineState==="no"){
                    // créer les boutons de pause et montrer réponse si on n'est pas en mode online
                    innerH += `<button title="Mettre le diapo en pause", id="btn-timer-pause${i}"><img src="img/slider-pause.png" /></button>
                <button title="Montrer la réponse" id="btn-show-answer${i}"><img src="img/slider-solution.png" /></button>`;
                }
                MM.zooms["zs"+i] = new Zoom("zs"+i,"#slider"+i+" .slide",false,"em",facteurZoom);
                let zoom = MM.zooms["zs"+i].createCursor();
                innerH += `<button title="Passer la diapo" id="btn-next-slide${i}"><img src="img/slider-next.png" /></button>
            </div>
            <div class="slider-title"></div>
            <div class="slider-chrono"><progress class="progress is-link is-large" value="0" max="100"></progress></div></div>
            <div class="steps-container"></div>`;
                div.innerHTML = innerH;
                div.querySelector(".slider-head").appendChild(zoom);
                container.appendChild(div);
            }
        },
        showSlideShows:function(){
            utils.removeClass(document.getElementById("slideshow-container"),"hidden");
            utils.addClass(document.getElementById("app-container"), "hidden");
            if(sound.selected){sound.play();}
            if(!utils.isEmpty(MM.figs)){
                MM.displayFirstFigs();
            }
        },
        displayFirstFigs:function(){
            for(let i=0;i<4;i++){
                if(typeof MM.figs[i+"-0"] === "object"){
                    MM.figs[i+"-0"].display();
                }
            }
        },
        hideSlideshows:function(){
            if(this.ended)return false; // on l'a déjà fait
            utils.addClass(document.getElementById("slideshow-container"),"hidden");
            utils.removeClass(document.getElementById("app-container"), "hidden");
            let whatToDo = utils.getRadioChecked("endOfSlideRadio");
            if(MM.onlineState === "yes"){
                // on affiche un message de fin qui attend une validation
                let alert = utils.create("div",{id:"messagefin",className:"message",innerHTML:`L'activité MathsMentales est terminée.<br>Pour consulter les résultats, cliquer sur le bouton ci-dessous.<br><br>
            <button id="btn-messagefin-close"> Voir le corrigé 
            </button>`});
                document.body.appendChild(alert);
                document.body.addEventListener("click",(evt)=>{if(evt.target.id==="btn-messagefin-close"){MM.closeMessage('messagefin');MM.showTab('tab-corrige');}});
            } else if(whatToDo === "correction"){
                MM.showTab("tab-corrige");
            } else if(whatToDo === "list"){
                MM.showTab("tab-enonce");
            }
            this.ended=true;
        },
        /**
         * Montre la réponse si l'une est indiquée (ne l'est pas pour un élève)
         * @param {Integer} id id du slide où afficher la réponse
         * @returns nothing
         */
        showTheAnswer(id, pause=true){
            let answerToShow = document.querySelector("#slide"+id+"-"+MM.steps[id].step+" .answerInSlide");
            if(!answerToShow)return;

            if(answerToShow.className.indexOf("hidden")>-1){
                if(!MM.timers[id].break && pause) MM.timers[id].pause();
                else if(pause) MM.timers[id].stop();
                utils.removeClass(answerToShow, "hidden");
            } else {
                utils.addClass(answerToShow, "hidden");
                if(pause) MM.timers[id].start();
            }
        },
        showSampleAnswer(id){
            let answerToShow = document.getElementById("sample"+id+"-corr");
            if(answerToShow.className.indexOf("hidden")>-1){
                utils.removeClass(answerToShow, "hidden");
            }else {
                utils.addClass(answerToShow, "hidden");
            }
        },
        /**
         * 
         * @param {id} id id de l'emplacement de l'exemple
         * @param {boolean} next passe à l'activité suivante du panier.
         */
        newSample(id,next=false){
            // suppression de l'annotation si en cours.
            this.annotateThisThing(false);
            for(let i=0,len=MM.carts.length;i<len;i++){
                if(MM.carts[i].target.indexOf(id+1)>-1){
                    let nbActivities = MM.carts[i].activities.length;
                    let actId = 0;
                    // si le panier contient plusieurs activités,
                    // on regarde l'id de l'activité à afficher.
                    if(MM.carts[i].activities.length>1){
                        actId = document.getElementById("ButtonNextAct"+id).dataset.actid;
                        if(next){
                            actId++;
                            if(actId>=nbActivities) actId=0;
                            document.getElementById("ButtonNextAct"+id).dataset.actid = actId;
                        }
                    }
                    let act = MM.carts[i].activities[actId];
                    act.generateSample();
                    document.getElementById("sample"+id+"-enonce").innerHTML = act.sample.question;
                    document.getElementById("sample"+id+"-corr").innerHTML = act.sample.answer;
                    if(act.type === undefined || act.type==="" || act.type === "latex"){
                        document.getElementById("sample"+id+"-enonce").className = "math";
                        document.getElementById("sample"+id+"-corr").className += " math";
                    }
                    if(act.sample.figure !== undefined){
                        let item;
                        if(act.sample.figure.type === "chart"){
                            item = document.getElementById("div-dest-canvas-sample-c"+id);
                        }else {
                            item = document.getElementById("sample-c"+id);
                        }
                        item.parentNode.removeChild(item);
                        let fig = new Figure(utils.clone(act.sample.figure), "sample-c"+id, document.getElementById("sampleSlide"+id));
                        setTimeout(function(){fig.display();},100);
                    }
                    utils.mathRender();
                }
            }
        },
        removeSample(){
            let item = document.getElementById("sampleLayer");
            item.parentNode.removeChild(item);
        },
        startSlideShow(){
            MM.removeSample();
            if(MM.onlineState === "yes") { // create inputs for user
                MM.createUserInputs();
            }
            if(MM.onlineState === "yes" && !MM.touched){
                document.getElementById("ansInput0-0").focus();
            }
            if(MM.introType === ("example-321")){ // case with 
                document.getElementById("countdown-container").className = "";
                if(sound.selected){
                    setTimeout(()=>{sound.beeps();},800);
                    setTimeout(()=>{sound.setSound(sound.selected);},3500);
                }
                setTimeout(function(){
                    document.getElementById("countdown-container").className = "hidden";
                    if(MM.onlineState === "yes") { // create inputs for user
                        MM.createUserInputs();
                    }
                    MM.showSlideShows();
                    MM.startTimers();
                },3600);
            } else {
                MM.startTimers();
            }
        },
        /**
         * 
         * @param {integer} id du slider (start to 0)
         */
        nextSlide:function(id){
            if(MM.onlineState === "yes"){ // save answer
                MM.userAnswers[id][MM.steps[id].step] = MM.mf["ansInput"+id+"-"+(MM.steps[id].step)].value;
            }
            if(MM.carts[MM.timers[id].cartId].progress === 'thenanswer'){
                if(!MM.timers[id].answerShown){
                    MM.showTheAnswer(id, false);
                    MM.timers[id].answerShown = true;
                    return
                }
            }
            let step = MM.steps[id].nextStep();
            if(step === false) {
                MM.timers[id].end();
                return false;
            }
            // joue le son si un seul panier
            if(MM.carts.length === 1){
                sound.play();
            }
            MM.timers[id].start(step);
            let slidetoHide = document.querySelector('#slide'+id+"-"+(step-1));
            let slide = document.querySelector('#slide'+id+"-"+step);
            utils.addClass(slidetoHide, "hidden");
            if(slide){
                    utils.removeClass(slide, "hidden");
                if(MM.figs[id+"-"+step] !== undefined)
                    MM.figs[id+"-"+step].display();
                if(MM.onlineState === "yes" && !MM.touched){
                    // on met le focus dans le champ seulement si on est online et pas sur tablette/smartphone
                    //document.getElementById("userAnswer"+step).focus();
                    MM.mf["ansInput"+id+"-"+step].focus();
                } else if(MM.onlineState === "yes" && MM.touched){
                    // on affiche le clavier quand on a un appareil touchable
                    MM.mf["ansInput"+id+"-"+step].focus();
                }
                if(MM.text2speach[step]!==undefined){
                    MM.speech.speak(MM.text2speach[step]);
                }
            }
        },
        messageEndSlide:function(id,nth){
            // TODO : revoir le truc pour ne pas empiéter sur le dernière slide (ou pas)
            let sliderMessage = document.querySelectorAll('#slider'+id+" .slide")[nth];
            sliderMessage.innerHTML = "<span>Fin du diaporama</span>";
            //utils.removeClass(sliderMessage,"hidden");
        },
        endSliders:function(){
            if(MM.text2speach.length)
                MM.speech.stop();
            let ended = true;
            // check if all timers have ended
            for(let i=0, l=MM.timers.length;i<l;i++){
                if(MM.timers[i].ended === false)
                    ended = false;
            }
            if(ended){
                // tous les slides sont terminés
                MM.hideSlideshows();
                // correction si online
                if(MM.onlineState === "yes"){
                    let div = document.createElement("div");
                    // correction
                    // attention, les questions ont pu être mélangées, on va donc devoir associer correctement les réponses/questions
                    // les réponses sont données dans l'ordre, mais pas les questions.
                    // 1 utilisateur = un actArray
                    for(let slider=0,len=MM.carts[0].actsArrays.length;slider<len;slider++){
                        let score = 0;
                        let ol = document.createElement("ol");
                        ol.innerHTML = "<b>Réponses de "+(slider+1)+"</b>";
                        let ia = 0;
                        // pour un target, on a l'ordre des activités et des réponses.
                        for(let slide=0,len2=MM.carts[0].actsArrays[slider].length;slide<len2;slide++){
                            if(MM.userAnswers[slider][ia] === undefined)break;
                            let refs = MM.carts[0].actsArrays[slider][slide];
                            let li = document.createElement("li");
                            let span = document.createElement("span");
                            let userAnswer = MM.userAnswers[slider][ia].replace(",",".").trim();// on remplace la virgule française par un point, au cas où
                            if(userAnswer.indexOf("\\text")===0){
                                userAnswer = userAnswer.substring(6,userAnswer.length-1);
                            }
                            // remplacer un espace texte par un espace
                            userAnswer = userAnswer.replace("\\text{ }"," ");
                            userAnswer = userAnswer.replace(">","\\gt");
                            userAnswer = userAnswer.replace("<","\\lt");
                            const expectedAnswer = MM.goodAnswers[slider][refs[0]][refs[1]];//MM.carts[0].activities[refs[0]].values[refs[1]];
                            let valueType = MM.carts[0].activities[refs[0]].valueType;
                            // console.log(userAnswer,expectedAnswer);
                            // TODO : better correction value
                            // prendre en compte les cas où plusieurs réponses sont possibles
                            // attention, si c'est du texte, il faut supprimer des choses car mathlive transforme 
                            if(Array.isArray(expectedAnswer)){
                                for(const oneExpected of expectedAnswer){
                                    if(String(userAnswer).toLowerCase()==String(oneExpected).toLowerCase()){
                                        li.className = "good";
                                        score++;
                                        break;
                                    } else {
                                        const expr1 = KAS.parse(oneExpected).expr;
                                        const expr2 = KAS.parse(String(userAnswer).replace('²', '^2')).expr;
                                        try{
                                            if(KAS.compare(expr1,expr2,{form:true,simplify:false}).equal){
                                            // use KAS.compare for algebraics expressions.
                                            li.className = "good";
                                            score++;
                                            break;
                                        } else {
                                            li.className = "wrong";
                                        }
                                        } catch(error){
                                            li.className = "wrong";
                                        }
                                    }
                                }
                            } else if(valueType !== false){
                                // confrontation de listes séparées par des ;
                                if(valueType === "liste"){
                                    let arrayUser = userAnswer.split(";").map(value=>value.trim()).sort((a,b)=>a-b);
                                    let arrayExpected = expectedAnswer.split(";").map(value=>value.trim()).sort((a,b)=>a-b);
                                    // comparons les contenus en transformant en une chaine
                                    if(arrayUser.toString()===arrayExpected.toString()){
                                        li.className = "good";
                                        score++;
                                    } else {
                                        li.className = "wrong";
                                    }
                                } else if(valueType === "inInterval"){
                                    // ici la valeur doit être comprise entre les deux bornes de l'intervalle
                                    let minmax = expectedAnswer.split("-").map(value=>Number(value));
                                    //minmax[0] est la borne inf et minmax[1] est la borne sup;
                                    if(Number(userAnswer)>minmax[0] && Number(userAnswer) < minmax[1]){
                                        li.className = "good";
                                        score++;
                                    } else {
                                        li.className = "wrong";
                                    }
                                }
                            } else {
                                if(String(userAnswer).toLowerCase()==String(expectedAnswer).toLowerCase()){
                                    li.className = "good";
                                    score++;
                                } else if(String(expectedAnswer).indexOf(',')>0){
                                    const expetedAnswersArray = expectedAnswer.split(',');
                                    for(const oneExpected of expetedAnswersArray){
                                        if(String(userAnswer).toLowerCase()==String(oneExpected).toLowerCase()){
                                            li.className = "good";
                                            score++;
                                            break;
                                        } else {
                                            const expr1 = KAS.parse(oneExpected).expr;
                                            const expr2 = KAS.parse(String(userAnswer).replace('²', '^2')).expr;
                                            try{
                                                if(KAS.compare(expr1,expr2,{form:true,simplify:false}).equal){
                                                // use KAS.compare for algebraics expressions.
                                                li.className = "good";
                                                score++;
                                                break;
                                            } else {
                                                li.className = "wrong";
                                            }
                                            } catch(error){
                                                li.className = "wrong";
                                            }
                                        }
                                    }
                                } else {
                                    const expr1 = KAS.parse(expectedAnswer).expr;
                                    const expr2 = KAS.parse(String(userAnswer).replace('²', '^2')).expr;
                                    try{
                                        if(KAS.compare(expr1,expr2,{form:true,simplify:false}).equal){
                                            // use KAS.compare for algebraics expressions.
                                            li.className = "good";
                                            score++;
                                        } else {
                                            li.className = "wrong";
                                        }
                                    } catch(error){
                                        li.className = "wrong";
                                    }
                                }
                            }
                            if(li.className === '') li.className = 'wrong';
                            // On transforme ça en champ LaTeX à afficher (vient mathlive qui renvoie du LaTeX)
                            span.className ="math";
                            userAnswer = "\\displaystyle "+userAnswer;
                            span.textContent = userAnswer;
                            ia++;
                            li.appendChild(span);
                            ol.appendChild(li);
                        }
                        div.appendChild(ol);
                        let section = document.createElement("section");
                        section.innerHTML = "<b>Score :</b> "+score+"/"+ia;
                        div.appendChild(section);
                        //envoi d'un message au site qui a intégré MM :
                        if(MM.embededIn){
                            window.parent.postMessage({ url: window.location.href, graine: MM.seed, nbBonnesReponses: score, nbMauvaisesReponses: parseInt(ia) - parseInt(score), slider: slider, touchable:MM.touched }, MM.embededIn);
                        }
                    }
                    document.getElementById("corrige-content").appendChild(div);
                    // Mise en forme Maths
                    utils.mathRender();
                } else {
                    if(MM.embededIn){
                        window.parent.postMessage({ url: window.location.href, graine: MM.seed}, MM.embededIn);
                    }
                }
                // if only one activity in one cart, we empty it
                // TODO : why do that ?
                if(MM.carts.length === 1 && MM.carts[0].activities.length === 1){
                    MM.showCart(1);
                    MM.editActivity(0);
                }
            }
        },
        pauseAllSliders(){
            // on permet de mettre en pause uniquement si on n'est pas en mode online.
            if(MM.onlineState === "no"){
                for(let i=0,l=MM.timers.length; i<l;i++){
                    MM.timers[i].pause();
                }
            }
        },
        stopAllSliders:function(){
            for(let i=0,l=MM.timers.length; i<l;i++){
                MM.timers[i].end();
            }
            if(MM.text2speach.length){
                MM.speech.stop();
            }
        },
        nextAllSliders:function(){
            for(let i=0,l=MM.steps.length;i<l;i++){
                MM.nextSlide(i);
            }
        },
        setMinimalDisposition:function(index){
            let radios = document.querySelectorAll("input[name='Enonces']");
            for(let i=0,l=radios.length;i<l;i++){
                if(i<index){
                    radios[i].disabled = true;
                } else {
                    radios[i].disabled = false;
                }
                if(i===index && MM.slidersNumber<=index+1){
                    radios[i].checked = true;
                    MM.setDispositionEnonce(index+1);
                }
            }
        },
        /**
         * déclenché par les boutons radio
         * règle l'affichage des disposition dans la fenêtre de paramétrage
         * et indique aux paniers où s'afficher
         * @param {integer} value Nombre de diaporamas à afficher
         */
        setDispositionEnonce:function(value){
            value = Number(value);
            MM.slidersNumber = value;
            document.getElementById("facetofaceOption").className = "";
            if(value>1){
                // si plusieurs diapos, on rend l'audio indisponible
                MM.setAudio(0);
            }
            if(value === 1){
                document.getElementById("sddiv1").className = "sddiv1";
                document.getElementById("sddiv2").className = "hidden";
                document.getElementById("sddiv3").className = "hidden";
                document.getElementById("sddiv4").className = "hidden";
                document.getElementById("divisionsOption").className = "hidden";
                MM.setDispositionDoubleEnonce('h');
                MM.carts[0].target = [1];
                document.getElementById("facetofaceOption").className = "hidden";
            } else if(value === 2){
                let directions = document.querySelectorAll("input[name='direction']");
                if(directions[0].checked){ // horizontal
                    MM.setDispositionDoubleEnonce('h');
                } else {
                    MM.setDispositionDoubleEnonce('v');
                }
                if(MM.faceToFace === "y")
                    document.getElementById("sddiv1").className = "sddiv2 return";
                else
                    document.getElementById("sddiv1").className = "sddiv2";
                document.getElementById("sddiv2").className = "sddiv2";
                document.getElementById("sddiv3").className = "hidden";
                document.getElementById("sddiv4").className = "hidden";
                document.getElementById("divisionsOption").className = "";
                if(value > MM.carts.length){
                    MM.carts[0].target = [1,2];
                } else {
                    MM.carts[0].target = [1];
                    MM.carts[1].target = [2];
                }
            } else if(value === 3){
                if(MM.faceToFace === "y"){
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
                if(MM.carts.length === 1){
                    MM.carts[0].target = [1,2,3];
                } else if(MM.carts.length === 2){
                    MM.carts[0].target = [1,2];
                    MM.carts[1].target = [3];
                } else {
                    MM.carts[0].target = [1];
                    MM.carts[1].target = [2];
                    MM.carts[2].target = [3];
                }
            } else if(value === 4){
                if(MM.faceToFace === "y"){
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
                if(MM.carts.length === 1){
                    MM.carts[0].target = [1,2,3,4];
                } else if(MM.carts.length === 2){
                    MM.carts[0].target = [1,2];
                    MM.carts[1].target = [3,4];
                } else if(MM.carts.length === 3){
                    MM.carts[0].target = [1,2];
                    MM.carts[1].target = [3];
                    MM.carts[2].target = [4];
                } else {
                    MM.carts[0].target = [1];
                    MM.carts[1].target = [2];
                    MM.carts[2].target = [3];
                    MM.carts[3].target = [4];
                }
            }
            for(let i = 0,l=MM.carts.length;i<l;i++){
                MM.carts[i].display();
            }
        },
        setDispositionDoubleEnonce:function(option){
            if(option === "h"){
                MM.slidersOrientation = "h";
                document.getElementById("screen-division").className = "";
                document.querySelector("input[name='direction'][value='h']").checked = true;
            } else {
                MM.slidersOrientation = "v";
                document.getElementById("screen-division").className = "vertical";
                document.querySelector("input[name='direction'][value='v']").checked = true;
            }
        }
    };

    class speech {
        constructor(lang='fr-FR'){
            this.exists = this.test();
            this.lang = lang;
            this.text = "";
            this.times = 1;
            this.timeout = false;
            this.voices = false;
            this.initialize();
        }
        // teste l'existence du moteur speech
        test(){
            if("speechSynthesis" in window){
                return true;
            } else return false;
        }
        initialize(){
            if(!this.exists)return;
            this.voices = speechSynthesis.getVoices();
            //this.voice = this.voices[0]
        }
        generateSelectOptions(selectDOMObj){
            this.initialize();
            this.voices.forEach((val,i)=>{
                let name = val.name.toLowerCase();
                if(name.indexOf("french")>-1 || val.lang.indexOf("fr")>-1){
                    let option = utils.create("option",{innerHTML:val.name,value:i});
                    selectDOMObj.appendChild(option);
                }
            });
            return this.voices.length;
        }
        speak(text=this.text,stop=true){
            if(!this.exists)return;
            if(Array.isArray(text)){
                this.times = text[1];
                this.text = text[0];
            } else {
                this.text = text;
            }
            let msg = new SpeechSynthesisUtterance();
            msg.voice = this.voice;
            msg.text = this.text;
            if(speechSynthesis.speaking && stop){
                if(this.timeout){
                    clearTimeout(this.timeout);
                    this.timeout = false;
                }
                speechSynthesis.cancel();
            }
            speechSynthesis.speak(msg);
            msg.onend = ()=>{
                this.times--;
                if(this.times>0)
                    this.timeout = setTimeout(()=>{speechSynthesis.speak(msg);},1500);
            };
            return false;
        }
        setVoice(id){
            id = Number(id);
            if(id>this.voices.length-1) return false;
            this.voice = this.voices[id];
        }
        setText(text){
            this.text = text.replace("-"," moins ");
            this.text = this.text.replace(")/(",")sur(");
        }
        stop(){
            if(speechSynthesis.speaking){
                clearTimeout(this.timeout);
                this.timeout = false;
                speechSynthesis.cancel();
            }
        }
    }

    //import theactivities from './mods/theactivities.js';
    window.onload = function(){
        let scripturl = document.getElementById("mmscriptid").attributes.src.value;
        /*get value from query parameters*/
        MM.version = scripturl.replace(/\|/g,'/').slice(scripturl.indexOf('?') + 3);
        // detect if touching interface
        let listener = function(evt){
            // the user touched the screen!
            MM.touched = true;
            window.removeEventListener('touchstart',listener,false);
        };
        window.addEventListener('touchstart',listener,false);
        // for ascii notations, used by math parser
        //MM.ascii2tex = new AsciiMathParser();
        MM.resetCarts();
        // interface
        let tabsButtons = document.querySelectorAll("#header-menu .tabs-menu-link");
        tabsButtons.forEach(element => {
            element.onclick = function(){MM.showTab(element);};
        });
        document.getElementById("btnaccueil").onclick = function(element){
            MM.showTab(element.target);
        };
        MM.checkValues();
        MM.initializeAlea(Date());
        library.openContents();
        sound.getPlayer();
        // put the good default selected
        document.getElementById("chooseParamType").value = "paramsdiapo";
        // to show de good checked display
        MM.setDispositionEnonce(utils.getRadioChecked("Enonces"));
        // take history if present
        if(window.localStorage){
            if(localStorage.getItem("history"))
                document.querySelector("#tab-historique ol").innerHTML = localStorage.getItem("history").replace(/onclick="utils\.checkurl\(this.dataset\['url'\]\,false\,true\)"/gi,"");
        }
        MM.zoom = new Zoom("thezoom","#slideshow .slide");
        document.querySelector("#slideshow-container header").appendChild(MM.zoom.createCursor());
        // ajout des pickers de colors
        for(let i=0;i<4;i++){
            let leparent = document.getElementById("sddiv"+(i+1));
            MM.colorSelectors[i] = new Picker({parent:leparent,color:'#FFFFFF'});
            MM.colorSelectors[i].onChange = function(color){
                leparent.style.background = color.rgbaString;
                MM.colors[i] = color.rgbaString;
            };
        }
        document.querySelector("input[name='online'][value='no']").checked = true;
        // events sur les boutons
        // open Menu sur smartphone
        document.getElementById('openMenuButton').onclick = () => {
            document.getElementById('nav-menu-niveaux').classList.toggle('hidden-phone');
            document.getElementById('header-menu').classList.toggle('hidden-phone');
        };
        document.querySelectorAll('#nav-menu-niveaux > ul > li a').forEach((el) => {
            el.onclick = (evt)=>{
                document.querySelectorAll('#nav-menu-niveaux > ul > li > ul').forEach(elem => {
                    elem.classList.remove('show');
                });
                evt.target.parentNode.querySelector('ul').classList.add('show');
            };
        });
        // menus
        const lis = document.querySelectorAll("#nav-menu-niveaux li li");
        for(const li of lis){
            li.onclick = (evt)=>{
                library.displayContent(evt.target.dataset.niv,true);
                document.querySelectorAll('#nav-menu-niveaux > ul > li > ul').forEach(elem => {
                    elem.classList.remove('show');
                });
            };
        }
        // ouvrons l'interface des paniers pour que tout le monde sache qu'il y en a !
        MM.showCartInterface();
        // boutons de gestion d'activité dans le panier
        document.getElementById("addToCart").onclick = ()=>{MM.addToCart();};
        document.getElementById("unlinkCart").onclick = ()=>{MM.unlinkActivity();};
        document.getElementById("removeFromCart").onclick = ()=>{MM.removeFromCart();};
        document.getElementById("tempo-slider").oninput = (evt)=>{if(evt.target.value<2)evt.target.value=0;MM.changeTempoValue(evt.target.value);};
        document.getElementById("tempo-slider").onchange=()=>{MM.carts[MM.selectedCart].display();};
        document.getElementById("nbq-slider").oninput = (evt)=>{MM.changeNbqValue(evt.target.value);};
        document.getElementById("nbq-slider").onchange = ()=>{MM.carts[MM.selectedCart].display();};
        // radio orientation séparation
        document.getElementById("radiodir1").onclick = ()=>{MM.setDispositionDoubleEnonce('h');};
        document.getElementById("radiodir2").onclick = ()=>{MM.setDispositionDoubleEnonce('v');};
        // radio intro diaporama
        document.getElementById("radiobeforeslider1").onclick = (evt)=>{MM.setIntroType(evt.target.value);};
        document.getElementById("radiobeforeslider2").onclick = (evt)=>{MM.setIntroType(evt.target.value);};
        document.getElementById("radiobeforeslider3").onclick = (evt)=>{MM.setIntroType(evt.target.value);};
        document.getElementById("playerlist").oninput = (evt)=>{sound.select(evt.target.value);};
        // panier 1
        document.getElementById("btncartclose1").onclick=()=>{MM.emptyCart(1);};
        document.getElementById("titlecart1").onblur = (evt)=>{MM.carts[0].title = evt.target.innerText;};
        document.getElementById("imgordercart1").onclick = (evt)=>{MM.carts[0].changeOrder(evt.target);};
        document.getElementById("progress-cart1").onclick = (evt)=>{MM.carts[0].changeProgress(evt.target);};
        document.getElementById("imgduplicatecart1").onclick = ()=>{MM.carts[0].duplicate();};
        // panier 2
        document.getElementById("btncartdelete2").onclick=()=>{MM.removeCart(2);};
        document.getElementById("btncartclose2").onclick=()=>{MM.emptyCart(2);};
        document.getElementById("titlecart2").onblur = (evt)=>{MM.carts[1].title = evt.target.innerText;};
        document.getElementById("imgordercart2").onclick = (evt)=>{MM.carts[1].changeOrder(evt.target);};
        document.getElementById("progress-cart2").onclick = (evt)=>{MM.carts[1].changeProgress(evt.target);};
        document.getElementById("imgduplicatecart2").onclick = ()=>{MM.carts[1].duplicate();};
        // panier 3
        document.getElementById("btncartdelete3").onclick=()=>{MM.removeCart(3);};
        document.getElementById("btncartclose3").onclick=()=>{MM.emptyCart(3);};
        document.getElementById("titlecart3").onblur = (evt)=>{MM.carts[2].title = evt.target.innerText;};
        document.getElementById("imgordercart3").onclick = (evt)=>{MM.carts[2].changeOrder(evt.target);};
        document.getElementById("progress-cart3").onclick = (evt)=>{MM.carts[2].changeProgress(evt.target);};
        document.getElementById("imgduplicatecart3").onclick = ()=>{MM.carts[2].duplicate();};
        // panier 4
        document.getElementById("btncartdelete4").onclick=()=>{MM.removeCart(4);};
        document.getElementById("btncartclose4").onclick=()=>{MM.emptyCart(4);};
        document.getElementById("titlecart4").onblur = (evt)=>{MM.carts[3].title = evt.target.innerText;};
        document.getElementById("progress-cart4").onclick = (evt)=>{MM.carts[3].changeProgress(evt.target);};
        document.getElementById("imgordercart4").onclick = (evt)=>{MM.carts[3].changeOrder(evt.target);};
        // radio online
        document.getElementById("radioonline1").onclick = (evt)=>{MM.setOnlineState(evt.target.value);};
        document.getElementById("radioonline2").onclick = (evt)=>{MM.setOnlineState(evt.target.value);};
        // radio nb d'énoncés
        document.getElementById("radionbenonces1").onclick = ()=>{MM.setDispositionEnonce(1);};
        document.getElementById("radionbenonces2").onclick = ()=>{MM.setDispositionEnonce(2);};
        document.getElementById("radionbenonces3").onclick = ()=>{MM.setDispositionEnonce(3);};
        document.getElementById("radionbenonces4").onclick = ()=>{MM.setDispositionEnonce(4);};
        // radio face to face
        document.getElementById("radioftf1").onclick = ()=>{MM.setFacetoFace('n');};
        document.getElementById("radioftf2").onclick = ()=>{MM.setFacetoFace('y');};
        // radio fin de diaporama
        document.getElementById("radioendslider1").onclick = (evt)=>{MM.setEndType(evt.target.value);};
        document.getElementById("radioendslider2").onclick = (evt)=>{MM.setEndType(evt.target.value);};
        document.getElementById("radioendslider3").onclick = (evt)=>{MM.setEndType(evt.target.value);};
        // radio audio
        MM.speech = new speech();
        if(MM.speech.exists){
            document.getElementById("radioaudioon").onclick = (evt)=>{MM.setAudio(evt.target.value);};
            document.getElementById("radioaudiooff").onclick = (evt)=>{MM.setAudio(evt.target.value);};
            document.getElementById("audiorepeat").oninput = (evt)=>{MM.setAudioRepetitions(evt.target.value);};
            let select = document.getElementById("selectVoice");
            if(!MM.speech.generateSelectOptions(select)){
                // création d'un bouton de génération car obligation d'interagir avec le navigateur pour générer
                let button = utils.create("button",{innerHTML:'🎶', title:'Cliquer pour détecter les langues disponibles'});
                button.onclick = (evt)=>{
                    MM.speech.generateSelectOptions(select);
                    evt.target.parentNode.removeChild(evt.target);
                };
                document.getElementById("voix").appendChild(button);
            }
            select.onchange = (ev)=>{
                MM.speech.setVoice(ev.target.value);
                MM.audioSamples.forEach(val=>{
                    MM.speech.speak(val,false);
                });
            };
            document.getElementById("btntestreader").onclick = ()=>{
                if(!select.hasChildNodes()){
                    MM.speech.initialize();
                    MM.speech;
                }
                MM.audioSamples.forEach(val=>{
                    MM.speech.speak(val,false);
                });
            };
            document.getElementById("btnstopreader").onclick = ()=>{
                MM.speech.stop();
            };
        }
        // boutons démarrage
        document.getElementById("btnstart").onclick = ()=>{MM.start();};
        document.getElementById("btnenonces").onclick = ()=>{MM.showQuestions();};
        document.getElementById("btnreponses").onclick = ()=>{MM.showAnswers();};
        document.getElementById("btnadresse").onclick = ()=>{MM.copyURL();};
        document.getElementById("btncopytohistoric").onclick = ()=>{MM.copyURLtoHistory();};
        // bouton d'inclusion de la variable aléatoire
        document.getElementById("aleaInURL").onchange = ()=>{MM.setSeed("checkSwitched");};
        // boutons génération documents
        document.getElementById("chooseParamType").onchange = (evt)=>{MM.showParameters(evt.target.value);};
        // fiche d'exercices
        document.getElementById("btngeneratesheet").onclick = ()=>{MM.createExercicesSheet();};
        document.getElementById("btn-ex-adresse").onclick = ()=>{MM.copyURL('exosheet');};
        document.getElementById("btn-ex-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('exosheet');};
        document.getElementById("extitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value;};
        // interros
        document.getElementById("btngenerateexams").onclick = ()=>{MM.createExamSheet();};
        document.getElementById("btn-exam-adresse").onclick = ()=>{MM.copyURL('exam');};
        document.getElementById("btn-exam-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('exam');};
        document.getElementById("inttitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value;};
        // ceintures
        document.getElementById("ceintcolsval").oninput = (evt)=>{document.getElementById('ceintcols').innerHTML=evt.target.value;utils.createCeintureTitres(evt.target.value);};
        document.getElementById("ceintrowsval").oninput = (evt)=>{document.getElementById('ceintrows').innerHTML=evt.target.value;};
        document.getElementById("ceintqtyvalue").oninput = (evt)=>{document.getElementById('ceintqty').innerHTML=evt.target.value;};
        document.getElementById("btngenerateceinture").onclick = ()=>{MM.createCeintureSheet();};
        document.getElementById("btn-ceinture-adresse").onclick = ()=>{MM.copyURL('ceinture');};
        document.getElementById("btn-ceinture-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('ceinture');};
        document.getElementById("ceinttitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value;};
        // course au nombres
        document.getElementById("canqtyvalue").oninput = (evt)=>{document.getElementById('canqty').innerHTML=evt.target.value;};
        document.getElementById("btn-can-adresse").onclick = ()=>{MM.copyURL('cansheet');};
        document.getElementById("btn-can-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('cansheet');};
        document.getElementById("btngenerateCAN").onclick = ()=>{MM.createCourseAuxNombres();};
        document.getElementById("cantitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value;};
        // flash cards
        document.getElementById("btngenerateFC").onclick = ()=>{MM.createFlashCards();};
        document.getElementById("cardsNbValue").oninput = (evt)=>{document.getElementById('cardsNb').innerHTML=evt.target.value;};
        document.getElementById("btn-flash-adresse").onclick = ()=>{MM.copyURL('cartesflash');};
        document.getElementById("btn-flash-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('cartesflash');};
        // Panneau d'activités
        document.getElementById("btngenerateWall").onclick = ()=>{MM.createWall();};
        document.getElementById("btn-wall-adresse").onclick = ()=>{MM.copyURL('wall');};
        document.getElementById("btn-wall-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('wall');};

        // j'ai / qui a ?
        document.getElementById("btngenerateWG").onclick = ()=>{MM.createWhoGots();};
        // dominos
        document.getElementById("dominosNbValue").oninput = (evt)=>{document.getElementById('dominosNb').innerHTML=evt.target.value;};
        document.getElementById("dominosDoublons").onclick = (evt)=>{let text = document.getElementById("dominosDoublonsText"); if(evt.target.checked)text.innerHTML="Oui"; else text.innerHTML = "Non";};
        document.getElementById("dominosDoublons").checked = true;
        document.getElementById("btngenerateDominos").onclick = ()=>{MM.createDominos();};
        // duels
        document.getElementById("btn-duel-start").onclick = ()=>{MM.duelLaunch();};
        document.getElementById("btn-duel-adresse").onclick = ()=>{MM.copyURL('duel');};
        document.getElementById("btn-duel-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('duel');};
        document.getElementById("duelbackgroundselect").onchange = (evt)=>{document.getElementById("duelbg").style.backgroundImage = "url('./library/illustrations/backgrounds/bg"+evt.target.value+".jpg')";};
        document.getElementById("duelbg").style.backgroundImage = "url('./library/illustrations/backgrounds/bg"+utils.getSelectValue("duelbackgroundselect")+".jpg')";
        // boutons d'exemples
        document.getElementById("btn-annotation2").addEventListener("click", (evt)=>{
            let target = utils.getTargetWithImageInside(evt);
            MM.annotateThisThing('divparams', target.id);
        });
        document.getElementById("btn-shuffle").onclick = ()=>{MM.editedActivity.display('sample');};
        // boutons section énoncés
        document.getElementById("btn-annotation-enonce").onclick = (evt)=>{
            let target = utils.getTargetWithImageInside(evt);
            MM.annotateThisThing('enonce-content', target.id);
        };
        // zooms
        document.getElementById("enonce-content").onclick = (evt)=>{
            if(evt.target.dataset.what === "in"){
                MM.zooms[evt.target.dataset.zoom].plus();
            } else if(evt.target.dataset.what === "out"){
                MM.zooms[evt.target.dataset.zoom].minus();
            }
        };
        document.getElementById("corrige-content").onclick = (evt)=>{
            if(evt.target.dataset.what === "in"){
                MM.zooms[evt.target.dataset.zoom].plus();
            } else if(evt.target.dataset.what === "out"){
                MM.zooms[evt.target.dataset.zoom].minus();
            }
        };
        // boutons de commande 
        document.getElementById("slideshow").addEventListener("click",(evt)=>{
            let targetId = evt.target.id;
            //zooms
            if(evt.target.dataset.what === "in"){
                MM.zooms[evt.target.dataset.zoom].plus();
                if(evt.target.dataset.assoc !== ''){
                    MM.zooms[evt.target.dataset.assoc].plus();
                }
            } else if(evt.target.dataset.what === "out"){
                MM.zooms[evt.target.dataset.zoom].minus();
                if(evt.target.dataset.assoc !== ''){
                    MM.zooms[evt.target.dataset.assoc].minus();
                }
            }
            if(evt.target.nodeName.toLowerCase() === "img"){
                targetId = evt.target.parentNode.id;
            }
            for(let i=0;i<4;i++){
                switch (targetId){
                    case "ButtonNextAct"+i:
                        MM.newSample(i,true);
                        break;
                    case "btn-sample-annotate"+i:
                        MM.annotateThisThing('sampleSlide'+i,targetId);
                        break;
                    case "btn-sample-showanswer"+i:
                        MM.showSampleAnswer(i);
                        break;
                    case "btn-newsample"+i:
                        MM.newSample(i);
                        break;
                    case "btn-sample-start"+i:
                        MM.startSlideShow(i);
                        break;
                    case "btn-timer-end"+i:
                        MM.timers[i].end();
                        break;
                    case "btn-timer-pause"+i:
                        MM.timers[i].pause();
                        break;
                    case "btn-show-answer"+i:
                        MM.showTheAnswer(i);
                        break;
                    case "btn-next-slide"+i:
                        MM.nextSlide(i);
                        break;
                }    
            }
        });

        // boutons section corrigés
        document.querySelector("#tab-corrige aside").addEventListener("click",(evt)=>{
            let target = utils.getTargetWithImageInside(evt);
            switch (target.id){
                case "btn-annotation-corrige":
                    MM.annotateThisThing('corrige-content', target.id);
                    break
                case "btn-restart-otherdata":
                    MM.start();
                    break
                case "btn-restart-samedata":
                    // the true value force to restart with same datas
                    MM.start(true);
                    break
            }
        });
        // boutons section historique
        document.querySelector("#tab-historique header").addEventListener("click",(evt)=>{
            switch (evt.target.id){
                case "btnemptyhist":
                    MM.emptyHistory();
                    break
                case "btnSelectHist":
                    MM.createSelectHistory();
                    break
                case "btnsupprselhist":
                    MM.removeSelectionFromHistory();
                    break
            }
        });
        // boutons commandes générales
        document.querySelector("#slideshow-container header").onclick = (evt)=>{
            switch (evt.target.parentNode.id) {
                case "stop-all":
                    MM.stopAllSliders();
                    break;
                case "pause-all":
                    MM.pauseAllSliders();
                    break;
                case "next-all":
                    MM.nextAllSliders();
                    break;
            }
            switch (evt.target.dataset.what){
                case "in":
                    MM.zooms[evt.target.dataset.zoom].plus();
                    break;
                case "out":
                    MM.zooms[evt.target.dataset.zoom].minus();
                    break;
            }

        };
        // moteur de recherche d'activité
        document.getElementById("searchinput").onkeyup = (evt)=>{library.displayContent(evt.target.value);};
        document.getElementById("resultat-chercher").addEventListener("click",(evt)=>{
            if(evt.target.id.indexOf("rch2")===0){
                utils.deploy(evt.target);
            } else if(evt.target.id.indexOf("rch3")===0){
                utils.deploy(evt.target);
            } else if(evt.target.id.indexOf("rcli")===0){
                // clic sur une activite
                library.load(evt.target.dataset['url'],evt.target.dataset['id']);
            }
        });
        // bouton d'ajout au panier
        document.getElementById("btn-addToCart").onclick = ()=>{
            let selection = document.querySelectorAll("#resultat-chercher .checkitem:checked");
            if(selection.length > 0){
                let allActivities = [];
                let nbq = Number(document.getElementById("addToCartNbq").value);
                selection.forEach(el=>{
                    //MM.carts[0].addActivity(theactivities[el.value],nbq);
                    allActivities.push(library.loadJSON(el.dataset["url"]));
                });
                Promise.all(allActivities).then(data=>{
                    data.forEach(val=>{
                        MM.carts[0].addActivity(val,nbq);
                    });
                    let tab = document.querySelector("a[numero$='parameters'].tabs-menu-link");
                    MM.resetAllTabs();
                    utils.addClass(tab, "is-active");
                    document.getElementById("tab-parameters").style.display = "";
                    }).catch(err=>{
                    console.log(err);
                });
            } else {
                console.log("Pas d'activité à ajouter au panier");
            }
        };
        // boutons aléatorisation
        document.getElementById("btn-params-aleakey").onclick = ()=>{MM.setSeed(utils.seedGenerator());};

        /**
         * Comportements sur les éléments fixes
         */
        // Suppression comportement avant modularisation  
        document.querySelector("#tab-historique ol").addEventListener("click",(evt)=>{
            if(evt.target.innerHTML.indexOf("🛠 éditer")>-1){
                MM.checkURL(evt.target.dataset['url'],false,true);
            } else if(evt.target.innerHTML.indexOf("❌ Supprimer")>-1){
                MM.removeFromHistory(evt.target.parentNode);
            }
        });
        document.getElementById("corrige-content").addEventListener("click",(evt)=>{
            if(evt.target.innerHTML === "Figure"){
                MM.memory[evt.target.dataset.id].toggle();
            }
        });
        // évènements sur les activités dans les paniers
        for(let i=0;i<4;i++){
            document.getElementById("cart"+i+"-list").addEventListener("click",(evt)=>{
                if(evt.target.dataset.actid !== undefined){
                    MM.editActivity(evt.target.dataset.actid);
                } else if(evt.target.dataset.actidtoremove !== undefined){
                    MM.removeFromCart(evt.target.dataset.actidtoremove);
                }
            });    
        }
        /**
         * boutons paniers, images contenues dans des button
         */
        document.getElementById("cartsMenu").addEventListener("click",(evt)=>{
            let target = utils.getTargetWithImageInside(evt);
            if(target.value){
                MM.showCart(target.value);
            } else if(target.id==="addcart"){
                MM.addCart();
            }
        });
        /**
         * cases à cocher dans le choix des options d'une activité
         */
        document.getElementById('activityOptions').addEventListener("click",(evt)=>{
            if(evt.target.id==="chckallopt")
                {MM.editedActivity.setOption('all',evt.target.checked);
            } else if(evt.target.id.indexOf("o")===0){
                MM.editedActivity.setOption(evt.target.value, evt.target.checked);
            }
        });

        // load scratchblocks french translation
        // TODO : à changer au moment de l'utilisation de scratchblocks
        // doesn't work on local file :( with Chrome
        /*let reader = new XMLHttpRequest();
        reader.onload = function(){
            let json = JSON.parse(reader.responseText);
            window.scratchblocks.loadLanguages({
                fr: json});
            }
        reader.open("get", "libs/scratchblocks/fr.json", false);
        reader.send();*/
    };

})();
