
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { AssumptionValues } from '@/utils/calculationUtils';

interface AssumptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assumptions: AssumptionValues;
  onAssumptionsChange: (values: AssumptionValues) => void;
}

const AssumptionsModal: React.FC<AssumptionsModalProps> = ({
  isOpen,
  onClose,
  assumptions,
  onAssumptionsChange
}) => {
  const [localAssumptions, setLocalAssumptions] = React.useState<AssumptionValues>(assumptions);

  React.useEffect(() => {
    setLocalAssumptions(assumptions);
  }, [assumptions]);

  const handleInputChange = (field: keyof AssumptionValues, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    
    setLocalAssumptions({
      ...localAssumptions,
      [field]: numValue
    });
  };

  const handleSave = () => {
    onAssumptionsChange(localAssumptions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-notion-darkgray">Advanced Assumptions</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="space-y-2">
              <Label className="notion-label" htmlFor="aiCallsPerWeek">
                AI Calls per User per Week
              </Label>
              <Input
                id="aiCallsPerWeek"
                type="number"
                min="0"
                value={localAssumptions.aiCallsPerWeek}
                onChange={(e) => handleInputChange('aiCallsPerWeek', e.target.value)}
                className="notion-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="notion-label" htmlFor="minutesPerAiCall">
                Minutes Saved per AI Call
              </Label>
              <Input
                id="minutesPerAiCall"
                type="number"
                min="0"
                step="0.5"
                value={localAssumptions.minutesPerAiCall}
                onChange={(e) => handleInputChange('minutesPerAiCall', e.target.value)}
                className="notion-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="notion-label" htmlFor="contextSwitchesPerDay">
                Context Switches Avoided per Day
              </Label>
              <Input
                id="contextSwitchesPerDay"
                type="number"
                min="0"
                value={localAssumptions.contextSwitchesPerDay}
                onChange={(e) => handleInputChange('contextSwitchesPerDay', e.target.value)}
                className="notion-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="notion-label" htmlFor="minutesPerContextSwitch">
                Minutes Saved per Context Switch
              </Label>
              <Input
                id="minutesPerContextSwitch"
                type="number"
                min="0"
                step="0.5"
                value={localAssumptions.minutesPerContextSwitch}
                onChange={(e) => handleInputChange('minutesPerContextSwitch', e.target.value)}
                className="notion-input"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="notion-button" onClick={handleSave}>Apply Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssumptionsModal;
