import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  FileText,
  Code,
  Rocket,
  Search,
  Eye,
  CreditCard,
  Download,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { FadeIn, HoverScale } from '../ui/motion';

export const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'service' | 'template'>('service');

  const serviceSteps = [
    { number: '01', icon: MessageSquare, title: t('howItWorks.service.step1'), desc: t('howItWorks.service.step1Desc') },
    { number: '02', icon: FileText, title: t('howItWorks.service.step2'), desc: t('howItWorks.service.step2Desc') },
    { number: '03', icon: Code, title: t('howItWorks.service.step3'), desc: t('howItWorks.service.step3Desc') },
    { number: '04', icon: Rocket, title: t('howItWorks.service.step4'), desc: t('howItWorks.service.step4Desc') },
  ];

  const templateSteps = [
    { number: '01', icon: Search, title: t('howItWorks.template.step1'), desc: t('howItWorks.template.step1Desc') },
    { number: '02', icon: Eye, title: t('howItWorks.template.step2'), desc: t('howItWorks.template.step2Desc') },
    { number: '03', icon: CreditCard, title: t('howItWorks.template.step3'), desc: t('howItWorks.template.step3Desc') },
    { number: '04', icon: Download, title: t('howItWorks.template.step4'), desc: t('howItWorks.template.step4Desc') },
  ];

  const steps = activeTab === 'service' ? serviceSteps : templateSteps;

  return (
    <section className="section-padding relative">
      <div className="container-main space-y-12">
        {/* Header */}
        <FadeIn className="text-center space-y-4">
          <Badge variant="purple">{t('howItWorks.title')}</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">
            Proses <em className="font-serif-italic text-purple-400 font-normal">Sederhana</em> & Transparan
          </h2>

          {/* Clean Flex Tab Switcher */}
          <div className="inline-flex p-1 bg-zinc-950 border border-white/10 rounded-full gap-1">
            <button
              onClick={() => setActiveTab('service')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'service'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t('howItWorks.service.title')}
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'template'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t('howItWorks.template.title')}
            </button>
          </div>
        </FadeIn>

        {/* Steps Grid — animates on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <HoverScale key={index}>
                  <Card className="relative p-6 group h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-extrabold font-display text-purple-500/30 group-hover:text-purple-400 transition-colors duration-300">
                          {step.number}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </HoverScale>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowItWorks;
