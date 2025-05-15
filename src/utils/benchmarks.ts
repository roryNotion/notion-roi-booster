// Benchmark data for ROI calculator comparisons
// Data derived from analysis of actual Notion customer usage patterns

export type CompanySizeCategory = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Enterprise';

export interface BenchmarkMetric {
  average: number;
  median: number;
  p25?: number;
  p50?: number;
  p75?: number;
}

export interface CompanyBenchmarks {
  users: BenchmarkMetric;
  paidSeats: BenchmarkMetric;
  adoptionRate: BenchmarkMetric;
  pagesPerUser: BenchmarkMetric;
  blocksPerUser: BenchmarkMetric;
  contentRichness: BenchmarkMetric;
  databaseUsage: BenchmarkMetric;
  integrationsPerTeam: BenchmarkMetric;
  integrationsPerUser: BenchmarkMetric;
  externalCollabRatio: BenchmarkMetric;
  sharedContentPercentage: BenchmarkMetric;
  privateContentPercentage: BenchmarkMetric;
  databaseEfficiency: BenchmarkMetric;
  teamspaceUtilization: BenchmarkMetric;
  costPerUser: BenchmarkMetric;
  valuePerContent: BenchmarkMetric;
  teamsPerCompany: BenchmarkMetric;
  openVsPrivateRatio: BenchmarkMetric;
  timeToProductivity: {
    days: number;
  };
}

export const benchmarkData: Record<CompanySizeCategory, CompanyBenchmarks> = {
  Enterprise: {
    users: {
      average: 2797,
      median: 3078,
      p25: 2002,
      p50: 3078,
      p75: 3455
    },
    paidSeats: {
      average: 2846.5,
      median: 3000,
      p25: 2500,
      p50: 3000,
      p75: 3500
    },
    adoptionRate: {
      average: 0.978,
      median: 1.026,
      p25: 0.974,
      p50: 1.026,
      p75: 1.028
    },
    pagesPerUser: {
      average: 633.47,
      median: 598.39,
      p25: 229.94,
      p50: 598.39,
      p75: 745.42
    },
    blocksPerUser: {
      average: 6033.18,
      median: 7157.76,
      p25: 3289.30,
      p50: 7157.76,
      p75: 7460.43
    },
    contentRichness: {
      average: 11.44,
      median: 11.96,
      p25: 7.39,
      p50: 11.96,
      p75: 13.00
    },
    databaseUsage: {
      average: 35.54,
      median: 17.06,
      p25: 7.77,
      p50: 17.06,
      p75: 30.32
    },
    integrationsPerTeam: {
      average: 1.24,
      median: 0.88,
      p25: 0.45,
      p50: 0.88,
      p75: 2.45
    },
    integrationsPerUser: {
      average: 0.029,
      median: 0.024,
      p25: 0.011,
      p50: 0.024,
      p75: 0.031
    },
    externalCollabRatio: {
      average: 0.10,
      median: 0.074,
      p25: 0.031,
      p50: 0.074,
      p75: 0.203
    },
    sharedContentPercentage: {
      average: 0.70,
      median: 0.79,
      p25: 0.37,
      p50: 0.79,
      p75: 0.86
    },
    privateContentPercentage: {
      average: 1.02,
      median: 0.94,
      p25: 0.86,
      p50: 0.94,
      p75: 1.09
    },
    databaseEfficiency: {
      average: 2.00,
      median: 2.09,
      p25: 1.95,
      p50: 2.09,
      p75: 2.16
    },
    teamspaceUtilization: {
      average: 102131.03,
      median: 15056.96,
      p25: 7639.39,
      p50: 15056.96,
      p75: 20895.94
    },
    costPerUser: {
      average: 160.69,
      median: 180,
      p25: 162,
      p50: 180,
      p75: 185.24
    },
    valuePerContent: {
      average: 0.46,
      median: 0.37,
      p25: 0.23,
      p50: 0.37,
      p75: 0.37
    },
    teamsPerCompany: {
      average: 75.17,
      median: 85,
      p25: 34,
      p50: 85,
      p75: 94
    },
    openVsPrivateRatio: {
      average: 2.21,
      median: 1.86,
      p25: 0.8,
      p50: 1.86,
      p75: 3.55
    },
    timeToProductivity: {
      days: 42
    }
  },
  Large: {
    users: {
      average: 771,
      median: 768,
      p25: 745,
      p50: 768,
      p75: 918
    },
    paidSeats: {
      average: 808,
      median: 811,
      p25: 800,
      p50: 811,
      p75: 1000
    },
    adoptionRate: {
      average: 0.96,
      median: 0.96,
      p25: 0.92,
      p50: 0.96,
      p75: 1.05
    },
    pagesPerUser: {
      average: 1259.80,
      median: 1849.42,
      p25: 1081.80,
      p50: 1849.42,
      p75: 2019.03
    },
    blocksPerUser: {
      average: 9248.22,
      median: 12373.91,
      p25: 11003.83,
      p50: 12373.91,
      p75: 12529.57
    },
    contentRichness: {
      average: 8.82,
      median: 10.17,
      p25: 6.69,
      p50: 10.17,
      p75: 12.21
    },
    databaseUsage: {
      average: 66.38,
      median: 96.14,
      p25: 58.95,
      p50: 96.14,
      p75: 105.17
    },
    integrationsPerTeam: {
      average: 0.94,
      median: 1.15,
      p25: 0.85,
      p50: 1.15,
      p75: 1.54
    },
    integrationsPerUser: {
      average: 0.044,
      median: 0.056,
      p25: 0.031,
      p50: 0.056,
      p75: 0.060
    },
    externalCollabRatio: {
      average: 0.44,
      median: 0.54,
      p25: 0.33,
      p50: 0.54,
      p75: 0.65
    },
    sharedContentPercentage: {
      average: 0.72,
      median: 0.83,
      p25: 0.76,
      p50: 0.83,
      p75: 0.95
    },
    privateContentPercentage: {
      average: 1.38,
      median: 1.34,
      p25: 1.14,
      p50: 1.34,
      p75: 1.97
    },
    databaseEfficiency: {
      average: 2.63,
      median: 2.78,
      p25: 2.20,
      p50: 2.78,
      p75: 3.35
    },
    teamspaceUtilization: {
      average: 29067.62,
      median: 46391.93,
      p25: 18710.46,
      p50: 46391.93,
      p75: 50624.41
    },
    costPerUser: {
      average: 201.98,
      median: 220.09,
      p25: 171.43,
      p50: 220.09,
      p75: 266.40
    },
    valuePerContent: {
      average: 0.69,
      median: 0.15,
      p25: 0.14,
      p50: 0.15,
      p75: 2.35
    },
    teamsPerCompany: {
      average: 48.5,
      median: 48,
      p25: 28,
      p50: 48,
      p75: 91
    },
    openVsPrivateRatio: {
      average: 0.39,
      median: 0.39,
      p25: 0.25,
      p50: 0.39,
      p75: 0.79
    },
    timeToProductivity: {
      days: 35
    }
  },
  Medium: {
    users: {
      average: 354,
      median: 335,
      p25: 262,
      p50: 335,
      p75: 465
    },
    paidSeats: {
      average: 383,
      median: 424,
      p25: 330,
      p50: 424,
      p75: 474
    },
    adoptionRate: {
      average: 0.93,
      median: 1.01,
      p25: 0.98,
      p50: 1.01,
      p75: 1.05
    },
    pagesPerUser: {
      average: 999.57,
      median: 699.94,
      p25: 406.57,
      p50: 699.94,
      p75: 1018.10
    },
    blocksPerUser: {
      average: 9865.95,
      median: 8858.14,
      p25: 3342.29,
      p50: 8858.14,
      p75: 14462.34
    },
    contentRichness: {
      average: 9.62,
      median: 8.86,
      p25: 5.41,
      p50: 8.86,
      p75: 15.05
    },
    databaseUsage: {
      average: 46.63,
      median: 29.83,
      p25: 9.17,
      p50: 29.83,
      p75: 61.48
    },
    integrationsPerTeam: {
      average: 0.68,
      median: 0.88,
      p25: 0.38,
      p50: 0.88,
      p75: 0.92
    },
    integrationsPerUser: {
      average: 0.070,
      median: 0.080,
      p25: 0.034,
      p50: 0.080,
      p75: 0.101
    },
    externalCollabRatio: {
      average: 0.33,
      median: 0.40,
      p25: 0.06,
      p50: 0.40,
      p75: 0.63
    },
    sharedContentPercentage: {
      average: 0.77,
      median: 0.82,
      p25: 0.47,
      p50: 0.82,
      p75: 1.07
    },
    privateContentPercentage: {
      average: 1.12,
      median: 1.09,
      p25: 0.98,
      p50: 1.09,
      p75: 1.51
    },
    databaseEfficiency: {
      average: 3.63,
      median: 2.55,
      p25: 2.40,
      p50: 2.55,
      p75: 2.99
    },
    teamspaceUtilization: {
      average: 8485.50,
      median: 4623.34,
      p25: 3174.98,
      p50: 4623.34,
      p75: 11638.62
    },
    costPerUser: {
      average: 209.34,
      median: 212.31,
      p25: 198.00,
      p50: 212.31,
      p75: 222.00
    },
    valuePerContent: {
      average: 0.41,
      median: 0.42,
      p25: 0.35,
      p50: 0.42,
      p75: 0.66
    },
    teamsPerCompany: {
      average: 37.88,
      median: 39,
      p25: 26,
      p50: 39,
      p75: 46
    },
    openVsPrivateRatio: {
      average: 0.77,
      median: 0.74,
      p25: 0.25,
      p50: 0.74,
      p75: 1.36
    },
    timeToProductivity: {
      days: 28
    }
  },
  Small: {
    users: {
      average: 178.5,
      median: 163,
      p25: 142,
      p50: 163,
      p75: 212
    },
    paidSeats: {
      average: 182.2,
      median: 200,
      p25: 144,
      p50: 200,
      p75: 225
    },
    adoptionRate: {
      average: 0.98,
      median: 1.02,
      p25: 0.87,
      p50: 1.02,
      p75: 1.06
    },
    pagesPerUser: {
      average: 286.02,
      median: 228.48,
      p25: 108.45,
      p50: 228.48,
      p75: 259.88
    },
    blocksPerUser: {
      average: 3642.93,
      median: 2301.11,
      p25: 1225.13,
      p50: 2301.11,
      p75: 3087.38
    },
    contentRichness: {
      average: 11.90,
      median: 11.58,
      p25: 9.31,
      p50: 11.58,
      p75: 12.95
    },
    databaseUsage: {
      average: 13.84,
      median: 10.44,
      p25: 6.77,
      p50: 10.44,
      p75: 15.60
    },
    integrationsPerTeam: {
      average: 0.70,
      median: 0.87,
      p25: 0.40,
      p50: 0.87,
      p75: 0.95
    },
    integrationsPerUser: {
      average: 0.085,
      median: 0.099,
      p25: 0.046,
      p50: 0.099,
      p75: 0.132
    },
    externalCollabRatio: {
      average: 0.20,
      median: 0.16,
      p25: 0.01,
      p50: 0.16,
      p75: 0.20
    },
    sharedContentPercentage: {
      average: 0.85,
      median: 0.72,
      p25: 0.55,
      p50: 0.72,
      p75: 1.00
    },
    privateContentPercentage: {
      average: 1.00,
      median: 1.05,
      p25: 0.75,
      p50: 1.05,
      p75: 1.28
    },
    databaseEfficiency: {
      average: 2.32,
      median: 1.92,
      p25: 1.57,
      p50: 1.92,
      p75: 2.25
    },
    teamspaceUtilization: {
      average: 2257.83,
      median: 2054.43,
      p25: 571.09,
      p50: 2054.43,
      p75: 3583.33
    },
    costPerUser: {
      average: 215.47,
      median: 234,
      p25: 197.10,
      p50: 234,
      p75: 240
    },
    valuePerContent: {
      average: 1.61,
      median: 1.25,
      p25: 0.71,
      p50: 1.25,
      p75: 1.78
    },
    teamsPerCompany: {
      average: 23,
      median: 25,
      p25: 15,
      p50: 25,
      p75: 28
    },
    openVsPrivateRatio: {
      average: 7.15,
      median: 4,
      p25: 1.6,
      p50: 4,
      p75: 11
    },
    timeToProductivity: {
      days: 21
    }
  },
  Tiny: {
    users: {
      average: 105.38,
      median: 53,
      p25: 27,
      p50: 53,
      p75: 111
    },
    paidSeats: {
      average: 35.75,
      median: 30,
      p25: 20,
      p50: 30,
      p75: 54
    },
    adoptionRate: {
      average: 72.79,
      median: 1,
      p25: 0.9,
      p50: 1,
      p75: 111
    },
    pagesPerUser: {
      average: 502.23,
      median: 172.04,
      p25: 132.24,
      p50: 172.04,
      p75: 340.68
    },
    blocksPerUser: {
      average: 4710.00,
      median: 1351.37,
      p25: 605.14,
      p50: 1351.37,
      p75: 3900.71
    },
    contentRichness: {
      average: 9.06,
      median: 6.71,
      p25: 3.97,
      p50: 6.71,
      p75: 15.76
    },
    databaseUsage: {
      average: 32.90,
      median: 12.85,
      p25: 6.11,
      p50: 12.85,
      p75: 26.60
    },
    integrationsPerTeam: {
      average: 1.32,
      median: 0.75,
      p25: 0.17,
      p50: 0.75,
      p75: 3.25
    },
    integrationsPerUser: {
      average: 0.104,
      median: 0.059,
      p25: 0.045,
      p50: 0.059,
      p75: 0.074
    },
    externalCollabRatio: {
      average: 0.30,
      median: 0.18,
      p25: 0.01,
      p50: 0.18,
      p75: 0.47
    },
    sharedContentPercentage: {
      average: 0.54,
      median: 0.37,
      p25: 0.25,
      p50: 0.37,
      p75: 1.33
    },
    privateContentPercentage: {
      average: 1.15,
      median: 1.00,
      p25: 0.86,
      p50: 1.00,
      p75: 1.18
    },
    databaseEfficiency: {
      average: 2.79,
      median: 2.47,
      p25: 1.76,
      p50: 2.47,
      p75: 4.21
    },
    teamspaceUtilization: {
      average: 6129.67,
      median: 1079.55,
      p25: 246.29,
      p50: 1079.55,
      p75: 15912.00
    },
    costPerUser: {
      average: 156.26,
      median: 230.75,
      p25: 120.00,
      p50: 230.75,
      p75: 240.00
    },
    valuePerContent: {
      average: 4.63,
      median: 2.04,
      p25: 0.06,
      p50: 2.04,
      p75: 3.20
    },
    teamsPerCompany: {
      average: 8.25,
      median: 10,
      p25: 7,
      p50: 10,
      p75: 12
    },
    openVsPrivateRatio: {
      average: 4.13,
      median: 3,
      p25: 1,
      p50: 3,
      p75: 9
    },
    timeToProductivity: {
      days: 14
    }
  }
};

/**
 * Determine company size category based on number of employees
 */
export function getCompanySizeCategory(employees: number): CompanySizeCategory {
  if (employees <= 50) return 'Tiny';
  if (employees <= 200) return 'Small';
  if (employees <= 500) return 'Medium';
  if (employees <= 1000) return 'Large';
  return 'Enterprise';
}

/**
 * Get benchmark data for a specific company size
 */
export function getBenchmarkData(employees: number): CompanyBenchmarks {
  const category = getCompanySizeCategory(employees);
  return benchmarkData[category];
} 