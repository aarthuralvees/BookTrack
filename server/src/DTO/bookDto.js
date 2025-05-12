import { z } from 'zod';

export const bookDto = z.object({
  titulo: z.string({
    required_error: 'O nome é obrigatório',
  })
    .min(3, 'Mínimo de 3 letras')
    .max(100, 'Máximo de 100 letras')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: 'O nome deve conter apenas letras',
    }),

  autor: z.string().optional(),

  status: z.enum(['Lido', 'Lendo', 'Quero ler'], { required_error: 'Status obrigatório' }),

  avaliacao: z.number()
    .min(1, 'Avaliação mínima é 1')
    .max(5, 'Avaliação máxima é 5')
    .optional(),

  data_conclusao: z.string().optional(),
});

export const updateBook = bookDto.partial()
