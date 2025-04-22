import { TableCell, TableRow } from "@/components/ui/table";
import { priceFormatter } from "@/utils/formatter";

export function ListTableRow(product: ProductData) {
  return (
    <TableRow key={product.id}>
      <TableCell className="whitespace-normal">
        <img
          className="inline-block size-12 rounded-sm object-cover"
          src={product.image}
          alt={product.name}
        />
      </TableCell>
      <TableCell className="whitespace-normal max-sm:min-w-[150px]">
        {product.name}
      </TableCell>
      <TableCell className="whitespace-normal">
        {priceFormatter.format(product.price)}
      </TableCell>
      <TableCell className="text-right whitespace-normal">
        {product.brand.name}
      </TableCell>
    </TableRow>
  );
}
