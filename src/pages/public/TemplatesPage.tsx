import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Eye, ShoppingCart } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useDataStore } from '../../stores/dataStore';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Rating } from '../../components/ui/Rating';
import { Modal } from '../../components/ui/Modal';
import { useCartStore } from '../../stores/cartStore';
import { LicenseType, Template } from '../../types';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../../components/ui/motion';
import toast from 'react-hot-toast';

export const TemplatesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('personal');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const templates = useDataStore((s) => s.templates);
  const categories = useDataStore((s) => s.categories);

  const publishedTemplates = templates.filter(t => t.status === 'published');

  const filteredTemplates = publishedTemplates.filter((tpl) => {
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tpl.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenPreview = (tpl: Template) => {
    setSelectedTemplate(tpl);
    setIsPreviewModalOpen(true);
  };

  const handleAddToCart = (tpl: Template, license: LicenseType = 'personal') => {
    addItem(tpl, license);
    toast.success(`${tpl.name} (${license} license) ditambahkan ke keranjang!`);
  };

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Header */}
      <FadeIn className="text-center w-full max-w-3xl mx-auto container-main space-y-4">
        <Badge variant="orange">Template Marketplace</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">
          Template Website Ready-to-Use <em className="font-serif-italic text-cyan-400 font-normal">Kualitas Terjamin</em>
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Temukan source code & UI Kit siap pakai dari creator terverifikasi. Dilengkapi lisensi resmi & dokumentasi lengkap.
        </p>
      </FadeIn>

      {/* Filter & Search Toolbar */}
      <section className="container-main space-y-6">
        <FadeIn delay={0.15}>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between bg-zinc-950/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            {/* Search Input */}
            <div className="w-full md:w-96">
              <Input
                placeholder="Cari template (e.g. Agency, SaaS, E-Commerce...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-zinc-400" />}
              />
            </div>

            {/* Category Pill Filters — 21st.dev style */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`chip-21st cursor-pointer ${selectedCategory === 'all' ? 'chip-21st-active' : ''}`}
              >
                Semua ({publishedTemplates.length})
              </button>
              {categories.map((cat) => {
                const count = publishedTemplates.filter((t) => t.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`chip-21st cursor-pointer ${selectedCategory === cat.id ? 'chip-21st-active' : ''}`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Templates Grid with Animation */}
        <AnimatePresence mode="wait">
          <StaggerContainer key={selectedCategory + searchQuery} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <StaggerItem key={template.id}>
                <HoverScale>
                  <Card className="p-0 overflow-hidden group flex flex-col justify-between h-full border-white/10 hover:border-purple-500/40">
                    {/* Thumbnail & Quick Actions */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 flex items-center justify-center p-6 border-b border-white/5">
                      <img
                        src={template.thumbnailUrl}
                        alt={template.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out filter drop-shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                      />
                      <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenPreview(template)}
                          leftIcon={<Eye className="w-4 h-4" />}
                        >
                          Quick View
                        </Button>
                        <a href={template.demoUrl} target="_blank" rel="noreferrer">
                          <Button variant="primary" size="sm">
                            Live Demo
                          </Button>
                        </a>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Rating value={template.rating} count={template.reviewCount} size="sm" />
                          <span className="text-[11px] text-zinc-400 font-medium">
                            {template.salesCount} {t('templates.sales')}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
                          {template.name}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{template.shortDescription}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {template.technology.map((tech, i) => (
                          <Badge key={i} variant="slate" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-zinc-500 block">Harga Template</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-base font-extrabold text-purple-400">
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(template.discountPrice || template.price)}
                            </span>
                            {template.discountPrice && (
                              <span className="text-xs text-zinc-500 line-through">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(template.price)}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleOpenPreview(template)}
                        >
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  </Card>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatePresence>
      </section>

      {/* Quick Preview Modal */}
      {selectedTemplate && (
        <Modal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} title={selectedTemplate.name} maxWidth="xl">
          <div className="space-y-6 text-left">
            <div className="w-full h-64 bg-zinc-950 flex items-center justify-center p-8 rounded-xl border border-white/10">
              <img src={selectedTemplate.thumbnailUrl} alt={selectedTemplate.name} className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]" />
            </div>
            
            <p className="text-xs text-zinc-300 leading-relaxed">{selectedTemplate.description}</p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pilih Lisensi Penggunaan:</h4>
              <div className="grid grid-cols-3 gap-3">
                {(['personal', 'commercial', 'extended'] as LicenseType[]).map((lic) => (
                  <button
                    key={lic}
                    onClick={() => setSelectedLicense(lic)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedLicense === lic ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-zinc-950'
                    }`}
                  >
                    <span className="text-xs font-bold text-white uppercase block">{lic}</span>
                    <span className="text-xs font-semibold text-purple-400 mt-1 block">
                      Tanya Admin
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <a href={selectedTemplate.demoUrl} target="_blank" rel="noreferrer" className="flex-1">
                <Button variant="secondary" className="w-full" leftIcon={<Eye className="w-4 h-4" />}>
                  {t('templates.livePreview')}
                </Button>
              </a>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  handleAddToCart(selectedTemplate, selectedLicense);
                  setIsPreviewModalOpen(false);
                }}
                leftIcon={<ShoppingCart className="w-4 h-4" />}
              >
                {t('templates.addToCart')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
