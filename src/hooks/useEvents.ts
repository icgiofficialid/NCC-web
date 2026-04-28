// ================================================================
// useEvents.ts
// Path: src/hooks/useEvents.ts  (project: ncc-event-web)
//
// Custom hook untuk fetch & cache NCC events dari GAS Public API.
// Gunakan hook ini di NccUpcomingEvents.tsx, PastEvents.tsx, dll.
// ================================================================

import { useState, useEffect } from "react";
import { fetchEvents, fetchEventBySlug, type ICCEvent } from "../lib/gasClient";
import { localNccEvents } from "../components/ncc/NccEventsData";

// ── useEvents ─────────────────────────────────────────────────────
/**
 * Hook untuk mengambil semua NCC events.
 * @param platform  Optional: "ncc"
 *
 * @example
 * const { events, loading, error } = useEvents("ncc");
 */
export function useEvents(platform?: string) {
  const [events,  setEvents]  = useState<ICCEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEvents(platform, localNccEvents);
        if (!cancelled) {
          setEvents(data.length > 0 ? data : localNccEvents);
        }
      } catch (_e: unknown) {
        if (!cancelled) {
          setError("Gagal memuat data events.");
          setEvents(localNccEvents);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [platform]);

  return { events, loading, error };
}

// ── useEvent ──────────────────────────────────────────────────────
/**
 * Hook untuk mengambil satu NCC event berdasarkan slug.
 * @param slug  Slug event, misal: "ncc"
 *
 * @example
 * const { event, loading } = useEvent("ncc");
 */
export function useEvent(slug: string) {
  const [event,   setEvent]   = useState<ICCEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const localFallback = localNccEvents.find(e => e.slug === slug) ?? null;
        const data = await fetchEventBySlug(slug, localFallback);
        if (!cancelled) setEvent(data);
      } catch (_e: unknown) {
        if (!cancelled) {
          setError("Gagal memuat detail event.");
          const localFallback = localNccEvents.find(e => e.slug === slug) ?? null;
          setEvent(localFallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { event, loading, error };
}