import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const PrivacyPage: React.FC = () => (
  <div className="container-narrow py-12 space-y-8">
    <div className="space-y-2">
      <Badge variant="purple">Legal</Badge>
      <h1 className="text-3xl font-bold font-display text-white">Kebijakan Privasi</h1>
      <p className="text-xs text-slate-400">Terakhir diperbarui: 1 Maret 2026</p>
    </div>

    <Card className="space-y-6 text-xs text-slate-300 leading-relaxed">
      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">1. Pengumpulan Data</h2>
        <p>Kami mengumpulkan data informasi pribadi Anda seperti Nama, Email, Nomor Telepon, dan data Billing hanya untuk keperluan proses transaksi, verifikasi akun, dan layanan komunikasi.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">2. Keamanan Data</h2>
        <p>BRaft.Dev menerapkan enkripsi standar industri dan tidak akan pernah menjual atau memberikan data pribadi pengguna kepada pihak ketiga tanpa persetujuan Anda.</p>
      </section>
    </Card>
  </div>
);
