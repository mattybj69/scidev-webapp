'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createProject } from '@/lib/firebase/projects';

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const projectData = {
      name: formData.get('name') as string,
      projectNumber: formData.get('projectNumber') as string,
      client: formData.get('client') as string,
      projectManager: formData.get('projectManager') as string,
      projectEngineer: formData.get('projectEngineer') as string,
      siteEngineer: formData.get('siteEngineer') as string,
      startDate: new Date(formData.get('startDate') as string),
    };

    try {
      await createProject(projectData);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" name="name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectNumber">Project Number</Label>
            <Input id="projectNumber" name="projectNumber" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input id="client" name="client" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectManager">Project Manager</Label>
            <Input id="projectManager" name="projectManager" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectEngineer">Project Engineer</Label>
            <Input id="projectEngineer" name="projectEngineer" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteEngineer">Site Engineer</Label>
            <Input id="siteEngineer" name="siteEngineer" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Project Start Date</Label>
            <Input id="startDate" name="startDate" type="date" required />
          </div>

          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Project'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 