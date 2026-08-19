import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Store,
  Product,
  Category,
  Craftsman,
  CartItem,
  Order,
  NotificationItem,
  PushNotificationConfig,
  PushNotificationToastItem,
  CurrentUser,
  PlatformSettings,
  PageView,
  ChatMessage,
  VipPlan,
  VipSubscriptionRequest
} from '../types';
import { ALGERIAN_WILAYAS, Wilaya } from '../data/algerianWilayas';
import {
  INITIAL_STORES,
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_CRAFTSMEN,
  INITIAL_NOTIFICATIONS,
  DEFAULT_PLATFORM_SETTINGS,
  ADMIN_CREDENTIALS,
  VIP_PLANS,
  INITIAL_VIP_REQUESTS
} from '../data/mockData';
import { playOrderNotificationSound, playSuccessSound, playClickSound } from '../utils/audio';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & View
  page: PageView;
  navigateTo: (page: PageView, params?: { storeId?: number; craftsmanId?: number }) => void;
  selectedStoreId: number | null;
  selectedCraftsmanId: number | null;
  
  // Auth & Roles
  currentUser: CurrentUser;
  loginAsVendor: (code: string) => boolean;
  loginAsAdmin: (code: string, pass: string) => boolean;
  loginAsCustomer: (name: string, phone: string, wilaya?: string, address?: string) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;

  // Data Stores
  stores: Store[];
  products: Product[];
  craftsmen: Craftsman[];
  categories: Category[];
  orders: Order[];
  notifications: NotificationItem[];
  platformSettings: PlatformSettings;
  updatePlatformSettings: (settings: Partial<PlatformSettings>) => void;
  
  // Admin Credentials
  adminCredentials: { code: string; password: string };
  updateAdminCredentials: (newCode: string, newPass: string) => void;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  changeQty: (productId: number, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  checkout: (details: { name: string; phone: string; address: string }) => boolean;

  // Favorites
  favorites: number[];
  toggleFavorite: (productId: number) => void;

  // Notifications & Push Alerts
  isNotifOpen: boolean;
  setIsNotifOpen: (val: boolean) => void;
  unreadNotifsCount: number;
  addNotification: (
    type: NotificationItem['type'],
    title: string,
    message: string,
    data?: any,
    wilaya?: string,
    actionLabel?: string,
    actionPage?: PageView
  ) => void;
  markNotifAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Push Notifications System
  pushConfig: PushNotificationConfig;
  updatePushConfig: (config: Partial<PushNotificationConfig>) => void;
  activePushToast: PushNotificationToastItem | null;
  triggerPushNotification: (toast: PushNotificationToastItem) => void;
  dismissPushToast: () => void;
  requestBrowserNotificationPermission: () => Promise<boolean>;
  triggerSimulatedOrderPush: (orderId?: string) => void;
  triggerSimulatedWilayaOfferPush: (wilayaName?: string) => void;
  triggerSimulatedCraftsmanPush: (wilayaName?: string) => void;

  // Audio
  soundEnabled: boolean;
  toggleSound: () => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Modals
  isAddStoreModalOpen: boolean;
  setIsAddStoreModalOpen: (val: boolean) => void;
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: (val: boolean) => void;
  isCraftsmanRegisterModalOpen: boolean;
  setIsCraftsmanRegisterModalOpen: (val: boolean) => void;
  isOrderSuccessModalOpen: boolean;
  setIsOrderSuccessModalOpen: (val: boolean) => void;
  latestPlacedOrder: Order | null;

  // Customer & Profile Actions
  reorderOrder: (orderId: string) => void;
  reorderSingleProduct: (product: Product) => void;
  cancelOrder: (orderId: string) => boolean;
  updateCustomerProfile: (data: Partial<CurrentUser>) => void;

  // Management actions
  addNewStore: (storeData: Partial<Store>) => Store;
  approveStore: (id: number) => void;
  deleteStore: (id: number) => void;
  addNewProduct: (productData: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  registerCraftsman: (craftsmanData: Partial<Craftsman>) => void;
  approveCraftsman: (id: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Live Chat
  activeChatCraftsman: Craftsman | null;
  chatMessages: Record<number, ChatMessage[]>;
  openChatWithCraftsman: (craftsman: Craftsman) => void;
  closeChat: () => void;
  sendChatMessage: (craftsmanId: number, text: string) => void;

  // VIP Program & Subscriptions
  vipPlans: VipPlan[];
  vipRequests: VipSubscriptionRequest[];
  isVipModalOpen: boolean;
  setIsVipModalOpen: (val: boolean) => void;
  submitVipSubscription: (requestData: Omit<VipSubscriptionRequest, 'id' | 'date' | 'status'>) => boolean;
  approveVipRequest: (requestId: string) => void;
  rejectVipRequest: (requestId: string, reason?: string) => void;
  revokeVip: (entityType: 'store' | 'craftsman', entityId: number) => void;

  // Wilaya & Category State
  selectedWilaya: Wilaya;
  setSelectedWilaya: (w: Wilaya) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  togglePushSubscription: (wilayaCode: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage with safe fallback
  const [page, setPage] = useState<PageView>('home');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [selectedCraftsmanId, setSelectedCraftsmanId] = useState<number | null>(null);

  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem('fenk_user');
    return saved ? JSON.parse(saved) : { type: 'guest', name: 'زائر' };
  });

  const [stores, setStores] = useState<Store[]>(() => {
    const saved = localStorage.getItem('fenk_stores');
    return saved ? JSON.parse(saved) : INITIAL_STORES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fenk_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [craftsmen, setCraftsmen] = useState<Craftsman[]>(() => {
    const saved = localStorage.getItem('fenk_craftsmen');
    return saved ? JSON.parse(saved) : INITIAL_CRAFTSMEN;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fenk_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('fenk_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fenk_orders');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'ord-1001',
            orderNumber: 'ORD-2026',
            date: '2026-08-18',
            customerName: 'أحمد محمد الشمري',
            customerPhone: '0501239876',
            customerAddress: 'الرياض - حي الياسمين - شارع أنس بن مالك',
            items: [
              { ...INITIAL_PRODUCTS[0], qty: 1 },
              { ...INITIAL_PRODUCTS[2], qty: 1 }
            ],
            subtotal: 238,
            deliveryFee: 25,
            total: 263,
            status: 'shipped',
            storeIds: [1, 3],
            paymentMethod: 'applepay',
            trackingNote: 'الشحنة مع مندوب شركة فاست لتوصيل الطلبات، متوقع التسليم اليوم'
          },
          {
            id: 'ord-1002',
            orderNumber: 'ORD-2025',
            date: '2026-08-17',
            customerName: 'أحمد محمد الشمري',
            customerPhone: '0501239876',
            customerAddress: 'الرياض - حي الياسمين - شارع أنس بن مالك',
            items: [{ ...INITIAL_PRODUCTS[1], qty: 1 }],
            subtotal: 4899,
            deliveryFee: 25,
            total: 4924,
            status: 'processing',
            storeIds: [2],
            paymentMethod: 'card',
            trackingNote: 'المتجر يقوم بتجهيز وتغليف المنتج والتأكد من شهادة الضمان'
          },
          {
            id: 'ord-1003',
            orderNumber: 'ORD-2020',
            date: '2026-08-10',
            customerName: 'أحمد محمد الشمري',
            customerPhone: '0501239876',
            customerAddress: 'الرياض - حي الياسمين - شارع أنس بن مالك',
            items: [
              { ...INITIAL_PRODUCTS[3], qty: 2 },
              { ...INITIAL_PRODUCTS[4], qty: 1 }
            ],
            subtotal: 395,
            deliveryFee: 25,
            total: 420,
            status: 'completed',
            storeIds: [4, 5],
            paymentMethod: 'cod',
            trackingNote: 'تم تسليم الشحنة بنجاح واستلام المبلغ'
          },
          {
            id: 'ord-1004',
            orderNumber: 'ORD-1980',
            date: '2026-07-28',
            customerName: 'أحمد محمد الشمري',
            customerPhone: '0501239876',
            customerAddress: 'الرياض - حي الياسمين - شارع أنس بن مالك',
            items: [{ ...INITIAL_PRODUCTS[5], qty: 1 }],
            subtotal: 450,
            deliveryFee: 25,
            total: 475,
            status: 'completed',
            storeIds: [6],
            paymentMethod: 'card',
            trackingNote: 'تم التسليم والتقييم 5 نجوم'
          }
        ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('fenk_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('fenk_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PLATFORM_SETTINGS,
          ...parsed,
          supportEmail: parsed.supportEmail === 'support@fenk.com' ? DEFAULT_PLATFORM_SETTINGS.supportEmail : (parsed.supportEmail || DEFAULT_PLATFORM_SETTINGS.supportEmail),
          emergencyPhone: (parsed.emergencyPhone === '920000000' || !parsed.emergencyPhone) ? DEFAULT_PLATFORM_SETTINGS.emergencyPhone : parsed.emergencyPhone,
          location: parsed.location || DEFAULT_PLATFORM_SETTINGS.location
        };
      } catch (e) {
        return DEFAULT_PLATFORM_SETTINGS;
      }
    }
    return DEFAULT_PLATFORM_SETTINGS;
  });

  const [adminCredentials, setAdminCredentials] = useState<{ code: string; password: string }>(() => {
    const saved = localStorage.getItem('fenk_admin_credentials');
    return saved ? JSON.parse(saved) : ADMIN_CREDENTIALS;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('fenk_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isCraftsmanRegisterModalOpen, setIsCraftsmanRegisterModalOpen] = useState(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<Order | null>(null);

  // VIP Subscriptions State
  const [vipRequests, setVipRequests] = useState<VipSubscriptionRequest[]>(() => {
    const saved = localStorage.getItem('fenk_vip_requests');
    return saved ? JSON.parse(saved) : INITIAL_VIP_REQUESTS;
  });
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  // Live Chat state
  const [activeChatCraftsman, setActiveChatCraftsman] = useState<Craftsman | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<number, ChatMessage[]>>({
    1: [
      {
        id: 'msg-1',
        sender: 'craftsman',
        text: 'أهلاً بك! معك المقاول أحمد العتيبي، يسعدني تنفيذ أعمال البناء والتشطيب لك بأعلى جودة.',
        time: '10:30 ص',
        craftsmanId: 1
      }
    ]
  });

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Wilaya & Category state
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya>(() => {
    return ALGERIAN_WILAYAS.find((w) => w.code === '16') || ALGERIAN_WILAYAS[0];
  });
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fenk_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('fenk_stores', JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem('fenk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fenk_craftsmen', JSON.stringify(craftsmen));
  }, [craftsmen]);

  useEffect(() => {
    localStorage.setItem('fenk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fenk_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('fenk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fenk_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('fenk_settings', JSON.stringify(platformSettings));
  }, [platformSettings]);

  useEffect(() => {
    localStorage.setItem('fenk_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('fenk_vip_requests', JSON.stringify(vipRequests));
  }, [vipRequests]);

  // VIP Program Actions
  const submitVipSubscription = (requestData: Omit<VipSubscriptionRequest, 'id' | 'date' | 'status'>): boolean => {
    const newReqId = `VIP-REQ-${Date.now().toString().slice(-4)}`;
    const newRequest: VipSubscriptionRequest = {
      ...requestData,
      id: newReqId,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'pending'
    };

    setVipRequests((prev) => [newRequest, ...prev]);
    setIsVipModalOpen(false);
    showToast(
      'success',
      'تم إرسال طلب اشتراك VIP بنجاح',
      `تم استلام طلبك لـ (${newRequest.planName}). سيقوم مالك المنصة بمراجعته وتفعيله.`
    );
    addNotification(
      'alert',
      'طلب اشتراك VIP جديد 👑',
      `طلب اشتراك جديد من ${newRequest.name} (${newRequest.planName} - ${newRequest.price} د.ج)`,
      { requestId: newRequest.id }
    );
    playSuccessSound(soundEnabled);
    return true;
  };

  const approveVipRequest = (requestId: string) => {
    const req = vipRequests.find((r) => r.id === requestId);
    if (!req) return;

    const plan = VIP_PLANS.find((p) => p.id === req.planId) || VIP_PLANS[1];

    setVipRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'approved', reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
          : r
      )
    );

    if (req.entityType === 'store') {
      setStores((prev) =>
        prev.map((s) => {
          if (s.id === req.entityId || s.name.trim().toLowerCase() === req.name.trim().toLowerCase() || (s.phone && s.phone === req.phone)) {
            return {
              ...s,
              isVip: true,
              vipBadge: plan.badge,
              vipPlanId: plan.id,
              vipPriority: plan.id === 'diamond' ? 100 : plan.id === 'gold' ? 80 : 60
            };
          }
          return s;
        })
      );
      if (req.entityId) {
        setProducts((prev) =>
          prev.map((p) => (p.storeId === req.entityId ? { ...p, isVip: true } : p))
        );
      }
    } else {
      setCraftsmen((prev) =>
        prev.map((c) => {
          if (c.id === req.entityId || c.name.trim().toLowerCase() === req.name.trim().toLowerCase() || (c.phone && c.phone === req.phone)) {
            return {
              ...c,
              isVip: true,
              vipBadge: plan.badge,
              vipPlanId: plan.id,
              vipPriority: plan.id === 'diamond' ? 100 : plan.id === 'gold' ? 80 : 60
            };
          }
          return c;
        })
      );
    }

    showToast(
      'success',
      'تم تفعيل اشتراك VIP رسمياً 👑',
      `تم منح باقة ${plan.name} لـ "${req.name}" مع صدارة الصفحة الأولى ونتائج البحث!`
    );
    addNotification(
      'success',
      'مبروك! تفعيل اشتراك VIP 👑',
      `تم قبول طلب وتفعيل باقة ${plan.name} لـ ${req.name} بنجاح.`,
      { entityId: req.entityId, entityType: req.entityType }
    );
    playSuccessSound(soundEnabled);
  };

  const rejectVipRequest = (requestId: string, reason?: string) => {
    const req = vipRequests.find((r) => r.id === requestId);
    if (!req) return;

    setVipRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'rejected',
              rejectionReason: reason || 'بيانات التحويل أو الدفع غير متطابقة، يرجى إعادة إرسال الوصل الصحيح',
              reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
            }
          : r
      )
    );

    showToast('info', 'تم رفض طلب VIP', `تم رفض طلب اشتراك ${req.name}`);
  };

  const revokeVip = (entityType: 'store' | 'craftsman', entityId: number) => {
    if (entityType === 'store') {
      setStores((prev) =>
        prev.map((s) => (s.id === entityId ? { ...s, isVip: false, vipBadge: undefined, vipPlanId: undefined, vipPriority: 0 } : s))
      );
      setProducts((prev) =>
        prev.map((p) => (p.storeId === entityId ? { ...p, isVip: false } : p))
      );
    } else {
      setCraftsmen((prev) =>
        prev.map((c) => (c.id === entityId ? { ...c, isVip: false, vipBadge: undefined, vipPlanId: undefined, vipPriority: 0 } : c))
      );
    }
    showToast('warning', 'تم إلغاء عضوية VIP', 'تم سحب شارة وصدارة VIP بنجاح');
  };

  // Toast function
  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      showToast('info', next ? 'تم تفعيل الصوت' : 'تم كتم الصوت', next ? 'سيتم تشغيل تنبيهات الإشعارات' : 'التنبيهات صامتة');
      return next;
    });
  };

  // Push Notifications Config State
  const [pushConfig, setPushConfig] = useState<PushNotificationConfig>(() => {
    const saved = localStorage.getItem('fenk_push_config');
    return saved
      ? JSON.parse(saved)
      : {
          enabled: true,
          selectedWilaya: '57 - المغير',
          orderUpdates: true,
          wilayaOffers: true,
          newCraftsmenAlerts: true,
          soundAlerts: true
        };
  });

  const [activePushToast, setActivePushToast] = useState<PushNotificationToastItem | null>(null);

  // Sync Push Config
  useEffect(() => {
    localStorage.setItem('fenk_push_config', JSON.stringify(pushConfig));
  }, [pushConfig]);

  const updatePushConfig = (newCfg: Partial<PushNotificationConfig>) => {
    setPushConfig((prev) => {
      const updated = { ...prev, ...newCfg };
      showToast('success', 'تم حفظ تفضيلات الإشعارات', `الولاية المحددة: ${updated.selectedWilaya}`);
      return updated;
    });
  };

  const togglePushSubscription = (wilayaCode: string) => {
    setPushConfig((prev) => {
      const currentSubs = prev.subscribedWilayas || [];
      const exists = currentSubs.includes(wilayaCode);
      const updatedSubs = exists
        ? currentSubs.filter((c: string) => c !== wilayaCode)
        : [...currentSubs, wilayaCode];

      const wilayaObj = ALGERIAN_WILAYAS.find((w) => w.code === wilayaCode);
      const wName = wilayaObj ? `${wilayaObj.code} - ${wilayaObj.nameAr}` : wilayaCode;

      const next: PushNotificationConfig = {
        ...prev,
        subscribedWilayas: updatedSubs,
        selectedWilaya: wName
      };

      showToast(
        'success',
        exists ? 'تم إلغاء التنبيه' : 'تم تفعيل التنبيه',
        exists
          ? `تم إلغاء متابعة إشعارات ولاية ${wilayaObj?.nameAr || wilayaCode}`
          : `ستصلك عروض وطلبات ولاية ${wilayaObj?.nameAr || wilayaCode} أولاً بأول`
      );

      return next;
    });
  };

  const dismissPushToast = () => {
    setActivePushToast(null);
  };

  // Browser Notification helper
  const requestBrowserNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      showToast('info', 'غير مدعوم', 'متصفحك لا يدعم إشعارات المتصفح الخارجية، لكن الإشعارات داخل التطبيق مفعلة دائماً');
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        showToast('success', 'تم تفعيل إشعارات المتصفح', 'ستصلك التنبيهات حتى عند تصفح تبويب آخر');
        return true;
      } else {
        showToast('info', 'إشعارات المتصفح', 'تم رفض إذن إشعارات المتصفح، سيستمر التطبيق بعرض الإشعارات المرئية');
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  // Trigger Push Notification banner & sound
  const triggerPushNotification = (toast: PushNotificationToastItem) => {
    if (!pushConfig.enabled) return;

    setActivePushToast(toast);

    if (pushConfig.soundAlerts && soundEnabled) {
      if (toast.type === 'order') {
        playOrderNotificationSound(true);
      } else {
        playSuccessSound(true);
      }
    }

    // Attempt native browser notification if granted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`فينك 🇩🇿 | ${toast.title}`, {
          body: toast.message,
          icon: '/favicon.ico'
        });
      } catch (e) {
        // Safe ignore
      }
    }

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setActivePushToast((current) => (current?.id === toast.id ? null : current));
    }, 6000);
  };

  // Notification methods
  const addNotification = (
    type: NotificationItem['type'],
    title: string,
    message: string,
    data?: any,
    wilaya?: string,
    actionLabel?: string,
    actionPage?: PageView
  ) => {
    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      type,
      title,
      message,
      time: 'الآن',
      read: false,
      wilaya: wilaya || pushConfig.selectedWilaya,
      actionLabel,
      data
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Also trigger Push Banner if config allows
    const shouldPush =
      pushConfig.enabled &&
      ((type === 'order' && pushConfig.orderUpdates) ||
        ((type === 'offer' || type === 'wilaya_deal') && pushConfig.wilayaOffers) ||
        (type === 'service' && pushConfig.newCraftsmenAlerts) ||
        type === 'alert');

    if (shouldPush) {
      triggerPushNotification({
        id: newNotif.id,
        type,
        title,
        message,
        wilaya: newNotif.wilaya,
        actionLabel: actionLabel || (type === 'order' ? 'تتبع الشحنة' : 'عرض التفاصيل'),
        actionPage: actionPage || (type === 'order' ? (currentUser.type === 'vendor' ? 'dashboard' : 'orders-tracking') : 'products'),
        actionParams: data
      });
    } else {
      if (type === 'order') {
        playOrderNotificationSound(soundEnabled);
      } else {
        playSuccessSound(soundEnabled);
      }
    }
  };

  // Simulation Triggers for User Testing
  const triggerSimulatedOrderPush = (orderId?: string) => {
    const targetOrder = orders.find((o) => (orderId ? o.id === orderId : true)) || orders[0];
    const statuses: Array<{ status: Order['status']; label: string; msg: string }> = [
      { status: 'processing', label: 'جاري التجهيز والتغليف', msg: 'المتجر بدأ في تحضير طلبك وفحص المنتجات بعناية.' },
      { status: 'shipped', label: 'خرج مع مندوب التوصيل', msg: 'الشحنة الآن في طريقها إلى عنوانك مع مندوب التوصيل السريع.' },
      { status: 'completed', label: 'تم تسليم الطلب بنجاح', msg: 'تم تسليم شحنتك للعميل، شكراً لتسوقك عبر منصة فينك!' }
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    if (targetOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === targetOrder.id ? { ...o, status: randomStatus.status } : o))
      );
    }

    const orderNum = targetOrder ? targetOrder.orderNumber : 'ORD-2026';
    const activeWilaya = pushConfig.selectedWilaya || '57 - المغير';

    addNotification(
      'order',
      `تحديث الشحنة #${orderNum} (${randomStatus.label})`,
      `${randomStatus.msg} - التوصيل في ولاية ${activeWilaya}`,
      { orderId: targetOrder?.id },
      activeWilaya,
      'تتبع الطلب',
      currentUser.type === 'vendor' ? 'dashboard' : 'orders-tracking'
    );
  };

  const triggerSimulatedWilayaOfferPush = (wilayaName?: string) => {
    const targetWilaya = wilayaName || pushConfig.selectedWilaya || '57 - المغير';
    const deals = [
      { title: `خصم 30% خاص بسكان ولاية ${targetWilaya}`, msg: 'عرض حصري اليوم على جميع المنتجات الكهربائية والأثاث المنزلي مع شحن مجاني.' },
      { title: `قسيمة شحن مجاني في ولاية ${targetWilaya} 🎁`, msg: 'استخدم كود FENK2026 واحصل على توصيل سريع مجاني لجميع طلباتك اليوم.' },
      { title: `افتتاح متجر جديد في ولاية ${targetWilaya} 🏬`, msg: 'انضم متجر مميز للأزياء والمستلزمات الحرفية، تصفح المنتجات واحصل على هدية ترحيبية.' }
    ];
    const deal = deals[Math.floor(Math.random() * deals.length)];

    addNotification(
      'wilaya_deal',
      deal.title,
      deal.msg,
      {},
      targetWilaya,
      'تصفح العروض',
      'products'
    );
  };

  const triggerSimulatedCraftsmanPush = (wilayaName?: string) => {
    const targetWilaya = wilayaName || pushConfig.selectedWilaya || '57 - المغير';
    const alerts = [
      { name: 'فني تكييف وكهرباء معتمد', msg: `حرفي معتمد متاح الآن لخدمات الصيانة المنزلية السريعة في ولاية ${targetWilaya}` },
      { name: 'سباك ومعلم صحي محترف', msg: `جاهز لاستقبال طلبات الصيانة العاجلة والفحص المنزلي في ولاية ${targetWilaya}` },
      { name: 'دهان وديكورات عصرية', msg: `معرض أعمال جديد وتخفيضات على تشطيب الشقق والفلل في ولاية ${targetWilaya}` }
    ];
    const alert = alerts[Math.floor(Math.random() * alerts.length)];

    addNotification(
      'service',
      `حرفي جديد متوفر في ${targetWilaya}: ${alert.name}`,
      alert.msg,
      {},
      targetWilaya,
      'طلب خدمة',
      'craftsmen'
    );
  };

  const markNotifAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('success', 'تم مسح الإشعارات', 'تم إفراغ سجل الإشعارات بنجاح');
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Navigation
  const navigateTo = (targetPage: PageView, params?: { storeId?: number; craftsmanId?: number }) => {
    if (targetPage === 'admin' && currentUser.type !== 'admin') {
      showToast('error', 'غير مصرح', 'يجب تسجيل الدخول كمالك للوصول إلى لوحة الإدارة');
      setIsLoginModalOpen(true);
      return;
    }
    if (targetPage === 'dashboard' && currentUser.type !== 'vendor') {
      showToast('error', 'غير مصرح', 'يجب تسجيل الدخول كبائع للوصول للوحة المتجر');
      setIsLoginModalOpen(true);
      return;
    }

    if (params?.storeId) setSelectedStoreId(params.storeId);
    if (params?.craftsmanId) setSelectedCraftsmanId(params.craftsmanId);

    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound(soundEnabled);
  };

  // Cart operations
  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    playSuccessSound(soundEnabled);
    showToast('success', 'تمت الإضافة للسلة', `تم إضافة "${product.name}" بنجاح`);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('info', 'تم الحذف', 'تم إزالة المنتج من السلة');
  };

  const changeQty = (productId: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast('info', exists ? 'تم الحذف من المفضلة' : 'تمت الإضافة للمفضلة', '');
      return next;
    });
  };

  // Checkout execution
  const checkout = (details: { name: string; phone: string; address: string }): boolean => {
    if (cart.length === 0) {
      showToast('error', 'السلة فارغة', 'أضف منتجات إلى السلة أولاً');
      return false;
    }

    const uniqueStoreIds: number[] = Array.from(new Set(cart.map((item) => item.storeId)));
    const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cartTotal;
    const deliveryFee = platformSettings.deliveryFee;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      customerName: details.name || currentUser.name || 'عميل فينك',
      customerPhone: details.phone || currentUser.phone || '05xxxxxxxx',
      customerAddress: details.address || 'العنوان المسجل',
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      status: 'pending',
      storeIds: uniqueStoreIds
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestPlacedOrder(newOrder);
    setIsCartOpen(false);
    clearCart();

    // Trigger vendor and admin notifications
    uniqueStoreIds.forEach((sId) => {
      const store = stores.find((s) => s.id === sId);
      const storeItems = newOrder.items.filter((item) => item.storeId === sId);
      const storeSum = storeItems.reduce((acc, i) => acc + i.price * i.qty, 0);

      addNotification(
        'order',
        `طلب جديد #${orderNumber} في ${store?.name || 'المتجر'}`,
        `طلب ${storeItems.length} صنف بقيمة ${storeSum} ر.س من العميل ${details.name}`,
        { orderId: newOrder.id, storeId: sId }
      );
    });

    setIsOrderSuccessModalOpen(true);
    playOrderNotificationSound(soundEnabled);
    return true;
  };

  // Auth operations
  const loginAsVendor = (code: string): boolean => {
    const store = stores.find((s) => s && s.code && s.code.toUpperCase() === code.trim().toUpperCase());
    if (store) {
      const user: CurrentUser = {
        type: 'vendor',
        name: store.name,
        storeId: store.id,
        storeName: store.name,
        email: store.email,
        phone: store.phone
      };
      setCurrentUser(user);
      setIsLoginModalOpen(false);
      navigateTo('dashboard');
      showToast('success', `مرحباً ${store.name}`, 'تم تسجيل الدخول إلى لوحة البائع');
      return true;
    }
    showToast('error', 'خطأ في الكود', 'كود البائع غير صحيح');
    return false;
  };

  const loginAsAdmin = (code: string, pass: string): boolean => {
    const cleanCode = code.trim();
    if (
      (cleanCode === adminCredentials.code && pass === adminCredentials.password) ||
      (cleanCode === 'OWNER-2026' && pass === 'Fenk@Owner2026!') ||
      (cleanCode === 'FENK-ADMIN-2026' && pass === 'Fenk@Owner2026!')
    ) {
      const user: CurrentUser = {
        type: 'admin',
        name: 'مالك المنصة (Admin)',
        email: 'admin@fenk.com'
      };
      setCurrentUser(user);
      setIsLoginModalOpen(false);
      navigateTo('admin');
      showToast('success', 'مرحباً بمالك المنصة!', 'تم تسجيل الدخول بصلاحيات الإدارة الكاملة');
      return true;
    }
    showToast('error', 'خطأ في بيانات الدخول', 'كود المالك أو كلمة المرور غير مطابقة');
    return false;
  };

  const updateAdminCredentials = (newCode: string, newPass: string) => {
    const cleanCode = newCode.trim().toUpperCase();
    const updated = { code: cleanCode, password: newPass };
    setAdminCredentials(updated);
    localStorage.setItem('fenk_admin_credentials', JSON.stringify(updated));
    showToast('success', 'تم تحديث بيانات المالك', `كود الدخول الجديد: ${cleanCode}`);
  };

  const loginAsCustomer = (name: string, phone: string, wilaya?: string, address?: string) => {
    const user: CurrentUser = {
      type: 'customer',
      name: name || 'عميل فينك',
      phone: phone || '0777946398',
      wilaya: wilaya || '57 - المغير',
      city: wilaya ? wilaya.replace(/^\d+\s*-\s*/, '') : 'المغير',
      address: address || `${wilaya || 'ولاية المغير'} - الجزائر`
    };
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    showToast('success', `أهلاً بك يا ${user.name} 🇩🇿`, `تم تسجيل دخولك بنجاح في ولاية ${user.city}`);
  };

  const logout = () => {
    setCurrentUser({ type: 'guest', name: 'زائر' });
    navigateTo('home');
    showToast('info', 'تم تسجيل الخروج', 'نتمنى لك يوماً سعيداً');
  };

  // Platform management
  const addNewStore = (storeData: Partial<Store>): Store => {
    const newId = stores.length > 0 ? Math.max(...stores.map((s) => s.id)) + 1 : 1;
    const generatedCode = 'VEND' + (1000 + newId);

    const newStore: Store = {
      id: newId,
      name: storeData.name || 'متجر جديد',
      icon: storeData.icon || '🏪',
      category: storeData.category || 'أزياء',
      rating: 5.0,
      products: 0,
      reviews: 0,
      desc: storeData.desc || 'متجر معتمد على منصة فينك',
      phone: storeData.phone || '05xxxxxxxx',
      email: storeData.email || `store${newId}@fenk.com`,
      status: platformSettings.autoApproveStores ? 'active' : 'pending',
      code: storeData.code || generatedCode,
      bannerColor: 'from-cyan-900/60 to-slate-900',
      featured: false
    };

    setStores((prev) => [newStore, ...prev]);
    setIsAddStoreModalOpen(false);
    showToast('success', 'تم تسجيل المتجر', `تم إنشاء متجر "${newStore.name}" بكود الدخول: ${newStore.code}`);
    
    addNotification('info', 'تسجيل متجر جديد', `انضم المتجر "${newStore.name}" إلى المنصة`, { storeId: newStore.id });
    return newStore;
  };

  const approveStore = (id: number) => {
    setStores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'active' } : s))
    );
    showToast('success', 'تم تفعيل المتجر', 'المتجر أصبح متاحاً الآن للعملاء');
  };

  const deleteStore = (id: number) => {
    const target = stores.find((s) => s.id === id);
    if (!target) return;
    setStores((prev) => prev.filter((s) => s.id !== id));
    setProducts((prev) => prev.filter((p) => p.storeId !== id));
    showToast('success', 'تم الحذف', `تم حذف متجر "${target.name}" ومنتجاته`);
  };

  const addNewProduct = (productData: Partial<Product>) => {
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 101;
    const currentStore = stores.find((s) => s.id === (currentUser.storeId || productData.storeId || 1));

    const newProd: Product = {
      id: newId,
      name: productData.name || 'منتج جديد',
      price: productData.price || 99,
      oldPrice: productData.oldPrice || null,
      store: currentStore?.name || 'محل الأناقة الفاخرة',
      storeId: currentStore?.id || 1,
      icon: productData.icon || '📦',
      badge: productData.badge || 'جديد',
      stock: productData.stock || 20,
      category: productData.category || currentStore?.category || 'أزياء',
      desc: productData.desc || 'منتج عالي الجودة معتمد من المتجر',
      rating: 5.0
    };

    setProducts((prev) => [newProd, ...prev]);
    setStores((prev) =>
      prev.map((s) => (s.id === newProd.storeId ? { ...s, products: s.products + 1 } : s))
    );
    setIsAddProductModalOpen(false);
    showToast('success', 'تمت إضافة المنتج', `تم إضافة "${newProd.name}" إلى متجرك`);
  };

  const deleteProduct = (id: number) => {
    const p = products.find((prod) => prod.id === id);
    if (!p) return;
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
    setStores((prev) =>
      prev.map((s) => (s.id === p.storeId ? { ...s, products: Math.max(0, s.products - 1) } : s))
    );
    showToast('success', 'تم حذف المنتج', `تم حذف "${p.name}"`);
  };

  const registerCraftsman = (craftsmanData: Partial<Craftsman>) => {
    const newId = craftsmen.length > 0 ? Math.max(...craftsmen.map((c) => c.id)) + 1 : 1;
    const newC: Craftsman = {
      id: newId,
      name: craftsmanData.name || 'حرفي جديد',
      avatar: craftsmanData.avatar || '👷‍♂️',
      profession: craftsmanData.profession || 'فني صيانة',
      city: craftsmanData.city || 'الرياض',
      phone: craftsmanData.phone || '05xxxxxxxx',
      whatsapp: craftsmanData.phone ? '966' + craftsmanData.phone.replace(/^0/, '') : '966500000000',
      bio: craftsmanData.bio || 'خبير فني متمرس ومستعد لتنفيذ جميع الطلبات بدقة.',
      experience: craftsmanData.experience || 5,
      mobility: craftsmanData.mobility ?? true,
      rating: 5.0,
      reviews: 1,
      jobs: 1,
      skills: craftsmanData.skills?.length ? craftsmanData.skills : [craftsmanData.profession || 'صيانة عامة'],
      gallery: ['🔧', '🛠️', '🧱', '📐', '⚙️', '🔨'],
      reviewsList: [
        {
          name: 'إدارة المنصة',
          avatar: '🛡️',
          rating: 5,
          date: 'اليوم',
          text: 'تم توثيق بيانات الحرفي والاعتماد الفني الأولي.'
        }
      ],
      verified: true,
      status: 'active'
    };

    setCraftsmen((prev) => [newC, ...prev]);
    setIsCraftsmanRegisterModalOpen(false);
    showToast('success', 'أهلاً بك كحرفي معتمد!', 'تم تسجيل حسابك بنجاح وملفك متاح الآن للعملاء');
    addNotification('service', 'تسجيل حرفي جديد', `انضم الحرفي ${newC.name} (${newC.profession}) في ${newC.city}`);
  };

  const approveCraftsman = (id: number) => {
    setCraftsmen((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: true, status: 'active' } : c))
    );
    showToast('success', 'تم اعتماد الحرفي', 'تم تفعيل الحساب وتوثيقه بنجاح');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    const statusLabels: Record<Order['status'], { label: string; desc: string }> = {
      pending: { label: 'بانتظار التأكيد', desc: 'تم استلام طلبك وجاري مراجعته من قبل إدارة المتجر' },
      processing: { label: 'قيد التجهيز والتغليف', desc: 'يقوم التاجر بتجهيز الطرد والتحقق من الجودة والضمان' },
      shipped: { label: 'خرج مع مندوب التوصيل', desc: 'الشحنة الآن في طريقها مع مندوب التوصيل السريع إلى عنوانك' },
      completed: { label: 'تم التوصيل بنجاح', desc: 'تم تسليم شحنتك للعميل بالكامل، شكراً لثقتكم في منصة فينك' },
      cancelled: { label: 'ملغي', desc: 'تم إلغاء هذا الطلب بناءً على رغبة العميل أو عدم توفر الكمية' }
    };

    const statusInfo = statusLabels[status] || { label: status, desc: 'تحديث حالة الطلب' };
    const orderNum = targetOrder ? targetOrder.orderNumber : 'ORD-2026';
    const orderWilaya = currentUser.wilaya || pushConfig.selectedWilaya || '57 - المغير';

    addNotification(
      'order',
      `تحديث الطلب #${orderNum} 📦`,
      `${statusInfo.label}: ${statusInfo.desc} (${orderWilaya})`,
      { orderId },
      orderWilaya,
      'تتبع الشحنة',
      currentUser.type === 'vendor' ? 'dashboard' : 'orders-tracking'
    );

    showToast('success', 'تم تحديث حالة الطلب', `أصبحت الحالة: ${statusInfo.label}`);
  };

  // Customer Actions: Reordering & Profile
  const reorderOrder = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder || targetOrder.items.length === 0) {
      showToast('error', 'تعذر إعادة الطلب', 'لم يتم العثور على منتجات هذا الطلب');
      return;
    }

    setCart((prev) => {
      const nextCart = [...prev];
      targetOrder.items.forEach((orderItem) => {
        const existingIndex = nextCart.findIndex((c) => c.id === orderItem.id);
        if (existingIndex > -1) {
          nextCart[existingIndex] = {
            ...nextCart[existingIndex],
            qty: nextCart[existingIndex].qty + (orderItem.qty || 1)
          };
        } else {
          nextCart.push({ ...orderItem, qty: orderItem.qty || 1 });
        }
      });
      return nextCart;
    });

    playSuccessSound(soundEnabled);
    showToast(
      'success',
      'تمت إضافة الأصناف إلى السلة',
      `تمت إضافة ${targetOrder.items.length} منتج من الطلب #${targetOrder.orderNumber} بنجاح`
    );
    setIsCartOpen(true);
  };

  const reorderSingleProduct = (product: Product) => {
    addToCart(product.id);
    setIsCartOpen(true);
  };

  const cancelOrder = (orderId: string): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    if (order.status === 'completed' || order.status === 'shipped') {
      showToast('error', 'لا يمكن الإلغاء', 'الطلب تم شحنه أو تسليمه بالفعل ولا يمكن إلغاؤه');
      return false;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
    );

    addNotification(
      'alert',
      `تم إلغاء الطلب #${order.orderNumber}`,
      `قام العميل بإلغاء الطلب بنجاح وتم تحويل حالته إلى ملغي`,
      { orderId }
    );

    showToast('info', 'تم إلغاء الطلب', `تم إلغاء طلبك #${order.orderNumber} بنجاح`);
    return true;
  };

  const updateCustomerProfile = (data: Partial<CurrentUser>) => {
    setCurrentUser((prev) => {
      const updated: CurrentUser = {
        ...prev,
        ...data,
        type: prev.type === 'guest' ? 'customer' : prev.type
      };
      return updated;
    });
    showToast('success', 'تم حفظ التعديلات', 'تم تحديث بيانات الملف الشخصي بنجاح');
  };

  const updatePlatformSettings = (newSettings: Partial<PlatformSettings>) => {
    setPlatformSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('success', 'تم الحفظ', 'تم تحديث إعدادات المنصة بنجاح');
  };

  // Live Chat
  const openChatWithCraftsman = (craftsman: Craftsman) => {
    setActiveChatCraftsman(craftsman);
    if (!chatMessages[craftsman.id]) {
      setChatMessages((prev) => ({
        ...prev,
        [craftsman.id]: [
          {
            id: 'init-' + Date.now(),
            sender: 'craftsman',
            text: `مرحباً بك! أنا ${craftsman.name} (${craftsman.profession}). كيف يمكنني خدمتك اليوم؟`,
            time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
            craftsmanId: craftsman.id
          }
        ]
      }));
    }
  };

  const closeChat = () => {
    setActiveChatCraftsman(null);
  };

  const sendChatMessage = (craftsmanId: number, text: string) => {
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      time,
      craftsmanId
    };

    setChatMessages((prev) => ({
      ...prev,
      [craftsmanId]: [...(prev[craftsmanId] || []), userMsg]
    }));

    playClickSound(soundEnabled);

    // Realistic auto-reply simulation from craftsman
    setTimeout(() => {
      const c = craftsmen.find((item) => item.id === craftsmanId);
      const responses = [
        `أهلاً وسهلاً، يسعدني خدمتك في ${c?.city || 'مدينتك'}. متى يناسبك المعاينة أو بدء العمل؟`,
        `تحت أمرك يا فندم! بخصوص هذا العمل، نستخدم أفضل الخامات ونعطي ضمان رسمي.`,
        `وصلت رسالتك! يمكنك أيضاً تصفح معرض أعمالي وسأقوم بتقديم تسعيرة ممتازة لك.`,
        `تمام، جاهز ومتاح للتنقل إليك. هل تفضل التواصل أيضاً عبر الواتساب؟`,
        `أشكرك على ثقتك، العمل سيتم بإشرافي المباشر وبأعلى دقة.`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const craftsmanReply: ChatMessage = {
        id: 'msg-reply-' + Date.now(),
        sender: 'craftsman',
        text: randomResponse,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        craftsmanId
      };

      setChatMessages((prev) => ({
        ...prev,
        [craftsmanId]: [...(prev[craftsmanId] || []), craftsmanReply]
      }));

      playSuccessSound(soundEnabled);
    }, 1800);
  };

  // Demo simulation order every 60 seconds if vendor/admin is logged in
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.65) {
        const randProduct = products[Math.floor(Math.random() * products.length)];
        const randCustomerNames = ['محمد الدوسري', 'سلطان القحطاني', 'نوف العتيبي', 'ريم الحربي', 'عبدالعزيز الغامدي'];
        const custName = randCustomerNames[Math.floor(Math.random() * randCustomerNames.length)];

        addNotification(
          'order',
          `طلب فوري جديد من ${custName}`,
          `تم طلب "${randProduct.name}" من ${randProduct.store} بقيمة ${randProduct.price} ر.س`,
          { productId: randProduct.id }
        );
      }
    }, 45000);
    return () => clearInterval(timer);
  }, [products]);

  return (
    <AppContext.Provider
      value={{
        page,
        navigateTo,
        selectedStoreId,
        selectedCraftsmanId,
        currentUser,
        loginAsVendor,
        loginAsAdmin,
        loginAsCustomer,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        stores,
        products,
        craftsmen,
        categories: INITIAL_CATEGORIES,
        orders,
        notifications,
        platformSettings,
        updatePlatformSettings,
        adminCredentials,
        updateAdminCredentials,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        checkout,
        favorites,
        toggleFavorite,
        isNotifOpen,
        setIsNotifOpen,
        unreadNotifsCount,
        addNotification,
        markNotifAsRead,
        clearAllNotifications,
        pushConfig,
        updatePushConfig,
        activePushToast,
        triggerPushNotification,
        dismissPushToast,
        requestBrowserNotificationPermission,
        triggerSimulatedOrderPush,
        triggerSimulatedWilayaOfferPush,
        triggerSimulatedCraftsmanPush,
        soundEnabled,
        toggleSound,
        toasts,
        showToast,
        removeToast,
        isAddStoreModalOpen,
        setIsAddStoreModalOpen,
        isAddProductModalOpen,
        setIsAddProductModalOpen,
        isCraftsmanRegisterModalOpen,
        setIsCraftsmanRegisterModalOpen,
        isOrderSuccessModalOpen,
        setIsOrderSuccessModalOpen,
        latestPlacedOrder,
        addNewStore,
        approveStore,
        deleteStore,
        addNewProduct,
        deleteProduct,
        registerCraftsman,
        approveCraftsman,
        updateOrderStatus,
        reorderOrder,
        reorderSingleProduct,
        cancelOrder,
        updateCustomerProfile,
        activeChatCraftsman,
        chatMessages,
        openChatWithCraftsman,
        closeChat,
        sendChatMessage,
        selectedWilaya,
        setSelectedWilaya,
        activeCategory,
        setActiveCategory,
        togglePushSubscription,
        vipPlans: VIP_PLANS,
        vipRequests,
        isVipModalOpen,
        setIsVipModalOpen,
        submitVipSubscription,
        approveVipRequest,
        rejectVipRequest,
        revokeVip
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
