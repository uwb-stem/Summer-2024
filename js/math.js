import { createPresentationBox, readTextFile } from './structure.js'


const NUM_ROOMS = 1;


const getJsonData = async function (path) {

    for (let i = 1; i <= NUM_ROOMS; ++i) {

        let room_str = "room-" + i + "-presentations";
        let file_str = path + "math" + i + ".json";
        let json_data = await readTextFile(file_str);
        loadMATHPresentations(room_str, json_data);

    }
}

function loadMATHPresentations(room, json_data) {
    let container = document.getElementById(room);
    
    let presentations = JSON.parse(json_data)["math"];
   
    for (let i = 0; i < presentations.length; i++) {

        createPresentationBox(presentations[i], container, false);
    }
}


getJsonData("./js/math/");