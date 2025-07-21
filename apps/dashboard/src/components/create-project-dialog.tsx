'use client';

import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Plus, 
  Zap, 
  ShoppingCart, 
  FileText, 
  User, 
  BarChart3,
  Users,
  Globe,
  Book,
  Smartphone,
  ArrowRight
} from 'lucide-react';

const projectTypes = [
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Online store with products, cart, and payments',
    icon: ShoppingCart,
    features: ['Product catalog', 'Shopping cart', 'Payment processing', 'Order management'],
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'blog',
    name: 'Blog Website',
    description: 'Content management with posts and comments',
    icon: FileText,
    features: ['Post management', 'Comments', 'Categories', 'SEO optimization'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Site',
    description: 'Personal or professional portfolio showcase',
    icon: User,
    features: ['Project showcase', 'About page', 'Contact form', 'Resume'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    description: 'Data visualization and reporting platform',
    icon: BarChart3,
    features: ['Charts & graphs', 'Real-time data', 'User management', 'Export tools'],
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'social',
    name: 'Social Platform',
    description: 'Social networking with posts and interactions',
    icon: Users,
    features: ['User profiles', 'Posts & comments', 'Following system', 'Messaging'],
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    id: 'saas',
    name: 'SaaS Application',
    description: 'Software as a Service with subscriptions',
    icon: Zap,
    features: ['User authentication', 'Subscription billing', 'API access', 'Admin panel'],
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Marketing website with lead generation',
    icon: Globe,
    features: ['Hero section', 'Features showcase', 'Testimonials', 'Contact forms'],
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    id: 'docs',
    name: 'Documentation Site',
    description: 'Technical documentation with search',
    icon: Book,
    features: ['Navigation', 'Search', 'Code highlighting', 'Version control'],
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
];

interface CreateProjectDialogProps {
  children: React.ReactNode;
  onProjectCreate?: (projectType: string) => void;
}

export function CreateProjectDialog({ children, onProjectCreate }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleProjectSelect = (projectType: string) => {
    setSelectedType(projectType);
    // Here we would navigate to the detailed project creation form
    onProjectCreate?.(projectType);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Zap className="h-6 w-6 mr-2 text-blue-600" />
            Create New Project with AI
          </DialogTitle>
          <DialogDescription>
            Choose a project type and let our AI generate a complete application for you.
            Each template includes modern frameworks, best practices, and production-ready code.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {projectTypes.map((type) => (
            <Card 
              key={type.id} 
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              onClick={() => handleProjectSelect(type.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-full ${type.bgColor} mb-3`}>
                    <type.icon className={`h-6 w-6 ${type.color}`} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
                <CardTitle className="text-lg">{type.name}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Includes:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {type.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-1.5 w-1.5 bg-gray-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                    {type.features.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{type.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">AI-Powered Generation</h4>
              <p className="text-sm text-blue-700 mt-1">
                Our AI will analyze your requirements and generate a complete, production-ready application 
                with modern frameworks, best practices, and clean code. You can customize everything after generation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500">
            Need something custom? You can describe your own project requirements.
          </p>
          <Button variant="outline">
            Custom Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
