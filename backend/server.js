const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chatsDB = require("./data/Chats");
var fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const bodyParserJson = bodyParser.json();
app.use(bodyParser.json());

// Get all
app.get("/api/chat", bodyParserJson, (req, res) => {
  res.send(chatsDB);
});

// Upload File di Backup
app.post("/api/insert", (req, res) => {
  saveDatabase(req.body, function (err) {
    if (err) {
      res.status(404).send("Upload Fallito");
      return;
    }
    res.send("Upload Completato");
  });
});

// FUNZIONE PER SALVARE IL BACKUP NEL DATABASE
function saveDatabase(person, callback) {
  fs.writeFile("./data/Chats.json", JSON.stringify(person), callback);
}

// Get users_and_groups
app.get("/api/users", (req, res) => {
  const usersAndGroups = chatsDB.users_and_groups;
  res.send(usersAndGroups);
});

// Get messages
app.get("/api/messages", (req, res) => {
  const messages = chatsDB.messages;
  res.send(messages);
});

// Get groups
app.get("/api/groups", (req, res) => {
  const groups = chatsDB.group_members;
  res.send(groups);
});

app.listen(3000);
