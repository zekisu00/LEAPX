import { useState, useEffect, useRef } from 'react';
import {
  Network,
  Code2,
  Palette,
  Globe,
  Cpu,
  Terminal,
  Zap,
  Eye,
  Layers,
  Database,
  GitBranch,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Activity,
  Signal,
  Shield,
  Monitor,
} from 'lucide-react';

// Network Background Component
function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 50;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 249, 0.5)';
        ctx.fill();

        // Connect nearby nodes
        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 255, 249, ${0.2 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

// Network Monitor Dashboard
function NetworkMonitor() {
  const [metrics, setMetrics] = useState({
    bandwidth: 0,
    latency: 0,
    packets: 0,
    connections: 0,
  });

  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        bandwidth: Math.floor(Math.random() * 1000) + 500,
        latency: Math.floor(Math.random() * 50) + 5,
        packets: Math.floor(Math.random() * 10000) + 5000,
        connections: Math.floor(Math.random() * 100) + 50,
      });
      setHistory((prev) => [...prev.slice(-50), Math.random() * 100]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card rounded-lg p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-cyber-cyan" size={20} />
        <span className="text-cyber-cyan font-cyber text-sm tracking-wider">
          NETWORK_MONITOR.exe
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-cyber-darker p-4 rounded border border-cyber-cyan/20">
          <div className="text-cyber-cyan/60 text-xs mb-1">BANDWIDTH</div>
          <div className="text-cyber-cyan font-cyber text-xl">{metrics.bandwidth}</div>
          <div className="text-cyber-cyan/40 text-xs">Mbps</div>
        </div>
        <div className="bg-cyber-darker p-4 rounded border border-cyber-pink/20">
          <div className="text-cyber-pink/60 text-xs mb-1">LATENCY</div>
          <div className="text-cyber-pink font-cyber text-xl">{metrics.latency}</div>
          <div className="text-cyber-pink/40 text-xs">ms</div>
        </div>
        <div className="bg-cyber-darker p-4 rounded border border-cyber-purple/20">
          <div className="text-cyber-purple/60 text-xs mb-1">PACKETS</div>
          <div className="text-cyber-purple font-cyber text-xl">{metrics.packets}</div>
          <div className="text-cyber-purple/40 text-xs">/s</div>
        </div>
        <div className="bg-cyber-darker p-4 rounded border border-cyber-yellow/20">
          <div className="text-cyber-yellow/60 text-xs mb-1">CONNECTIONS</div>
          <div className="text-cyber-yellow font-cyber text-xl">{metrics.connections}</div>
          <div className="text-cyber-yellow/40 text-xs">active</div>
        </div>
      </div>

      {/* Activity Graph */}
      <div className="h-16 bg-cyber-darker rounded overflow-hidden flex items-end gap-px p-2">
        {history.map((value, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-cyber-cyan to-cyber-cyan/20 rounded-sm transition-all duration-300"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Project Card
interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const colors = ['cyan', 'pink', 'purple', 'yellow', 'blue'];
  const color = colors[index % colors.length];

  return (
    <div className="cyber-card rounded-lg overflow-hidden group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={20} className={`text-cyber-${color}`} />
        </div>
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-cyber text-cyber-${color} mb-2`}>
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded border border-cyber-${color}/30 text-cyber-${color} bg-cyber-${color}/10`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Skills Section
function SkillBar({ skill, level, color }: { skill: string; level: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{skill}</span>
        <span className={`text-sm text-cyber-${color}`}>{level}%</span>
      </div>
      <div className={`cyber-progress h-2 rounded-full border-cyber-${color}/30`}>
        <div
          className={`h-full bg-gradient-to-r from-cyber-${color}/50 to-cyber-${color} rounded-full transition-all duration-1000`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

// Terminal Component
function TerminalWindow() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const commands = [
    '> Initializing Neural Interface...',
    '> Loading design_modules.exe...',
    '> Establishing secure connection...',
    '> Accessing creative_database...',
    '> Systems online.',
    '> Welcome to the grid.',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        setLines((prev) => [...prev, commands[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cyber-cyan/20">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-cyber-cyan/60 text-xs">terminal.exe</span>
      </div>
      <div className="space-y-1 h-32 overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className="text-cyber-cyan">
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-cyber-pink">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none ml-2 text-cyber-cyan"
            placeholder="Enter command..."
          />
          <span className="terminal-cursor text-cyber-cyan">_</span>
        </div>
      </div>
    </div>
  );
}

// Main App
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const projects: Project[] = [
    {
      title: 'NEON_DASH',
      description: 'High-octane cyberpunk racing game with procedural city generation.',
      tags: ['WebGL', 'Three.js', 'React'],
      image: 'https://images.pexels.com/photos/373527/pexels-photo-373527.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#',
    },
    {
      title: 'SYNTHWAVE_UI',
      description: 'Retro-futuristic design system with animated components.',
      tags: ['Figma', 'CSS', 'Animation'],
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#',
    },
    {
      title: 'CYBER_METRICS',
      description: 'Real-time network monitoring dashboard with 3D visualizations.',
      tags: ['D3.js', 'WebSocket', 'Node'],
      image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#',
    },
    {
      title: 'GRID_BROWSER',
      description: 'Immersive portfolio experience with neural navigation.',
      tags: ['Canvas', 'GSAP', 'UI/UX'],
      image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-darker cyber-grid scanlines relative">
      <NetworkBackground />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cyber-dark/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-cyber text-cyber-cyan text-xl tracking-wider">
            NET.RUNNER
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`text-sm tracking-wider transition-colors ${
                  activeSection === item.toLowerCase()
                    ? 'text-cyber-cyan'
                    : 'text-gray-400 hover:text-cyber-cyan'
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Signal className="text-cyber-cyan animate-pulse" size={20} />
            <span className="text-cyber-cyan/60 text-xs font-mono">ONLINE</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Status Bar */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-cyber-dark/50 px-4 py-2 rounded-full border border-cyber-cyan/20">
              <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan/80 text-xs font-mono">
                SYSTEM ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-2 bg-cyber-dark/50 px-4 py-2 rounded-full border border-cyber-pink/20">
              <Shield className="text-cyber-pink" size={14} />
              <span className="text-cyber-pink/80 text-xs font-mono">
                SECURE CONNECTION
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <div className="text-cyber-cyan/40 font-mono text-sm mb-2">
              {'>'} IDENTITY LOADED
            </div>
            <h1 className="glitch text-6xl md:text-8xl font-cyber text-white neon-text mb-4">
              <span className="text-cyber-cyan">NET</span>
              <span className="text-cyber-pink">.</span>
              <span className="text-cyber-cyan">RUNNER</span>
            </h1>
            <div className="text-cyber-cyan/60 text-2xl md:text-3xl font-light tracking-widest">
              WEB ARCHITECT
            </div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Designing immersive digital experiences at the intersection of
            art and technology. Crafting interfaces that push boundaries.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="cyber-btn flex items-center gap-2">
              <Monitor size={18} />
              View Projects
            </button>
            <button className="cyber-btn border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-cyber-dark flex items-center gap-2">
              <Mail size={18} />
              Initialize Contact
            </button>
          </div>

          {/* Network Monitor */}
          <div className="max-w-4xl mx-auto">
            <NetworkMonitor />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-cyber-cyan/40">
              <span className="text-xs font-mono">SCROLL.DOWN</span>
              <ArrowRight className="rotate-90 animate-bounce" size={20} />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-cyber-cyan/10 font-mono text-xs">
          {'<DEV_MODE=true>'}
        </div>
        <div className="absolute top-40 right-10 text-cyber-pink/10 font-mono text-xs">
          {'<DESIGN_SYSTEM=v2.0>'}
        </div>
        <div className="absolute bottom-40 left-20 text-cyber-purple/10 font-mono text-xs">
          {'<INTERFACE=NEURAL>'}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-cyber-cyan/60 font-mono text-sm mb-2">
              {'>'} LOADING PROJECT_DATA
            </div>
            <h2 className="text-4xl md:text-5xl font-cyber text-white mb-4">
              <span className="text-cyber-cyan">PROJECT</span>
              <span className="text-cyber-pink">_</span>
              <span className="text-cyber-purple">GRID</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Selected works from the digital frontier. Each project represents
              a unique interface into parallel design dimensions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Skills */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Cpu className="text-cyber-cyan" />
                <h2 className="text-3xl font-cyber text-white">
                  <span className="text-cyber-cyan">SYS</span>
                  <span className="text-cyber-pink">_</span>
                  <span className="text-cyber-purple">CAPS</span>
                </h2>
              </div>

              <div className="space-y-6">
                <SkillBar skill="UI/UX Design" level={95} color="cyan" />
                <SkillBar skill="React / Next.js" level={92} color="pink" />
                <SkillBar skill="TypeScript" level={90} color="purple" />
                <SkillBar skill="Three.js / WebGL" level={85} color="yellow" />
                <SkillBar skill="Node.js" level={88} color="blue" />
              </div>
            </div>

            {/* Terminal */}
            <div>
              <TerminalWindow />
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="cyber-card p-4 rounded-lg">
                  <Layers className="text-cyber-cyan mb-2" size={24} />
                  <div className="text-white font-cyber text-lg">50+</div>
                  <div className="text-gray-500 text-xs">Projects Deployed</div>
                </div>
                <div className="cyber-card p-4 rounded-lg">
                  <Zap className="text-cyber-pink mb-2" size={24} />
                  <div className="text-white font-cyber text-lg">8+</div>
                  <div className="text-gray-500 text-xs">Years Experience</div>
                </div>
                <div className="cyber-card p-4 rounded-lg">
                  <Globe className="text-cyber-purple mb-2" size={24} />
                  <div className="text-white font-cyber text-lg">150+</div>
                  <div className="text-gray-500 text-xs">Sites Launched</div>
                </div>
                <div className="cyber-card p-4 rounded-lg">
                  <Eye className="text-cyber-yellow mb-2" size={24} />
                  <div className="text-white font-cyber text-lg">2M+</div>
                  <div className="text-gray-500 text-xs">User Impressions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="relative py-24 px-6 bg-cyber-dark/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-cyber-cyan/60 font-mono text-sm mb-2">
              {'>'} LOADING TOOLKIT
            </div>
            <h2 className="text-3xl md:text-4xl font-cyber text-white">
              <span className="text-cyber-cyan">SYSTEM</span>
              <span className="text-cyber-pink">_</span>
              <span className="text-cyber-purple">TOOLS</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: Code2, name: 'React', color: 'cyan' },
              { icon: Palette, name: 'Figma', color: 'pink' },
              { icon: Database, name: 'Supabase', color: 'purple' },
              { icon: GitBranch, name: 'Git', color: 'yellow' },
              { icon: Terminal, name: 'Node.js', color: 'blue' },
              { icon: Network, name: 'API', color: 'cyan' },
            ].map((tool) => (
              <div
                key={tool.name}
                className="cyber-card p-6 rounded-lg flex flex-col items-center gap-3 hover:scale-105 transition-transform"
              >
                <tool.icon className={`text-cyber-${tool.color}`} size={32} />
                <span className={`text-cyber-${tool.color}/80 text-sm font-mono`}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan animate-spin-slow opacity-30" />
                <div className="absolute inset-4 rounded-full border border-cyber-pink/50" />
                <div className="absolute inset-8 rounded-full border border-cyber-purple/30" />
                <img
                  src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Profile"
                  className="absolute inset-12 rounded-full object-cover"
                />
              </div>
              <div className="absolute top-0 left-0 right-0 flex justify-between text-cyber-cyan/40 font-mono text-xs">
                <span>['SYS_INIT']</span>
                <span>['v2.0.47']</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan font-mono text-sm">
                IDENTITY.FILE
              </span>
            </div>
            <h2 className="text-4xl font-cyber text-white mb-6">
              <span className="text-cyber-cyan">ABOUT</span>
              <span className="text-cyber-pink">_</span>
              <span className="text-cyber-purple">ME</span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a digital craftsman operating at the intersection of design
                and code. With over 8 years of experience building immersive web
                experiences, I specialize in creating interfaces that feel alive.
              </p>
              <p>
                My work spans from sleek corporate dashboards to experimental
                WebGL experiences. I believe in pushing the boundaries of what's
                possible in the browser while maintaining performance and
                accessibility.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new design trends,
                contributing to open source, or diving deep into cyberpunk
                aesthetics for inspiration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="cyber-card rounded-xl p-8 md:p-12">
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-full bg-cyber-cyan animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-cyber-pink animate-pulse animation-delay-200" />
              <div className="w-4 h-4 rounded-full bg-cyber-purple animate-pulse animation-delay-400" />
            </div>

            <h2 className="text-4xl md:text-5xl font-cyber text-white mb-4">
              <span className="text-cyber-cyan">INIT</span>
              <span className="text-cyber-pink">_</span>
              <span className="text-cyber-purple">CONTACT</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Ready to collaborate on your next digital project? Let's create
              something extraordinary together.
            </p>

            <form className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="NAME"
                className="w-full bg-cyber-darker border border-cyber-cyan/30 rounded-lg px-4 py-3 text-cyber-cyan placeholder-cyber-cyan/30 focus:border-cyber-cyan focus:outline-none font-mono"
              />
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-cyber-darker border border-cyber-pink/30 rounded-lg px-4 py-3 text-cyber-pink placeholder-cyber-pink/30 focus:border-cyber-pink focus:outline-none font-mono"
              />
              <textarea
                placeholder="MESSAGE"
                rows={4}
                className="w-full bg-cyber-darker border border-cyber-purple/30 rounded-lg px-4 py-3 text-cyber-purple placeholder-cyber-purple/30 focus:border-cyber-purple focus:outline-none font-mono resize-none"
              />
              <button className="cyber-btn w-full">
                <span className="flex items-center justify-center gap-2">
                  <Zap size={18} />
                  TRANSMIT MESSAGE
                </span>
              </button>
            </form>

            <div className="flex justify-center gap-6 mt-12">
              <a
                href="#"
                className="text-gray-400 hover:text-cyber-cyan transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyber-pink transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyber-purple transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-cyber-cyan/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-cyber-cyan/40 font-mono text-sm">
            <span className="text-cyber-cyan">NET</span>
            <span className="text-cyber-pink">.</span>
            <span className="text-cyber-purple">RUNNER</span>
            <span className="text-gray-500"> {'//'} 2024</span>
          </div>
          <div className="text-gray-500 text-xs font-mono">
            CRAFTED WITH{' '}
            <span className="text-cyber-pink animate-pulse">{'<3'}</span> IN THE
            GRID
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
