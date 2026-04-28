// ================================================================
// NesfStepForm.tsx — Step 3: Registration Form
// Disesuaikan dengan YICC Guidebook (versi Nasional / NCC)
// ================================================================
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/components/LanguageProvider";
import {
  Field, TextInput, TextArea, SelectInput, SectionTitle,
  type CompetitionType, type FormData,
  REQUIRED_FIELDS, COMPETITION_CATEGORIES, PARTICIPANT_DIVISIONS,
  TRADITIONAL_SONGS,
  submitToNccSheet,
} from "./nccRegisterConfig";

interface Props {
  competition: CompetitionType;
  onBack: () => void;
  onSuccess: () => void;
}

// ── Sub-components ────────────────────────────────────────────────

const SpinnerOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div
      className="w-14 h-14 border-4 border-t-transparent rounded-full animate-spin"
      style={{ borderColor: "hsl(var(--primary) / 0.3)", borderTopColor: "hsl(var(--primary))" }}
    />
  </div>
);

const SuccessOverlay = ({ onDone }: { onDone: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4 text-center shadow-xl max-w-sm mx-4">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <Check className="text-emerald-500" size={32} />
      </div>
      <h2 className="text-xl font-bold text-foreground font-display">Pendaftaran Berhasil Dikirim!</h2>
      <p className="text-sm text-muted-foreground leading-6">
        LoA akan dikirim ke email ketua tim dalam 3 hari kerja. Terima kasih telah mendaftar NCC 2026!
      </p>
      <Button size="lg" className="w-full mt-2" onClick={onDone}>
        Kembali ke Beranda
      </Button>
    </div>
  </div>
);

// ── Helpers ───────────────────────────────────────────────────────

/** Cek apakah kategori yang dipilih adalah Dance Group (perlu 5–10 anggota) */
const isDanceGroup = (category: string) =>
  category.startsWith("B —");

/** Cek apakah kategori yang dipilih adalah Traditional Song Solo */
const isSongSolo = (category: string) =>
  category.startsWith("D —");

// ── Main Component ────────────────────────────────────────────────

const NesfStepForm = ({ competition, onBack, onSuccess }: Props) => {
  const [form, setForm]           = useState<FormData>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const { lang } = useLang();

  const set = (key: string) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));
  const f   = (key: string) => form[key] ?? "";

  const isValid = REQUIRED_FIELDS.every(k => !!f(k).trim());

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");
    try {
      await submitToNccSheet(competition, form);
      setSubmitted(true);
    } catch {
      setError(
        lang === "en"
          ? "Submission failed. Please check your connection and try again."
          : "Pengiriman gagal. Periksa koneksi Anda dan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  const L = {
    step:       { en: "Step 3 of 3",         id: "Langkah 3 dari 3" },
    online:     { en: "Online",              id: "Online" },
    offline:    { en: "Offline",             id: "Offline" },
    submit:     { en: "Submit Registration", id: "Kirim Formulir" },
    submitting: { en: "Submitting…",         id: "Mengirim…" },
    required:   { en: "Please fill in all required fields (*)", id: "Harap isi semua kolom wajib (*)" },
    back:       { en: "← Back",             id: "← Kembali" },
  };

  const cLabel = competition === "online" ? L.online[lang] : L.offline[lang];
  const selectedCategory = f("COMPETITION_CATEGORY");

  return (
    <div className="w-full max-w-3xl">

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2 font-semibold">
          {L.step[lang]}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">
          {lang === "en" ? "Registration Form" : "Formulir Pendaftaran"}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">NCC 2026 · {cLabel}</p>
      </div>

      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-8">

        {/* Info banner */}
        <div className="rounded-xl p-4 text-sm text-muted-foreground leading-6 bg-primary/5 border border-primary/20">
          <p className="font-semibold text-foreground mb-1">NCC 2026 — Peserta {cLabel}</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              {lang === "en"
                ? "Fill in all data correctly. Submitted data is final and cannot be changed."
                : "Isi semua data dengan benar. Data yang dikirim bersifat final dan tidak dapat diubah."}
            </li>
            <li>
              {lang === "en"
                ? "All required performance documents (music file, description, property declaration) must be submitted no later than H-14 before the event."
                : "Semua dokumen penampilan (file musik, deskripsi, deklarasi properti) wajib dikirim paling lambat H-14 sebelum acara."}
            </li>
            <li>
              {lang === "en"
                ? "LoA will be sent to the leader's email within 3 working days."
                : "LoA akan dikirim ke email ketua dalam 3 hari kerja."}
            </li>
          </ol>
        </div>

        {/* ── 1. DATA PESERTA ──────────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Participant Data" : "Data Peserta"} />
          <div className="grid gap-4">

            {/* Read-only: competition type */}
            <Field label={lang === "en" ? "Competition Format" : "Format Kompetisi"}>
              <Input value={cLabel} disabled className="rounded-lg bg-muted/20 text-sm" />
            </Field>

            <Field
              label={lang === "en" ? "Team Leader / Participant Name" : "Nama Ketua Tim / Peserta"}
              required
              note={lang === "en"
                ? "Solo: full name. Group (Cat. B): Leader name / Member 1 / Member 2 / …"
                : "Solo: nama lengkap. Grup (Kat. B): Nama Ketua / Anggota 1 / Anggota 2 / …"}
            >
              <TextArea
                placeholder={lang === "en" ? "Enter participant name(s)" : "Masukkan nama peserta"}
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={500}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={lang === "en" ? "Leader WhatsApp" : "WhatsApp Ketua"}
                required
                note={lang === "en" ? "Include country code, e.g. +62 817 xxxx" : "Sertakan kode negara, cth: +62 817 xxxx"}
              >
                <TextInput placeholder="+62 …" value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
              </Field>
              <Field
                label={lang === "en" ? "Leader Email" : "Email Ketua"}
                required
                note={lang === "en" ? "LoA will be sent here." : "LoA akan dikirim ke sini."}
              >
                <TextInput placeholder="email@example.com" value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={lang === "en" ? "Participant Division" : "Divisi Peserta"} required>
                <SelectInput
                  placeholder={lang === "en" ? "-- Choose Division --" : "-- Pilih Divisi --"}
                  value={f("DIVISION")} onChange={set("DIVISION")} options={PARTICIPANT_DIVISIONS}
                />
              </Field>
              <Field
                label={lang === "en" ? "Number of Members" : "Jumlah Anggota"}
                note={
                  isDanceGroup(selectedCategory)
                    ? (lang === "en" ? "Dance Group: 5–10 members" : "Dance Grup: 5–10 anggota")
                    : (lang === "en" ? "Solo categories: 1 person" : "Kategori solo: 1 orang")
                }
              >
                <TextInput
                  placeholder={isDanceGroup(selectedCategory) ? "5–10" : "1"}
                  value={f("MEMBER_COUNT")} onChange={set("MEMBER_COUNT")}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* ── 2. DATA INSTITUSI ────────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "School / Institution" : "Sekolah / Institusi"} />
          <div className="grid gap-4">
            <Field
              label={lang === "en" ? "Name of School / University / Community / Sanggar" : "Nama Sekolah / Universitas / Komunitas / Sanggar"}
              required
            >
              <TextArea
                placeholder={lang === "en" ? "e.g. SMA N 1 Yogyakarta / Sanggar Budaya Nusantara" : "Cth. SMA N 1 Yogyakarta / Sanggar Budaya Nusantara"}
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={200}
              />
            </Field>
            <Field label={lang === "en" ? "Province / City of Origin" : "Provinsi / Kota Asal"}>
              <TextInput
                placeholder={lang === "en" ? "e.g. Jawa Tengah / Yogyakarta" : "Cth. Jawa Tengah / Yogyakarta"}
                value={f("PROVINCE")} onChange={set("PROVINCE")}
              />
            </Field>
          </div>
        </div>

        {/* ── 3. DATA PEMBIMBING ───────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Supervisor / Mentor" : "Pembimbing / Pelatih"} />
          <div className="grid gap-4">
            <Field label={lang === "en" ? "Supervisor Name" : "Nama Pembimbing"} required>
              <TextInput
                placeholder={lang === "en" ? "Enter supervisor name" : "Masukkan nama pembimbing"}
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={lang === "en" ? "Supervisor WhatsApp" : "WhatsApp Pembimbing"}
                required
                note={lang === "en" ? "Include country code." : "Sertakan kode negara."}
              >
                <TextInput placeholder="+62 …" value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel" />
              </Field>
              <Field label={lang === "en" ? "Supervisor Email" : "Email Pembimbing"} required>
                <TextInput placeholder="supervisor@example.com" value={f("EMAIL_SUPERVISOR")} onChange={set("EMAIL_SUPERVISOR")} type="email" />
              </Field>
            </div>
          </div>
        </div>

        {/* ── 4. DATA PENAMPILAN ───────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Performance Data" : "Data Penampilan"} />
          <div className="grid gap-4">

            {/* Kategori */}
            <Field label={lang === "en" ? "Competition Category" : "Kategori Kompetisi"} required>
              <SelectInput
                placeholder={lang === "en" ? "-- Choose Category --" : "-- Pilih Kategori --"}
                value={f("COMPETITION_CATEGORY")} onChange={set("COMPETITION_CATEGORY")}
                options={COMPETITION_CATEGORIES}
              />
            </Field>

            {/* Judul Penampilan */}
            <Field
              label={
                isSongSolo(selectedCategory)
                  ? (lang === "en" ? "Song Title" : "Judul Lagu")
                  : (lang === "en" ? "Performance / Costume Title" : "Judul Penampilan / Kostum")
              }
              required
              note={lang === "en"
                ? "Cannot be changed after submission."
                : "Tidak dapat diubah setelah pengiriman."}
            >
              <TextInput
                placeholder={
                  isSongSolo(selectedCategory)
                    ? (lang === "en" ? "Enter song title" : "Masukkan judul lagu")
                    : (lang === "en" ? "Enter performance title" : "Masukkan judul penampilan")
                }
                value={f("PERFORMANCE_TITLE")} onChange={set("PERFORMANCE_TITLE")}
              />
            </Field>

            {/* Pilihan lagu khusus kategori D */}
            {isSongSolo(selectedCategory) && (
              <Field
                label={lang === "en" ? "Song Selection (Domestic Participants)" : "Pilihan Lagu (Peserta Domestik)"}
                note={lang === "en"
                  ? "Choose from the official list, or select 'Other' and describe in the performance description below."
                  : "Pilih dari daftar resmi, atau pilih 'Lainnya' dan jelaskan di deskripsi penampilan."}
              >
                <SelectInput
                  placeholder={lang === "en" ? "-- Choose Song --" : "-- Pilih Lagu --"}
                  value={f("SONG_SELECTION")} onChange={set("SONG_SELECTION")}
                  options={TRADITIONAL_SONGS}
                />
              </Field>
            )}

            {/* Asal Budaya */}
            <Field
              label={lang === "en" ? "Cultural Origin / Region" : "Asal Budaya / Daerah"}
              required
              note={lang === "en"
                ? "Region, province, or ethnic group that inspired the performance (e.g. Jawa Tengah, Betawi, Minangkabau)"
                : "Daerah, provinsi, atau suku yang menjadi inspirasi penampilan (cth. Jawa Tengah, Betawi, Minangkabau)"}
            >
              <TextInput
                placeholder={lang === "en" ? "e.g. Jawa Tengah / Minangkabau" : "Cth. Jawa Tengah / Minangkabau"}
                value={f("CULTURAL_ORIGIN")} onChange={set("CULTURAL_ORIGIN")}
              />
            </Field>

            {/* Deskripsi Penampilan */}
            <Field
              label={lang === "en" ? "Performance Description" : "Deskripsi Penampilan"}
              note={lang === "en"
                ? "Brief description of the performance, cultural background, and meaning (max 500 characters)."
                : "Deskripsi singkat penampilan, latar belakang budaya, dan maknanya (maks. 500 karakter)."}
            >
              <TextArea
                placeholder={lang === "en" ? "Describe your performance…" : "Deskripsikan penampilan Anda…"}
                value={f("PERFORMANCE_DESCRIPTION")} onChange={set("PERFORMANCE_DESCRIPTION")} maxLength={500}
              />
            </Field>

            {/* Link dokumen (musik, properti, dll.) */}
            <Field
              label={lang === "en" ? "Performance Documents / Drive Link" : "Dokumen Penampilan / Link Drive"}
              note={lang === "en"
                ? "Google Drive link containing: music file (MP3/WAV), property declaration (if any), member list (for Group). Must be submitted by H-14."
                : "Link Google Drive berisi: file musik (MP3/WAV), deklarasi properti (jika ada), daftar anggota (untuk Grup). Wajib dikirim paling lambat H-14."}
            >
              <TextInput
                placeholder="https://drive.google.com/…"
                value={f("DRIVE_LINK")} onChange={set("DRIVE_LINK")}
              />
            </Field>
          </div>
        </div>

        {/* ── 5. INFORMASI UMUM ────────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "General Information" : "Informasi Umum"} />
          <div className="grid gap-4">
            <Field
              label={lang === "en" ? "Full Address" : "Alamat Lengkap"}
              required
              note={lang === "en" ? "Street, City, Province" : "Jalan, Kota, Provinsi"}
            >
              <TextArea
                placeholder={lang === "en" ? "Enter your full address…" : "Masukkan alamat lengkap…"}
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")}
              />
            </Field>
            <Field label={lang === "en" ? "How did you hear about NCC?" : "Dari mana Anda mengetahui NCC?"}>
              <SelectInput
                placeholder={lang === "en" ? "-- Select Source --" : "-- Pilih Sumber --"}
                value={f("INFORMATION_RESOURCES")} onChange={set("INFORMATION_RESOURCES")}
                options={["Instagram", "WhatsApp", "Teman / Guru", "Website", "YouTube", "Lainnya"]}
              />
            </Field>
          </div>
        </div>

        {/* ── 6. BUKTI PEMBAYARAN ──────────────────────────────── */}
        <div>
          <SectionTitle title={lang === "en" ? "Payment Proof" : "Bukti Pembayaran"} />
          <Field
            label={lang === "en" ? "Payment Evidence" : "Bukti Pembayaran"}
            note={lang === "en"
              ? "Upload your payment proof to Google Drive and paste the shareable link here."
              : "Upload bukti pembayaran ke Google Drive dan tempel link-nya di sini."}
          >
            <TextInput
              placeholder="https://drive.google.com/…"
              value={f("FILE")} onChange={set("FILE")}
            />
          </Field>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="pt-2 space-y-2">
          <Button
            className="w-full text-base py-4 font-bold tracking-widest uppercase"
            disabled={!isValid || loading}
            onClick={handleSubmit}
          >
            {loading ? L.submitting[lang] : L.submit[lang]}
          </Button>
          {!isValid && (
            <p className="text-xs text-center text-muted-foreground">{L.required[lang]}</p>
          )}
        </div>
      </div>

      {/* Back */}
      <div className="mt-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          {L.back[lang]}
        </Button>
      </div>

      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay onDone={onSuccess} />}
    </div>
  );
};

export default NesfStepForm;