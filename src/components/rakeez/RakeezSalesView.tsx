import React, { useState } from 'react';
import { Product, Invoice, InvoiceItem, PaymentMethod } from '../../types/rakeezTypes';
import { createInvoice, deleteInvoice } from '../../services/rakeezStorage';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Search, 
  CheckCircle2, 
  FileSpreadsheet, 
  ShoppingBag, 
  Calculator,
  User,
  CreditCard,
  Building2,
  X
} from 'lucide-react';

interface RakeezSalesViewProps {
  products: Product[];
  invoices: Invoice[];
  onRefresh: () => void;
}

export const RakeezSalesView: React.FC<RakeezSalesViewProps> = ({
  products,
  invoices,
  onRefresh
}) => {
  // POS Form State
  const [customerName, setCustomerName] = useState('');
  const [customerTaxNumber, setCustomerTaxNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [notes, setNotes] = useState('');
  
  // Selected Products for Cart
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addToCart = (product: Product) => {
    const existing = cart.find(c => c.product.id === product.id);
    if (existing) {
      if (existing.quantity < product.stockQuantity) {
        setCart(cart.map(c => c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
    } else {
      if (product.stockQuantity > 0) {
        setCart([...cart, { product, quantity: 1 }]);
      }
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        if (newQty > item.product.stockQuantity) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean) as { product: Product; quantity: number }[]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.sellingPrice * item.quantity), 0);
  const vatTotal = subtotal * 0.15;
  const grandTotal = subtotal + vatTotal;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const items: InvoiceItem[] = cart.map(c => {
      const price = c.product.sellingPrice * c.quantity;
      const vat = price * 0.15;
      return {
        productId: c.product.id,
        productCode: c.product.code,
        productName: c.product.name,
        quantity: c.quantity,
        unitPrice: c.product.sellingPrice,
        totalPrice: price,
        vatAmount: vat
      };
    });

    const newInv = createInvoice({
      customerName: customerName || 'عميل كاشير',
      customerTaxNumber,
      date: new Date().toISOString().split('T')[0],
      items,
      subtotal,
      vatTotal,
      grandTotal,
      paymentMethod,
      status: 'paid',
      notes
    });

    setCart([]);
    setCustomerName('');
    setCustomerTaxNumber('');
    setNotes('');
    setShowSuccessModal(true);
    onRefresh();
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm('هل أنت تأكد من حذف هذه الفاتورة؟')) {
      deleteInvoice(id);
      onRefresh();
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    if (!invoiceSearch.trim()) return true;
    const q = invoiceSearch.toLowerCase();
    return inv.invoiceNumber.toLowerCase().includes(q) || inv.customerName.toLowerCase().includes(q);
  });

  const filteredProducts = products.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* POS CASHIER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PRODUCTS SELECTION (7 COLS) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" /> كاشير الركيز - اختيار المنتجات
            </h3>
            
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="بحث بالاسم أو الرمز..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  p.stockQuantity <= 0
                    ? 'bg-slate-950 border-slate-800 opacity-50 cursor-not-allowed'
                    : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-amber-400 font-bold">{p.code}</span>
                    <span className="text-slate-500">{p.category}</span>
                  </div>
                  <div className="font-bold text-white text-xs mt-1">{p.name}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    {p.sellingPrice} ر.س <span className="text-[10px] text-slate-500 font-sans">+15% ضريبة</span>
                  </div>
                  <div className={`text-[10px] font-bold ${p.stockQuantity <= p.minStockAlert ? 'text-red-400' : 'text-slate-400'}`}>
                    مخزون: {p.stockQuantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CART & CHECKOUT (5 COLS) */}
        <form onSubmit={handleCheckout} className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white flex items-center justify-between">
              <span className="flex items-center gap-2"><Calculator className="w-4 h-4 text-amber-400" /> سلة البيع الحالية</span>
              <span className="text-xs text-slate-400">العناصر: ({cart.length})</span>
            </h3>

            {/* CART ITEMS LIST */}
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-800 text-slate-500 text-xs text-center">
                  انقر على المنتجات لإضافتها للسلة
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{item.product.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.product.sellingPrice} × {item.quantity} = {(item.product.sellingPrice * item.quantity)} ر.س</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                        <button type="button" onClick={() => updateQuantity(item.product.id, -1)} className="px-2 py-0.5 text-slate-300 font-bold hover:bg-slate-800 cursor-pointer">-</button>
                        <span className="px-2 font-mono text-white text-xs font-bold">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.product.id, 1)} className="px-2 py-0.5 text-slate-300 font-bold hover:bg-slate-800 cursor-pointer">+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.product.id)} className="text-slate-500 hover:text-red-400 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* CUSTOMER & PAYMENT FIELDS */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">اسم العميل:</label>
                <input
                  type="text"
                  placeholder="عميل عام"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 dir-rtl">
                <div>
                  <label className="text-slate-400 block mb-1">طريقة الدفع:</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
                  >
                    <option value="card">شبكة 💳</option>
                    <option value="cash">كاش 💵</option>
                    <option value="bank_transfer">تحويل بنكي 🏛️</option>
                    <option value="credit">آجل ⏳</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الرقم الضريبي (اختياري):</label>
                  <input
                    type="text"
                    placeholder="300xxxx..."
                    value={customerTaxNumber}
                    onChange={(e) => setCustomerTaxNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* TOTAL & SUBMIT */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="space-y-1 text-xs dir-rtl">
              <div className="flex justify-between text-slate-400">
                <span>قبل الضريبة:</span>
                <span className="font-mono text-white">{subtotal.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>15% ضريبة القيمة المضافة:</span>
                <span className="font-mono text-amber-400">+{vatTotal.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-1 border-t border-slate-800">
                <span>الإجمالي الشامل:</span>
                <span className="font-mono text-emerald-400 text-lg">{grandTotal.toFixed(2)} ر.س</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              إصدار الفاتورة الضريبية 🧾
            </button>
          </div>
        </form>

      </div>

      {/* INVOICES ARCHIVE TABLE */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-400" /> سجل فواتير مبيعات الركيز
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="بحث برقم الفاتورة أو العميل..."
              value={invoiceSearch}
              onChange={(e) => setInvoiceSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs dir-rtl">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
              <tr>
                <th className="p-3">رقم الفاتورة</th>
                <th className="p-3">اسم العميل</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">طريقة الدفع</th>
                <th className="p-3">قبل الضريبة</th>
                <th className="p-3">الضريبة 15%</th>
                <th className="p-3">الإجمالي الشامل</th>
                <th className="p-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-amber-400">{inv.invoiceNumber}</td>
                  <td className="p-3 font-bold text-white">{inv.customerName}</td>
                  <td className="p-3 text-slate-400 font-mono">{inv.date}</td>
                  <td className="p-3 text-slate-300">
                    {inv.paymentMethod === 'card' && 'شبكة 💳'}
                    {inv.paymentMethod === 'cash' && 'كاش 💵'}
                    {inv.paymentMethod === 'bank_transfer' && 'تحويل بنكي 🏛️'}
                    {inv.paymentMethod === 'credit' && 'آجل ⏳'}
                  </td>
                  <td className="p-3 font-mono text-slate-300">{inv.subtotal.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono text-amber-400">{inv.vatTotal.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{inv.grandTotal.toLocaleString()} ر.س</td>
                  <td className="p-3 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 cursor-pointer"
                      title="عرض وطباعة الفاتورة"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteInvoice(inv.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINTABLE TAX INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-white text-slate-950 space-y-6 shadow-2xl relative dir-rtl">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 left-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* TAX INVOICE HEADER */}
            <div className="border-b-2 border-slate-950 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-black text-slate-900">فاتورة ضريبية مبسطة</h2>
                <div className="text-xs font-bold text-amber-600">شركة الركيز للإدارة والخدمات التجاريّة</div>
                <div className="text-[11px] text-slate-500 font-mono">الرقم الضريبي للمنشأة: 311029384700003</div>
              </div>
              <div className="text-left font-mono text-xs">
                <div className="font-bold text-slate-900">{selectedInvoice.invoiceNumber}</div>
                <div className="text-slate-500">{selectedInvoice.date}</div>
              </div>
            </div>

            {/* CUSTOMER & PAYMENT DETAILS */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-slate-500 block">اسم العميل:</span>
                <span className="font-bold text-slate-900">{selectedInvoice.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">طريقة الدفع:</span>
                <span className="font-bold text-slate-900">
                  {selectedInvoice.paymentMethod === 'card' && 'شبكة مدفوعة'}
                  {selectedInvoice.paymentMethod === 'cash' && 'نقداً'}
                  {selectedInvoice.paymentMethod === 'bank_transfer' && 'تحويل بنكي'}
                </span>
              </div>
            </div>

            {/* ITEMS TABLE */}
            <table className="w-full text-right text-xs">
              <thead className="border-b border-slate-300 font-bold text-slate-700">
                <tr>
                  <th className="py-2">المنتج / الخدمة</th>
                  <th className="py-2 text-center">الكمية</th>
                  <th className="py-2 text-left">السعر الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {selectedInvoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2">{item.productName}</td>
                    <td className="py-2 text-center font-mono">{item.quantity}</td>
                    <td className="py-2 text-left font-mono">{item.totalPrice} ر.س</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTALS SUMMARY */}
            <div className="pt-3 border-t-2 border-slate-950 space-y-1 text-xs text-left font-mono">
              <div className="flex justify-between">
                <span>المجموع غير شامل الضريبة:</span>
                <span>{selectedInvoice.subtotal} ر.س</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ضريبة القيمة المضافة 15%:</span>
                <span>+{selectedInvoice.vatTotal} ر.س</span>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 pt-1 border-t">
                <span>المبلغ الإجمالي الشامل:</span>
                <span>{selectedInvoice.grandTotal} ر.س</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> طباعة الفاتورة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
