import AdminShell from '@/components/admin/AdminShell';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dasbor Admin | Jepara 3D Studio',
  description: 'Kelola portofolio dan permintaan desain untuk Jepara 3D Design Studio',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
