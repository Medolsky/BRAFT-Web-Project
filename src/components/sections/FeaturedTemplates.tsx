import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { Template } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { useCartStore } from '../../stores/cartStore';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../ui/motion';
import toast from 'react-hot-toast';

export const FeaturedTemplates: React.FC = () => {
  const { t } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const templates = useDataStore((s) => s.templates);

  const handleAddToCart = (template: Template) => {
    addItem(template, 'personal');
    toast.success(`${template.name} ditambahkan ke keranjang!`);
  };

  return (
    <section className="section-padding bg-zinc-950/50 relative border-y border-white/10">
      <div className="container-main space-y-12">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge variant="orange" className="mb-3">
                {t('templates.title')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">
                Template <em className="font-serif-italic text-cyan-400 font-normal">Siap Pakai</em> untuk Proyek Anda
              </h2>
            </div>
            <Link to="/templates">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('nav.explore')}
              </Button>
            </Link>
          </div>
        </FadeIn>

        {/* Templates Grid — staggered */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.filter(t => t.status === 'published').map((template) => (
            <StaggerItem key={template.id}>
              <HoverScale>
                <Card className="p-0 overflow-hidden group flex flex-col justify-between h-full">
                  {/* Image & Quick Action Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 flex items-center justify-center p-6 border-b border-white/5">
                    <img
                      src={template.thumbnailUrl}
                      alt={template.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out filter drop-shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                    />
                    <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                      <a
                        href={template.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-200 shadow-lg transform translate-y-2 group-hover:translate-y-0"
                        title="Live Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleAddToCart(template)}
                        className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all duration-200 shadow-lg shadow-purple-500/30 transform translate-y-2 group-hover:translate-y-0"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                    {template.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-zinc-300">
                        {template.category.name}
                      </span>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <Rating value={template.rating} count={template.reviewCount} size="sm" />
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {template.salesCount} {t('templates.sales')}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-purple-400 transition-colors duration-300">
                        {template.name}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                        {template.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                          Harga Template
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-extrabold text-purple-400">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(template.discountPrice || template.price)}
                          </span>
                          {template.discountPrice && (
                            <span className="text-[10px] text-zinc-500 line-through">
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(template.price)}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link to={`/templates/${template.id}`}>
                        <Button
                          size="sm"
                          variant="primary"
                          className="text-xs px-3.5 py-1.5 font-bold shadow-md shadow-purple-500/20"
                        >
                          Beli Template
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
