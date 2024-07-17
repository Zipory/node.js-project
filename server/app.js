const express = require("express");
const path = require("path");
const fs = require("fs");
const exp = require("constants");
const app = express();
let folderUsers = 0;
app.use(express.json());
app.use("/", express.static("../client/public"));
app.use("/inside", express.static('../client/inside'));
console.log("hi");
const port = 3030;
app.get("/getFood", (req, res) => {
  console.log("inside getFood");
  res.send("Apple");
});
app.post("/post", (req, res) => {
  if (!checkUser(req.body.lastName)) {
  fs.mkdir(`users/${req.body.lastName}`, (err) => {
    if (err) console.log("mkdir not working");
    fs.appendFile(
      `users/${req.body.lastName}/info.json`,
      JSON.stringify(req.body),
      (err) => {
        if (err) console.log("append file not working");
        else console.log("saved");
      }
    );
  });
  res.send("I get the post.");
}
else {res.send("you cant use that name.")}
});

app.get("/inside/:name", (req, res) => {
  // console.log(req.params.name);
  if (checkUser(req.params.name)) {
    let folderName = getFolder(req.params.name);
    console.log(folderName);
    let myFolder = fs.readdirSync(`users/${folderName}`);
    // console.log(myFolder.length);
    // let arr = []
    // for (let i = 0; i < myFolder.length; i++) {
    //   arr.push(fs.readFileSync(`users/${folderName}/${myFolder[0]}`));
    // }
    res.send(myFolder);
  }
})

app.listen(port, () => {
  console.log(`listening port ${port}`);
});

/**------------functions---------------- */

function checkUser(lastName) {
  folderUsers = fs.readdirSync("users");
  return folderUsers.includes(lastName);
  }

function getFolder(lastName) {
  return folderUsers.find( (name) => {
    return name == lastName;
  });
}

function demo(lastName) {
  let sss = fs.readdirSync(`users`);
  for (let i in sss) {
    console.log(sss[i]);
    let ddd = fs.readdirSync(`users/${sss[i]}`);
    for (let j of ddd) {
      console.log(j);
      let fff = fs.readFileSync(`users/${sss[i]}/${j}`);
      console.log(fff.toString());
    }
  }
}
