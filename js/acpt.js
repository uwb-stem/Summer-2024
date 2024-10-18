import { createPresentationBox, readTextFile, createPanelDiscussionElement } from './structure.js'


const getJsonData = async function (path) {

    let json_data = await readTextFile(path + "ac.json");
    createPannels(json_data);


}

function createPannels(json_data) {

    // let container = document.getElementById(room);

    let pannels = JSON.parse(json_data)["ac"];
    const content_block = document.getElementsByClassName("acContent_Block")[0];
    pannels.forEach(element => {

        const divElement = document.createElement('div');
        divElement.className = 'acContent';

        content_block.appendChild(divElement);

        let pannel_element = createPanelDiscussionElement(element.time, element.pannel);
        divElement.appendChild(pannel_element);

        let presentations = element.presentations;
        const coldiv = pannel_element.children[1]; //todo: do this better, not sure if cols will always be at [1]
        const cols = coldiv.children;
        
        for (let i = 0; i < presentations.length; ++i) {

            const container = i % 2 === 0 ? cols[0] : cols[1];

            //assign the presentation to a var, since we need to add AC specific image interation
            let pres = createPresentationBox(presentations[i], container, false, false);
            let img = pres.querySelector('img');
            img.setAttribute('onclick', 'onClick(this)');
            
        }

    });
}



getJsonData("/js/ac/");





