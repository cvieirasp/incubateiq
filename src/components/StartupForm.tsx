"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "@/lib/validation";
import { createStartup } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createStartup(formValues);

      if (result.status == "SUCCESS") {
        toast({
          title: "Sucesso",
          description: "Sua Startup foi registrada com sucesso",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Erro de validação",
          description: "Por favor, verifique os campos e tente novamente",
          variant: "destructive",
        });

        return { ...prevState, error: "Erro de validação", status: "ERROR" };
      }

      toast({
        title: "Erro Interno",
        description: "Ocorreu um erro inesperado, tente novamente mais tarde",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "Ocorreu um erro inesperado",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Título
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Título da Startup..."
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Descrição da Startup..."
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Categoria
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Ex.: Educação, Tecnologia, Saúde..."
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          URL da Imagem
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="URL da Imagem da Startup..."
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Apresentação
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden", marginTop: 10 }}
          textareaProps={{
            placeholder:
              "Descreva brevemente sua ideia e qual problema ela resolve",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn" disabled={isPending}>
        {isPending ? "Aguarde..." : "Registre sua Startup"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
