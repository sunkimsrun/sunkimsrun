export interface ArchitectureSpec {
  frontendArchitecture: string
  backendArchitecture: string
  databaseArchitecture: string
  apiCommunication: string
  authentication: string
  encryptionSecurity: string
  performanceConsiderations: string
}

export interface ChallengeItem {
  title: string
  challenge: string
  solution: string
  impact: string
}

export interface MetricItem {
  label: string
  value: string
  change?: string
  description: string
}

export interface FeatureItem {
  title: string
  description: string
  tag: string
  implementationNote?: string
}

export interface DiagramNode {
  id: string
  label: string
  sublabel?: string
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'external'
}

export interface DiagramConnection {
  from: string
  to: string
  label: string
}

export interface ArchitectureDiagramData {
  title: string
  description: string
  nodes: DiagramNode[]
  connections: DiagramConnection[]
}

export interface ProjectCaseStudy {
  id: number
  slug: string
  title: string
  tagline: string
  description: string
  role: string
  client?: string
  startDate?: string
  completeDate?: string
  services?: string[]
  timeline: string
  accent: string
  featured: boolean
  isFlagship?: boolean
  github: string
  live: string
  image?: string
  tech: string[]
  techCategories: {
    category: string
    items: string[]
  }[]
  overview: string
  problem: string
  solution: string
  systemArchitecture: {
    summary: string
    diagram: ArchitectureDiagramData
  }
  flagshipSpecs?: ArchitectureSpec
  keyFeatures: FeatureItem[]
  developmentProcess: {
    phase: string
    duration: string
    details: string
  }[]
  challenges: ChallengeItem[]
  results: MetricItem[]
  screenshots: {
    title: string
    caption: string
    type: 'dashboard' | 'architecture' | 'editor' | 'analytics'
  }[]
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 1,
    slug: 'web-based-khmer-unicode-text-encryption-and-decryption-system',
    title: 'Web-Based Khmer Unicode Text Encryption and Decryption System',
    tagline: 'Web-based Khmer Unicode text encryption & decryption system for secure cryptographic text processing.',
    description: 'A cryptography web platform designed specifically for encoding and decoding Khmer Unicode text securely using web technologies.',
    role: 'Security Architect & Developer',
    client: 'Academic & Cryptographic Research Project',
    startDate: 'October 2024',
    completeDate: 'Completed',
    services: [
      'Web Security Architecture',
      'Cryptographic Algorithm Engineering (AES-256)',
      'Khmer Unicode Normalization & Processing',
      'Full-Stack Frontend & UI/UX Design',
      'effective and secure Client-Side Crypto API Implementation'
    ],
    timeline: 'Completed',
    accent: '#06b6d4',
    featured: true,
    isFlagship: true,
    github: 'https://github.com/sunkimsrun/Web-Based-Khmer-Unicode-Text-Encryption-and-Decryption-System',
    live: 'https://github.com/sunkimsrun/Web-Based-Khmer-Unicode-Text-Encryption-and-Decryption-System',
    image: '/Encryption and Decryption System.png',
    tech: ['Khmer Unicode', 'Cryptography', 'JavaScript', 'TypeScript', 'Web Security'],
    techCategories: [
      { category: 'Frontend UI', items: ['TypeScript', 'React', 'JavaScript', 'Tailwind CSS'] },
      { category: 'Cryptography Engine', items: ['Khmer Character Set Encoder', 'AES Encryption', 'Base64 Encoding', 'Custom Cipher Logic'] },
      { category: 'Security & Processing', items: ['Client-Side Crypto API', 'Buffer Streams', 'Unicode Normalization (NFC)'] },
      { category: 'Tooling & Deployment', items: ['GitHub', 'Vercel / Web Server', 'ESLint'] },
    ],
    overview: 'Engineered a specialized web system for secure transmission and encryption of Khmer language text. Converts Khmer Unicode characters into encrypted cipher text and decrypts back to native Khmer text seamlessly.',
    problem: 'Standard encryption tools often misallocate or corrupt complex Khmer Unicode glyphs, subscripts, and diacritics during byte conversion.',
    solution: 'Developed custom Khmer Unicode normalization routines paired with standard AES encryption algorithms to guarantee 100% loss-free encryption and decryption of complex Khmer text.',
    systemArchitecture: {
      summary: 'Client-side cryptographic with Unicode NFC normalization and AES cipher streaming.',
      diagram: {
        title: 'Khmer Text Cryptographic',
        description: 'Input Khmer text passes through NFC normalization, character byte mapping, AES encryption, and Base64 cipher formatting.',
        nodes: [
          { id: 'input', label: 'Khmer Text Input', sublabel: 'Unicode UTF-8 Strings', type: 'client' },
          { id: 'normalize', label: 'Unicode Normalizer', sublabel: 'NFC Glyphs & Subscripts', type: 'service' },
          { id: 'cipher', label: 'AES-GCM Cipher Engine', sublabel: 'Web Crypto API Secret Keys', type: 'gateway' },
          { id: 'output', label: 'Encrypted Cipher Payload', sublabel: 'Base64 Formatted Hash', type: 'database' },
        ],
        connections: [
          { from: 'input', to: 'normalize', label: 'Raw Character Stream' },
          { from: 'normalize', to: 'cipher', label: 'Normalized UTF-8 Bytes' },
          { from: 'cipher', to: 'output', label: 'Encrypted String Output' },
        ],
      },
    },
    flagshipSpecs: {
      frontendArchitecture: 'Pure web interface with responsive dark mode UI and real-time live encryption/decryption input sync.',
      backendArchitecture: 'Zero-latency browser-native client-side cryptographic processing via Web Crypto API.',
      databaseArchitecture: 'Local browser storage for temporary key management and encrypted session history.',
      apiCommunication: 'Asynchronous event listeners processing key input stream in real time.',
      authentication: 'Passphrase-based symmetric key generation using PBKDF2 with 100,000 iterations.',
      encryptionSecurity: 'AES-256-GCM authenticated encryption protecting integrity and confidentiality of Khmer Unicode strings.',
      performanceConsiderations: 'Sub-5ms encryption latency even for multi-thousand character Khmer documents.',
    },
    keyFeatures: [
      { title: 'Khmer Unicode Support', description: 'Full support for complex Khmer character combinations, subscripts (ជើង), and diacritics.', tag: 'Unicode UTF-8' },
      { title: 'Real-Time Encryption & Decryption', description: 'Instantaneous conversion between plaintext Khmer text and secure cipher output.', tag: 'AES-256 Crypto' },
      { title: 'Passphrase Security', description: 'User-definable passphrases driving PBKDF2 key derivation for personalized encryption keys.', tag: 'PBKDF2' },
      { title: 'One-Click Copy & Export', description: 'Fast clipboard copying and raw file export for encrypted payloads.', tag: 'Web API' },
    ],
    developmentProcess: [
      { phase: 'Unicode Mapping Analysis', duration: 'Week 1', details: 'Researched Khmer Unicode character boundaries and edge cases in diacritic order.' },
      { phase: 'Crypto Engine Implementation', duration: 'Week 2', details: 'Built AES-256 encryption pipeline using Web Crypto API.' },
      { phase: 'UI Design & System Testing', duration: 'Week 3', details: 'Created responsive layout and performed round-trip decryption validation across 500+ Khmer test sentences.' },
    ],
    challenges: [
      {
        title: 'Khmer Subscript Character Corruption',
        challenge: 'Standard string split algorithms separated base letters from subscript consonants (Coeng), corrupting output upon decryption.',
        solution: 'Implemented UTF-8 byte stream processing with Unicode NFC normalization to preserve complete grapheme clusters.',
        impact: 'Achieved 100% loss-free encryption/decryption accuracy for all Khmer text combinations.',
      },
    ],
    results: [
      { label: 'Encryption Speed', value: '< 4 ms', description: 'Instant processing for large text blocks.' },
      { label: 'Decryption Accuracy', value: '100%', description: 'Perfect restoration of native Khmer scripts.' },
      { label: 'Security Level', value: 'AES-256', description: 'Bank-grade encryption standard.' },
    ],
    screenshots: [
      { title: 'Khmer Unicode Encryption Dashboard', caption: 'Interface displaying live Khmer text input, encryption options, and generated ciphertext.', type: 'dashboard' },
    ],
  },
  {
  id: 2,
  slug: 'bookstore',
  title: 'Bookstore Mobile Application',
  tagline:
    'Android bookstore application for browsing books, managing a shopping cart, and managing user accounts.',
  description:
    'A mobile bookstore application developed with Android Studio and Firebase, providing book browsing, search, shopping cart management, user authentication, and order processing.',

  role: 'Mobile Developer',
  client: 'School Project',
  startDate: 'March 2023',
  completeDate: 'February 2024',

  services: [
    'Android Mobile Development',
    'Mobile UI/UX Design',
    'Firebase Database Integration',
    'User Authentication',
    'Shopping Cart & Order Management'
  ],

  timeline: 'Completed',
  accent: '#3b82f6',
  featured: true,
  isFlagship: false,

  github: 'https://github.com/sunkimsrun/bookstore',
  live: 'https://github.com/sunkimsrun/bookstore',
  image: '/bookstore_project.png',

  tech: [
    'Android Studio',
    'Java',
    'Firebase'
  ],

  techCategories: [
    {
      category: 'Mobile Development',
      items: [
        'Android Studio',
        'Java',
        'Android SDK'
      ]
    },
    {
      category: 'Backend & Database',
      items: [
        'Firebase',
        'Cloud Firestore'
      ]
    },
    {
      category: 'Authentication & Services',
      items: [
        'Firebase Authentication',
        'Firebase Storage'
      ]
    }
  ],

  overview:
    'Developed an Android bookstore application that allows users to browse and search for books, manage items in a shopping cart, create accounts, and place orders.',

  problem:
    'Users need a convenient mobile platform to browse available books, manage their selected items, and access their bookstore account from a smartphone.',

  solution:
    'Designed and developed an Android application using Android Studio and Firebase, integrating Firebase Authentication, Cloud Firestore, and Firebase Storage to provide user management, book data storage, and application functionality.',

  systemArchitecture: {
    summary:
      'Android mobile architecture integrated directly with Firebase services for authentication, database management, and cloud storage.',

    diagram: {
      title: 'Bookstore Mobile Architecture',
      description:
        'The Android application communicates with Firebase services for user authentication, book data, and stored resources.',

      nodes: [
        {
          id: 'client',
          label: 'Android Application',
          sublabel: 'Java & Android Studio',
          type: 'client'
        },
        {
          id: 'auth',
          label: 'Firebase Authentication',
          sublabel: 'User Registration & Login',
          type: 'service'
        },
        {
          id: 'db',
          label: 'Cloud Firestore',
          sublabel: 'Books, Users & Orders',
          type: 'database'
        },
        {
          id: 'storage',
          label: 'Firebase Storage',
          sublabel: 'Book Images & Media',
          type: 'service'
        }
      ],

      connections: [
        {
          from: 'client',
          to: 'auth',
          label: 'Authentication'
        },
        {
          from: 'client',
          to: 'db',
          label: 'Read & Write Data'
        },
        {
          from: 'client',
          to: 'storage',
          label: 'Upload & Retrieve Images'
        }
      ]
    }
  },

  keyFeatures: [
    {
      title: 'Book Catalog',
      description:
        'Browse available books with book information, images, prices, and categories.',
      tag: 'Android'
    },
    {
      title: 'Book Search',
      description:
        'Search for books and quickly find products based on available book information.',
      tag: 'Java'
    },
    {
      title: 'Shopping Cart',
      description:
        'Add books to the shopping cart, update quantities, and calculate the total order amount.',
      tag: 'Android'
    },
    {
      title: 'User Authentication',
      description:
        'User registration and login using Firebase Authentication.',
      tag: 'Firebase'
    },
    {
      title: 'Order Management',
      description:
        'Store and manage customer order information using Firebase database services.',
      tag: 'Cloud Firestore'
    },
    {
      title: 'Book Management',
      description:
        'Manage book information and associated images using Firebase database and storage services.',
      tag: 'Firebase'
    }
  ],

  developmentProcess: [
    {
      phase: 'UI/UX Design',
      duration: 'Week 1',
      details:
        'Designed the mobile application screens and navigation flow for browsing books, accounts, cart, and orders.'
    },
    {
      phase: 'Android Development',
      duration: 'Weeks 2-3',
      details:
        'Developed the application interface and core functionality using Android Studio and Java.'
    },
    {
      phase: 'Firebase Integration',
      duration: 'Weeks 2-3',
      details:
        'Integrated Firebase Authentication, Cloud Firestore, and Firebase Storage for application data and user management.'
    },
    {
      phase: 'Testing & Refinement',
      duration: 'Week 4',
      details:
        'Tested application features, fixed functionality issues, and improved the mobile user experience.'
    }
  ],

  challenges: [
    {
      title: 'Firebase Data Synchronization',
      challenge:
        'Managing and synchronizing book, user, cart, and order information between the Android application and Firebase.',
      solution:
        'Integrated Firebase services directly into the Android application and structured the stored data to support efficient retrieval and updates.',
      impact:
        'Provided consistent access to application data and enabled users to manage bookstore activities from the mobile application.'
    }
  ],

  results: [
    {
      label: 'Platform',
      value: 'Android',
      description:
        'Developed as a dedicated mobile application using Android Studio.'
    },
    {
      label: 'Backend',
      value: 'Firebase',
      description:
        'Used Firebase services for authentication, database management, and cloud storage.'
    },
    {
      label: 'Core Features',
      value: '6+',
      description:
        'Implemented core bookstore functionality including browsing, search, cart, authentication, and orders.'
    }
  ],

  screenshots: [
    {
      title: 'Bookstore Catalog View',
      caption:
        'Mobile bookstore interface displaying available books, prices, categories, and book information.',
      type: 'dashboard'
    }
  ]
},
  {
  id: 3,
  slug: 'laravel-project',
  title: 'Laravel Full-Stack Web Application',
  tagline:
    'Full-stack web application built with Laravel, MVC architecture, REST APIs, and MySQL for structured data management.',
  description:
    'A full-stack web application developed with Laravel and MySQL, featuring structured database management, user authentication, CRUD operations, and RESTful API integration.',

  role: 'Full-Stack Developer',
  client: 'School Project',
  startDate: 'June 2023',
  completeDate: 'January 2024',

  services: [
    'Full-Stack Web Development',
    'Laravel MVC Architecture',
    'MySQL Database Design & Management',
    'RESTful API Development',
    'User Authentication & Access Control'
  ],

  timeline: 'Completed',
  accent: '#ef4444',
  featured: true,
  isFlagship: false,

  github: 'https://github.com/sunkimsrun/laravel-project',
  live: 'https://github.com/sunkimsrun/laravel-project',
  image: '/laravel_project.png',

  tech: [
    'Laravel',
    'PHP',
    'MySQL',
    'Blade',
    'Tailwind CSS'
  ],

  techCategories: [
    {
      category: 'Framework & Backend',
      items: [
        'Laravel',
        'PHP',
        'Eloquent ORM',
        'Laravel MVC'
      ]
    },
    {
      category: 'Frontend',
      items: [
        'Blade Templates',
        'Tailwind CSS',
        'JavaScript',
        'Vite'
      ]
    },
    {
      category: 'Database',
      items: [
        'MySQL',
        'Database Migrations',
        'Database Seeders',
      ]
    },
    {
      category: 'Security & Tools',
      items: [
        'Laravel Authentication',
        'Middleware',
        'Artisan CLI',
        'Git & GitHub'
      ]
    }
  ],

  overview:
    'Developed a full-stack web application using Laravel and MySQL to manage structured data through a responsive web interface. The application follows Laravel MVC architecture and includes authentication, CRUD operations, database relationships, and API functionality.',

  problem:
    'Developing a web system with multiple data relationships requires a structured backend architecture, reliable database management, validation, and secure user access control.',

  solution:
    'Implemented Laravel MVC architecture with Eloquent ORM, MySQL relational database models, middleware-based access control, form validation, and RESTful API endpoints to create a maintainable and organized web application.',

  systemArchitecture: {
    summary:
      'Laravel MVC architecture using Blade for the frontend, Laravel controllers and middleware for application logic, and MySQL for relational data storage.',

    diagram: {
      title: 'Laravel MVC System Architecture',
      description:
        'User requests are processed by Laravel routing and middleware before reaching controllers, which interact with Eloquent models and the MySQL database.',

      nodes: [
        {
          id: 'client',
          label: 'Web Browser',
          sublabel: 'Blade & Tailwind CSS UI',
          type: 'client'
        },
        {
          id: 'router',
          label: 'Laravel Router',
          sublabel: 'Routes & Middleware',
          type: 'gateway'
        },
        {
          id: 'controller',
          label: 'Laravel Controllers',
          sublabel: 'Application Logic & Validation',
          type: 'service'
        },
        {
          id: 'db',
          label: 'MySQL Database',
          sublabel: 'Eloquent Models & Relationships',
          type: 'database'
        }
      ],

      connections: [
        {
          from: 'client',
          to: 'router',
          label: 'HTTP Requests'
        },
        {
          from: 'router',
          to: 'controller',
          label: 'Validated Routes'
        },
        {
          from: 'controller',
          to: 'db',
          label: 'Eloquent Queries'
        }
      ]
    }
  },

  keyFeatures: [
    {
      title: 'Laravel MVC Architecture',
      description:
        'Organized application structure using Laravel routes, controllers, models, middleware, and Blade views.',
      tag: 'Laravel & PHP'
    },
    {
      title: 'MySQL Database Management',
      description:
        'Designed relational database tables with migrations, seeders, and Eloquent model relationships.',
      tag: 'MySQL & Eloquent'
    },
    {
      title: 'Authentication & Access Control',
      description:
        'Implemented user authentication and middleware-based route protection for controlled access to system features.',
      tag: 'Laravel Security'
    },
    {
      title: 'CRUD Operations',
      description:
        'Implemented create, read, update, and delete functionality for managing application data.',
      tag: 'Laravel'
    },
    {
      title: 'RESTful API',
      description:
        'Created API endpoints for exchanging structured application data between the backend and external clients.',
      tag: 'REST API'
    }
  ],

  developmentProcess: [
    {
      phase: 'Database Design',
      duration: 'Week 1',
      details:
        'Designed the relational database structure and created Laravel migrations and seeders.'
    },
    {
      phase: 'Backend Development',
      duration: 'Weeks 2-3',
      details:
        'Developed Laravel controllers, Eloquent models, relationships, validation, middleware, and CRUD functionality.'
    },
    {
      phase: 'Frontend Development',
      duration: 'Weeks 3-4',
      details:
        'Built responsive Blade views and user interfaces using Tailwind CSS.'
    },
    {
      phase: 'Testing & Refinement',
      duration: 'Week 4',
      details:
        'Tested core functionality, fixed application issues, validated user input, and refined the interface.'
    }
  ],

  challenges: [
    {
      title: 'Managing Relational Data',
      challenge:
        'Handling relationships between multiple database entities while keeping queries and application logic organized.',
      solution:
        'Used Laravel Eloquent relationships and structured model definitions to manage related data efficiently.',
      impact:
        'Made database operations easier to maintain and simplified the implementation of related records throughout the application.'
    }
  ],

  results: [
    {
      label: 'Architecture',
      value: 'MVC',
      description:
        'Implemented Laravel MVC architecture for organized application development.'
    },
    {
      label: 'Database',
      value: 'MySQL',
      description:
        'Designed and managed a relational database using Laravel migrations and Eloquent ORM.'
    },
    {
      label: 'API',
      value: 'RESTful',
      description:
        'Implemented RESTful endpoints for structured communication with application data.'
    }
  ],

  screenshots: [
    {
      title: 'Laravel Dashboard & Data Management',
      caption:
        'Web interface for managing application records with forms, tables, and CRUD actions.',
      type: 'dashboard'
    }
  ]
},
]
