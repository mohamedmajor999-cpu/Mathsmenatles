import activity from './mods/activity.js'
import MM from './mods/MM.js'
import theactivities from './mods/theactivities.js'

const activitiesIDs = []
for (const id in theactivities) {
    activitiesIDs.push(id)
}

const editorDOMElement = document.getElementById('ide')
const options = {
    modes: ['text', 'code', 'tree', 'form', 'view'],
    mode:'code',
    onEditable: function (node) {
        // node is an object like:
        //   {
        //     field: 'FIELD',
        //     value: 'VALUE',
        //     path: ['PATH', 'TO', 'NODE']
        //   }
        switch (node.field) {
            case 'ID':
                return false

            case 'title':
                return {
                    field: false,
                    value: true
                }
            case 'dest':
                return {
                    field: false,
                    value: true
                }
            default:
                return true
        }
    }
}
const initialJson = {
    "ID":"none",
    "title":"Titre de l’activité",
    "type":"latex",
    "dest":["chap1","chap2"],
    "options":[
        {
            "name":"Multiplications",
            "vars":{
                "a":"2_10",
                "b":"2_10"
            },
            "question":"${:a}\\times${:b}",
            "answer":":question=\\color{red}{${:a*:b}}"
        },{
            "name":"Divisions",
            "vars":{
                "a":"2_10",
                "b":"2_10"
            },
            "question":"${:a*:b}\\div${:b}",
            "answer":":question=\\color{red}{${:a}}"
        }
    ]
}
const editor = new JSONEditor(editorDOMElement, options, initialJson)

window.onload = () => {
    document.getElementById('saveBtn').onclick = () => {
        const blob = new Blob([editor.getText()],{
            type: 'application/json;charset:utf-8'
        })
        const fileName = "activity.json";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // For IE
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            // For other browsers
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    document.getElementById('testBtn').onclick = () => {
        const act = new activity(editor.get())
        MM.editedActivity = act
        act.display('sample',MM)
    }
    document.getElementById('actIDImport').oninput = (evt) => {
        const id = evt.target.value
        if (theactivities[id] !== undefined){
            editor.set(theactivities[id])
            try {
                const act = new activity(theactivities[id])
                MM.editedActivity = act
                act.display('sample',MM)
            }
            catch (err) {
                document.getElementById('activityTitle').innerHTML = "<span class='red'>Erreur dans le code</span>"+err
            }
        }
    }
    document.getElementById('randomBtn').onclick = ()=>{
        // set json
        const json = theactivities[activitiesIDs[Math.floor(Math.random()*activitiesIDs.length)]]
        editor.set(json)
        try {
        const act = new activity(editor.get())
        MM.editedActivity = act
        act.display('sample',MM)
        } catch (err){
                document.getElementById('activityTitle').innerHTML = "<span class='red'>Erreur dans le code</span>"+err
        }
    }
    document.getElementById('openFileInput').onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonContent = JSON.parse(e.target.result);
                editor.set(jsonContent);
                try{
                    const act = new activity(editor.get())
                    MM.editedActivity = act
                    act.display('sample',MM)
                }catch(err){
                    document.getElementById('activityTitle').innerHTML = "<span class='red'>Erreur dans le code</span>"+err
                }
            } catch (error) {
                console.error("Error parsing JSON: ", error);
            }
        };
        reader.readAsText(file);
    };
    setTimeout(()=>{
        const act = new activity(editor.get())
        try {
            MM.editedActivity = act
            act.display('sample',MM)
        } catch (err){
            document.getElementById('activityTitle').innerHTML = "<span class='red'>Erreur dans le code</span>"+err 
        }
    },1000)
}