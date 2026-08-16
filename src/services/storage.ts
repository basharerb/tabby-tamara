import { OrderRecord, SettlementRecord, ContractSetting, SummaryBalances, PaymentProvider } from '../types';

const ORDERS_KEY = 'tabby_tamara_erp_orders';
const SETTLEMENTS_KEY = 'tabby_tamara_erp_settlements';
const CONTRACTS_KEY = 'tabby_tamara_erp_contracts';

export const DEFAULT_CONTRACT: ContractSetting = {
  tabbyRate: 3.5,
  tabbyFixed: 1.0,
  tamaraRate: 3.99,
  tamaraFixed: 1.5,
  vatRate: 15
};

const SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: 'ord-101',
    orderNumber: 'INV-2026-001',
    customerName: 'فهد العتيبي',
    date: '2026-08-10',
    provider: 'tabby',
    grossAmount: 3600,
    baseCommission: 127.00, // (3600 * 3.5%) + 1
    vatOnCommission: 19.05,  // 127 * 15%
    totalDeduction: 146.05,
    netAmount: 3453.95,
    status: 'settled',
    notes: 'شاشة سامسونج أوليد'
  },
  {
    id: 'ord-102',
    orderNumber: 'INV-2026-002',
    customerName: 'سارة الدوسري',
    date: '2026-08-12',
    provider: 'tamara',
    grossAmount: 4800,
    baseCommission: 193.02, // (4800 * 3.99%) + 1.5
    vatOnCommission: 28.95,
    totalDeduction: 221.97,
    netAmount: 4578.03,
    status: 'settled',
    notes: 'آيفون 15 بروماكس'
  },
  {
    id: 'ord-103',
    orderNumber: 'INV-2026-003',
    customerName: 'عبدالله الشمري',
    date: '2026-08-14',
    provider: 'tabby',
    grossAmount: 2400,
    baseCommission: 85.00,
    vatOnCommission: 12.75,
    totalDeduction: 97.75,
    netAmount: 2302.25,
    status: 'pending_payout',
    notes: 'غسالة إل جي'
  },
  {
    id: 'ord-104',
    orderNumber: 'INV-2026-004',
    customerName: 'نورة القحطاني',
    date: '2026-08-15',
    provider: 'tamara',
    grossAmount: 1800,
    baseCommission: 73.32,
    vatOnCommission: 11.00,
    totalDeduction: 84.32,
    netAmount: 1715.68,
    status: 'pending_payout',
    notes: 'بلايستيشن 5'
  },
  {
    id: 'ord-105',
    orderNumber: 'INV-2026-005',
    customerName: 'محمد المطيري',
    date: '2026-08-16',
    provider: 'tabby',
    grossAmount: 5200,
    baseCommission: 183.00,
    vatOnCommission: 27.45,
    totalDeduction: 210.45,
    netAmount: 4989.55,
    status: 'pending_payout',
    notes: 'ماك بوك اير M3'
  }
];

const SAMPLE_SETTLEMENTS: SettlementRecord[] = [
  {
    id: 'stl-201',
    settlementNumber: 'STL-TABBY-8801',
    date: '2026-08-11',
    provider: 'tabby',
    bankReference: 'NCB-90214820',
    amountReceived: 3453.95,
    notes: 'تحويل بنكي من تابي لدفعة الأسبوع الأول'
  },
  {
    id: 'stl-202',
    settlementNumber: 'STL-TAMARA-9902',
    date: '2026-08-13',
    provider: 'tamara',
    bankReference: 'RJHI-77102941',
    amountReceived: 4578.03,
    notes: 'تحويل بنكي من تمارا لدفعة الأسبوع الثاني'
  }
];

export function getContractSettings(): ContractSetting {
  const saved = localStorage.getItem(CONTRACTS_KEY);
  if (!saved) return DEFAULT_CONTRACT;
  try {
    return JSON.parse(saved);
  } catch (e) {
    return DEFAULT_CONTRACT;
  }
}

export function saveContractSettings(settings: ContractSetting): void {
  localStorage.setItem(CONTRACTS_KEY, JSON.stringify(settings));
}

export function getOrders(): OrderRecord[] {
  const saved = localStorage.getItem(ORDERS_KEY);
  if (!saved) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(SAMPLE_ORDERS));
    return SAMPLE_ORDERS;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return SAMPLE_ORDERS;
  }
}

export function saveOrder(order: Omit<OrderRecord, 'id' | 'baseCommission' | 'vatOnCommission' | 'totalDeduction' | 'netAmount'>): OrderRecord {
  const orders = getOrders();
  const contracts = getContractSettings();

  const rate = order.provider === 'tabby' ? contracts.tabbyRate : contracts.tamaraRate;
  const fixed = order.provider === 'tabby' ? contracts.tabbyFixed : contracts.tamaraFixed;

  const baseCommission = (order.grossAmount * (rate / 100)) + fixed;
  const vatOnCommission = baseCommission * (contracts.vatRate / 100);
  const totalDeduction = baseCommission + vatOnCommission;
  const netAmount = Math.max(0, order.grossAmount - totalDeduction);

  const newRecord: OrderRecord = {
    ...order,
    id: 'ord-' + Date.now(),
    baseCommission: Number(baseCommission.toFixed(2)),
    vatOnCommission: Number(vatOnCommission.toFixed(2)),
    totalDeduction: Number(totalDeduction.toFixed(2)),
    netAmount: Number(netAmount.toFixed(2))
  };

  const updated = [newRecord, ...orders];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  return newRecord;
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter(o => o.id !== id);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getSettlements(): SettlementRecord[] {
  const saved = localStorage.getItem(SETTLEMENTS_KEY);
  if (!saved) {
    localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(SAMPLE_SETTLEMENTS));
    return SAMPLE_SETTLEMENTS;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return SAMPLE_SETTLEMENTS;
  }
}

export function saveSettlement(settlement: Omit<SettlementRecord, 'id'>): SettlementRecord {
  const settlements = getSettlements();
  const newRecord: SettlementRecord = {
    ...settlement,
    id: 'stl-' + Date.now()
  };
  const updated = [newRecord, ...settlements];
  localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(updated));
  return newRecord;
}

export function deleteSettlement(id: string): void {
  const settlements = getSettlements().filter(s => s.id !== id);
  localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(settlements));
}

export function calculateSummaryBalances(): SummaryBalances {
  const orders = getOrders();
  const settlements = getSettlements();

  const tabbyOrders = orders.filter(o => o.provider === 'tabby' && o.status !== 'refunded');
  const tamaraOrders = orders.filter(o => o.provider === 'tamara' && o.status !== 'refunded');

  const tabbySettlements = settlements.filter(s => s.provider === 'tabby');
  const tamaraSettlements = settlements.filter(s => s.provider === 'tamara');

  // Tabby
  const tabbyGrossSales = tabbyOrders.reduce((sum, o) => sum + o.grossAmount, 0);
  const tabbyCommissions = tabbyOrders.reduce((sum, o) => sum + o.baseCommission, 0);
  const tabbyVatInput = tabbyOrders.reduce((sum, o) => sum + o.vatOnCommission, 0);
  const tabbyNetExpected = tabbyOrders.reduce((sum, o) => sum + o.netAmount, 0);
  const tabbySettledInBank = tabbySettlements.reduce((sum, s) => sum + s.amountReceived, 0);
  const tabbyRemainingBalance = Math.max(0, tabbyNetExpected - tabbySettledInBank);

  // Tamara
  const tamaraGrossSales = tamaraOrders.reduce((sum, o) => sum + o.grossAmount, 0);
  const tamaraCommissions = tamaraOrders.reduce((sum, o) => sum + o.baseCommission, 0);
  const tamaraVatInput = tamaraOrders.reduce((sum, o) => sum + o.vatOnCommission, 0);
  const tamaraNetExpected = tamaraOrders.reduce((sum, o) => sum + o.netAmount, 0);
  const tamaraSettledInBank = tamaraSettlements.reduce((sum, s) => sum + s.amountReceived, 0);
  const tamaraRemainingBalance = Math.max(0, tamaraNetExpected - tamaraSettledInBank);

  return {
    tabbyGrossSales,
    tabbyCommissions,
    tabbyVatInput,
    tabbyNetExpected,
    tabbySettledInBank,
    tabbyRemainingBalance,

    tamaraGrossSales,
    tamaraCommissions,
    tamaraVatInput,
    tamaraNetExpected,
    tamaraSettledInBank,
    tamaraRemainingBalance,

    totalGrossSales: tabbyGrossSales + tamaraGrossSales,
    totalCommissions: tabbyCommissions + tamaraCommissions,
    totalVatInput: tabbyVatInput + tamaraVatInput,
    totalNetExpected: tabbyNetExpected + tamaraNetExpected,
    totalSettledInBank: tabbySettledInBank + tamaraSettledInBank,
    totalRemainingBalance: tabbyRemainingBalance + tamaraRemainingBalance
  };
}

export function resetToSampleData(): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(SAMPLE_ORDERS));
  localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(SAMPLE_SETTLEMENTS));
  localStorage.setItem(CONTRACTS_KEY, JSON.stringify(DEFAULT_CONTRACT));
}
