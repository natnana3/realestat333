/** Sample listings for Maryland — replace via IDX/MLS feed in production */
const LISTINGS = [
  {
    slug: "123-harbor-view-dr-annapolis-md-21401-abc12345",
    status: "for-sale",
    transaction: "sale",
    street1: "123 Harbor View Dr",
    city: "Annapolis",
    stateCode: "MD",
    postalCode: "21401",
    county: "Anne Arundel County",
    beds: 4,
    bathsFull: 3,
    bathsHalf: 1,
    livingAreaSqft: 2850,
    listPrice: 875000,
    headline: "Water-adjacent colonial with screened porch",
    remarks:
      "Bright main level, updated kitchen, and a short walk to downtown Annapolis. Primary suite with dual closets and water glimpses from the rear deck.",
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    lat: 38.9784,
    lng: -76.4922,
  },
  {
    slug: "45-maple-terrace-bethesda-md-20814-def67890",
    status: "for-sale",
    transaction: "sale",
    street1: "45 Maple Terrace",
    city: "Bethesda",
    stateCode: "MD",
    postalCode: "20814",
    county: "Montgomery County",
    beds: 3,
    bathsFull: 2,
    livingAreaSqft: 1920,
    listPrice: 1125000,
    headline: "Walkable Bethesda charmer near Metro",
    remarks:
      "Refinished hardwoods, sun-filled living room, and a finished lower level ideal for office or guest space. Minutes to downtown Bethesda.",
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    lat: 38.9847,
    lng: -77.0947,
  },
  {
    slug: "8-cathedral-st-baltimore-md-21201-ghi11223",
    status: "for-rent",
    transaction: "rent",
    street1: "8 Cathedral St",
    city: "Baltimore",
    stateCode: "MD",
    postalCode: "21201",
    county: "Baltimore County",
    beds: 2,
    bathsFull: 2,
    livingAreaSqft: 1180,
    rentPrice: 2850,
    headline: "Mount Vernon loft with skyline views",
    remarks:
      "Open layout, in-unit laundry, and garage parking available. Walk to Penn Station, museums, and dining.",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    lat: 39.2976,
    lng: -76.6154,
  },
  {
    slug: "2200-frederick-ave-frederick-md-21702-jkl44556",
    status: "for-sale",
    transaction: "sale",
    street1: "2200 Frederick Ave",
    city: "Frederick",
    stateCode: "MD",
    postalCode: "21702",
    county: "Frederick County",
    beds: 5,
    bathsFull: 3,
    livingAreaSqft: 3100,
    listPrice: 649000,
    headline: "Spacious craftsman on a tree-lined lot",
    remarks:
      "Formal dining, main-floor office, and a fenced backyard. Quick access to 70 and downtown Frederick.",
    photos: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    ],
    lat: 39.4143,
    lng: -77.4105,
  },
  {
    slug: "501-ocean-city-blvd-ocean-city-md-21842-mno77889",
    status: "for-sale",
    transaction: "sale",
    street1: "501 Ocean City Blvd",
    city: "Ocean City",
    stateCode: "MD",
    postalCode: "21842",
    county: "Worcester County",
    beds: 3,
    bathsFull: 2,
    livingAreaSqft: 1450,
    listPrice: 525000,
    headline: "Coastal condo steps from the boardwalk",
    remarks:
      "Turnkey vacation or year-round living with pool access and assigned parking. Strong rental history available on request.",
    photos: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    lat: 38.3365,
    lng: -75.0849,
  },
  {
    slug: "77-elkton-rd-elkton-md-21921-pqr99001",
    status: "pending",
    transaction: "sale",
    street1: "77 Elkton Rd",
    city: "Elkton",
    stateCode: "MD",
    postalCode: "21921",
    county: "Cecil County",
    beds: 4,
    bathsFull: 2,
    livingAreaSqft: 2200,
    listPrice: 389000,
    headline: "Suburban ranch with two-car garage",
    remarks:
      "One-level living with vaulted family room and updated HVAC. Convenient to I-95 and Newark employment centers.",
    photos: [
      "https://images.unsplash.com/photo-1605276374104-de8862e3a6a9?w=800&q=80",
    ],
    lat: 39.6068,
    lng: -75.8333,
  },
];

function getListingBySlug(slug) {
  return LISTINGS.find((l) => l.slug === slug);
}

function formatPrice(listing) {
  const v = listing.rentPrice ?? listing.listPrice;
  if (v == null) return "Price on request";
  return `$${v.toLocaleString()}${listing.rentPrice ? "/mo" : ""}`;
}

function formatAddress(listing) {
  return [listing.street1, listing.city, listing.stateCode, listing.postalCode]
    .filter(Boolean)
    .join(", ");
}
