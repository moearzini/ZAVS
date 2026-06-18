import { Router } from "express";
import { nanoid } from "nanoid";
import { prisma } from "../db.js";
import { createTicketSchema, updateTicketStatusSchema } from "../validation.js";

export const ticketRouter = Router();

function generateTicketNumber(): string {
  const year = new Date().getFullYear();
  const id = nanoid(6).toUpperCase();
  return `ZAVS-${year}-${id}`;
}

// Create ticket
ticketRouter.post("/", async (req, res) => {
  const parsed = createTicketSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const ticket = await prisma.ticket.create({
    data: {
      ...parsed.data,
      ticketNumber: generateTicketNumber(),
      accessToken: nanoid(32),
      course: parsed.data.course ?? null,
      room: parsed.data.room ?? null,
      history: {
        create: {
          newStatus: "new",
          comment: "Ticket erstellt",
        },
      },
    },
    include: { history: true },
  });

  res.status(201).json(ticket);
});

// Get ticket by access token (public status page)
ticketRouter.get("/status/:accessToken", async (req, res) => {
  const ticket = await prisma.ticket.findUnique({
    where: { accessToken: req.params.accessToken },
    include: {
      history: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!ticket) {
    res.status(404).json({ error: "Ticket nicht gefunden" });
    return;
  }

  const { email, accessToken: _token, ...publicTicket } = ticket;
  res.json(publicTicket);
});

// List all tickets (backend users)
ticketRouter.get("/", async (req, res) => {
  const { status, category } = req.query;

  const tickets = await prisma.ticket.findMany({
    where: {
      ...(status ? { status: String(status) } : {}),
      ...(category ? { category: String(category) } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(tickets);
});

// Get ticket by ID (backend users)
ticketRouter.get("/:id", async (req, res) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      history: { orderBy: { createdAt: "asc" } },
      attachments: true,
    },
  });

  if (!ticket) {
    res.status(404).json({ error: "Ticket nicht gefunden" });
    return;
  }

  res.json(ticket);
});

// Update ticket status
ticketRouter.patch("/:id/status", async (req, res) => {
  const parsed = updateTicketStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const existing = await prisma.ticket.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!existing) {
    res.status(404).json({ error: "Ticket nicht gefunden" });
    return;
  }

  const ticket = await prisma.ticket.update({
    where: { id: Number(req.params.id) },
    data: {
      status: parsed.data.status,
      history: {
        create: {
          oldStatus: existing.status,
          newStatus: parsed.data.status,
          comment: parsed.data.comment ?? null,
        },
      },
    },
    include: {
      history: { orderBy: { createdAt: "asc" } },
    },
  });

  res.json(ticket);
});
