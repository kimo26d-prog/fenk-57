import React, { useState, useRef } from 'react';
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
  MapPin,
  Image as ImageIcon,
  Camera,
  Trash2
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
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAddProductModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePhotoPresets = [
    { label: 'أزياء وسترات', url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80' },
    { label: 'أحذية رياضية', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80' },
    { label: 'هواتف ذكية', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80' },
    { label: 'سماعات احترافية', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
    { label: 'عطور فاخرة', url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80' },
    { label: 'ديكور ومفروشات', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80' },
    { label: 'أدوات بناء ومعدات', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80' }
  ];

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
      image: imageUrl || imagePreview || undefined,
      badge: badge.trim() || undefined,
      desc: desc.trim() || undefined,
      storeId: currentUser.storeId || 1
    });

    setName('');
    setPrice('');
    setOldPrice('');
    setDesc('');
    setImageUrl('');
    setImagePreview(null);
  };

  const productEmojis = ['👕', '📱', '🧴', '👟', '🎧', '💄', '🪑', '🍚', '🫒', '🛋️', '⌚', '📦'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setIsAddProductModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#12121a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        <div className="p-6 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">إضافة منتج حقيقي للمتجر</h3>
              <p className="text-xs text-slate-400">
                {currentUser.storeName || 'المتجر الحالي'} - مع إمكانية رفع صورة حقيقية
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Real Photo Upload & Preview Section */}
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] space-y-3">
            <label className="block text-xs font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#00d4c8]" />
              صورة المنتج الحقيقية (رفع من الجهاز أو رابط)
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-2xl bg-[#161622] border-2 border-dashed border-[#00d4c8]/40 flex items-center justify-center overflow-hidden shrink-0 relative group">
                {imagePreview || imageUrl ? (
                  <>
                    <img
                      src={imagePreview || imageUrl}
                      alt="معاينة المنتج"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImageUrl('');
                      }}
                      className="absolute inset-0 bg-black/70 flex items-center justify-center text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center text-slate-400 hover:text-[#00d4c8] cursor-pointer p-2 text-center"
                  >
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">رفع صورة</span>
                  </div>
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-[#2a2a3a] text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#00d4c8]" />
                    اختر ملفاً من جهازك
                  </button>
                </div>

                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="أو الصق رابط صورة خارجية (https://...)"
                  className="w-full px-3 py-2 rounded-xl bg-[#12121a] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d4c8]"
                />
              </div>
            </div>

            {/* Quick preset chips */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5">أو اختر من النماذج الحقيقية الجاهزة:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePhotoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setImagePreview(preset.url);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#161622] hover:bg-[#00d4c8]/20 border border-[#2a2a3a] hover:border-[#00d4c8]/50 text-[11px] text-slate-300 hover:text-[#00d4c8] transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

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
              <label className="block text-xs font-bold text-slate-300 mb-1.5">السعر الحالي (د.ج) *</label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="4500"
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
                placeholder="5800"
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
                <option value="أزياء">أزياء وموضة</option>
                <option value="إلكترونيات">إلكترونيات وتقنية</option>
                <option value="جمال">جمال وعطور</option>
                <option value="بقالة">بقالة وتموينات</option>
                <option value="رياضة">رياضة ولياقة</option>
                <option value="أثاث">أثاث وديكور</option>
                <option value="مواد البناء">مواد بناء وأدوات</option>
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
            <label className="block text-xs font-bold text-slate-300 mb-1.5">رمز الإيموجي الاحتياطي</label>
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
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState('');
  const photoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  if (!isCraftsmanRegisterModalOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setPhotoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryUrls((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const addGalleryFromUrl = () => {
    if (newGalleryInput.trim()) {
      setGalleryUrls((prev) => [...prev, newGalleryInput.trim()]);
      setNewGalleryInput('');
    }
  };

  const sampleCraftsmanAvatars = [
    { label: 'بناء ومعماري', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=400&auto=format&fit=crop&q=80' },
    { label: 'كهربائي محترف', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80' },
    { label: 'نجار وديكورات', url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&auto=format&fit=crop&q=80' },
    { label: 'سباك وصرف صحي', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80' },
    { label: 'دهانات وفنون', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80' }
  ];

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
      photo: photoUrl || photoPreview || undefined,
      avatarImage: photoUrl || photoPreview || undefined,
      city,
      phone: phone.trim(),
      whatsapp: cleanPhone || `213${phone.trim()}`,
      bio: bio.trim() || `خبير محترف في مجال الـ ${profession} بولاية ${city} وما جاورها بخبرة تتجاوز ${experience} سنوات.`,
      experience: Number(experience),
      mobility,
      skills: [profession, 'صيانة عامة', 'تشطيب', 'ضمان معتمد'],
      gallery: galleryUrls.length > 0 ? galleryUrls : undefined
    });

    setName('');
    setPhone('');
    setBio('');
    setPhotoUrl('');
    setPhotoPreview(null);
    setGalleryUrls([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setIsCraftsmanRegisterModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#12121a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        <div className="p-6 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">تسجيل حرفي / مقاول جزائري 🇩🇿</h3>
              <p className="text-xs text-slate-400">انضم لسوق المهن مع رفع صورتك الشخصية ومعرض أعمالك الحقيقية</p>
            </div>
          </div>
          <button
            onClick={() => setIsCraftsmanRegisterModalOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Craftsman Avatar Upload & Live Preview */}
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] space-y-3">
            <label className="block text-xs font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-400" />
              الصورة الشخصية للحرفي (رفع صورة حقيقية)
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#161622] border-2 border-purple-500/40 flex items-center justify-center overflow-hidden shrink-0 relative group shadow-md">
                {photoPreview || photoUrl ? (
                  <>
                    <img
                      src={photoPreview || photoUrl}
                      alt="صورة الحرفي"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setPhotoUrl('');
                      }}
                      className="absolute inset-0 bg-black/70 flex items-center justify-center text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div
                    onClick={() => photoInputRef.current?.click()}
                    className="flex flex-col items-center justify-center text-slate-400 hover:text-purple-400 cursor-pointer p-2 text-center"
                  >
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">صورة شخصية</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  ref={photoInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  رفع صورة من الجهاز
                </button>

                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    setPhotoPreview(e.target.value);
                  }}
                  placeholder="أو الصق رابط صورة (https://...)"
                  className="w-full px-3 py-1.5 rounded-xl bg-[#12121a] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Quick avatar presets */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5">أو اختر صورة سريعة من النماذج:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleCraftsmanAvatars.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPhotoUrl(sample.url);
                      setPhotoPreview(sample.url);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#161622] hover:bg-purple-500/20 border border-[#2a2a3a] hover:border-purple-500/40 text-[11px] text-slate-300 hover:text-purple-300 transition-colors"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real Project Gallery Upload */}
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                معرض صور الأعمال السابقة ({galleryUrls.length} صور)
              </label>

              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center gap-1 border border-[#2a2a3a]"
              >
                <Upload className="w-3 h-3 text-purple-400" />
                إضافة صور من الجهاز
              </button>
            </div>

            <input
              type="file"
              ref={galleryInputRef}
              onChange={handleGalleryUpload}
              accept="image/*"
              multiple
              className="hidden"
            />

            {/* URL add */}
            <div className="flex gap-2">
              <input
                type="url"
                value={newGalleryInput}
                onChange={(e) => setNewGalleryInput(e.target.value)}
                placeholder="أضف رابط صورة عمل نفذته (https://...)"
                className="flex-1 px-3 py-1.5 rounded-xl bg-[#12121a] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={addGalleryFromUrl}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                إضافة
              </button>
            </div>

            {/* Gallery Previews Grid */}
            {galleryUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-2 pt-1">
                {galleryUrls.map((gUrl, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#2a2a3a] group">
                    <img
                      src={gUrl}
                      alt={`عمل ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setGalleryUrls((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
