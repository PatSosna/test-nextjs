// src/server/router/index.ts
import { t } from "../trpc";

import { todoRouter } from "./todos";

export const appRouter = t.router({
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
