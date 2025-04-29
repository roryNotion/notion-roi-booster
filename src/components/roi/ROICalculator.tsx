
import React, { useState, useEffect } from 'react';
import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';
import AssumptionsModal from './AssumptionsModal';
import { AssumptionValues, InputValues, defaultAssumptions, calculateROI } from '@/utils/calculationUtils';
import { useIsMobile } from '@/hooks/use-mobile';

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<InputValues>({
    employees: 100,
    averageSalary: 80000,
    timeSavedPercent: 15,
  });

  const [assumptions, setAssumptions] = useState<AssumptionValues>(defaultAssumptions);
  const [isAssumptionsModalOpen, setIsAssumptionsModalOpen] = useState(false);
  const [results, setResults] = useState(calculateROI(inputs, assumptions));
  
  const isMobile = useIsMobile();

  useEffect(() => {
    setResults(calculateROI(inputs, assumptions));
  }, [inputs, assumptions]);

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

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>This calculator provides an estimate of potential cost savings when using Notion AI for your team.</p>
      </div>
    </div>
  );
};

export default ROICalculator;
