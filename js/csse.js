import { createPresentationBox, loadTitleToSideNav, sideNavEvent,  closeNav } from './structure.js'

window.sideNavEvent = sideNavEvent;
window.closeNav     = closeNav;






function loadCSSEPresentations(json_data) {

     
    let presentations = json_data["presentations"];
    for (let i = 0; i < presentations.length; i++) {
        let room_num = presentations[i].roomId;
        let room_str = "room-" + room_num + "-presentations";
        let container = document.getElementById(room_str);
        createPresentationBox(presentations[i], container, true);
    
    }
}



let url = 'http://127.0.0.1:8080/api/major/csse';

const response = await fetch(url);

const json = await response.json();
loadTitleToSideNav(json,'presentations')
loadCSSEPresentations(json);



//getJsonData(json);