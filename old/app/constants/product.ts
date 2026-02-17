export const PRODUCT_CATEGORIES = [
  { value: "marble", label: "Mermer" },
  { value: "granite", label: "Granit" },
  { value: "travertine", label: "Traverten" },
  { value: "onyx", label: "Oniks" },
  { value: "limestone", label: "Kireçtaşı" },
  { value: "quartzite", label: "Kuvarsit" },
] as const;

export const PRODUCT_STATUSES = [
  { value: "draft", label: "Taslak" },
  { value: "active", label: "Aktif" },
  { value: "archived", label: "Arşivlenmiş" },
] as const;

export const PRODUCT_PATTERNS = [
  { value: "veined", label: "Damarlı" },
  { value: "speckled", label: "Benekli" },
  { value: "uniform", label: "Düz" },
  { value: "cloudy", label: "Bulutlu" },
  { value: "flowery", label: "Çiçekli" },
  { value: "layered", label: "Katmanlı" },
] as const;

export const PRODUCT_FINISHES = [
  { value: "polished", label: "Cilalı" },
  { value: "honed", label: "Mat" },
  { value: "brushed", label: "Fırçalı" },
  { value: "flamed", label: "Alevli" },
  { value: "tumbled", label: "Eskitme" },
  { value: "sandblasted", label: "Kumlama" },
  { value: "leathered", label: "Deri" },
] as const;

export const PRODUCT_APPLICATIONS = [
  { value: "flooring", label: "Zemin Kaplama" },
  { value: "wall_cladding", label: "Duvar Kaplama" },
  { value: "countertops", label: "Tezgah" },
  { value: "stairs", label: "Merdiven" },
  { value: "bathroom", label: "Banyo" },
  { value: "outdoor", label: "Dış Mekan" },
  { value: "pool", label: "Havuz" },
  { value: "fireplace", label: "Şömine" },
] as const;

export const CURRENCIES = [
  { value: "TRY", label: "₺ TRY" },
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
] as const;
