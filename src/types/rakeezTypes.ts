export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'credit';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  minStockAlert: number;
  unit: string;
}

export interface InvoiceItem {
  productId: string;
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vatAmount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone?: string;
  customerTaxNumber?: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;       // المجموع قبل الضريبة
  vatTotal: number;       // 15% ضريبة القيمة المضافة
  grandTotal: number;     // الإجمالي الشامل للضريبة
  paymentMethod: PaymentMethod;
  status: 'paid' | 'unpaid' | 'partially_paid';
  notes?: string;
}

export interface Expense {
  id: string;
  expenseNumber: string;
  title: string;
  category: string;
  amount: number;
  vatAmount: number;
  date: string;
  supplierName?: string;
  notes?: string;
}

export interface Employee {
  id: string;
  empCode: string;
  name: string;
  role: string;
  phone: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'on_leave' | 'terminated';
}

export interface RakeezFinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  inventoryTotalValue: number;
  totalVatCollected: number;
  totalVatPaid: number;
  netVatPayable: number;
  invoicesCount: number;
  productsCount: number;
  lowStockCount: number;
}
