import { OpenAIService } from './openai-service';
import { 
  ProjectRequirements, 
  ProjectStructure, 
  GenerationProgress,
  ProjectGenerationError,
  AIServiceError
} from './types';

export class ProjectGenerator {
  private aiService: OpenAIService;
  private progressCallback?: (progress: GenerationProgress) => void;

  constructor(apiKey?: string) {
    this.aiService = new OpenAIService(apiKey);
  }

  setProgressCallback(callback: (progress: GenerationProgress) => void) {
    this.progressCallback = callback;
  }

  async generateProject(requirements: ProjectRequirements): Promise<ProjectStructure> {
    try {
      this.updateProgress('Validating requirements', 10, 'Checking project requirements...');
      
      // Validate requirements
      const validatedRequirements = this.validateRequirements(requirements);
      
      this.updateProgress('Analyzing project scope', 25, 'Determining optimal architecture...');
      
      // Enhance requirements with intelligent defaults
      const enhancedRequirements = this.enhanceRequirements(validatedRequirements);
      
      this.updateProgress('Generating project structure', 50, 'Creating files and components...');
      
      // Generate the project using AI
      const projectStructure = await this.aiService.generateProject(enhancedRequirements);
      
      this.updateProgress('Optimizing code', 75, 'Refining generated code...');
      
      // Post-process and optimize the generated structure
      const optimizedStructure = await this.optimizeProjectStructure(projectStructure);
      
      this.updateProgress('Finalizing project', 90, 'Adding finishing touches...');
      
      // Add additional metadata and validation
      const finalStructure = this.finalizeProject(optimizedStructure, enhancedRequirements);
      
      this.updateProgress('Complete', 100, 'Project generated successfully!', true);
      
      return finalStructure;
    } catch (error) {
      if (error instanceof AIServiceError) {
        throw new ProjectGenerationError(
          `AI service error: ${error.message}`,
          'ai_generation',
          requirements
        );
      }
      
      throw new ProjectGenerationError(
        `Project generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'generation',
        requirements
      );
    }
  }

  private validateRequirements(requirements: ProjectRequirements): ProjectRequirements {
    // Validate project name
    if (!requirements.name.trim()) {
      throw new ProjectGenerationError('Project name cannot be empty', 'validation');
    }

    // Validate description
    if (requirements.description.length < 10) {
      throw new ProjectGenerationError('Project description must be at least 10 characters', 'validation');
    }

    // Ensure features array exists
    if (!requirements.features) {
      requirements.features = [];
    }

    return requirements;
  }

  private enhanceRequirements(requirements: ProjectRequirements): ProjectRequirements {
    const enhanced = { ...requirements };

    // Auto-select framework based on project type
    if (!enhanced.framework) {
      enhanced.framework = this.selectOptimalFramework(enhanced.type);
    }

    // Auto-select database based on project type and features
    if (!enhanced.database) {
      enhanced.database = this.selectOptimalDatabase(enhanced.type, enhanced.features);
    }

    // Auto-select styling framework
    if (!enhanced.styling) {
      enhanced.styling = 'tailwindcss'; // Default to Tailwind CSS
    }

    // Add implied features based on project type
    enhanced.features = this.addImpliedFeatures(enhanced.type, enhanced.features);

    return enhanced;
  }

  private selectOptimalFramework(type: string): any {
    const frameworkMap: Record<string, string> = {
      'ecommerce': 'nextjs',
      'blog': 'nextjs',
      'portfolio': 'nextjs',
      'dashboard': 'nextjs',
      'social': 'nextjs',
      'saas': 'nextjs',
      'landing': 'nextjs',
      'docs': 'nextjs',
      'api': 'nextjs',
      'mobile': 'react'
    };

    return frameworkMap[type] || 'nextjs';
  }

  private selectOptimalDatabase(type: string, features: string[]): any {
    // If real-time features are needed, prefer Firebase or Supabase
    if (features.includes('real-time') || features.includes('chat') || features.includes('collaboration')) {
      return 'supabase';
    }

    // For simple projects, use SQLite or Supabase
    if (type === 'portfolio' || type === 'blog' || type === 'landing') {
      return 'supabase';
    }

    // For complex applications, use PostgreSQL
    if (type === 'ecommerce' || type === 'saas' || type === 'dashboard') {
      return 'postgresql';
    }

    return 'supabase'; // Default
  }

  private addImpliedFeatures(type: string, existingFeatures: string[]): string[] {
    const features = [...existingFeatures];
    
    const impliedFeatures: Record<string, string[]> = {
      'ecommerce': ['product-catalog', 'shopping-cart', 'checkout', 'order-management'],
      'blog': ['post-management', 'comments', 'categories', 'search'],
      'portfolio': ['project-showcase', 'contact-form', 'about-page'],
      'dashboard': ['data-visualization', 'user-management', 'analytics'],
      'social': ['user-profiles', 'posts', 'likes', 'comments', 'following'],
      'saas': ['user-authentication', 'subscription-management', 'dashboard', 'api'],
      'landing': ['hero-section', 'features', 'testimonials', 'contact-form'],
      'docs': ['navigation', 'search', 'table-of-contents', 'syntax-highlighting'],
      'api': ['endpoints', 'authentication', 'documentation', 'rate-limiting']
    };

    const typeFeatures = impliedFeatures[type] || [];
    
    // Add features that aren't already present
    typeFeatures.forEach(feature => {
      if (!features.includes(feature)) {
        features.push(feature);
      }
    });

    return features;
  }

  private async optimizeProjectStructure(structure: ProjectStructure): Promise<ProjectStructure> {
    // Add common development dependencies
    const commonDevDeps = {
      '@types/node': '^20.10.0',
      'typescript': '^5.3.0',
      'eslint': '^8.55.0',
      'prettier': '^3.1.0'
    };

    structure.devDependencies = {
      ...commonDevDeps,
      ...structure.devDependencies
    };

    // Add common scripts
    const commonScripts = {
      'dev': 'next dev',
      'build': 'next build',
      'start': 'next start',
      'lint': 'eslint . --ext .ts,.tsx,.js,.jsx',
      'type-check': 'tsc --noEmit'
    };

    structure.scripts = {
      ...commonScripts,
      ...structure.scripts
    };

    // Ensure essential files are present
    this.ensureEssentialFiles(structure);

    return structure;
  }

  private ensureEssentialFiles(structure: ProjectStructure) {
    const essentialFiles = [
      'package.json',
      'tsconfig.json',
      'next.config.js',
      'tailwind.config.js',
      '.env.example',
      '.gitignore',
      'README.md'
    ];

    essentialFiles.forEach(fileName => {
      const exists = structure.files.some(file => file.path === fileName);
      if (!exists) {
        structure.files.push({
          path: fileName,
          content: this.generateEssentialFileContent(fileName, structure),
          type: 'config',
          description: `Essential ${fileName} configuration file`
        });
      }
    });
  }

  private generateEssentialFileContent(fileName: string, structure: ProjectStructure): string {
    switch (fileName) {
      case '.gitignore':
        return `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts`;

      case '.env.example':
        return `# Database
DATABASE_URL="your-database-url"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# API Keys
OPENAI_API_KEY="your-openai-api-key"

# Add other environment variables as needed`;

      default:
        return `# ${fileName} - Generated by Manifest AI`;
    }
  }

  private finalizeProject(structure: ProjectStructure, requirements: ProjectRequirements): ProjectStructure {
    // Add project metadata
    const finalStructure = {
      ...structure,
      generatedAt: new Date().toISOString(),
      requirements,
      version: '1.0.0'
    };

    // Generate comprehensive README
    finalStructure.readme = this.generateReadme(finalStructure, requirements);

    return finalStructure;
  }

  private generateReadme(structure: ProjectStructure, requirements: ProjectRequirements): string {
    return `# ${structure.name}

${structure.description}

## Features

${requirements.features.map(feature => `- ${feature.charAt(0).toUpperCase() + feature.slice(1).replace('-', ' ')}`).join('\n')}

## Tech Stack

- **Framework**: ${structure.framework}
- **Database**: ${structure.database}
- **Styling**: ${structure.styling}
- **Authentication**: ${requirements.authentication ? 'Enabled' : 'Disabled'}
- **Payments**: ${requirements.payments ? 'Enabled' : 'Disabled'}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
${structure.files.map(file => file.path).sort().join('\n')}
\`\`\`

## Generated by Manifest AI

This project was generated using Manifest's AI-powered app builder. 
Visit [manifest.app](https://manifest.app) to create your own AI-generated applications.
`;
  }

  private updateProgress(step: string, progress: number, message: string, completed = false) {
    if (this.progressCallback) {
      this.progressCallback({
        step,
        progress,
        message,
        completed
      });
    }
  }
}
