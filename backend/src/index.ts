import express from "express";
import cors from "cors";
import { ticketRouter } from "./routes/tickets.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "zavs-api" });
});

app.use("/api/tickets", ticketRouter);

app.listen(PORT, () => {
  console.log(`ZAVS API running on http://localhost:${PORT}`);
});
