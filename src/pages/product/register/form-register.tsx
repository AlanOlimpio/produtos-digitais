import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NumericFormat } from "react-number-format";
import { priceParseFloat } from "@/utils/formatter";
import { fileToBase64 } from "@/utils/file-to-base-64";
import { useContext } from "react";
import { ProductsContext } from "@/contexts/products-context";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

const productSchema = z.object({
  name: z
    .string({ message: "Campo Obrigatório." })
    .min(3, { message: "Informe no mínimo 3 caracteres." })
    .max(80, { message: "Informe no máximo 80 caracteres." }),
  price: z
    .string({ message: "Campo Obrigatório." })
    .min(1, { message: "Informe um valor." }),
  brand: z
    .string({ message: "Campo Obrigatório!" })
    .min(3, { message: "Informe no mínimo 3 caracteres." })
    .max(80, { message: "Informe no máximo 80 caracteres." }),
  image: z
    .any()
    .refine((file) => file?.[0] instanceof File, {
      message: "Imagem é obrigatória.",
    })
    .refine((files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type), {
      message: "Tipo de imagem inválido. Só aceitamos JPEG ou PNG.",
    })
    .refine((file) => file?.[0]?.size < 5 * 1024 * 1024, {
      message: "A imagem deve ter menos de 5MB.",
    }),
});

type RegisterForm = z.infer<typeof productSchema>;

export function FormRegister() {
  const { createProduct } = useContext(ProductsContext);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(productSchema),
  });

  async function handleRegisterProduct(data: RegisterForm) {
    const fileList = data.image;

    if (!fileList || fileList.length === 0) {
      return;
    }

    const file = fileList[0];

    try {
      const base64 = await fileToBase64(file);
      const dataFormat = {
        ...data,
        price: priceParseFloat(data.price),
        image: base64,
        brand: {
          id: uuid(),
          name: data.brand,
        },
      };
      await createProduct(dataFormat);
      toast.success("Produto cadastrado com sucesso.");

      reset();
    } catch (error) {
      toast.error("Ocorreu um erro.");
      console.error("Erro ao enviar o formulário:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterProduct)}>
      <div className="grid grid-cols-2 py-4 gap-4 items-start max-sm:grid-cols-1">
        <div className="grid items-center gap-4">
          <Label className="text-right" htmlFor="name">
            Nome
          </Label>
          <Input
            className="w-full"
            id="name"
            placeholder="Nome"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 font-medium">
              {errors.name?.message}
            </span>
          )}
        </div>
        <div className="grid items-center gap-4">
          <Label className="text-right" htmlFor="price">
            Preço
          </Label>
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <NumericFormat
                  id="price"
                  onChange={field.onChange}
                  value={field.value ?? ""}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  getInputRef={field.ref}
                  customInput={Input}
                  placeholder="100,00"
                />
                {fieldState?.error && (
                  <span className="text-red-500 font-medium">
                    {fieldState?.error?.type && fieldState?.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className="grid items-center gap-4">
          <Label className="text-right" htmlFor="brand">
            Marca
          </Label>
          <Input
            className="w-full"
            id="brand"
            placeholder="Marca"
            {...register("brand")}
          />
          {errors.brand && (
            <span className="text-red-500 font-medium">
              {errors.brand?.message}
            </span>
          )}
        </div>
        <div className="grid items-center gap-4">
          <Label className="text-right" htmlFor="image">
            Imagem do Produto
          </Label>
          <Input
            type="file"
            className="w-full"
            id="image"
            {...register("image")}
          />
          {errors.image && (
            <span className="text-red-500 font-medium">
              {errors.image?.message as string}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="max-sm:w-full"
        >
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
