import React from "react";
import { motion, easeOut } from "framer-motion";
import {
  Beaker,
  BarChart3,
  FileSpreadsheet,
  TrendingUp,
  Download,
  Github,
  ArrowRight,
  PlayCircle,
  Upload,
  PieChart,
  Activity,
  Gauge,
  Thermometer,
  Layers,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileSpreadsheet,
      title: "Smart CSV Parsing",
      description: "Auto-detects equipment headers and units for seamless data ingestion.",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: BarChart3,
      title: "Vector Analytics",
      description: "High-fidelity charts optimized for chemical parameter distribution.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: TrendingUp,
      title: "Metric Tracking",
      description: "Monitor pressure, flowrate, and heat variances across fleets.",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Download,
      title: "Technical PDF",
      description: "Standardized industrial reports ready for stakeholder review.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <div className="min-h-screen bg-white text-neutral-darkest font-sans">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b-2 border-neutral-light/30 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-header flex items-center justify-center shadow-glow-primary">
              <Beaker className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-primary">
              Chemical Equipment<span className="text-secondary"> Visualizer</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-neutral-medium hover:text-secondary transition-colors uppercase tracking-widest">Features</a>
            <a href="#workflow" className="text-sm font-bold text-neutral-medium hover:text-secondary transition-colors uppercase tracking-widest">Workflow</a>
            <a 
              href="https://github.com/avantika1036/chemical-equipment-visualizer.git" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-darkest hover:text-secondary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <Button 
              onClick={() => navigate("/auth")} 
              className="gradient-button-secondary rounded-xl px-8 border-none font-bold text-white shadow-glow-secondary hover:shadow-glow-secondary/70 transition-all"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border-2 border-secondary/20 mb-8">
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold tracking-[0.15em] text-secondary uppercase">Industrial Intelligence Platform</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl lg:text-7xl font-black leading-tight text-primary-dark mb-6">
              Engineering Data <br />
              <span className="text-transparent bg-clip-text gradient-header">Visualized.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-neutral-medium max-w-lg mb-10 font-medium leading-relaxed">
              Transform raw chemical equipment datasets into professional visual analytics and actionable PDF reports.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")} 
                className="h-16 px-10 text-lg font-bold gradient-button-primary rounded-2xl shadow-glow-primary border-none hover:shadow-glow-primary/70 transition-all"
              >
                Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
                    <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('https://youtube.com', '_blank')}
                    className="h-16 px-8 text-lg font-bold border-2 border-neutral-light text-primary-dark rounded-2xl hover:bg-primary-dark hover:text-white hover:border-primary-dark transition-all gap-3"
                >
                    <PlayCircle className="w-6 h-6 text-secondary" />
                    Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white border-2 border-neutral-lightest rounded-[40px] p-8 shadow-card-hover">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-light" />
                    <div className="w-3 h-3 rounded-full bg-neutral-light" />
                    <div className="w-3 h-3 rounded-full bg-neutral-light" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black tracking-widest uppercase border border-emerald-200">
                    <Activity className="w-3 h-3" /> Live Processing
                  </div>
               </div>
               
               <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl gradient-card border-2 border-primary/10 flex flex-col justify-between h-36 shadow-sm hover:shadow-lg transition-shadow">
                      <Gauge className="text-primary w-6 h-6" />
                      <div>
                        <div className="text-3xl font-black text-primary-dark">98.2%</div>
                        <div className="text-[10px] text-neutral-medium uppercase tracking-widest font-bold">Accuracy</div>
                      </div>
                    </div>
                    <div className="p-6 rounded-3xl gradient-card border-2 border-secondary/10 flex flex-col justify-between h-36 shadow-sm hover:shadow-lg transition-shadow">
                      <Thermometer className="text-secondary w-6 h-6" />
                      <div>
                        <div className="text-3xl font-black text-primary-dark">142°C</div>
                        <div className="text-[10px] text-neutral-medium uppercase tracking-widest font-bold">Process Temp</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-t from-primary/5 to-transparent rounded-2xl border-2 border-primary/10 flex items-end justify-around p-4 gap-2">
                    {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t-lg shadow-sm" 
                      />
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 gradient-card border-y-2 border-neutral-light/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-primary-dark uppercase tracking-tight">Core Features</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            <p className="mt-6 text-neutral-medium font-medium">Precision engineering tools designed for high-stakes chemical asset management.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[32px] border-2 border-neutral-light/50 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-dark">{f.title}</h3>
                <p className="text-neutral-medium text-sm font-medium leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section id="workflow" className="py-24">
        <div className="container mx-auto px-6">
          <div className="gradient-sidebar rounded-[48px] p-12 lg:p-20 text-white overflow-hidden relative shadow-card-hover">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black mb-10 leading-tight">Simple Workflow, <br /> Powerful Results.</h2>
                <div className="space-y-10">
                  {[
                    { title: "Upload Dataset", desc: "Drag and drop your equipment CSV files into the portal.", icon: Upload },
                    { title: "Review Analytics", desc: "Instantly view statistical distributions and performance charts.", icon: PieChart },
                    { title: "Export Report", desc: "Download high-quality PDF summaries for your records.", icon: Download }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-button-secondary flex items-center justify-center font-bold text-white shadow-glow-secondary text-xl">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-2 text-white">{step.title}</h4>
                        <p className="text-white/80 text-base font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className="w-64 h-64 rounded-full bg-secondary/20 absolute blur-[80px]"></div>
                <Layers className="w-48 h-48 text-white/20 animate-pulse relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black text-primary-dark mb-10">Start Optimizing Today</h2>
          <Button 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="h-16 px-16 text-xl font-bold gradient-button-primary rounded-2xl shadow-glow-primary border-none hover:shadow-glow-primary/70 transition-all"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="gradient-sidebar text-white pt-16 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b-2 border-white/20 pb-12 mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-button-secondary flex items-center justify-center shadow-glow-secondary">
                  <Beaker className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">Chemical Equipment Visualizer</span>
              </div>
              <p className="text-white/70 text-base font-medium max-w-sm leading-relaxed">
                Professional Visual Analytics for Chemical Engineering Assets. Optimized for precision and performance.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-12 items-center">
              <div className="space-y-3">
                <p className="text-xs text-secondary font-black uppercase tracking-[0.2em]">Open Source</p>
                <a 
                  href="https://github.com/avantika1036/chemical-equipment-visualizer.git" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-lg font-bold hover:text-secondary transition-colors"
                >
                  <Github className="w-6 h-6" /> Repository
                </a>
              </div>
              <div className="px-6 py-3 bg-white/10 rounded-2xl border-2 border-white/20 text-white font-bold text-sm tracking-widest shadow-inner">
                BUILD VERSION 1.0.0
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-white/50 uppercase tracking-[0.15em]">
            <p>© 2026 Chemical Equipment Visualizer // ALL RIGHTS RESERVED</p>
            <div className="flex gap-8">
                <p>Built for FOSSEE Internship Task</p>
                <p className="text-white/30 hidden md:block"></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
