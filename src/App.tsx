import React from "react";
import './App.css'

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  role?: string;
  summary: string;
  bullets: string[];
  tech: string[];
  codeExampleTitle?: string;
  codeExample?: string;
};

const projects: Project[] = [
  {
    id: "solana-listener",
    title: "Real-Time Validator Stream Listener & Reactive Engine",
    subtitle: "High-throughput, low-latency event pipeline",
    role: "Rust/Python Backend Engineer",
    summary:
      "A high-performance Rust backend that connects to validator packet streams (Shredstream + gRPC) to ingest and decode network activity in real time. The system normalizes all events, triggers automated reactions, and persists a complete history for querying and analysis.",
    bullets: [
      "Consumes validator streams via Shredstream/gRPC with sub-second latency.",
      "Normalizes raw packets into a unified internal event model.",
      "Publishes events to a reaction engine and writes a full event history to a log store.",
      "Implements reconnection logic, backpressure handling, and structured logging for observability.",
    ],
    tech: ["Rust", "Tokio (async)", "gRPC", "Shredstream", "Event Bus", "PostgreSQL / log store"],
    codeExampleTitle: "Pipeline loop",
    codeExample: `function run_realtime_pipeline(config):
    stream = connect_shredstream(config.validators)

    for packet in stream:
        timestamp = now()

        event = decode_and_normalize(packet)
        if event is None:
            continue

        emit_to_reaction_engine(event)
        log_store.append(event, observed_at = timestamp)`,
  },
  {
    id: "dex-aggregator",
    title: "Multi-DEX Aggregator & Execution Router",
    subtitle: "Optimal route computation across multiple DEX SDKs",
    role: "Rust/Python Backend Engineer",
    summary:
      "A modular Rust backend that queries multiple DEX SDKs in parallel, computes optimal swap routes, and executes multi-hop transactions across different platforms, with full logging of quotes, decisions, and executions.",
    bullets: [
      "Fetches quotes from multiple DEX SDKs in parallel for minimal latency.",
      "Computes optimal multi-hop routes based on price, slippage, and constraints.",
      "Executes each hop sequentially through the appropriate SDK, preserving state.",
      "Designed with clear separation between quoting, routing, and execution layers.",
    ],
    tech: ["Rust", "DEX SDKs", "Async IO", "Routing Logic", "REST / gRPC"],
    codeExampleTitle: "Route selection & execution",
    codeExample: `function find_best_route(order, dex_list):
    quotes = []
    for dex in dex_list:
        quote = dex.get_quote(order)
        if quote is not None:
            quotes.append(quote)
    return compute_optimal_path(quotes, order)

function execute_route(route, dex_list):
    current_token = route.start_token

    for hop in route.hops:
        dex = dex_list[hop.dex_name]
        tx = dex.build_swap(
            token_in  = current_token,
            token_out = hop.target_token,
            amount    = hop.amount
        )

        signed = sign(tx)
        result = submit(signed)
        log_execution(hop, result)

        if result.failed:
            rollback_or_exit()
            break

        current_token = hop.target_token`,
  },
  {
    id: "dps-meter",
    title: "Real-Time DPS Meter & Game Analytics Engine",
    subtitle: "Streaming combat events into live analytics",
    role: "Rust/Python Backend Engineer",
    summary:
      "A Rust-based analytics tool that ingests combat events from game APIs or log streams, computes real-time DPS and related metrics, and exposes results via an API or live UI.",
    bullets: [
      "Ingests combat events from APIs or log feeds and normalizes them into internal models.",
      "Computes DPS, uptime, and burst windows in real time using sliding windows.",
      "Streams updated analytics to external clients or dashboards.",
      "Stores historical data for performance comparisons and trend analysis.",
    ],
    tech: ["Rust", "Async IO", "REST / gRPC", "Streaming Analytics"],
    codeExampleTitle: "Event ingestion & DPS computation",
    codeExample: `function run_dps_engine(config):
    stream = connect_game_api(config.source)

    for raw_event in stream:
        event = parse_combat_event(raw_event)
        update_state(event)
        metrics = compute_current_metrics()
        publish(metrics)`,
  },
];

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <FitForRole />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const Header: React.FC = () => (
  <header className="header">
    <div className="header-inner">
      <div className="logo">Shaun Teoh</div>
      <nav className="nav">
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#fit">Focus</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>
);

const Hero: React.FC = () => (
  <section id="hero" className="section hero">
    <div className="section-inner hero-inner">
      <div>
        <p className="hero-kicker">Backend Engineer · Rust / Python / Javascript· Real-Time Systems</p>
        <h1 className="hero-title">Real-time, low-latency backend systems and API integrations.</h1>
        <p className="hero-subtitle">
          Backend engineer focused on streaming pipelines, gRPC/REST APIs, and distributed systems. Recent work
          includes real-time validator stream listeners, multi-DEX routing engines, and live analytics tools.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn primary">
            View Projects
          </a>
          <a href="#contact" className="btn ghost">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  </section>
);

const About: React.FC = () => (
  <section id="about" className="section">
    <div className="section-inner">
      <h2>About Me</h2>
      <p>
        I&apos;m a backend engineer specialising in Rust and Python services that consume, process, and expose
        real-time data. I&apos;ve built systems that listen directly to high-volume validator streams, normalize events
        across platforms, react within tight latency windows, and persist full histories for analysis.
      </p>
      <p>
        My focus is on clear architectures, strong observability, and robust integrations with external APIs and SDKs.
        I enjoy working on challenging backends where performance, reliability, and clean design all matter.
      </p>
    </div>
  </section>
);

const Skills: React.FC = () => (
  <section id="skills" className="section bg-muted">
    <div className="section-inner">
      <h2>Skills & Technologies</h2>
      <div className="skills-grid">
        <SkillGroup
          title="Languages"
          items={["Rust", "Python", "TypeScript / JavaScript", "React", "C#","GO"]}
        />
        <SkillGroup
          title="Backend & APIs"
          items={["REST / gRPC / Shredstream API design", "WebSockets & streaming", "Authentication, pagination, rate limiting"]}
        />
        <SkillGroup
          title="Data & Infrastructure"
          items={[
            "PostgreSQL, Redis, MySQL",
            "Streaming/event-driven architectures",
            "Docker, basic CI/CD workflows",
            "Decoding Shredstream packets"
          ]}
        />
        <SkillGroup
          title="Practices"
          items={["Observability (logs, metrics)", "Integration & property-based tests", "Config-driven architectures"]}
        />
      </div>
    </div>
  </section>
);

type SkillGroupProps = {
  title: string;
  items: string[];
};

const SkillGroup: React.FC<SkillGroupProps> = ({ title, items }) => (
  <div className="skill-group">
    <h3>{title}</h3>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const Projects: React.FC = () => (
  <section id="projects" className="section">
    <div className="section-inner">
      <h2>Featured Projects</h2>
      <p className="section-subtitle">
        Selected projects highlighting real-time pipelines, low-latency execution, and complex API integrations.
      </p>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <article className="project-card" id={project.id}>
    <div className="project-header">
      <h3>{project.title}</h3>
      {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
      {project.role && <p className="project-role">{project.role}</p>}
    </div>
    <p className="project-summary">{project.summary}</p>
    <ul className="project-bullets">
      {project.bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
    <div className="project-meta">
      <div className="pill-row">
        {project.tech.map((t) => (
          <span className="pill" key={t}>
            {t}
          </span>
        ))}
      </div>
    </div>
    {project.codeExample && (
      <div className="project-code">
        {project.codeExampleTitle && <p className="code-title">{project.codeExampleTitle}</p>}
        <pre>
          <code>{project.codeExample}</code>
        </pre>
      </div>
    )}
  </article>
);

const FitForRole: React.FC = () => (
  <section id="fit" className="section bg-muted">
    <div className="section-inner">
      <h2>What I Focus On</h2>
      <ul className="fit-list">
        <li>
          <strong>Real-time & low-latency focus:</strong> Building reliable, low-latency backend systems that handle real-time data safely.
        </li>
        <li>
          <strong>API & SDK integrations:</strong> Comfortable integrating multiple third-party APIs/SDKs and designing
          clean abstraction layers around them for long-term maintainability
        </li>
        <li>
          <strong>Production-minded design:</strong> Delivering production-ready services with proper error handling and logging.
        </li>
        <li>
          <strong>Clean Architecture, Strong Observability:</strong> Designing clear, maintainable architectures with strong observability and testing.
        </li>
        <li>
          <strong>Versatility:</strong> • Versatility across backend domains—including streaming systems, execution engines, and analytics tooling.
        </li>
      </ul>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section id="contact" className="section">
    <div className="section-inner">
      <h2>Contact</h2>
      <p>
        Feel free to get in touch about backend or real-time systems. 
        I can walk through the architecture of my past systems and share selected code examples relevant to the role.
      </p>
      <ul className="contact-list">
        <li>
          Email: <a href="mailto:you@example.com">shaunteoh1995@gmail.com</a>
        </li>
        <li>
          GitHub: <a href="https://github.com/your-github" target="_blank" rel="noreferrer">github.com/SowpT0</a>
        </li>
        <li>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer">
            linkedin.com/in/shaun-teoh-725686157
          </a>
        </li>
        {/* Add resume/portfolio links as needed */}
      </ul>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-inner">
      <span>© {new Date().getFullYear()} Shaun Teoh. All rights reserved.</span>
    </div>
  </footer>
);

export default App;
