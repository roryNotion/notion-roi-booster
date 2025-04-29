
import React, { useState, useEffect } from 'react';
import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';
import AssumptionsModal from './AssumptionsModal';
import ExistingToolsModal from './ExistingToolsModal';
import { AssumptionValues, InputValues, ToolCost, defaultAssumptions, calculateROI } from '@/utils/calculationUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Settings, List } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<InputValues>({
    employees: 100,
    averageSalary: 80000,
    timeSavedPercent: 15,
    pricePerSeat: 10, // Default price per seat
  });

  const [assumptions, setAssumptions] = useState<AssumptionValues>(defaultAssumptions);
  const [isAssumptionsModalOpen, setIsAssumptionsModalOpen] = useState(false);
  const [existingTools, setExistingTools] = useState<ToolCost[]>([]);
  const [isExistingToolsModalOpen, setIsExistingToolsModalOpen] = useState(false);
  const [results, setResults] = useState(calculateROI(inputs, assumptions, existingTools));
  
  const isMobile = useIsMobile();

  useEffect(() => {
    setResults(calculateROI(inputs, assumptions, existingTools));
  }, [inputs, assumptions, existingTools]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8 text-notion-darkgray">Notion ROI Calculator</h1>
      
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'}`}>
        <div>
          <InputPanel 
            inputs={inputs}
            onChange={setInputs}
            onOpenAssumptions={() => setIsAssumptionsModalOpen(true)}
          />
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-notion-darkgray">Tool Replacement</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsExistingToolsModalOpen(true)}
                className="flex items-center gap-2"
              >
                <List size={16} />
                Manage Tools
              </Button>
            </div>
            
            {existingTools.length > 0 ? (
              <div className="space-y-2">
                {existingTools.map((tool) => (
                  <div key={tool.id} className="flex justify-between text-sm">
                    <span>{tool.name || 'Unnamed Tool'}</span>
                    <span className="font-medium">
                      {tool.seatsCount} seats × ${tool.pricePerSeat}/mo = ${(tool.seatsCount * tool.pricePerSeat).toFixed(0)}/mo
                    </span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-border flex justify-between font-medium">
                  <span>Total Annual Cost:</span>
                  <span>${Math.round(results.existingToolsCost).toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No existing tools added. Click "Manage Tools" to add tools that Notion would replace.
              </p>
            )}
          </div>
        </div>
        
        <div>
          <ResultsPanel results={results} />
        </div>
      </div>
      
      <AssumptionsModal
        isOpen={isAssumptionsModalOpen}
        onClose={() => setIsAssumptionsModalOpen(false)}
        assumptions={assumptions}
        onAssumptionsChange={setAssumptions}
      />
      
      <ExistingToolsModal
        isOpen={isExistingToolsModalOpen}
        onClose={() => setIsExistingToolsModalOpen(false)}
        tools={existingTools}
        onToolsChange={setExistingTools}
      />

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>This calculator provides an estimate of potential cost savings when using Notion AI for your team.</p>
      </div>
    </div>
  );
};

export default ROICalculator;
