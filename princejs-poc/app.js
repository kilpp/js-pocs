// import { prince } from "princejs";
// import { cors, logger } from "princejs/middleware";

// const app = prince();

// app.use(cors());
// app.use(logger({ format: "dev" }));

// app.ws("/chat", {
//   open: (ws) => {
//     ws.send("Welcome to the chat!");
//   },
//   message: (ws, msg) => {
//     ws.send(`Echo: ${msg}`);
//   },
//   close: () => {
//     console.log("User disconnected");
//   }
// });

import { randomUUID } from "node:crypto";
import { EventEmitter } from "node:events";

const sseEvents = new EventEmitter();

export const sse = (data) => {
  sseEvents.setMaxListeners(10000)
  sseEvents.emit(
    "sse",
    `id: ${randomUUID()}\ndata: ${JSON.stringify(data)}\n\n`
  );
};

let counter = 0;
setInterval(() => {
  sse({ payload: { date: Date.now(), times: counter++ } });
}, 2000);

export default {
  port: 3000,
  async fetch(req) {
    const stream = new ReadableStream({
      start(controller) {
        sseEvents.once("sse", () => {
          controller.enqueue(`retry: 3000\n\n`);
        });
      },
      pull(controller) {
        sseEvents.on("sse", (data) => {
          const queue = [Buffer.from(data)];
          const chunk = queue.shift();
          controller.enqueue(chunk);
        });
      },
      cancel(controller) {
        sseEvents.removeAllListeners("sse");
        controller.close();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream;charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  },
}

// app.listen(3000);