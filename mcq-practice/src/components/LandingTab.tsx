import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Zap, 
  MessageSquare, 
  BookOpen, 
  Keyboard, 
  Newspaper, 
  Download, 
  Smartphone, 
  ArrowRight, 
  Star, 
  Gift, 
  Clock, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Target, 
  Flame, 
  Play, 
  Tag, 
  Award,
  LayoutDashboard,
  LogIn,
  GraduationCap
} from 'lucide-react';
import { SUPABASE_APK_URL } from '../constants';

interface LandingTabProps {
  onStartPractice: () => void;
  onOpenAuth: () => void;
  onNavigateToTab: (tabId: string) => void;
  currentUser?: any;
  userPlan?: 'free' | 'paid';
}

export const LandingTab: React.FC<LandingTabProps> = ({
  onStartPractice,
  onOpenAuth,
  onNavigateToTab,
  currentUser,
}) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [demoSelectedOption, setDemoSelectedOption] = useState<number | null>(null);
  const [showDemoExplanation, setShowDemoExplanation] = useState<boolean>(false);
  const [showOfferModal, setShowOfferModal] = useState<boolean>(false);
  const [copiedCoupon, setCopiedCoupon] = useState<boolean>(false);

  // Always reset scroll to the top whenever Landing Tab is mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.scrollTop = 0;
      }
    }
  }, []);

  // Demo question for interactive preview
  const demoQuestion = {
    question: "छत्तीसगढ़ राज्य की 'जीवन रेखा' (Lifeline of Chhattisgarh) किस नदी को कहा जाता है?",
    options: [
      "A. शिवनाथ नदी (Shivnath River)",
      "B. महानदी (Mahanadi River)",
      "C. इन्द्रावती नदी (Indravati River)",
      "D. हसदेव नदी (Hasdeo River)"
    ],
    correctIndex: 1,
    explanation: "महानदी को छत्तीसगढ़ की 'जीवन रेखा' (Lifeline of Chhattisgarh) कहा जाता है। इसका उद्गम धमतरी जिले के सिहावा पर्वत से होता है। छत्तीसगढ़ के कुल drainage system का लगभग 56.15% हिस्सा महानदी बेसिन के अंतर्गत आता है।",
    aiHint: "💡 AI Guru Tip: महानदी बेसिन को छत्तीसगढ़ का मैदान या 'Rice Bowl of Central India' भी कहा जाता है।"
  };

  const handleDemoOptionClick = (idx: number) => {
    setDemoSelectedOption(idx);
    setShowDemoExplanation(true);
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText('CGGURU60');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const faqs = [
    {
      q: "Kya CG Guru app bilkul Free me use kiya ja sakta hai?",
      a: "Yes, bilkul! Hamara 'Free Aspirant Pass' sabhi new users ke liye 100% lifetime free hai. Aap bina kisi charge ke Daily 50+ MCQs, Chhattisgarh GK, Daily Current Affairs aur basic Mock Tests ka unlimited practice kar sakte hain."
    },
    {
      q: "AI Guru Tutor kaise kaam karta hai aur doubts kaise solve karta hai?",
      a: "AI Guru ek 24/7 personal smart mentor ki tarah kaam karta hai. Jab bhi aap kisi difficult question ya topic (History, Geography, Panchayati Raj, CSAT) me atak jayein, to AI Guru simple Hindi-English me step-by-step logic aur memory tricks ke saath instant explanation deta hai."
    },
    {
      q: "Kya app me CGPSC aur CG Vyapam ke Previous Year Questions (PYQs) available hain?",
      a: "Haan! CG Guru me CGPSC Prelims (2008 se present) aur Vyapam ke (Patwari, RI, Hostel Warden, SI) ke 10,000+ Previous Year Questions detailed solution aur subject-wise categorization ke saath available hain."
    },
    {
      q: "Typing Test me kaun se keyboard layouts aur fonts supported hain?",
      a: "Hamara Typing Test engine CG Vyapam aur High Court / District Court exam pattern par design kiya gaya hai. Hindi ke liye Remington GAIL, Mangal Inscript aur KrutiDev 010, aur English ke liye standard layout available hain, jo live WPM speed aur accuracy track karta hai."
    },
    {
      q: "Kya isko Mobile aur Laptop/PC dono par use kar sakte hain?",
      a: "Yes! CG Guru ek fast modern Web App hai jo Mobile browser, Laptop, Tablet aur PC par smooth chalta hai. Sath hi aap direct hamara lightweight Android APK bhi download kar sakte hain."
    },
    {
      q: "Launch Welcome Offer (Flat 60% OFF) kaise claim karein?",
      a: "Pro Pass choose karte samay coupon code 'CGGURU60' apply karein. Isse Annual Pro Pass ₹799 ki jagah sirf ₹299 (matra ₹25/month) me instantly activate ho jayega."
    }
  ];

  const examsList = [
    { title: "CGPSC State Services", desc: "Prelims Paper 1 (GS) & Paper 2 (CSAT)", badge: "Pre + Mains" },
    { title: "CG Vyapam Hostel Warden", desc: "Computer, Chhattisgarh GK & Maths Special", badge: "Most Popular" },
    { title: "CG Police SI & Constable", desc: "General Studies, Science & Mental Ability", badge: "High Vacancy" },
    { title: "CG Vyapam Patwari / RI", desc: "Land Revenue, Panchayati Raj & Computer", badge: "Target 2026" },
    { title: "Assistant Grade-3 & Steno", desc: "Hindi & English Typing Speed Test Module", badge: "Typing Special" },
    { title: "CG Teacher Bharti & CG TET", desc: "Child Development, Pedagogy & Subject MCQs", badge: "TET Special" },
  ];

  return (
    <div className="min-h-screen bg-bg-s1 text-text overflow-x-hidden w-full pb-16">
      
      {/* Top Floating Promo Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-saffron to-amber-500 text-white px-4 py-2.5 text-xs font-bold tracking-wide flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Gift className="w-4 h-4 animate-bounce shrink-0 text-white" />
          <span>🎉 <strong>New User Launch Offer:</strong> Pro Pass par paayein <strong>FLAT 60% OFF</strong>! Use Code: <strong>CGGURU60</strong></span>
        </div>
        <button 
          onClick={() => setShowOfferModal(true)}
          className="hidden sm:inline-flex items-center gap-1 bg-white text-orange-600 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-orange-50 transition-all cursor-pointer shadow-sm ml-4"
        >
          View Offer
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Landing Page Top Header */}
      <header 
        style={{ paddingTop: 'calc(max(env(safe-area-inset-top, 0px), var(--app-status-bar-height, 0px)) + 0.75rem)' }}
        className="sticky top-0 z-40 w-full bg-bg-s1/95 backdrop-blur-md border-b border-border/70 px-4 sm:px-8 pb-3.5 flex items-center justify-between shadow-sm"
      >
        {/* Brand Logo & Name */}
        <div 
          onClick={() => {
            if (currentUser) {
              onNavigateToTab('home');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron to-orange-500 flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black bg-gradient-to-r from-saffron to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                CG Guru
              </span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-saffron/15 text-saffron border border-saffron/30">
                AI Prep
              </span>
            </div>
          </div>
        </div>

        {/* Quick Section Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-text-muted">
          <a href="#features" className="hover:text-saffron transition-colors">Features</a>
          <button onClick={() => setShowOfferModal(true)} className="hover:text-saffron transition-colors flex items-center gap-1 cursor-pointer">
            <span>Special Offers</span>
            <span className="text-[9px] bg-redL text-white px-1.5 py-0.2 rounded-full font-black animate-pulse">60% OFF</span>
          </button>
          <button onClick={() => onNavigateToTab('practice')} className="hover:text-saffron transition-colors cursor-pointer">Mock Tests</button>
          <button onClick={() => onNavigateToTab('typing')} className="hover:text-saffron transition-colors cursor-pointer">Typing Test</button>
          <a href="#plans" className="hover:text-saffron transition-colors">Plans</a>
          <a href="#faq" className="hover:text-saffron transition-colors">FAQ</a>
        </nav>

        {/* Right Action: Dashboard Button + Start Free CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* APK download pill */}
          <a
            href={SUPABASE_APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="CG_Guru_App.apk"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-bg-s2 hover:bg-bg-s3 border border-border text-text-muted hover:text-text text-xs font-bold transition-all shadow-sm"
            title="Download Android APK"
          >
            <Smartphone className="w-3.5 h-3.5 text-greenL" />
            <span className="font-bold">APK</span>
            <Download className="w-3 h-3" />
          </a>

          {/* DASHBOARD BUTTON: routes to home if logged in, opens login modal if not logged in */}
          <button
            onClick={() => {
              if (currentUser) {
                onNavigateToTab('home');
              } else {
                onOpenAuth();
              }
            }}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-bg-s2 hover:bg-bg-s3 border border-saffron/40 hover:border-saffron text-saffron font-black text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer active:scale-95"
            title={currentUser ? "Go to your Home Dashboard" : "Sign In to access Dashboard"}
          >
            {currentUser ? (
              <>
                <LayoutDashboard className="w-4 h-4 text-saffron" />
                <span>Dashboard</span>
                <div className="w-2 h-2 rounded-full bg-greenL animate-pulse hidden sm:block" />
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-saffron" />
                <span>Dashboard</span>
              </>
            )}
          </button>

          {/* Start Free Practice Button */}
          <button
            onClick={onStartPractice}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white text-white" />
            <span className="hidden sm:inline">Start Free</span>
            <span className="sm:hidden">Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Background Glows */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-saffron/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-24 right-10 w-[300px] h-[250px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/15 border border-saffron/35 text-saffron text-xs font-black uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Chhattisgarh's #1 AI-Powered Exam Prep Platform</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-text tracking-tight leading-[1.15] mb-5">
            Crack CGPSC & CG Vyapam Exams <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-saffron via-orange-500 to-gold bg-clip-text text-transparent">
              Smart AI ke Saath!
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed mb-8">
            25,000+ High-Quality MCQs, Real Exam Timer Mock Tests, 24/7 AI Guru Doubt Solver, Bilingual Hindi/English Typing Test aur Daily Chhattisgarh Current Affairs — sab kuch ek hi platform par.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={onStartPractice}
              className="px-7 py-4 bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-saffron/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-5 h-5 fill-white text-white" />
              <span>Start Free Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowOfferModal(true)}
              className="px-6 py-4 bg-bg-s2 hover:bg-bg-s3 border border-saffron/40 hover:border-saffron text-saffron font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Gift className="w-4 h-4" />
              <span>Explore Offers & Discounts</span>
            </button>

            <a
              href={SUPABASE_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="CG_Guru_App.apk"
              className="px-5 py-4 bg-bg-s2 hover:bg-bg-s3 border border-border text-text-muted hover:text-text font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm"
              title="Download Android APK directly"
            >
              <Smartphone className="w-4 h-4 text-greenL" />
              <span>Download APK</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Proof / Key Numbers Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-border/60">
            <div className="p-4 rounded-xl bg-bg-s2/80 border border-border text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-saffron">50,000+</div>
              <div className="text-xs text-text-muted mt-1 font-bold">Questions Solved</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-s2/80 border border-border text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-gold">15,000+</div>
              <div className="text-xs text-text-muted mt-1 font-bold">Active Aspirants</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-s2/80 border border-border text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-greenL">4.9 / 5 ⭐</div>
              <div className="text-xs text-text-muted mt-1 font-bold">Student Rating</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-s2/80 border border-border text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-text">100%</div>
              <div className="text-xs text-text-muted mt-1 font-bold">CG Syllabus Aligned</div>
            </div>
          </div>

        </div>
      </section>

      {/* Special Limited-Time Offers Banner Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-saffron/15 via-bg-s2 to-amber-500/10 border-2 border-saffron/40 p-6 sm:p-10 shadow-2xl">
          
          {/* Discount badge - Never Clipped */}
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-redL to-orange-500 text-white text-[11px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg tracking-wider mb-5 sm:mb-0 sm:absolute sm:-top-3.5 sm:right-6 animate-pulse z-10">
            <Flame className="w-3.5 h-3.5 fill-white text-white" />
            <span>Launch Special • FLAT 60% OFF</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-2">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-saffron uppercase tracking-wider mb-2">
                <Gift className="w-4 h-4" />
                Special Welcome Offer for New Aspirants
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-text leading-tight mb-3">
                CG Guru Pro Pass par paayein 60% Launch Discount!
              </h2>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
                All CGPSC & Vyapam exams ke liye Unlimited Mock Tests, Last 10 Years PYQs with solutions, 24/7 AI Tutor aur Hindi/English Typing Test ka complete access.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-bg-s1 border border-border px-4 py-2 rounded-xl shadow-sm">
                  <Tag className="w-4 h-4 text-saffron" />
                  <span className="text-xs text-text-muted font-bold">Coupon Code:</span>
                  <span className="text-sm font-black text-saffron tracking-wider">CGGURU60</span>
                  <button 
                    onClick={copyCouponCode}
                    className="ml-2 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-saffron/20 hover:bg-saffron/30 text-saffron cursor-pointer"
                  >
                    {copiedCoupon ? 'Copied! ✅' : 'Copy'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-text-muted font-bold">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Limited Time Deal • Ends Tonight 12 AM</span>
                </div>
              </div>
            </div>

            {/* Price Showcase Card */}
            <div className="w-full lg:w-80 bg-bg-s2 border-2 border-saffron/50 rounded-2xl p-6 text-center shadow-xl shrink-0">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Annual Pro Pass</div>
              <div className="flex items-center justify-center gap-2 my-2">
                <span className="text-sm text-text-muted line-through font-bold">₹799</span>
                <span className="text-4xl font-black text-greenL">₹299</span>
                <span className="text-xs text-text-muted font-bold">/ 1 Year</span>
              </div>
              <div className="text-[11px] font-black text-saffron mb-5 bg-saffron/10 py-1.5 rounded-lg">
                Only ₹25 / month • Unlock All Features
              </div>

              <button
                onClick={() => setShowOfferModal(true)}
                className="w-full py-3.5 bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Claim Offer Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[10px] text-text-muted mt-3 font-medium">
                ⚡ Instant Activation • 100% Safe & Secure
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" id="features">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black text-saffron uppercase tracking-widest bg-saffron/10 px-3 py-1 rounded-full">
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text mt-3 mb-4">
            Aapki Taiyari ko Top Level Par Le Jaane Wale 6 Smart Tools
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Old-school coaching aur boring books ko bye-bye bolein. CG Guru ke smart digital tools ke saath apni learning speed 3x fast karein.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: AI Tutor */}
          <div className="p-7 rounded-2xl bg-bg-s2 border border-border hover:border-saffron/40 transition-all group shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-saffron/10 border border-saffron/25 flex items-center justify-center text-saffron mb-5 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-text mb-2 flex items-center gap-2">
                <span>24/7 Personal AI Tutor</span>
                <span className="text-[10px] bg-saffron/20 text-saffron px-2 py-0.5 rounded-full font-bold uppercase">AI Guru</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Kisi bhi tough question me doubt ho? AI Tutor se turant poochein. Chhattisgarh History, Geography ya Acts ka simple Hindi & Chhattisgarhi examples ke saath detailed explanation paayein.
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('chat')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-saffron hover:text-orange-400 cursor-pointer"
            >
              <span>Chat with AI Tutor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 2: Mock Tests */}
          <div className="p-7 rounded-2xl bg-bg-s2 border border-border hover:border-saffron/40 transition-all group shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-5 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-text mb-2 flex items-center gap-2">
                <span>Real Exam Mock Tests</span>
                <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold uppercase">Timer & Rank</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                CGPSC Prelims (Paper 1 & Paper 2 CSAT) aur Vyapam ke actual pattern par based full-length tests. 1/3 negative marking aur All-Chhattisgarh live ranking.
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('practice')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-yellow-400 cursor-pointer"
            >
              <span>Explore Test Series</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 3: Typing Test */}
          <div className="p-7 rounded-2xl bg-bg-s2 border border-border hover:border-saffron/40 transition-all group shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-greenL/10 border border-greenL/25 flex items-center justify-center text-greenL mb-5 group-hover:scale-110 transition-transform">
                <Keyboard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-text mb-2 flex items-center gap-2">
                <span>Bilingual Typing Test</span>
                <span className="text-[10px] bg-greenL/20 text-greenL px-2 py-0.5 rounded-full font-bold uppercase">Vyapam Special</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Vyapam AG-3, Steno aur Data Entry Operator ke liye Remington GAIL, Mangal Inscript aur KrutiDev support. Live WPM, accuracy aur backspace analysis.
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('typing')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-greenL hover:text-green-400 cursor-pointer"
            >
              <span>Take Typing Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 4: Current Affairs & Jobs */}
          <div className="p-7 rounded-2xl bg-bg-s2 border border-border hover:border-saffron/40 transition-all group shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-text mb-2 flex items-center gap-2">
                <span>Daily CG News & Job Alerts</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase">Daily Updates</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Chhattisgarh ki daily top news, government schemes, state budget analysis aur CGPSC/Vyapam ke fresh vacancy notifications ke instant updates.
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('news')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              <span>Read Today's News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 5: Smart Syllabus Tracker */}
          <div className="p-7 rounded-2xl bg-bg-s2 border border-border hover:border-saffron/40 transition-all group shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-text mb-2 flex items-center gap-2">
                <span>Syllabus Tracker & Weak Areas</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold uppercase">AI Analytics</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Visual progress rings aur subject-wise analytics aapko batate hain ki marks kahan cut rahe hain. Weak topics ko target karke apna score 30+ marks boost karein.
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('syllabus')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 cursor-pointer"
            >
              <span>Check Syllabus Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 6: Gamification */}
          <div className="p-7 rounded-2xl bg-bg-s2 border border-border hover:border-saffron/40 transition-all group shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-redL/10 border border-redL/25 flex items-center justify-center text-redL mb-5 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-text mb-2 flex items-center gap-2">
                <span>Daily Streaks, XP & Badges</span>
                <span className="text-[10px] bg-redL/20 text-redL px-2 py-0.5 rounded-full font-bold uppercase">Habit Builder</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Daily study habit banayein. Sahi questions solve karne par XP points, rank levels aur special medals paayein. Preparation ko banayein engaging aur fun!
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('home')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-redL hover:text-red-400 cursor-pointer"
            >
              <span>View Daily Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Live Interactive MCQ Demo Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-bg-s2 rounded-3xl border-2 border-border/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-saffron bg-saffron/10 px-3 py-1 rounded-full mb-2">
                <Play className="w-3 h-3 fill-saffron" />
                Live Demo — Try It Now
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-text">
                Experience CG Guru Quality Firsthand
              </h3>
            </div>
            <span className="text-xs text-text-muted font-bold self-start sm:self-auto bg-bg-s3 px-3 py-1.5 rounded-xl border border-border">
              Subject: Chhattisgarh Geography
            </span>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <span className="text-xs font-bold text-saffron mb-1 block">Question 1 of 1</span>
            <p className="text-base sm:text-lg font-bold text-text leading-snug">
              {demoQuestion.question}
            </p>
          </div>

          {/* Options List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {demoQuestion.options.map((opt, idx) => {
              const isSelected = demoSelectedOption === idx;
              const isCorrect = idx === demoQuestion.correctIndex;
              
              let btnStyle = "bg-bg-s3/70 hover:bg-bg-s3 border-border text-text";
              if (showDemoExplanation) {
                if (isCorrect) {
                  btnStyle = "bg-green-500/20 border-green-500 text-green-600 dark:text-green-300 font-bold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-redL/20 border-redL text-red-600 dark:text-red-300";
                }
              } else if (isSelected) {
                btnStyle = "bg-saffron/20 border-saffron text-saffron font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleDemoOptionClick(idx)}
                  className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {showDemoExplanation && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* AI Explanation Box */}
          <AnimatePresence>
            {showDemoExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-5 rounded-2xl bg-bg-s1 border border-saffron/30 text-text space-y-3 mb-6"
              >
                <div className="flex items-center gap-2 text-xs font-black text-saffron uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Guru In-Depth Explanation</span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {demoQuestion.explanation}
                </p>
                <div className="p-3 rounded-xl bg-saffron/10 border border-saffron/20 text-xs text-saffron font-medium">
                  {demoQuestion.aiHint}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Action inside Demo */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
            <span className="text-xs text-text-muted font-medium">
              Liked it? Aise 25,000+ questions aapka wait kar rahe hain!
            </span>
            <button
              onClick={onStartPractice}
              className="px-5 py-2.5 bg-saffron hover:bg-orange-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <span>Start Full Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Target Exams We Cover */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
            Target Exams Covered
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text mt-3">
            Chhattisgarh ki Har Major Exam ke Liye Dedicated Preparation
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {examsList.map((exam, idx) => (
            <div 
              key={idx} 
              onClick={onStartPractice}
              className="p-5 rounded-2xl bg-bg-s2 border border-border hover:border-saffron/50 transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-saffron/15 text-saffron">
                    {exam.badge}
                  </span>
                  <Target className="w-4 h-4 text-text-muted group-hover:text-saffron transition-colors" />
                </div>
                <h4 className="text-base font-bold text-text group-hover:text-saffron transition-colors">
                  {exam.title}
                </h4>
                <p className="text-xs text-text-muted mt-1">
                  {exam.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-bold text-saffron">
                <span>Start Mock Test</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing / Offer Plans Comparison Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" id="plans">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black text-greenL uppercase tracking-widest bg-greenL/10 px-3 py-1 rounded-full">
            Affordable & Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text mt-3 mb-3">
            Apne Goal aur Preparation ke According Plan Chunein
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            No hidden charges. Start karein 100% Free me ya upgrade karein Pro Pass par huge savings ke saath.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Plan 1: Free Pass */}
          <div className="rounded-3xl bg-bg-s2 border border-border p-7 flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-text-muted mb-1">Starter Plan</div>
              <h3 className="text-xl font-black text-text">Free Aspirant Pass</h3>
              <p className="text-xs text-text-muted mt-1">Beginners & Daily Self-Assessment ke liye</p>
              
              <div className="my-6">
                <span className="text-3xl font-black text-text">₹0</span>
                <span className="text-xs text-text-muted ml-1">/ Lifetime Free</span>
              </div>

              <ul className="space-y-3 text-xs text-text-muted mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span>Daily 50+ Mixed MCQs Practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span>Daily Chhattisgarh Current Affairs Notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span>Basic Typing Speed Test</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span>Latest Govt Job Alerts</span>
                </li>
                <li className="flex items-center gap-2 text-text-muted/50">
                  <span className="w-4 h-4 text-center">✕</span>
                  <span>24/7 Unlimited AI Tutor (Limited)</span>
                </li>
                <li className="flex items-center gap-2 text-text-muted/50">
                  <span className="w-4 h-4 text-center">✕</span>
                  <span>10 Years PYQs with full solutions</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onStartPractice}
              className="w-full py-3 rounded-xl bg-bg-s3 hover:bg-border/40 text-text font-bold text-xs uppercase tracking-wider cursor-pointer transition-all border border-border"
            >
              Start Free Practice
            </button>
          </div>

          {/* Plan 2: Pro Guru Pass (Featured) */}
          <div className="rounded-3xl bg-gradient-to-b from-bg-s2 via-bg-s3/30 to-bg-s2 border-2 border-saffron p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-saffron to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md z-10">
              🌟 Most Popular • Best Value
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-saffron mb-1">Pro Plan</div>
              <h3 className="text-2xl font-black text-text">CG Guru Pro Pass</h3>
              <p className="text-xs text-text-muted mt-1">Serious Aspirants ke liye Complete Selection Package</p>
              
              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-text-muted line-through font-bold">₹799</span>
                  <span className="text-4xl font-black text-greenL">₹299</span>
                  <span className="text-xs text-text-muted font-bold">/ 1 Year</span>
                </div>
                <span className="inline-block mt-1 text-[11px] font-black text-saffron bg-saffron/10 px-2 py-0.5 rounded">
                  Coupon CGGURU60 Applied (FLAT 60% OFF)
                </span>
              </div>

              <ul className="space-y-3 text-xs text-text mb-8">
                <li className="flex items-center gap-2 font-bold text-saffron">
                  <Check className="w-4 h-4 text-saffron shrink-0" />
                  <span>Free Pass ke sabhi features included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span><strong>Unlimited 24/7 AI Tutor</strong> (Instant doubt solving & concept clarity)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span><strong>Last 10 Years PYQs</strong> topic-wise with detailed solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span><strong>Full-Length Real Mock Tests</strong> (Negative marking & All-CG rank)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span><strong>Complete Typing Test Suite</strong> (KrutiDev, Mangal, Remington)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-greenL shrink-0" />
                  <span>Weak Area Diagnostic & AI Score Booster</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowOfferModal(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-saffron/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Claim Offer — ₹299 Only</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3: Lifetime Pass */}
          <div className="rounded-3xl bg-bg-s2 border border-border p-7 flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-gold mb-1">Lifetime Pass</div>
              <h3 className="text-xl font-black text-text">Lifetime Champion</h3>
              <p className="text-xs text-text-muted mt-1">Bar-bar recharge aur renewal se complete freedom</p>
              
              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-text-muted line-through font-bold">₹1999</span>
                  <span className="text-3xl font-black text-gold">₹699</span>
                  <span className="text-xs text-text-muted font-bold">/ One-time</span>
                </div>
                <span className="inline-block mt-1 text-[11px] font-bold text-gold">
                  Pay Once • Lifetime Unlimited Access
                </span>
              </div>

              <ul className="space-y-3 text-xs text-text-muted mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0" />
                  <span>Pro Pass ke sabhi features lifetime available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0" />
                  <span>Future me aane wali new test series free included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0" />
                  <span>Personal AI Study Planner & Revision Scheduler</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0" />
                  <span>Priority 1-on-1 Doubt Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0" />
                  <span>Unlimited Test Re-attempts & PDF Notes Export</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowOfferModal(true)}
              className="w-full py-3 rounded-xl bg-bg-s3 hover:bg-gold/20 hover:text-gold text-text font-bold text-xs uppercase tracking-wider cursor-pointer transition-all border border-border hover:border-gold/40"
            >
              Get Lifetime Pass
            </button>
          </div>

        </div>
      </section>

      {/* Aspirant Testimonials */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black text-saffron uppercase tracking-widest bg-saffron/10 px-3 py-1 rounded-full">
            Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text mt-3">
            Chhattisgarh ke Toppers aur Aspirants ka Bharosa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-bg-s2 border border-border shadow-sm">
            <div className="flex items-center gap-1 text-gold mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
              "CG Guru ke AI Tutor ne mere Chhattisgarh History aur Art-Culture ke saare confusing doubts minutes me clear kar diye. Mock tests ka level exact CGPSC jaisa hai!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-saffron flex items-center justify-center font-black text-white text-sm shadow">
                R
              </div>
              <div>
                <h5 className="text-xs font-bold text-text">Rahul Verma</h5>
                <span className="text-[10px] text-text-muted">CGPSC Prelims Qualified (Raipur)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-bg-s2 border border-border shadow-sm">
            <div className="flex items-center gap-1 text-gold mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
              "Vyapam Hostel Warden aur Court bharti ke liye Typing Test bahut shandar hai. Remington GAIL layout par meri speed 24 WPM se badhkar 42 WPM ho gayi."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-greenL flex items-center justify-center font-black text-white text-sm shadow">
                P
              </div>
              <div>
                <h5 className="text-xs font-bold text-text">Priya Sahu</h5>
                <span className="text-[10px] text-text-muted">Hostel Warden Aspirant (Bilaspur)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-bg-s2 border border-border shadow-sm">
            <div className="flex items-center gap-1 text-gold mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
              "Daily Current Affairs aur PYQs ki explanation itni detailed hai ki alag se books khareedne ki zaroorat hi nahi padi. ₹299 me best deal hai!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-black text-white text-sm shadow">
                A
              </div>
              <div>
                <h5 className="text-xs font-bold text-text">Amit Kumar Toppo</h5>
                <span className="text-[10px] text-text-muted">CG Police SI Aspirant (Ambikapur)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="faq">
        <div className="text-center mb-10">
          <span className="text-xs font-black text-text-muted uppercase tracking-widest bg-bg-s3 px-3 py-1 rounded-full border border-border">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text mt-3">
            Common Questions & Answers (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = selectedFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-bg-s2 border border-border/70 overflow-hidden transition-colors shadow-sm"
              >
                <button
                  onClick={() => setSelectedFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-text flex items-center justify-between gap-4 cursor-pointer hover:text-saffron transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-saffron shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border/40 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct App Download Box */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-bg-s2 via-bg-s3 to-bg-s2 border border-border rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-lg">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-greenL uppercase tracking-wider mb-2">
              <Smartphone className="w-4 h-4" />
              Practice Anytime, Anywhere on Mobile
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-text mb-2">
              Download CG Guru Android App Directly
            </h3>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl">
              Superfast loading, low internet data usage aur smooth test practice ke liye direct official Android APK install karein.
            </p>
          </div>

          <a
            href={SUPABASE_APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="CG_Guru_App.apk"
            className="px-8 py-4 bg-greenL hover:bg-green-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-greenL/25 transition-all flex items-center gap-2.5 cursor-pointer shrink-0 active:scale-95"
          >
            <Download className="w-5 h-5" />
            <span>Download .APK (22 MB)</span>
          </a>
        </div>
      </section>

      {/* Bottom High-Impact Call to Action Banner */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-bg-s1 via-bg-s2 to-bg-s1 border-t border-border/60">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-text mb-4">
            Aaj Hi Apni Taiyari Shuru Karein aur Selection Pakka Karein!
          </h2>
          <p className="text-sm text-text-muted mb-8 leading-relaxed">
            Thousands of successful aspirants already CG Guru ke saath practice kar rahe hain. Are you ready to crack your dream exam?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartPractice}
              className="px-8 py-4 bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xl hover:shadow-saffron/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-5 h-5 fill-white text-white" />
              <span>Start Free Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={currentUser ? onStartPractice : onOpenAuth}
              className="px-8 py-4 bg-bg-s3 hover:bg-border/60 border border-border text-text font-bold text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
            >
              {currentUser ? 'Go to Dashboard' : 'Login / Register Now'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-bg-s2/80 py-8 px-4 text-center text-xs text-text-muted">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-saffron" />
            <span className="font-black text-text text-sm">CG Guru Exam Prep</span>
          </div>
          <div>
            © {new Date().getFullYear()} CG Guru. All rights reserved. Dedicated to Chhattisgarh Aspirants.
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button onClick={() => setShowOfferModal(true)} className="hover:text-saffron cursor-pointer">Offers</button>
            <button onClick={() => onNavigateToTab('practice')} className="hover:text-saffron cursor-pointer">Mock Tests</button>
            <button onClick={() => onNavigateToTab('typing')} className="hover:text-saffron cursor-pointer">Typing</button>
          </div>
        </div>
      </footer>

      {/* Interactive Claim Offer Dialog Modal */}
      <AnimatePresence>
        {showOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-bg-s2 border-2 border-saffron rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text p-1.5 rounded-full hover:bg-bg-s3 cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-saffron/10 border border-saffron/30 flex items-center justify-center text-saffron mx-auto mb-3">
                  <Gift className="w-6 h-6 animate-bounce" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-saffron bg-saffron/10 px-3 py-0.5 rounded-full">
                  Special Coupon Activated
                </span>
                <h3 className="text-xl font-black text-text mt-2">
                  Claim CG Guru Pro Pass
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  Annual Pass par FLAT 60% instant discount!
                </p>
              </div>

              {/* Price Details */}
              <div className="bg-bg-s1 rounded-2xl p-4 border border-border mb-6">
                <div className="flex justify-between items-center text-xs text-text-muted mb-2">
                  <span>Actual Price (1 Year)</span>
                  <span className="line-through font-bold">₹799</span>
                </div>
                <div className="flex justify-between items-center text-xs text-greenL mb-2">
                  <span>Coupon Discount (CGGURU60)</span>
                  <span className="font-bold">- ₹500 (60% OFF)</span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between items-center text-sm font-black text-text">
                  <span>Total Payable Amount</span>
                  <span className="text-xl text-saffron">₹299</span>
                </div>
              </div>

              {/* Perks quick check */}
              <div className="space-y-2 text-xs text-text-muted mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-greenL shrink-0" />
                  <span>24/7 AI Tutor & Unlimited Doubt Solving</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-greenL shrink-0" />
                  <span>Last 10 Years CGPSC & Vyapam PYQs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-greenL shrink-0" />
                  <span>Bilingual Typing Test & All-CG Live Rank</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowOfferModal(false);
                    if (!currentUser) {
                      onOpenAuth();
                    } else {
                      onStartPractice();
                    }
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 fill-white text-white" />
                  <span>{currentUser ? 'Start Practice with Pro Offer' : 'Sign Up & Claim Discount'}</span>
                </button>

                <button
                  onClick={() => {
                    setShowOfferModal(false);
                    onStartPractice();
                  }}
                  className="w-full py-2.5 bg-transparent hover:bg-bg-s3 text-text-muted text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Continue with Free Practice First
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
