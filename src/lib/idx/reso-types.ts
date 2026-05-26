export type ResoProperty = Record<string, unknown>;

export type ResoListingMinimal = {
  // Common RESO-ish fields we’ll map from any feed
  ListingKey: string;
  ListingId?: string;
  StandardStatus?: string;
  PropertyType?: string;
  PropertySubType?: string;

  UnparsedAddress?: string;
  StreetNumber?: string;
  StreetName?: string;
  StreetSuffix?: string;
  UnitNumber?: string;
  City?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  CountyOrParish?: string;

  Latitude?: number;
  Longitude?: number;

  BedroomsTotal?: number;
  BathroomsFull?: number;
  BathroomsHalf?: number;
  LivingArea?: number;
  LotSizeSquareFeet?: number;
  YearBuilt?: number;

  ListPrice?: number;
  LeasePrice?: number;
  ListPriceLow?: number;
  ListPriceHigh?: number;

  PublicRemarks?: string;
  ListAgentFullName?: string;
  ListOfficeName?: string;

  ListingContractDate?: string;
  CloseDate?: string;
  ModificationTimestamp?: string;
};

