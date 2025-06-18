
import z from "zod";
import validatorSingle from "./single";

const validator = (...schemas: z.Schema[]) => schemas.map(validatorSingle);

export default validator;
/**
 * @param baseSchemas Base schemas that will set in all schemas
 * @returns Function that receives the individual schemas and apply validator
 */
export const useValidatorBase = (...baseSchemas: z.Schema[]) => (
  (...schemas: z.Schema[]) => validator(...baseSchemas, ...schemas)
);