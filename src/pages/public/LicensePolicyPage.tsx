import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const LicensePolicyPage: React.FC = () => (
  <div className="container-narrow py-12 space-y-8">
    <div className="space-y-2">
      <Badge variant="purple">Legal</Badge>
      <h1 className="text-3xl font-bold font-display text-white">Kebijakan Lisensi Template</h1>
      <p className="text-xs text-slate-400">Terakhir diperbarui: 1 Maret 2026</p>
    </div>

    <Card className="space-y-6 text-xs text-slate-300 leading-relaxed">
      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">1. Lisensi Personal</h2>
        <p>Berlaku untuk 1 (satu) situs proyek pribadi atau non-komersial tanpa monetization langsung.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">2. Lisensi Komersial</h2>
        <p>Berlaku untuk 1 (satu) situs komersial atau proyek klien berbayar.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">3. Lisensi Extended</h2>
        <p>Berlaku untuk pembuatan produk komersial SaaS / aplikasi yang dijual kembali kepada pihak ketiga.</p>
      </section>
    </Card>
  </div>
);
