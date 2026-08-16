export type PaymentProvider = 'tabby' | 'tamara' | 'all';

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

export interface PaymentScheduleItem {
  installmentIndex: number;
  title: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  status: 'today' | 'upcoming';
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
