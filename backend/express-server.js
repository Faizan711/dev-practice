import express from "express";
import fs from "fs";

//NOT required with express
// import url from "url";
// import querystring from "querystring";

function log(req, res, next) {
  const time = new Date();
  const log = `${time.toLocaleTimeString()} ${req.url} ${req.method} ${req.socket.remoteAddress}\n`;
  fs.appendFile("log.txt", log, (err) => {
    if (!err) console.log("log added!");
  });
  next();
}
const app = express();
app.use(log);
app.use(express.json());
const PORT = 3000;

const data_file = "./data.json";
const data = fs.readFileSync("./data.json");

let projects = JSON.parse(data);
let lastIndex = projects.length === 0 ? 0 : projects[projects.length - 1].id;

app.get("/", (req, res) => {
  res.end("welccome to my server!");
});

app.get("/projects", (req, res) => {
  res.status(200).json(projects);
});

app.post("/projects", (req, res) => {
  const name = req.body?.data?.name;

  if (!name) {
    req
      .status(400)
      .json({ message: "no name of the project in body request!" });
  }
  projects.push({ id: ++lastIndex, name, tasks: [] });
  fs.writeFile("./data.json", JSON.stringify(projects, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: "Data did not persist!" });
    } else {
      res.status(201).json(projects);
    }
  });
});

app.post("/projects/tasks", (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.status(400).json({ message: "no id found to add tasks" });
  }

  const task = req.body?.data?.task;
  if (!task) {
    res.status(400).json({ message: "no task data found in body!" });
  }
  projects.forEach((project, index) => {
    if (project.id == id) {
      projects[index].tasks.push(task);
    }
  });
  fs.writeFile("./data.json", JSON.stringify(projects, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: "error saving the task" });
    } else {
      res.status(200).json(projects);
    }
  });
});

app.put("/projects", (req, res) => {
  const name = req.body?.data?.name;
  const id = req.query.id;

  if (!id) {
    res.status(400).json({ message: "no id found to update project" });
  }
  if (!name) {
    res
      .status(400)
      .json({ message: "no name of the project in body request!" });
  }

  projects.forEach((project, index) => {
    if (project.id == id) {
      project[index].name = name;
    }
  });
  fs.writeFile("./data.json", JSON.stringify(projects, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: "error updating the project" });
    } else {
      res.status(200).json(projects);
    }
  });
});

app.delete("/projects", (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).json({ message: "no id found to delete project" });
  }
  projects = projects.filter((project) => project.id != id);
  fs.writeFile("./data.json", JSON.stringify(projects, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: "error deleting the project" });
    } else {
      res.status(200).json(projects);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
