import { createPresentationBox, readTextFile, loadTitleToSideNav, sideNavEvent,  closeNav } from './structure.js'

window.sideNavEvent = sideNavEvent;
window.closeNav     = closeNav;



const NUM_ROOMS = 7



async function loadPresentations() {


    
    let presentations_fetch = await getPresentations()
    let presentations = presentations_fetch['presentations']
  
    for (let i = 0; i < presentations.length; i++) {
        let roomid = presentations[i].roomId;
        let container = document.getElementById("room-"+roomid+"-presentations");
        createPresentationBox(presentations[i], container, true);
    }
}



async function getPresentations() {
    try {
        let response = await fetch('http://localhost:8080/api/major/csse');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json(); 
        return data; 
    } catch (error) {
        console.error("Error fetching presentations:", error);
        return { presentations: [] }; 
    }
}

  loadPresentations();
