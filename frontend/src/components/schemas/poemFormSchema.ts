import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(1, {
        message: "O título é obrigatório.",
    }),
    author: z.string().optional(),
    content: z.string().min(1, {
        message: "O conteúdo é obrigatório.",
    }),
    poemDate: z.object({
        day: z.string().optional(),
        month: z.string().optional(),
        year: z.string().optional(),
    })
})

export type FormData = z.infer<typeof formSchema>;