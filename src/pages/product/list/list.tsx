import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ListTableRow } from "./list-table-row";
import { Pagination } from "@/components/pagination";
import { ProductsContext } from "@/contexts/products-context";
import { useContext } from "react";
import { InputSearch } from "./search";

export function List() {
  const { products } = useContext(ProductsContext);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Lista de produtos</h1>
      <div className="flex items-center gap-2">
        <InputSearch />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="text-right">Marca</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <ListTableRow
                id={product.id}
                key={`product-${product.id}`}
                image={product.image}
                name={product.name}
                price={product.price}
                brand={{ id: product.brand.id, name: product.brand.name }}
              />
            );
          })}
        </TableBody>
      </Table>
      <Pagination pageIndex={0} totalCount={105} perPage={10} />
    </div>
  );
}
