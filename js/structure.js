/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
export function closeNav() {

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("sideNavBtn").innerHTML = "See All Projects";

    let projects = document.querySelectorAll(".projectUl");

    for (let i = 0; i < projects.length; i++) {
        projects[i].style.width = "1000px";
        projects[i].style.margin = "auto";
    }

    navIsOpen = false;
}

export function sideNavEvent(className) {
    if (navIsOpen) {
        closeNav(className);
    } else {
        openNav(className);
    }
}
/*              JS for mobile nav bar stuff                 */
const dawgdropsItems = document.querySelectorAll('.dawgdrops-item');

// we only want one drop down item at a time, we'll use an array of bools 
// to keep track of any menus that are showing, so we can turn off the correct ones
//  and only show the selected one
const toggled = new Array(dawgdropsItems.length).fill(false);


for (let i = 0; i < dawgdropsItems.length; i++) {

    dawgdropsItems[i].addEventListener('click', function () {
        this.classList.toggle('active');
        let dawgdropsMenu = this.querySelector('.dawgdrops-menu');
        if (dawgdropsMenu.style.display === 'block') {
            dawgdropsMenu.style.display = 'none';
            toggled[i] = false;
        } else {
            dawgdropsMenu.style.display = 'block';
            toggled[i] = true;
        }
        //turn off the other activated menus
        for (let j = 0; j < toggled.length; j++) {
            if (j === i) continue;
            if (toggled[j] === true) {
                dawgdropsItems[j].querySelector('.dawgdrops-menu').style.display = 'none';
            }
        }
    });
}

export function createPanelDiscussionElement(time, panelTitle) {
    // Create main div
    const mainDiv = document.createElement('div');
    mainDiv.id = 'main';

    // now the column divs
    
    const colsdiv = document.createElement('div');
    colsdiv.id="cols";
    colsdiv.className = 'acspan-12';


    const col1 = document.createElement('div');
    col1.id = 'col1';
    col1.className = 'acspan-12';
    

    const col2 = document.createElement('div');
    col2.id = 'col2';
    col2.className = 'acspan-12';
   
    const grayBoxDiv = document.createElement('div');
    grayBoxDiv.className = 'gray-box';

    const timeH3 = document.createElement('h3');
    timeH3.textContent = time;

    const titleH1 = document.createElement('h1');
    const titleB = document.createElement('b');
    titleB.textContent = 'Panel Discussion: ';
    titleH1.appendChild(titleB);
    titleH1.innerHTML += panelTitle; // Append the actual title after the bold part

    const grayBoxTextDiv = document.createElement('div');
    grayBoxTextDiv.className = 'gray-box-text';

    
    grayBoxTextDiv.appendChild(document.createElement('br'));
    grayBoxTextDiv.appendChild(document.createElement('br'));

   
    grayBoxDiv.appendChild(timeH3);
    grayBoxDiv.appendChild(titleH1);
    grayBoxDiv.appendChild(grayBoxTextDiv);
    mainDiv.appendChild(grayBoxDiv);
    colsdiv.appendChild(col1);
    colsdiv.appendChild(col2);
    mainDiv.appendChild(colsdiv);

    return mainDiv;
}

/* ---------------------------- Side Navigation Bar ---------------------------- */
var navIsOpen = false;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {

    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
    document.getElementById("sideNavBtn").innerHTML = "Close Index";

    let projects = document.querySelectorAll(".projectUl");
    let presentationMargin = window.innerWidth / 2 - 640;

    for (let i = 0; i < projects.length; i++) {
        projects[i].style.width = "600px";
        // projects[i].style.marginLeft = "300px";
        projects[i].style.marginLeft = presentationMargin + "px";
    }
    navIsOpen = true;
}



function changeOpactiy(tagName, opacity) {
    let elements = document.getElementsByTagName(tagName);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.opacity = opacity;
    }
}

function dimBackground() {
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    changeOpactiy("img", "0.5");
    changeOpactiy("button", "0.4");
    changeOpactiy("hr", "0.4");
}

function undimBackground() {
    changeOpactiy("img", "1");
    changeOpactiy("button", "1");
    changeOpactiy("hr", "1");
}

/* --------------------------- Multiple Rooms Implementation --------------------------- */
const zoomLinks = [
    'https://google.com',
    'https://google.com',
    'https://google.com',
    'https://google.com',
    /* 'https://google.com',
    'https://google.com',
    'https://google.com' */
]


function printNumResults(num, searchKey) {
    let container = document.getElementById("num-result");
    let text = document.createTextNode("Found " + num + " results for '" + searchKey + "'.");
    container.appendChild(text);
}

function search(projectId) {

    let presentations;
    let isREU = false;
    let addAbstractButton = false;

    if (projectId.includes('preu')) {
        presentations = JSON.parse(readTextFile('./js/reu.json'))['preu'];
        isREU = true;
    } else if (projectId.includes('ereu')) {
        presentations = JSON.parse(readTextFile('./js/ereu.json'))['ereu'];
        isREU = true;
    } else if (projectId.includes('bio')) {
        presentations = JSON.parse(readTextFile('./js/bio.json'))['bio'];
    } else if (projectId.includes('phys')) {
        presentations = JSON.parse(readTextFile('./js/chem + phys.json'))['phys'];
    } else if (projectId.includes('chem')) {
        presentations = JSON.parse(readTextFile('./js/chem + phys.json'))['chem'];
    } else if (projectId.includes('ee')) {
        presentations = JSON.parse(readTextFile('./js/ee.json'))['ee'];
    } else if (projectId.includes('ac')) {
        presentations = JSON.parse(readTextFile('./js/ac.json'))['ac'];
    } else {
        const room = projectId[5];
        const jsonfile = './js/csseRoom' + room + '.json';
        presentations = JSON.parse(readTextFile(jsonfile))['csse'];
        addAbstractButton = true;
    }

    for (let i = 0; i < presentations.length; i++) {
        if (presentations[i].projectId === projectId) {
            createPresentationBox(presentations[i], "", isREU, addAbstractButton);
        }
    }
}

export function createSimpleInfoBox(container, text, time) {
    // Create the main div element with the class 'info-box'
    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box');

    // Create a paragraph element for the text
    const textParagraph = document.createElement('p');
    textParagraph.textContent = text;
    infoBox.appendChild(textParagraph);

    // Create a paragraph element for the time
    const timeParagraph = document.createElement('p');
    timeParagraph.textContent = time;
    infoBox.appendChild(timeParagraph);

    // Append the info box to the specified container
    container.appendChild(infoBox);
}

/**
 * 
 * @param {object} presentationInfo 
 * @param {HTMLElement} container 
 * @param {boolean} addAbstractButton 
 * 
 * Creates presentation box within a container on the htmnl page with or without an abstract button.
 * If container is empty, function will grab the container "presentation" from the DOM
 * 
 */
export function createPresentationBox(presentationInfo, container, addAbstractButton) {


    if (container === "") {
        container = document.getElementById("presentation");
        // presentationInfo = JSON.parse(presentationInfo);
    }

    let presentation = document.createElement("section");
    presentation.classList.add("presentation");

    // add projectId so that when user click on the project on side nav,
    // it goes to the correct presentation box
    presentation.setAttribute("id", presentationInfo.projectId);


    let contentUl = document.createElement("ul");
    // contentUl.classList.add("projectUl");
    let textLi = document.createElement("li");

    // time
    if(presentationInfo.time !== undefined){
    let time = document.createElement("p");
    time.classList.add("present-time");
    time.appendChild(document.createTextNode(presentationInfo.time));
    textLi.appendChild(time);
    }
    // short black line
  

    // project title
    let title = document.createElement("h3");
    title.appendChild(document.createTextNode(presentationInfo.title));
    textLi.appendChild(title);

    addStudents(presentationInfo, textLi);

    // faculty advisor
    let advisor = document.createElement("p");
    advisor.appendChild(document.createTextNode("Faculty advisor: " + presentationInfo.facultyAdvisor));
    textLi.appendChild(advisor);

    // button to abstract page
    if (addAbstractButton) {
        let space = document.createElement("div");
        space.classList.add("small-space");
        textLi.appendChild(space);

        let abstractPageBtn = document.createElement("a");
        abstractPageBtn.href = './csse-abstract-page.html?' + presentationInfo.projectId;
        abstractPageBtn.target = '_blank';
        abstractPageBtn.classList.add("uw-btn", "btn-sm");
        abstractPageBtn.innerHTML = "Read abstract";
        textLi.appendChild(abstractPageBtn);
    }


    let splitPosters = presentationInfo.posterLink.split("\n\n");
    let posterLi = document.createElement("li");
    if (presentationInfo.posterLink != "<<NOPOSTER>>") loadPosters(splitPosters, document, posterLi);

    contentUl.appendChild(textLi);
    contentUl.appendChild(posterLi);
    presentation.appendChild(contentUl);

    container.appendChild(presentation);
    return presentation;
}



/**
 * 
 * @param {Array<string>} splitPosters 
 * @param {Document} document 
 * @param {HTMLElement} posterLi 
 * 
 * Loads the posters into the presentation card. If there are multiple poster links
 * in splitposters, the function will insert each poster in order they appear in splitPosters
 * 
 */
function loadPosters(splitPosters, document, posterLi) {
    for (let i = 0; i < splitPosters.length; i++) {
        let posterImg = document.createElement("img");
        posterImg.setAttribute('src', splitPosters[i]);
        posterLi.appendChild(posterImg);
    }


}

function addStudents(presentationInfo, textLi) {

    let studentDiv = document.createElement("div");

    if (presentationInfo.group) {               // if "group" exists in json, e.g. csse-room-6
        addGroup(presentationInfo, studentDiv);

    } else {
        studentDiv.classList.add("students");

        let studentName = document.createElement("h4");     // student name
        let splitStudentName = presentationInfo.studentName.split("\n\n");
        //let brk = document.createElement("br");
        //let brk2 = document.createElement("br");
        for (let i = 0; i < splitStudentName.length; i++) {
            let splitText = document.createElement("h4");
            splitText.classList.add("text");
            splitText.innerText = splitStudentName[i].replace("\n\n", " ");
        }

        if (splitStudentName.length > 1) {

            for (let i = 0; i < splitStudentName.length; i++) {
                studentName.appendChild(document.createTextNode(splitStudentName[i]));
                studentName.appendChild(document.createElement("h4"));
            }

        } else {
            studentName.appendChild(document.createTextNode(splitStudentName));
        }

        studentDiv.appendChild(studentName);

        if(presentationInfo.studentMajor !== undefined){
        let major = document.createElement("h5");           // major
        major.classList.add("majors");

        let splitMajors = presentationInfo.studentMajor.split("\n\n");

        for (let i = 0; i < splitMajors.length; i++) {
            let a2Text = document.createElement("h5");
            a2Text.classList.add("text");
            a2Text.innerText = splitMajors[i].replace("\n\n", " ");
        }

        if (splitMajors.length > 1) {
            for (let i = 0; i < splitMajors.length; i++) {
                major.appendChild(document.createTextNode(splitMajors[i]));
                major.appendChild(document.createElement("h5"));

            }

        } else {
            major.appendChild(document.createTextNode(splitMajors));
        }

        studentDiv.appendChild(major);
    }

    }

    textLi.appendChild(studentDiv);


    if (presentationInfo.projectType !== undefined) {
        let projectType = document.createElement("p");       // project type
        projectType.appendChild(document.createTextNode("Project type: " + presentationInfo.projectType));
        textLi.appendChild(projectType);
    }
}

function addGroup(presentationInfo, studentDiv) {
    studentDiv.classList.add("students");
    let studentName = document.createElement("h4");
    let major = document.createElement("h5");
    major.classList.add("majors");

    for (let i = 0; i < presentationInfo.group.length; i++) {
        studentName.innerHTML += presentationInfo.group[i].studentName + "<br/>";
        major.innerHTML += presentationInfo.group[i].studentMajor + "<br/>";
    }

    studentDiv.appendChild(studentName);
    studentDiv.appendChild(major);
}

export function loadTitleToSideNav(json_data, key) {
    let sideNav = document.getElementById('mySidenav');
    let presentations = JSON.parse(json_data)[key];

    let roomDiv = document.createElement("div");
    roomDiv.classList.add("side-room-number");
    roomDiv.innerHTML = "Room " + presentations[0].projectId[5];

    let ul = document.createElement("ul");

    for (let j = 0; j < presentations.length; j++) {
        let presentationLi = document.createElement("li");
        presentationLi.classList.add("sidenav-title");
        presentationLi.setAttribute("data-id", presentations[j].projectId);

        let aTitle = document.createElement('a');
        let studentName = document.createElement('span');

        if (presentations[j].group) {
            for (let k = 0; k < presentations[j].group.length; k++) {
                studentName.innerHTML += presentations[j].group[k].studentName + "<br/>";
            }
        } else {
            studentName.appendChild(document.createTextNode(presentations[j].studentName));
        }
        aTitle.innerHTML = presentations[j].title + "<br/>";
        aTitle.appendChild(studentName);
        aTitle.href = '#';

        presentationLi.appendChild(aTitle);
        ul.appendChild(presentationLi);
        presentationLi.setAttribute("data-search", presentations[j].title + " " + studentName.textContent);

    }

    sideNav.appendChild(roomDiv);
    sideNav.appendChild(ul);
}


function isFilePathValid(filePath) {
    return fetch(filePath)
        .then(response => {
            if (response.ok) {
                return true; // File exists and can be fetched
            } else {
                return false; // File doesn't exist or can't be fetched
            }
        })
        .catch(error => {
            console.error(error);
            return false; // Error occurred while fetching the file
        });
}


export async function readTextFile(file) {


    if (!isFilePathValid(file)) return;

    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fileContent = await response.text();
        return fileContent;
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}


