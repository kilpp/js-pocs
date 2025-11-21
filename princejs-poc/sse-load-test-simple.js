import sse from "k6/x/sse";
import { check, sleep } from "k6";
import { Counter, Rate } from "k6/metrics";

// Custom metrics
const sseConnectionErrors = new Counter("sse_connection_errors");
const sseEventsReceived = new Counter("sse_events_received");
const sseConnectionSuccess = new Rate("sse_connection_success_rate");

export const options = {
  // Simple constant VU load
  vus: 10000,
  duration: "5m",
  
  thresholds: {
    "sse_connection_success_rate": ["rate > 0.90"],
    "sse_connection_errors": ["count < 1000"],
    "http_req_duration": ["p(95) < 5000"],
  },
};

export default function () {
  const url = "http://localhost:3000/events";
  let eventCount = 0;
  let hasError = false;

  const response = sse.open(url, {}, function (client) {
    client.on("event", function (event) {
      // Skip empty events or retry messages
      if (!event.data || event.data.trim() === "") {
        return;
      }

      eventCount++;
      sseEventsReceived.add(1);

      // Keep connection open - log progress every 20 events
      if (eventCount % 20 === 0) {
        console.log(`[VU ${__VU}] Received ${eventCount} events`);
      }
    });

    client.on("error", function (error) {
      console.error(`[VU ${__VU}] Error:`, error);
      hasError = true;
      sseConnectionErrors.add(1);
    });
  });

  const success = check(response, {
    "status is 200": (r) => r && r.status === 200,
    "no errors": () => !hasError,
  });

  sseConnectionSuccess.add(success);

  sleep(1);
}
