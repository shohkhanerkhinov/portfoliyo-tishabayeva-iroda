"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useInView } from "framer-motion";
import {
  Moon, Sun, Menu, X, ChevronRight, Download, Quote, MapPin, Mail, Phone,
  GraduationCap, BookOpen, Users, Award, Globe, Lightbulb, Sparkles,
  Send, Instagram, Facebook, Link as LinkIcon, Calendar, FileText,
  Beaker, School, TrendingUp, Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { translations } from "@/lib/i18n/translations";
import {
  publications, awards, testimonials, news, galleryImages, profileImage, heroBackground, socials, contactInfo
} from "@/lib/content/data";

/* ---------- Animated Background ---------- */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/40 dark:to-indigo-950/40" />
      {/* Floating orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-30 dark:opacity-20"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.8), transparent 70%)" }}
        animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-30 dark:opacity-20"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.7), transparent 70%)" }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full blur-3xl opacity-20 dark:opacity-15"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.6), transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/40 dark:bg-blue-300/30"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

/* ---------- Scroll Progress ---------- */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

/* ---------- Navbar ---------- */
const Navbar = ({ lang, setLang, theme, setTheme, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "activity", label: t.nav.activity },
    { id: "publications", label: t.nav.publications },
    { id: "awards", label: t.nav.awards },
    { id: "gallery", label: t.nav.gallery },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
            T
          </div>
          <div className="hidden sm:block">
            <div className="font-serif text-lg font-semibold leading-none">Prof. Tishaboyeva</div>
            <div className="text-xs text-muted-foreground">Irodaxon</div>
          </div>
        </motion.div>

        <div className="hidden lg:flex items-center gap-1">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => scrollTo(i.id)}
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
            >
              {i.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Languages className="h-4 w-4" />
                <span className="uppercase text-xs font-bold">{lang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("uz")}>🇺🇿 O‘zbekcha</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("ru")}>🇷🇺 Русский</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")}>🇬🇧 English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {items.map((i) => (
                <button
                  key={i.id}
                  onClick={() => scrollTo(i.id)}
                  className="text-left px-3 py-2.5 rounded-md hover:bg-muted transition-colors font-medium"
                >
                  {i.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/* ---------- Section wrapper ---------- */
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-20 md:py-28 ${className}`}>
    <div className="container mx-auto px-6">{children}</div>
  </section>
);

const SectionTitle = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="text-center mb-14"
  >
    <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-3">
      <span className="text-gradient">{title}</span>
    </h2>
    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
    <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
  </motion.div>
);

/* ---------- Hero ---------- */
const Hero = ({ t }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>{t.hero.greeting}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-5"
            >
              Tishaboyeva
              <br />
              <span className="text-gradient">Irodaxon</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground font-medium mb-4 font-serif italic"
            >
              {t.hero.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById("publications")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="h-4 w-4" />
                {t.hero.viewResearch}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2 glass"
              >
                <Mail className="h-4 w-4" />
                {t.hero.contact}
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mx-auto lg:ml-auto"
          >
            <div className="relative w-[300px] h-[380px] md:w-[400px] md:h-[500px]">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-purple-600 to-amber-500 blur-2xl opacity-40"
              />
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-muted">
                  <img
                    src={profileImage}
                    alt="Professor Tishaboyeva Irodaxon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 glass rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">PhD</div>
                    <div className="font-semibold text-sm">Pedagogy</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">20+ years</div>
                    <div className="font-semibold text-sm">Experience</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-current"
          />
        </div>
      </motion.div>
    </section>
  );
};

/* ---------- About ---------- */
const About = ({ t }) => {
  const items = [
    { icon: BookOpen, key: "bio", title: t.about.bioTitle, text: t.about.bio },
    { icon: GraduationCap, key: "experience", title: t.about.experienceTitle, text: t.about.experience },
    { icon: Lightbulb, key: "philosophy", title: t.about.philosophyTitle, text: t.about.philosophy },
    { icon: Award, key: "achievements", title: t.about.achievementsTitle, text: t.about.achievements },
    { icon: Beaker, key: "contribution", title: t.about.contributionTitle, text: t.about.contribution },
  ];
  return (
    <Section id="about">
      <SectionTitle title={t.about.title} subtitle={t.about.subtitle} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className={idx === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-1" : ""}
          >
            <Card className="glass shadow-soft h-full p-7 border-0 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ---------- Academic Activity ---------- */
const Activity = ({ t }) => {
  const items = [
    { icon: School, ...t.activity.teaching, color: "from-blue-500 to-cyan-500" },
    { icon: Beaker, ...t.activity.research, color: "from-purple-500 to-pink-500" },
    { icon: Users, ...t.activity.conferences, color: "from-amber-500 to-orange-500" },
    { icon: FileText, ...t.activity.projects, color: "from-emerald-500 to-teal-500" },
    { icon: Globe, ...t.activity.collab, color: "from-rose-500 to-red-500" },
  ];
  return (
    <Section id="activity">
      <SectionTitle title={t.activity.title} subtitle={t.activity.subtitle} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Card className="glass shadow-soft h-full p-7 border-0 overflow-hidden relative group cursor-pointer">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl group-hover:opacity-25 transition-opacity`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg`}>
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ---------- Publications (filterable) ---------- */
const Publications = ({ t, lang }) => {
  const [filter, setFilter] = useState("all");
  const categories = ["all", "pedagogy", "methodology", "higherEd", "innovation"];
  const filtered = filter === "all" ? publications : publications.filter(p => p.category === filter);
  return (
    <Section id="publications">
      <SectionTitle title={t.publications.title} subtitle={t.publications.subtitle} />
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((c) => (
          <Button
            key={c}
            variant={filter === c ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(c)}
            className={filter === c ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            {c === "all" ? t.publications.all : t.research[c]?.title || c}
          </Button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((pub, idx) => (
            <motion.div
              key={pub.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <Card className="glass shadow-soft p-6 border-0 h-full flex flex-col hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <Badge variant="secondary" className="shrink-0">{pub.year}</Badge>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {t.research[pub.category]?.title}
                  </Badge>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2 leading-snug">
                  {pub.title[lang]}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  <span className="italic">{pub.journal}</span>
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1.5 flex-1">
                    <Download className="h-3.5 w-3.5" />
                    {t.publications.download}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5 flex-1">
                    <Quote className="h-3.5 w-3.5" />
                    {t.publications.cite}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
};

/* ---------- Research Areas ---------- */
const ResearchAreas = ({ t }) => {
  const areas = [
    { key: "pedagogy", icon: BookOpen, color: "from-blue-600 to-indigo-600" },
    { key: "methodology", icon: Beaker, color: "from-purple-600 to-pink-600" },
    { key: "higherEd", icon: GraduationCap, color: "from-amber-600 to-orange-600" },
    { key: "innovation", icon: Lightbulb, color: "from-emerald-600 to-teal-600" },
    { key: "development", icon: TrendingUp, color: "from-rose-600 to-red-600" },
  ];
  return (
    <Section id="research">
      <SectionTitle title={t.research.title} subtitle={t.research.subtitle} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {areas.map((area, idx) => (
          <motion.div
            key={area.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <Card className="glass shadow-soft border-0 p-6 text-center h-full cursor-pointer group overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <area.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{t.research[area.key].title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.research[area.key].desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ---------- Awards Timeline ---------- */
const AwardsTimeline = ({ t, lang }) => {
  return (
    <Section id="awards">
      <SectionTitle title={t.awards.title} subtitle={t.awards.subtitle} />
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-amber-500 md:-translate-x-px" />
        {awards.map((a, idx) => (
          <motion.div
            key={a.year}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex items-center mb-8 ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
          >
            <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-background md:-translate-x-1/2 z-10 shadow-lg`} />
            <Card className={`glass shadow-soft border-0 p-5 ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
              idx % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
            }`}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1.5 text-xs">{a.year}</Badge>
                  <h3 className="font-serif text-lg font-semibold leading-tight mb-1">{a.title[lang]}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc[lang]}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ---------- Gallery ---------- */
const Gallery = ({ t }) => {
  return (
    <Section id="gallery">
      <SectionTitle title={t.gallery.title} subtitle={t.gallery.subtitle} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className={`relative rounded-2xl overflow-hidden shadow-soft group cursor-pointer ${
              idx === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <img
              src={src}
              alt="Gallery"
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                idx === 0 ? "h-full min-h-[400px]" : "h-52 md:h-56"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ---------- Stats ---------- */
const Counter = ({ value, label, icon: Icon }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-1">
        {count}+
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

const Stats = ({ t }) => {
  const stats = [
    { icon: Calendar, value: 20, label: t.stats.years },
    { icon: FileText, value: 50, label: t.stats.articles },
    { icon: Users, value: 1500, label: t.stats.students },
    { icon: Beaker, value: 25, label: t.stats.projects },
  ];
  return (
    <Section id="stats" className="py-16">
      <Card className="glass shadow-soft border-0 p-10 md:p-14">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-10">
          <span className="text-gradient">{t.stats.title}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => <Counter key={i} {...s} />)}
        </div>
      </Card>
    </Section>
  );
};

/* ---------- Testimonials ---------- */
const Testimonials = ({ t, lang }) => {
  return (
    <Section id="testimonials">
      <SectionTitle title={t.testimonials.title} subtitle={t.testimonials.subtitle} />
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((tst, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="glass shadow-soft border-0 p-7 h-full relative">
              <Quote className="absolute top-5 right-5 h-10 w-10 text-primary/15" />
              <p className="text-muted-foreground italic mb-6 leading-relaxed">“{tst.text[lang]}”</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                  {tst.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{tst.name}</div>
                  <div className="text-xs text-muted-foreground">{tst.role[lang]}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ---------- News ---------- */
const News = ({ t, lang }) => {
  return (
    <Section id="news">
      <SectionTitle title={t.news.title} subtitle={t.news.subtitle} />
      <div className="grid md:grid-cols-3 gap-6">
        {news.map((n, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <Card className="glass shadow-soft border-0 overflow-hidden h-full flex flex-col hover:shadow-xl transition-all">
              <div className="h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-amber-500 relative flex items-center justify-center">
                <Calendar className="h-14 w-14 text-white/80" />
                <Badge className="absolute top-3 left-3 bg-white/90 text-foreground hover:bg-white">
                  {new Date(n.date).toLocaleDateString(lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "uz-UZ", { day: "numeric", month: "short", year: "numeric" })}
                </Badge>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-lg font-semibold mb-2 leading-snug">{n.title[lang]}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{n.desc[lang]}</p>
                <Button variant="ghost" size="sm" className="self-start gap-1 p-0 h-auto hover:bg-transparent hover:text-primary">
                  {t.news.readMore} <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ---------- Contact ---------- */
const Contact = ({ t }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3500);
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contact">
      <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />
      <div className="grid lg:grid-cols-5 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-4"
        >
          {[
            { icon: MapPin, title: t.contact.location, value: t.contact.locationValue },
            { icon: MapPin, title: t.contact.office, value: t.contact.officeValue },
            { icon: Mail, title: t.contact.email, value: contactInfo.email },
            { icon: Phone, title: t.contact.phone, value: contactInfo.phone },
          ].map((item, i) => (
            <Card key={i} className="glass shadow-soft border-0 p-5 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">{item.title}</div>
                <div className="font-medium">{item.value}</div>
              </div>
            </Card>
          ))}
          {/* Map placeholder */}
          <Card className="glass shadow-soft border-0 overflow-hidden h-52 relative">
            <iframe
              title="map"
              className="w-full h-full border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=71.72%2C40.36%2C71.83%2C40.42&layer=mapnik&marker=40.389%2C71.783"
              loading="lazy"
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <Card className="glass shadow-soft border-0 p-7 md:p-9">
            <h3 className="font-serif text-2xl font-semibold mb-5">{t.contact.sendMessage}</h3>
            <form onSubmit={submit} className="space-y-4">
              <Input
                placeholder={t.contact.yourName}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-background/60"
              />
              <Input
                type="email"
                placeholder={t.contact.yourEmail}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-background/60"
              />
              <Textarea
                placeholder={t.contact.yourMessage}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                required
                className="bg-background/60 resize-none"
              />
              <Button
                type="submit"
                disabled={sending}
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {sent ? "✓ Sent!" : sending ? "..." : <>
                  <Send className="h-4 w-4" />
                  {t.contact.send}
                </>}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

/* ---------- Social ---------- */
const Social = ({ t }) => {
  const items = [
    { icon: Instagram, name: "Instagram", handle: socials.instagram.handle, url: socials.instagram.url, color: "from-pink-500 via-rose-500 to-orange-500" },
    { icon: Send, name: "Telegram", handle: socials.telegram.handle, url: socials.telegram.url, color: "from-sky-400 to-blue-500" },
    { icon: Facebook, name: "Facebook", handle: socials.facebook.handle, url: socials.facebook.url, color: "from-blue-600 to-indigo-600" },
    { icon: LinkIcon, name: "Website", handle: socials.website.handle, url: socials.website.url, color: "from-emerald-500 to-teal-500" },
  ];
  return (
    <Section id="social" className="py-16">
      <SectionTitle title={t.social.title} subtitle={t.social.subtitle} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {items.map((s, i) => (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.03 }}
          >
            <Card className="glass shadow-soft border-0 p-5 text-center group cursor-pointer h-full">
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <div className="font-semibold text-sm">{s.name}</div>
              <div className="text-xs text-muted-foreground mt-1 truncate">{s.handle}</div>
            </Card>
          </motion.a>
        ))}
      </div>
    </Section>
  );
};

/* ---------- Footer ---------- */
const Footer = ({ t }) => (
  <footer className="relative border-t border-border mt-10 bg-gradient-to-b from-transparent to-muted/30">
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-serif font-bold shadow-lg">T</div>
          <div>
            <div className="font-serif font-semibold">Prof. Tishaboyeva Irodaxon</div>
            <div className="text-xs text-muted-foreground">University Professor · Fargʻona</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} Tishaboyeva Irodaxon · {t.footer.rights}
          <div className="text-xs mt-1">{t.footer.made} ♥</div>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------- Loading ---------- */
const Loader = () => {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHide(true), 1500);
    return () => clearTimeout(t);
  }, []);
  if (hide) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      style={{ pointerEvents: "none" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="relative w-20 h-20"
      >
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-purple-600" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-amber-500 border-l-pink-500" />
      </motion.div>
    </motion.div>
  );
};

/* ---------- App ---------- */
function App() {
  const [lang, setLangState] = useState("uz");
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedLang && ["uz", "ru", "en"].includes(savedLang)) setLangState(savedLang);
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setThemeState(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setMounted(true);
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  const setTheme = (tm) => {
    setThemeState(tm);
    localStorage.setItem("theme", tm);
    document.documentElement.classList.toggle("dark", tm === "dark");
  };

  const t = translations[lang];

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <>
      <Loader />
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Hero t={t} />
            <About t={t} />
            <Activity t={t} />
            <Publications t={t} lang={lang} />
            <ResearchAreas t={t} />
            <AwardsTimeline t={t} lang={lang} />
            <Gallery t={t} />
            <Stats t={t} />
            <Testimonials t={t} lang={lang} />
            <News t={t} lang={lang} />
            <Contact t={t} />
            <Social t={t} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer t={t} />
    </>
  );
}

export default App;
