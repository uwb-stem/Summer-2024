import { createPresentationBox, createPanelDiscussionElement } from './structure.js'


const getJsonData = async function () {

    let presentations_fetch = await getPresentations()
    let presentations = presentations_fetch['presentations']

    const panels = {
        ac: []
    };

    
    const panel_map = new Map();
    presentations.forEach(presentation =>{
        let panel_name = presentation.panel;
        if (!panel_map.has(panel_name)){
            let panel = {
                        panel: presentation.panel,
                        time: presentation.time,
                        presentations: []
                        }
            panel_map.set(panel_name, panel);             
        }
        let presentations = panel_map.get(panel_name).presentations;
        presentations.push(
            {
                title: presentation.title,
                studentName: presentation.studentName,
                facultyAdvisor: presentation.facultyAdvisor,
                posterLink: presentation.poster || "./posters/placeholder/comingsoon.jpg"
            }
        );
    });
    createPanels(panel_map);

}

function createPanels(panels) {


    const content_block = document.getElementsByClassName("acContent_Block")[0];
    panels.forEach(element => {

        const divElement = document.createElement('div');
        divElement.className = 'acContent';

        content_block.appendChild(divElement);

        let panel_element = createPanelDiscussionElement(element.time, element.panel);
        divElement.appendChild(panel_element);

        let presentations = element.presentations;
        const coldiv = panel_element.children[1]; //todo: do this better, not sure if cols will always be at [1]
        const cols = coldiv.children;
        
        for (let i = 0; i < presentations.length; ++i) {

            const container = i % 2 === 0 ? cols[0] : cols[1];

            //assign the presentation to a var, since we need to add AC specific image integration
            let pres = createPresentationBox(presentations[i], container, false, false);
            let img = pres.querySelector('img');
            if(img !== null)
                img.setAttribute('onclick', 'onClick(this)');
            
        }

    });
}





async function getPresentations() {
    try {
        let response = await fetch('http://localhost:8080/api/major/acmpt');
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
getJsonData()





