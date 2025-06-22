import z from "zod";

export const unique = z.object({ params: z.object({ userId: z.coerce.number().int().positive() }) });

export const update = z.object({
    params: z.object({ userId: z.coerce.number().int().positive() }),
    body: z.object({
        user: z.object({
            email: z.string().email(),
            name: z.string().min(4),
            permission: z.enum(["Admin", "RH", "Colaborador"]),
        }).partial(),
    }),
})

export const create = z.object({
    body: z.object({
        user: z.object({
            email: z.string().email(),
            name: z.string().min(4),
            password: z.string().min(8),
            permission: z.enum(["Admin", "RH", "Colaborador"]),
        }),
    }),
});
