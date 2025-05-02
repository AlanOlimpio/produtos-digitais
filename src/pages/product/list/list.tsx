import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ListTableRow } from "./list-table-row";
import { Pagination } from "@/components/pagination";
import { perPage, ProductsContext } from "@/contexts/products-context";
import { useContext } from "react";
import { InputSearch } from "./search";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { EmptyState } from "@/components/empty-state";
import { ListTableSkeleton } from "./list-table-skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { device } from "@/utils/media-querys";

import { ListAccordion } from "./list-accordion";

export function List() {
  const { products, totalCount, isLoading, isError } =
    useContext(ProductsContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useMediaQuery(device.tablet);

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Lista de produtos</h1>
      <div className="flex items-center gap-2">
        <InputSearch />
      </div>
      {isLoading && <ListTableSkeleton />}
      {isError && (
        <div className="flex mt-4 min-h-[200px] flex-col items-center justify-center gap-2">
          <p className="text-red-500 text-2xl font-bold">Ocorreu um erro!</p>
        </div>
      )}

      {!isLoading && products && products.length > 0 && (
        <>
          {isMobile ? (
            <>
              <ListAccordion products={products} />
            </>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Imagem</TableHead>
                  <TableHead className="w-[330px] max-md:w-[150px]">
                    Nome
                  </TableHead>
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
          )}

          <Pagination
            pageIndex={pageIndex}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={handlePaginate}
          />
        </>
      )}
      {!isLoading && !isError && products && products.length === 0 && (
        <EmptyState />
      )}
    </div>
  );
}
