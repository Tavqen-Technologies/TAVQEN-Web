import {
  FileText,
  Image as ImageIcon,
  Play,
} from 'lucide-react';

import pdfHero from '../assits/products/pdf-hero.jpg';
import pdfOverview from '../assits/products/pdf-overview.jpg';
import pdfHomeDark from '../assits/products/pdf-home-dark.jpg';
import pdfHomeLight from '../assits/products/pdf-home-light.jpg';
import pdfAllTools from '../assits/products/pdf-all-tools.jpg';
import pdfConversion from '../assits/products/pdf-conversion.jpg';
import pdfSettings from '../assits/products/pdf-settings.jpg';
import pdfFiles from '../assits/products/pdf-files.jpg';
import vplayerHero from '../assits/products/vplayer-hero.jpg';
import vplayerOverview from '../assits/products/vplayer-overview.jpg';
import vplayerHomeDark from '../assits/products/vplayer-home-dark.jpg';
import vplayerHomeLight from '../assits/products/vplayer-home-light.jpg';
import vplayerLibrary from '../assits/products/vplayer-library.jpg';
import vplayerSearch from '../assits/products/vplayer-search.jpg';
import vplayerCollections from '../assits/products/vplayer-collections.jpg';
import product4 from '../assits/products/product4.webp';

export type ProductCategoryKey = 'productivity' | 'media' | 'creative';
export type ProductStatus = 'Available' | 'Beta' | 'In Development' | 'Planned';

export interface ProductGalleryItem {
  title: string;
  subtitle: string;
  image: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategoryKey;
  categoryLabel: string;
  status: ProductStatus;
  version: string;
  flowTitle: string;
  flowDescription: string;
  overview: string;
  image: string;
  alt: string;
  gallery?: ProductGalleryItem[];
  icon: typeof FileText;
  badgeColor: string;
  platforms: string[];
  stats: { label: string; value: string }[];
  features: { title: string; description: string; benefit: string }[];
  connectedWith: string[];
}

export const TAVQEN_PRODUCTS: ProductDetail[] = [
  {
    id: 'pdf',
    name: 'TAVQEN PDF',
    tagline: 'Complete Mobile PDF Solution',
    category: 'productivity',
    categoryLabel: 'Documents & Productivity',
    status: 'Available',
    version: 'Version 1.0',
    flowTitle: 'TAVQEN PDF → Document Tools',
    flowDescription:
      'Merge PDF, Split PDF, Images to PDF, PDF to Images, Compress PDF, and Convert tools in one workspace.',
    overview:
      'TAVQEN PDF helps mobile users organize, convert, compress, and manage PDF files effortlessly—combining Merge PDF, Split PDF, Images to PDF, PDF to Images, Compress PDF, and fast tool search inside one clean app.',
    image: pdfHero,
    alt: 'TAVQEN PDF application showcase',
    gallery: [
      { title: 'Showcase', subtitle: 'Your complete PDF solution', image: pdfHero },
      { title: 'Overview', subtitle: 'All screens & tools', image: pdfOverview },
      { title: 'Home (Dark)', subtitle: 'Quick tool dashboard', image: pdfHomeDark },
      { title: 'Home (Light)', subtitle: 'Clean light theme', image: pdfHomeLight },
      { title: 'All Tools', subtitle: '22+ PDF utilities', image: pdfAllTools },
      { title: 'Images to PDF', subtitle: 'On-device conversion', image: pdfConversion },
      { title: 'My Files', subtitle: 'Filter & manage PDFs', image: pdfFiles },
      { title: 'Settings', subtitle: 'Theme, format & quality', image: pdfSettings },
    ],
    icon: FileText,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['Android', 'Mobile App'],
    stats: [
      { label: 'Core Toolkit', value: '22+ Tools' },
      { label: 'Primary OS', value: 'Android' },
      { label: 'Status', value: 'Available' },
    ],
    features: [
      {
        title: 'Merge PDF',
        description: 'Combine multiple PDF files into one structured document before sharing or archiving.',
        benefit: 'Bring related notes, invoices, or application pages together in one file.',
      },
      {
        title: 'Split PDF',
        description: 'Extract specific page ranges or split multi-page files into smaller documents.',
        benefit: 'Share only the exact pages needed without sending extra sections.',
      },
      {
        title: 'Images to PDF & PDF to Images',
        description: 'Turn camera photos into PDF files or export existing PDF pages out as images.',
        benefit: 'Prepare receipts, forms, and study notes in whatever file format you need.',
      },
      {
        title: 'Compress PDF & Tool Search',
        description: 'Reduce document file size cleanly and quickly find tools via the Home search bar.',
        benefit: 'Upload forms reliably within file-size limits without leaving the app.',
      },
    ],
    connectedWith: ['player', 'imagetool'],
  },
  {
    id: 'player',
    name: 'TAVQEN VPlayer',
    tagline: 'Private On-Device Video Player',
    category: 'media',
    categoryLabel: 'Media & Entertainment',
    status: 'Available',
    version: 'Version 1.0',
    flowTitle: 'VPlayer → Local Library',
    flowDescription:
      'Continue Watching, 10s seek controls, playback speed presets, and private on-device folder search.',
    overview:
      'TAVQEN VPlayer focuses on the stories and videos you own—offering Continue Watching auto-resume, customizable playback speed and 10-second seek intervals, dark/system appearance themes, and private search that stays strictly on your device.',
    image: vplayerHero,
    alt: 'TAVQEN VPlayer application showcase',
    gallery: [
      { title: 'Showcase', subtitle: 'TAVQEN PDF, VPlayer & more', image: vplayerHero },
      { title: 'Overview', subtitle: 'All video screens', image: vplayerOverview },
      { title: 'Home (Dark)', subtitle: 'Continue Watching', image: vplayerHomeDark },
      { title: 'Home (Light)', subtitle: 'Light mode interface', image: vplayerHomeLight },
      { title: 'Library', subtitle: 'Organize collections', image: vplayerLibrary },
      { title: 'Search', subtitle: 'Private local search', image: vplayerSearch },
      { title: 'Add Titles', subtitle: 'Movies & series manager', image: vplayerCollections },
    ],
    icon: Play,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['Android', 'Mobile App'],
    stats: [
      { label: 'Seek Interval', value: '10 sec' },
      { label: 'Playback Speed', value: '1.0x+' },
      { label: 'Library Privacy', value: 'On-Device' },
    ],
    features: [
      {
        title: 'Continue Watching & Auto-Resume',
        description: 'Pick up unfinished videos smoothly directly from your Home screen.',
        benefit: 'Return effortlessly to saved clips and lectures without scrubbing for your spot.',
      },
      {
        title: 'Adjust Playback Speed & Seek Interval',
        description: 'Configure default playback speed and jump intervals (such as 10s) inside Settings.',
        benefit: 'Choose a viewing pace and skip precision that matches what you are watching.',
      },
      {
        title: 'Private Folder & Title Search',
        description: 'Search local videos by title, file name, or folder with zero cloud uploads.',
        benefit: 'Locate files quickly while keeping personal videos strictly on your device.',
      },
      {
        title: 'Theme Appearance & Companion Tools',
        description: 'Switch between Dark and System-matching themes with direct access to PDF tools.',
        benefit: 'Enjoy clean visual comfort across bright and low-light environments.',
      },
    ],
    connectedWith: ['pdf', 'imagetool'],
  },
  {
    id: 'imagetool',
    name: 'TAVQEN ImageTool',
    tagline: 'Image Resize & Format Utility',
    category: 'creative',
    categoryLabel: 'Creative Tools',
    status: 'In Development',
    version: 'In Development',
    flowTitle: 'ImageTool → Creative Prep',
    flowDescription:
      'Focused resize, format conversion, and compression workflows currently in active build.',
    overview:
      'TAVQEN ImageTool is a focused utility in active development to help users resize, crop, convert formats, and optimize everyday images cleanly on-device without heavy design suites.',
    image: product4,
    alt: 'TAVQEN ImageTool preview artwork',
    gallery: [],
    icon: ImageIcon,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['In Development'],
    stats: [
      { label: 'Operations', value: 'Resize/Convert' },
      { label: 'Target Formats', value: 'PNG / JPG / WebP' },
      { label: 'Status', value: 'In Dev' },
    ],
    features: [
      {
        title: 'Dimension Resize & Presets',
        description: 'Resize images to clean pixel dimensions and standard portal ratios.',
        benefit: 'Prepare photos for forms and websites without opening desktop editors.',
      },
      {
        title: 'Format Conversion',
        description: 'Convert cleanly between common image formats such as PNG, JPG, and WebP.',
        benefit: 'Match strict upload requirements in seconds.',
      },
      {
        title: 'Balanced File Compression',
        description: 'Shrink image file sizes while keeping text and visual details readable.',
        benefit: 'Avoid failed submissions caused by oversized camera photos.',
      },
    ],
    connectedWith: ['pdf', 'player'],
  },
];

export function getProductById(id?: string | null): ProductDetail {
  if (!id) return TAVQEN_PRODUCTS[0];
  const lower = id.trim().toLowerCase();
  const aliasMap: Record<string, string> = {
    'tavqen-pdf': 'pdf',
    'tavqen-vplayer': 'player',
    'tavqen-v-player': 'player',
    'tavqen-imagetool': 'imagetool',
  };
  const target = aliasMap[lower] || lower;
  return TAVQEN_PRODUCTS.find((p) => p.id === target) || TAVQEN_PRODUCTS[0];
}
