import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ListTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Imagem</TableHead>
          <TableHead className="w-[330px] max-md:w-[150px]">Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right">Marca</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="whitespace-normal">
                <Skeleton className="h-[48px] w-[48px] rounded-xl" />
              </TableCell>
              <TableCell className="whitespace-normal max-sm:min-w-[150px]">
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell className="whitespace-normal">
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell className="text-right whitespace-normal">
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
