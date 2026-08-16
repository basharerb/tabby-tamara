export type PaymentGateway = 'tabby' | 'tamara';

export interface SaleOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  gateway: PaymentGateway;
  grossAmount: number;        // إجمالي المبيعات
  commissionFee: number;     // قيمة العمولة والرسم الثابت
  vatOnCommission: number;    // 15% ضريبة على العمولة
  totalDeduction: number;     // إجمالي الخصم
  netAmount: number;          // الصافي المستحق
  notes?: string;
}

export interface SummaryStats {
  totalSales: number;
  tabbySales: number;
  tamaraSales: number;
  totalCommissions: number;
  totalVat: number;
  totalNet: number;
  ordersCount: number;
}
