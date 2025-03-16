import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const StudentCard = ({ student }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{student.name}</CardTitle>
          <Badge variant={student.year === 'Final Year' ? 'destructive' : 'default'}>
            {student.year}
          </Badge>
        </div>
        <CardDescription>{student.department}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Roll Number:</span>
            <span className="text-sm">{student.rollNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm">{student.email}</span>
          </div>
          {student.achievements && student.achievements.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium mb-1">Achievements:</h4>
              <div className="flex flex-wrap gap-1">
                {student.achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
