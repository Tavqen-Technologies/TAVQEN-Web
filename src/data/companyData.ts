
import {
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  BookOpen,
  Award,
  Globe,
  Layers,
  Cpu,
  TrendingUp,
  Layout,
  ShoppingBag,
  BarChart3,
  Smartphone,
  Bot,
  Cloud,
  FolderGit2,
  LucideIcon,
} from 'lucide-react';

// 1. ABOUT HERO
export const ABOUT_HERO = {
  eyebrow: 'About TAVQEN',
  heading: 'Building Technology. Empowering Businesses. Creating Impact.',
  foundedYear: '2026',
  description:
    'We turn ambitious ideas into innovative digital solutions through software, AI, and modern technology.',
};

// 2. OUR STORY
export const OUR_STORY = {
  eyebrow: 'Our Story',
  heading: 'Ideas Into Innovation.',
  description:
    'Founded in 2026, TAVQEN was built with one purpose — turning real-world challenges into meaningful technology solutions.',
  highlight:
    'From client solutions to our own digital products, we are building technology for what comes next.',
};

// 3. VISION & MISSION
export const VISION_MISSION = {
  vision: {
    badge: 'Our Vision',
    headline: 'Building a Global Technology Future.',
    body:
      'To create impactful digital products and become a trusted name in global technology.',
  },
  mission: {
    badge: 'Our Mission',
    headline: 'Making Technology Work for Everyone.',
    body:
      'To deliver secure, scalable, and accessible solutions that help businesses grow.',
  },
};

// 4. CULTURE & VALUES
export interface CultureValue {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const CULTURE_VALUES: CultureValue[] = [
  {
    number: '01',
    title: 'Innovation',
    description: 'Think beyond possibilities.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Collaboration',
    description: 'Better ideas through teamwork.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Transparency',
    description: 'Honesty builds trust.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Ownership',
    description: 'Take responsibility. Deliver results.',
    icon: Zap,
  },
  {
    number: '05',
    title: 'Learning',
    description: 'Evolve with every challenge.',
    icon: BookOpen,
  },
  {
    number: '06',
    title: 'Excellence',
    description: 'Quality in everything we build.',
    icon: Award,
  },
];

// 5. OUR IMPACT
export interface ImpactCategory {
  title: string;
  icon: LucideIcon;
  badge: string;
}

export const OUR_IMPACT = {
  eyebrow: 'What We Build',
  heading: 'Technology That Moves Ideas Forward.',
  description:
    'From digital experiences to intelligent platforms, we build solutions that make a difference.',
  categories: [
    { title: 'Web Development', icon: Layout, badge: 'Web' },
    { title: 'Digital Commerce', icon: ShoppingBag, badge: 'E-commerce' },
    { title: 'Mobile Applications', icon: Smartphone, badge: 'Mobile' },
    { title: 'AI Solutions', icon: Bot, badge: 'Artificial Intelligence' },
    { title: 'SaaS Platforms', icon: Layers, badge: 'Products' },
    { title: 'Cloud Solutions', icon: Cloud, badge: 'Cloud' },
    { title: 'Admin Dashboards', icon: BarChart3, badge: 'Business Tools' },
    { title: 'Custom Software', icon: FolderGit2, badge: 'Engineering' },
  ] as ImpactCategory[],
};

// 6. OUR FUTURE
export interface FutureGoalGroup {
  category: string;
  badge: string;
  icon: LucideIcon;
  description: string;
}

export const OUR_FUTURE = {
  eyebrow: 'Looking Ahead',
  heading: 'The Future Is Ours to Build.',
  description:
    'We are continuously exploring new opportunities to create, innovate, and grow.',
  groups: [
    {
      category: 'Global Expansion',
      badge: '01',
      icon: Globe,
      description: 'Connecting businesses across borders.',
    },
    {
      category: 'Product Innovation',
      badge: '02',
      icon: Layers,
      description: 'Building our own SaaS and AI products.',
    },
    {
      category: 'Research & Technology',
      badge: '03',
      icon: Cpu,
      description: 'Exploring emerging technologies.',
    },
    {
      category: 'Business Growth',
      badge: '04',
      icon: TrendingUp,
      description: 'Creating lasting partnerships and opportunities.',
    },
  ] as FutureGoalGroup[],
};

// 7. FINAL CTA
export const JOIN_CTA = {
  eyebrow: 'Let’s Create Together',
  heading: 'Have an Idea? Let’s Build It.',
  description:
    'Your next big idea deserves the right technology partner.',
  primaryButton: 'Start a Project',
  secondaryButton: 'Contact Us',
};
