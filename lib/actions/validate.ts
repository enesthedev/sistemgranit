import type { ZodSchema } from "zod";
import { ActionError } from "./response";

export async function validateInput<T>(
  schema: ZodSchema<T>,
  data: unknown,
): Promise<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const key = issue.path.join(".");
      if (!details[key]) {
        details[key] = [];
      }
      details[key].push(issue.message);
    }

    throw new ActionError("Doğrulama başarısız", "VALIDATION_ERROR", details);
  }

  return result.data;
}
