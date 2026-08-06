import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Template, LicenseType } from '../types';

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountPercentage: number;
  addItem: (template: Template, licenseType: LicenseType) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountPercentage: 0,
      addItem: (template, licenseType) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (i) => i.templateId === template.id && i.licenseType === licenseType
        );

        if (existingIndex > -1) {
          return; // Item already in cart
        }

        const price = template.licenseOptions[licenseType] || template.price;
        const newItem: CartItem = {
          id: `${template.id}-${licenseType}-${Date.now()}`,
          templateId: template.id,
          template,
          licenseType,
          price,
        };

        set({ items: [...items, newItem] });
      },
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set({ items: [], couponCode: null, discountPercentage: 0 }),
      applyCoupon: (code, discount) =>
        set({ couponCode: code, discountPercentage: discount }),
      removeCoupon: () => set({ couponCode: null, discountPercentage: 0 }),
      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price, 0),
      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPercentage) / 100;
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        return Math.max(0, subtotal - discount);
      },
    }),
    {
      name: 'webcraft-cart',
    }
  )
);
