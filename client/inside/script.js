"use strict";

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");

let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "/";
}
h1.innerText = "welcom  " + user;
h2.innerText = "your files:";
