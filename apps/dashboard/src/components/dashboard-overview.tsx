'use client';

import { 
  FolderOpen, 
  Globe, 
  Users, 
  Activity,
  TrendingUp,
  Clock,
  Zap,
  Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CreateProjectDialog } from './create-project-dialog';

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    change: '+2 this month',
    icon: FolderOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Active Deployments',
    value: '8',
    change: '+1 this week',
    icon: Globe,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Team Members',
    value: '5',
    change: 'No change',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'API Requests',
    value: '2.4k',
    change: '+12% from last month',
    icon: Activity,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

const recentProjects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'AI-generated online store with payment integration',
    status: 'deployed',
    lastUpdated: '2 hours ago',
    url: 'https://ecommerce-demo.manifest.app',
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'Collaborative task tracker with real-time updates',
    status: 'building',
    lastUpdated: '1 day ago',
    url: null,
  },
  {
    id: 3,
    name: 'Portfolio Website',
    description: 'Personal portfolio with blog and contact form',
    status: 'deployed',
    lastUpdated: '3 days ago',
    url: 'https://portfolio-demo.manifest.app',
  },
  {
    id: 4,
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization and reporting',
    status: 'draft',
    lastUpdated: '1 week ago',
    url: null,
  },
];

const quickActions = [
  {
    title: 'Create New Project',
    description: 'Start building with AI assistance',
    icon: Zap,
    action: 'create-project',
  },
  {
    title: 'Import from GitHub',
    description: 'Import existing repository',
    icon: Database,
    action: 'import-github',
  },
  {
    title: 'View Analytics',
    description: 'Check your app performance',
    icon: TrendingUp,
    action: 'view-analytics',
  },
];

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your latest projects and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
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
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {project.lastUpdated}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.url && (
                        <Button variant="outline" size="sm">
                          <Globe className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to get you started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CreateProjectDialog>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                  >
                    <Zap className="h-5 w-5 mr-3 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">Create New Project</div>
                      <div className="text-sm text-gray-500">Start building with AI assistance</div>
                    </div>
                  </Button>
                </CreateProjectDialog>
                {quickActions.slice(1).map((action) => (
                  <Button
                    key={action.action}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                  >
                    <action.icon className="h-5 w-5 mr-3 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-gray-500">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>API Requests</span>
                    <span>2,400 / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>1.2 GB / 5 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Bandwidth</span>
                    <span>45 GB / 100 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              <Button variant="link" className="w-full mt-4 p-0">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
