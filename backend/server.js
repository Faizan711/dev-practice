import http from "http";
import fs from "fs";
import url from "url";
import querystring from "querystring";

const data_file = "./data.json";
const data = fs.readFileSync("./data.json");

let projects = JSON.parse(data);

let lastIndex = projects.length === 0 ? 0 : projects[projects.length - 1].id;

const myServer = http.createServer((req, res) => {
  // res.end("Hello, this is my basic http server!");

  //ignore favicon requests as this is the first request browser makes when loading a page and is not needed to be entertained by our server
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }

  //using Date function to give timestamp to our logs
  const time = new Date();
  const log = `${time.toLocaleTimeString()} ${req.url} ${req.method} ${req.socket.remoteAddress}\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (!err) console.log("log added!");
  });

  const myUrl = url.parse(req.url, true);
  //creating CRUD APIs without any framework
  if (myUrl.pathname == "/projects" && req.method == "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(projects));
  }
  if (myUrl.pathname == "/projects" && req.method == "POST") {
    let body = "";
    // req.on("data", (chunk) => {
    //   body += chunk.toString();
    // });
    req.on("data", (chunk) => {
      // body += chunk.toString();
      const jsondata = JSON.parse(chunk);
      const name = jsondata.data.name;

      if (name) {
        projects.push({ id: ++lastIndex, name, tasks: [] });
        fs.writeFile(
          "./data.json",
          JSON.stringify(projects, null, 2),
          (err) => {
            if (err) {
              const message = { message: "data could not be inserted!" };
              res.writeHead(500, { "content-type": "application/json" });
              res.end(JSON.stringify(message, null, 2));
            } else {
              res.writeHead(201, { "content-type": "application/json" });
              res.end(JSON.stringify(projects, null, 2));
            }
          },
        );
      } else {
        const message = { message: "no name of the project in body request!" };
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify(message, null, 2));
      }
    });
  }
  if (myUrl.pathname == "/projects/tasks" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      const search = myUrl.search;
      if (search) {
        const [, query] = search.split("?");
        const id = querystring.parse(query).id;
        if (id) {
          const jsondata = JSON.parse(body);
          const task = jsondata.data.task;
          console.log(jsondata);
          if (!task) {
            const message = { message: "no task data found in body!" };
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify(message, null, 2));
          } else {
            projects.forEach((project, index) => {
              if (project.id == id) {
                projects[index].tasks.push(task);
              }
            });
            fs.writeFile(
              "./data.json",
              JSON.stringify(projects, null, 2),
              (err) => {
                if (err) {
                  const message = { message: "could not persist data!" };
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(message, null, 2));
                } else {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(projects, null, 2));
                }
              },
            );
          }
        } else {
          const message = { message: "No id parameter received!" };
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify(message, null, 2));
        }
      } else {
        const message = { message: "No query parameter received!" };
        res.writeHead(400, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify(message, null, 2));
      }
    });
  }
  if (myUrl.pathname == "/projects" && req.method == "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      const search = myUrl.search;
      if (search) {
        const [, query] = search.split("?");
        const id = querystring.parse(query).id;
        if (id) {
          const jsondata = JSON.parse(body);
          const name = jsondata.data.name;
          console.log(jsondata);
          if (!name) {
            const message = { message: "no name found in body!" };
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify(message, null, 2));
          } else {
            projects.forEach((project, index) => {
              if (project.id == id) {
                projects[index].name = name;
              }
            });
            fs.writeFile(
              "./data.json",
              JSON.stringify(projects, null, 2),
              (err) => {
                if (err) {
                  const message = { message: "could not persist data!" };
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(message, null, 2));
                } else {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(projects, null, 2));
                }
              },
            );
          }
        } else {
          const message = { message: "No id parameter received!" };
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify(message, null, 2));
        }
      } else {
        const message = { message: "No query parameter received!" };
        res.writeHead(400, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify(message, null, 2));
      }
    });
  }
  if (myUrl.pathname == "/projects" && req.method == "DELETE") {
    req.on("data", () => {
      const search = myUrl.search;
      if (search) {
        const [, query] = search.split("?");
        const id = querystring.parse(query).id;
        if (id) {
          projects = projects.filter((project) => project.id != id);
          fs.writeFile(
            "./data.json",
            JSON.stringify(projects, null, 2),
            (err) => {
              if (err) {
                const message = { message: "could not persist data!" };
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify(message, null, 2));
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(projects, null, 2));
              }
            },
          );
        } else {
          const message = { message: "No id parameter received!" };
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify(message, null, 2));
        }
      } else {
        const message = { message: "No query parameter received!" };
        res.writeHead(400, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify(message, null, 2));
      }
    });
  }
  // if (req.method == "POST" || req.method == "PUT") {
  //   let body = "";
  //   req.on("data", (chunk) => {
  //     body += chunk.toString();
  //   });

  //   req.on("end", () => {
  //     try {
  //       const parseBody = JSON.parse(body);
  //       const myUrl = url.parse(req.url, true);
  //       handleRouting(myUrl, parseBody, res);
  //     } catch (err) {
  //       res.statusCode = 400;
  //       res.end("Invalid JSON body");
  //     }
  //   });
  // } else {
  //   handleRouting(myUrl, null, res);
  // }

  // //routing is happening for this server in basic http server
  // function handleRouting(myUrl, body, res) {
  //   switch (myUrl.pathname) {
  //     case "/":
  //       res.end("welcome to my server");
  //       break;
  //     case "/about":
  //       const myName = myUrl.query.name || "Guest";
  //       res.end(`this route is for about of my ${myName} server`);
  //       break;
  //     case "/contact":
  //       res.end("this is contact end of my server");
  //       break;
  //     case "/test-body":
  //       console.log("Received body:", body);
  //       res.end(`Received body: ${JSON.stringify(body)}`);
  //       break;
  //     default:
  //       res.statusCode = 404;
  //       res.end("404 - not found");
  //   }
  // }
});

myServer.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
