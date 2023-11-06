const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const fs = require("fs");
app.use(bodyParser.json());
app.use(cors());
function CheckSignIn(req, resp, next) {
  const obj = req.body;
  fs.readFile(__dirname + "/users.json", "utf-8", (err, data) => {
    if (err) {
      resp.status(401);
    } else {
      const newData = JSON.parse(data);
      newData.map((d) => {
        if (d["email"] == obj["email"] && d["password"] == obj["password"]) {
          next();
        }
      });
      resp.status(400).send("Email and Password Not Match");
    }
  });
}
app.get("/todo", (req, resp) => {
  fs.readFile(__dirname + "/db.json", "utf-8", (err, data) => {
    if (err) {
      resp.status(401).send("error in reading db");
    } else {
      resp.json(data);
    }
  });
});

app.post("/todo", (req, resp) => {
  let obj = req.body;
  fs.readFile(__dirname + "/db.json", "utf-8", (err, data) => {
    if (err) {
      resp.status(401);
    } else {
      let newData = JSON.parse(data);
      newData.push(obj);
      fs.writeFile(__dirname + "/db.json", JSON.stringify(newData), (err) => {
        if (err) {
          resp.status(401);
        } else {
          resp.send(JSON.stringify(obj));
        }
      });
    }
  });
});

app.post("/signUp", (req, resp) => {
  const obj = req.body;
  console.log(obj);
  fs.readFile(__dirname + "/users.json", "utf-8", (err, data) => {
    if (err) {
      resp.status(401);
    } else {
      let newData = JSON.parse(data);
      newData.push(obj);
      fs.writeFile(
        __dirname + "/users.json",
        JSON.stringify(newData),
        (err) => {
          if (err) {
            resp.status(401);
          } else {
            resp.send("OK");
          }
        }
      );
    }
  });
});
app.listen(3000, () => {
  console.log("listening on 3000");
});
