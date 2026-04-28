// ================================================================
// NccData.ts — NCC Portal
// National Cultural Competition — by ICGI
// Central data: categories, divisions, judging, itinerary, FAQ,
//               goals, awards, domestic songs, footer, social
// ================================================================

import {
  Music4, Shirt, Mic2, Palmtree,
  Instagram, Youtube, Globe,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────
type Lang = "en" | "id";
type BiLang = Record<Lang, string>;

// ── Brand accent ─────────────────────────────────────────────────
export const NCC_ACCENT  = "hsl(32 100% 55%)";   // warm amber / gold
export const NCC_ACCENT2 = "hsl(350 90% 55%)";   // rose-red secondary
export const NCC_DIM     = "hsl(32 100% 55% / 0.1)";

// ── Competition Categories (from YICC guidebook §5) ───────────────
export const competitionCategories = [
  {
    letter: "A",
    icon: Music4,
    color: "from-amber-500 to-rose-500",
    title:       { en: "Traditional / Cultural-Based Dance Solo",  id: "Tari Tradisional / Berbasis Budaya Solo" },
    description: { en: "A solo dance based on traditional or cultural heritage. Creative adaptation is allowed as long as cultural identity remains dominant.", id: "Tari solo berbasis tradisi atau warisan budaya. Adaptasi kreatif diperbolehkan selama identitas budaya tetap dominan." },
    participants:{ en: "Solo — 1 person",   id: "Solo — 1 orang" },
    duration:    { en: "Max 5 minutes",      id: "Maks. 5 menit" },
    format:      { en: "Solo",               id: "Solo" },
    required:    {
      en: ["Title of dance", "Cultural origin / region", "Short performance description", "Music file (MP3/WAV)", "Property declaration (if applicable)"],
      id: ["Judul tari", "Asal budaya / daerah", "Deskripsi singkat penampilan", "File musik (MP3/WAV)", "Deklarasi properti (jika ada)"],
    },
  },
  {
    letter: "B",
    icon: Music4,
    color: "from-rose-500 to-fuchsia-600",
    title:       { en: "Traditional / Cultural-Based Dance Group", id: "Tari Tradisional / Berbasis Budaya Grup" },
    description: { en: "A group dance based on traditional or cultural heritage (5–10 members). Creative adaptation allowed while cultural identity remains dominant.", id: "Tari grup berbasis tradisi atau warisan budaya (5–10 anggota). Adaptasi kreatif diperbolehkan selama identitas budaya tetap dominan." },
    participants:{ en: "Group — 5 to 10 persons", id: "Grup — 5 hingga 10 orang" },
    duration:    { en: "Max 7 minutes",      id: "Maks. 7 menit" },
    format:      { en: "Group",              id: "Grup" },
    required:    {
      en: ["Title of dance", "Cultural origin / region", "Short performance description", "List of members", "Music file (MP3/WAV)", "Property declaration (if applicable)"],
      id: ["Judul tari", "Asal budaya / daerah", "Deskripsi singkat penampilan", "Daftar anggota", "File musik (MP3/WAV)", "Deklarasi properti (jika ada)"],
    },
  },
  {
    letter: "C",
    icon: Shirt,
    color: "from-fuchsia-500 to-violet-600",
    title:       { en: "Ethnic / Cultural Creative Costume Show",  id: "Pertunjukan Kostum Kreatif Etnik / Budaya" },
    description: { en: "A solo costume presentation inspired by traditional or cultural identity. Modern interpretation allowed as long as cultural roots are clearly reflected.", id: "Presentasi kostum solo terinspirasi dari identitas tradisional atau budaya. Interpretasi modern diperbolehkan selama akar budaya tetap tercermin jelas." },
    participants:{ en: "Solo — 1 person",   id: "Solo — 1 orang" },
    duration:    { en: "Max 2 minutes",      id: "Maks. 2 menit" },
    format:      { en: "Solo",               id: "Solo" },
    required:    {
      en: ["Costume title / theme", "Cultural inspiration", "Short costume description", "Music file (MP3/WAV)"],
      id: ["Judul/tema kostum", "Inspirasi budaya", "Deskripsi singkat kostum", "File musik (MP3/WAV)"],
    },
  },
  {
    letter: "D",
    icon: Mic2,
    color: "from-violet-500 to-cyan-600",
    title:       { en: "Traditional Song Solo",                    id: "Lagu Tradisional Solo" },
    description: { en: "A solo vocal performance of a traditional song. Participants must represent their own regional cultural origin and choose from the official song list.", id: "Penampilan vokal solo lagu tradisional. Peserta harus merepresentasikan asal budaya daerahnya dan memilih dari daftar lagu resmi." },
    participants:{ en: "Solo — 1 person",   id: "Solo — 1 orang" },
    duration:    { en: "Max 5 minutes",      id: "Maks. 5 menit" },
    format:      { en: "Solo",               id: "Solo" },
    required:    {
      en: ["Song title", "Cultural origin / region", "Short song description or meaning", "Instrumental backing track", "Lyrics (if required)"],
      id: ["Judul lagu", "Asal budaya / daerah", "Deskripsi singkat atau makna lagu", "Iringan instrumental", "Lirik (jika diperlukan)"],
    },
  },
];

// ── Participant Divisions (from guidebook §4) ─────────────────────
export const divisions = [
  {
    level: { en: "Primary / Elementary School", id: "SD / Sekolah Dasar" },
    age:   { en: "Age 7 – 12 years old",         id: "Usia 7 – 12 tahun" },
    note:  { en: "Student Division",              id: "Divisi Pelajar" },
  },
  {
    level: { en: "Junior High School",            id: "SMP / MTs" },
    age:   { en: "Age 13 – 15 years old",         id: "Usia 13 – 15 tahun" },
    note:  { en: "Student Division",              id: "Divisi Pelajar" },
  },
  {
    level: { en: "Senior High School",            id: "SMA / SMK / MA" },
    age:   { en: "Age 16 – 18 years old",         id: "Usia 16 – 18 tahun" },
    note:  { en: "Student Division",              id: "Divisi Pelajar" },
  },
  {
    level: { en: "Open Division",                 id: "Divisi Terbuka" },
    age:   { en: "University / Community / Studio", id: "Universitas / Komunitas / Sanggar" },
    note:  { en: "No age limit",                  id: "Tidak ada batasan usia" },
  },
];

// ── Judging Criteria (from guidebook §9) ─────────────────────────
export const nccJudgingCriteria = {
  dance: [
    { aspect: { en: "Technique & Execution",           id: "Teknik & Eksekusi" },                weight: "30%" },
    { aspect: { en: "Cultural Interpretation / Authenticity", id: "Interpretasi / Keaslian Budaya" }, weight: "25%" },
    { aspect: { en: "Choreography / Composition",      id: "Koreografi / Komposisi" },            weight: "20%" },
    { aspect: { en: "Stage Presence & Expression",     id: "Ekspresi & Kehadiran Panggung" },      weight: "15%" },
    { aspect: { en: "Costume & Overall Presentation",  id: "Kostum & Presentasi Keseluruhan" },    weight: "10%" },
  ],
  costume: [
    { aspect: { en: "Costume Concept & Cultural Relevance", id: "Konsep Kostum & Relevansi Budaya" }, weight: "35%" },
    { aspect: { en: "Creativity / Design Development", id: "Kreativitas / Pengembangan Desain" },  weight: "25%" },
    { aspect: { en: "Catwalk & Presentation",          id: "Catwalk & Presentasi" },               weight: "20%" },
    { aspect: { en: "Confidence / Expression",         id: "Kepercayaan Diri / Ekspresi" },        weight: "10%" },
    { aspect: { en: "Overall Visual Impact",           id: "Dampak Visual Keseluruhan" },          weight: "10%" },
  ],
  vocal: [
    { aspect: { en: "Vocal Quality / Technique",       id: "Kualitas Vokal / Teknik" },            weight: "35%" },
    { aspect: { en: "Musicality / Intonation / Rhythm",id: "Musikalitas / Intonasi / Ritme" },     weight: "25%" },
    { aspect: { en: "Interpretation & Expression",     id: "Interpretasi & Ekspresi" },            weight: "20%" },
    { aspect: { en: "Cultural Delivery / Song Character", id: "Penyampaian Budaya / Karakter Lagu" }, weight: "10%" },
    { aspect: { en: "Stage Presence / Appearance",     id: "Kehadiran Panggung / Penampilan" },    weight: "10%" },
  ],
};

// ── Awards (from guidebook §10) ───────────────────────────────────
export const awards = [
  { icon: "🥇", label: { en: "Gold Award",             id: "Gold Award" } },
  { icon: "🥈", label: { en: "Silver Award",           id: "Silver Award" } },
  { icon: "🥉", label: { en: "Bronze Award",           id: "Bronze Award" } },
  { icon: "🏅", label: { en: "Honorable Mention",      id: "Honorable Mention" } },
  { icon: "📜", label: { en: "Certificate of Participation", id: "Sertifikat Partisipasi" } },
];

// ── Event Itinerary (from guidebook §11) ─────────────────────────
export const itinerary = [
  {
    day: 1,
    icon: "🎪",
    title: { en: "Arrival & Opening",       id: "Kedatangan & Pembukaan" },
    highlights: {
      en: ["Registration & check-in", "Opening Ceremony", "Technical Meeting & Briefing", "Welcoming Party"],
      id: ["Registrasi & check-in", "Upacara Pembukaan", "Technical Meeting & Briefing", "Welcoming Party"],
    },
  },
  {
    day: 2,
    icon: "🎭",
    title: { en: "Technical Rehearsal",     id: "Gladi Teknis" },
    highlights: {
      en: ["Technical Rehearsal per category", "Stage Checking", "Sound & Lighting Test", "Costume Preparation"],
      id: ["Gladi teknis per kategori", "Pengecekan panggung", "Uji suara & pencahayaan", "Persiapan kostum"],
    },
  },
  {
    day: 3,
    icon: "🌟",
    title: { en: "Main Competition",        id: "Kompetisi Utama" },
    highlights: {
      en: ["Cultural Main Competition", "All 4 categories in performance", "Live judging session", "Audience appreciation"],
      id: ["Kompetisi Budaya Utama", "Semua 4 kategori tampil", "Sesi penilaian langsung", "Apresiasi penonton"],
    },
  },
  {
    day: 4,
    icon: "🏮",
    title: { en: "Cultural Expo & Gala Night", id: "Expo Budaya & Gala Night" },
    highlights: {
      en: ["Cultural Expo / Booth", "Gala Night", "Cultural Showcase & Exchange Performance"],
      id: ["Expo Budaya / Booth", "Gala Night", "Pertunjukan Budaya & Pertukaran Budaya"],
    },
  },
  {
    day: 5,
    icon: "🏆",
    title: { en: "Awarding & Closing",      id: "Penghargaan & Penutupan" },
    highlights: {
      en: ["Awarding Ceremony", "Closing Ceremony", "Official Photo Session"],
      id: ["Upacara Penghargaan", "Upacara Penutupan", "Sesi Foto Resmi"],
    },
  },
];

// ── Official Domestic Song List (from guidebook §6) ───────────────
export const domesticSongs = [
  { title: "Soleram",                    region: { en: "Riau",               id: "Riau" } },
  { title: "Jali-Jali",                  region: { en: "Betawi / DKI Jakarta",id: "Betawi / DKI Jakarta" } },
  { title: "Gambang Suling",             region: { en: "Central Java",       id: "Jawa Tengah" } },
  { title: "Cublak-Cublak Suweng",       region: { en: "Java",               id: "Jawa" } },
  { title: "Kampuang Nan Jauh di Mato",  region: { en: "West Sumatra",       id: "Sumatra Barat" } },
  { title: "Ampar-Ampar Pisang",         region: { en: "South Kalimantan",   id: "Kalimantan Selatan" } },
  { title: "O Ina Ni Keke",             region: { en: "North Sulawesi",     id: "Sulawesi Utara" } },
  { title: "Cik Cik Periuk",            region: { en: "West Kalimantan",    id: "Kalimantan Barat" } },
];

// ── Goals ─────────────────────────────────────────────────────────
export const goals: BiLang[] = [
  {
    en: "Provide a national competition platform for cultural-based performances across Indonesia.",
    id: "Menyediakan platform kompetisi nasional untuk penampilan berbasis budaya dari seluruh Indonesia.",
  },
  {
    en: "Encourage appreciation and preservation of traditional arts and cultural heritage.",
    id: "Mendorong apresiasi dan pelestarian seni tradisional serta warisan budaya.",
  },
  {
    en: "Promote inter-regional cultural exchange among participants from different provinces.",
    id: "Mendorong pertukaran budaya antar daerah di antara peserta dari berbagai provinsi.",
  },
  {
    en: "Support young talents, communities, and cultural groups in presenting their cultural identity.",
    id: "Mendukung bakat muda, komunitas, dan kelompok budaya dalam mempresentasikan identitas budayanya.",
  },
];

// ── FAQ ───────────────────────────────────────────────────────────
export const faqItems = [
  {
    question: { en: "What is NCC?",                                    id: "Apa itu NCC?" },
    answer:   { en: "NCC (National Cultural Competition) is ICGI's national-level cultural competition platform. It focuses on Indonesian domestic participants — students, communities, sanggar, and open participants — showcasing traditional arts and cultural heritage on a national stage.", id: "NCC (National Cultural Competition) adalah platform kompetisi budaya tingkat nasional ICGI. Berfokus pada peserta domestik Indonesia — pelajar, komunitas, sanggar, dan peserta umum — untuk menampilkan seni tradisional dan warisan budaya di panggung nasional." },
  },
  {
    question: { en: "Who can participate?",                            id: "Siapa yang bisa berpartisipasi?" },
    answer:   { en: "NCC is open to all Indonesian students (Elementary, Junior High, Senior High) and Open Division participants (university students, communities, cultural studios / sanggar). No specific age limit for Open Division.", id: "NCC terbuka untuk semua pelajar Indonesia (SD, SMP, SMA) dan peserta Divisi Terbuka (mahasiswa, komunitas, sanggar). Tidak ada batasan usia khusus untuk Divisi Terbuka." },
  },
  {
    question: { en: "What categories are available?",                  id: "Apa saja kategori yang tersedia?" },
    answer:   { en: "There are 4 competition categories: (A) Traditional Dance Solo, (B) Traditional Dance Group, (C) Ethnic Creative Costume Show, and (D) Traditional Song Solo.", id: "Ada 4 kategori kompetisi: (A) Tari Tradisional Solo, (B) Tari Tradisional Grup, (C) Pertunjukan Kostum Kreatif Etnik, dan (D) Lagu Tradisional Solo." },
  },
  {
    question: { en: "Can I register for multiple categories?",         id: "Bolehkah mendaftar di beberapa kategori?" },
    answer:   { en: "Yes, participants may register in more than one category as long as each registration is submitted separately and all requirements are fulfilled.", id: "Ya, peserta boleh mendaftar di lebih dari satu kategori asalkan setiap pendaftaran dikirim secara terpisah dan semua persyaratan terpenuhi." },
  },
  {
    question: { en: "When is the submission deadline for documents?",  id: "Kapan batas waktu pengumpulan dokumen?" },
    answer:   { en: "All required technical files — music files, performance description, costume/dance/song details, property declaration — must be submitted no later than H-14 (14 days before the event).", id: "Semua file teknis yang diperlukan — file musik, deskripsi penampilan, detail kostum/tari/lagu, deklarasi properti — harus dikirim paling lambat H-14 (14 hari sebelum acara)." },
  },
  {
    question: { en: "What are prohibited stage properties?",           id: "Apa saja properti panggung yang dilarang?" },
    answer:   { en: "Prohibited items include fire, smoke, liquids, sharp weapons, glass or breakable materials, dangerous substances, live animals, confetti, glitter, or anything that may dirty or damage the stage/venue.", id: "Barang terlarang meliputi api, asap, cairan, senjata tajam, kaca atau bahan mudah pecah, zat berbahaya, hewan hidup, confetti, glitter, atau apapun yang dapat mengotori atau merusak panggung/venue." },
  },
  {
    question: { en: "How is the Traditional Song Solo category judged?",id: "Bagaimana penilaian kategori Lagu Tradisional Solo?" },
    answer:   { en: "Judging covers: Vocal Quality/Technique (35%), Musicality/Intonation/Rhythm (25%), Interpretation & Expression (20%), Cultural Delivery/Song Character (10%), Stage Presence/Appearance (10%).", id: "Penilaian mencakup: Kualitas Vokal/Teknik (35%), Musikalitas/Intonasi/Ritme (25%), Interpretasi & Ekspresi (20%), Penyampaian Budaya/Karakter Lagu (10%), Kehadiran Panggung/Penampilan (10%)." },
  },
  {
    question: { en: "What awards are given?",                          id: "Penghargaan apa yang diberikan?" },
    answer:   { en: "NCC uses a passing grade-based award system: Gold Award, Silver Award, Bronze Award, Honorable Mention, and Certificate of Participation. Final score bands will be announced in the official guidebook.", id: "NCC menggunakan sistem penghargaan berbasis passing grade: Gold Award, Silver Award, Bronze Award, Honorable Mention, dan Sertifikat Partisipasi. Band skor akhir akan diumumkan di buku panduan resmi." },
  },
  {
    question: { en: "What is the Cultural Expo Booth?",               id: "Apa itu Cultural Expo Booth?" },
    answer:   { en: "The Cultural Expo Booth (tentative 2×2m) is a space for participants to display traditional food, cultural souvenirs, handicrafts, regional identity, and visual cultural information. Sales are allowed subject to venue regulations.", id: "Cultural Expo Booth (tentatif 2×2m) adalah ruang bagi peserta untuk memamerkan makanan tradisional, souvenir budaya, kerajinan tangan, identitas daerah, dan informasi budaya visual. Penjualan diperbolehkan sesuai regulasi venue." },
  },
  {
    question: { en: "Is registration fee refundable?",                 id: "Apakah biaya pendaftaran bisa dikembalikan?" },
    answer:   { en: "No. Registration fees that have been paid are non-refundable under any circumstances, as stated in the Terms & Conditions.", id: "Tidak. Biaya pendaftaran yang telah dibayar tidak dapat dikembalikan dalam kondisi apapun, sebagaimana tercantum dalam Syarat & Ketentuan." },
  },
];

// ── Highlights (for homepage stats strip) ────────────────────────
export const highlights = [
  { value: "4",       label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
  { value: "5",       label: { en: "Days of Events",         id: "Hari Pelaksanaan" } },
  { value: "National",label: { en: "Coverage",               id: "Jangkauan" } },
  { value: "H-14",    label: { en: "Submission Deadline",    id: "Batas Pengumpulan" } },
];

// ── Footer columns ────────────────────────────────────────────────
export const footerColumns = [
  {
    title: { en: "Events", id: "Event" },
    links: [
      { en: "Upcoming Events", id: "Event Mendatang" },
      { en: "Past Events",     id: "Event Lalu" },
      { en: "Register",        id: "Daftar" },
    ],
  },
  {
    title: { en: "Info", id: "Info" },
    links: [
      { en: "About NCC",  id: "Tentang NCC" },
      { en: "FAQ",        id: "FAQ" },
      { en: "Contact",    id: "Kontak" },
    ],
  },
  {
    title: { en: "Legal", id: "Legal" },
    links: [
      { en: "Terms & Conditions", id: "Syarat & Ketentuan" },
      { en: "Guidebook",          id: "Buku Panduan" },
    ],
  },
  {
    title: { en: "ICGI Family", id: "Keluarga ICGI" },
    links: [
      { en: "YICC International", id: "YICC Internasional" },
      { en: "NESF National",      id: "NESF Nasional" },
      { en: "ICGI Website",       id: "Website ICGI" },
    ],
  },
];

export const footerLinkMap: Record<string, string> = {
  "Upcoming Events":    "/events",
  "Event Mendatang":    "/events",
  "Past Events":        "/past-events",
  "Event Lalu":         "/past-events",
  "Register":           "/register",
  "Daftar":             "/register",
  "About NCC":          "/about",
  "Tentang NCC":        "/about",
  "FAQ":                "/faq",
  "Contact":            "/contact",
  "Kontak":             "/contact",
  "Terms & Conditions": "/terms",
  "Syarat & Ketentuan": "/terms",
  "Guidebook":          "/guide",
  "Buku Panduan":       "/guide",
  "YICC International": "https://icgi.or.id",
  "YICC Internasional": "https://icgi.or.id",
  "NESF National":      "https://nesf.icgi.or.id",
  "NESF Nasional":      "https://nesf.icgi.or.id",
  "ICGI Website":       "https://icgi.or.id",
  "Website ICGI":       "https://icgi.or.id",
};

// ── Social icons ──────────────────────────────────────────────────
export const socialItems = [Instagram, Youtube, Globe];