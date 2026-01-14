import express from "express";
import fs from "fs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//NOT required with express
// import url from "url";
// import querystring from "querystring";
const TOKEN_SECRET =
  "b91028378997c0b3581821456edefd0ec7958f953f8c1a6dd856e2de27f0d7e0fb1a01cda20d1a6890267e629f0ff5dc7ee46bce382aba62d13989614417606a";
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
const PORT = 3001;

const saltRounds = 10;

const data_file = "./data.json";
const data = fs.readFileSync("./data.json");

const user_file = "./users.json";
const users = fs.readFileSync(user_file);

let projects = JSON.parse(data);
let lastIndex = projects.length === 0 ? 0 : projects[projects.length - 1].id;

app.get("/", (req, res) => {
  res.end("welccome to my server!");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Store username and hashedPassword in your file
    const userData = JSON.parse(users);
    userData.push({ username, password: hashedPassword });
    fs.writeFile(user_file, JSON.stringify(userData, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: "Error saving user data" });
      } else {
        res.status(201).json({ message: "User created successfully" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userData = JSON.parse(users);

  const user = userData.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    TOKEN_SECRET,
    { expiresIn: "1h" },
  );

  res.json({ accessToken, message: "Login successful" });
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
