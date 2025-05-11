import { z } from "zod";

export const bookDto = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("Lido", { required_error: "Status do livro obrigatório" }),

    titulo: z.string()
      .min(3, { message: "O nome tem que conter no mínimo 3 letras" })
      .max(100, { message: "O nome não pode conter mais que 100 letras" }),

    autor: z.string().optional(),

    avaliacao: z.number().optional()
      .min(1, { message: "Avaliação mínima é 1" })
      .max(5, { message: "Avaliação máxima é 5" }),

    data_conclusao: z.string().optional(),
  }),
  z.object({
    status: z.enum(["Quero ler", "Lendo"], { required_error: "Status do livro obrigatório" }),

    titulo: z.string()
      .min(3, { message: "O nome tem que conter no mínimo 3 letras" })
      .max(100, { message: "O nome não pode conter mais que 100 letras" }),

    autor: z.string().optional(),
    avaliacao: z.undefined(),
    data_conclusao: z.undefined(),
  }),
]);

export const updateBook = bookDto.partial()
