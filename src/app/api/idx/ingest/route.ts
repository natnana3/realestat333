import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { buildStreet, countySlugFromRaw, listingSlugFromAddress, normalizeStatus } from "@/lib/idx/mapper";
import type { ResoListingMinimal } from "@/lib/idx/reso-types";

const BodySchema = z.object({
  sourceSystem: z.string().min(2),
  // Vendor-agnostic array of RESO-ish listing records.
  // In production this comes from a scheduled job, webhook, or vendor push.
  records: z.array(z.record(z.string(), z.unknown())).min(1),
  // Shared secret for basic protection (set IDX_INGEST_SECRET in env)
  secret: z.string().min(1).optional(),
});

function parseNumber(v: unknown) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const ingestSecret = process.env.IDX_INGEST_SECRET;
  if (ingestSecret && parsed.data.secret !== ingestSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();
  const sourceSystem = parsed.data.sourceSystem;

  let upserted = 0;

  for (const raw of parsed.data.records) {
    const r = raw as unknown as ResoListingMinimal;
    if (!r.ListingKey) continue;

    const street1 = buildStreet(r);
    const stateCode = (r.StateOrProvince ?? "MD").toString().slice(0, 2).toUpperCase();
    const slug = listingSlugFromAddress({
      street1,
      city: r.City,
      stateCode,
      postalCode: r.PostalCode,
      sourceKey: r.ListingKey,
    });

    const countySlug = countySlugFromRaw(r.CountyOrParish);
    const county =
      countySlug && stateCode === "MD"
        ? await prisma.county.findUnique({ where: { slug: countySlug } })
        : null;

    const status = normalizeStatus(r.StandardStatus);

    const listPrice = parseNumber(r.ListPrice);
    const leasePrice = parseNumber(r.LeasePrice);

    const urlPath = `/listings/${slug}`;

    await prisma.listing.upsert({
      where: { sourceSystem_sourceKey: { sourceSystem, sourceKey: r.ListingKey } },
      update: {
        status: status as any,
        mlsNumber: r.ListingId ?? undefined,
        urlPath,
        slug,
        street1,
        city: r.City ?? undefined,
        stateCode,
        postalCode: r.PostalCode ?? undefined,
        countyName: r.CountyOrParish ?? undefined,
        latitude: r.Latitude != null ? (r.Latitude as any) : undefined,
        longitude: r.Longitude != null ? (r.Longitude as any) : undefined,
        beds: r.BedroomsTotal ?? undefined,
        bathsFull: r.BathroomsFull ?? undefined,
        bathsHalf: r.BathroomsHalf ?? undefined,
        livingAreaSqft: r.LivingArea != null ? Math.round(r.LivingArea) : undefined,
        lotSizeSqft:
          r.LotSizeSquareFeet != null ? Math.round(r.LotSizeSquareFeet) : undefined,
        yearBuilt: r.YearBuilt ?? undefined,
        listPrice: listPrice != null ? Math.round(listPrice) : undefined,
        rentPrice: leasePrice != null ? Math.round(leasePrice) : undefined,
        headline: undefined,
        publicRemarks: r.PublicRemarks ?? undefined,
        listDate: r.ListingContractDate ? new Date(r.ListingContractDate) : undefined,
        closeDate: r.CloseDate ? new Date(r.CloseDate) : undefined,
        statusChange: r.ModificationTimestamp
          ? new Date(r.ModificationTimestamp)
          : undefined,
        countyId: county?.id ?? undefined,
        raw: raw as any,
      },
      create: {
        sourceSystem,
        sourceKey: r.ListingKey,
        mlsNumber: r.ListingId ?? undefined,
        transactionType: leasePrice != null ? ("FOR_RENT" as any) : ("FOR_SALE" as any),
        status: status as any,
        slug,
        urlPath,
        street1,
        city: r.City ?? undefined,
        stateCode,
        postalCode: r.PostalCode ?? undefined,
        countyName: r.CountyOrParish ?? undefined,
        latitude: r.Latitude != null ? (r.Latitude as any) : undefined,
        longitude: r.Longitude != null ? (r.Longitude as any) : undefined,
        propertyType: r.PropertySubType ?? r.PropertyType ?? undefined,
        beds: r.BedroomsTotal ?? undefined,
        bathsFull: r.BathroomsFull ?? undefined,
        bathsHalf: r.BathroomsHalf ?? undefined,
        livingAreaSqft: r.LivingArea != null ? Math.round(r.LivingArea) : undefined,
        lotSizeSqft:
          r.LotSizeSquareFeet != null ? Math.round(r.LotSizeSquareFeet) : undefined,
        yearBuilt: r.YearBuilt ?? undefined,
        listPrice: listPrice != null ? Math.round(listPrice) : undefined,
        rentPrice: leasePrice != null ? Math.round(leasePrice) : undefined,
        publicRemarks: r.PublicRemarks ?? undefined,
        listDate: r.ListingContractDate ? new Date(r.ListingContractDate) : undefined,
        closeDate: r.CloseDate ? new Date(r.CloseDate) : undefined,
        statusChange: r.ModificationTimestamp
          ? new Date(r.ModificationTimestamp)
          : undefined,
        countyId: county?.id ?? undefined,
        raw: raw as any,
      },
    });

    upserted += 1;
  }

  return NextResponse.json({ ok: true, upserted });
}

