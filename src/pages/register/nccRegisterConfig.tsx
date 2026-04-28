// ================================================================
// nccRegisterConfig.tsx — NCC Registration Config
// Single source of truth: types, constants, submit logic, UI helpers
// Disesuaikan dengan YICC Guidebook (versi Nasional / NCC)
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── GAS Endpoint ─────────────────────────────────────────────────
export const NCC_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyR5h25ll0eDrld-0IcSzflrtMx501Je9kfuq3BS_t6aMqHzExp6IuAJoIMjX6W6GaE/exec";

// ── Types ─────────────────────────────────────────────────────────
export type CompetitionType = "online" | "offline";
export type FormData        = Record<string, string>;

// ── Competition Categories (sesuai guidebook YICC, 4 kategori) ───
export const COMPETITION_CATEGORIES = [
  "A — Traditional / Cultural-Based Dance Solo",
  "B — Traditional / Cultural-Based Dance Group",
  "C — Ethnic / Cultural Creative Costume Show",
  "D — Traditional Song Solo",
];

// ── Participant Divisions (sesuai guidebook) ──────────────────────
export const PARTICIPANT_DIVISIONS = [
  "Elementary (Age 7–12)",
  "Junior High (Age 13–15)",
  "Senior High (Age 16–18)",
  "Open Division (University / Community / Sanggar)",
];

// ── Traditional Song List untuk Kategori D (domestic) ────────────
export const TRADITIONAL_SONGS = [
  "Soleram — Riau",
  "Jali-Jali — Betawi / DKI Jakarta",
  "Gambang Suling — Jawa Tengah",
  "Cublak-Cublak Suweng — Jawa",
  "Kampuang Nan Jauh di Mato — Sumatera Barat",
  "Ampar-Ampar Pisang — Kalimantan Selatan",
  "O Ina Ni Keke — Sulawesi Utara",
  "Cik Cik Periuk — Kalimantan Barat",
  "Lagu Pilihan Lainnya (sebutkan di deskripsi)",
];

// ── Required fields for form validation ──────────────────────────
export const REQUIRED_FIELDS: string[] = [
  "NAMA_LENGKAP",
  "LEADER_WHATSAPP",
  "LEADER_EMAIL",
  "NAMA_SEKOLAH",
  "DIVISION",
  "NAME_SUPERVISOR",
  "WHATSAPP_NUMBER_SUPERVISOR",
  "EMAIL_SUPERVISOR",
  "COMPETITION_CATEGORY",
  "PERFORMANCE_TITLE",
  "CULTURAL_ORIGIN",
  "COMPLETE_ADDRESS",
];

// ── Terms & Conditions (sesuai guidebook YICC) ────────────────────
export const TERMS: Record<CompetitionType, string[]> = {
  online: [
    "Semua data yang telah dikirimkan tidak dapat diubah setelah batas waktu pendaftaran. Harap periksa kembali sebelum mengirim.",
    "Peserta wajib memastikan koneksi internet yang stabil selama sesi presentasi / penilaian online.",
    "Semua dokumen penampilan yang diperlukan wajib dikirimkan paling lambat H-14 sebelum acara (file musik, deskripsi penampilan, deklarasi properti jika ada).",
    "Penampilan yang dikirimkan harus orisinal dan otentik secara budaya. Plagiarisme atau penyajian yang tidak sesuai akan mengakibatkan diskualifikasi tanpa pengembalian biaya.",
    "Semua keputusan juri bersifat final dan tidak dapat diganggu gugat.",
    "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apapun.",
  ],
  offline: [
    "Semua data yang telah dikirimkan tidak dapat diubah setelah batas waktu pendaftaran. Harap periksa kembali sebelum mengirim.",
    "Semua dokumen penampilan yang diperlukan wajib dikirimkan paling lambat H-14 sebelum acara.",
    "Peserta wajib membawa seluruh properti penampilan ke venue. Properti yang dilarang antara lain: api, asap, cairan, senjata tajam, kaca, bahan berbahaya, hewan hidup, confetti, glitter, atau benda apapun yang dapat merusak panggung.",
    "Peserta wajib menghadiri sesi gladi resik teknis sesuai jadwal yang telah ditentukan.",
    "Kostum harus tetap sesuai untuk kompetisi budaya publik. Penampilan tidak boleh mengandung ujaran kebencian, konten SARA, kekerasan, atau materi yang tidak pantas.",
    "Plagiarisme atau penyajian yang tidak sesuai akan mengakibatkan diskualifikasi tanpa pengembalian biaya.",
    "Peserta wajib mengikuti seluruh rangkaian kegiatan sesuai jadwal yang telah ditetapkan.",
    "Semua keputusan juri bersifat final dan tidak dapat diganggu gugat.",
    "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apapun.",
  ],
};

// ── Submit to GAS ─────────────────────────────────────────────────
export const submitToNccSheet = async (
  competition: CompetitionType,
  form: FormData,
): Promise<void> => {
  const f = (key: string) => form[key] ?? "";

  const payload: Record<string, string> = {
    sheetTarget:                `ncc-${competition}`,
    timestamp:                  new Date().toISOString(),
    CATEGORY_COMPETITION:       competition,
    NAMA_LENGKAP:               f("NAMA_LENGKAP"),
    LEADER_WHATSAPP:            f("LEADER_WHATSAPP"),
    LEADER_EMAIL:               f("LEADER_EMAIL"),
    NAMA_SEKOLAH:               f("NAMA_SEKOLAH"),
    DIVISION:                   f("DIVISION"),
    PROVINCE:                   f("PROVINCE"),
    NAME_SUPERVISOR:            f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR: f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_SUPERVISOR:           f("EMAIL_SUPERVISOR"),
    COMPETITION_CATEGORY:       f("COMPETITION_CATEGORY"),
    PERFORMANCE_TITLE:          f("PERFORMANCE_TITLE"),
    CULTURAL_ORIGIN:            f("CULTURAL_ORIGIN"),
    PERFORMANCE_DESCRIPTION:    f("PERFORMANCE_DESCRIPTION"),
    MEMBER_COUNT:               f("MEMBER_COUNT"),
    SONG_SELECTION:             f("SONG_SELECTION"),
    DRIVE_LINK:                 f("DRIVE_LINK"),
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    FILE:                       f("FILE"),
  };

  const url = `${NCC_SHEET_URL}?${new URLSearchParams(payload).toString()}`;

  try {
    await fetch(url, { method: "GET", mode: "no-cors" });
  } catch (e) {
    console.error("[NCC submit] fetch failed:", e);
    throw e;
  }
};

// ── Reusable UI components ────────────────────────────────────────

export const Field = ({
  label, note, required, children,
}: {
  label: string; note?: string; required?: boolean; children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
    {note && <p className="text-xs text-muted-foreground leading-5">{note}</p>}
    {children}
  </div>
);

export const TextInput = ({
  placeholder, value, onChange, type = "text",
}: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm"
  />
);

export const TextArea = ({
  placeholder, value, onChange, maxLength,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; maxLength?: number;
}) => (
  <div className="relative">
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      rows={3}
      className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:outline-none resize-none"
    />
    {maxLength && (
      <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
        {value.length}/{maxLength}
      </span>
    )}
  </div>
);

export const SelectInput = ({
  placeholder, value, onChange, options,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:outline-none text-foreground"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

export const SectionTitle = ({ title }: { title: string }) => (
  <div className="pb-2 mb-5 border-b border-amber-500/20">
    <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500">{title}</h3>
  </div>
);