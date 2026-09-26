'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('from') || '/admin/portfolio';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Harap masukkan username dan kata sandi.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Berhasil login, arahkan ke halaman admin yang dituju
        router.push(redirectTarget);
        router.refresh();
      } else {
        setErrorMsg(data.error || 'Username atau kata sandi salah. Silakan coba kembali.');
      }
    } catch (err) {
      console.error('Error login:', err);
      setErrorMsg('Gagal terhubung ke server. Periksa koneksi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200/80 shadow-2xl p-8 sm:p-10 relative z-10 space-y-7">
        
        {/* Brand & Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-[11px] font-semibold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-amber-700" />
            <span>Akses Khusus Pengelola</span>
          </div>

          <div>
            <h1 className="font-serif text-3xl text-stone-900 font-normal tracking-tight">
              PAPO<span className="font-sans font-bold text-amber-800">3D</span>
            </h1>
            <p className="text-stone-500 text-xs mt-1 font-light">
              Panel Pengelolaan Portofolio & Desain Furniture
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 text-xs text-stone-600 flex items-start gap-2.5">
          <Lock size={16} className="text-amber-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-light">
            Halaman ini dilindungi otentikasi pengelola. Masukkan <strong>Username</strong> dan <strong>Kata Sandi</strong> untuk mengelola katalog karya.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in duration-200">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="admin-username" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Username Admin
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <User size={17} />
              </span>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                autoFocus
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#faf8f5] border border-stone-300 focus:border-amber-700 focus:bg-white focus:outline-hidden text-sm text-stone-900 placeholder:text-stone-400 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="admin-password" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Lock size={17} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full pl-10 pr-11 py-3.5 rounded-2xl bg-[#faf8f5] border border-stone-300 focus:border-amber-700 focus:bg-white focus:outline-hidden text-sm text-stone-900 placeholder:text-stone-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Memverifikasi...</span>
                </span>
              ) : (
                <>
                  <span>Masuk ke Panel Admin</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back Link */}
        <div className="pt-2 text-center border-t border-stone-100">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Website Depan</span>
          </Link>
        </div>

      </div>

      {/* Footer subtle text */}
      <p className="mt-8 text-xs text-stone-400 font-light text-center">
        © {new Date().getFullYear()} PAPO3D Studio. Seluruh hak cipta dilindungi.
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-amber-800 rounded-full animate-spin"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
