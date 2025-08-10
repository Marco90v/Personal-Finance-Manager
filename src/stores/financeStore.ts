// src/store/financeStore.ts
import type { Account, ExpenseTransaction, IncomeTransaction, Transaction } from "@/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  accounts as cuentasMock,
  transacciones as transaccionesMock,
} from "@/data/mockData";

interface FinanceStore {
  accounts: Account[];
  transacciones: Transaction[];
  addAccount: (cuenta: Account) => void;
  updateAccount: (id: string, data: Partial<Account>) => void;
  removeAccount: (id: string) => void;
  addTransaccion: (tx: Transaction) => void;
  updateTransaccion: (id: string, data: Partial<Transaction>) => void;
  removeTransaccion: (id: string) => void;
  getTotalBalance: () => number;
  getIncomesTotal: () => number;
  getExpensesTotal: () => number;
  getTransaccionesPorCuenta: (cuentaId: string) => Transaction[];
  cargarDatosDesdeFirebase?: () => Promise<void>;
  getNameAccount: (id: string) => string;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      accounts: cuentasMock,
      transacciones: transaccionesMock,

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

      addTransaccion: (tx) =>
        set((state) => ({ transacciones: [...state.transacciones, tx] })),

      updateTransaccion: (id, data) =>
        set((state) => ({
          transacciones: state.transacciones.map((t) => {
            if (t.id !== id) return t;

            if (t.type === "income") {
              return { ...t, ...data, type: "income", recurrence: null } as IncomeTransaction;
            } else {
              return { ...t, ...data, type: "expense" } as ExpenseTransaction;
            }
          }),
        })),

      removeTransaccion: (id) =>
        set((state) => ({
          transacciones: state.transacciones.filter((t) => t.id !== id),
        })),

      getTotalBalance: () => {
        const { accounts } = get();
        return accounts.reduce((total, cuenta) => total + cuenta.balance, 0);
      },

      getIncomesTotal: () => {
        const { transacciones } = get();
        return transacciones
          .filter((t) => t.type === "income")
          .reduce((total, tx) => total + tx.amount, 0);
      },

      getExpensesTotal: () => {
        const { transacciones } = get();
        return transacciones
          .filter((t) => t.type === "expense")
          .reduce((total, tx) => total + tx.amount, 0);
      },

      getTransaccionesPorCuenta: (cuentaId) => {
        const { transacciones } = get();
        return transacciones.filter((t) => t.accountId === cuentaId);
      },

      cargarDatosDesdeFirebase: async () => {
        // TODO: Implementar conexión con Firebase y actualizar estado
      },

      getNameAccount: (id: string) => {
        const { accounts } = get();
        return accounts.find((a) => a.id === id)?.name ?? "Unknown Account";
      },

    }),
    {
      name: "finance-store", // nombre clave en localStorage
      storage: createJSONStorage(() => localStorage), // usa localStorage
      partialize: (state) => ({
        cuentas: state.accounts,
        transacciones: state.transacciones,
      }), // solo persiste datos, no funciones
    }
  )
);
