import z from "zod";

export const unique = z.object({ params: z.object({ collectorId: z.coerce.number().int().positive() }) });

const read = z.object({
    machine: z.coerce.number().int().positive(),
    var: z.string(),
    value: z.number().or(z.string()),
    timestamp: z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date.getFullYear() > 1970 && date.toISOString() === val; 
    }, {
      message: 'Invalid timestamp format',
    }).transform((val) => new Date(val)),
  });
  
  const reads = z.array(read);
  
  export const postData = z.object({ 
    body: z.object({ reads })
  });
