// Sample data for AI Governance module

export interface AISystem {
  id: string
  name: string
  framework: string
  owner: string
  stage: 'In Use' | 'New' | 'In Review' | 'Active'
  riskScore: 'Low' | 'Medium' | 'High'
}

export const aiSystems: AISystem[] = [
  { id: 'AIS-001', name: 'GPT-4 Integration', framework: 'ISO 42001:2023', owner: 'Sarah Chen', stage: 'In Use', riskScore: 'Medium' },
  { id: 'AIS-002', name: 'Document Classifier', framework: 'AICPA/CICA', owner: 'Mark Rivera', stage: 'New', riskScore: 'Low' },
  { id: 'AIS-003', name: 'Risk Scoring Engine', framework: 'ISO 42001:2023', owner: 'Sarah Chen', stage: 'In Use', riskScore: 'High' },
  { id: 'AIS-004', name: 'Customer Chatbot', framework: 'NIST AI RMF', owner: 'Priya Nair', stage: 'In Review', riskScore: 'Medium' },
  { id: 'AIS-005', name: 'Fraud Detection', framework: 'ISO 42001:2023', owner: 'Mark Rivera', stage: 'Active', riskScore: 'High' },
  { id: 'AIS-006', name: 'HR Screening AI', framework: 'EU AI Act', owner: 'Tom Walsh', stage: 'New', riskScore: 'High' },
]

export interface AIModel {
  id: string
  name: string
  vendor: string
  type: string
  version: string
  status: 'Active' | 'Deprecated' | 'Testing'
}

export const aiModels: AIModel[] = [
  { id: 'MOD-001', name: 'GPT-4-turbo', vendor: 'OpenAI', type: 'LLM', version: '4.0', status: 'Active' },
  { id: 'MOD-002', name: 'Claude 3 Sonnet', vendor: 'Anthropic', type: 'LLM', version: '3.0', status: 'Active' },
  { id: 'MOD-003', name: 'Llama 3', vendor: 'Meta', type: 'LLM', version: '3.0', status: 'Testing' },
  { id: 'MOD-004', name: 'Bert-base', vendor: 'Google', type: 'NLP', version: '1.1', status: 'Deprecated' },
]

export interface AIAgent {
  id: string
  name: string
  connectedSystem: string
  owner: string
  status: 'Active' | 'Inactive' | 'Paused'
}

export const aiAgents: AIAgent[] = [
  { id: 'AGT-001', name: 'Document Review Agent', connectedSystem: 'GPT-4 Integration', owner: 'Sarah Chen', status: 'Active' },
  { id: 'AGT-002', name: 'Risk Assessment Agent', connectedSystem: 'Risk Scoring Engine', owner: 'Mark Rivera', status: 'Active' },
  { id: 'AGT-003', name: 'Compliance Monitor', connectedSystem: 'Customer Chatbot', owner: 'Priya Nair', status: 'Paused' },
]

export interface Dataset {
  id: string
  name: string
  type: string
  size: string
  classification: 'Public' | 'Internal' | 'Confidential' | 'Restricted'
}

export const datasets: Dataset[] = [
  { id: 'DS-001', name: 'Customer Interactions', type: 'Structured', size: '2.4 TB', classification: 'Confidential' },
  { id: 'DS-002', name: 'Product Catalog', type: 'Structured', size: '156 GB', classification: 'Internal' },
  { id: 'DS-003', name: 'Training Documents', type: 'Unstructured', size: '890 GB', classification: 'Internal' },
  { id: 'DS-004', name: 'User Feedback', type: 'Mixed', size: '45 GB', classification: 'Confidential' },
]

export interface Project {
  id: string
  name: string
  status: 'Active' | 'Completed' | 'On Hold'
  owner: string
  dueDate: string
}

export const projects: Project[] = [
  { id: 'PRJ-001', name: 'AI Risk Framework Implementation', status: 'Active', owner: 'Sarah Chen', dueDate: 'Jun 30, 2026' },
  { id: 'PRJ-002', name: 'EU AI Act Compliance', status: 'Active', owner: 'Mark Rivera', dueDate: 'Aug 15, 2026' },
  { id: 'PRJ-003', name: 'Model Inventory Audit', status: 'Completed', owner: 'Priya Nair', dueDate: 'Apr 20, 2026' },
]

export interface Vendor {
  id: string
  name: string
  category: string
  riskTier: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Active' | 'Under Review' | 'Inactive'
  lastAssessment: string
}

export const vendors: Vendor[] = [
  { id: 'VND-001', name: 'OpenAI', category: 'AI Provider', riskTier: 'Critical', status: 'Active', lastAssessment: 'Mar 15, 2026' },
  { id: 'VND-002', name: 'Anthropic', category: 'AI Provider', riskTier: 'High', status: 'Active', lastAssessment: 'Feb 28, 2026' },
  { id: 'VND-003', name: 'AWS', category: 'Cloud Infrastructure', riskTier: 'Critical', status: 'Active', lastAssessment: 'Apr 10, 2026' },
  { id: 'VND-004', name: 'Snowflake', category: 'Data Platform', riskTier: 'High', status: 'Under Review', lastAssessment: 'Jan 20, 2026' },
  { id: 'VND-005', name: 'DataDog', category: 'Monitoring', riskTier: 'Medium', status: 'Active', lastAssessment: 'Mar 05, 2026' },
]

// Detail data for AI System
export interface AISystemDetail extends AISystem {
  description: string
  department: string
  businessUnit: string
  deploymentDate: string
  lastReview: string
  dataTypes: string[]
  relatedVendors: string[]
  relatedModels: string[]
  relatedAgents: string[]
}

export const aiSystemDetails: Record<string, AISystemDetail> = {
  'AIS-001': {
    id: 'AIS-001',
    name: 'GPT-4 Integration',
    framework: 'ISO 42001:2023',
    owner: 'Sarah Chen',
    stage: 'In Use',
    riskScore: 'Medium',
    description: 'Enterprise GPT-4 integration for document analysis and content generation across multiple business units.',
    department: 'Engineering',
    businessUnit: 'Product Development',
    deploymentDate: 'Jan 15, 2026',
    lastReview: 'Apr 02, 2026',
    dataTypes: ['Customer Data', 'Internal Documents', 'Product Information'],
    relatedVendors: ['OpenAI', 'AWS'],
    relatedModels: ['GPT-4-turbo'],
    relatedAgents: ['Document Review Agent']
  },
  'AIS-003': {
    id: 'AIS-003',
    name: 'Risk Scoring Engine',
    framework: 'ISO 42001:2023',
    owner: 'Sarah Chen',
    stage: 'In Use',
    riskScore: 'High',
    description: 'Automated risk scoring system for evaluating vendor and third-party risks using ML models.',
    department: 'Risk Management',
    businessUnit: 'Compliance',
    deploymentDate: 'Nov 10, 2025',
    lastReview: 'Mar 28, 2026',
    dataTypes: ['Vendor Data', 'Financial Records', 'Compliance Data'],
    relatedVendors: ['AWS', 'Snowflake'],
    relatedModels: ['Bert-base'],
    relatedAgents: ['Risk Assessment Agent']
  }
}

// ─── Privacy Management Sample Data ───────────────────────────────────────────

export interface PiaRecord {
  id: string
  name: string
  type: 'PIA' | 'DPIA'
  status: 'Draft' | 'In Review' | 'Approved' | 'Overdue'
  owner: string
  department: string
  dueDate: string
  riskLevel: 'Low' | 'Medium' | 'High'
}

export const piaRecords: PiaRecord[] = [
  { id: 'PIA-001', name: 'Customer Analytics Platform', type: 'DPIA', status: 'In Review', owner: 'Sarah Chen', department: 'Engineering', dueDate: 'Jun 15, 2026', riskLevel: 'High' },
  { id: 'PIA-002', name: 'HR Onboarding System', type: 'PIA', status: 'Approved', owner: 'Tom Walsh', department: 'HR', dueDate: 'Apr 30, 2026', riskLevel: 'Medium' },
  { id: 'PIA-003', name: 'Marketing Personalisation Engine', type: 'DPIA', status: 'Draft', owner: 'Priya Nair', department: 'Marketing', dueDate: 'Jul 20, 2026', riskLevel: 'High' },
  { id: 'PIA-004', name: 'Vendor Portal Upgrade', type: 'PIA', status: 'Overdue', owner: 'Mark Rivera', department: 'Procurement', dueDate: 'May 01, 2026', riskLevel: 'Low' },
  { id: 'PIA-005', name: 'Mobile App v3.0 Launch', type: 'DPIA', status: 'In Review', owner: 'Sarah Chen', department: 'Product', dueDate: 'Jun 30, 2026', riskLevel: 'Medium' },
]

export interface IncidentRecord {
  id: string
  title: string
  type: 'Data Breach' | 'Unauthorised Access' | 'Data Loss' | 'Policy Violation'
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Reported to Authority'
  reportedBy: string
  reportedDate: string
  affectedRecords: string
}

export const incidentRecords: IncidentRecord[] = [
  { id: 'INC-001', title: 'Misconfigured S3 bucket exposed customer data', type: 'Data Breach', severity: 'Critical', status: 'Reported to Authority', reportedBy: 'Sarah Chen', reportedDate: 'Apr 12, 2026', affectedRecords: '14,200' },
  { id: 'INC-002', title: 'Phishing attack on HR team credentials', type: 'Unauthorised Access', severity: 'High', status: 'Resolved', reportedBy: 'Tom Walsh', reportedDate: 'Mar 28, 2026', affectedRecords: '320' },
  { id: 'INC-003', title: 'Laptop with unencrypted data lost', type: 'Data Loss', severity: 'Medium', status: 'Under Investigation', reportedBy: 'Mark Rivera', reportedDate: 'May 10, 2026', affectedRecords: '450' },
  { id: 'INC-004', title: 'Vendor sent data to wrong recipient', type: 'Policy Violation', severity: 'Low', status: 'Resolved', reportedBy: 'Priya Nair', reportedDate: 'May 02, 2026', affectedRecords: '12' },
]

export interface PrivacyRightRequest {
  id: string
  type: 'Access' | 'Erasure' | 'Portability' | 'Rectification' | 'Objection'
  subject: string
  status: 'New' | 'In Progress' | 'Completed' | 'Overdue' | 'Rejected'
  assignedTo: string
  receivedDate: string
  dueDate: string
  channel: 'Web Form' | 'Email' | 'Phone' | 'In Person'
}

export const privacyRightRequests: PrivacyRightRequest[] = [
  { id: 'PRR-001', type: 'Access', subject: 'J. Smith', status: 'In Progress', assignedTo: 'Sarah Chen', receivedDate: 'May 08, 2026', dueDate: 'Jun 07, 2026', channel: 'Web Form' },
  { id: 'PRR-002', type: 'Erasure', subject: 'A. Patel', status: 'Completed', assignedTo: 'Tom Walsh', receivedDate: 'Apr 20, 2026', dueDate: 'May 20, 2026', channel: 'Email' },
  { id: 'PRR-003', type: 'Portability', subject: 'M. Johnson', status: 'New', assignedTo: 'Priya Nair', receivedDate: 'May 15, 2026', dueDate: 'Jun 14, 2026', channel: 'Web Form' },
  { id: 'PRR-004', type: 'Rectification', subject: 'L. Garcia', status: 'Overdue', assignedTo: 'Mark Rivera', receivedDate: 'Apr 01, 2026', dueDate: 'May 01, 2026', channel: 'Phone' },
  { id: 'PRR-005', type: 'Objection', subject: 'R. Kim', status: 'In Progress', assignedTo: 'Sarah Chen', receivedDate: 'May 12, 2026', dueDate: 'Jun 11, 2026', channel: 'Web Form' },
]

export interface DataMappingRecord {
  id: string
  process: string
  category: string
  legalBasis: 'Consent' | 'Legitimate Interest' | 'Contract' | 'Legal Obligation' | 'Vital Interest'
  dataTypes: string
  recipients: string
  retention: string
  crossBorder: boolean
}

export const dataMappingRecords: DataMappingRecord[] = [
  { id: 'DM-001', process: 'Customer Account Management', category: 'Customer Data', legalBasis: 'Contract', dataTypes: 'Name, Email, Address', recipients: 'CRM, Support Tools', retention: '7 years', crossBorder: true },
  { id: 'DM-002', process: 'Marketing Email Campaigns', category: 'Marketing', legalBasis: 'Consent', dataTypes: 'Email, Preferences', recipients: 'Email Platform', retention: '2 years', crossBorder: true },
  { id: 'DM-003', process: 'Employee Payroll Processing', category: 'HR Data', legalBasis: 'Legal Obligation', dataTypes: 'Name, Salary, Bank Details', recipients: 'Payroll Provider', retention: '10 years', crossBorder: false },
  { id: 'DM-004', process: 'Website Analytics', category: 'Usage Data', legalBasis: 'Legitimate Interest', dataTypes: 'IP Address, Cookies', recipients: 'Analytics Platform', retention: '13 months', crossBorder: true },
  { id: 'DM-005', process: 'Customer Support Tickets', category: 'Customer Data', legalBasis: 'Contract', dataTypes: 'Name, Email, Issue Details', recipients: 'Helpdesk Tool', retention: '3 years', crossBorder: false },
]

export interface PrivacyNotice {
  id: string
  name: string
  type: 'Privacy Policy' | 'Cookie Notice' | 'Employee Notice' | 'Consent Form'
  status: 'Published' | 'Draft' | 'Under Review' | 'Archived'
  version: string
  owner: string
  lastUpdated: string
  languages: number
}

export const privacyNotices: PrivacyNotice[] = [
  { id: 'PN-001', name: 'Global Privacy Policy', type: 'Privacy Policy', status: 'Published', version: '3.2', owner: 'Sarah Chen', lastUpdated: 'Mar 01, 2026', languages: 12 },
  { id: 'PN-002', name: 'Cookie Consent Notice', type: 'Cookie Notice', status: 'Published', version: '2.0', owner: 'Priya Nair', lastUpdated: 'Jan 15, 2026', languages: 8 },
  { id: 'PN-003', name: 'Employee Privacy Notice', type: 'Employee Notice', status: 'Under Review', version: '1.4', owner: 'Tom Walsh', lastUpdated: 'Apr 22, 2026', languages: 5 },
  { id: 'PN-004', name: 'Marketing Consent Form', type: 'Consent Form', status: 'Draft', version: '0.9', owner: 'Mark Rivera', lastUpdated: 'May 10, 2026', languages: 3 },
]

export interface BenchmarkRecord {
  id: string
  framework: string
  score: number
  maxScore: number
  status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant'
  lastAssessed: string
  assessor: string
  nextReview: string
}

export const benchmarkRecords: BenchmarkRecord[] = [
  { id: 'BM-001', framework: 'GDPR', score: 87, maxScore: 100, status: 'Compliant', lastAssessed: 'Apr 01, 2026', assessor: 'Sarah Chen', nextReview: 'Oct 01, 2026' },
  { id: 'BM-002', framework: 'CCPA / CPRA', score: 74, maxScore: 100, status: 'Partially Compliant', lastAssessed: 'Mar 15, 2026', assessor: 'Mark Rivera', nextReview: 'Sep 15, 2026' },
  { id: 'BM-003', framework: 'ISO 27701', score: 91, maxScore: 100, status: 'Compliant', lastAssessed: 'Feb 20, 2026', assessor: 'Priya Nair', nextReview: 'Aug 20, 2026' },
  { id: 'BM-004', framework: 'LGPD (Brazil)', score: 58, maxScore: 100, status: 'Non-Compliant', lastAssessed: 'Apr 10, 2026', assessor: 'Tom Walsh', nextReview: 'Jul 10, 2026' },
]

export interface MaturityRecord {
  id: string
  domain: string
  currentLevel: 1 | 2 | 3 | 4 | 5
  targetLevel: 1 | 2 | 3 | 4 | 5
  status: 'On Track' | 'At Risk' | 'Behind' | 'Achieved'
  owner: string
  targetDate: string
  initiatives: number
}

export const maturityRecords: MaturityRecord[] = [
  { id: 'MT-001', domain: 'Data Governance', currentLevel: 3, targetLevel: 4, status: 'On Track', owner: 'Sarah Chen', targetDate: 'Dec 31, 2026', initiatives: 4 },
  { id: 'MT-002', domain: 'Consent Management', currentLevel: 2, targetLevel: 4, status: 'At Risk', owner: 'Priya Nair', targetDate: 'Sep 30, 2026', initiatives: 6 },
  { id: 'MT-003', domain: 'Incident Response', currentLevel: 4, targetLevel: 5, status: 'On Track', owner: 'Tom Walsh', targetDate: 'Mar 31, 2027', initiatives: 2 },
  { id: 'MT-004', domain: 'Privacy by Design', currentLevel: 2, targetLevel: 3, status: 'Behind', owner: 'Mark Rivera', targetDate: 'Jun 30, 2026', initiatives: 5 },
  { id: 'MT-005', domain: 'Third-Party Risk', currentLevel: 3, targetLevel: 4, status: 'Achieved', owner: 'Sarah Chen', targetDate: 'Apr 30, 2026', initiatives: 3 },
]

// ─── Assessments Module ────────────────────────────────────────────────────────

export type AssessmentTier = 'lite' | 'plus' | 'premium'

export interface AssessmentType {
  id: string
  name: string
  description: string
  category: string
  tier: AssessmentTier        // minimum tier required to access
  module: string              // which module this belongs to
  estimatedTime: string       // e.g. "30 min", "2 hrs"
  questionCount: number
}

export const assessmentTypes: AssessmentType[] = [
  // ── OT Lite ──────────────────────────────────────────────────────────────────
  {
    id: 'AT-001',
    name: 'Vendor Risk Assessment',
    description: 'Evaluate a vendor\'s security posture, data handling practices, and contractual obligations.',
    category: 'Third-Party Risk',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '45 min',
    questionCount: 32,
  },
  {
    id: 'AT-002',
    name: 'Security Questionnaire',
    description: 'Assess a vendor or internal system against baseline security controls and best practices.',
    category: 'Security',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '30 min',
    questionCount: 24,
  },
  {
    id: 'AT-003',
    name: 'Business Impact Analysis',
    description: 'Identify critical business processes and assess the impact of potential disruptions.',
    category: 'Operational Risk',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '1 hr',
    questionCount: 28,
  },
  {
    id: 'AT-004',
    name: 'Internal Compliance Audit',
    description: 'Review internal controls and processes against applicable policies and standards.',
    category: 'Compliance',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '2 hrs',
    questionCount: 48,
  },
  // ── OT Plus — Privacy Management & AI Governance ─────────────────────────────
  {
    id: 'AT-005',
    name: 'Data Protection Impact Assessment (DPIA)',
    description: 'Systematically analyse and identify privacy risks for high-risk processing activities as required under GDPR Article 35.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '2–3 hrs',
    questionCount: 64,
  },
  {
    id: 'AT-006',
    name: 'Privacy Impact Assessment (PIA)',
    description: 'Evaluate the privacy implications of a new project, system, or process before launch.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '1–2 hrs',
    questionCount: 52,
  },
  {
    id: 'AT-007',
    name: 'Cookie & Consent Audit',
    description: 'Review cookie usage, consent mechanisms, and compliance with ePrivacy Directive and GDPR requirements.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '1 hr',
    questionCount: 36,
  },
  {
    id: 'AT-008',
    name: 'Data Subject Rights Readiness',
    description: 'Assess your organisation\'s capability to respond to DSAR, erasure, portability, and objection requests within legal timeframes.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '45 min',
    questionCount: 30,
  },
  {
    id: 'AT-009',
    name: 'Data Processing Activity Review',
    description: 'Validate and update Records of Processing Activities (RoPA) for accuracy, completeness, and legal basis documentation.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '1 hr',
    questionCount: 40,
  },
  {
    id: 'AT-010',
    name: 'AI System Risk Assessment',
    description: 'Evaluate an AI system\'s risk profile across dimensions of fairness, explainability, robustness, and regulatory compliance.',
    category: 'AI Governance',
    tier: 'plus',
    module: 'AI Governance',
    estimatedTime: '2 hrs',
    questionCount: 58,
  },
  {
    id: 'AT-011',
    name: 'AI Model Bias & Fairness Assessment',
    description: 'Test AI models for discriminatory outputs, demographic bias, and adherence to ethical AI principles.',
    category: 'AI Governance',
    tier: 'plus',
    module: 'AI Governance',
    estimatedTime: '1.5 hrs',
    questionCount: 44,
  },
  // ── OT Premium — TPRM, GRC, Data Discovery ───────────────────────────────────
  {
    id: 'AT-012',
    name: 'Third-Party Privacy Assessment',
    description: 'Comprehensive privacy due diligence for sub-processors and data recipients, including transfer mechanism validation.',
    category: 'Third-Party Risk',
    tier: 'premium',
    module: 'TPRM',
    estimatedTime: '2 hrs',
    questionCount: 60,
  },
  {
    id: 'AT-013',
    name: 'Cross-Border Transfer Assessment',
    description: 'Evaluate adequacy decisions, Standard Contractual Clauses, and supplementary measures for international data transfers.',
    category: 'Privacy',
    tier: 'premium',
    module: 'Privacy Management',
    estimatedTime: '1.5 hrs',
    questionCount: 48,
  },
  {
    id: 'AT-014',
    name: 'GDPR Readiness Assessment',
    description: 'Full-scope GDPR compliance evaluation across all 99 articles, covering governance, data flows, rights, and security.',
    category: 'Regulatory',
    tier: 'premium',
    module: 'GRC',
    estimatedTime: '4 hrs',
    questionCount: 120,
  },
  {
    id: 'AT-015',
    name: 'CCPA / CPRA Compliance Assessment',
    description: 'Evaluate compliance with California Consumer Privacy Act and CPRA amendments for consumer rights and opt-out mechanisms.',
    category: 'Regulatory',
    tier: 'premium',
    module: 'GRC',
    estimatedTime: '2 hrs',
    questionCount: 72,
  },
  {
    id: 'AT-016',
    name: 'GRC Control Effectiveness Assessment',
    description: 'Test the design and operating effectiveness of privacy and security controls against GRC frameworks.',
    category: 'GRC',
    tier: 'premium',
    module: 'GRC',
    estimatedTime: '3 hrs',
    questionCount: 96,
  },
  {
    id: 'AT-017',
    name: 'Sensitive Data Discovery Assessment',
    description: 'Identify unknown personal and sensitive data stores across structured and unstructured repositories.',
    category: 'Data Discovery',
    tier: 'premium',
    module: 'Data Discovery',
    estimatedTime: '2 hrs',
    questionCount: 54,
  },
  {
    id: 'AT-018',
    name: 'Privacy Programme Maturity Assessment',
    description: 'Benchmark your privacy programme against industry maturity models including NIST Privacy Framework and ISO 29101.',
    category: 'Privacy',
    tier: 'premium',
    module: 'Privacy Management',
    estimatedTime: '3 hrs',
    questionCount: 88,
  },
  {
    id: 'AT-019',
    name: 'Breach Readiness & Response Assessment',
    description: 'Assess incident detection capabilities, notification procedures, and regulatory reporting readiness.',
    category: 'Incident Management',
    tier: 'premium',
    module: 'Privacy Management',
    estimatedTime: '1.5 hrs',
    questionCount: 50,
  },
]

export interface AssessmentInstance {
  id: string
  typeId: string
  typeName: string
  subject: string           // vendor name, system name, etc.
  status: 'Not Started' | 'In Progress' | 'In Review' | 'Completed' | 'Overdue'
  assignedTo: string
  dueDate: string
  completedDate?: string
  score?: number            // 0–100 if completed
  tier: AssessmentTier
}

export const assessmentInstances: AssessmentInstance[] = [
  { id: 'AI-001', typeId: 'AT-001', typeName: 'Vendor Risk Assessment', subject: 'OpenAI', status: 'Completed', assignedTo: 'Sarah Chen', dueDate: 'Mar 15, 2026', completedDate: 'Mar 12, 2026', score: 78, tier: 'lite' },
  { id: 'AI-002', typeId: 'AT-001', typeName: 'Vendor Risk Assessment', subject: 'Snowflake', status: 'In Progress', assignedTo: 'Mark Rivera', dueDate: 'Jun 01, 2026', tier: 'lite' },
  { id: 'AI-003', typeId: 'AT-002', typeName: 'Security Questionnaire', subject: 'AWS Integration', status: 'Completed', assignedTo: 'Tom Walsh', dueDate: 'Apr 10, 2026', completedDate: 'Apr 08, 2026', score: 91, tier: 'lite' },
  { id: 'AI-004', typeId: 'AT-004', typeName: 'Internal Compliance Audit', subject: 'Q1 2026 Audit', status: 'Completed', assignedTo: 'Priya Nair', dueDate: 'Apr 30, 2026', completedDate: 'Apr 28, 2026', score: 84, tier: 'lite' },
  { id: 'AI-005', typeId: 'AT-001', typeName: 'Vendor Risk Assessment', subject: 'DataDog', status: 'Overdue', assignedTo: 'Mark Rivera', dueDate: 'May 01, 2026', tier: 'lite' },
  { id: 'AI-006', typeId: 'AT-005', typeName: 'DPIA', subject: 'Customer Analytics Platform', status: 'In Review', assignedTo: 'Sarah Chen', dueDate: 'Jun 15, 2026', tier: 'plus' },
  { id: 'AI-007', typeId: 'AT-006', typeName: 'PIA', subject: 'Mobile App v3.0', status: 'In Progress', assignedTo: 'Priya Nair', dueDate: 'Jun 30, 2026', tier: 'plus' },
  { id: 'AI-008', typeId: 'AT-007', typeName: 'Cookie & Consent Audit', subject: 'Corporate Website', status: 'Completed', assignedTo: 'Tom Walsh', dueDate: 'Mar 31, 2026', completedDate: 'Mar 29, 2026', score: 72, tier: 'plus' },
  { id: 'AI-009', typeId: 'AT-010', typeName: 'AI System Risk Assessment', subject: 'HR Screening AI', status: 'Not Started', assignedTo: 'Sarah Chen', dueDate: 'Jul 15, 2026', tier: 'plus' },
  { id: 'AI-010', typeId: 'AT-011', typeName: 'AI Model Bias Assessment', subject: 'Fraud Detection', status: 'In Progress', assignedTo: 'Mark Rivera', dueDate: 'Jun 20, 2026', tier: 'plus' },
  { id: 'AI-011', typeId: 'AT-012', typeName: 'Third-Party Privacy Assessment', subject: 'Anthropic', status: 'Completed', assignedTo: 'Sarah Chen', dueDate: 'Feb 28, 2026', completedDate: 'Feb 25, 2026', score: 88, tier: 'premium' },
  { id: 'AI-012', typeId: 'AT-014', typeName: 'GDPR Readiness Assessment', subject: 'Enterprise-wide', status: 'In Progress', assignedTo: 'Priya Nair', dueDate: 'Aug 31, 2026', tier: 'premium' },
  { id: 'AI-013', typeId: 'AT-016', typeName: 'GRC Control Effectiveness', subject: 'Privacy Controls Q2', status: 'Not Started', assignedTo: 'Tom Walsh', dueDate: 'Sep 30, 2026', tier: 'premium' },
]
