import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { t } = useTranslation();
  const { isCartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, removeItem, getTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-950 border-l border-slate-800 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-900 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-400" />
                  <h3 className="font-bold text-white font-display">
                    {t('nav.cart')} ({items.length})
                  </h3>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-slate-400 text-sm">Keranjang Anda masih kosong</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCartDrawerOpen(false)}
                  >
                    {t('nav.explore')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-3"
                    >
                      <div className="w-16 h-12 bg-zinc-950 border border-white/10 rounded-lg flex items-center justify-center p-1 shrink-0">
                        <img
                          src={item.template.thumbnailUrl}
                          alt={item.template.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.template.name}
                        </h4>
                        <p className="text-[10px] text-purple-400 capitalize">
                          {item.licenseType} License
                        </p>
                        <p className="text-xs font-bold text-slate-200 mt-0.5">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="pt-4 border-t border-slate-900 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total</span>
                  <span className="font-bold text-white text-base">
                    Rp {getTotal().toLocaleString('id-ID')}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
