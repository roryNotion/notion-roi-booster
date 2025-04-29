
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Cog, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputValues } from '@/utils/calculationUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InputPanelProps {
  inputs: InputValues;
  onChange: (inputs: InputValues) => void;
  onOpenAssumptions: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ 
  inputs, 
  onChange,
  onOpenAssumptions
}) => {
  const handleInputChange = (field: keyof InputValues, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    
    onChange({
      ...inputs,
      [field]: numValue
    });
  };

  return (
    <div className="notion-container p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-notion-darkgray">Input Parameters</h2>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onOpenAssumptions}
          className="h-9 w-9 rounded-full"
        >
          <Cog className="h-5 w-5" />
          <span className="sr-only">Open assumptions</span>
        </Button>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="notion-label" htmlFor="employees">
              Number of Employees
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <Info size={16} className="text-muted-foreground" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>The total number of employees who will be using Notion AI in your organization.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="employees"
            type="number"
            min="1"
            placeholder="Enter number of employees"
            value={inputs.employees || ''}
            onChange={(e) => handleInputChange('employees', e.target.value)}
            className="notion-input"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="notion-label" htmlFor="averageSalary">
              Average Annual Salary ($)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <Info size={16} className="text-muted-foreground" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>The average annual salary of employees who will use Notion AI. This helps calculate the monetary value of time saved.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="averageSalary"
            type="number"
            min="0"
            placeholder="Enter average salary"
            value={inputs.averageSalary || ''}
            onChange={(e) => handleInputChange('averageSalary', e.target.value)}
            className="notion-input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Default: $80,000/year
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="notion-label" htmlFor="timeSavedPercent">
              Time Saved Using AI (%)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <Info size={16} className="text-muted-foreground" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>The percentage of time each employee saves by using Notion AI. Industry benchmarks suggest 15-30% based on internal usage data.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="timeSavedPercent"
            type="number"
            min="0"
            max="100"
            placeholder="Enter percentage"
            value={inputs.timeSavedPercent || ''}
            onChange={(e) => handleInputChange('timeSavedPercent', e.target.value)}
            className="notion-input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Default: 15%
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="notion-label" htmlFor="pricePerSeat">
              Price Per Seat Per Month ($)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <Info size={16} className="text-muted-foreground" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>The monthly cost per user for Notion licenses. This is used to calculate the total tool cost and ROI.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="pricePerSeat"
            type="number"
            min="0"
            placeholder="Enter price per seat"
            value={inputs.pricePerSeat || ''}
            onChange={(e) => handleInputChange('pricePerSeat', e.target.value)}
            className="notion-input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Default: $10/user/month
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
