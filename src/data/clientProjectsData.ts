export interface ClientProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  buttonText: string;
  link: string;
  number: string;
  shortTitle: string;
  impact: string;
  stats: { label: string; value: string }[];
  gallery: { title: string; subtitle: string; image: string }[];
  accentBorderHover: string;
  glowGradient: string;
  iconStyle: string;
  eyebrowColor: string;
}

export const CLIENT_PROJECTS: ClientProject[] = [
  {
    id: '01',
    title: 'GramSetu',
    category: 'Web & Mobile Platform',
    description:
      'A digital platform connecting villages, citizens, and local administration through one accessible ecosystem.',
    image: '/projects/gramsetu.webp',
    techStack: ['Next.js', 'Node.js', 'MongoDB'],
    buttonText: 'View Project',
    link: '/projects/gramsetu',

    number: '01 / 04',
    shortTitle: 'Connecting Communities',
    impact:
      'Simplifying communication, services, and access to important village information through a unified digital platform.',

    stats: [
      { label: 'Platform', value: 'Web + Mobile' },
      { label: 'Language', value: 'Hindi + English' },
      { label: 'Dashboard', value: 'Admin Panel' },
    ],

    gallery: [
      {
        title: 'Citizen Experience',
        subtitle: 'Simple access to village services and information.',
        image: '/projects/gramsetu-1.webp',
      },
      {
        title: 'Admin Dashboard',
        subtitle: 'Manage complaints, projects, notices, and meetings.',
        image: '/projects/gramsetu-2.webp',
      },
    ],

    accentBorderHover: 'hover:border-[#00AEEF]/40',
    glowGradient:
      'bg-[radial-gradient(circle_at_50%_50%,rgba(0,174,239,0.16),transparent_70%)]',
    iconStyle: 'text-[#00AEEF]',
    eyebrowColor: 'text-[#00AEEF]',
  },

  {
    id: '02',
    title: 'Finora',
    category: 'FinTech Dashboard',
    description:
      'A modern financial management platform designed to simplify business finance tracking and reporting.',
    image: '/projects/finora.webp',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    buttonText: 'View Project',
    link: '/projects/finora',

    number: '02 / 04',
    shortTitle: 'Simplifying Finance',
    impact:
      'Bringing financial information, reporting, and business insights into one clear and easy-to-use dashboard.',

    stats: [
      { label: 'Platform', value: 'Web App' },
      { label: 'Backend', value: 'Node.js' },
      { label: 'Database', value: 'PostgreSQL' },
    ],

    gallery: [
      {
        title: 'Finance Dashboard',
        subtitle: 'Clear overview of business financial activity.',
        image: '/projects/finora-1.webp',
      },
      {
        title: 'Reports & Insights',
        subtitle: 'Organized financial data for better decisions.',
        image: '/projects/finora-2.webp',
      },
    ],

    accentBorderHover: 'hover:border-[#7C5CFC]/40',
    glowGradient:
      'bg-[radial-gradient(circle_at_50%_50%,rgba(124,92,252,0.16),transparent_70%)]',
    iconStyle: 'text-[#7C5CFC]',
    eyebrowColor: 'text-[#7C5CFC]',
  },

  {
    id: '03',
    title: 'MediCare',
    category: 'Healthcare Platform',
    description:
      'A patient-focused healthcare platform for appointments, medical records, and seamless communication.',
    image: '/projects/medicare.webp',
    techStack: ['React', 'Express', 'MongoDB'],
    buttonText: 'View Project',
    link: '/projects/medicare',

    number: '03 / 04',
    shortTitle: 'Better Healthcare Access',
    impact:
      'Making healthcare workflows simpler by bringing appointments, patient information, and communication into one platform.',

    stats: [
      { label: 'Platform', value: 'Web Platform' },
      { label: 'Frontend', value: 'React' },
      { label: 'Backend', value: 'Express' },
    ],

    gallery: [
      {
        title: 'Patient Dashboard',
        subtitle: 'A clear and accessible healthcare experience.',
        image: '/projects/medicare-1.webp',
      },
      {
        title: 'Appointment Flow',
        subtitle: 'Simple appointment management for users.',
        image: '/projects/medicare-2.webp',
      },
    ],

    accentBorderHover: 'hover:border-[#22B573]/40',
    glowGradient:
      'bg-[radial-gradient(circle_at_50%_50%,rgba(34,181,115,0.16),transparent_70%)]',
    iconStyle: 'text-[#22B573]',
    eyebrowColor: 'text-[#22B573]',
  },

  {
    id: '04',
    title: 'Shopora',
    category: 'E-Commerce',
    description:
      'A scalable e-commerce experience with product discovery, secure checkout, and order management.',
    image: '/projects/shopora.webp',
    techStack: ['Next.js', 'TypeScript', 'MongoDB'],
    buttonText: 'View Project',
    link: '/projects/shopora',

    number: '04 / 04',
    shortTitle: 'Commerce Made Simple',
    impact:
      'Creating a smooth shopping experience with intuitive product discovery, streamlined checkout, and order management.',

    stats: [
      { label: 'Platform', value: 'E-Commerce' },
      { label: 'Frontend', value: 'Next.js' },
      { label: 'Language', value: 'TypeScript' },
    ],

    gallery: [
      {
        title: 'Product Experience',
        subtitle: 'Clean product discovery and browsing.',
        image: '/projects/shopora-1.webp',
      },
      {
        title: 'Shopping Flow',
        subtitle: 'A simple and focused checkout experience.',
        image: '/projects/shopora-2.webp',
      },
    ],

    accentBorderHover: 'hover:border-[#F59E0B]/40',
    glowGradient:
      'bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.16),transparent_70%)]',
    iconStyle: 'text-[#F59E0B]',
    eyebrowColor: 'text-[#F59E0B]',
  },
];