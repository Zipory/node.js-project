"use strict";

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const folderDiv = document.querySelector("#folder");

let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "/";
}
h1.innerText = "welcom  " + user +".";
// h2.innerText = "your files:";
let butAllFiles = document.querySelector("#but-all-files");

butAllFiles.addEventListener("click", getAllFiles);


async function getAllFiles() {
    let request = await fetch(`${user}`);
    let folder = await request.json();
    createDiv(folder);
}

function createDiv(folder) {
    for (let i of folder) {
        console.log(i);
        let newDivFile = document.createElement("div");
        newDivFile.setAttribute("class", "files");
        newDivFile.innerText = i;
        // folderDiv.innerHTML += `${newDivFile}</br>`;
        folderDiv.append(newDivFile);
    }
}