export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  number?: string;
  phase?: string;
  title: string;
  description?: string;
  summary?: string;
}

export interface ServiceMetric {
  label: string;
  value: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  timeline: string;
  engagementModel: string;
  image: string;
  accentColor: string;
  deliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  techStack: string[];
  metrics: ServiceMetric[];
  relatedIds: string[];
}

export const TAVQEN_SERVICES: ServiceDetail[] = [
  {
    id: 'mobile-app-development',
    number: '01',
    badge: 'Mobile Development',
    title: 'Mobile App Development',
    tagline: 'Apps That Move With Your Business',
    overview:
      'We build fast, scalable, and user-friendly mobile applications that turn ideas into reliable digital experiences.',
    challenge:
      'Businesses often struggle with complex user flows, inconsistent performance, and mobile experiences that fail to meet real user needs.',
    solution:
      'We design and develop modern mobile applications with intuitive UX, scalable architecture, secure APIs, and smooth performance.',
    timeline: '4–12 Weeks',
    engagementModel: 'Project-Based / Dedicated Team',
    image: '/services/mobile-app-development.webp',
    accentColor: '#0088CC',

    deliverables: [
      {
        title: 'UI/UX Design',
        description:
          'Clean and intuitive mobile interfaces designed around your users.',
      },
      {
        title: 'Cross-Platform Development',
        description:
          'High-quality applications for Android and iOS from a scalable codebase.',
      },
      {
        title: 'API Integration',
        description:
          'Secure integration with APIs, databases, authentication, and third-party services.',
      },
      {
        title: 'Testing & Deployment',
        description:
          'Performance testing, bug fixing, and production-ready deployment.',
      },
    ],

    process: [
      {
        number: '01',
        title: 'Discover',
        description:
          'Understand your product idea, users, goals, and technical requirements.',
      },
      {
        number: '02',
        title: 'Design',
        description:
          'Create user flows, wireframes, and polished mobile interfaces.',
      },
      {
        number: '03',
        title: 'Develop',
        description:
          'Build the application with clean, scalable, and maintainable code.',
      },
      {
        number: '04',
        title: 'Launch',
        description:
          'Test, optimize, deploy, and support the application after launch.',
      },
    ],

    techStack: [
      'React Native',
      'Flutter',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase',
    ],

    metrics: [
      {
        value: '4–12',
        label: 'Weeks',
      },
      {
        value: '2',
        label: 'Platforms',
      },
      {
        value: '99%',
        label: 'Focus on Quality',
      },
    ],

    relatedIds: [
      'website-development',
      'ai-solutions',
      'custom-software',
    ],
  },

  {
    id: 'website-development',
    number: '02',
    badge: 'Web Development',
    title: 'Website Development',
    tagline: 'Digital Experiences Built to Perform',
    overview:
      'We create modern, responsive, and high-performance websites that help businesses build credibility and grow online.',
    challenge:
      'A slow, outdated, or confusing website can reduce trust, engagement, and conversions.',
    solution:
      'We combine modern design, responsive development, strong performance, and scalable architecture to build websites that deliver real business value.',
    timeline: '2–8 Weeks',
    engagementModel: 'Project-Based / Retainer',
    image: '/services/website-development.webp',
    accentColor: '#7C3AED',

    deliverables: [
      {
        title: 'Business Websites',
        description:
          'Professional websites designed to represent your brand and services.',
      },
      {
        title: 'Web Applications',
        description:
          'Interactive and scalable web applications built around your business requirements.',
      },
      {
        title: 'Responsive Design',
        description:
          'Seamless experiences across desktop, tablet, and mobile devices.',
      },
      {
        title: 'Performance & SEO',
        description:
          'Fast-loading, search-friendly, and optimized digital experiences.',
      },
    ],

    process: [
      {
        number: '01',
        title: 'Discover',
        description:
          'Understand your business, audience, goals, and website requirements.',
      },
      {
        number: '02',
        title: 'Design',
        description:
          'Create a modern visual direction and user experience for your website.',
      },
      {
        number: '03',
        title: 'Build',
        description:
          'Develop responsive pages with clean and scalable architecture.',
      },
      {
        number: '04',
        title: 'Launch',
        description:
          'Optimize, test, deploy, and monitor your website for production.',
      },
    ],

    techStack: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'MongoDB',
      'Vercel',
    ],

    metrics: [
      {
        value: '2–8',
        label: 'Weeks',
      },
      {
        value: '100%',
        label: 'Responsive',
      },
      {
        value: 'SEO',
        label: 'Ready',
      },
    ],

    relatedIds: [
      'mobile-app-development',
      'custom-software',
      'ai-solutions',
    ],
  },

  {
    id: 'ai-solutions',
    number: '03',
    badge: 'Artificial Intelligence',
    title: 'AI Solutions',
    tagline: 'Intelligence That Creates New Possibilities',
    overview:
      'We integrate practical AI capabilities into products and workflows to automate tasks, improve decisions, and create smarter user experiences.',
    challenge:
      'Businesses have valuable data and repetitive workflows but often lack the right AI systems to turn them into useful outcomes.',
    solution:
      'We build AI-powered features using modern models, APIs, automation, and intelligent workflows tailored to your product.',
    timeline: '4–12 Weeks',
    engagementModel: 'Project-Based / AI Integration',
    image: '/services/ai-solutions.webp',
    accentColor: '#06B6D4',

    deliverables: [
      {
        title: 'AI Integration',
        description:
          'Integrate AI capabilities into existing websites, apps, and software.',
      },
      {
        title: 'AI Assistants',
        description:
          'Build intelligent assistants for customer support, productivity, and internal workflows.',
      },
      {
        title: 'Automation',
        description:
          'Automate repetitive processes using AI-powered workflows.',
      },
      {
        title: 'RAG & Knowledge Systems',
        description:
          'Build AI systems that can work with your documents, data, and business knowledge.',
      },
    ],

    process: [
      {
        number: '01',
        title: 'Identify',
        description:
          'Find the business problem where AI can create meaningful value.',
      },
      {
        number: '02',
        title: 'Plan',
        description:
          'Choose the right models, architecture, APIs, and data strategy.',
      },
      {
        number: '03',
        title: 'Build',
        description:
          'Develop and integrate the AI-powered solution into your product.',
      },
      {
        number: '04',
        title: 'Optimize',
        description:
          'Evaluate performance, improve reliability, and prepare for scale.',
      },
    ],

    techStack: [
      'OpenAI',
      'Gemini',
      'LangChain',
      'Python',
      'Node.js',
      'TypeScript',
      'Vector Databases',
    ],

    metrics: [
      {
        value: '24/7',
        label: 'Automation',
      },
      {
        value: 'AI',
        label: 'Powered',
      },
      {
        value: 'Scalable',
        label: 'Architecture',
      },
    ],

    relatedIds: [
      'custom-software',
      'website-development',
      'mobile-app-development',
    ],
  },

  {
    id: 'custom-software',
    number: '04',
    badge: 'Custom Software',
    title: 'Custom Software',
    tagline: 'Software Designed Around Your Business',
    overview:
      'We build custom software solutions that solve specific business problems, streamline operations, and support long-term growth.',
    challenge:
      'Off-the-shelf software often creates limitations when your workflows, teams, and business requirements are unique.',
    solution:
      'We design and develop tailored software with modular architecture, secure APIs, role-based access, dashboards, and scalable infrastructure.',
    timeline: '6–16 Weeks',
    engagementModel: 'Dedicated Development / Project-Based',
    image: '/services/custom-software.webp',
    accentColor: '#F97316',

    deliverables: [
      {
        title: 'Business Platforms',
        description:
          'Custom platforms built around your unique business workflows.',
      },
      {
        title: 'Admin Dashboards',
        description:
          'Centralized dashboards for managing users, data, operations, and insights.',
      },
      {
        title: 'API & Backend Systems',
        description:
          'Secure and scalable backend services designed for your application.',
      },
      {
        title: 'Cloud Deployment',
        description:
          'Production-ready deployment with scalable cloud infrastructure.',
      },
    ],

    process: [
      {
        number: '01',
        title: 'Understand',
        description:
          'Study your workflows, users, requirements, and business challenges.',
      },
      {
        number: '02',
        title: 'Architect',
        description:
          'Plan the system architecture, database, APIs, and technology stack.',
      },
      {
        number: '03',
        title: 'Develop',
        description:
          'Build the software in structured and scalable development cycles.',
      },
      {
        number: '04',
        title: 'Scale',
        description:
          'Deploy, monitor, optimize, and continuously improve the platform.',
      },
    ],

    techStack: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'Docker',
      'AWS',
    ],

    metrics: [
      {
        value: '6–16',
        label: 'Weeks',
      },
      {
        value: '100%',
        label: 'Custom',
      },
      {
        value: 'Cloud',
        label: 'Ready',
      },
    ],

    relatedIds: [
      'website-development',
      'ai-solutions',
      'mobile-app-development',
    ],
  },

  {
    id: 'game-development',
    number: '05',
    badge: 'Game Development',
    title: 'Game Development',
    tagline: 'Interactive Experiences Built to Engage',
    overview:
      'We create engaging games and interactive digital experiences with strong visuals, smooth interactions, and scalable technology.',
    challenge:
      'Creating an engaging game requires more than attractive visuals—it needs thoughtful gameplay, performance, interaction, and technical stability.',
    solution:
      'We combine creative concepts with modern game technologies to develop immersive experiences for web, mobile, and other platforms.',
    timeline: '6–20 Weeks',
    engagementModel: 'Project-Based / Dedicated Team',
    image: '/services/game-development.webp',
    accentColor: '#EC4899',

    deliverables: [
      {
        title: 'Game Design',
        description:
          'Gameplay concepts, mechanics, user flows, and interactive experiences.',
      },
      {
        title: '2D & 3D Development',
        description:
          'Interactive game experiences with engaging visuals and smooth performance.',
      },
      {
        title: 'Multiplayer Features',
        description:
          'Real-time gameplay and multiplayer functionality where required.',
      },
      {
        title: 'Testing & Deployment',
        description:
          'Performance optimization, testing, and production deployment.',
      },
    ],

    process: [
      {
        number: '01',
        title: 'Concept',
        description:
          'Define the game idea, target audience, mechanics, and experience.',
      },
      {
        number: '02',
        title: 'Prototype',
        description:
          'Create an early playable version to validate the core experience.',
      },
      {
        number: '03',
        title: 'Develop',
        description:
          'Build gameplay, visuals, interactions, systems, and supporting services.',
      },
      {
        number: '04',
        title: 'Launch',
        description:
          'Optimize the game, test across platforms, and prepare the final release.',
      },
    ],

    techStack: [
      'Unity',
      'C#',
      'Three.js',
      'JavaScript',
      'React',
      'Node.js',
      'Socket.io',
    ],

    metrics: [
      {
        value: '6–20',
        label: 'Weeks',
      },
      {
        value: '2D/3D',
        label: 'Experiences',
      },
      {
        value: 'Real-Time',
        label: 'Capable',
      },
    ],

    relatedIds: [
      'mobile-app-development',
      'website-development',
      'custom-software',
    ],
  },
];
const SERVICE_ALIASES: Record<string, string> = {
  mobile: 'mobile-app-development',
  'mobile-app': 'mobile-app-development',
  'mobile-app-development': 'mobile-app-development',
  ios: 'mobile-app-development',
  android: 'mobile-app-development',

  web: 'website-development',
  website: 'website-development',
  'website-development': 'website-development',
  'web-app': 'website-development',

  ai: 'ai-solutions',
  'ai-solutions': 'ai-solutions',
  automation: 'ai-solutions',

  custom: 'custom-software',
  software: 'custom-software',
  'custom-software': 'custom-software',
  crm: 'custom-software',
  saas: 'custom-software',

  game: 'game-development',
  gaming: 'game-development',
  'game-development': 'game-development',
};

export function getServiceById(id?: string | null): ServiceDetail {
  if (!id) return TAVQEN_SERVICES[0];
  const normalized = id.trim().toLowerCase();
  const mappedId = SERVICE_ALIASES[normalized] || normalized;
  return (
    TAVQEN_SERVICES.find((s) => s.id.toLowerCase() === mappedId) ||
    TAVQEN_SERVICES.find((s) => s.id.toLowerCase().includes(mappedId)) ||
    TAVQEN_SERVICES[0]
  );
}

