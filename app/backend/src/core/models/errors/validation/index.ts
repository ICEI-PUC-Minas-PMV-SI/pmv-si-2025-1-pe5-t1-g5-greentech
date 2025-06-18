import httpErrors from "http-errors";
import { ZodError } from "zod";

export default class ValidationError extends httpErrors.BadRequest {
  public issues: ZodError["issues"];

  constructor(message: string, issues: ZodError["issues"]) {
    super(message);
    this.issues = issues;
  }
}
