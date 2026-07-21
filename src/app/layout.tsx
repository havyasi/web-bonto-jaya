import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Website Resmi & Peta Digital UMKM Desa Bonto Jaya',
  description: 'Portal resmi informasi pemerintahan, pelayanan administrasi warga, dan peta etalase digital UMKM Desa Bonto Jaya, Kecamatan Bissappu, Kabupaten Bantaeng.',
  keywords: ['Desa Bonto Jaya', 'Peta Digital UMKM', 'Portal Desa', 'Bantaeng', 'Pelayanan Desa', 'Bissappu'],
  authors: [{ name: 'Ananta Waskita Gisda' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
