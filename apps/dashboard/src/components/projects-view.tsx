'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Globe,
  GitBranch,
  Calendar,
  Users,
  Settings,
  ExternalLink,
  FolderOpen
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'AI-generated online store with payment integration and inventory management',
    status: 'deployed',
    lastUpdated: '2 hours ago',
    url: 'https://ecommerce-demo.manifest.app',
    framework: 'Next.js',
    database: 'PostgreSQL',
    collaborators: 3,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'Collaborative task tracker with real-time updates and team management',
    status: 'building',
    lastUpdated: '1 day ago',
    url: null,
    framework: 'React',
    database: 'MongoDB',
    collaborators: 2,
    createdAt: '2024-01-10',
  },
  {
    id: 3,
    name: 'Portfolio Website',
    description: 'Personal portfolio with blog, contact form, and project showcase',
    status: 'deployed',
    lastUpdated: '3 days ago',
    url: 'https://portfolio-demo.manifest.app',
    framework: 'Next.js',
    database: 'Supabase',
    collaborators: 1,
    createdAt: '2024-01-05',
  },
  {
    id: 4,
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization and reporting with custom charts',
    status: 'draft',
    lastUpdated: '1 week ago',
    url: null,
    framework: 'Vue.js',
    database: 'PostgreSQL',
    collaborators: 4,
    createdAt: '2023-12-28',
  },
  {
    id: 5,
    name: 'Social Media App',
    description: 'Instagram-like social platform with photo sharing and messaging',
    status: 'deployed',
    lastUpdated: '2 weeks ago',
    url: 'https://social-demo.manifest.app',
    framework: 'React Native',
    database: 'Firebase',
    collaborators: 5,
    createdAt: '2023-12-20',
  },
  {
    id: 6,
    name: 'Learning Management System',
    description: 'Educational platform with courses, quizzes, and progress tracking',
    status: 'building',
    lastUpdated: '3 weeks ago',
    url: null,
    framework: 'Next.js',
    database: 'PostgreSQL',
    collaborators: 3,
    createdAt: '2023-12-15',
  },
];

export function ProjectsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all your AI-generated applications
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="deployed">Deployed</option>
            <option value="building">Building</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.status === 'deployed'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'building'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {project.status}
                </span>
                {project.url && (
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <GitBranch className="h-4 w-4 mr-1" />
                    {project.framework}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {project.collaborators}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Updated {project.lastUpdated}
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                  {project.url && (
                    <Button size="sm" className="flex-1">
                      <Globe className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <FolderOpen className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No projects found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first project.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
