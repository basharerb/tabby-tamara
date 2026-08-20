import { 
  Product, 
  Invoice, 
  Expense, 
  Employee, 
  RakeezFinancialSummary 
} from '../types/rakeezTypes';

const PRODUCTS_KEY = 'rakeez_erp_products_v1';
const INVOICES_KEY = 'rakeez_erp_invoices_v1';
const EXPENSES_KEY = 'rakeez_erp_expenses_v1';
const EMPLOYEES_KEY = 'rakeez_erp_employees_v1';

// عينات بيانات أولية واقعية لنظام الركيز
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-101',
    code: 'RK-101',
    name: 'شاشة حاسوب 27 بوصة Pro',
    category: 'إلكترونيات',
    costPrice: 850,
    sellingPrice: 1250,
    stockQuantity: 24,
    minStockAlert: 5,
    unit: 'حبة'
  },
  {
    id: 'p-102',
    code: 'RK-102',
    name: 'لوحة مفاتيح ميكانيكية الركيز',
    category: 'ملحقات',
    costPrice: 180,
    sellingPrice: 290,
    stockQuantity: 45,
    minStockAlert: 10,
    unit: 'حبة'
  },
  {
    id: 'p-103',
    code: 'RK-103',
    name: 'طابعة فواتير حرارية ZATCA',
    category: 'أجهزة مكتبية',
    costPrice: 420,
    sellingPrice: 650,
    stockQuantity: 8,
    minStockAlert: 3,
    unit: 'جهاز'
  },
  {
    id: 'p-104',
    code: 'RK-104',
    name: 'كرسي مكتبي مريح Pro',
    category: 'أثاث مكتبي',
    costPrice: 600,
    sellingPrice: 980,
    stockQuantity: 4,
    minStockAlert: 5,
    unit: 'حبة'
  },
  {
    id: 'p-105',
    code: 'RK-105',
    name: 'قارئ باركود لاسلكي 2D',
    category: 'أجهزة مكتبية',
    costPrice: 120,
    sellingPrice: 210,
    stockQuantity: 18,
    minStockAlert: 4,
    unit: 'جهاز'
  }
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'INV-2026-001',
    customerName: 'شركة الأفق للتجارة',
    customerTaxNumber: '300123456700003',
    date: '2026-08-18',
    items: [
      {
        productId: 'p-101',
        productCode: 'RK-101',
        productName: 'شاشة حاسوب 27 بوصة Pro',
        quantity: 2,
        unitPrice: 1250,
        totalPrice: 2500,
        vatAmount: 375
      },
      {
        productId: 'p-102',
        productCode: 'RK-102',
        productName: 'لوحة مفاتيح ميكانيكية الركيز',
        quantity: 2,
        unitPrice: 290,
        totalPrice: 580,
        vatAmount: 87
      }
    ],
    subtotal: 3080,
    vatTotal: 462,
    grandTotal: 3542,
    paymentMethod: 'card',
    status: 'paid',
    notes: 'تم الدفع بالشبكة - تسليم فوري'
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'INV-2026-002',
    customerName: 'مؤسسة الحلول المتقدمة',
    customerTaxNumber: '310987654300003',
    date: '2026-08-19',
    items: [
      {
        productId: 'p-103',
        productCode: 'RK-103',
        productName: 'طابعة فواتير حرارية ZATCA',
        quantity: 1,
        unitPrice: 650,
        totalPrice: 650,
        vatAmount: 97.5
      }
    ],
    subtotal: 650,
    vatTotal: 97.5,
    grandTotal: 747.5,
    paymentMethod: 'bank_transfer',
    status: 'paid',
    notes: 'تحويل بنكي الراجحي'
  }
];

const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    expenseNumber: 'EXP-101',
    title: 'إيجار المكتب الرئيسي - الربع الثالث',
    category: 'إيجارات ومقرات',
    amount: 12000,
    vatAmount: 1800,
    date: '2026-08-01',
    supplierName: 'شركة العقارات المتحدة',
    notes: 'دفعة الربع الثالث'
  },
  {
    id: 'exp-2',
    expenseNumber: 'EXP-102',
    title: 'فاتورة الكهرباء والإنترنت',
    category: 'مرافق ومنافع',
    amount: 1450,
    vatAmount: 217.5,
    date: '2026-08-10',
    supplierName: 'شركة الكهرباء والاتصالات',
    notes: 'استهلاك شهر أغسطس'
  }
];

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    empCode: 'EMP-01',
    name: 'عبدالرحمن الشهري',
    role: 'مدير المبيعات والتسويق',
    phone: '0501234567',
    salary: 9500,
    joinDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 'emp-2',
    empCode: 'EMP-02',
    name: 'محمد علي الحارثي',
    role: 'محاسب مالي رئيسي',
    phone: '0559876543',
    salary: 8200,
    joinDate: '2024-06-01',
    status: 'active'
  },
  {
    id: 'emp-3',
    empCode: 'EMP-03',
    name: 'سارة خالد القحطاني',
    role: 'مسؤولة الكاشير وخدمة العملاء',
    phone: '0561122334',
    salary: 5500,
    joinDate: '2025-02-10',
    status: 'active'
  }
];

// --- PRODUCTS API ---
export function getRakeezProducts(): Product[] {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try { return JSON.parse(data); } catch { return INITIAL_PRODUCTS; }
}

export function saveProduct(product: Omit<Product, 'id'> & { id?: string }): Product {
  const products = getRakeezProducts();
  let updatedProduct: Product;

  if (product.id) {
    products.map(p => p.id === product.id ? { ...p, ...product } : p);
    updatedProduct = product as Product;
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) products[index] = updatedProduct;
  } else {
    updatedProduct = {
      ...product,
      id: 'p-' + Date.now(),
      code: product.code || `RK-${Math.floor(100 + Math.random() * 900)}`
    };
    products.unshift(updatedProduct);
  }

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return updatedProduct;
}

export function deleteProduct(id: string): void {
  const products = getRakeezProducts().filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// --- INVOICES API ---
export function getRakeezInvoices(): Invoice[] {
  const data = localStorage.getItem(INVOICES_KEY);
  if (!data) {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
    return INITIAL_INVOICES;
  }
  try { return JSON.parse(data); } catch { return INITIAL_INVOICES; }
}

export function createInvoice(invoiceData: Omit<Invoice, 'id' | 'invoiceNumber'>): Invoice {
  const invoices = getRakeezInvoices();
  const products = getRakeezProducts();

  const newInvoice: Invoice = {
    ...invoiceData,
    id: 'inv-' + Date.now(),
    invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`
  };

  // الخصم من المخزون
  newInvoice.items.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      product.stockQuantity = Math.max(0, product.stockQuantity - item.quantity);
    }
  });

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  localStorage.setItem(INVOICES_KEY, JSON.stringify([newInvoice, ...invoices]));
  return newInvoice;
}

export function deleteInvoice(id: string): void {
  const invoices = getRakeezInvoices().filter(i => i.id !== id);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

// --- EXPENSES API ---
export function getRakeezExpenses(): Expense[] {
  const data = localStorage.getItem(EXPENSES_KEY);
  if (!data) {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(INITIAL_EXPENSES));
    return INITIAL_EXPENSES;
  }
  try { return JSON.parse(data); } catch { return INITIAL_EXPENSES; }
}

export function addExpense(expense: Omit<Expense, 'id' | 'expenseNumber'>): Expense {
  const expenses = getRakeezExpenses();
  const newExp: Expense = {
    ...expense,
    id: 'exp-' + Date.now(),
    expenseNumber: `EXP-${Math.floor(100 + Math.random() * 900)}`
  };
  const updated = [newExp, ...expenses];
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));
  return newExp;
}

export function deleteExpense(id: string): void {
  const updated = getRakeezExpenses().filter(e => e.id !== id);
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));
}

// --- EMPLOYEES API ---
export function getRakeezEmployees(): Employee[] {
  const data = localStorage.getItem(EMPLOYEES_KEY);
  if (!data) {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(INITIAL_EMPLOYEES));
    return INITIAL_EMPLOYEES;
  }
  try { return JSON.parse(data); } catch { return INITIAL_EMPLOYEES; }
}

export function addEmployee(emp: Omit<Employee, 'id' | 'empCode'>): Employee {
  const emps = getRakeezEmployees();
  const newEmp: Employee = {
    ...emp,
    id: 'emp-' + Date.now(),
    empCode: `EMP-${String(emps.length + 1).padStart(2, '0')}`
  };
  const updated = [newEmp, ...emps];
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(updated));
  return newEmp;
}

// --- FINANCIAL SUMMARY & REPORTS ---
export function computeRakeezSummary(): RakeezFinancialSummary {
  const invoices = getRakeezInvoices();
  const expenses = getRakeezExpenses();
  const products = getRakeezProducts();

  let totalRevenue = 0;
  let totalVatCollected = 0;

  invoices.forEach(inv => {
    totalRevenue += inv.subtotal;
    totalVatCollected += inv.vatTotal;
  });

  let totalExpenses = 0;
  let totalVatPaid = 0;

  expenses.forEach(exp => {
    totalExpenses += exp.amount;
    totalVatPaid += exp.vatAmount;
  });

  let inventoryTotalValue = 0;
  let lowStockCount = 0;

  products.forEach(p => {
    inventoryTotalValue += (p.costPrice * p.stockQuantity);
    if (p.stockQuantity <= p.minStockAlert) {
      lowStockCount++;
    }
  });

  const netProfit = totalRevenue - totalExpenses;
  const netVatPayable = totalVatCollected - totalVatPaid;

  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalExpenses: Number(totalExpenses.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    inventoryTotalValue: Number(inventoryTotalValue.toFixed(2)),
    totalVatCollected: Number(totalVatCollected.toFixed(2)),
    totalVatPaid: Number(totalVatPaid.toFixed(2)),
    netVatPayable: Number(netVatPayable.toFixed(2)),
    invoicesCount: invoices.length,
    productsCount: products.length,
    lowStockCount
  };
}

export function resetRakeezData(): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(INITIAL_EXPENSES));
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(INITIAL_EMPLOYEES));
}
