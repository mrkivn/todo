import { z } from "zod";

// Todo schema for Firestore
export const todoSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Task cannot be empty"),
  completed: z.boolean(),
  timestamp: z.number(),
});

export const insertTodoSchema = todoSchema.omit({ id: true });

export type Todo = z.infer<typeof todoSchema>;
export type InsertTodo = z.infer<typeof insertTodoSchema>;
