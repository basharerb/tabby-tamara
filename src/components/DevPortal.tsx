import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, Cpu, Layers, ExternalLink, Sliders } from 'lucide-react';

export const DevPortal: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<'tabby' | 'tamara'>('tabby');
  const [widgetTheme, setWidgetTheme] = useState<'dark' | 'light'>('dark');
  const [customPrice, setCustomPrice] = useState<number>(2400);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const reactTabbySnippet = `import { TabbyWidget } from './TabbyWidget';

<TabbyWidget 
  price={${customPrice}} 
  currency="SAR" 
  onSelect={() => handleTabbyCheckout()} 
/>`;

  const reactTamaraSnippet = `import { TamaraWidget } from './TamaraWidget';

<TamaraWidget 
  price={${customPrice}} 
  currency="SAR" 
  onSelect={() => handleTamaraCheckout()} 
/>`;

  const jsScriptSnippet = `<!-- Tabby & Tamara Universal Script -->
<script src="https://cdn.tabby-tamara.com/v1/bnpl-widget.js"></script>

<div id="bnpl-widget-container" 
     data-provider="${selectedProvider}"
     data-price="${customPrice}" 
     data-currency="SAR" 
     data-lang="ar"
     data-theme="${widgetTheme}">
</div>

<script>
  BNPLWidget.init({
    selector: '#bnpl-widget-container',
    onSuccess: function(data) {
      console.log('Payment Approved:', data);
    }
  });
</script>`;

  const phpWebhookSnippet = `<?php
// Tabby & Tamara Webhook Listener Endpoint
$payload = file_get_contents('php://input');
$data = json_decode($payload, true);

$event = $data['event'] ?? '';
$orderId = $data['order_id'] ?? '';
$status = $data['status'] ?? '';

if ($event === 'ORDER_APPROVED' && $status === 'AUTHORIZED') {
    // Update local database order status
    updateOrderStatus($orderId, 'PAID_VIA_' . strtoupper($data['provider']));
    http_response_code(200);
    echo json_encode(['status' => 'success']);
}
?>`;

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              SDK & API Integration Hub
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">مركز المطورين ومولد الأكواد (Developer Sandbox)</h2>
          <p className="text-xs text-slate-400 mt-1">
            خصص المكونات البرمجية، اختبر الـ API مباشرة، واحصل على كود الدمج لمتجرك الإلكتروني في دقائق.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            API v2.4 (Active)
          </span>
        </div>
      </div>

      {/* Interactive Widget Sandbox Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Controls */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> أدوات تخصيص الودجت
            </h3>
            <span className="text-xs text-slate-400">تفاعل مباشر</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-2">اختر البوابة (Provider):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProvider('tabby')}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    selectedProvider === 'tabby' 
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  تابي (Tabby 4x)
                </button>
                <button
                  onClick={() => setSelectedProvider('tamara')}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    selectedProvider === 'tamara' 
                      ? 'bg-purple-950 text-orange-400 border-orange-500' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  تمارا (Tamara 3x/4x)
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-2">مبلغ المنتج للاختبار (SAR):</label>
              <input 
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-2">المظهر (Theme):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setWidgetTheme('dark')}
                  className={`py-2 rounded-xl font-bold border ${
                    widgetTheme === 'dark' ? 'bg-slate-800 text-white border-slate-600' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  داكن (Dark Mode)
                </button>
                <button
                  onClick={() => setWidgetTheme('light')}
                  className={`py-2 rounded-xl font-bold border ${
                    widgetTheme === 'light' ? 'bg-slate-200 text-slate-950 border-white' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  فاتح (Light Mode)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-base font-extrabold text-white">المعاينة الحية لزر الدفع (Live Preview)</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                {selectedProvider.toUpperCase()}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 my-auto">
              {selectedProvider === 'tabby' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>قسّم مشترياتك بقيمة <strong className="text-white">{customPrice} ر.س</strong></span>
                    <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 font-black text-[11px]">tabby</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="bg-slate-900 p-2 rounded-lg border border-emerald-500/40 text-emerald-400 font-bold">
                      {(customPrice / 4).toFixed(0)} SAR اليوم
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg text-slate-400">
                      {(customPrice / 4).toFixed(0)} SAR شهر 1
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg text-slate-400">
                      {(customPrice / 4).toFixed(0)} SAR شهر 2
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg text-slate-400">
                      {(customPrice / 4).toFixed(0)} SAR شهر 3
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>ادفع عبر تمارا بـ <strong className="text-white">{customPrice} ر.س</strong></span>
                    <span className="px-2 py-0.5 rounded bg-gradient-to-r from-orange-500 to-purple-600 text-white font-black text-[11px]">tamara</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-slate-900 p-2 rounded-lg border border-orange-500/40 text-orange-400 font-bold">
                      {(customPrice / 3).toFixed(0)} SAR الآن
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg text-slate-400">
                      {(customPrice / 3).toFixed(0)} SAR شهر 1
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg text-slate-400">
                      {(customPrice / 3).toFixed(0)} SAR شهر 2
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2">
            يتكيف هذا الودجت تلقائياً مع لغة المتجر (العربية/الإنكليزية) والعملات المحلية.
          </div>
        </div>

      </div>

      {/* Code Snippets Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-black text-white">نماذج الكود المباشر (Integration Code Snippets)</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* React Component Code */}
          <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Code className="w-4 h-4" /> كود React / Next.js Component
              </span>
              <button
                onClick={() => handleCopy(selectedProvider === 'tabby' ? reactTabbySnippet : reactTamaraSnippet, 1)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 1 ? 'تم النسخ!' : 'نسخ الكود'}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto dir-ltr">
              {selectedProvider === 'tabby' ? reactTabbySnippet : reactTamaraSnippet}
            </pre>
          </div>

          {/* Vanilla HTML / JS Script Code */}
          <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> كود HTML / Vanilla JavaScript
              </span>
              <button
                onClick={() => handleCopy(jsScriptSnippet, 2)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 2 ? 'تم النسخ!' : 'نسخ الكود'}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto dir-ltr">
              {jsScriptSnippet}
            </pre>
          </div>

        </div>

        {/* Webhook Handler Code */}
        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> معالج الـ Webhooks الخلفي (PHP / Backend Listener)
            </span>
            <button
              onClick={() => handleCopy(phpWebhookSnippet, 3)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIndex === 3 ? 'تم النسخ!' : 'نسخ الكود'}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto dir-ltr">
            {phpWebhookSnippet}
          </pre>
        </div>

      </div>

    </div>
  );
};
