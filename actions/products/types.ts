export type ProductStats = {
  total: number;
  active: number;
  draft: number;
  archived: number;
  thisMonthNew: number;
  lastMonthNew: number;
  growthRate: number;
};

export type ProductTrend = {
  date: string;
  newProducts: number;
  activeProducts: number;
};
