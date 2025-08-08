// src/store/financeStore.ts
import type { Cuenta, Transaccion } from "@/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  cuentas as cuentasMock,
  transacciones as transaccionesMock,
} from "@/data/mockData";

interface FinanceStore {
  cuentas: Cuenta[];
  transacciones: Transaccion[];
  addCuenta: (cuenta: Cuenta) => void;
  updateCuenta: (id: string, data: Partial<Cuenta>) => void;
  removeCuenta: (id: string) => void;
  addTransaccion: (tx: Transaccion) => void;
  updateTransaccion: (id: string, data: Partial<Transaccion>) => void;
  removeTransaccion: (id: string) => void;
  getSaldoTotal: () => number;
  getIncomesTotal: () => number;
  getExpensesTotal: () => number;
  getTransaccionesPorCuenta: (cuentaId: string) => Transaccion[];
  cargarDatosDesdeFirebase?: () => Promise<void>;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      cuentas: cuentasMock,
      transacciones: transaccionesMock,

      addCuenta: (cuenta) =>
        set((state) => ({ cuentas: [...state.cuentas, cuenta] })),

      updateCuenta: (id, data) =>
        set((state) => ({
          cuentas: state.cuentas.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),

      removeCuenta: (id) =>
        set((state) => ({
          cuentas: state.cuentas.filter((c) => c.id !== id),
          transacciones: state.transacciones.filter((t) => t.cuentaId !== id),
        })),

      addTransaccion: (tx) =>
        set((state) => ({ transacciones: [...state.transacciones, tx] })),

      updateTransaccion: (id, data) =>
        set((state) => ({
          transacciones: state.transacciones.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),

      removeTransaccion: (id) =>
        set((state) => ({
          transacciones: state.transacciones.filter((t) => t.id !== id),
        })),

      getSaldoTotal: () => {
        const { cuentas } = get();
        return cuentas.reduce((total, cuenta) => total + cuenta.saldo, 0);
      },

      getIncomesTotal: () => {
        const { transacciones } = get();
        return transacciones
          .filter((t) => t.tipo === "income")
          .reduce((total, tx) => total + tx.monto, 0);
      },

      getExpensesTotal: () => {
        const { transacciones } = get();
        return transacciones
          .filter((t) => t.tipo === "expenses")
          .reduce((total, tx) => total + tx.monto, 0);
      },

      getTransaccionesPorCuenta: (cuentaId) => {
        const { transacciones } = get();
        return transacciones.filter((t) => t.cuentaId === cuentaId);
      },

      cargarDatosDesdeFirebase: async () => {
        // TODO: Implementar conexión con Firebase y actualizar estado
      },
    }),
    {
      name: "finance-store", // nombre clave en localStorage
      storage: createJSONStorage(() => localStorage), // usa localStorage
      partialize: (state) => ({
        cuentas: state.cuentas,
        transacciones: state.transacciones,
      }), // solo persiste datos, no funciones
    }
  )
);
