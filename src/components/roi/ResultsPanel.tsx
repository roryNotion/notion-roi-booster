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
      
      <div className="space-y-4">
        {/* Time to Productivity Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Time to Productivity</span>
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
              ? "You're faster than average at getting productive with Notion"
              : "Most similar companies reach productivity in fewer days"}
          </p>
        </div>
        
        {/* Pages Per User Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Expected Pages Per User</span>
            <span className="text-muted-foreground">{benchmarks.pagesPerUser.benchmark} pages (median)</span>
          </div>
          <div className="h-6 bg-gray-100 rounded-full relative">
            <div className="absolute top-0 bottom-0 w-0.5 bg-green-500 transform -translate-x-1/2"
                 style={{ left: '25%' }}>
              <div className="absolute top-full mt-1 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                25th percentile: {benchmarks.pagesPerUser.p25}
              </div>
            </div>
            <div className="absolute top-0 bottom-0 w-0.5 bg-green-500 transform -translate-x-1/2"
                 style={{ left: '50%' }}>
              <div className="absolute top-full mt-1 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                Median: {benchmarks.pagesPerUser.benchmark}
              </div>
            </div>
            <div className="absolute top-0 bottom-0 w-0.5 bg-green-500 transform -translate-x-1/2"
                 style={{ left: '75%' }}>
              <div className="absolute top-full mt-1 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                75th percentile: {benchmarks.pagesPerUser.p75}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-5">
            Most {benchmarks.companySizeCategory}-sized companies create between {benchmarks.pagesPerUser.p25} and {benchmarks.pagesPerUser.p75} pages per user
          </p>
        </div>
        
        {/* Database Usage Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Expected Database Usage</span>
            <span className="text-muted-foreground">{benchmarks.databaseUsage.benchmark} databases per team</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This indicates how structured content is created and organized in Notion by similar companies
          </p>
        </div>
        
        {/* Integrations Comparison */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Expected Tool Consolidation</span>
            <span className="text-muted-foreground">{(benchmarks.integrationsPerUser.benchmark * 100).toFixed(1)}% of users connect integrations</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This shows how many other tools companies typically integrate with Notion
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

  const MetricCard = ({ title, value, tooltip }: { title: string, value: string | number, tooltip: string }) => (
    <Card className="notion-card">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  <Info size={16} className="text-muted-foreground" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-2xl font-bold text-notion-darkgray">{value}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="notion-container p-6 space-y-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-notion-darkgray mb-4">ROI Results</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <MetricCard 
          title="Annual Cost Savings" 
          value={formatCurrency(annualCostSavings)}
          tooltip="The total monetary value of time saved across all employees in one year based on their average salary and time saved percentage."
        />

        <MetricCard 
          title="Annual Tool Cost" 
          value={formatCurrency(totalAnnualToolCost)}
          tooltip="The total yearly cost of Notion licenses for all employees."
        />

        {existingToolsCost > 0 && (
          <MetricCard 
            title="Existing Tools Cost (Annual)" 
            value={formatCurrency(existingToolsCost)}
            tooltip="The annual cost of all existing tools that would be replaced by Notion."
          />
        )}

        <MetricCard 
          title="Return on Investment" 
          value={formatPercent(roi)}
          tooltip="Annual cost savings divided by the annual tool cost, representing how many times the investment is returned."
        />
        
        <MetricCard 
          title="Hours Saved Per Employee (Annually)" 
          value={`${Math.round(hoursSavedPerEmployee)} hours`}
          tooltip="The number of work hours each employee saves in a year by using Notion AI."
        />
        
        <MetricCard 
          title="Value Saved Per Employee" 
          value={formatCurrency(valueSavedPerEmployee)}
          tooltip="The monetary value of time saved per employee based on their average salary."
        />

        <MetricCard 
          title="Payback Period" 
          value={`${paybackPeriod.toFixed(1)} months`}
          tooltip="How long it takes for the cost savings to equal the investment in Notion licenses."
        />

        <MetricCard 
          title="Time to Productivity" 
          value={`${Math.round(timeToProductivity)} days`}
          tooltip="The estimated number of days until users become fully productive with Notion AI."
        />
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
