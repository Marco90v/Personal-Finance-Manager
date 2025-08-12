import type { Account, ExpenseTransaction, IncomeTransaction, Transaction } from "@/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  accounts as cuentasMock,
  transacciones as transaccionesMock,
} from "@/data/mockData";
import { EXPENSE, INCOME } from "@/lib/const";
import dayjs from "dayjs";

interface FinanceStore {
  accounts: Account[];
  transactions: Transaction[];
  filterDate: string | undefined;
  addAccount: (cuenta: Account) => void;
  updateAccount: (id: string, data: Partial<Account>) => void;
  removeAccount: (id: string) => void;
  addTransaccion: (tx: Transaction) => void;
  // updateTransaccion: (id: string, data: Partial<Transaction>) => void;
  removeTransaccion: (id: string) => void;
  getTotalBalance: () => number;
  getIncomesTotal: () => number;
  getExpensesTotal: () => number;
  // getTransaccionesPorCuenta: (cuentaId: string) => Transaction[];
  cargarDatosDesdeFirebase?: () => Promise<void>;
  getNameAccount: (id: string) => string;

  addFilterDate: (date: Date | undefined) => void;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      accounts: cuentasMock,
      transactions: transaccionesMock,
      filterDate: undefined,

      addAccount: (account) =>
        set((state) => ({ accounts: [...state.accounts, account] })),

      updateAccount: (id, data) =>
        set((state) => ({
          accounts: state.accounts.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),

      removeAccount: (id) =>
        set((state) => ({
          accounts: state.accounts.filter((c) => c.id !== id),
          // transacciones: state.transacciones.filter((t) => t.accountId !== id),
        })),

      addTransaccion: (tx) => set((state) => ({
        transactions: [...state.transactions, tx],
        accounts: state.accounts.map(account=>{
          if(tx.accountId === account.id){
            return {...account, balance: tx.type === INCOME ? account.balance + tx.amount : account.balance - tx.amount}
          }
          return account
        })
      })),

      // updateTransaccion: (id, data) =>
      //   set((state) => ({
      //     transactions: state.transactions.map((t) => {
      //       if (t.id !== id) return t;

      //       if (t.type === INCOME) {
      //         return { ...t, ...data, type: INCOME, recurrence: null } as IncomeTransaction;
      //       } else {
      //         return { ...t, ...data, type: EXPENSE } as ExpenseTransaction;
      //       }
      //     }),
      //   })),

      removeTransaccion: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      getTotalBalance: () => {
        const { accounts } = get();
        return accounts.reduce((total, cuenta) => total + cuenta.balance, 0);
      },

      getIncomesTotal: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === INCOME)
          .reduce((total, tx) => total + tx.amount, 0);
      },

      getExpensesTotal: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === EXPENSE)
          .reduce((total, tx) => total + tx.amount, 0);
      },

      // getTransaccionesPorCuenta: (cuentaId) => {
      //   const { transactions } = get();
      //   return transactions.filter((t) => t.accountId === cuentaId);
      // },

      cargarDatosDesdeFirebase: async () => {
        // TODO: Implementar conexión con Firebase y actualizar estado
      },

      getNameAccount: (id: string) => {
        const { accounts } = get();
        return accounts.find((a) => a.id === id)?.name ?? "Unknown Account";
      },

      addFilterDate: (date) => set(() => ({ filterDate: dayjs(date).format("YYYY-MM-DD") })),

    }),
    {
      name: "finance-store", // nombre clave en localStorage
      storage: createJSONStorage(() => localStorage), // usa localStorage
      partialize: (state) => ({
        accounts: state.accounts,
        transactions: state.transactions,
      }), // solo persiste datos, no funciones
    }
  )
);
