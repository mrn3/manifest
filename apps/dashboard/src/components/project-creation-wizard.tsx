'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Zap, 
  CheckCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ProjectCreationWizardProps {
  projectType: string;
  onBack: () => void;
  onComplete: (project: any) => void;
}

export function ProjectCreationWizard({ projectType, onBack, onComplete }: ProjectCreationWizardProps) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: [] as string[],
    framework: '',
    database: '',
    styling: 'tailwindcss',
    authentication: false,
    payments: false,
    realtime: false,
  });

  const frameworks = [
    { id: 'nextjs', name: 'Next.js', description: 'React framework with SSR' },
    { id: 'react', name: 'React', description: 'Popular UI library' },
    { id: 'vue', name: 'Vue.js', description: 'Progressive framework' },
    { id: 'svelte', name: 'Svelte', description: 'Compile-time framework' },
  ];

  const databases = [
    { id: 'postgresql', name: 'PostgreSQL', description: 'Powerful relational database' },
    { id: 'supabase', name: 'Supabase', description: 'Firebase alternative' },
    { id: 'mongodb', name: 'MongoDB', description: 'NoSQL document database' },
    { id: 'sqlite', name: 'SQLite', description: 'Lightweight database' },
  ];

  const availableFeatures = [
    'User authentication',
    'Payment processing',
    'Real-time updates',
    'File uploads',
    'Email notifications',
    'Search functionality',
    'Admin dashboard',
    'API endpoints',
    'Mobile responsive',
    'SEO optimization',
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate AI generation process with real API call
      const steps = [
        'Analyzing requirements...',
        'Selecting optimal architecture...',
        'Generating project structure...',
        'Creating components...',
        'Setting up database schema...',
        'Configuring authentication...',
        'Optimizing code...',
        'Finalizing project...'
      ];

      // Show progress simulation
      for (let i = 0; i < steps.length - 1; i++) {
        setGenerationStep(steps[i]);
        setGenerationProgress((i + 1) / steps.length * 80); // Leave 20% for API call
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setGenerationStep('Finalizing project...');
      setGenerationProgress(90);

      // Make API call to generate project
      const response = await fetch('/api/projects/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          type: projectType,
          framework: formData.framework,
          database: formData.database,
          styling: formData.styling,
          features: formData.features,
          authentication: formData.authentication,
          payments: formData.payments,
          realtime: formData.realtime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate project');
      }

      const result = await response.json();
      setGenerationProgress(100);

      setIsGenerating(false);
      onComplete(result.project);
    } catch (error) {
      console.error('Generation failed:', error);
      setIsGenerating(false);
      // Handle error - you might want to show an error message
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <CardTitle className="text-2xl">Generating Your Project</CardTitle>
            <CardDescription>
              Our AI is creating your {projectType} application with all the features you requested.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{generationStep}</span>
                <span>{Math.round(generationProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
              This usually takes 30-60 seconds...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Templates
        </Button>
        <h1 className="text-2xl font-bold">Create {projectType} Project</h1>
        <p className="text-gray-600">Configure your project settings and let AI generate your application.</p>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Tell us about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Awesome Project"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what your project should do..."
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.description}
              >
                Next: Choose Tech Stack
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Choose your preferred technologies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Framework</label>
              <div className="grid grid-cols-2 gap-3">
                {frameworks.map((framework) => (
                  <button
                    key={framework.id}
                    onClick={() => setFormData(prev => ({ ...prev, framework: framework.id }))}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      formData.framework === framework.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{framework.name}</div>
                    <div className="text-sm text-gray-600">{framework.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Database</label>
              <div className="grid grid-cols-2 gap-3">
                {databases.map((database) => (
                  <button
                    key={database.id}
                    onClick={() => setFormData(prev => ({ ...prev, database: database.id }))}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      formData.database === database.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{database.name}</div>
                    <div className="text-sm text-gray-600">{database.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!formData.framework || !formData.database}
              >
                Next: Features
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Features & Integrations</CardTitle>
            <CardDescription>Select the features you want to include</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Features</label>
              <div className="grid grid-cols-2 gap-2">
                {availableFeatures.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => handleFeatureToggle(feature)}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      formData.features.includes(feature)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      {formData.features.includes(feature) && (
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                      )}
                      <span className="text-sm">{feature}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Generate Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
