import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const RefundPolicyPage: React.FC = () => (
  <div className="container-narrow py-12 space-y-8">
    <div className="space-y-2">
      <Badge variant="purple">Legal</Badge>
      <h1 className="text-3xl font-bold font-display text-white">Kebijakan Refund</h1>
      <p className="text-xs text-slate-400">Terakhir diperbarui: 1 Maret 2026</p>
    </div>

    <Card className="space-y-6 text-xs text-slate-300 leading-relaxed">
      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">1. Pengembalian Dana Digital Product</h2>
        <p>Karena sifat produk digital (source code template) yang dapat langsung diunduh, pengembalian dana hanya berlaku jika file template rusak/corrupt dan tim support kami gagal memperbaiki isu tersebut dalam kurun waktu 7 hari kerja.</p>
      </section>
    </Card>
  </div>
);
