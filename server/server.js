import express from "express";
import expressWs from "express-ws";

const app = express();
const PORT = process.env.PORT || 8000;
const wsInstance = expressWs(app);


app.get("/test", (req, res) => {
  res.send("Testing");
});

app.ws("/test", (ws, req) => {
  ws.on("message", (msg) => {
    wsInstance.getWss().clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(msg);
      }
    });
  });
});

app.listen(PORT, () => console.log(`WebSocket server is running on port ${PORT}`));

// let webSocket = new WebSocket('ws://localhost:8000/test');
// webSocket.onmessage = function(e) { console.log("Message ", e.data)}