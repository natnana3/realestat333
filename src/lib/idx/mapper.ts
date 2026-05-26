import type { ResoListingMinimal } from "@/lib/idx/reso-types";
import { slugifyCounty } from "@/lib/md-counties";

export function normalizeStatus(s?: string) {
  const v = (s ?? "").toLowerCase().trim();
  if (v === "active") return "ACTIVE";
  if (v === "pending") return "PENDING";
  if (v === "sold" || v === "closed") return "SOLD";
  if (v === "withdrawn") return "WITHDRAWN";
  if (v === "expired") return "EXPIRED";
  if (v === "coming soon" || v === "coming_soon") return "COMING_SOON";
  if (v === "temporarily off market" || v === "temp off market") return "TEMP_OFF_MARKET";
  return "ACTIVE";
}

export function buildStreet(r: ResoListingMinimal) {
  if (r.UnparsedAddress) return r.UnparsedAddress;
  const parts = [r.StreetNumber, r.StreetName, r.StreetSuffix, r.UnitNumber ? `#${r.UnitNumber}` : undefined]
    .filter(Boolean)
    .join(" ");
  return parts || undefined;
}

export function listingSlugFromAddress(input: {
  street1?: string;
  city?: string;
  stateCode?: string;
  postalCode?: string;
  sourceKey: string;
}) {
  const core = [input.street1, input.city, input.stateCode, input.postalCode]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const suffix = input.sourceKey.slice(-8).toLowerCase().replace(/[^a-z0-9]/g, "");
  return `${core || "listing"}-${suffix}`;
}

export function countySlugFromRaw(countyOrParish?: string) {
  if (!countyOrParish) return undefined;
  const name = countyOrParish.replace(/ County$/i, "").trim();
  return slugifyCounty(name);
}

