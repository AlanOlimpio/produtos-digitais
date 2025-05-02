import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useMediaQuery } from "@/hooks/use-media-query";
import { device } from "@/utils/media-querys";

export function ListTableSkeleton() {
  const isMobile = useMediaQuery(device.tablet);
  return (
    <>
      {isMobile ? (
        <div className="grid w-full ">
          <div className="p-2 rounded-sm border-1 bg-sidebar rounded-b-none font-bold grid grid-cols-[1fr_200px_20px] cursor-pointer gap-4 w-full justify-between text-left items-center">
            <p>Imagem</p>
            <p>Nome</p>
          </div>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <div
                key={`product-mobile-${i}`}
                className="border-1 border-t-0 last:border-b-1 p-0 "
              >
                <div className="p-2  grid grid-cols-[1fr_200px_20px] cursor-pointer gap-4 w-full justify-between text-left items-center">
                  <Skeleton className="h-[48px] w-[48px] rounded-xl" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-[20px] w-[20px] rounded-sm" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
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
      )}
    </>
  );
}
