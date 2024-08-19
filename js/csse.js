import { createPresentationBox, readTextFile, loadTitleToSideNav, sideNavEvent,  closeNav } from './structure.js'

window.sideNavEvent = sideNavEvent;
window.closeNav     = closeNav;



const NUM_ROOMS = 7


const getJsonData =  async function (path) {

    for (let i = 1; i < NUM_ROOMS; ++i) {

        let room_str = "room-" + i + "-presentations";
        let file_str = path + "csseRoom" + i + ".json";
        let json_data = await readTextFile(file_str);
        loadCSSEPresentations(room_str, json_data);
        loadTitleToSideNav(json_data, "csse");

    }
}

function loadCSSEPresentations(room, json_data) {

    let container = document.getElementById(room);
    
    let presentations = JSON.parse(json_data)["csse"];
    for (let i = 0; i < presentations.length; i++) {

        createPresentationBox(presentations[i], container, true);
    }
}


getJsonData("./js/csse/");