const chokidar = require("chokidar");
const { exec } = require("child_process");

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// Broadcast to all.
wss.on("connection", function connection(ws) {
  console.log("A new client connected.");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
  ws.send("Hello Client!");
});

module.exports = wss;

// 初始化 chokidar 監聽器
const watcher = chokidar.watch("./src", {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

// 監聽事件
watcher.on("change", (path) => {
  console.log(`Detected change in ${path}. Rebuilding...`);
  exec("ng build", (err, stdout, stderr) => {
    if (err) {
      console.error("Error during build:", err);
      return;
    }
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("reload");
        console.log("Sent reload message to client.");
      }
    });
  });
});