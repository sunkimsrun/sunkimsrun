export interface GitHubProfile {
  username: string
  name: string
  avatarUrl?: string
  bio: string
  profileUrl: string
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  totalContributions: number
  currentStreak: number
  longestStreak: number
}

export interface FeaturedRepo {
  id: string
  name: string
  fullName: string
  description: string
  primaryLanguage: string
  languageColor: string
  stars: number
  forks: number
  url: string
  isArchived?: boolean
  updatedAt: string
}

export interface LanguageStat {
  name: string
  percentage: number
  color: string
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // Intensity 0 = none, 4 = heavy
}

export interface RecentCommit {
  id: string
  repoName: string
  message: string
  hash: string
  timeAgo: string
  url: string
}

export interface GitHubData {
  profile: GitHubProfile
  languages: LanguageStat[]
  featuredRepos: FeaturedRepo[]
  recentCommits: RecentCommit[]
  contributionHistory: ContributionDay[]
}

// Generate realistic mock contribution grid data for 52 weeks (364 days)
const generateMockContributions = (): ContributionDay[] => {
  const days: ContributionDay[] = []
  const today = new Date('2026-08-09')
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    // Generate pseudo-random realistic contribution distribution
    const seed = (i * 37 + d.getDay() * 13) % 100
    let count = 0
    let level: 0 | 1 | 2 | 3 | 4 = 0

    if (seed > 25) {
      count = (seed % 9) + 1
      if (count <= 2) level = 1
      else if (count <= 4) level = 2
      else if (count <= 7) level = 3
      else level = 4
    }

    days.push({ date: dateStr, count, level })
  }
  return days
}

export const githubMockData: GitHubData = {
  profile: {
    username: 'sunkimsrun',
    name: 'Sun Kimsrun',
    bio: 'Software Engineer & Full-Stack Developer | Focused on High-Performance Web Applications, Microservices, and Security Architecture.',
    profileUrl: 'https://github.com/sunkimsrun',
    publicRepos: 24,
    followers: 184,
    following: 62,
    totalStars: 146,
    totalForks: 38,
    totalContributions: 1420,
    currentStreak: 19,
    longestStreak: 45,
  },
  languages: [
    { name: 'TypeScript', percentage: 48, color: '#3178c6' },
    { name: 'C++', percentage: 22, color: '#f34b7d' },
    { name: 'JavaScript', percentage: 14, color: '#f1e05a' },
    { name: 'Python', percentage: 10, color: '#3572A5' },
    { name: 'Java', percentage: 6, color: '#b07219' },
  ],
  featuredRepos: [
    {
      id: 'repo-1',
      name: 'Web-Based-Khmer-Unicode-Text-Encryption-and-Decryption-System',
      fullName: 'sunkimsrun/Web-Based-Khmer-Unicode-Text-Encryption-and-Decryption-System',
      description: 'Web-based Khmer Unicode text encryption & decryption system for secure text communication and cryptographic processing.',
      primaryLanguage: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 12,
      forks: 3,
      url: 'https://github.com/sunkimsrun/Web-Based-Khmer-Unicode-Text-Encryption-and-Decryption-System',
      updatedAt: 'In Progress',
    },
    {
      id: 'repo-2',
      name: 'bookstore',
      fullName: 'sunkimsrun/bookstore',
      description: 'Full-stack online bookstore platform featuring catalog search, shopping cart management, user authentication, and order processing.',
      primaryLanguage: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 18,
      forks: 5,
      url: 'https://github.com/sunkimsrun/bookstore',
      updatedAt: 'Completed',
    },
    {
      id: 'repo-3',
      name: 'laravel-project',
      fullName: 'sunkimsrun/laravel-project',
      description: 'Enterprise web application engineered using Laravel framework with MVC architecture, relational MySQL schemas, and REST APIs.',
      primaryLanguage: 'PHP',
      languageColor: '#4F5D95',
      stars: 24,
      forks: 8,
      url: 'https://github.com/sunkimsrun/laravel-project',
      updatedAt: 'Completed',
    },
  ],
  recentCommits: [
    {
      id: 'c1',
      repoName: 'enterprise-ecommerce',
      message: 'feat: implement atomic Redis Lua locks for stock reservation',
      hash: 'a7b8c9d',
      timeAgo: '3 hours ago',
      url: 'https://github.com/sunkimsrun/enterprise-ecommerce/commit/a7b8c9d',
    },
    {
      id: 'c2',
      repoName: 'realtime-task-engine',
      message: 'refactor: optimize socket delta payload serialization to 30fps',
      hash: 'e4f5g6h',
      timeAgo: '1 day ago',
      url: 'https://github.com/sunkimsrun/realtime-task-engine/commit/e4f5g6h',
    },
    {
      id: 'c3',
      repoName: 'crypto-protocol-suite',
      message: 'perf: add SIMD vectorized AES encryption block acceleration',
      hash: 'i7j8k9l',
      timeAgo: '3 days ago',
      url: 'https://github.com/sunkimsrun/crypto-protocol-suite/commit/i7j8k9l',
    },
  ],
  contributionHistory: generateMockContributions(),
}
