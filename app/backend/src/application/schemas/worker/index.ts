import z from "zod";

export const unique = z.object({ params: z.object({ workerId: z.coerce.number().int().positive() }) });

export const getCollectors = z.object({});

export const getConfigVersion = z.object({});
