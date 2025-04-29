
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

      <div className="flex-grow mt-4">
        <Tabs defaultValue="comparison" onValueChange={(value) => setChartView(value as 'comparison' | 'roi')}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Visualization</h3>
            <TabsList>
              <TabsTrigger value="comparison">Time & Cost</TabsTrigger>
              <TabsTrigger value="roi">Multi-Year ROI</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="comparison" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeAndCostChartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip formatter={(value, name) => {
                  if (name === "Time") {
                    return [`${Math.round(Number(value) / 60)} hours`, name];
                  }
                  return [formatCurrency(Number(value)), name];
                }} />
                <Legend />
                <Bar dataKey="Current" fill="#37352F" />
                <Bar dataKey="With Notion" fill="#2383E2" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="roi" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roiChartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${Math.round(value / 100)}%`} />
                <RechartsTooltip 
                  formatter={(value) => [formatPercent(Number(value)), "ROI"]}
                />
                <Bar dataKey="ROI" fill="#2383E2" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-notion-darkgray mb-2">Qualitative Benefits</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Improved employee satisfaction and reduced burnout</li>
          <li>Higher quality of deliverables and documentation</li>
          <li>Better knowledge sharing and collaboration</li>
          <li>Faster decision-making and increased project throughput</li>
          <li>Reduced employee churn and training costs</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsPanel;
