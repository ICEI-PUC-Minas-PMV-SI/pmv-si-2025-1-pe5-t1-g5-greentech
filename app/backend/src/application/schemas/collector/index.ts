import z from "zod";

export const unique = z.object({ params: z.object({ collectorId: z.coerce.number().int().positive() }) });

export const getVariables = z.object({});
