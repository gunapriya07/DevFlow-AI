export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'developer' | 'devops' | 'student' | 'contributor';
}

export interface TechStack {
  language: string;
  framework?: string;
  database?: string;
  devops?: string[];
  packageManager?: string;
  nodeVersion?: string;
  pythonVersion?: string;
}

export interface Dependency {
  name: string;
  required: string;
  installed?: string;
  status: 'installed' | 'missing' | 'outdated' | 'checking';
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
  commands: {
    windows: string;
    macos: string;
    linux: string;
  };
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  estimatedTime: string;
}

export interface ValidationCheck {
  id: string;
  name: string;
  type: 'database' | 'docker' | 'port' | 'service' | 'env';
  status: 'pass' | 'fail' | 'warning' | 'checking';
  message: string;
  detail?: string;
}

export interface SetupIssue {
  id: string;
  timestamp: string;
  error: string;
  cause: string;
  fix: string;
  status: 'resolved' | 'open';
}

export interface AnalysisResult {
  repoName: string;
  repoUrl: string;
  techStack: TechStack;
  dependencies: Dependency[];
  envVariables: EnvVariable[];
  setupSteps: SetupStep[];
  validationChecks: ValidationCheck[];
  setupProgress: number;
  issues: SetupIssue[];
}

export type OS = 'windows' | 'macos' | 'linux';

export type NavPage =
  | 'dashboard'
  | 'repository'
  | 'setup-guide'
  | 'dependencies'
  | 'env-generator'
  | 'validation'
  | 'troubleshooter'
  | 'contact';