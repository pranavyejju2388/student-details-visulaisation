
import { useState } from "react";
import { BarChart4, PieChart,  BarChart } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const VisualizationSelector = ({ onSelect, defaultType = "bar" }) => {
  const [selected, setSelected] = useState(defaultType);
  
  const handleSelect = (type) => {
    setSelected(type);
    onSelect(type);
  };
  
  const visualizationTypes = [
    { type: "bar", icon: <BarChart className="h-4 w-4" />, label: "Bar Chart" },
    { type: "pie", icon: <PieChart className="h-4 w-4" />, label: "Pie Chart" },
  ];

  return (
    <div className="inline-flex items-center p-1 space-x-1 bg-muted/50 rounded-lg">
      {visualizationTypes.map((viz) => (
        <Button
          key={viz.type}
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center justify-center px-3 py-1.5 text-xs transition-all",
            selected === viz.type && "bg-white text-foreground shadow-sm"
          )}
          onClick={() => handleSelect(viz.type)}
        >
          {viz.icon}
          <span className="ml-1.5">{viz.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default VisualizationSelector;
