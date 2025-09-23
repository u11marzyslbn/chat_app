import express from "express";
import cors from "cors";

const app = express();
const port = 4943;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (like your Rust backend)
let chatMessages = [];

// Routes that match your IC backend
app.post("/api/v2/canister/rrkah-fqaaa-aaaaa-aaaaq-cai/call", (req, res) => {
  const method = req.body.method_name;
  const args = req.body.arg;

  console.log(`Called method: ${method}`);

  switch (method) {
    case "save_chat":
      // Decode the message from Candid format (simplified)
      const message = Buffer.from(args, "base64")
        .toString("utf8")
        .replace(/[^\x20-\x7E]/g, "");
      const cleanMessage = message.substring(
        message.indexOf('"') + 1,
        message.lastIndexOf('"')
      );
      chatMessages.push(cleanMessage);
      console.log(`Saved message: ${cleanMessage}`);
      res.json({
        status: "replied",
        reply: { arg: Buffer.from("4449444c0000").toString("base64") },
      });
      break;

    case "get_chat":
      // Return messages in Candid format (simplified)
      const response = JSON.stringify(chatMessages);
      const encodedResponse = Buffer.from(response).toString("base64");
      res.json({ status: "replied", reply: { arg: encodedResponse } });
      break;

    case "greet":
      const name = Buffer.from(args, "base64")
        .toString("utf8")
        .replace(/[^\x20-\x7E]/g, "");
      const cleanName = name.substring(
        name.indexOf('"') + 1,
        name.lastIndexOf('"')
      );
      const greeting = `Hello, ${cleanName}!`;
      const greetingResponse = Buffer.from(JSON.stringify(greeting)).toString(
        "base64"
      );
      res.json({ status: "replied", reply: { arg: greetingResponse } });
      break;

    default:
      res.status(404).json({ error: "Method not found" });
  }
});

// Health check
app.get("/api/v2/status", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(port, () => {
  console.log(`Mock IC backend running on http://localhost:${port}`);
  console.log("Chat messages will persist during this session");
});
