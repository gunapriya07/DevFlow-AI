export interface User {
  role: 'developer' | 'devops' | 'student' | 'contributor';
}

export interface Dependency {
  name: string;
  required: string;
  installed: string | undefined;
  status: 'installed' | 'missing' | 'outdated';
  installCommand: string;
}

export interface EnvVariable {
  key: string;
  value: string;
  description: string;
  required: boolean;
  example: string;
}

export interface SetupStep {
  id: string;
  title: string;
  description: string;
  commands: Record<string, string>;
  status: 'completed' | 'in-progress' | 'pending';
  estimatedTime: string;
}

export interface ValidationCheck {
  id: string;
  name: string;
  type: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  detail: string;
}

export interface SetupIssue {
  id: string;
  timestamp: string;
  error: string;
  cause: string;
  fix: string;
  status: 'open' | 'resolved';
}

export interface AnalysisResult {
  repoName: string;
  repoUrl: string;
  techStack: {
    language: string;
    framework: string;
    database: string;
    devops: string[];
    packageManager: string;
    nodeVersion: string;
  };
  dependencies: Dependency[];
  envVariables: EnvVariable[];
  setupSteps: SetupStep[];
  validationChecks: ValidationCheck[];
  setupProgress: number;
  issues: SetupIssue[];
}
