import { z } from 'zod';

export const formSchema = z.object({
    username: z.string().min(1, {
        message: "O nome de usuário é obrigatório.",
    }),
    password: z.string().min(1, {
        message: "A senha é obrigatória.",
    }),
})

export type FormData = z.infer<typeof formSchema>;