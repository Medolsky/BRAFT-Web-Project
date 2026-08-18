export interface Consultant {
  id: string;
  name: string;
  handle: string;
  fullName: string;
  role: string;
  phone: string;
  waNumber: string;
  email: string;
  color: 'purple' | 'cyan';
  status: string;
}

export const CONSULTANTS: Consultant[] = [
  {
    id: 'rapi',
    name: 'Rapi',
    handle: 'ItzMeRapz',
    fullName: 'ItzMeRapz (Rapi)',
    role: 'Lead Architect & Senior Tech Consultant',
    phone: '085155102077',
    waNumber: '6285155102077',
    email: 'softwarerapi14@gmail.com',
    color: 'purple',
    status: 'Online',
  },
  {
    id: 'ikhwan',
    name: 'Ikhwan',
    handle: 'Boysam',
    fullName: 'Boysam (Ikhwan)',
    role: 'Project Manager & Client Solution Specialist',
    phone: '0895414739150',
    waNumber: '62895414739150',
    email: 'ikhwanmuarif71@gmail.com',
    color: 'cyan',
    status: 'Online',
  },
];

export const getWhatsAppLink = (waNumber: string, message?: string) => {
  const defaultMsg = 'Halo BRaft.Dev! Saya ingin berkonsultasi mengenai project website custom / template.';
  const encoded = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${waNumber}?text=${encoded}`;
};

export const getGmailLink = (email: string, subject?: string, body?: string) => {
  const defaultSubject = 'Konsultasi Proyek Website — BRaft.Dev';
  const defaultBody = 'Halo,\n\nSaya ingin berkonsultasi mengenai pembuatan website / template di BRaft.Dev.\n\nDetail kebutuhan:\n';
  return `mailto:${email}?subject=${encodeURIComponent(subject || defaultSubject)}&body=${encodeURIComponent(body || defaultBody)}`;
};
