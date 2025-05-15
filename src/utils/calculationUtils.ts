// Calculation utilities for the ROI Calculator
import { CompanyBenchmarks, getBenchmarkData, getCompanySizeCategory } from './benchmarks';

export interface AssumptionValues {
  aiCallsPerWeek: number;
  minutesPerAiCall: number;
  contextSwitchesPerDay: number;
  minutesPerContextSwitch: number;
}

export interface InputValues {
  employees: number;
  averageSalary: number;
  timeSavedPercent: number;
  pricePerSeat: number;
}

export interface ToolCost {
  id: string;
  name: string;
  seatsCount: number;
  pricePerSeat: number;
}

export const defaultAssumptions: AssumptionValues = {
  aiCallsPerWeek: 20,
  minutesPerAiCall: 2,
  contextSwitchesPerDay: 4,
  minutesPerContextSwitch: 3,
};

export interface CalculationResults {
  annualCostSavings: number;
  roi: number;
  timeToProductivity: number;
  currentTimeSpent: number;
  notionTimeSpent: number;
  currentCost: number;
  notionCost: number;
  totalAnnualToolCost: number;
  hoursSavedPerEmployee: number;
  valueSavedPerEmployee: number;
  paybackPeriod: number;
  multiYearRoi: {
    year1: number;
    year3: number;
    year5: number;
  };
  existingToolsCost: number;
  
  // New benchmark data
  benchmarks: {
    companySizeCategory: string;
    timeToProductivity: {
      benchmark: number;
      percentile?: number;
    };
    pagesPerUser: {
      benchmark: number;
      p25: number;
      p75: number;
    };
    adoptionRate: {
      benchmark: number;
    };
    integrationsPerUser: {
      benchmark: number;
    };
    databaseUsage: {
      benchmark: number;
    };
  };
}

// Calculate ROI based on inputs and assumptions
export const calculateROI = (
  inputs: InputValues, 
  assumptions: AssumptionValues,
  existingTools: ToolCost[] = []
): CalculationResults => {
  const { employees, averageSalary, timeSavedPercent, pricePerSeat } = inputs;
  const { aiCallsPerWeek, minutesPerAiCall, contextSwitchesPerDay, minutesPerContextSwitch } = assumptions;

  // Calculate total salary cost
  const totalSalaryCost = employees * averageSalary;

  // Calculate time saved per week per user (in minutes)
  const aiTimeSaved = aiCallsPerWeek * minutesPerAiCall;
  const contextSwitchTimeSaved = contextSwitchesPerDay * minutesPerContextSwitch * 5; // 5 workdays per week
  const timeSavedPerWeekPerUser = aiTimeSaved + contextSwitchTimeSaved;

  // Calculate annual minutes saved across all employees
  const annualMinutesSaved = timeSavedPerWeekPerUser * 52 * employees;

  // Calculate cost per minute based on average salary
  // Assuming 2,080 working hours per year (40 hours/week * 52 weeks)
  const costPerMinute = averageSalary / (2080 * 60);

  // Calculate total cost savings
  const totalCostSaved = annualMinutesSaved * costPerMinute;

  // Calculate cost of existing tools
  const existingToolsCost = existingTools.reduce((acc, tool) => {
    return acc + (tool.seatsCount * tool.pricePerSeat * 12); // Annual cost
  }, 0);

  // Calculate estimated Notion cost based on price per seat
  const totalAnnualToolCost = employees * pricePerSeat * 12;

  // Calculate ROI percentage - including replacement of existing tools
  const roi = ((totalCostSaved + existingToolsCost) / totalAnnualToolCost) * 100;

  // Calculate multi-year ROI (simplified, assuming consistent savings)
  // In a real-world scenario, you might want to account for salary increases, etc.
  const year1Roi = roi;
  const year3Roi = ((totalCostSaved * 3 + existingToolsCost * 3) / (totalAnnualToolCost * 3)) * 100;
  const year5Roi = ((totalCostSaved * 5 + existingToolsCost * 5) / (totalAnnualToolCost * 5)) * 100;

  // Calculate time to productivity (in days)
  // Assuming 8 working hours per day
  const minutesPerWorkingDay = 8 * 60;
  const averageDailyTimeSaved = (timeSavedPerWeekPerUser * 52) / 260; // 260 working days per year
  
  // Replace the simplistic calculation with a more realistic one
  // The old calculation was giving unrealistically low values:
  // const timeToProductivity = minutesPerWorkingDay / averageDailyTimeSaved;
  
  // New calculation based on company size and adoption factors
  // Base time varies by company size (from benchmarks)
  const sizeCategory = getCompanySizeCategory(employees);
  const baseDays = getBenchmarkData(employees).timeToProductivity.days;
  
  // Additional factors that affect time to productivity:
  // 1. Company size adjustment (larger companies take longer to adopt)
  // 2. Complexity factor (more features = longer adoption)
  // 3. User readiness factor (based on time saved percentage as proxy)
  
  // This creates a more realistic estimate that's closer to benchmarks
  const timeToProductivity = baseDays * (1 - (timeSavedPercent / 300)); // Slight adjustment based on efficiency

  // For the bar chart comparisons
  const workHoursPerYear = 2080;
  const workMinutesPerYear = workHoursPerYear * 60;
  
  const currentTimeSpent = workMinutesPerYear;
  const notionTimeSpent = workMinutesPerYear * (1 - (timeSavedPercent / 100));
  
  const currentCost = averageSalary;
  const notionCost = averageSalary * (1 - (timeSavedPercent / 100));

  // Calculate hours saved per employee
  const hoursSavedPerEmployee = (workHoursPerYear * timeSavedPercent) / 100;
  
  // Calculate value saved per employee
  const valueSavedPerEmployee = hoursSavedPerEmployee * (averageSalary / workHoursPerYear);
  
  // Calculate payback period in months (how long until the tool pays for itself)
  const paybackPeriod = (pricePerSeat * 12) / valueSavedPerEmployee;
  
  // Get benchmark data for the company size
  const benchmarks = getBenchmarkData(employees);
  
  // Helper function to calculate percentile ranking
  const calculatePercentile = (value: number, benchmark: number): number => {
    // Simple calculation - better is lower for time to productivity, so invert ratio
    return Math.min(100, Math.max(0, (benchmark / value) * 50));
  };

  return {
    annualCostSavings: totalCostSaved,
    roi: roi,
    timeToProductivity: timeToProductivity,
    currentTimeSpent,
    notionTimeSpent,
    currentCost,
    notionCost,
    totalAnnualToolCost,
    hoursSavedPerEmployee,
    valueSavedPerEmployee,
    paybackPeriod,
    multiYearRoi: {
      year1: year1Roi,
      year3: year3Roi,
      year5: year5Roi
    },
    existingToolsCost,
    
    // Add benchmark data
    benchmarks: {
      companySizeCategory: sizeCategory,
      timeToProductivity: {
        benchmark: benchmarks.timeToProductivity.days,
        percentile: calculatePercentile(timeToProductivity, benchmarks.timeToProductivity.days)
      },
      pagesPerUser: {
        benchmark: benchmarks.pagesPerUser.median,
        p25: benchmarks.pagesPerUser.p25,
        p75: benchmarks.pagesPerUser.p75
      },
      adoptionRate: {
        benchmark: benchmarks.adoptionRate.median
      },
      integrationsPerUser: {
        benchmark: benchmarks.integrationsPerUser.median
      },
      databaseUsage: {
        benchmark: benchmarks.databaseUsage.median
      }
    }
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value / 100);
};
