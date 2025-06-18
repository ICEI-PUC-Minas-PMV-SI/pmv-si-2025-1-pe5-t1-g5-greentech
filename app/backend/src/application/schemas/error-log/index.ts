import z from "zod";

export const create = z.object({
  workerId: z.number().int().positive(),
  machineId: z.number().int().positive().nullable(), 
  collectorId: z.number().int().positive().nullable(),
  code: z.string().max(50),
  severity: z.string().max(50),
  message: z.string(),
  trace: z.string().nullable(),
  timestamp: z.coerce.date(),
});

export const errorLog = z.object({ body: create.omit({ workerId: true }) });