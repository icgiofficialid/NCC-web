// ================================================================
// NccEventsData.ts
// Path: src/components/ncc/NccEventsData.ts
//
// ⚠️ FILE INI HANYA BERISI DATA FALLBACK LOKAL.
//    Data live diambil dari GAS Public API via gasClient.ts.
// ================================================================

import type { ICCEvent } from "@/lib/gasClient";

export type { ICCEvent, EventType, EventStatus } from "@/lib/gasClient";

export const localNccEvents: ICCEvent[] = [
  {
    id:                   "ncc-2026",
    slug:                 "ncc",
    type:                 "Competition",
    status:               "upcoming",
    title:                "National Cultural Competition",
    subtitle:             "NCC 2026",
    location:             "Indonesia (Venue TBA)",
    country:              "Indonesia",
    dateRange:            "TBA, 2026",
    year:                 2026,
    registrationDeadline: "TBA",
    coverGradient:        "from-amber-900 via-rose-900 to-fuchsia-900",
    accentColor:          "hsl(32 100% 55%)",
    description:
      "A national cultural competition for Indonesian students and cultural groups, covering traditional dance (solo & group), ethnic creative costume show, and traditional song solo.",
    tags:                 ["Culture", "Dance", "Traditional", "Art", "National"],
    platform:             "ncc",
    posterUrl:            "",
    guidebookUrl:         "",
    registrationUrl:      "",
    spreadsheetId:        "",
  },
];

export const nccEvents = localNccEvents;