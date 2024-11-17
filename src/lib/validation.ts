import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve conter no mínimo 3 caracteres")
    .max(100, "Título deve conter no máximo 100 caracteres"),
  description: z
    .string()
    .min(20, "Descrição deve conter no mínimo 20 caracteres")
    .max(500, "Descrição deve conter no máximo 500 caracteres"),
  category: z
    .string()
    .min(3, "Categoria deve conter no mínimo 3 caracteres")
    .max(20, "Categoria deve conter no máximo 20 caracteres"),
  link: z
    .string()
    .url("URL inválida")
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }, "Imagem inválida"),
  pitch: z.string().min(10, "Apresentação deve conter no mínimo 10 caracteres"),
});
