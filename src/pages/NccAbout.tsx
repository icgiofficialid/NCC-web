// ================================================================
// NccAbout.tsx — About page for NCC
// ================================================================
import { motion } from "framer-motion";
import { Globe, Target, Users, Heart, Music4, Shirt, Mic2 } from "lucide-react";
import NccShell from "@/components/ncc/NccShell";
import SectionReveal from "@/components/ncc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import {
  competitionCategories, goals, divisions,
  nccJudgingCriteria, domesticSongs,
  NCC_ACCENT, NCC_ACCENT2, NCC_DIM,
} from "@/components/ncc/NccData";

const AMBER = NCC_ACCENT;
const ROSE  = NCC_ACCENT2;
const DIM   = NCC_DIM;

const NccAbout = () => {
  const { lang } = useLang();

  return (
    <NccShell>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <SectionReveal>
          <div
            className="rounded-[2rem] p-8 md:p-12 relative overflow-hidden border"
            style={{
              borderColor: "hsl(32 100% 55% / 0.2)",
              background: "linear-gradient(135deg, hsl(32 100% 55% / 0.05) 0%, hsl(350 90% 55% / 0.05) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, hsl(32 100% 55%) 0px, hsl(32 100% 55%) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(-45deg, hsl(350 90% 55%) 0px, hsl(350 90% 55%) 1px, transparent 1px, transparent 24px)`,
              }}
            />
            <div className="relative max-w-3xl space-y-5">
              <div
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.24em]"
                style={{ borderColor: "hsl(32 100% 55% / 0.35)", background: DIM, color: AMBER }}
              >
                <Globe className="h-4 w-4" />
                {lang === "en" ? "About NCC" : "Tentang NCC"}
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                {lang === "en"
                  ? "A national platform for cultural arts and heritage"
                  : "Platform nasional untuk seni budaya dan warisan leluhur"}
              </h1>
              <p className="max-w-2xl leading-8 text-muted-foreground">
                {lang === "en"
                  ? "NCC (National Cultural Competition) is ICGI's national-level competition platform for cultural arts. Unlike YICC which opens to international participants, NCC focuses on Indonesia's domestic students, communities, and cultural groups — providing an accessible national stage before the world stage."
                  : "NCC (National Cultural Competition) adalah platform kompetisi seni budaya tingkat nasional ICGI. Berbeda dengan YICC yang terbuka untuk peserta internasional, NCC berfokus pada pelajar, komunitas, dan kelompok budaya Indonesia — menyediakan panggung nasional yang mudah diakses sebelum ke panggung dunia."}
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ICGI Ecosystem */}
      <section className="bg-surface/60 border-y border-border/40 py-16">
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: AMBER }}>The ICGI Family</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Two Cultural Portals, One Vision" : "Dua Portal Budaya, Satu Visi"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              {lang === "en"
                ? "ICGI runs both a national and international cultural competition for Indonesia's cultural excellence."
                : "ICGI menjalankan dua kompetisi budaya nasional dan internasional untuk keunggulan budaya Indonesia."}
            </p>
          </SectionReveal>
          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
            {[
              {
                name: "NCC",
                full: { en: "National Cultural Competition", id: "National Cultural Competition" },
                desc: { en: "National cultural platform for Indonesian students & communities — dance, costume, and traditional song", id: "Platform budaya nasional untuk pelajar & komunitas Indonesia — tari, kostum, dan lagu tradisional" },
                color: "from-amber-500 to-rose-500",
                icon: "🎭",
                href: "/",
                active: true,
              },
              {
                name: "YICC",
                full: { en: "Yogyakarta International Cultural Competition", id: "Yogyakarta International Cultural Competition" },
                desc: { en: "International cultural competition platform for global participants", id: "Platform kompetisi budaya internasional untuk peserta global" },
                color: "from-rose-500 to-violet-600",
                icon: "🌐",
                href: "https://icgi.or.id",
                active: false,
              },
            ].map((portal, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }}
                  className={`rounded-2xl border p-6 text-center space-y-3 transition-all ${portal.active ? "" : "opacity-70 hover:opacity-100"}`}
                  style={{ borderColor: portal.active ? "hsl(32 100% 55% / 0.3)" : "hsl(var(--border))" }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-2xl mx-auto`}>
                    {portal.icon}
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-foreground">{portal.name}</p>
                    <p className="text-xs text-muted-foreground">{portal.full[lang]}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-6">{portal.desc[lang]}</p>
                  {portal.active && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full"
                      style={{ background: DIM, color: AMBER }}>
                      ● {lang === "en" ? "You are here" : "Anda di sini"}
                    </span>
                  )}
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="container py-16">
        <SectionReveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: AMBER }}>Mission</p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {lang === "en" ? "Our Goals" : "Tujuan Kami"}
          </h2>
        </SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {goals.map((goal, i) => {
            const icons = [Music4, Target, Users, Globe];
            const Icon = icons[i % icons.length];
            return (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border/50 bg-panel p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: DIM }}>
                    <Icon className="h-4 w-4" style={{ color: AMBER }} />
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{goal[lang]}</p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* Competition Categories */}
      <section className="bg-surface/60 border-y border-border/40 py-16">
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "4 Competition Categories" : "4 Kategori Kompetisi"}
            </h2>
          </SectionReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {competitionCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <SectionReveal key={cat.letter} delay={i * 0.08}>
                  <div className="rounded-2xl border border-border/50 bg-panel p-5 space-y-3 h-full flex flex-col">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: AMBER }}>
                      Cat. {cat.letter}
                    </div>
                    <h3 className="text-xs font-bold text-foreground font-display leading-snug">{cat.title[lang]}</h3>
                    <p className="text-xs text-muted-foreground leading-5 flex-1">{cat.description[lang]}</p>
                    <div className="pt-3 border-t border-border/40 space-y-1 text-[11px] text-muted-foreground">
                      <p>👥 {cat.participants[lang]}</p>
                      <p>⏱ {cat.duration[lang]}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Participant Divisions */}
      <section className="container py-16">
        <SectionReveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: ROSE }}>
            {lang === "en" ? "Who Can Join" : "Siapa yang Bisa Ikut"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {lang === "en" ? "Participant Divisions" : "Divisi Peserta"}
          </h2>
        </SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {divisions.map((div, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-border/50 bg-panel p-5 text-center space-y-2">
                <div className="text-3xl">{["🏫", "🏃", "👨‍🎓", "🌍"][i]}</div>
                <h3 className="font-bold text-foreground text-sm font-display">{div.level[lang]}</h3>
                <p className="text-xs text-muted-foreground">{div.age[lang]}</p>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold"
                  style={{ background: DIM, color: AMBER }}
                >
                  {div.note[lang]}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="bg-surface/60 border-y border-border/40 py-16">
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: ROSE }}>
              {lang === "en" ? "Assessment" : "Penilaian"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Judging Criteria" : "Kriteria Penilaian"}
            </h2>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { key: "dance",   label: { en: "Dance (Solo & Group)", id: "Tari (Solo & Grup)" },  criteria: nccJudgingCriteria.dance,   icon: "💃", color: ROSE },
              { key: "costume", label: { en: "Costume Show",          id: "Pertunjukan Kostum" }, criteria: nccJudgingCriteria.costume, icon: "👘", color: "hsl(270 70% 60%)" },
              { key: "vocal",   label: { en: "Traditional Song Solo", id: "Lagu Tradisional Solo" }, criteria: nccJudgingCriteria.vocal, icon: "🎤", color: AMBER },
            ].map(({ key, label, criteria, icon, color }) => (
              <SectionReveal key={key}>
                <div className="rounded-2xl border border-border/50 bg-panel p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{icon}</span>
                    <h3 className="font-bold text-foreground text-sm font-display">{label[lang]}</h3>
                  </div>
                  <div className="space-y-3">
                    {criteria.map((c, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground flex-1">{c.aspect[lang]}</span>
                        <span className="text-xs font-bold shrink-0" style={{ color }}>{c.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Official Song List */}
      <section className="container py-16">
        <SectionReveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: AMBER }}>🎵</p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {lang === "en" ? "Official Song List" : "Daftar Lagu Resmi"}
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            {lang === "en"
              ? "For Traditional Song Solo category — domestic participants"
              : "Untuk kategori Lagu Tradisional Solo — peserta domestik"}
          </p>
        </SectionReveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {domesticSongs.map((song, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="rounded-xl border border-border/50 bg-panel p-4 flex items-center gap-3">
                <span className="text-lg">🎵</span>
                <div>
                  <p className="text-sm font-bold text-foreground">{song.title}</p>
                  <p className="text-[11px] text-muted-foreground">{song.region[lang]}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </NccShell>
  );
};

export default NccAbout;