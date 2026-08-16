import { SaleOrder, SummaryStats, PaymentGateway } from '../types';

const STORAGE_KEY = 'tabby_tamara_sales_monitor_v1';

const INITIAL_SAMPLE_SALES: SaleOrder[] = [
  {
    id: 's-1',
    orderNumber: 'INV-1001',
    customerName: 'فهد العتيبي',
    date: '2026-08-14',
    gateway: 'tabby',
    grossAmount: 3600,
    commissionFee: 127.00,  // (3600 * 3.5%) + 1 SAR
    vatOnCommission: 19.05, // 127 * 15%
    totalDeduction: 146.05,
    netAmount: 3453.95,
    notes: 'شاشة سامسونج 65 بوصة'
  },
  {
    id: 's-2',
    orderNumber: 'INV-1002',
    customerName: 'سارة الدوسري',
    date: '2026-08-15',
    gateway: 'tamara',
    grossAmount: 4800,
    commissionFee: 193.02,  // (4800 * 3.99%) + 1.5 SAR
    vatOnCommission: 28.95, // 193.02 * 15%
    totalDeduction: 221.97,
    netAmount: 4578.03,
    notes: 'آيفون 15 بروماكس'
  },
  {
    id: 's-3',
    orderNumber: 'INV-1003',
    customerName: 'عبدالله الشمري',
    date: '2026-08-16',
    gateway: 'tabby',
    grossAmount: 1800,
    commissionFee: 64.00,   // (1800 * 3.5%) + 1 SAR
    vatOnCommission: 9.60,  // 64 * 15%
    totalDeduction: 73.60,
    netAmount: 1726.40,
    notes: 'بلايستيشن 5'
  }
];

export function getSavedSales(): SaleOrder[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_SALES));
    return INITIAL_SAMPLE_SALES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_SAMPLE_SALES;
  }
}

export function saveNewSale(order: {
  orderNumber: string;
  customerName: string;
  date: string;
  gateway: PaymentGateway;
  grossAmount: number;
  notes?: string;
  tabbyRate?: number;
  tabbyFixed?: number;
  tamaraRate?: number;
  tamaraFixed?: number;
}): SaleOrder {
  const currentSales = getSavedSales();

  const rate = order.gateway === 'tabby' ? (order.tabbyRate ?? 3.5) : (order.tamaraRate ?? 3.99);
  const fixed = order.gateway === 'tabby' ? (order.tabbyFixed ?? 1.0) : (order.tamaraFixed ?? 1.5);

  const baseComm = (order.grossAmount * (rate / 100)) + fixed;
  const vat = baseComm * 0.15;
  const totalDeduct = baseComm + vat;
  const net = Math.max(0, order.grossAmount - totalDeduct);

  const newSale: SaleOrder = {
    id: 'sale-' + Date.now(),
    orderNumber: order.orderNumber,
    customerName: order.customerName || 'عميل عام',
    date: order.date,
    gateway: order.gateway,
    grossAmount: Number(order.grossAmount),
    commissionFee: Number(baseComm.toFixed(2)),
    vatOnCommission: Number(vat.toFixed(2)),
    totalDeduction: Number(totalDeduct.toFixed(2)),
    netAmount: Number(net.toFixed(2)),
    notes: order.notes || ''
  };

  const updated = [newSale, ...currentSales];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newSale;
}

export function deleteSale(id: string): void {
  const updated = getSavedSales().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function computeSummaryStats(sales: SaleOrder[]): SummaryStats {
  let totalSales = 0;
  let tabbySales = 0;
  let tamaraSales = 0;
  let totalCommissions = 0;
  let totalVat = 0;
  let totalNet = 0;

  sales.forEach(s => {
    totalSales += s.grossAmount;
    if (s.gateway === 'tabby') tabbySales += s.grossAmount;
    if (s.gateway === 'tamara') tamaraSales += s.grossAmount;
    totalCommissions += s.commissionFee;
    totalVat += s.vatOnCommission;
    totalNet += s.netAmount;
  });

  return {
    totalSales,
    tabbySales,
    tamaraSales,
    totalCommissions,
    totalVat,
    totalNet,
    ordersCount: sales.length
  };
}

export function resetSalesData(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_SALES));
}
