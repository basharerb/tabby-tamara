import React, { useState } from 'react';
import { Expense } from '../../types/rakeezTypes';
import { addExpense, deleteExpense } from '../../services/rakeezStorage';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  Search, 
  DollarSign, 
  Building, 
  X 
} from 'lucide-react';

interface RakeezExpensesViewProps {
  expenses: Expense[];
  onRefresh: () => void;
}

export const RakeezExpensesView: React.FC<RakeezExpensesViewProps> = ({
  expenses,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('إيجارات ومقرات');
  const [amount, setAmount] = useState<number | ''>('');
  const [supplierName, setSupplierName] = useState('');
  const [notes, setNotes] = useState('');

  const numAmount = Number(amount) || 0;
  const vatAmount = numAmount * 0.15;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({
      title,
      category,
      amount: numAmount,
      vatAmount,
      date: new Date().toISOString().split('T')[0],
      supplierName: supplierName || 'جهة غير محددة',
      notes
    });

    setTitle('');
    setAmount('');
    setSupplierName('');
    setNotes('');
    setShowAddModal(false);
    onRefresh();
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('هل أنت تأكد من حذف هذا المصروف؟')) {
      deleteExpense(id);
      onRefresh();
    }
  };

  const filteredExpenses = expenses.filter(exp => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return exp.title.toLowerCase().includes(q) || exp.category.toLowerCase().includes(q) || (exp.supplierName && exp.supplierName.toLowerCase().includes(q));
  });

  const totalExpenseSum = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalVatSum = expenses.reduce((sum, e) => sum + e.vatAmount, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER BAR */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-red-400" /> المصروفات والمشتريات التشغيلية - الركيز
          </h2>
          <p className="text-xs text-slate-400">تتبع التكاليف، الإيجارات، الفواتير وضريبة المصروفات المدفوعة للموردين</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-500/20"
        >
          <Plus className="w-4 h-4" /> تسجيل مصروف جديد
        </button>
      </div>

      {/* SUMMARY BADGES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-1">
          <div className="text-slate-400 font-bold">إجمالي المصروفات التشغيلية:</div>
          <div className="text-2xl font-black text-red-400 font-mono">{totalExpenseSum.toLocaleString()} ر.س</div>
        </div>
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1">
          <div className="text-slate-400 font-bold">ضريبة القيمة المضافة المدفوعة للموردين (15% VAT):</div>
          <div className="text-2xl font-black text-amber-400 font-mono">{totalVatSum.toLocaleString()} ر.س</div>
        </div>
      </div>

      {/* EXPENSES TABLE */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-300">
            السجلات: <span className="font-mono text-amber-400 font-bold">{expenses.length} مصروف</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="بحث بالبند، التصنيف، المورد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs dir-rtl">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
              <tr>
                <th className="p-3">رقم القيد</th>
                <th className="p-3">عنوان المصروف</th>
                <th className="p-3">التصنيف</th>
                <th className="p-3">المورد / الجهة</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">المبلغ قبل الضريبة</th>
                <th className="p-3">الضريبة 15%</th>
                <th className="p-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-amber-400">{exp.expenseNumber}</td>
                  <td className="p-3 font-bold text-white">{exp.title}</td>
                  <td className="p-3 text-slate-400">{exp.category}</td>
                  <td className="p-3 text-slate-300">{exp.supplierName || '-'}</td>
                  <td className="p-3 text-slate-400 font-mono">{exp.date}</td>
                  <td className="p-3 font-mono font-bold text-red-400">{exp.amount.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono text-amber-400">{exp.vatAmount.toLocaleString()} ر.س</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="حذف المصروف"
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

      {/* ADD EXPENSE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl relative text-white">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 left-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-red-400" /> تسجيل مصروف جديد
              </h3>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">عنوان المصروف / البيان:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: إيجار صالة العرض"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 dir-rtl">
                <div>
                  <label className="text-slate-400 block mb-1">التصنيف:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                  >
                    <option value="إيجارات ومقرات">إيجارات ومقرات</option>
                    <option value="مرافق ومنافع">كهرباء ومياه وانترنت</option>
                    <option value="صيانة وتشغيل">صيانة وتطوير</option>
                    <option value="تسويق وإعلانات">تسويق وإعلانات</option>
                    <option value="مشتريات بضائع">مشتريات بضائع</option>
                    <option value="نثريات ومكتبية">نثريات ومكتبية</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">اسم المورد / الشركة:</label>
                  <input
                    type="text"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="اسم المورد"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">المبلغ قبل الضريبة (ر.س):</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-lg font-bold"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>15% ضريبة المستردة:</span>
                  <span className="text-amber-400 font-bold">+{vatAmount.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800">
                  <span>إجمالي الصرف المستحق:</span>
                  <span className="text-red-400">{(numAmount + vatAmount).toFixed(2)} ر.س</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white font-black text-xs transition-all cursor-pointer shadow-lg shadow-red-500/20"
              >
                حفظ المصروف 💾
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
