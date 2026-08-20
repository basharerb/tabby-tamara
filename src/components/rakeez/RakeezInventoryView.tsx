import React, { useState } from 'react';
import { Product } from '../../types/rakeezTypes';
import { saveProduct, deleteProduct } from '../../services/rakeezStorage';
import { 
  Package, 
  Plus, 
  Trash2, 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  Tag, 
  BarChart2,
  CheckCircle2,
  X
} from 'lucide-react';

interface RakeezInventoryViewProps {
  products: Product[];
  onRefresh: () => void;
}

export const RakeezInventoryView: React.FC<RakeezInventoryViewProps> = ({
  products,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new product
  const [name, setName] = useState('');
  const [code, setCode] = useState(`RK-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState('إلكترونيات');
  const [costPrice, setCostPrice] = useState<number | ''>('');
  const [sellingPrice, setSellingPrice] = useState<number | ''>('');
  const [stockQuantity, setStockQuantity] = useState<number | ''>('');
  const [minStockAlert, setMinStockAlert] = useState<number>(5);
  const [unit, setUnit] = useState('حبة');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !costPrice || !sellingPrice || !stockQuantity) return;

    saveProduct({
      code: code || `RK-${Date.now()}`,
      name,
      category,
      costPrice: Number(costPrice),
      sellingPrice: Number(sellingPrice),
      stockQuantity: Number(stockQuantity),
      minStockAlert: Number(minStockAlert),
      unit
    });

    setName('');
    setCostPrice('');
    setSellingPrice('');
    setStockQuantity('');
    setCode(`RK-${Math.floor(100 + Math.random() * 900)}`);
    setShowAddModal(false);
    onRefresh();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('هل أنت تأكد من حذف هذا المنتج من المخزون؟')) {
      deleteProduct(id);
      onRefresh();
    }
  };

  const filteredProducts = products.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER BAR */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" /> إدارة المخزون والمنتجات - الركيز
          </h2>
          <p className="text-xs text-slate-400">متابعة الكميات، أسعار التكلفة والبيع، وحساب هامش الربح</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> إضافة منتج جديد للمخزون
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-300">
            إجمالي عدد المنتجات: <span className="font-mono text-amber-400 font-bold">{products.length} منتج</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="بحث بالاسم، الرمز، التصنيف..."
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
                <th className="p-3">رمز المنتج</th>
                <th className="p-3">اسم المنتج</th>
                <th className="p-3">التصنيف</th>
                <th className="p-3">سعر التكلفة</th>
                <th className="p-3">سعر البيع</th>
                <th className="p-3">هامش الربح</th>
                <th className="p-3">الكمية بالمخزون</th>
                <th className="p-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => {
                const profitMargin = p.sellingPrice - p.costPrice;
                const isLowStock = p.stockQuantity <= p.minStockAlert;

                return (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{p.code}</td>
                    <td className="p-3 font-bold text-white">{p.name}</td>
                    <td className="p-3 text-slate-400">{p.category}</td>
                    <td className="p-3 font-mono text-slate-300">{p.costPrice.toLocaleString()} ر.س</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">{p.sellingPrice.toLocaleString()} ر.س</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">
                      +{profitMargin.toLocaleString()} ر.س ({((profitMargin / p.costPrice) * 100).toFixed(0)}%)
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-lg font-mono font-bold border text-xs ${
                        isLowStock 
                          ? 'bg-red-950/60 text-red-300 border-red-500/40 animate-pulse' 
                          : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {p.stockQuantity} {p.unit}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl relative text-white">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 left-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" /> إضافة منتج جديد لمخزون الركيز
              </h3>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 dir-rtl">
                <div>
                  <label className="text-slate-400 block mb-1">اسم المنتج:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: كمبيوتر ديسك توب"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">رمز المنتج (Barcode):</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 dir-rtl">
                <div>
                  <label className="text-slate-400 block mb-1">التصنيف:</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="إلكترونيات، أثاث..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الوحدة:</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="حبة، جهاز، طقم..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 dir-rtl">
                <div>
                  <label className="text-slate-400 block mb-1">سعر التكلفة (ر.س):</label>
                  <input
                    type="number"
                    required
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">سعر البيع (ر.س):</label>
                  <input
                    type="number"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الكمية المتاحة:</label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                حفظ المنتج في المخزون 💾
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
