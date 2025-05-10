import { z } from 'zod';

export const userDto = z.object({
  nome: z.string({
    required_error: 'O nome é obrigatório',
  })
    .min(3, { message: 'O nome tem que conter no mínimo 3 letras' })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: 'O nome deve conter apenas letras',
    }),

  email: z.string({
    required_error: 'Campo obrigatório não preenchido',
  })
    .email({ message: 'O email informado não é válido' }),

  senha: z
    .string({
      required_error: 'A senha é obrigatória',
    })
    .min(5, { message: 'A senha deve conter no mínimo 5 caracteres' }),
});

export const updateUserDto = userDto.partial()