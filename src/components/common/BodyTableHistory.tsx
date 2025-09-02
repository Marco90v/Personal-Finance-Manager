import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";
import type { Transaction } from "@/type";
import { format } from "date-fns";
import { useFinanceStore } from "@/stores/financeStore";
import { useShallow } from "zustand/shallow";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { getNameCategory } from "@/lib/functions";

interface Props {
  transaction: Transaction;
}

const BodyTableHistory = ({transaction}: Props) => {
  // console.log(transaction)
  const { getNameAccount, removeTransaccion } =  useFinanceStore(useShallow(s => ({
    getNameAccount: s.getNameAccount,
    removeTransaccion: s.removeTransaccion,
  })))

  return (
    <TableRow key={transaction.id}>
      <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
      <TableCell>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
          )}
        >
          {transaction.type === "income" ? "Income" : "Expense"}
        </span>
      </TableCell>
      <TableCell>{getNameCategory(transaction.expenseTypeId)}</TableCell>
      {/* <TableCell>{transaction.description}</TableCell> */}
      <TableCell>{getNameAccount(transaction.accountId)}</TableCell>
      <TableCell className="text-right font-medium">
        <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          {/* <Button variant="ghost" size="sm" onClick={() => onEdit?.(transaction)} className="h-8 w-8 p-0 cursor-pointer">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit transaction</span>
          </Button> */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeTransaccion(transaction.id)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove transaction</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BodyTableHistory;