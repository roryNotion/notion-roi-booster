
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputValues } from '@/utils/calculationUtils';

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
          <Label className="notion-label" htmlFor="employees">
            Number of Employees
          </Label>
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
          <Label className="notion-label" htmlFor="averageSalary">
            Average Annual Salary ($)
          </Label>
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
          <Label className="notion-label" htmlFor="timeSavedPercent">
            Time Saved Using AI (%)
          </Label>
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
      </div>
    </div>
  );
};

export default InputPanel;
