import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { getPrisma } from "@/lib/prisma";

type SearchParams = Record<string, string | string[] | undefined>;

function sp(searchParams: SearchParams, key: string) {
  const v = searchParams[key];
  return Array.isArray(v) ? v[0] : v;
}

function toInt(v: string | undefined) {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : undefined;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = sp(searchParams, "q") ?? "";
  const status = sp(searchParams, "status") ?? "for-sale";
  const price = sp(searchParams, "price") ?? "any";

  const minPrice = toInt(sp(searchParams, "minPrice"));
  const maxPrice = toInt(sp(searchParams, "maxPrice"));
  const beds = toInt(sp(searchParams, "beds"));
  const baths = toInt(sp(searchParams, "baths"));

  const prisma = getPrisma();

  const tx = status === "for-rent" ? "FOR_RENT" : "FOR_SALE";
  const wantedStatus =
    status === "sold" ? "SOLD" : status === "pending" ? "PENDING" : "ACTIVE";

  const listings = await prisma.listing.findMany({
    where: {
      displayAllowed: true,
      transactionType: tx as any,
      status: wantedStatus as any,
      ...(q
        ? {
            OR: [
              { city: { contains: q, mode: "insensitive" } },
              { postalCode: { contains: q, mode: "insensitive" } },
              { countyName: { contains: q, mode: "insensitive" } },
              { headline: { contains: q, mode: "insensitive" } },
              { street1: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(tx === "FOR_RENT"
        ? {
            ...(minPrice ? { rentPrice: { gte: minPrice } } : {}),
            ...(maxPrice ? { rentPrice: { lte: maxPrice } } : {}),
          }
        : {
            ...(minPrice ? { listPrice: { gte: minPrice } } : {}),
            ...(maxPrice ? { listPrice: { lte: maxPrice } } : {}),
          }),
      ...(beds ? { beds: { gte: beds } } : {}),
      ...(baths ? { bathsFull: { gte: baths } } : {}),
    },
    orderBy: [{ listDate: "desc" }, { updatedAt: "desc" }],
    take: 24,
    select: {
      id: true,
      urlPath: true,
      headline: true,
      street1: true,
      city: true,
      stateCode: true,
      postalCode: true,
      beds: true,
      bathsFull: true,
      livingAreaSqft: true,
      listPrice: true,
      rentPrice: true,
      currency: true,
      photos: {
        orderBy: { sortOrder: "asc" },
        take: 1,
        select: { url: true, alt: true },
      },
    },
  });

  return (
    <PageShell eyebrow="Search" title="Listings search">
      <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
        <div className="grid gap-3 md:grid-cols-12 md:items-end">
          <form
            action="/search"
            className="grid gap-3 md:col-span-9 md:grid-cols-4"
          >
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-medium text-muted">
                City, county, ZIP
              </span>
              <input
                name="q"
                defaultValue={q}
                className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                placeholder="Montgomery, Anne Arundel, 21201…"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-medium text-muted">Status</span>
              <select
                name="status"
                defaultValue={status}
                className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
              >
                <option value="for-sale">For sale</option>
                <option value="for-rent">For rent</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-2">
                <span className="text-xs font-medium text-muted">Min</span>
                <input
                  name="minPrice"
                  inputMode="numeric"
                  defaultValue={minPrice?.toString() ?? ""}
                  className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                  placeholder="0"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-medium text-muted">Max</span>
                <input
                  name="maxPrice"
                  inputMode="numeric"
                  defaultValue={maxPrice?.toString() ?? ""}
                  className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                  placeholder="1000000"
                />
              </label>
            </div>
            <input type="hidden" name="price" value={price} />
          </form>

          <div className="flex gap-3 md:col-span-3">
            <div className="grid flex-1 grid-cols-2 gap-3">
              <label className="grid gap-2">
                <span className="text-xs font-medium text-muted">Beds+</span>
                <input
                  name="beds"
                  inputMode="numeric"
                  defaultValue={beds?.toString() ?? ""}
                  className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                  placeholder="Any"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-medium text-muted">Baths+</span>
                <input
                  name="baths"
                  inputMode="numeric"
                  defaultValue={baths?.toString() ?? ""}
                  className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                  placeholder="Any"
                />
              </label>
            </div>
            <button className="h-11 shrink-0 rounded-[var(--radius-md)] bg-brand px-4 text-sm font-medium text-white hover:bg-brand-2">
              Search
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="text-muted">
            Showing <span className="font-medium text-foreground">{listings.length}</span>{" "}
            results
          </div>
          <Link className="text-accent hover:underline" href="/maryland">
            Browse by county
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {listings.length === 0 ? (
          <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
            <div className="text-base font-semibold tracking-tight">
              No listings yet (IDX feed not connected)
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">
              Next step is wiring your MLS/IDX feed (RESO Web API / RETS / vendor
              export). Once we have credentials, we’ll start ingesting real
              listings and these results populate automatically.
            </p>
          </div>
        ) : null}

        {listings.map((l) => {
          const priceValue = l.rentPrice ?? l.listPrice;
          const priceLabel =
            priceValue != null ? `$${priceValue.toLocaleString()}` : "Price on request";
          const photo = l.photos[0];
          return (
            <Link
              key={l.id}
              href={l.urlPath || `/listings/${l.id}`}
              className="group overflow-hidden rounded-[var(--radius-lg)] bg-surface ring-1 ring-border/60 transition hover:bg-surface-2"
            >
              <div className="grid md:grid-cols-[180px_1fr]">
                <div className="bg-surface-2">
                  {/* Real images come from IDX; placeholder keeps layout stable */}
                  <div className="aspect-[4/3] w-full">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo.url}
                        alt={photo.alt ?? "Listing photo"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                        Photo
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-base font-semibold tracking-tight">
                      {l.headline ?? `${l.street1 ?? "Listing"}${l.city ? `, ${l.city}` : ""}`}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {priceLabel}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted">
                    {[l.street1, l.city, l.stateCode, l.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                    <span className="rounded-full bg-background px-3 py-1 ring-1 ring-border/60">
                      {l.beds ?? "—"} bd
                    </span>
                    <span className="rounded-full bg-background px-3 py-1 ring-1 ring-border/60">
                      {l.bathsFull ?? "—"} ba
                    </span>
                    <span className="rounded-full bg-background px-3 py-1 ring-1 ring-border/60">
                      {l.livingAreaSqft ? `${l.livingAreaSqft.toLocaleString()} sqft` : "Sqft —"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}

