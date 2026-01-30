export interface ProductStats {
  total: number;
  active: number;
  draft: number;
  archived: number;
  thisMonthNew: number;
  lastMonthNew: number;
  growthRate: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
  fill: string;
}

export interface ProductTrend {
  date: string;
  newProducts: number;
  activeProducts: number;
}

export interface PriceAnalytics {
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  priceRanges: {
    range: string;
    count: number;
  }[];
}

export interface FinishPopularity {
  finish: string;
  count: number;
  percentage: number;
}
