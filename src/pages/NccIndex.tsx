// ================================================================
// NccIndex.tsx — NCC Home page, warm cultural aesthetic
// ================================================================
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Music4, Shirt, Mic2, Trophy } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import NccShell from "@/components/ncc/NccShell";
import SectionReveal from "@/components/ncc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import {
  competitionCategories,
  highlights,
  itinerary,
  awards,
} from "@/components/ncc/NccData";

// Batik-inspired geometric mark
const BatikMark = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="currentColor" strokeWidth="10" fill="none"/>
    <polygon points="100,40 165,75 165,125 100,160 35,125 35,75" stroke="currentColor" strokeWidth="6" fill="none" opacity="0.6"/>
    <circle cx="100" cy="100" r="18" fill="currentColor"/>
  </svg>
);

const AMBER     = "hsl(32 100% 55%)";
const AMBER_DIM = "hsl(32 100% 55% / 0.12)";
const ROSE      = "hsl(350 90% 55%)";

const NccIndex = () => {
  const { lang } = useLang();

  return (
    <NccShell>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center">
        {/* Batik pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, hsl(32 100% 55%) 0px, hsl(32 100% 55%) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, hsl(350 90% 55%) 0px, hsl(350 90% 55%) 1px, transparent 1px, transparent 20px)
            `,
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, hsl(32 100% 55% / 0.07) 0%, transparent 70%)",
            animation: "glowShift 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, hsl(350 90% 55% / 0.05) 0%, transparent 70%)",
            animation: "glowShift 18s ease-in-out infinite 3s",
          }}
        />

        {/* Corner batik ornaments */}
        {[
          "top-8 left-8 border-t-2 border-l-2",
          "top-8 right-8 border-t-2 border-r-2",
          "bottom-8 left-8 border-b-2 border-l-2",
          "bottom-8 right-8 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-8 h-8 ${cls} opacity-20`} style={{ borderColor: AMBER }} />
        ))}

        <div className="container relative py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em]"
              style={{
                borderColor: "hsl(32 100% 55% / 0.35)",
                background: "hsl(32 100% 55% / 0.08)",
                color: AMBER,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: AMBER }} />
              {lang === "en" ? "National Stage · Indonesia" : "Panggung Nasional · Indonesia"}
            </motion.div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground">
                National
              </h1>
              <h1
                className="font-display text-5xl md:text-7xl leading-[1.05]"
                style={{
                  background: `linear-gradient(135deg, ${AMBER} 0%, ${ROSE} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Cultural
              </h1>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground font-light">
                Competition
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-xl leading-8">
              {lang === "en"
                ? "Indonesia's national platform for cultural arts — where traditional dance, costume, and vocal performances celebrate the richness of the archipelago's heritage."
                : "Platform nasional Indonesia untuk seni budaya — di mana tari tradisional, kostum, dan penampilan vokal merayakan kekayaan warisan Nusantara."}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <NavLink
                to="/events"
                className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-bold text-sm tracking-wide text-white transition-all hover:scale-[1.04] hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(32 100% 48%), hsl(350 90% 50%))",
                  boxShadow: "0 4px 24px hsl(32 100% 55% / 0.35)",
                }}
              >
                <BatikMark size={15} />
                {lang === "en" ? "Register Now" : "Daftar Sekarang"}
                <ArrowRight className="w-4 h-4" />
              </NavLink>
              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg border px-7 py-3.5 font-semibold text-sm tracking-wide transition-all hover:bg-surface"
                style={{ borderColor: "hsl(32 100% 55% / 0.3)", color: AMBER }}
              >
                {lang === "en" ? "Learn More" : "Pelajari Lebih"}
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HIGHLIGHTS STRIP ── */}
      <section className="border-y border-border/40 py-6" style={{ background: "hsl(32 100% 55% / 0.03)" }}>
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {highlights.map((h, i) => (
            <SectionReveal key={i} delay={i * 0.07}>
              <div>
                <p className="font-display text-3xl font-bold" style={{ color: i % 2 === 0 ? AMBER : ROSE }}>
                  {h.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{h.label[lang]}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="container py-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <SectionReveal className="flex-1 space-y-4">
            <p className="text-xs uppercase tracking-[0.32em] font-semibold" style={{ color: AMBER }}>
              {lang === "en" ? "About NCC" : "Tentang NCC"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Culture on the national stage" : "Budaya di panggung nasional"}
            </h2>
            <p className="text-muted-foreground text-sm leading-7 max-w-2xl">
              {lang === "en"
                ? "NCC (National Cultural Competition) is ICGI's national-level cultural competition platform. Unlike YICC which opens to international participants, NCC focuses on Indonesia's domestic students, communities, and cultural groups — providing an accessible national stage before the world stage."
                : "NCC (National Cultural Competition) adalah platform kompetisi budaya tingkat nasional ICGI. Berbeda dengan YICC yang terbuka untuk peserta internasional, NCC berfokus pada pelajar, komunitas, dan kelompok budaya Indonesia — menyediakan panggung nasional yang mudah diakses sebelum ke panggung dunia."}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1} className="flex gap-4 shrink-0">
            {[
              { label: { en: "YICC\nInternational", id: "YICC\nInternasional" }, color: ROSE, href: "https://icgi.or.id" },
              { label: { en: "NCC\nNational", id: "NCC\nNasional" }, color: AMBER, href: "/" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="rounded-xl border p-4 text-center text-xs font-bold font-display whitespace-pre-line transition-all hover:scale-105"
                style={{
                  borderColor: `${item.color}40`,
                  background: `${item.color}0a`,
                  color: item.color,
                  minWidth: "100px",
                }}
              >
                {item.label[lang]}
              </a>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ── COMPETITION CATEGORIES ── */}
      <section className="border-y border-border/40 py-20" style={{ background: "hsl(var(--surface) / 0.5)" }}>
        <div className="container">
          <SectionReveal className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: AMBER }}>
              {lang === "en" ? "Categories" : "Kategori"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              {lang === "en" ? "4 Competition Categories" : "4 Kategori Kompetisi"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              {lang === "en"
                ? "From traditional dance to vocal artistry — celebrating Indonesia's cultural richness."
                : "Dari tari tradisional hingga seni vokal — merayakan kekayaan budaya Indonesia."}
            </p>
          </SectionReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {competitionCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <SectionReveal key={cat.letter} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="group rounded-2xl border border-border/70 bg-panel p-5 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1" style={{ color: AMBER }}>
                      Category {cat.letter}
                    </div>
                    <h3 className="text-sm font-bold text-foreground leading-snug mb-2 font-display flex-1">
                      {cat.title[lang]}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-5 line-clamp-3 mb-3">
                      {cat.description[lang]}
                    </p>
                    <div className="pt-3 border-t border-border/40 space-y-1 text-[11px] text-muted-foreground">
                      <p>👥 {cat.participants[lang]}</p>
                      <p>⏱ {cat.duration[lang]}</p>
                    </div>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ITINERARY PREVIEW ── */}
      <section className="container py-20">
        <SectionReveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: ROSE }}>
            Itinerary
          </p>
          <h2 className="text-3xl font-bold font-display">
            {lang === "en" ? "5 Days of Culture" : "5 Hari Bersama Budaya"}
          </h2>
        </SectionReveal>
        <div className="grid gap-3 sm:grid-cols-5 max-w-5xl mx-auto">
          {itinerary.map((day, i) => (
            <SectionReveal key={day.day} delay={i * 0.08}>
              <div className="rounded-2xl border border-border/50 bg-panel p-4 text-center space-y-2 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mx-auto"
                  style={{ background: i % 2 === 0 ? AMBER_DIM : "hsl(350 90% 55% / 0.1)" }}
                >
                  {day.icon}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: i % 2 === 0 ? AMBER : ROSE }}>
                  Day {day.day}
                </p>
                <p className="text-xs font-bold text-foreground font-display leading-snug">{day.title[lang]}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="border-y border-border/40 py-20" style={{ background: "hsl(var(--surface) / 0.5)" }}>
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: AMBER }}>
              {lang === "en" ? "Awards" : "Penghargaan"}
            </p>
            <h2 className="text-3xl font-bold font-display">
              {lang === "en" ? "Recognition & Awards" : "Pengakuan & Penghargaan"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              {lang === "en" ? "Passing grade-based award system" : "Sistem penghargaan berbasis passing grade"}
            </p>
          </SectionReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {awards.map((award, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ scale: 1.06, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-border/60 bg-panel px-6 py-5 flex flex-col items-center gap-2 min-w-[120px]"
                >
                  <span className="text-3xl">{award.icon}</span>
                  <span className="text-sm font-bold text-foreground text-center font-display">{award.label[lang]}</span>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container py-24">
        <SectionReveal>
          <div
            className="rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              border: "1px solid hsl(32 100% 55% / 0.25)",
              background: "linear-gradient(135deg, hsl(32 100% 55% / 0.06) 0%, hsl(350 90% 55% / 0.06) 100%)",
            }}
          >
            {/* Batik pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, hsl(32 100% 55%) 0px, hsl(32 100% 55%) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(-45deg, hsl(350 90% 55%) 0px, hsl(350 90% 55%) 1px, transparent 1px, transparent 28px)`,
              }}
            />
            <div className="relative space-y-6">
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(32 100% 48%), hsl(350 90% 50%))",
                  boxShadow: "0 8px 32px hsl(32 100% 55% / 0.4)",
                  color: "#fff",
                }}
              >
                <BatikMark size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                {lang === "en" ? "Ready to Perform?" : "Siap Tampil?"}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm leading-7">
                {lang === "en"
                  ? "Join Indonesia's young cultural performers. Register your team and present your art on the national stage."
                  : "Bergabunglah dengan penampil budaya muda Indonesia. Daftarkan tim Anda dan tampilkan seni Anda di panggung nasional."}
              </p>
              <NavLink
                to="/events"
                className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-bold text-sm tracking-wide text-white transition-all hover:scale-[1.04]"
                style={{
                  background: "linear-gradient(135deg, hsl(32 100% 48%), hsl(350 90% 50%))",
                  boxShadow: "0 4px 24px hsl(32 100% 55% / 0.4)",
                }}
              >
                {lang === "en" ? "Register Your Team" : "Daftarkan Tim Anda"}
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </SectionReveal>
      </section>
    </NccShell>
  );
};

export default NccIndex;