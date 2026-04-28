// ================================================================
// NccUpcomingEvents.tsx
// ================================================================
import { useState } from "react";
import { Search, MapPin, Calendar, Music4 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NccShell from "@/components/ncc/NccShell";
import SectionReveal from "@/components/ncc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { useEvents } from "@/hooks/useEvents";
import { NCC_ACCENT, NCC_DIM } from "@/components/ncc/NccData";

const AMBER = NCC_ACCENT;
const DIM   = NCC_DIM;

const NccUpcomingEvents = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { lang } = useLang();
  const { events, loading } = useEvents("ncc");

  const LABELS = {
    title:    { en: "Upcoming",          id: "Event" },
    titleSub: { en: "Events",            id: "Mendatang" },
    search:   { en: "Find event...",     id: "Cari event..." },
    loading:  { en: "Loading events...", id: "Memuat events..." },
  };

  const filtered = events
    .filter(e => e.status === "upcoming")
    .filter(e =>
      search === "" ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <NccShell>
      <section className="container pt-16 pb-8 md:pt-20">
        <SectionReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center font-display">
            <span>{LABELS.title[lang]}</span>{" "}
            <span className="font-light text-muted-foreground">{LABELS.titleSub[lang]}</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder={LABELS.search[lang]}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-5 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition"
              style={{ "--tw-ring-color": "hsl(32 100% 55% / 0.3)" } as React.CSSProperties}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white"
              style={{ background: "linear-gradient(135deg, hsl(32 100% 48%), hsl(350 90% 50%))" }}>
              <Search className="h-4 w-4" />
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="container pb-20">
        {loading ? (
          <SectionReveal className="py-20 text-center text-muted-foreground">
            <div className="space-y-3">
              <div className="mx-auto w-8 h-8 border-2 rounded-full animate-spin"
                style={{ borderColor: "hsl(32 100% 55% / 0.3)", borderTopColor: AMBER }} />
              <p className="text-sm">{LABELS.loading[lang]}</p>
            </div>
          </SectionReveal>
        ) : filtered.length === 0 ? (
          <SectionReveal className="py-24 text-center">
            <div
              className="max-w-md mx-auto rounded-[2rem] border p-12 space-y-5"
              style={{ borderColor: "hsl(32 100% 55% / 0.2)", background: DIM }}
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(32 100% 48%), hsl(350 90% 50%))", color: "#fff" }}
              >
                <Music4 className="w-8 h-8" />
              </div>
              <p className="text-xl font-bold font-display text-foreground">
                {lang === "en" ? "Coming Soon" : "Segera Hadir"}
              </p>
              <p className="text-sm text-muted-foreground leading-6">
                {lang === "en"
                  ? "NCC events are being prepared. Stay tuned for official announcements!"
                  : "Event NCC sedang dipersiapkan. Pantau terus pengumuman resmi!"}
              </p>
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full"
                style={{ background: DIM, color: AMBER }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: AMBER }} />
                {lang === "en" ? "Registration TBA" : "Pendaftaran TBA"}
              </div>
            </div>
          </SectionReveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((event, i) => (
              <SectionReveal key={event.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => navigate(`/events/${event.slug}`)}
                  className="cursor-pointer group rounded-2xl overflow-hidden border border-border/70 bg-panel hover:shadow-xl transition-all duration-300"
                >
                  <div className={`relative h-52 bg-gradient-to-br ${event.coverGradient} flex items-end p-0`}>
                    <div className="absolute inset-0"
                      style={{ backgroundImage: "radial-gradient(ellipse at 70% 20%, hsl(32 100% 55% / 0.2) 0%, transparent 55%)" }} />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: AMBER }} />
                      {event.type}
                    </div>
                    <div className="absolute top-3 right-3 text-white/40 text-[10px] tracking-widest font-bold">NCC</div>
                    <div className="w-full bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
                      <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">{event.subtitle}</p>
                      <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 font-display">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /><span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /><span>{event.dateRange}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: DIM, color: AMBER }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        )}
      </section>
    </NccShell>
  );
};

export default NccUpcomingEvents;