import { createServer } from "node:http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, port, hostname });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handler);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User connected");
    socket.join("chat");

    const interval = setInterval(() => {
      socket.to("chat").emit("message", "hello");
    }, 1000);

    socket.on("message", (data) => {
      console.log("from client:", data);
    });

    socket.on("close", () => {
      clearInterval(interval);
    });
  });

  server.listen(port, () => {
    console.log(`Server listening on http://${hostname}:${port}`);
  });
});
