const express = require("express");
const path = require("path");
const fs = require("fs");
const exp = require("constants");
const app = express();
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

app.listen(port, () => {
  console.log(`listening port ${port}`);
});

/**------------functions---------------- */

function checkUser(lastName) {
  let folderUsers = fs.readdirSync("users");
  return folderUsers.includes(lastName);
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
