import type { AnalysisResult, Dependency, EnvVariable, SetupStep, ValidationCheck, SetupIssue } from './types/index.ts';

export const mockDependencies: Dependency[] = [
  { name: 'Node.js', required: '18.x', installed: '18.17.0', status: 'installed', installCommand: 'https://nodejs.org' },
  { name: 'npm', required: '9.x', installed: '9.6.7', status: 'installed', installCommand: 'npm install -g npm@latest' },
  { name: 'Docker', required: '24.x', installed: undefined, status: 'missing', installCommand: 'https://docs.docker.com/get-docker/' },
  { name: 'PostgreSQL', required: '15.x', installed: '14.8', status: 'outdated', installCommand: 'brew install postgresql@15' },
  { name: 'Redis', required: '7.x', installed: undefined, status: 'missing', installCommand: 'brew install redis' },
  { name: 'Git', required: '2.x', installed: '2.41.0', status: 'installed', installCommand: 'https://git-scm.com' },
];

export const mockEnvVariables: EnvVariable[] = [
  { key: 'DATABASE_URL', value: '', description: 'PostgreSQL connection string', required: true, example: 'postgresql://user:password@localhost:5432/mydb' },
  { key: 'REDIS_URL', value: '', description: 'Redis connection URL', required: true, example: 'redis://localhost:6379' },
  { key: 'JWT_SECRET', value: '', description: 'Secret key for JWT token signing', required: true, example: 'your-super-secret-key-here' },
  { key: 'API_KEY', value: '', description: 'Third-party API key', required: false, example: 'sk-xxxxxxxxxxxxxxxx' },
  { key: 'PORT', value: '3000', description: 'Application port', required: false, example: '3000' },
  { key: 'NODE_ENV', value: 'development', description: 'Application environment', required: true, example: 'development' },
  { key: 'SMTP_HOST', value: '', description: 'Email SMTP host', required: false, example: 'smtp.gmail.com' },
  { key: 'CORS_ORIGIN', value: 'http://localhost:3000', description: 'Allowed CORS origins', required: true, example: 'http://localhost:3000' },
];

export const mockSetupSteps: SetupStep[] = [
  {
    id: '1', title: 'Clone Repository', description: 'Clone the repository to your local machine',
    commands: { windows: 'git clone https://github.com/org/repo.git && cd repo', macos: 'git clone https://github.com/org/repo.git && cd repo', linux: 'git clone https://github.com/org/repo.git && cd repo' },
    status: 'completed', estimatedTime: '1 min'
  },
  {
    id: '2', title: 'Install Node.js Dependencies', description: 'Install all required npm packages',
    commands: { windows: 'npm install', macos: 'npm install', linux: 'npm install' },
    status: 'completed', estimatedTime: '3 min'
  },
  {
    id: '3', title: 'Configure Environment Variables', description: 'Copy and configure the environment file',
    commands: { windows: 'copy .env.example .env', macos: 'cp .env.example .env', linux: 'cp .env.example .env' },
    status: 'in-progress', estimatedTime: '5 min'
  },
  {
    id: '4', title: 'Start Docker Services', description: 'Launch PostgreSQL and Redis via Docker Compose',
    commands: { windows: 'docker-compose up -d', macos: 'docker-compose up -d', linux: 'docker-compose up -d' },
    status: 'pending', estimatedTime: '2 min'
  },
  {
    id: '5', title: 'Run Database Migrations', description: 'Apply all pending database migrations',
    commands: { windows: 'npm run migrate', macos: 'npm run migrate', linux: 'npm run migrate' },
    status: 'pending', estimatedTime: '2 min'
  },
  {
    id: '6', title: 'Seed Database', description: 'Populate database with initial seed data',
    commands: { windows: 'npm run seed', macos: 'npm run seed', linux: 'npm run seed' },
    status: 'pending', estimatedTime: '1 min'
  },
  {
    id: '7', title: 'Start Development Server', description: 'Launch the development server',
    commands: { windows: 'npm run dev', macos: 'npm run dev', linux: 'npm run dev' },
    status: 'pending', estimatedTime: '1 min'
  },
];

export const mockValidationChecks: ValidationCheck[] = [
  { id: '1', name: 'PostgreSQL Connection', type: 'database', status: 'fail', message: 'Cannot connect', detail: 'Connection refused on port 5432' },
  { id: '2', name: 'Redis Connection', type: 'database', status: 'fail', message: 'Redis not running', detail: 'Connection refused on port 6379' },
  { id: '3', name: 'Docker Daemon', type: 'docker', status: 'warning', message: 'Docker not installed', detail: 'Docker Desktop required for local services' },
  { id: '4', name: 'Port 3000', type: 'port', status: 'pass', message: 'Available', detail: 'Port 3000 is free and ready' },
  { id: '5', name: 'Port 5432', type: 'port', status: 'pass', message: 'Available', detail: 'Port 5432 is free' },
  { id: '6', name: 'Environment Variables', type: 'env', status: 'warning', message: '3 variables missing', detail: 'DATABASE_URL, REDIS_URL, JWT_SECRET not set' },
  { id: '7', name: 'Node.js Version', type: 'service', status: 'pass', message: 'v18.17.0 ✓', detail: 'Meets required version 18.x' },
];

export const mockIssues: SetupIssue[] = [
  { id: '1', timestamp: '2024-01-15 14:32', error: 'ECONNREFUSED 127.0.0.1:5432', cause: 'PostgreSQL service is not running or not installed', fix: 'Install PostgreSQL 15 and start the service: brew services start postgresql@15', status: 'open' },
  { id: '2', timestamp: '2024-01-15 13:15', error: "Cannot find module 'bcrypt'", cause: 'Native module not compiled for current Node.js version', fix: 'Run: npm rebuild bcrypt --build-from-source', status: 'resolved' },
  { id: '3', timestamp: '2024-01-14 10:00', error: 'CORS policy blocked', cause: 'CORS_ORIGIN env variable not set correctly', fix: 'Set CORS_ORIGIN=http://localhost:3000 in your .env file', status: 'resolved' },
];

export const mockAnalysis: AnalysisResult = {
  repoName: 'fullstack-saas-app',
  repoUrl: 'https://github.com/org/fullstack-saas-app',
  techStack: {
    language: 'TypeScript',
    framework: 'Next.js 14',
    database: 'PostgreSQL + Redis',
    devops: ['Docker', 'Docker Compose', 'GitHub Actions'],
    packageManager: 'npm',
    nodeVersion: '18.x',
  },
  dependencies: mockDependencies,
  envVariables: mockEnvVariables,
  setupSteps: mockSetupSteps,
  validationChecks: mockValidationChecks,
  setupProgress: 28,
  issues: mockIssues,
};