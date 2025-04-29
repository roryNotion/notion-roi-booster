
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalculationResults, formatCurrency, formatPercent } from '@/utils/calculationUtils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
    notionCost
  } = results;

  const chartData = [
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

  return (
    <div className="notion-container p-6 space-y-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-notion-darkgray mb-4">ROI Results</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="notion-card">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Annual Cost Savings</h3>
            <p className="text-2xl font-bold text-notion-darkgray">{formatCurrency(annualCostSavings)}</p>
          </CardContent>
        </Card>

        <Card className="notion-card">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Return on Investment</h3>
            <p className="text-2xl font-bold text-notion-darkgray">{formatPercent(roi)}</p>
          </CardContent>
        </Card>

        <Card className="notion-card">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Time to Productivity</h3>
            <p className="text-2xl font-bold text-notion-darkgray">{Math.round(timeToProductivity)} days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex-grow mt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Comparison: Current vs. With Notion</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
              <Tooltip formatter={(value, name) => {
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
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
