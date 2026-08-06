import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const TermsPage: React.FC = () => (
  <div className="container-narrow py-12 space-y-8">
    <div className="space-y-2">
      <Badge variant="purple">Legal</Badge>
      <h1 className="text-3xl font-bold font-display text-white">Syarat & Ketentuan Layanan</h1>
      <p className="text-xs text-slate-400">Terakhir diperbarui: 1 Maret 2026</p>
    </div>

    <Card className="space-y-6 text-xs text-slate-300 leading-relaxed">
      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">1. Ketentuan Umum</h2>
        <p>Dengan mengakses dan menggunakan platform BRaft.Dev (Marketplace & Agency), Anda menyetujui seluruh ketentuan layanan yang tercantum dalam dokumen ini.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">2. Akun Pengguna</h2>
        <p>Setiap pengguna bertanggung jawab penuh atas kerahasiaan informasi akun, password, serta seluruh aktivitas transaksi yang dilakukan melalui akun tersebut.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-white uppercase">3. Transaksi & Hak Cipta Template</h2>
        <p>Setiap pembelian template di marketplace memberikan lisensi penggunaan sesuai jenis lisensi yang dipilih (Personal, Commercial, atau Extended). Pembeli dilarang mendistribusikan ulang atau menjual kembali source code template secara ilegal.</p>
      </section>
    </Card>
  </div>
);
