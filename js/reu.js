import { readTextFile, createPresentationBox, createSimpleInfoBox} from './structure.js'



const NUM_ROOMS = 1


const getJsonData =  async function (path) {

    for (let i = 1; i <= NUM_ROOMS; ++i) {

        let room_str = "room-" + i + "-presentations";
        let file_str = path + "reuRoom" + i + ".json";
        let json_data = await readTextFile(file_str);
        //console.log(json_data)
        let container = document.getElementById(room_str);
    
        let presentations = JSON.parse(json_data)["reu"];
        //console.log(presentations)
        for (let i = 0; i < presentations.length; i++) {

            if(presentations[i].studentName === undefined){

               createSimpleInfoBox(container, presentations[i].text,presentations[i].time);
            } else {
            createPresentationBox(presentations[i], container, false);
            }
        }
    
    }
}




getJsonData("./js/reu/");