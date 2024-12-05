import { z } from "zod";

const ArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export default ArticleSchema;
