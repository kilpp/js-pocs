import { prince } from "princejs";

const app = prince();

app.get("/", () => ({ message: "Hello!" }));

app.ws("/chat", {
  open: (ws) => {
    ws.send("Welcome to the chat!");
  },
  message: (ws, msg) => {
    ws.send(`Echo: ${msg}`);
  },
  close: () => {
    console.log("User disconnected");
  }
});

app.listen(3000);