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
    }).refine(
        (date) => {
            const filledFields = [date.day, date.month, date.year]
                .filter(field => field !== undefined && field !== "").length;

            return filledFields === 0 || filledFields === 3;
        },
        {
            message: "Preencha todos os campos da data ou deixe todos vazios.",
        }
    )
})

export type FormData = z.infer<typeof formSchema>;