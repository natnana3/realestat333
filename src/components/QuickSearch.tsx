import { Button } from "@/components/ui/Button";

export function QuickSearch() {
  return (
    <form
      className="mt-8 grid gap-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-premium)] ring-1 ring-border/60 md:grid-cols-[1fr_170px_170px_auto] md:items-end md:p-5"
      action="/search"
    >
      <label className="grid gap-2">
        <span className="text-xs font-medium text-muted">
          City, neighborhood, ZIP
        </span>
        <input
          name="q"
          placeholder="Try “Waterfront”, “Downtown”, “90210”…"
          className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 placeholder:text-muted/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium text-muted">Status</span>
        <select
          name="status"
          defaultValue="for-sale"
          className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
        >
          <option value="for-sale">For sale</option>
          <option value="for-rent">For rent</option>
          <option value="sold">Sold</option>
          <option value="new">New construction</option>
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium text-muted">Price</span>
        <select
          name="price"
          defaultValue="any"
          className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
        >
          <option value="any">Any</option>
          <option value="0-300k">$0–$300k</option>
          <option value="300k-600k">$300k–$600k</option>
          <option value="600k-1m">$600k–$1M</option>
          <option value="1m+">$1M+</option>
        </select>
      </label>

      <div className="pt-2 md:pt-0">
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Search listings
        </Button>
      </div>
    </form>
  );
}

