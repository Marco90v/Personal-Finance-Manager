export interface Cuenta {
  id: string;
  nombre: string;
  saldo: number;
}

export type TipoTransaccion = "income" | "expenses";

export interface Transaccion {
  id: string;
  tipo: TipoTransaccion;
  monto: number;
  fecha: string;
  categoria: string;
  cuentaId: string;
  notas?: string;
}