import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalculationResults, formatCurrency, formatPercent } from '@/utils/calculationUtils';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsPanelProps {
  results: CalculationResults;
}

// New component for benchmark comparison
const BenchmarkComparison: React.FC<{ results: CalculationResults }> = ({ results }) => {
  const { benchmarks } = results;

  if (!benchmarks) return null;
  
  return (
    <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-base font-semibold mb-2 text-notion-darkgray">How You Compare</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Based on data from similar {benchmarks.companySizeCategory}-sized companies using Notion
      </p>
      
      <div className="space-y-5">
        {/* Time to Productivity Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center">
              <span className="font-medium">Time to Productivity</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help ml-1">
                      <Info size={14} className="text-muted-foreground" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-medium">What this means:</p>
                    <p className="mb-2">The estimated time it takes for users to become fully productive with Notion. This varies by company size:</p>
                    <ul className="text-xs list-disc pl-4 mb-2">
                      <li>Small teams (≤50 people): ~14 days</li>
                      <li>Medium companies (201-500): ~28 days</li>
                      <li>Enterprises (1000+): ~42 days</li>
                    </ul>
                    
                    <p className="font-medium">Your performance:</p>
                    <p className="mb-2">Your team is estimated to reach productivity in <span className="font-medium">{Math.round(results.timeToProductivity)} days</span>, while similar companies typically take <span className="font-medium">{benchmarks.timeToProductivity.benchmark} days</span>.</p>
                    
                    <p className="font-medium">What's good:</p>
                    <p className="mb-2">{benchmarks.timeToProductivity.percentile > 50 ? 
                      "Your team is faster than average at adopting Notion, which means quicker ROI." : 
                      "Faster adoption times (fewer days) lead to quicker ROI and value realization."}</p>
                    
                    <p className="text-xs mt-2 font-medium">Formula: Based on analyzed data from thousands of companies using Notion, adjusted for your company's size and specific needs</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span>
              <span className="font-medium">{Math.round(results.timeToProductivity)} days</span>
              <span className="text-muted-foreground"> vs. benchmark {benchmarks.timeToProductivity.benchmark} days</span>
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500" 
              style={{ width: `${benchmarks.timeToProductivity.percentile}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {benchmarks.timeToProductivity.percentile > 50 
              ? `You're in the top ${Math.round(100 - benchmarks.timeToProductivity.percentile)}% for quick adoption`
              : `${Math.round(benchmarks.timeToProductivity.percentile)}% of similar companies reach productivity faster`}
          </p>
        </div>
        
        {/* Pages Per User Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center">
              <span className="font-medium">Pages Per User</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help ml-1">
                      <Info size={14} className="text-muted-foreground" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-medium">What this means:</p>
                    <p className="mb-2">The average number of pages created per active user, indicating content creation and platform adoption.</p>
                    
                    <p className="font-medium">Benchmark comparison:</p>
                    <p className="mb-2">Similar companies create an average of <span className="font-medium">{benchmarks.pagesPerUser.benchmark}</span> pages per user.</p>
                    
                    <p className="font-medium">What's good:</p>
                    <p className="mb-2">Higher numbers (above {benchmarks.pagesPerUser.p50}) indicate better adoption and more active usage of Notion. Top performers create {benchmarks.pagesPerUser.p75}+ pages per user.</p>
                    
                    <p className="text-xs mt-2 font-medium">Formula: totalPages ÷ numberOfActiveUsers</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-muted-foreground">{benchmarks.pagesPerUser.benchmark} pages (median)</span>
          </div>
          <div className="h-6 bg-gray-100 rounded-full relative mt-2">
            <div className="absolute left-0 top-0 bottom-0 h-full bg-blue-100 rounded-full"
                 style={{ width: '100%' }}>
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <span className="text-xs font-medium">{benchmarks.pagesPerUser.p25}</span>
                <span className="text-xs font-medium">{benchmarks.pagesPerUser.p75}</span>
              </div>
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-green-500 transform -translate-x-1/2"
                 style={{ left: '25%' }}>
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-blue-500 transform -translate-x-1/2"
                 style={{ left: '50%' }}>
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-green-500 transform -translate-x-1/2"
                 style={{ left: '75%' }}>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>25th percentile</span>
            <span>Median</span>
            <span>75th percentile</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            The more pages per user, the higher the engagement and return on Notion investment
          </p>
        </div>
        
        {/* Adoption Rate Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center">
              <span className="font-medium">Adoption Rate</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help ml-1">
                      <Info size={14} className="text-muted-foreground" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-medium">What this means:</p>
                    <p className="mb-2">The percentage of licensed users who actively use Notion, indicating license utilization efficiency.</p>
                    
                    <p className="font-medium">Benchmark comparison:</p>
                    <p className="mb-2">In similar {benchmarks.companySizeCategory}-sized companies, <span className="font-medium">{(benchmarks.adoptionRate.benchmark * 100).toFixed(0)}%</span> of paid seats actively use Notion.</p>
                    
                    <p className="font-medium">What's good:</p>
                    <p className="mb-2">Higher is better - best-performing companies achieve 85%+ adoption rates. Low adoption rates (below 60%) indicate underutilized licenses and potential wasted spend.</p>
                    
                    <p className="text-xs mt-2 font-medium">Formula: (activeUsers ÷ totalPaidSeats) × 100%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-muted-foreground">{(benchmarks.adoptionRate.benchmark * 100).toFixed(0)}% of paid seats actively use Notion</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, benchmarks.adoptionRate.benchmark * 100)}%` }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: 80%+ for optimal ROI (higher adoption = more value from each license)
          </p>
        </div>
        
        {/* Integrations Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center">
              <span className="font-medium">Tool Consolidation</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help ml-1">
                      <Info size={14} className="text-muted-foreground" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-medium">What this means:</p>
                    <p className="mb-2">The percentage of users who connect other tools to Notion through integrations, reducing context switching.</p>
                    
                    <p className="font-medium">Benchmark comparison:</p>
                    <p className="mb-2">In similar companies, <span className="font-medium">{(benchmarks.integrationsPerUser.benchmark * 100).toFixed(1)}%</span> of users connect Notion to other tools via integrations.</p>
                    
                    <p className="font-medium">What's good:</p>
                    <p className="mb-2">Companies with higher integration rates (60%+) report significantly higher productivity gains and ROI from their Notion investment.</p>
                    
                    <p className="text-xs mt-2 font-medium">Formula: (usersWithIntegrations ÷ totalUsers) × 100%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-muted-foreground">{(benchmarks.integrationsPerUser.benchmark * 100).toFixed(1)}% of users connect integrations</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, benchmarks.integrationsPerUser.benchmark * 100)}%` }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Each integration reduces context switching and improves workflow efficiency
          </p>
        </div>
      </div>
    </div>
  );
};

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  const {
    annualCostSavings,
    roi,
    timeToProductivity,
    currentTimeSpent,
    notionTimeSpent,
    currentCost,
    notionCost,
    totalAnnualToolCost,
    hoursSavedPerEmployee,
    valueSavedPerEmployee,
    paybackPeriod,
    multiYearRoi,
    existingToolsCost
  } = results;

  const [chartView, setChartView] = useState<'comparison' | 'roi'>('comparison');

  const timeAndCostChartData = [
    {
      name: 'Time',
      Current: currentTimeSpent,
      'With Notion': notionTimeSpent,
    },
    {
      name: 'Cost',
      Current: currentCost,
      'With Notion': notionCost,
    },
  ];

  const roiChartData = [
    {
      name: '1 Year',
      ROI: multiYearRoi.year1,
    },
    {
      name: '3 Years',
      ROI: multiYearRoi.year3,
    },
    {
      name: '5 Years',
      ROI: multiYearRoi.year5,
    },
  ];

  // Calculate compounded costs for 1, 3, and 5 years with 10% annual increase
  const getCompoundedCost = (base: number, years: number) => {
    let cost = base;
    for (let i = 1; i < years; i++) {
      cost *= 1.1;
    }
    return cost;
  };

  const costComparisonChartData = [
    {
      name: '1 Year',
      'Current Setup': existingToolsCost,
      'With Notion': totalAnnualToolCost,
    },
    {
      name: '3 Years',
      'Current Setup': getCompoundedCost(existingToolsCost, 3),
      'With Notion': getCompoundedCost(totalAnnualToolCost, 3),
    },
    {
      name: '5 Years',
      'Current Setup': getCompoundedCost(existingToolsCost, 5),
      'With Notion': getCompoundedCost(totalAnnualToolCost, 5),
    },
  ];

  return (
    <div className="notion-container p-6 space-y-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-notion-darkgray mb-4">ROI Results</h2>
      
      {/* Combined ROI Results Card */}
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-base font-semibold mb-2 text-notion-darkgray">ROI Summary</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Key metrics showing the value and return on investment for implementing Notion
        </p>
        
        <div className="space-y-5">
          {/* Annual Cost Savings */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                <span className="font-medium">Annual Cost Savings</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help ml-1">
                        <Info size={14} className="text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>The total monetary value of time saved across all employees in one year based on their average salary and time saved percentage.</p>
                      <p className="text-xs mt-2 font-medium">Formula: hoursSavedPerEmployee × numberOfEmployees × averageHourlyRate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{formatCurrency(annualCostSavings)}</span>
            </div>
          </div>
          
          {/* Annual Tool Cost */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                <span className="font-medium">Annual Tool Cost</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help ml-1">
                        <Info size={14} className="text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>The total yearly cost of Notion licenses for all employees.</p>
                      <p className="text-xs mt-2 font-medium">Formula: monthlyLicenseCost × 12 × numberOfUsers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{formatCurrency(totalAnnualToolCost)}</span>
            </div>
          </div>
          
          {/* Existing Tools Cost */}
          {existingToolsCost > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center">
                  <span className="font-medium">Existing Tools Cost (Annual)</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help ml-1">
                          <Info size={14} className="text-muted-foreground" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>The annual cost of all existing tools that would be replaced by Notion.</p>
                        <p className="text-xs mt-2 font-medium">Formula: Sum of annual costs for all tools being replaced</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium">{formatCurrency(existingToolsCost)}</span>
              </div>
            </div>
          )}
          
          {/* Return on Investment */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                <span className="font-medium">Return on Investment</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help ml-1">
                        <Info size={14} className="text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Annual cost savings divided by the annual tool cost, representing how many times the investment is returned.</p>
                      <p className="text-xs mt-2 font-medium">Formula: annualCostSavings ÷ totalAnnualToolCost</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{formatPercent(roi)}</span>
            </div>
          </div>
          
          {/* Hours Saved Per Employee */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                <span className="font-medium">Hours Saved Per Employee (Annually)</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help ml-1">
                        <Info size={14} className="text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>The number of work hours each employee saves in a year by using Notion AI.</p>
                      <p className="text-xs mt-2 font-medium">Formula: hoursWorkedPerYear × efficiencyImprovement%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{Math.round(hoursSavedPerEmployee)} hours</span>
            </div>
          </div>
          
          {/* Value Saved Per Employee */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                <span className="font-medium">Value Saved Per Employee</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help ml-1">
                        <Info size={14} className="text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>The monetary value of time saved per employee based on their average salary.</p>
                      <p className="text-xs mt-2 font-medium">Formula: hoursSavedPerEmployee × averageHourlyRate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{formatCurrency(valueSavedPerEmployee)}</span>
            </div>
          </div>
          
          {/* Payback Period */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                <span className="font-medium">Payback Period</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help ml-1">
                        <Info size={14} className="text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>How long it takes for the cost savings to equal the investment in Notion licenses.</p>
                      <p className="text-xs mt-2 font-medium">Formula: (totalAnnualToolCost ÷ annualCostSavings) × 12 months</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{paybackPeriod.toFixed(1)} months</span>
            </div>
          </div>
          
          {/* Time to Productivity */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                <span className="font-medium">Time to Productivity</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help ml-1">
                        <Info size={14} className="text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>The estimated number of days until users become fully productive with Notion AI. This is typically {Math.round(timeToProductivity)} days for a company of your size.</p>
                      <p className="text-xs mt-2 font-medium">Formula: Based on company size, with slight adjustments for your specific needs. Smaller companies (≤50 employees) typically need 14 days, while enterprises (1000+ employees) may need 42 days.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{Math.round(timeToProductivity)} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Comparison Section */}
      {results.benchmarks && <BenchmarkComparison results={results} />}

      <div className="flex-grow mt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Visualisation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={costComparisonChartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <RechartsTooltip formatter={(value) => [formatCurrency(Number(value))]} />
            <Legend />
            <Bar dataKey="Current Setup" fill="#37352F" />
            <Bar dataKey="With Notion" fill="#2383E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsPanel;
