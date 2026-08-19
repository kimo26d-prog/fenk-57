export interface Store {
  id: number;
  name: string;
  icon: string;
  category: string;
  rating: number;
  products: number;
  reviews: number;
  desc: string;
  phone?: string;
  email?: string;
  status: 'active' | 'pending';
  code: string;
  bannerColor?: string;
  featured?: boolean;
  wilaya?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  store: string;
  storeId: number;
  icon: string;
  badge?: string | null;
  stock?: number;
  category?: string;
  desc?: string;
  rating?: number;
}

export interface Category {
  name: string;
  icon: string;
  count: string;
}

export interface CraftsmanReviewItem {
  id?: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Craftsman {
  id: number;
  name: string;
  avatar: string;
  profession: string;
  city: string;
  phone: string;
  bio: string;
  experience: number;
  mobility: boolean;
  rating: number;
  reviews: number;
  jobs: number;
  skills: string[];
  gallery: string[];
  reviewsList: CraftsmanReviewItem[];
  verified?: boolean;
  status?: 'active' | 'pending';
  whatsapp?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  storeIds: number[];
  paymentMethod?: 'cod' | 'card' | 'applepay';
  trackingNote?: string;
}

export interface PushNotificationConfig {
  enabled: boolean;
  selectedWilaya: string;
  orderUpdates: boolean;
  wilayaOffers: boolean;
  newCraftsmenAlerts: boolean;
  soundAlerts: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'success' | 'alert' | 'info' | 'service' | 'offer' | 'wilaya_deal';
  title: string;
  message: string;
  time: string;
  read: boolean;
  wilaya?: string;
  orderId?: string;
  storeId?: number;
  craftsmanId?: number;
  actionUrl?: string;
  actionLabel?: string;
  data?: any;
}

export interface PushNotificationToastItem {
  id: string;
  type: NotificationItem['type'];
  title: string;
  message: string;
  wilaya?: string;
  actionLabel?: string;
  actionPage?: PageView;
  actionParams?: { storeId?: number; craftsmanId?: number };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'craftsman' | 'system';
  text: string;
  time: string;
  craftsmanId: number;
}

export type UserRole = 'guest' | 'customer' | 'vendor' | 'admin';

export interface CurrentUser {
  type: UserRole;
  name: string;
  storeId?: number;
  storeName?: string;
  email?: string;
  phone?: string;
  city?: string;
  wilaya?: string;
  address?: string;
  memberSince?: string;
}

export interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  commissionRate: number;
  deliveryFee: number;
  primaryColor: string;
  accentColor: string;
  autoApproveStores: boolean;
  emergencyPhone: string;
  location: string;
  country?: string;
  currency?: string;
}

export type PageView =
  | 'home'
  | 'map'
  | 'stores'
  | 'store-detail'
  | 'products'
  | 'craftsmen'
  | 'craftsman-profile'
  | 'dashboard'
  | 'admin'
  | 'profile'
  | 'orders-tracking';
