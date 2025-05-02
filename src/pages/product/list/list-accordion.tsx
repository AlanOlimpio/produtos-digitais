import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { priceFormatter } from "@/utils/formatter";

export function ListAccordion({ products }: { products: ProductData[] }) {
  return (
    <Accordion type="single" collapsible className="grid w-full ">
      <div className="p-2 rounded-sm border-1 bg-accent rounded-b-none font-bold grid grid-cols-[1fr_0.9fr_20px] cursor-pointer gap-4 w-full justify-between text-left items-center">
        <p>Imagem</p>
        <p>Nome</p>
      </div>
      {products.map((product) => {
        return (
          <AccordionItem
            value={`item-${product.id}`}
            key={`product-mobile-${product.id}`}
            className="border-1 border-t-0 last:border-b-1 p-0 "
          >
            <AccordionTrigger className="p-2  grid grid-cols-[1fr_0.9fr_20px] cursor-pointer gap-4 w-full justify-between text-left items-center">
              <img
                className="inline-block size-12 rounded-sm object-cover"
                src={product.image}
                alt={product.name}
              />
              <p>{product.name}</p>
            </AccordionTrigger>
            <AccordionContent className="p-2 pb-4">
              <p className="pt-2 mt-1 grid grid-cols-[1fr_0.9fr_20px] border-b-2 pb-2  border-dashed cursor-pointer gap-4 w-full justify-between text-left items-center">
                <strong>Preço:</strong>
                <span>{priceFormatter.format(product.price)}</span>
              </p>
              <p className="pt-1 mt-4 mb-4 grid grid-cols-[1fr_0.9fr_20px] border-b-2 pb-2  border-dashed cursor-pointer gap-4 w-full justify-between text-left items-center">
                <strong>Marca:</strong>
                <span>{product.brand.name}</span>
              </p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
