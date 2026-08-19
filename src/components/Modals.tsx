import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Store as StoreIcon,
  ShoppingBag,
  Wrench,
  Plus,
  Sparkles,
  Upload,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { ALGERIAN_WILAYAS } from '../data/algerianWilayas';

export const AddStoreModal: React.FC = () => {
  const { isAddStoreModalOpen, setIsAddStoreModalOpen, addNewStore, categories } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('أزياء');
  const [wilaya, setWilaya] = useState('57 - المغير');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('🏪');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  if (!isAddStoreModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addNewStore({
      name: name.trim(),
      category,
      wilaya,
      desc: desc.trim() || `متجر متخصص في ${wilaya} معتمد على منصة Fenk بالجزائر 🇩🇿`,
      icon: icon.trim() || '🏪',
      code: code.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined
    });

    setName('');
    setDesc('');
    setCode('');
    setPhone('');
    setEmail('');
  };

  const sampleIcons = ['👕', '💻', '💄', '🛒', '⚽', '🏠', '🍕', '☕', '🎁', '👟', '📱', '🏪'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setIsAddStoreModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#12121a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl z-10">
        <div className="p-6 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30 flex items-center justify-center">
              <StoreIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">تسجيل وإضافة متجر جديد</h3>
              <p className="text-xs text-slate-400">انضم إلى مجتمع بائعي فينك وابدأ البيع فوراً</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddStoreModalOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم المتجر *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: متجر السعادة"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">فئة المتجر *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              >
                <option value="أزياء">أزياء وموضة</option>
                <option value="إلكترونيات">إلكترونيات وتقنية</option>
                <option value="جمال">جمال وعطور</option>
                <option value="بقالة">بقالة وتموينات</option>
                <option value="رياضة">رياضة ولياقة</option>
                <option value="أثاث">أثاث وديكور</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">أيقونة أو شعار المتجر</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                maxLength={4}
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-16 text-center py-2 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xl"
              />
              <span className="text-xs text-slate-400">أو اختر إيموجي سريع:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleIcons.map((ico) => (
                <button
                  key={ico}
                  type="button"
                  onClick={() => setIcon(ico)}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg transition-all ${
                    icon === ico ? 'border-[#00d4c8] bg-[#00d4c8]/20' : 'border-[#2a2a3a] bg-[#0a0a0f]'
                  }`}
                >
                  {ico}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">وصف المتجر</label>
            <textarea
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="نبذة عن المنتجات والخدمات التي يقدمها متجرك..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                الولاية (69 ولاية جزائرية) *
              </label>
              <select
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              >
                {ALGERIAN_WILAYAS.map((w) => (
                  <option key={w.code} value={`${w.code} - ${w.ar}`}>
                    {w.code} - {w.ar} ({w.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف للتواصل *</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0777946398"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8] text-left dir-ltr"
                />
                <span className="absolute right-3 top-2.5 text-[11px] font-mono text-slate-500">
                  +213
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              كود الدخول السري (اختياري - يولد تلقائياً إن ترك فارغاً)
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="تلقائي مثل VEND1007"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8] font-mono uppercase"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-sm shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-[1.02] transition-all"
            >
              حفظ وتسجيل المتجر
            </button>
            <button
              type="button"
              onClick={() => setIsAddStoreModalOpen(false)}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddProductModal: React.FC = () => {
  const { isAddProductModalOpen, setIsAddProductModalOpen, addNewProduct, currentUser, stores } = useApp();

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [oldPrice, setOldPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number>(25);
  const [category, setCategory] = useState('أزياء');
  const [icon, setIcon] = useState('📦');
  const [badge, setBadge] = useState('جديد');
  const [desc, setDesc] = useState('');

  if (!isAddProductModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    addNewProduct({
      name: name.trim(),
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      stock: Number(stock),
      category,
      icon,
      badge: badge.trim() || undefined,
      desc: desc.trim() || undefined,
      storeId: currentUser.storeId || 1
    });

    setName('');
    setPrice('');
    setOldPrice('');
    setDesc('');
  };

  const productEmojis = ['👕', '📱', '🧴', '👟', '🎧', '💄', '🪑', '🍚', '🫒', '🛋️', '⌚', '📦'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setIsAddProductModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#12121a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl z-10">
        <div className="p-6 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">إضافة منتج جديد للمتجر</h3>
              <p className="text-xs text-slate-400">
                {currentUser.storeName || 'المتجر الحالي'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddProductModalOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم المنتج *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: حذاء جري خفيف ومرن"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">السعر الحالي (ر.س) *</label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="149"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">السعر قبل الخصم</label>
              <input
                type="number"
                min={1}
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="199"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">الكمية بالمخزن</label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">القسم / التصنيف</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              >
                <option value="أزياء">أزياء</option>
                <option value="إلكترونيات">إلكترونيات</option>
                <option value="جمال">جمال وعطور</option>
                <option value="بقالة">بقالة</option>
                <option value="رياضة">رياضة</option>
                <option value="أثاث">أثاث</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">شارة تمييز المنتج</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="خصم 20% أو الأكثر طلباً"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">رمز وأيقونة المنتج</label>
            <div className="flex flex-wrap gap-2">
              {productEmojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setIcon(e)}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg transition-all ${
                    icon === e ? 'border-[#00d4c8] bg-[#00d4c8]/20' : 'border-[#2a2a3a] bg-[#0a0a0f]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">تفاصيل ومواصفات المنتج</label>
            <textarea
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="وصف تفصيلي للمنتج وجودة الخامات وطريقة الاستخدام..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-sm shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-[1.02] transition-all"
            >
              نشر المنتج في المتجر
            </button>
            <button
              type="button"
              onClick={() => setIsAddProductModalOpen(false)}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CraftsmanRegisterModal: React.FC = () => {
  const { isCraftsmanRegisterModalOpen, setIsCraftsmanRegisterModalOpen, registerCraftsman } = useApp();

  const [name, setName] = useState('');
  const [profession, setProfession] = useState('بناء');
  const [city, setCity] = useState('المغير');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState<number>(8);
  const [mobility, setMobility] = useState<boolean>(true);

  if (!isCraftsmanRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const professionEmojis: Record<string, string> = {
      بناء: '👷‍♂️',
      نجار: '🪚',
      سباك: '🔧',
      كهربائي: '⚡',
      دهان: '🎨',
      حداد: '🔨',
      مبلط: '🧱',
      ميكانيكي: '🔧',
      تكييف: '❄️',
      أخرى: '🛠️'
    };

    // Clean phone for whatsapp (format 213xxxxxxxxx)
    const cleanPhone = phone.trim().replace(/^0/, '213').replace(/\D/g, '');

    registerCraftsman({
      name: name.trim(),
      profession: profession + ' معتمد',
      avatar: professionEmojis[profession] || '👷‍♂️',
      city,
      phone: phone.trim(),
      whatsapp: cleanPhone || `213${phone.trim()}`,
      bio: bio.trim() || `خبير محترف في مجال الـ ${profession} بولاية ${city} وما جاورها بخبرة تتجاوز ${experience} سنوات.`,
      experience: Number(experience),
      mobility,
      skills: [profession, 'صيانة عامة', 'تشطيب', 'ضمان معتمد']
    });

    setName('');
    setPhone('');
    setBio('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setIsCraftsmanRegisterModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#12121a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl z-10">
        <div className="p-6 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">تسجيل حرفي / مقاول جزائري 🇩🇿</h3>
              <p className="text-xs text-slate-400">انضم لسوق المهن عبر 69 ولاية جزائرية واستقبل طلبات العملاء</p>
            </div>
          </div>
          <button
            onClick={() => setIsCraftsmanRegisterModalOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم واللقب *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: أحمد بن علي"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">المهنة / التخصص *</label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="بناء">بناء وتشطيبات</option>
                <option value="نجار">نجارة وديكورات خشب</option>
                <option value="سباك">سباكة وصرف صحي</option>
                <option value="كهربائي">كهرباء وتمديدات ذكية</option>
                <option value="دهان">دهانات وديكورات جدران</option>
                <option value="حداد">حدادة وأبواب ليزر</option>
                <option value="مبلط">بلاط وسيراميك ورخام</option>
                <option value="تكييف">فني تكييف وتبريد</option>
                <option value="أخرى">مهنة أخرى</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">الولاية (69 ولاية جزائرية) *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {ALGERIAN_WILAYAS.map((w) => (
                  <option key={w.code} value={w.ar}>
                    {w.code} - {w.ar} ({w.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف (واتساب) *</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0777946398"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-purple-500 text-left dir-ltr"
                />
                <span className="absolute right-3 top-2.5 text-[11px] font-mono text-slate-500">
                  +213
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">سنوات الخبرة</label>
              <input
                type="number"
                min={1}
                max={40}
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">التنقل خارج المدينة</label>
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="mobility"
                    checked={mobility === true}
                    onChange={() => setMobility(true)}
                    className="accent-purple-500"
                  />
                  <span>متاح للتنقل</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="mobility"
                    checked={mobility === false}
                    onChange={() => setMobility(false)}
                    className="accent-purple-500"
                  />
                  <span>في مدينتي فقط</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">نبذة عن خبراتك ومميزات عملك</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="اكتب نبذة مختصرة تبرز فيها التزامك ودقتك في العمل..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-[1.02] transition-all"
            >
              تسجيل الحساب وتوثيقه
            </button>
            <button
              type="button"
              onClick={() => setIsCraftsmanRegisterModalOpen(false)}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
