import { createPresentationBox, readTextFile } from './structure.js'


const NUM_ROOMS = 1;



function loadPresentations(json_data) {

     
    let presentations = json_data["presentations"];
    for (let i = 1; i <= presentations.length; i++) {
        let room_num = presentations[i].roomId;
        let room_str = "room-" + room_num + "-presentations";
        presentations[i].studentMajor = 'bio';
        let container = document.getElementById(room_str);
        createPresentationBox(presentations[i], container, true);
    }
}




let url = 'http://127.0.0.1:5000/api/major/math';

const response = await fetch(url);

const json = await response.json();
loadPresentations(json);