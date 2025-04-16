import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import imageDorflex from "@/assets/images/dorflex-uno-20-comprimidos.jpg";
import { ListTableRow } from "./list-table-row";
import { Pagination } from "@/components/pagination";

export function List() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Lista de produtos</h1>
      <form className="flex items-center gap-2">
        <Input placeholder="Pesquisar" className="h-8 w-full max-w-[320px]" />
      </form>
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
          {Array.from({ length: 8 }).map((_, index) => {
            return (
              <ListTableRow
                id={index.toString()}
                image={imageDorflex}
                name="Dorflex"
                price={15.0}
                brand={{ id: "132123", name: "Sanofi" }}
              />
            );
          })}
        </TableBody>
      </Table>
      <Pagination pageIndex={0} totalCount={105} perPage={10} />
    </div>
  );
}
