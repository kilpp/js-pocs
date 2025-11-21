import { prince } from "princejs";
import { cors, logger } from "princejs/middleware";
import { randomUUID } from "node:crypto";
import { EventEmitter } from "node:events";

const app = prince();

app.use(cors());
app.use(logger({ format: "dev" }));

// SSE event emitter setup
const sseEvents = new EventEmitter();
sseEvents.setMaxListeners(250000);

export const broadcast = (data) => {
  const message = `id: ${randomUUID()}\ndata: ${JSON.stringify(data)}\n\n`;
  sseEvents.emit("sse", message);
};

// Demo: broadcast events every 2 seconds
let counter = 0;
setInterval(() => {
  broadcast({ payload: { date: Date.now(), times: counter++ } });
}, 2000);

// SSE endpoint
app.get("/events", (req) => {
  return app
    .response()
    .status(200)
    .header("Content-Type", "text/event-stream;charset=utf-8")
    .header("Cache-Control", "no-cache, no-transform")
    .header("Connection", "keep-alive")
    .header("X-Accel-Buffering", "no")
    .stream((push, close) => {
      // Listen for SSE events and push to client
      const handler = (message) => {
        push(message);
      };

      sseEvents.on("sse", handler);

      // Clean up on connection close
      req.signal?.addEventListener("abort", () => {
        sseEvents.off("sse", handler);
        close();
      });
    });
});

// WebSocket endpoint
app.ws("/chat", {
  open: (ws) => {
    ws.send("Welcome to the chat!");
  },
  message: (ws, msg) => {
    ws.send(`Echo: ${msg}`);
  },
  close: () => {
    console.log("User disconnected from chat");
  }
});

// Basic route
app.get("/", () => ({ 
  message: "Hello!",
  endpoints: {
    sse: "/events",
    websocket: "/chat"
  }
}));

app.listen(3000);