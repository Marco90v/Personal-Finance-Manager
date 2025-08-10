import { TableCell, TableRow } from "@/components/ui/table";

const NoFilters = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
        No transactions found matching your filters.
      </TableCell>
    </TableRow>
  );
};

export default NoFilters;