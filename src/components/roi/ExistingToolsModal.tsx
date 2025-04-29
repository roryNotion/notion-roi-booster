
import React, { useState, useEffect } from 'react';
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
import { ToolCost } from '@/utils/calculationUtils';
import { Trash, Plus } from 'lucide-react';

interface ExistingToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolCost[];
  onToolsChange: (tools: ToolCost[]) => void;
}

const ExistingToolsModal: React.FC<ExistingToolsModalProps> = ({
  isOpen,
  onClose,
  tools,
  onToolsChange
}) => {
  const [localTools, setLocalTools] = useState<ToolCost[]>(tools);

  useEffect(() => {
    setLocalTools(tools);
  }, [tools]);

  const handleAddTool = () => {
    setLocalTools([
      ...localTools,
      { 
        id: `tool-${Date.now()}`, 
        name: '', 
        seatsCount: 0, 
        pricePerSeat: 0 
      }
    ]);
  };

  const handleRemoveTool = (id: string) => {
    setLocalTools(localTools.filter(tool => tool.id !== id));
  };

  const handleToolChange = (id: string, field: keyof ToolCost, value: string | number) => {
    setLocalTools(localTools.map(tool => {
      if (tool.id === id) {
        return { ...tool, [field]: value };
      }
      return tool;
    }));
  };

  const handleSave = () => {
    onToolsChange(localTools);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-notion-darkgray">Existing Tools</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <p className="text-sm text-muted-foreground">
            Add the tools your customer is currently using that Notion AI would replace.
          </p>
          
          {localTools.map((tool, index) => (
            <div key={tool.id} className="grid grid-cols-[1fr,auto,auto,auto] gap-3 items-center">
              <div>
                <Label htmlFor={`tool-name-${index}`} className="sr-only">Tool Name</Label>
                <Input
                  id={`tool-name-${index}`}
                  placeholder="Tool name"
                  value={tool.name}
                  onChange={(e) => handleToolChange(tool.id, 'name', e.target.value)}
                  className="notion-input"
                />
              </div>
              
              <div>
                <Label htmlFor={`tool-seats-${index}`} className="sr-only">Seats</Label>
                <Input
                  id={`tool-seats-${index}`}
                  type="number"
                  placeholder="# of seats"
                  min="0"
                  value={tool.seatsCount || ''}
                  onChange={(e) => handleToolChange(tool.id, 'seatsCount', parseInt(e.target.value) || 0)}
                  className="notion-input w-24"
                />
              </div>
              
              <div>
                <Label htmlFor={`tool-price-${index}`} className="sr-only">Price per Seat</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">$</span>
                  <Input
                    id={`tool-price-${index}`}
                    type="number"
                    placeholder="Price/seat"
                    min="0"
                    step="0.01"
                    value={tool.pricePerSeat || ''}
                    onChange={(e) => handleToolChange(tool.id, 'pricePerSeat', parseFloat(e.target.value) || 0)}
                    className="notion-input pl-7 w-28"
                  />
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveTool(tool.id)}
                className="text-muted-foreground hover:text-red-500"
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={handleAddTool}
            className="flex items-center gap-2 w-full"
          >
            <Plus size={16} />
            Add Tool
          </Button>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="notion-button" onClick={handleSave}>Apply Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExistingToolsModal;
