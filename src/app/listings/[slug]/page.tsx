import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getPrisma } from "@/lib/prisma";

type Params = { slug: string };

function formatAddress(p: {
  street1: string | null;
  city: string | null;
  stateCode: string;
  postalCode: string | null;
}) {
  return [p.street1, p.city, p.stateCode, p.postalCode].filter(Boolean).join(", ");
}

export async function generateMetadata({ params }: { params: Params }) {
  const prisma = getPrisma();
  const listing = await prisma.listing.findUnique({
    where: { slug: params.slug },
    select: {
      headline: true,
      street1: true,
      city: true,
      stateCode: true,
      postalCode: true,
      publicRemarks: true,
      listPrice: true,
      rentPrice: true,
    },
  });

  if (!listing) return {};

  const title = listing.headline ?? listing.street1 ?? "Listing";
  const desc =
    listing.publicRemarks?.slice(0, 180) ??
    `View listing details for ${formatAddress({
      street1: listing.street1,
      city: listing.city,
      stateCode: listing.stateCode,
      postalCode: listing.postalCode,
    })}.`;

  return {
    title,
    description: desc,
  };
}

export default async function ListingPage({ params }: { params: Params }) {
  const prisma = getPrisma();
  const listing = await prisma.listing.findUnique({
    where: { slug: params.slug },
    include: {
      photos: { orderBy: { sortOrder: "asc" }, take: 18 },
      county: true,
    },
  });

  if (!listing || !listing.displayAllowed) notFound();

  const priceValue = listing.rentPrice ?? listing.listPrice;
  const priceLabel =
    priceValue != null ? `$${priceValue.toLocaleString()}` : "Price on request";

  const address = formatAddress({
    street1: listing.street1 ?? null,
    city: listing.city ?? null,
    stateCode: listing.stateCode,
    postalCode: listing.postalCode ?? null,
  });

  // Minimal but correct RealEstateListing JSON-LD (expanded as IDX fields arrive)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.headline ?? address,
    description:
      listing.publicRemarks ??
      "Listing details provided by realestat333. Contact us to schedule a tour or request additional information.",
    url: `https://example.com${listing.urlPath}`,
    datePosted: listing.listDate ? listing.listDate.toISOString().slice(0, 10) : undefined,
    offers: {
      "@type": "Offer",
      price: priceValue != null ? String(priceValue) : undefined,
      priceCurrency: listing.currency ?? "USD",
      availability:
        listing.status === "SOLD"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
    },
    about: {
      "@type": listing.propertyType ?? "Residence",
      address: address,
      numberOfBedrooms: listing.beds ?? undefined,
      numberOfBathroomsTotal:
        (listing.bathsFull ?? 0) + (listing.bathsHalf ? listing.bathsHalf * 0.5 : 0) || undefined,
      floorSize: listing.livingAreaSqft
        ? {
            "@type": "QuantitativeValue",
            value: listing.livingAreaSqft,
            unitCode: "FTK",
          }
        : undefined,
      geo:
        listing.latitude != null && listing.longitude != null
          ? {
              "@type": "GeoCoordinates",
              latitude: Number(listing.latitude),
              longitude: Number(listing.longitude),
            }
          : undefined,
    },
    image: listing.photos.map((p) => p.url),
  };

  return (
    <PageShell eyebrow="Listing" title={listing.headline ?? "Listing details"}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-6">
        <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm text-muted">{address}</div>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                <span className="rounded-full bg-background px-3 py-1 ring-1 ring-border/60">
                  {listing.beds ?? "—"} bd
                </span>
                <span className="rounded-full bg-background px-3 py-1 ring-1 ring-border/60">
                  {listing.bathsFull ?? "—"} ba
                </span>
                <span className="rounded-full bg-background px-3 py-1 ring-1 ring-border/60">
                  {listing.livingAreaSqft
                    ? `${listing.livingAreaSqft.toLocaleString()} sqft`
                    : "Sqft —"}
                </span>
                {listing.county?.name ? (
                  <span className="rounded-full bg-background px-3 py-1 ring-1 ring-border/60">
                    {listing.county.name}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="text-2xl font-semibold tracking-tight">{priceLabel}</div>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
          <div className="text-sm font-medium">Photos</div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {listing.photos.length === 0 ? (
              <div className="rounded-[var(--radius-md)] bg-surface-2 p-6 text-sm text-muted ring-1 ring-border/50 md:col-span-3">
                Photos will appear once your IDX feed is connected.
              </div>
            ) : null}
            {listing.photos.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.id}
                src={p.url}
                alt={p.alt ?? "Listing photo"}
                className="aspect-[4/3] w-full rounded-[var(--radius-md)] object-cover ring-1 ring-border/60"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
          <div className="text-sm font-medium">Description</div>
          <p className="mt-3 text-sm leading-6 text-muted">
            {listing.publicRemarks ??
              "Full public remarks will appear here once the IDX feed is connected."}
          </p>
        </div>
      </div>
    </PageShell>
  );
}

