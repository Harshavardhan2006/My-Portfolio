import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ── Icons (inline SVG to avoid import issues) ──────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];

const SKILLS = [
  { category: 'Languages', skills: ['Java', 'JavaScript', 'TypeScript', 'SQL'], icon: '⟨/⟩' },
  { category: 'Frontend', skills: ['React.js', 'HTML', 'CSS', 'Tailwind CSS'], icon: '◈' },
  { category: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'], icon: '⚙' },
  { category: 'Database', skills: ['MongoDB', 'MongoDB Atlas'], icon: '◎' },
  { category: 'Tools', skills: ['Git', 'GitHub', 'Figma', 'Vite', 'Vercel', 'Render', 'Cloudinary', 'VS Code'], icon: '⊕' },
  { category: 'CS Fundamentals', skills: ['Data Structures', 'Algorithms', 'DBMS', 'OS', 'OOP'], icon: '∑' },
];

const PROJECTS = [
  {
    number: '01',
    title: 'Student Resource Sharing Platform',
    description: 'A full-stack MERN platform where students can upload, browse, search, share, and download educational resources — notes, PDFs, and assignments.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary'],
    github: 'https://github.com/Harshavardhan2006/DevOps-Full-Stack-Project',
    live: 'https://student-resource-platform-neon.vercel.app/',
    accent: '#10b981',
  },
  {
    number: '02',
    title: 'CodeLens AI',
    description: 'An AI-powered code explanation and analysis platform that helps developers understand, improve, and optimize their code utilizing the Groq API.',
    stack: ['React', 'Vite', 'Node.js', 'Express.js', 'Groq API'],
    github: 'https://github.com/Harshavardhan2006/Code-Lens-AI',
    live: 'https://code-lens-ai-nine.vercel.app/',
    accent: '#f59e0b',
  },
];

const CERTS = [
  { title: 'Data Structures & Algorithms', provider: 'upGrad', year: '2024' },
  { title: 'Deep Learning Fundamentals', provider: 'upGrad', year: '2024' },
  { title: 'Java Full Stack Developer', provider: 'EduSkills', year: '2023' },
  { title: 'CCNA: Introduction to Networks', provider: 'Cisco', year: '2023' },
];

// ── Motion variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase())).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(8,12,16,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', letterSpacing: '0.15em', color: 'var(--emerald)' }}>
            HV<span style={{ color: '#4b5563' }}>.dev</span>
          </div>
          
          {/* Desktop nav */}
          <div className="nav-desktop">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`nav-link${activeSection === link.toLowerCase() ? ' is-active' : ''}`}
              >{link}</a>
            ))}
          </div>

          {/* Mobile hamburger toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile-toggle" style={{ color: '#9ca3af' }} aria-label="Toggle menu">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{ background: '#0e1318', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_LINKS.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => {
                  // Tiny timeout lets native smooth scroll start, GPU opacity fade won't abort it
                  setTimeout(() => setMenuOpen(false), 50);
                }}
                  style={{
                    display: 'block',
                    padding: '12px 0', fontSize: '13px', letterSpacing: '0.1em',
                    textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    color: activeSection === link.toLowerCase() ? 'var(--emerald)' : '#9ca3af',
                    transition: 'color 0.2s',
                  }}>
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ── Component ─────────────────────────────────────────────────────────────
export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // null | 'sent' | 'error' | 'loading'
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '76bd3803-ea94-439b-a1d4-d77f6d722bac',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: 'Portfolio Contact Form',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", backgroundColor: '#080c10', color: '#e8e6e1' }} className="min-h-screen">
      {/* Google Fonts — loaded via index.html preconnect; href tag placed here for font file */}
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        :root {
          --emerald: #10b981;
          --gold: #d4a843;
          --cream: #e8e6e1;
          --surface: #0e1318;
          --surface2: #141b22;
          --border: rgba(255,255,255,0.06);
        }
        ::selection { background: var(--emerald); color: #080c10; }
        .font-display { font-family: 'DM Serif Display', serif; }
        .noise::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          opacity: 0.45;
        }

        .line-accent {
          position: relative;
        }
        .line-accent::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 3rem;
          height: 2px;
          background: var(--emerald);
        }
        .tag {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 2px;
          font-size: 11px;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.04em;
          border: 1px solid rgba(255,255,255,0.1);
          color: #9ca3af;
          background: rgba(255,255,255,0.03);
        }
        .tag-em {
          border-color: rgba(16,185,129,0.3);
          color: var(--emerald);
          background: rgba(16,185,129,0.06);
        }
        .tag-gold {
          border-color: rgba(212,168,67,0.3);
          color: var(--gold);
          background: rgba(212,168,67,0.06);
        }
        .nav-link {
          position: relative;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9ca3af;
          transition: color 0.25s;
        }
        .nav-link:hover { color: var(--emerald); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--emerald);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .section-num {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--emerald);
          letter-spacing: 0.15em;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: var(--emerald);
          color: #080c10;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 2px;
          transition: all 0.25s;
        }
        .btn-primary:hover {
          background: #0ea673;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(16,185,129,0.3);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 28px;
          border: 1px solid rgba(255,255,255,0.15);
          color: #9ca3af;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 2px;
          transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: var(--emerald);
          color: var(--emerald);
          transform: translateY(-1px);
        }
        .project-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .project-card:hover {
          transform: translateY(-4px);
          border-color: rgba(16,185,129,0.25);
        }
        .skill-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 28px;
          transition: border-color 0.3s;
        }
        .skill-card:hover { border-color: rgba(16,185,129,0.2); }
        .contact-input {
          width: 100%;
          padding: 12px 16px;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          color: var(--cream);
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s;
        }
        .contact-input:focus { border-color: var(--emerald); }
        .contact-input::placeholder { color: #4b5563; }
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent);
        }
        .grid-bg {
          background-image: 
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .marquee-inner { animation: marquee 20s linear infinite; }
        /* ── Social labels ── */
        .social-label { display: inline; }
        @media (max-width: 480px) { .social-label { display: none; } }
        /* ── Skill card stronger hover ── */
        .skill-card:hover { border-color: rgba(16,185,129,0.35) !important; background: rgba(16,185,129,0.04) !important; box-shadow: 0 0 32px rgba(16,185,129,0.07); }
        /* ── Active nav link ── */
        .nav-link.is-active { color: var(--emerald); }
        .nav-link.is-active::after { width: 100%; }
        /* ── Back to top ── */
        .back-to-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 100;
          width: 44px; height: 44px; border-radius: 2px;
          background: var(--surface2); border: 1px solid rgba(255,255,255,0.1);
          color: var(--emerald); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.25s; box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .back-to-top:hover { background: var(--emerald); color: #080c10; border-color: var(--emerald); transform: translateY(-2px); }
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(2.2rem, 10vw, 4rem); }

          /* ── Sections ── */
          section { padding-top: 72px !important; padding-bottom: 72px !important; }

          /* ── About grid gap ── */
          .about-grid { gap: 48px !important; }

          /* ── Skills grid ── */
          .skill-card { padding: 20px !important; }

          /* ── Project cards ── */
          .project-inner-grid { grid-template-columns: 1fr !important; }
          .project-left-stripe { padding: 32px 24px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
          .project-right-actions { padding: 24px !important; flex-direction: row !important; gap: 12px !important; }
          .project-big-num { font-size: 3.5rem !important; }

          /* ── Education gap ── */
          .edu-grid { gap: 48px !important; }

          /* ── Hero orbs ── */
          .hero-orb-1 { width: 280px !important; height: 280px !important; right: -30% !important; }
          .hero-orb-2 { width: 220px !important; height: 220px !important; left: -20% !important; }

          /* ── Footer ── */
          .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; }

          /* ── Contact ── */
          .contact-grid { gap: 32px !important; }
        }

        /* ── Navbar responsive ── */
        .nav-desktop { display: none; }
        .nav-mobile-toggle { display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; padding: 4px; border-radius: 4px; transition: color 0.25s; }
        @media (min-width: 769px) {
          .nav-desktop { display: flex; align-items: center; gap: 36px; }
          .nav-mobile-toggle { display: none; }
        }

        @media (max-width: 480px) {
          section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .btn-primary, .btn-outline { padding: 10px 20px !important; font-size: 11px !important; }
          .project-right-actions { flex-direction: column !important; }
        }
      `}</style>

      {/* Noise overlay */}
      <div className="noise" />

      {/* ── NAVIGATION ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section id="home" ref={heroRef} className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '64px' }}>
        {/* Glow orbs */}
        <div className="hero-orb-1" style={{ position: 'absolute', top: '15%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="hero-orb-2" style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, width: '100%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0}>
              <span className="section-num" style={{ display: 'block', marginBottom: '20px' }}>// PORTFOLIO 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display hero-title"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.05, marginBottom: '28px', color: 'var(--cream)' }}
            >
              Kokkonda{' '}
              <motion.span
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ color: 'var(--emerald)', display: 'block' }}
              >
                Harshavardhan.
              </motion.span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
              <p style={{ fontSize: '1.1rem', color: '#6b7280', maxWidth: '520px', lineHeight: 1.7, marginBottom: '8px' }}>
                Full Stack Developer
              </p>
              <p style={{ fontSize: '0.85rem', fontFamily: 'DM Mono, monospace', color: 'var(--emerald)', letterSpacing: '0.08em', marginBottom: '16px', opacity: 0.75 }}>
                MERN Stack &nbsp;·&nbsp; REST APIs &nbsp;·&nbsp; AI Integrations
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4b5563', maxWidth: '480px', lineHeight: 1.7, marginBottom: '40px', fontStyle: 'italic', fontFamily: 'DM Serif Display, serif' }}>
                "Building scalable web applications and crafting intuitive digital experiences."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}
            >
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="https://drive.google.com/file/d/17Ttos7OohybGiNF4mDWLyfN8SDjNSySg/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-outline"><DownloadIcon /> Resume</a>
              <a href="#contact" className="btn-outline">Contact</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
              style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
            >
              {[
                { icon: <GithubIcon />, href: 'https://github.com/Harshavardhan2006', label: 'GitHub' },
                { icon: <LinkedinIcon />, href: 'https://linkedin.com/in/harshavardhan-9a9336322', label: 'LinkedIn' },
                { icon: <MailIcon />, href: 'mailto:kokkondaharshavardhan@gmail.com', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '12px', letterSpacing: '0.05em', transition: 'color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}
                >
                  {icon}
                  <span className="social-label">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#374151', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
            style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--emerald), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '14px 0', overflow: 'hidden', background: 'var(--surface)' }}>
        <div className="marquee-inner" style={{ display: 'flex', whiteSpace: 'nowrap', gap: '0' }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: 'flex', gap: '0' }}>
              {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Java', 'REST APIs', 'JWT', 'Tailwind', 'Cloudinary', 'Git', 'Figma'].map(s => (
                <span key={s} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#374151', letterSpacing: '0.1em', padding: '0 32px' }}>
                  <span style={{ color: 'var(--emerald)', marginRight: '8px' }}>✦</span>{s}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '120px 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px', alignItems: 'center' }}>
            
            {/* Left */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <span className="section-num" style={{ display: 'block', marginBottom: '16px' }}>01 / ABOUT</span>
              <h2 className="font-display line-accent" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '32px', lineHeight: 1.15 }}>
                The person<br/><em style={{ color: 'var(--gold)' }}>behind the code</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'Computer Science Engineering student passionate about software development, modern web technologies, and solving real-world problems through technology.',
                  'I enjoy building scalable applications, learning new technologies, and continuously improving my development skills.',
                  'Beyond coding, photography sharpens my eye for detail and trains me to think creatively — skills I bring directly to UI/UX work.',
                ].map((text, i) => (
                  <motion.p key={i} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ color: '#6b7280', lineHeight: 1.8, fontSize: '0.95rem' }}>
                    {text}
                  </motion.p>
                ))}
                <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '1rem', lineHeight: 1.7, fontFamily: 'DM Serif Display, serif', fontStyle: 'italic' }}>
                  "My goal is to become a skilled software engineer capable of creating impactful, user-centric digital solutions."
                </motion.p>
              </div>
            </motion.div>

            {/* Right — stats */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={2}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                {[
                  { label: 'CGPA', value: '9.1', sub: 'out of 10' },
                  { label: 'Projects', value: '2+', sub: 'deployed' },
                  { label: 'Certifications', value: '4', sub: 'earned' },
                  { label: 'Board Score', value: '954', sub: '12th · out of 1000' },
                ].map(({ label, value, sub }, i) => (
                  <div key={label} style={{
                    padding: '32px 28px',
                    background: i % 2 === 0 ? 'var(--surface2)' : '#080c10',
                    borderRadius: i === 0 ? '4px 0 0 0' : i === 1 ? '0 4px 0 0' : i === 2 ? '0 0 0 4px' : '0 0 4px 0',
                  }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.8rem', color: 'var(--emerald)', lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cream)', marginTop: '6px' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: '#4b5563', fontFamily: 'DM Mono, monospace', marginTop: '4px' }}>{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '64px' }}>
            <span className="section-num" style={{ display: 'block', marginBottom: '12px' }}>02 / SKILLS</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Technical <span style={{ color: 'var(--emerald)' }}>Arsenal</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2px' }}>
            {SKILLS.map(({ category, skills, icon }, i) => (
              <motion.div key={category} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} className="skill-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cream)', fontWeight: 600 }}>{category}</h3>
                  <span style={{ fontFamily: 'DM Mono, monospace', color: 'var(--emerald)', fontSize: '16px', opacity: 0.7 }}>{icon}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skills.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: '120px 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '64px' }}>
            <span className="section-num" style={{ display: 'block', marginBottom: '12px' }}>03 / PROJECTS</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Featured <span style={{ color: 'var(--emerald)' }}>Work</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gap: '24px' }}>
            {PROJECTS.map(({ number, title, description, stack, github, live, accent }, i) => (
              <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="project-card">
                <div className="project-inner-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0' }}>
                  {/* Left stripe */}
                  <div className="project-left-stripe" style={{ padding: '48px 40px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="project-big-num" style={{ fontFamily: 'DM Serif Display, serif', fontSize: '5rem', color: 'rgba(255,255,255,0.04)', lineHeight: 1, marginBottom: '20px' }}>{number}</div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '16px', lineHeight: 1.3 }}>{title}</h3>
                    <p style={{ color: '#6b7280', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '24px' }}>{description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {stack.map(t => <span key={t} className="tag" style={{ borderColor: `${accent}33`, color: accent, background: `${accent}0d` }}>{t}</span>)}
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="project-right-actions" style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', background: 'rgba(255,255,255,0.01)' }}>
                    <a href={github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px', color: '#9ca3af', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.25s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--cream)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#9ca3af'; }}>
                      <GithubIcon /> View Source
                    </a>
                    <a href={live} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px', background: accent, borderRadius: '2px', color: '#080c10', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.25s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${accent}40`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                      <ExternalIcon /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── EDUCATION ── */}
      <section id="education" style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '64px' }}>
            <span className="section-num" style={{ display: 'block', marginBottom: '12px' }}>04 / BACKGROUND</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Education &amp; <span style={{ color: 'var(--gold)' }}>Credentials</span>
            </h2>
          </motion.div>

          <div className="edu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px' }}>
            
            {/* Education timeline */}
            <div>
              <h3 style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: '40px', fontFamily: 'DM Mono, monospace' }}>Academic</h3>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
                {[
                  { degree: 'B.Tech Computer Science', inst: 'SR University, Warangal', detail: 'CGPA 9.1 / 10', period: 'Pursuing', active: true },
                  { degree: 'Intermediate (MPC)', inst: 'SV Junior College, Sangareddy', detail: '954 / 1000', period: '2021–2023', active: false },
                ].map(({ degree, inst, detail, period, active }) => (
                  <motion.div key={degree} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: 'relative' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: active ? 'var(--emerald)' : '#374151',
                      position: 'absolute', left: '-34px', top: '4px',
                      boxShadow: active ? '0 0 0 4px rgba(16,185,129,0.15)' : 'none',
                    }} />
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#4b5563', letterSpacing: '0.1em', marginBottom: '8px' }}>{period}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '4px' }}>{degree}</h4>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '6px' }}>{inst}</p>
                    <span className={`tag ${active ? 'tag-em' : ''}`}>{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '40px', fontFamily: 'DM Mono, monospace' }}>Certifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {CERTS.map(({ title, provider, year }, i) => (
                  <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '2px', transition: 'border-color 0.25s, background 0.25s', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,168,67,0.2)'; e.currentTarget.style.background = 'rgba(212,168,67,0.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  >
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--cream)', marginBottom: '2px' }}>{title}</div>
                      <div style={{ fontSize: '12px', color: '#4b5563', fontFamily: 'DM Mono, monospace' }}>{provider}</div>
                    </div>
                    <span className="tag tag-gold">{year}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '120px 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="section-num" style={{ display: 'block', marginBottom: '12px' }}>05 / CONTACT</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15, marginBottom: '20px' }}>
              Let's <span style={{ color: 'var(--emerald)' }}>Connect</span>
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Open to collaborations, opportunities, or just a friendly conversation about tech.
            </p>
          </motion.div>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '48px' }}>
            {/* Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {[
                { icon: <MailIcon />, label: 'Email', value: 'kokkondaharshavardhan@gmail.com', href: 'mailto:kokkondaharshavardhan@gmail.com' },
                { icon: <LinkedinIcon />, label: 'LinkedIn', value: 'in/harshavardhan-9a9336322', href: 'https://linkedin.com/in/harshavardhan-9a9336322' },
                { icon: <GithubIcon />, label: 'GitHub', value: 'github.com/Harshavardhan2006', href: 'https://github.com/Harshavardhan2006' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald)', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '4px', fontFamily: 'DM Mono, monospace' }}>{label}</div>
                    <a href={href} target="_blank" rel="noreferrer" style={{ color: '#9ca3af', fontSize: '0.875rem', transition: 'color 0.25s', wordBreak: 'break-all' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald)'}
                      onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>{value}</a>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <form onSubmit={handleFormSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b5563', fontFamily: 'DM Mono, monospace', marginBottom: '8px' }}>Name</label>
                  <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleFormChange} className="contact-input" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b5563', fontFamily: 'DM Mono, monospace', marginBottom: '8px' }}>Email</label>
                  <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleFormChange} className="contact-input" placeholder="your@email.com" required />
                </div>
                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b5563', fontFamily: 'DM Mono, monospace', marginBottom: '8px' }}>Message</label>
                  <textarea id="contact-message" rows="4" name="message" value={formData.message} onChange={handleFormChange} className="contact-input" placeholder="Your message..." style={{ resize: 'none' }} required />
                </div>
                {formStatus === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ color: 'var(--emerald)', fontSize: '13px', fontFamily: 'DM Mono, monospace', margin: 0, padding: '10px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '2px' }}
                  >
                    ✓ Message sent! I'll get back to you soon.
                  </motion.p>
                )}
                {formStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ color: '#f87171', fontSize: '13px', fontFamily: 'DM Mono, monospace', margin: 0, padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '2px' }}
                  >
                    ⚠ {!formData.name || !formData.email || !formData.message ? 'Please fill in all fields.' : 'Something went wrong. Try emailing directly.'}
                  </motion.p>
                )}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formStatus === 'loading'}
                  style={{ justifyContent: 'center', marginTop: '4px', opacity: formStatus === 'loading' ? 0.7 : 1, cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer' }}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <svg style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" strokeLinecap="round"/>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080c10', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 24px' }}>
        <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--emerald)', letterSpacing: '0.1em' }}>HV<span style={{ color: '#374151' }}>.dev</span></div>
          <p style={{ color: '#374151', fontSize: '11px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Harshavardhan. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { icon: <GithubIcon />, href: 'https://github.com/Harshavardhan2006' },
              { icon: <LinkedinIcon />, href: 'https://linkedin.com/in/harshavardhan-9a9336322' },
              { icon: <MailIcon />, href: 'mailto:kokkondaharshavardhan@gmail.com' },
            ].map(({ icon, href }, i) => (
              <a key={i} href={href} style={{ color: '#374151', transition: 'color 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald)'}
                onMouseLeave={e => e.currentTarget.style.color = '#374151'}>{icon}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <BackToTop />
    </div>
  );
}