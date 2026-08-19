import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CartItem } from '../types';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Store as StoreIcon,
  CreditCard,
  MapPin
} from 'lucide-react';
import { ALGERIAN_WILAYAS } from '../data/algerianWilayas';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    changeQty,
    removeFromCart,
    clearCart,
    checkout,
    platformSettings,
    currentUser,
    navigateTo
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping'>('cart');
  const [customerName, setCustomerName] = useState(currentUser.name !== 'زائر' ? currentUser.name : '');
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '0777946398');
  const [selectedWilaya, setSelectedWilaya] = useState(currentUser.wilaya || '57 - المغير');
  const [customerAddress, setCustomerAddress] = useState(currentUser.address || 'وسط المدينة، حي الاستقلال');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'edahabia' | 'baridimob'>('cod');

  if (!isCartOpen) return null;

  // Group cart items by store
  const storeGroups = cart.reduce<Record<string, CartItem[]>>((groups, item) => {
    if (!groups[item.store]) {
      groups[item.store] = [];
    }
    groups[item.store].push(item);
    return groups;
  }, {});

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('يرجى تعبئة جميع بيانات الشحن');
      return;
    }

    const fullAddress = `${selectedWilaya} - ${customerAddress.trim()}`;
    const success = checkout({
      name: customerName,
      phone: customerPhone,
      address: fullAddress
    });

    if (success) {
      setCheckoutStep('cart');
    }
  };

  const deliveryFee = cart.length > 0 ? platformSettings.deliveryFee : 0;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setCheckoutStep('cart');
        }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Sliding Panel */}
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 pr-0 sm:pr-10">
        <div className="w-screen max-w-md bg-[#12121a] border-r border-[#2a2a3a] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#2a2a3a] bg-[#1a1a24] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">
                  {checkoutStep === 'cart' ? 'سلة التسوق' : 'إتمام الطلب والشحن'}
                </h3>
                <p className="text-xs text-slate-400">
                  {cart.length > 0
                    ? `${cart.reduce((s, i) => s + i.qty, 0)} منتج من ${Object.keys(storeGroups).length} محلات`
                    : 'سلتك فارغة'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && checkoutStep === 'cart' && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                >
                  إفراغ
                </button>
              )}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep('cart');
                }}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-4">
                  🛒
                </div>
                <h4 className="text-lg font-bold text-white mb-2">سلة التسوق فارغة</h4>
                <p className="text-sm text-slate-400 max-w-xs mb-6">
                  استكشف أفضل المنتجات من المحلات التجارية المتنوعة واطلبها بشحنة واحدة!
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('products');
                  }}
                  className="px-6 py-3 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,200,0.3)]"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              <>
                {/* Multi-store delivery badge notice */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#00d4c8] shrink-0" />
                  <p className="text-xs text-cyan-200 leading-relaxed font-semibold">
                    طلبك يشمل منتجات من عدة محلات، وسيتم توصيلها في شحنة واحدة مجمعة!
                  </p>
                </div>

                {/* Grouped items by store */}
                {(Object.entries(storeGroups) as [string, CartItem[]][]).map(([storeName, items]) => (
                  <div
                    key={storeName}
                    className="bg-[#1a1a24] rounded-2xl border border-[#2a2a3a] overflow-hidden"
                  >
                    <div className="px-4 py-2.5 bg-white/5 border-b border-[#2a2a3a] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#00d4c8]">
                        <StoreIcon className="w-3.5 h-3.5" />
                        <span>{storeName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {items.length} صنف
                      </span>
                    </div>

                    <div className="p-3 divide-y divide-[#2a2a3a]/60">
                      {items.map((item) => (
                        <div key={item.id} className="py-3 first:pt-1 last:pb-1 flex gap-3 items-center">
                          <div className="w-14 h-14 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] flex items-center justify-center text-2xl shrink-0">
                            {item.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-white truncate mb-1">
                              {item.name}
                            </h5>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-[#00d4c8]">
                                {item.price * item.qty} ر.س
                              </span>
                              {item.qty > 1 && (
                                <span className="text-[10px] text-slate-400">
                                  ({item.price} ر.س / للقطعة)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-1.5 bg-[#0a0a0f] p-1 rounded-xl border border-[#2a2a3a]">
                            <button
                              onClick={() => changeQty(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-[#1a1a24] hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-colors"
                            >
                              {item.qty === 1 ? <Trash2 className="w-3 h-3 text-rose-400" /> : <Minus className="w-3 h-3" />}
                            </button>

                            <span className="w-6 text-center font-bold text-xs text-white">
                              {item.qty}
                            </span>

                            <button
                              onClick={() => changeQty(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-[#1a1a24] hover:bg-[#00d4c8]/20 text-slate-300 hover:text-[#00d4c8] flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* Shipping & Checkout Step */
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs text-[#00d4c8] flex items-center gap-1 hover:underline font-bold mb-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  الرجوع لمراجعة المنتجات
                </button>

                <div className="space-y-3 bg-[#1a1a24] p-4 rounded-2xl border border-[#2a2a3a]">
                  <h4 className="text-xs font-black text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00d4c8]" />
                    معلومات المستلم
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      الاسم الكامل (الاسم واللقب) *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: كريم الدراجي"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        الولاية (69 ولاية جزائرية) *
                      </label>
                      <select
                        value={selectedWilaya}
                        onChange={(e) => setSelectedWilaya(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white focus:outline-none focus:border-[#00d4c8]"
                      >
                        {ALGERIAN_WILAYAS.map((w) => (
                          <option key={w.code} value={`${w.code} - ${w.ar}`}>
                            {w.code} - {w.ar} ({w.name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        رقم الهاتف للتأكيد *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="0777946398"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8] text-left dir-ltr"
                        />
                        <span className="absolute right-3 top-2.5 text-[10px] font-mono text-slate-500">
                          +213
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      البلدية / الحي / العنوان التفصيلي *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="البلدية، اسم الحي أو الشارع، رقم المنزل"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
                    />
                  </div>
                </div>

                {/* Payment method */}
                <div className="space-y-3 bg-[#1a1a24] p-4 rounded-2xl border border-[#2a2a3a]">
                  <h4 className="text-xs font-black text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#00d4c8]" />
                    طريقة الدفع (الجزائر 🇩🇿)
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#00d4c8] bg-[#00d4c8]/10 text-[#00d4c8]'
                          : 'border-[#2a2a3a] bg-[#0a0a0f] text-slate-400'
                      }`}
                    >
                      <span>💵</span>
                      <span>عند الاستلام</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('edahabia')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'edahabia'
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                          : 'border-[#2a2a3a] bg-[#0a0a0f] text-slate-400'
                      }`}
                    >
                      <span>💳</span>
                      <span>البطاقة الذهبية</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('baridimob')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'baridimob'
                          ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                          : 'border-[#2a2a3a] bg-[#0a0a0f] text-slate-400'
                      }`}
                    >
                      <span>📱</span>
                      <span>BaridiMob</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer & Totals */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#2a2a3a] bg-[#1a1a24] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>قيمة المنتجات:</span>
                  <span className="font-bold text-white">{cartTotal} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم التوصيل الموحد:</span>
                  <span className="font-bold text-[#00d4c8]">{deliveryFee} ر.س</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-[#2a2a3a]">
                  <span>المجموع الكلي:</span>
                  <span className="text-[#00d4c8] text-base">{finalTotal} ر.س</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-[1.02] transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  متابعة إلى الشحن والدفع ({finalTotal} ر.س)
                </button>
              ) : (
                <button
                  form="checkout-form"
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00e676] to-[#00c853] text-[#0a0a0f] font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:scale-[1.02] transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  تأكيد وإرسال الطلب الآن
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
