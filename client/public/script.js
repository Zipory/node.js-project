"use strict";
const h1 = document.querySelector("h1");
h1.innerText = "welcom to my site";
const form = document.querySelector("form");
const butSub = document.querySelector("#submit");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const realSubmit = document.querySelector("#real-submit");
let user = {};
realSubmit.addEventListener("click", saveAndSubmit);
async function saveAndSubmit() {
  user.firstName = firstName.value;
  user.lastName = lastName.value;
  user.password = document.querySelector("#pass").value;
  const response = await fetch("/post", {
    method: "POST",
    headers: {
      Accept: "application.json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const getBack = await response.text();
  localStorage.setItem("user", `${user.lastName}`);
  window.location.href = "/inside";
  console.log(getBack);
  h1.innerText = getBack;
}
/**------not need to be work---------- */
async function postForm(url) {
  let obj = await fetch(url);
  let text = await obj.text();
  // functio to do with text
}
