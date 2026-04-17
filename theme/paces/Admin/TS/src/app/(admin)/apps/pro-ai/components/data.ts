export type MenuType = {
  icon?: string
  label: string
  href: string
  active?: boolean
}

export const mainMenuData: MenuType[] = [
  { icon: 'message-circle', label: 'Start Chat', href: '', active: true },
  { icon: 'search', label: 'Find Threads', href: '' },
  { icon: 'archive', label: 'Saved Sessions', href: '' },
  { icon: 'cpu', label: 'AI Tools', href: '' },
  { icon: 'video', label: 'AI Vision', href: '' },
  { icon: 'grid-pattern', label: 'Explore Models', href: '' },
]

export const workspaceData: MenuType[] = [
  { icon: 'folder-plus', label: 'New Workspace', href: '' },
  { icon: 'folder', label: 'Marketing', href: '' },
  { icon: 'folder', label: 'Design Team', href: '' },
  { icon: 'folder', label: 'DevOps', href: '' },
  { icon: 'folder', label: 'Legal', href: '' },
  { icon: 'folder', label: 'Freelancers', href: '' },
]

export const conversationData: MenuType[] = [
  { label: 'Website Redesign Brief', href: '' },
  { label: 'Sprint Planning Q2', href: '' },
  { label: 'Client Onboarding Script', href: '' },
  { label: 'Legal Agreement Review', href: '' },
  { label: 'Product Launch Sequence', href: '' },
  { label: 'Budget Automation Draft', href: '' },
]

export type FeatureType = {
  icon: string
  title: string
  href: string
}

export const featureData: FeatureType[] = [
  {
    icon: 'brain',
    title: 'Generate AI-powered insights from customer reviews',
    href: '',
  },
  {
    icon: 'robot',
    title: 'Create chatbot responses for common support questions',
    href: '',
  },
  {
    icon: 'text-recognition',
    title: 'Summarize lengthy documents using AI',
    href: '',
  },
]
