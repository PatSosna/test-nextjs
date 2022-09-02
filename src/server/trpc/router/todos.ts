import { t } from "../trpc";
import { z } from "zod";

export const todoRouter = t.router({
    getTodoList: t.procedure.query(({ ctx }) => {
        return ctx.prisma.todo.findMany();
    }),

    createTodo: t.procedure
        .input(z.object({ title: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.todo.create({
                data: {
                    title: input.title,
                    done: false,
                },
            });
        }
        ),

    updateTodo: t.procedure
        .input(z.object({ id: z.string(), done: z.boolean() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.todo.update({
                where: { id: input.id },
                data: {
                    done: input.done,
                },
            });
        }
        ),

    deleteTodo: t.procedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.todo.delete({
                where: { id: input.id },
        });
    }),

    hello: t.procedure
        .input(
            z.object({ text: z.string().nullish() })
                .nullish()
        )
        .query(({ input }) => {
            return {
                greeting: `hello ${input?.text ?? 'world'}`,
            };
        })
});
