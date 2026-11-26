import { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  ShieldCheck,
  Clock,
  Video,
  Globe,
  Sparkles,
} from 'lucide-react';
import { ButtonLoader } from '../components/loading';

interface StartAProjectPageProps {
  onNavigate?: (path: string) => void;
}

type ContactTab = 'book' | 'message';

export default function StartAProjectPage({ onNavigate }: StartAProjectPageProps) {
  // Extract initial tab from URL query params: ?tab=book or ?tab=message
  const resolveInitialTab = (): ContactTab => {
    if (typeof window === 'undefined') return 'book';
    const params = new URLSearchParams(window.location.search);
    const queryTab = params.get('tab');
    if (queryTab === 'book' || queryTab === 'message') return queryTab;

    const hashQuery = window.location.hash.split('?')[1];
    if (hashQuery) {
      const hParams = new URLSearchParams(hashQuery);
      const hashTab = hParams.get('tab');
      if (hashTab === 'book' || hashTab === 'message') return hashTab;
    }

    return 'book';
  };

  const [activeTab, setActiveTab] = useState<ContactTab>(resolveInitialTab);

  // Sync tab with URL back/forward and hash changes
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(resolveInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const switchTab = (tab: ContactTab) => {
    setActiveTab(tab);
    const newUrl = `/contact?tab=${tab}`;
    if (window.history.pushState) {
      window.history.pushState(null, '', newUrl);
    } else {
      window.location.hash = `contact?tab=${tab}`;
    }
  };

  // ---------------------------------------------------------------------------
  // SEND A MESSAGE STATE & HANDLERS
  // ---------------------------------------------------------------------------
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '₹1,00,000 – ₹3,00,000 (1 - 3 Lakhs)',
    selectedServices: ['Mobile App', 'Web Platform'],
    message: '',
  });

  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);
  const [isMessageSubmitted, setIsMessageSubmitted] = useState(false);

  const SERVICE_OPTIONS = [
    'Mobile app',
    'Website',
    'Web platform',
    'UI/UX Design',
    'AI & Automation',
    'Other / All-in',
  ];

  const BUDGET_OPTIONS = [
    'Select a budget (INR ₹)...',
    '< ₹1,00,000 (< 1 Lakh)',
    '₹1,00,000 – ₹3,00,000 (1 - 3 Lakhs)',
    '₹3,00,000 – ₹7,00,000 (3 - 7 Lakhs)',
    '₹7,00,000 – ₹15,00,000 (7 - 15 Lakhs)',
    '₹15,00,000+ (15 Lakhs+ / Enterprise)',
  ];

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      if (exists) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((s) => s !== service),
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, service],
        };
      }
    });
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || isSubmittingMessage) return;
    setIsSubmittingMessage(true);
    setTimeout(() => {
      setIsSubmittingMessage(false);
      setIsMessageSubmitted(true);
    }, 750);
  };

  // ---------------------------------------------------------------------------
  // BOOK A SLOT CALENDAR STATE & HANDLERS
  // ---------------------------------------------------------------------------
  const currentDate = new Date();
  const [calendarMonth, setCalendarMonth] = useState(currentDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(currentDate.getFullYear());

  // Default selected date: tomorrow or next available weekday
  const initialDay = currentDate.getDate() + 1;
  const [selectedDay, setSelectedDay] = useState<number>(initialDay);
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingNote, setBookingNote] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const AVAILABLE_TIME_SLOTS = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
    '08:00 PM',
  ];

  // Calculate calendar days
  const daysInMonth = useMemo(() => {
    return new Date(calendarYear, calendarMonth + 1, 0).getDate();
  }, [calendarYear, calendarMonth]);

  const firstDayOfWeek = useMemo(() => {
    // 0 = Sunday, 1 = Monday, etc.
    return new Date(calendarYear, calendarMonth, 1).getDay();
  }, [calendarYear, calendarMonth]);

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingEmail.trim() || isSubmittingBooking) return;
    setIsSubmittingBooking(true);
    setTimeout(() => {
      setIsSubmittingBooking(false);
      setIsBookingConfirmed(true);
    }, 850);
  };

  // ---------------------------------------------------------------------------
  // NAVIGATION & ACCORDION
  // ---------------------------------------------------------------------------
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const FAQS = [
    {
      q: 'How long does it take to start a project?',
      a: 'Most projects kick off within 1 to 2 weeks. After you reach out or reserve a slot, we organize an initial discovery call within 24 hours, followed by a scoped architectural proposal and sprint kickoff schedule.',
    },
    {
      q: 'How do you structure pricing and milestones?',
      a: 'For fixed-scope MVPs, we operate on clear milestone-based billing (e.g. 30% kickoff, 40% beta delivery, 30% final signoff). For ongoing product scaling squads, we operate on dedicated bi-weekly or monthly sprint retainers.',
    },
    {
      q: 'Do you sign an NDA before we share our ideas?',
      a: 'Yes, absolutely. We treat your intellectual property with complete confidentiality and will gladly execute a mutual Non-Disclosure Agreement (NDA) before any detailed technical or architectural discussions.',
    },
    {
      q: 'Who will be working on our project?',
      a: 'You collaborate directly with dedicated senior full-stack engineers, UI/UX designers, and a technical project architect. We do not use anonymous subcontracting; you have direct Slack and meeting access to the builders.',
    },
    {
      q: 'Will we own all source code and design files?',
      a: 'Yes, 100%. All Git repositories, Figma design systems, cloud deployment configs, CI/CD pipelines, and credentials belong entirely to you from day one. There is zero vendor lock-in.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================= */}
      {/* 1. TAVQEN LIGHT THEME HERO HEADER                             */}
      {/* ============================================================= */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
        {/* Subtle Cyan Ambient Radial Lighting */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[750px] h-[500px] pointer-events-none opacity-30 -z-0"
          style={{
            background:
              'radial-gradient(ellipse, rgba(0, 196, 255, 0.22) 0%, rgba(0, 136, 204, 0.08) 50%, transparent 70%)',
          }}
        />

        <div className="site-container relative z-10">
          {/* Breadcrumb Back Link */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => handleNav('/home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
            >
              <span>← Back to Home</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                CONTACT &amp; CONSULTATION
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#0B132B] tracking-tight leading-[1.1] mb-5">
              Tell us what <br />
              <span className="font-serif italic font-normal text-[#0088CC]">
                you&apos;re building
              </span>
            </h1>

            <div className="flex items-start gap-3.5 max-w-2xl text-[#64748B] text-sm sm:text-base leading-relaxed">
              <div className="w-7 h-7 rounded-full bg-[#E0F7FF] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#0088CC]">
                <Compass className="w-4 h-4" />
              </div>
              <p>
                We collaborate with ambitious founders and engineering leaders worldwide from our Indore studio. Book a quick video discovery call or send us your scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 2. CHOOSE HOW YOU WANT TO START (TOGGLE SELECTOR)             */}
      {/* ============================================================= */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC]/50 border-b border-[#E2E8F0]">
        <div className="site-container">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
              Fast Track Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight">
              How would you like to start?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#64748B]">
              Choose between scheduling a live video consultation or sending an asynchronous project message.
            </p>
          </div>

          {/* TWO ELEVATED TOGGLE BUTTONS */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 sm:p-2 rounded-full bg-white border border-[#E2E8F0] shadow-sm gap-2 sm:gap-3 max-w-md w-full sm:w-auto">
              {/* Send a message option */}
              <button
                type="button"
                onClick={() => switchTab('message')}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] text-white shadow-[0_6px_20px_rgba(0,196,255,0.28)] scale-[1.02]'
                    : 'text-[#64748B] hover:text-[#0B132B] hover:bg-[#F8FAFC]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Send a Message</span>
              </button>

              {/* Book a slot option */}
              <button
                type="button"
                onClick={() => switchTab('book')}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'book'
                    ? 'bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] text-white shadow-[0_6px_20px_rgba(0,196,255,0.28)] scale-[1.02]'
                    : 'text-[#64748B] hover:text-[#0B132B] hover:bg-[#F8FAFC]'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Book a Slot</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 3. ACTIVE TAB CONTENT CONTAINER                               */}
      {/* ============================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="site-container">
          {/* ========================================================= */}
          {/* TAB 1: BOOK A SLOT INTERFACE                              */}
          {/* ========================================================= */}
          {activeTab === 'book' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-in fade-in duration-300">
              {/* LEFT SIDE: Info & Direct Contacts */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                    30-Min Discovery Session
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight leading-snug">
                    Let&apos;s talk about your project
                  </h3>
                  <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
                    Have an idea, a problem, or something you want to build? Let&apos;s talk about it and find the best way to move forward together.
                  </p>
                </div>

                {/* Key Meeting Attributes */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0B132B] font-medium p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="w-8 h-8 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span>30 Minutes Duration</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0B132B] font-medium p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="w-8 h-8 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <span>Google Meet Video Link Generated Automatically</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0B132B] font-medium p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="w-8 h-8 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span>India Standard Time (IST · GMT +5:30)</span>
                  </div>
                </div>

                {/* DIRECT CONTACT INFORMATION CARD */}
                <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                      Direct Contact
                    </span>
                    <h4 className="text-base font-bold text-[#0B132B] mt-0.5">
                      TAVQEN Technologies
                    </h4>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">Phone</span>
                      <a
                        href="tel:+919172360707"
                        className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors"
                      >
                        +91 91723 60707
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">Email</span>
                      <a
                        href="mailto:tavqentechnologies@gmail.com"
                        className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors break-all"
                      >
                        tavqentechnologies@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">Location</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#0B132B]">
                        Indore, Madhya Pradesh, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Interactive Integrated Calendar & Slot Picker */}
              <div className="lg:col-span-7 bg-white rounded-[32px] sm:rounded-[36px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-8 relative overflow-hidden">
                {isBookingConfirmed ? (
                  <div className="py-12 sm:py-16 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-400">
                    <div className="w-16 h-16 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-xs">
                      <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                      Confirmed
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-3">
                      Your Slot Is Reserved!
                    </h3>
                    <p className="text-[#64748B] text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                      Thank you, <span className="font-semibold text-[#0B132B]">{bookingName}</span>. Your 30-minute discovery call is booked for{' '}
                      <span className="font-semibold text-[#0088CC]">
                        {MONTH_NAMES[calendarMonth]} {selectedDay}, {calendarYear} at {selectedTime} IST
                      </span>
                      . A Google Meet invitation has been sent to{' '}
                      <span className="font-semibold text-[#0B132B]">{bookingEmail}</span>.
                    </p>

                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-sm w-full mb-8 text-left space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Platform:</span>
                        <span className="font-semibold text-[#0B132B]">Google Meet</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Timezone:</span>
                        <span className="font-semibold text-[#0B132B]">IST (GMT +5:30)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Status:</span>
                        <span className="font-semibold text-emerald-600">Calendar Invite Dispatched</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsBookingConfirmed(false);
                        setBookingName('');
                        setBookingEmail('');
                      }}
                      className="px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-sm font-semibold text-[#0088CC] hover:border-[#00C4FF] shadow-2xs hover:scale-105 transition-all cursor-pointer"
                    >
                      Book another slot
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {/* Month Header Navigation */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                          Select a Date
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-[#0B132B]">
                          {MONTH_NAMES[calendarMonth]} {calendarYear}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="w-8 h-8 rounded-full border border-[#E2E8F0] hover:border-[#00C4FF] flex items-center justify-center text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="w-8 h-8 rounded-full border border-[#E2E8F0] hover:border-[#00C4FF] flex items-center justify-center text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer"
                          aria-label="Next month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Day of Week Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-mono font-bold text-[#94A3B8] uppercase">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                        <div key={d} className="py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days Matrix */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                      {/* Leading empty cells */}
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-9 sm:h-10" />
                      ))}

                      {/* Day buttons */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNumber = i + 1;
                        const isSelected = selectedDay === dayNumber;
                        const isPast =
                          calendarYear === currentDate.getFullYear() &&
                          calendarMonth === currentDate.getMonth() &&
                          dayNumber < currentDate.getDate();

                        return (
                          <button
                            key={dayNumber}
                            type="button"
                            disabled={isPast}
                            onClick={() => setSelectedDay(dayNumber)}
                            className={`h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-[0_4px_12px_rgba(0,196,255,0.35)] scale-105'
                                : isPast
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-[#0B132B] hover:bg-[#F1F5F9] border border-transparent hover:border-[#E2E8F0]'
                            }`}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}
                    </div>

                    {/* Available Time Slots Section */}
                    <div className="pt-4 border-t border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider">
                          Available Times on {MONTH_NAMES[calendarMonth]} {selectedDay}
                        </label>
                        <span className="text-[11px] font-mono text-[#0088CC] font-semibold">
                          Selected: {selectedTime}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {AVAILABLE_TIME_SLOTS.map((slot) => {
                          const isSlotSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isSlotSelected
                                  ? 'bg-[#0B132B] text-white shadow-xs scale-[1.02]'
                                  : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#00C4FF]/60 hover:text-[#0B132B]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Attendee Info Inputs */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                          Your Name <span className="text-[#0088CC]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                          Work Email <span className="text-[#0088CC]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                        Topic or Problem you want to build (Optional)
                      </label>
                      <input
                        type="text"
                        value={bookingNote}
                        onChange={(e) => setBookingNote(e.target.value)}
                        placeholder="Mobile app MVP, AI document workflow, SaaS scaling..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Submit Confirmation Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmittingBooking}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] text-white font-semibold text-sm sm:text-base shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.45)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmittingBooking ? (
                          <ButtonLoader text="Confirming Slot..." color="white" size="md" />
                        ) : (
                          <>
                            <span>Confirm 30-min Call on {MONTH_NAMES[calendarMonth]} {selectedDay}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SEND A MESSAGE INTERFACE                           */}
          {/* ========================================================= */}
          {activeTab === 'message' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start animate-in fade-in duration-300">
              {/* LEFT COLUMN: PROJECT INQUIRY FORM */}
              <div className="lg:col-span-7 bg-white rounded-[32px] sm:rounded-[36px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-10 relative overflow-hidden">
                {isMessageSubmitted ? (
                  <div className="py-12 sm:py-16 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-400">
                    <div className="w-16 h-16 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-xs">
                      <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-3">
                      Inquiry Received!
                    </h3>
                    <p className="text-[#64748B] text-sm sm:text-base max-w-md mb-8 leading-relaxed font-normal">
                      Thank you, <span className="font-semibold text-[#0B132B]">{formData.name}</span>. A senior engineering director will review your project details and follow up at{' '}
                      <span className="font-semibold text-[#0B132B]">{formData.email}</span> within 24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsMessageSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-sm font-semibold text-[#0088CC] hover:border-[#00C4FF] shadow-2xs hover:scale-105 transition-all cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMessageSubmit} className="space-y-6">
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Your Name <span className="text-[#0088CC]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Morgan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Email Address <span className="text-[#0088CC]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Company + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Health"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Project Budget (INR ₹)
                        </label>
                        <div className="relative">
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all cursor-pointer"
                          >
                            {BUDGET_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Pill Selectors */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2.5">
                        What are you looking to build?
                      </label>
                      <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {SERVICE_OPTIONS.map((service) => {
                          const isSelected = formData.selectedServices.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-[0_4px_15px_rgba(0,196,255,0.25)] scale-[1.02]'
                                  : 'bg-[#F8FAFC] hover:bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#00C4FF]/50'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 4: Message */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project, target launch date, core features, or any reference links..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all leading-relaxed"
                      />
                    </div>

                    <p className="text-xs text-[#94A3B8] font-normal">
                      By sending you agree to our{' '}
                      <span className="text-[#0088CC] underline cursor-pointer hover:text-[#00C4FF]">
                        Privacy Policy
                      </span>
                      .
                    </p>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmittingMessage}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] text-white font-semibold text-sm sm:text-base shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.45)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmittingMessage ? (
                          <ButtonLoader text="Sending inquiry..." color="white" size="md" />
                        ) : (
                          <>
                            <span>Send message</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* RIGHT COLUMN: DIRECT CONTACTS & LIGHT FAST RESPONSE CARD */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-7 shadow-sm space-y-4">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                      Direct Contact
                    </span>
                    <h4 className="text-base font-bold text-[#0B132B] mt-0.5">
                      TAVQEN Technologies
                    </h4>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">Phone</span>
                      <a
                        href="tel:+919172360707"
                        className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors"
                      >
                        +91 91723 60707
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">Email</span>
                      <a
                        href="mailto:tavqentechnologies@gmail.com"
                        className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors break-all"
                      >
                        tavqentechnologies@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">WhatsApp</span>
                      <a
                        href="https://wa.me/919172360707"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">Location</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#0B132B]">
                        Indore, Madhya Pradesh, India
                      </span>
                    </div>
                  </div>
                </div>

                {/* FAST RESPONSE CARD */}
                <div className="rounded-3xl bg-gradient-to-br from-[#E0F7FF]/50 via-[#F0F9FF] to-white text-[#0B132B] p-6 sm:p-7 border border-[#00C4FF]/30 shadow-[0_12px_35px_rgba(0,196,255,0.08)] relative overflow-hidden">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-[#0088CC] mb-2.5">
                    FAST RESPONSE
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 leading-snug">
                    A reply from a senior member in 24 hours on business days.
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                    We will answer your questions and share a ballpark estimate if the project scope is clear.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#00C4FF]/20 flex items-center gap-2 text-xs text-[#0088CC] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Strict NDA Protected &amp; Zero Spam Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================= */}
      {/* 4. "WHAT HELPS US REPLY FAST" SECTION                         */}
      {/* ============================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="site-container">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                PROJECT GUIDELINES
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B132B] tracking-tight leading-[1.12] mb-4">
              What helps us{' '}
              <span className="font-serif italic font-normal text-[#0088CC]">
                reply fast
              </span>
            </h2>

            <p className="text-[14.5px] sm:text-[16px] text-[#64748B] leading-[1.7] font-normal">
              You don&apos;t need a formal brief. A few bullet points on these topics are enough for us to understand what you&apos;re building, who it&apos;s for, and how we can help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                What you want to build
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                The problem you want to solve, what the product should do, who will use it, and what success looks like for your business.
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                What you have today
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Whether you&apos;re starting from a napkin sketch, Figma designs, a working prototype, or an existing legacy codebase in production.
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                Timing and budget, if you know them
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                A rough target launch date, hard deadlines, and the budget window you&apos;re planning for so we can propose the best engineering approach.
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                Examples you like
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Apps or products you admire the feel of, whether for their visual aesthetics, snappy micro-interactions, or streamlined UX onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 5. "QUICK ANSWERS" FAQ SECTION                                */}
      {/* ============================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="site-container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B132B] tracking-tight leading-[1.12]">
              Quick{' '}
              <span className="font-serif italic font-normal text-[#0088CC]">
                answers
              </span>
            </h2>
          </div>

          <div className="border-t border-[#E2E8F0] divide-y divide-[#E2E8F0]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0B132B] group-hover:text-[#0088CC] transition-colors">
                      {faq.q}
                    </span>
                    <span
                      className={`text-xl font-mono text-[#0088CC] transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pt-1 text-xs sm:text-[15px] text-[#64748B] leading-relaxed max-w-3xl animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
