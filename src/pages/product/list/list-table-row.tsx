import { TableCell, TableRow } from "@/components/ui/table";

export function ListTableRow(product: ProductData) {
  return (
    <TableRow key={product.id}>
      <TableCell>
        <img
          className="inline-block size-12 rounded-sm object-cover"
          src={product.image}
          alt={product.name}
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell className="text-right">{product.brand.name}</TableCell>
    </TableRow>
  );
}
