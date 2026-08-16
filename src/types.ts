export type PaymentProvider = 'tabby' | 'tamara';
export type PaymentFilter = 'all' | 'tabby' | 'tamara';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  description: string;
}

export interface CheckoutState {
  isOpen: boolean;
  product: Product | null;
  provider: 'tabby' | 'tamara';
  step: 'select_plan' | 'phone_verification' | 'otp' | 'success';
  phone: string;
  otp: string;
  selectedPlan: string;
}

export interface MerchantMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export interface SettlementTransaction {
  id: string;
  date: string;
  provider: 'tabby' | 'tamara';
  customerName: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'completed' | 'pending' | 'refunded';
}

export interface ContractSetting {
  tabbyRate: number;      // e.g. 3.5%
  tabbyFixed: number;     // e.g. 1.0 SAR
  tamaraRate: number;     // e.g. 3.99%
  tamaraFixed: number;    // e.g. 1.5 SAR
  vatRate: number;        // e.g. 15%
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  provider: PaymentProvider;
  grossAmount: number;        // إجمالي المبيعات شامل الضريبة
  baseCommission: number;     // قيمة العمولة والرسم الثابت
  vatOnCommission: number;    // ضريبة 15% على العمولة
  totalDeduction: number;     // إجمالي الخصم
  netAmount: number;          // الصافي المستحق لمتجرك
  status: 'pending_payout' | 'settled' | 'refunded';
  notes?: string;
}

export interface SettlementRecord {
  id: string;
  settlementNumber: string;
  date: string;
  provider: PaymentProvider;
  bankReference: string;
  amountReceived: number;     // المبلغ المحول للبنك فعلياً
  notes?: string;
}

export interface SummaryBalances {
  tabbyGrossSales: number;
  tabbyCommissions: number;
  tabbyVatInput: number;
  tabbyNetExpected: number;
  tabbySettledInBank: number;
  tabbyRemainingBalance: number; // الرصيد المتبقي طرف تابي لم يحول بعد

  tamaraGrossSales: number;
  tamaraCommissions: number;
  tamaraVatInput: number;
  tamaraNetExpected: number;
  tamaraSettledInBank: number;
  tamaraRemainingBalance: number; // الرصيد المتبقي طرف تمارا لم يحول بعد

  totalGrossSales: number;
  totalCommissions: number;
  totalVatInput: number;
  totalNetExpected: number;
  totalSettledInBank: number;
  totalRemainingBalance: number;
}
