
// Calculation utilities for the ROI Calculator

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
}

// Calculate ROI based on inputs and assumptions
export const calculateROI = (inputs: InputValues, assumptions: AssumptionValues): CalculationResults => {
  const { employees, averageSalary, timeSavedPercent } = inputs;
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

  // Calculate estimated Notion cost (for ROI calculation)
  // Simplified: Assuming $10 per user per month
  const estimatedNotionCost = employees * 10 * 12;

  // Calculate ROI percentage
  const roi = (totalCostSaved / estimatedNotionCost) * 100;

  // Calculate time to productivity (in days)
  // Assuming 8 working hours per day
  const minutesPerWorkingDay = 8 * 60;
  const averageDailyTimeSaved = (timeSavedPerWeekPerUser * 52) / 260; // 260 working days per year
  const timeToProductivity = minutesPerWorkingDay / averageDailyTimeSaved;

  // For the bar chart comparisons
  const workHoursPerYear = 2080;
  const workMinutesPerYear = workHoursPerYear * 60;
  
  const currentTimeSpent = workMinutesPerYear;
  const notionTimeSpent = workMinutesPerYear * (1 - (timeSavedPercent / 100));
  
  const currentCost = averageSalary;
  const notionCost = averageSalary * (1 - (timeSavedPercent / 100));

  return {
    annualCostSavings: totalCostSaved,
    roi: roi,
    timeToProductivity: timeToProductivity,
    currentTimeSpent,
    notionTimeSpent,
    currentCost,
    notionCost
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
