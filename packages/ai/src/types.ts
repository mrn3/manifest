import { z } from 'zod';

// Project generation schemas
export const ProjectTypeSchema = z.enum([
  'ecommerce',
  'blog',
  'portfolio',
  'dashboard',
  'social',
  'saas',
  'landing',
  'docs',
  'api',
  'mobile'
]);

export const FrameworkSchema = z.enum([
  'nextjs',
  'react',
  'vue',
  'svelte',
  'angular',
  'nuxt',
  'gatsby',
  'remix'
]);

export const DatabaseSchema = z.enum([
  'postgresql',
  'mysql',
  'mongodb',
  'sqlite',
  'supabase',
  'firebase',
  'planetscale',
  'neon'
]);

export const StyleFrameworkSchema = z.enum([
  'tailwindcss',
  'styled-components',
  'emotion',
  'chakra-ui',
  'material-ui',
  'ant-design',
  'bootstrap'
]);

export const ProjectRequirementsSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: ProjectTypeSchema,
  framework: FrameworkSchema.optional(),
  database: DatabaseSchema.optional(),
  styling: StyleFrameworkSchema.optional(),
  features: z.array(z.string()).default([]),
  authentication: z.boolean().default(false),
  payments: z.boolean().default(false),
  realtime: z.boolean().default(false),
  api: z.boolean().default(true),
  deployment: z.boolean().default(true),
});

export const GeneratedFileSchema = z.object({
  path: z.string(),
  content: z.string(),
  type: z.enum(['component', 'page', 'api', 'config', 'style', 'test', 'doc']),
  description: z.string().optional(),
});

export const ProjectStructureSchema = z.object({
  name: z.string(),
  description: z.string(),
  framework: FrameworkSchema,
  database: DatabaseSchema,
  styling: StyleFrameworkSchema,
  features: z.array(z.string()),
  files: z.array(GeneratedFileSchema),
  dependencies: z.record(z.string()),
  devDependencies: z.record(z.string()),
  scripts: z.record(z.string()),
  environment: z.record(z.string()),
  readme: z.string(),
});

// AI Service types
export interface AIProvider {
  generateProject(requirements: ProjectRequirements): Promise<ProjectStructure>;
  generateCode(prompt: string, context?: string): Promise<string>;
  improveCode(code: string, instructions: string): Promise<string>;
  explainCode(code: string): Promise<string>;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface GenerationProgress {
  step: string;
  progress: number;
  message: string;
  completed: boolean;
}

// Type exports
export type ProjectType = z.infer<typeof ProjectTypeSchema>;
export type Framework = z.infer<typeof FrameworkSchema>;
export type Database = z.infer<typeof DatabaseSchema>;
export type StyleFramework = z.infer<typeof StyleFrameworkSchema>;
export type ProjectRequirements = z.infer<typeof ProjectRequirementsSchema>;
export type GeneratedFile = z.infer<typeof GeneratedFileSchema>;
export type ProjectStructure = z.infer<typeof ProjectStructureSchema>;

// Error types
export class AIServiceError extends Error {
  constructor(
    message: string,
    public provider: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

export class ProjectGenerationError extends Error {
  constructor(
    message: string,
    public step: string,
    public requirements?: ProjectRequirements
  ) {
    super(message);
    this.name = 'ProjectGenerationError';
  }
}
