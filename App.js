// EVENT LISTENERS
document.getElementById("next").addEventListener("click", nextDog);
document.getElementById("prev").addEventListener("click", prevDog);

// VARIABLES
var dogFrame = document.getElementById("dogFrame");
var doggyPic;
var dogNumber = 0;

// API FUNCTIONS
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
    <option>Select A Dog Breed</option>
    ${Object.keys(breedList).map(function (breed) {
        return `<option>${breed}</option>`;
    })}
    </select>
    `;
}

async function loadByBreed(breed) {
    if (breed === "Select A Dog Breed") {
        dogImg.setAttribute("src", "");
    } else {
        const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images`
        );
        const data = await response.json();

        dogNumber = 0; //resets back to first image
        doggyPic = data.message;
        dogFrame.setAttribute("src", `${doggyPic[dogNumber]}`);
    }
}

// BUTTON FUNCTIONS
function nextDog() {
    dogNumber = dogNumber + 1;
    dogFrame.setAttribute("src", `${doggyPic[dogNumber]}`);
}

function prevDog() {
    if (dogNumber > 0) {
        dogNumber = dogNumber - 1;
    }
    dogFrame.setAttribute("src", `${doggyPic[dogNumber]}`);
}

start();
