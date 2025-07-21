'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { ProjectCreationWizard } from '../../../components/project-creation-wizard';
import { CreateProjectDialog } from '../../../components/create-project-dialog';

export default function CreateProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<string | null>(
    searchParams.get('type')
  );

  const handleProjectTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  const handleProjectComplete = (project: any) => {
    // Here you would typically save the project to your database
    console.log('Generated project:', project);
    
    // Redirect to the project page or dashboard
    router.push('/dashboard/projects');
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {!selectedType ? (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
                <p className="text-gray-600 mt-2">
                  Choose a project type and let our AI generate a complete application for you.
                </p>
              </div>
              
              <CreateProjectDialog onProjectCreate={handleProjectTypeSelect}>
                <div className="cursor-pointer">
                  {/* This will be replaced by the dialog content */}
                </div>
              </CreateProjectDialog>
            </div>
          </div>
        ) : (
          <ProjectCreationWizard
            projectType={selectedType}
            onBack={handleBack}
            onComplete={handleProjectComplete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
