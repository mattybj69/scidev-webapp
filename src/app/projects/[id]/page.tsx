'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, startOfWeek, endOfWeek, eachWeekOfInterval, isSameWeek } from 'date-fns';

interface Project {
  id: string;
  number: string;
  name: string;
  client: string;
  startDate: string;
}

interface WeeklyReport {
  id: string;
  weekStart: Date;
  weekEnd: Date;
  status: 'completed' | 'missed' | 'current';
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [weeklyReports, setWeeklyReports] = useState<WeeklyReport[]>([]);

  useEffect(() => {
    // TODO: Replace with Firebase fetch
    // Mock data for now
    setProject({
      id: params.id,
      number: 'PRJ001',
      name: 'Water Treatment Plant A',
      client: 'Client A',
      startDate: '2024-01-01',
    });

    // Generate weekly reports from project start date to now
    const startDate = new Date('2024-01-01');
    const endDate = new Date();
    const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 6 }); // Start on Saturday

    const reports = weeks.map((weekStart) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 6 });
      const isCurrentWeek = isSameWeek(new Date(), weekStart, { weekStartsOn: 6 });
      
      return {
        id: `week-${format(weekStart, 'yyyy-MM-dd')}`,
        weekStart,
        weekEnd,
        status: isCurrentWeek ? 'current' as const : 'missed' as const, // TODO: Check if report exists in Firebase
      };
    });

    setWeeklyReports(reports);
  }, [params.id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">
          {project.number} - {project.name} - {project.client}
        </h1>
      </div>

      {/* Weekly Report Summaries */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Report Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyReports.map((report) => (
              <div
                key={report.id}
                className={`
                  p-4 rounded-lg border
                  ${report.status === 'completed' ? 'bg-green-50 border-green-200' : ''}
                  ${report.status === 'missed' ? 'bg-red-50 border-red-200' : ''}
                  ${report.status === 'current' ? 'bg-blue-50 border-blue-200' : ''}
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      Week of {format(report.weekStart, 'MMM d, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(report.weekStart, 'MMM d')} - {format(report.weekEnd, 'MMM d, yyyy')}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className={`
                      ${report.status === 'completed' ? 'text-green-700' : ''}
                      ${report.status === 'missed' ? 'text-red-700' : ''}
                      ${report.status === 'current' ? 'text-blue-700' : ''}
                    `}
                  >
                    {report.status === 'completed' ? 'View Report' : 'Create Report'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 