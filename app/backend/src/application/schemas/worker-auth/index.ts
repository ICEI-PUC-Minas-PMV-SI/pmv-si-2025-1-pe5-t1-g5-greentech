// schemas/auth-worker.ts
import z from "zod";

export const unique = z.object({ params: z.object({ workerId: z.coerce.number().int().positive() }) });

export const generateToken = z.object({
  params: z.object({
    workerMac: z.string().refine(
      (val) => {
        const macRegex = /^([0-9A-Fa-f]{2}[:.-]?){6}$/;
        return macRegex.test(val);
      },
      { message: "Invalid mac" }
    )
  })
});

// export const getByToken = z
//   .object({params: z.object({token: z.string().uuid({ message: "Invalid UUIDv4 token" })})});