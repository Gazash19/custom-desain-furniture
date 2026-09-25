'use client';

import { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  Calendar, 
  FileText, 
  X,
  CheckCircle,
  Clock,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface Inquiry {
  id: string;
  clientName: string;
  clientWhatsapp: string;
  furnitureType: string;
  deliverablesNeeded: string;
  notesConcept: string | null;
  agreedFee: string | null;
  status: string;
  createdAt: string;
}

export default function InquiriesTable() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error('Gagal mengambil data inquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Gagal mengupdate status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = 
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.furnitureType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientWhatsapp.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'deal':
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Deal / Selesai</span>;
      case 'in_design':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-[#337ab7]">Sedang Didesain</span>;
      case 'in_discussion':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Diskusi / Nego</span>;
      case 'lead_in':
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Permintaan Baru</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama klien, furniture, no WA..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#337ab7] focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Filter & Refresh */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'lead_in', label: 'Baru' },
              { id: 'in_discussion', label: 'Diskusi' },
              { id: 'in_design', label: 'Didesain' },
              { id: 'deal', label: 'Deal' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === tab.id
                    ? 'bg-[#337ab7] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors disabled:opacity-50"
            title="Muat Ulang Data"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-[#337ab7]' : ''} />
          </button>
        </div>
      </div>

      {/* Main List Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400 space-y-3">
            <RefreshCw size={28} className="animate-spin text-[#337ab7] mx-auto" />
            <p className="text-sm font-medium">Memuat data permintaan dari Supabase...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center px-4">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={26} />
            </div>
            <h3 className="text-base font-semibold text-slate-700">Tidak ada permintaan ditemukan</h3>
            <p className="text-sm text-slate-400 mt-1">
              {searchTerm || filterStatus !== 'all' 
                ? 'Coba ganti filter atau kata kunci pencarian Anda.' 
                : 'Belum ada formulir brief yang dikirimkan calon klien.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table (Hidden on Mobile) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Klien</th>
                    <th className="py-4 px-6">Item Furniture</th>
                    <th className="py-4 px-6">Output Desain</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Tanggal</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredInquiries.map((inquiry) => {
                    const cleanWa = inquiry.clientWhatsapp.replace(/[^0-9]/g, '');
                    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(`Halo ${inquiry.clientName}, terima kasih sudah menghubungi Jepara 3D Studio mengenai kebutuhan desain ${inquiry.furnitureType}.`)}`;
                    const dateFormatted = inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : '-';

                    return (
                      <tr key={inquiry.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-slate-900">{inquiry.clientName}</p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{inquiry.clientWhatsapp}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-[#337ab7]">{inquiry.furnitureType}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-xs">
                          {inquiry.deliverablesNeeded}
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={inquiry.status}
                            disabled={updatingId === inquiry.id}
                            onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                            className="text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-[#337ab7] cursor-pointer"
                          >
                            <option value="lead_in">Permintaan Baru</option>
                            <option value="in_discussion">Diskusi / Nego</option>
                            <option value="in_design">Sedang Didesain</option>
                            <option value="deal">Deal / Selesai</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">
                          {dateFormatted}
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            Detail
                          </button>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                          >
                            <PhoneCall size={13} />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards (Visible on < lg screens) */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredInquiries.map((inquiry) => {
                const cleanWa = inquiry.clientWhatsapp.replace(/[^0-9]/g, '');
                const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(`Halo ${inquiry.clientName}, terima kasih sudah menghubungi Jepara 3D Studio mengenai kebutuhan desain ${inquiry.furnitureType}.`)}`;
                const dateFormatted = inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                }) : '-';

                return (
                  <div key={inquiry.id} className="p-4 space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{inquiry.clientName}</h4>
                        <p className="text-xs text-slate-500 font-mono">{inquiry.clientWhatsapp}</p>
                      </div>
                      {getStatusBadge(inquiry.status)}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1 border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Furniture:</span>
                        <span className="font-semibold text-[#337ab7]">{inquiry.furnitureType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Output:</span>
                        <span className="font-medium text-slate-700">{inquiry.deliverablesNeeded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tanggal:</span>
                        <span className="text-slate-500">{dateFormatted}</span>
                      </div>
                    </div>

                    {inquiry.notesConcept && (
                      <p className="text-xs text-slate-600 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50">
                        &quot;{inquiry.notesConcept}&quot;
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <select
                        value={inquiry.status}
                        disabled={updatingId === inquiry.id}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className="text-xs font-medium rounded-lg px-2.5 py-2 border border-slate-200 bg-white text-slate-700 flex-1"
                      >
                        <option value="lead_in">Status: Permintaan Baru</option>
                        <option value="in_discussion">Status: Diskusi / Nego</option>
                        <option value="in_design">Status: Sedang Didesain</option>
                        <option value="deal">Status: Deal / Selesai</option>
                      </select>

                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        Detail
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700"
                        title="Chat WA"
                      >
                        <PhoneCall size={16} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Modal Detail Inquiry */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-[#337ab7]" size={20} />
                <h3 className="font-bold text-slate-900 text-lg">Rincian Brief Klien</h3>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Nama Klien</p>
                  <p className="font-semibold text-slate-900 text-base">{selectedInquiry.clientName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Nomor WhatsApp</p>
                  <p className="font-semibold text-emerald-700 font-mono">{selectedInquiry.clientWhatsapp}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Item Furniture</p>
                  <p className="font-semibold text-[#337ab7]">{selectedInquiry.furnitureType}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Kebutuhan Output</p>
                  <p className="font-medium text-slate-700">{selectedInquiry.deliverablesNeeded}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Catatan & Konsep Desain</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700 text-sm whitespace-pre-wrap min-h-[90px]">
                  {selectedInquiry.notesConcept || 'Tidak ada catatan tambahan yang dituliskan klien.'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-slate-500 mr-2">Status Saat Ini:</span>
                  {getStatusBadge(selectedInquiry.status)}
                </div>
                <div className="text-xs text-slate-400">
                  ID: {selectedInquiry.id.slice(0, 8)}...
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Tutup
              </button>
              <a
                href={`https://wa.me/${selectedInquiry.clientWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${selectedInquiry.clientName}, kami dari Jepara 3D Studio ingin menindaklanjuti brief desain ${selectedInquiry.furnitureType}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs"
              >
                <PhoneCall size={14} />
                <span>Buka WhatsApp Klien</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
