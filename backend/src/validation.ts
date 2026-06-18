import { z } from "zod";

export const TicketCategory = z.enum([
  "IT",
  "Facility Management",
  "Sekretariat",
  "Verwaltung",
  "Unterrichtsmaterial",
  "Sonstiges Anliegen",
]);

export const TicketPriority = z.enum(["low", "normal", "high", "urgent"]);

export const TicketStatus = z.enum([
  "new",
  "assigned",
  "in_progress",
  "waiting",
  "forwarded",
  "completed",
  "rejected",
  "auth_required",
]);

export const createTicketSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  category: TicketCategory,
  priority: TicketPriority.default("normal"),
  email: z.string().email(),
  course: z.string().max(100).nullable().optional(),
  room: z.string().max(100).nullable().optional(),
});

export const updateTicketStatusSchema = z.object({
  status: TicketStatus,
  comment: z.string().nullable().optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;
