import React, { useState } from 'react';
import { Product, PaymentFilter } from '../types';
import { TabbyWidget } from './TabbyWidget';
import { TamaraWidget } from './TamaraWidget';
import { ShoppingCart, Star, Zap, Filter, Sparkles, Check, ArrowRight } from 'lucide-react';

interface StoreSectionProps {
  onOpenCheckout: (product: Product, provider: 'tabby' | 'tamara') => void;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'شاشة سامسونج أوليد الذكية 65 بوصة 4K',
    nameEn: 'Samsung 65" Neo QLED 4K Smart TV',
    category: 'أجهزة منزلية وإلكترونيات',
    price: 3600,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 128,
    badge: 'الأكثر مبيعاً',
    description: 'تجربة مشاهدة فائقة الوضوح مع تقنية الشاشة الذكية ودعم معدل تحديث 120Hz لأحدث الألعاب.'
  },
  {
    id: '2',
    name: 'آيفون 15 بروماكس - 256 جيجابايت تيتانيوم',
    nameEn: 'iPhone 15 Pro Max 256GB Natural Titanium',
    category: 'جوالات وهواتف',
    price: 4800,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 310,
    badge: 'جديد',
    description: 'شريحة A17 Pro القوية مع هيكل التيتانيوم خفيف الوزن ونظام كاميرات محترف.'
  },
  {
    id: '3',
    name: 'غسالة ومجفف إل جي الذكية 10 كيلو',
    nameEn: 'LG AI Direct Drive Washer & Dryer 10KG',
    category: 'أجهزة منزلية وإلكترونيات',
    price: 2400,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 84,
    badge: 'توفير الطاقة',
    description: 'محرك الدفع المباشر الذكي مع غسيل بالبخار وحماية متقدمة للأقمشة.'
  },
  {
    id: '4',
    name: 'بلايستيشن 5 الإصدار الرقمي + يد إضافية',
    nameEn: 'PlayStation 5 Console Digital Edition',
    category: 'ألعاب ترفيهية',
    price: 1800,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 240,
    badge: 'شحن مجاني',
    description: 'سرعة استثنائية مع قرص صلب SSD وتجربة غمر حواسك مع ذراع التحكم DualSense.'
  },
  {
    id: '5',
    name: 'ماك بوك اير M3 - 16 جيجابايت رام 512 SSD',
    nameEn: 'MacBook Air 15" M3 Chip Space Grey',
    category: 'كمبيوتر ولابتوب',
    price: 5200,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 95,
    description: 'تصميم أنيق ونحيف للغاية مع بطارية تدوم حتى 18 ساعة وأداء مذهل لشريحة M3.'
  },
  {
    id: '6',
    name: 'آلة قهوة ديلونجي ديديكا ارتي المتقدمة',
    nameEn: 'DeLonghi Dedica Arte Espresso Machine',
    category: 'أجهزة منزلية وإلكترونيات',
    price: 1200,
    currency: 'ر.س',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a888?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewsCount: 62,
    badge: 'عروض القهوة',
    description: 'استمتع بإسبريسو غني ورغوة حليب احترافية بكبس زر واحدة في منزلك.'
  }
];

export const StoreSection: React.FC<StoreSectionProps> = ({ onOpenCheckout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProviderFilter, setActiveProviderFilter] = useState<PaymentFilter>('all');

  const categories = ['all', 'أجهزة منزلية وإلكترونيات', 'جوالات وهواتف', 'كمبيوتر ولابتوب', 'ألعاب ترفيهية'];

  const filteredProducts = SAMPLE_PRODUCTS.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-10 py-6">
      
      {/* Banner / Hero */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800 p-8 sm:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>اشترِ ما تحب واقسم فاتورتك بكل سهولة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            تسوق أفضل المنتجات مع <span className="text-emerald-400 underline decoration-emerald-500/40">تابي</span> و <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">تمارا</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            لا داعي للانتظار! اختر منتجك المفضّل وقسّم فاتورتك على <strong className="text-emerald-400">4 دفعات مع تابي</strong> أو <strong className="text-orange-400">3 و 4 دفعات مع تمارا</strong> بدون أي فوائد أو رسوم إضافية.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-2 rounded-xl">
              <Check className="w-4 h-4 text-emerald-400" /> موافقة فورية في 30 ثانية
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-300 bg-purple-950/60 border border-orange-500/40 px-3.5 py-2 rounded-xl">
              <Check className="w-4 h-4 text-orange-400" /> بدون رسوم تأخير أو فوائد
            </div>
          </div>
        </div>
      </div>

      {/* Category & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold pl-2">
            <Filter className="w-3.5 h-3.5" /> الأقسام:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {cat === 'all' ? 'جميع المنتجات' : cat}
            </button>
          ))}
        </div>

        {/* Provider view toggle */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveProviderFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeProviderFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setActiveProviderFilter('tabby')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeProviderFilter === 'tabby' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'text-slate-400'
            }`}
          >
            تابي فقط
          </button>
          <button
            onClick={() => setActiveProviderFilter('tamara')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeProviderFilter === 'tamara' ? 'bg-purple-950 text-orange-400 border border-orange-500/40' : 'text-slate-400'
            }`}
          >
            تمارا فقط
          </button>
        </div>

      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="group rounded-3xl glass-panel border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500 text-slate-950 shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60 flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pt-2 border-t border-slate-800/80">
                  <span className="text-2xl font-black text-white">{product.price.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400">{product.currency}</span>
                </div>

                {/* Widgets Display based on filter */}
                <div className="space-y-2.5 pt-2">
                  {(activeProviderFilter === 'all' || activeProviderFilter === 'tabby') && (
                    <TabbyWidget 
                      price={product.price}
                      currency={product.currency}
                      compact={true}
                      onSelect={() => onOpenCheckout(product, 'tabby')}
                    />
                  )}

                  {(activeProviderFilter === 'all' || activeProviderFilter === 'tamara') && (
                    <TamaraWidget 
                      price={product.price}
                      currency={product.currency}
                      compact={true}
                      onSelect={() => onOpenCheckout(product, 'tamara')}
                    />
                  )}
                </div>

              </div>
            </div>

            {/* Action buttons footer */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenCheckout(product, 'tabby')}
                className="py-2.5 px-3 rounded-xl tabby-btn text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                شراء بـ تابي &larr;
              </button>

              <button
                onClick={() => onOpenCheckout(product, 'tamara')}
                className="py-2.5 px-3 rounded-xl tamara-btn text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                شراء بـ تمارا &larr;
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
