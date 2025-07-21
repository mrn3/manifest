import OpenAI from 'openai';
import { AIProvider, ProjectRequirements, ProjectStructure, AIServiceError } from './types';

export class OpenAIService implements AIProvider {
  private client: OpenAI;

  constructor(apiKey?: string) {
    if (!apiKey && !process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required');
    }
    
    this.client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });
  }

  async generateProject(requirements: ProjectRequirements): Promise<ProjectStructure> {
    try {
      const prompt = this.buildProjectPrompt(requirements);
      
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert full-stack developer and architect. Generate a complete, production-ready project structure based on the user's requirements. Return a valid JSON object that matches the ProjectStructure schema.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new AIServiceError('No response from OpenAI', 'openai');
      }

      return this.parseProjectStructure(response);
    } catch (error) {
      if (error instanceof AIServiceError) {
        throw error;
      }
      throw new AIServiceError(
        `OpenAI project generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'openai'
      );
    }
  }

  async generateCode(prompt: string, context?: string): Promise<string> {
    try {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: 'You are an expert developer. Generate clean, production-ready code based on the user\'s requirements.'
        }
      ];

      if (context) {
        messages.push({
          role: 'user',
          content: `Context: ${context}`
        });
      }

      messages.push({
        role: 'user',
        content: prompt
      });

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        temperature: 0.3,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new AIServiceError('No response from OpenAI', 'openai');
      }

      return response;
    } catch (error) {
      throw new AIServiceError(
        `OpenAI code generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'openai'
      );
    }
  }

  async improveCode(code: string, instructions: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert code reviewer and optimizer. Improve the given code based on the instructions while maintaining functionality.'
          },
          {
            role: 'user',
            content: `Code to improve:\n\`\`\`\n${code}\n\`\`\`\n\nInstructions: ${instructions}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new AIServiceError('No response from OpenAI', 'openai');
      }

      return response;
    } catch (error) {
      throw new AIServiceError(
        `OpenAI code improvement failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'openai'
      );
    }
  }

  async explainCode(code: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert developer and teacher. Explain the given code in a clear, educational way.'
          },
          {
            role: 'user',
            content: `Please explain this code:\n\`\`\`\n${code}\n\`\`\``
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new AIServiceError('No response from OpenAI', 'openai');
      }

      return response;
    } catch (error) {
      throw new AIServiceError(
        `OpenAI code explanation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'openai'
      );
    }
  }

  private buildProjectPrompt(requirements: ProjectRequirements): string {
    return `Generate a complete project structure for the following requirements:

Project Name: ${requirements.name}
Description: ${requirements.description}
Type: ${requirements.type}
Framework: ${requirements.framework || 'auto-select best option'}
Database: ${requirements.database || 'auto-select best option'}
Styling: ${requirements.styling || 'tailwindcss'}
Features: ${requirements.features.join(', ') || 'basic functionality'}
Authentication: ${requirements.authentication ? 'Yes' : 'No'}
Payments: ${requirements.payments ? 'Yes' : 'No'}
Real-time: ${requirements.realtime ? 'Yes' : 'No'}
API: ${requirements.api ? 'Yes' : 'No'}
Deployment: ${requirements.deployment ? 'Yes' : 'No'}

Generate a complete project with:
1. Proper file structure
2. All necessary components and pages
3. API routes if needed
4. Configuration files
5. Package.json with dependencies
6. Environment variables template
7. README with setup instructions

Return the response as a valid JSON object matching the ProjectStructure schema.`;
  }

  private parseProjectStructure(response: string): ProjectStructure {
    try {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : response;
      
      const parsed = JSON.parse(jsonString);
      
      // Validate the structure matches our schema
      if (!parsed.name || !parsed.files || !Array.isArray(parsed.files)) {
        throw new Error('Invalid project structure format');
      }
      
      return parsed as ProjectStructure;
    } catch (error) {
      throw new AIServiceError(
        `Failed to parse project structure: ${error instanceof Error ? error.message : 'Invalid JSON'}`,
        'openai',
        'PARSE_ERROR'
      );
    }
  }
}
