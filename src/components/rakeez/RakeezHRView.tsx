import React, { useState } from 'react';
import { Employee } from '../../types/rakeezTypes';
import { addEmployee } from '../../services/rakeezStorage';
import { 
  Users, 
  Plus, 
  Search, 
  UserCheck, 
  DollarSign, 
  Phone, 
  X 
} from 'lucide-react';

interface RakeezHRViewProps {
  employees: Employee[];
  onRefresh: () => void;
}

export const RakeezHRView: React.FC<RakeezHRViewProps> = ({
  employees,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState<number | ''>('');

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !salary) return;

    addEmployee({
      name,
      role,
      phone: phone || '0500000000',
      salary: Number(salary),
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    });

    setName('');
    setRole('');
    setPhone('');
    setSalary('');
    setShowAddModal(false);
    onRefresh();
  };

  const filteredEmployees = employees.filter(emp => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return emp.name.toLowerCase().includes(q) || emp.role.toLowerCase().includes(q) || emp.empCode.toLowerCase().includes(q);
  });

  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER BAR */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" /> إدارة الموظفين ومسير الرواتب - الركيز
          </h2>
          <p className="text-xs text-slate-400">سجل الكادر الوظيفي، المسميات، وإجمالي التكلفة الشهرية للرواتب</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> إضافة موظف جديد
        </button>
      </div>

      {/* SUMMARY BADGE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-slate-400 font-bold">عدد الموظفين في الركيز:</div>
          <div className="text-2xl font-black text-white font-mono">{employees.length} موظفاً</div>
        </div>
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1">
          <div className="text-slate-400 font-bold">إجمالي مسير الرواتب الشهري:</div>
          <div className="text-2xl font-black text-amber-400 font-mono">{totalPayroll.toLocaleString()} ر.س</div>
        </div>
      </div>

      {/* EMPLOYEES TABLE */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-300">سجل الكادر الوظيفي:</div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="بحث بالاسم، المسمى، الرقم..."
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
                <th className="p-3">الرقم الوظيفي</th>
                <th className="p-3">الاسم الثلاثي</th>
                <th className="p-3">المسمى الوظيفي</th>
                <th className="p-3">رقم الجوال</th>
                <th className="p-3">الراتب الأساسي</th>
                <th className="p-3">تاريخ الانضمام</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-amber-400">{emp.empCode}</td>
                  <td className="p-3 font-bold text-white">{emp.name}</td>
                  <td className="p-3 text-slate-300">{emp.role}</td>
                  <td className="p-3 text-slate-400 font-mono">{emp.phone}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{emp.salary.toLocaleString()} ر.س</td>
                  <td className="p-3 text-slate-400 font-mono">{emp.joinDate}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[10px]">
                      نشط 🟢
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD EMPLOYEE MODAL */}
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
                <Users className="w-5 h-5 text-amber-400" /> إضافة موظف جديد
              </h3>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">الاسم الكامل:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسم الموظف"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">المسمى الوظيفي:</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="مثلاً: محاسب مالي / كاشير"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 dir-rtl">
                <div>
                  <label className="text-slate-400 block mb-1">رقم الجوال:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الراتب الأساسي (ر.س):</label>
                  <input
                    type="number"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="5000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                حفظ الموظف 💾
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
