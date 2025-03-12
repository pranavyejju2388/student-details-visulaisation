import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { cn } from "../lib/utils";

const StatCard = ({ title, value, description, icon, className, trend }) => {
  return (
    <Card className={cn("stat-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p
            className={cn(
              "text-xs font-medium mt-2 flex items-center",
              trend.positive ? "text-success" : "text-destructive"
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}%
            <span className="text-muted-foreground ml-1">vs last period</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
