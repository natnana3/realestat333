export const MARYLAND_COUNTIES = [
  "Allegany County",
  "Anne Arundel County",
  "Baltimore County",
  "Calvert County",
  "Caroline County",
  "Carroll County",
  "Cecil County",
  "Charles County",
  "Dorchester County",
  "Frederick County",
  "Garrett County",
  "Harford County",
  "Howard County",
  "Kent County",
  "Montgomery County",
  "Prince George's County",
  "Queen Anne's County",
  "Somerset County",
  "St. Mary's County",
  "Talbot County",
  "Washington County",
  "Wicomico County",
  "Worcester County",
] as const;

export function slugifyCounty(name: string) {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/\./g, "")
    .replace(/\s*&\s*/g, " and ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

