// mockData.js
export const cuentas = [
  {
    id: "cuenta_1",
    nombre: "Cuenta Bancaria",
    saldoInicial: 3000,
  },
  {
    id: "cuenta_2",
    nombre: "Efectivo",
    saldoInicial: 500,
  },
];

export const transacciones = [
  // Ingresos
  {
    id: "Demotx_001",
    tipo: "income",
    monto: 1000,
    fecha: "2025-06-01",
    categoria: "Sueldo",
    cuentaId: "cuenta_1",
    notas: "Pago mensual de trabajo",
  },
  {
    id: "Demotx_004",
    tipo: "expenses",
    monto: 200,
    fecha: "2025-06-03",
    categoria: "Alquiler",
    cuentaId: "cuenta_1",
    notas: "Renta del mes",
  },
  {
    id: "tx_001",
    tipo: "income",
    monto: 2500,
    fecha: "2025-07-01",
    categoria: "Sueldo",
    cuentaId: "cuenta_1",
    notas: "Pago mensual de trabajo",
  },
  {
    id: "tx_002",
    tipo: "income",
    monto: 300,
    fecha: "2025-07-12",
    categoria: "Freelance",
    cuentaId: "cuenta_1",
    notas: "Diseño landing page",
  },
  {
    id: "tx_003",
    tipo: "income",
    monto: 100,
    fecha: "2025-07-15",
    categoria: "Venta",
    cuentaId: "cuenta_2",
    notas: "Venta de accesorios usados",
  },

  // Gastos fijos
  {
    id: "tx_004",
    tipo: "expenses",
    monto: 700,
    fecha: "2025-07-03",
    categoria: "Alquiler",
    cuentaId: "cuenta_1",
    notas: "Renta del mes",
  },
  {
    id: "tx_005",
    tipo: "expenses",
    monto: 100,
    fecha: "2025-07-05",
    categoria: "Servicios",
    cuentaId: "cuenta_1",
    notas: "Internet y luz",
  },
  {
    id: "tx_006",
    tipo: "expenses",
    monto: 50,
    fecha: "2025-07-06",
    categoria: "Suscripciones",
    cuentaId: "cuenta_1",
    notas: "Netflix y Spotify",
  },

  // Gastos variables
  {
    id: "tx_007",
    tipo: "expenses",
    monto: 80,
    fecha: "2025-07-10",
    categoria: "Comida",
    cuentaId: "cuenta_2",
    notas: "Supermercado semanal",
  },
  {
    id: "tx_008",
    tipo: "expenses",
    monto: 40,
    fecha: "2025-07-13",
    categoria: "Transporte",
    cuentaId: "cuenta_2",
    notas: "Gasolina",
  },
  {
    id: "tx_009",
    tipo: "expenses",
    monto: 120,
    fecha: "2025-07-18",
    categoria: "Ocio",
    cuentaId: "cuenta_1",
    notas: "Cena con amigos",
  },
  {
    id: "tx_010",
    tipo: "expenses",
    monto: 60,
    fecha: "2025-07-20",
    categoria: "Compras",
    cuentaId: "cuenta_2",
    notas: "Ropa nueva",
  },
];
