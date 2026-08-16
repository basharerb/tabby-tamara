# منصة تابي وتمارا | Tabby & Tamara BNPL Showcase & Merchant Platform 💳✨

منصة تفاعلية متكاملة تعرض خيارات التقسيط والدفع الآجل عبر **تابي (Tabby)** و **تمارا (Tamara)** في مكان واحد، مصممة للمتاجر الإلكترونية والتجار والمطورين في المملكة العربية السعودية والخليج العربي.

---

## 🌟 الميزات الرئيسية (Key Features)

1. **المتجر ومحاكي التقسيط التفاعلي (Store & Split Payment Previewer)**:
   - استعراض منتجات فاخرة وحاسبة دفعات حية (4 دفعات لتابي / 3 أو 4 دفعات لتمارا بدون فوائد أو رسوم خفية).
   - جدول مقسّم يوضح الدفعة الأولى اليوم والدفعات القادمة في الأشهر التالية.

2. **بوابة محاكاة عملية الدفع (Interactive Checkout Flow Simulator)**:
   - محاكاة تجربة الشراء الفعلية خطوة بخطوة للعميل عند اختيار تابي أو تمارا.
   - التحقق برقم الجوال والرمز السري (OTP Simulation) مع بطاقات افتراضية.

3. **لوحة تحكم التجار (Merchant Business Intelligence Dashboard)**:
   - تحليلات متقدمة لنسب مبيعات تابي مقابل تمارا، متوسط حجم السلة (AOV)، ونسبة التحويل.
   - كشف حساب التسويات المالية والعمولات وتتبع طلبات الاسترداد.

4. **مركز المطورين والتكامل البرمجي (Developer Portal & SDK Sandbox)**:
   - أداة تخصيص الودجت (Widget Builder) التفاعلية لإنتاج كود الـ HTML / React مباشرة.
   - نماذج REST API Webhook endpoints وأكواد الربط لـ JavaScript / PHP / Node.js.

---

## 🚀 التشغيل المحلي (Local Setup)

```bash
# 1. التثبيت
npm install

# 2. تشغيل خادم التطوير
npm run dev

# 3. بناء النسخة النهائية (Production Build)
npm run build
```

---

## 🔗 ربط المستودع مع جيت هاب (GitHub Remote Setup)

تمت تهيئة Git محلياً على الفرع `main`. لرفع المشروع إلى مستودعك الجديد على GitHub، نفّذ الأوامر التالية من المجلد المحلي:

```bash
# 1. ربط المستودع بعنصر Remote في GitHub (استبدل YOUR_USERNAME باسم حسابك في جيت هاب)
git remote add origin https://github.com/YOUR_USERNAME/tabby-tamara.git

# 2. رفع الأكواد إلى الفرع الرئيسي
git branch -M main
git push -u origin main
```
