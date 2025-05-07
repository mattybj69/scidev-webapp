'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Temporary mock data - will be replaced with Firebase data
const mockProjects = [
  { id: '1', number: 'PRJ001', name: 'Water Treatment Plant A', client: 'Client A' },
  { id: '2', number: 'PRJ002', name: 'Water Treatment Plant B', client: 'Client B' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 text-white p-4 flex flex-col h-full">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold mb-8 hover:text-slate-300 transition-colors">
        Project Dashboard
      </Link>

      {/* Project List */}
      <div className="space-y-2 flex-1">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={cn(
              "block p-2 rounded hover:bg-slate-800 transition-colors",
              pathname === `/projects/${project.id}` && "bg-slate-800"
            )}
          >
            <div className="text-sm font-medium">{project.number}</div>
            <div className="text-xs text-slate-400">{project.name}</div>
            <div className="text-xs text-slate-500">{project.client}</div>
          </Link>
        ))}
      </div>

      {/* Create Project Button */}
      <Link href="/projects/new">
        <Button className="w-full bg-slate-800 hover:bg-slate-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </Link>
    </div>
  );
} 