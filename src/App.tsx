import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";

const profile = {
  name: "Brittney Leigh",
  title:
    "Systems software · Exploring OS and kernel development · App development · Developer tools",
  tagline:
    "I build software with a solid grasp of low-level foundations. I am passionate about integrating creativity and beauty into low-level tools and systems, making systems more efficient and effective, and developing mobile and web apps that add value to our lives.",
  email: "brittneyleighb@gmail.com",
  github: "https://github.com/brittneyleighb",
  threads: "https://www.threads.com/@brittneyleighba",
  substack: "https://cswithbritt.substack.com/",
  business: "https://www.bitfoundrylabs.io",
  resume: "/Brittney_Banning_Resume.pdf",
};

const spaceImages = {
  nebula:
    "https://images.unsplash.com/photo-1711560026656-814d5a9e980f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=86&w=2000",
};

const experience = [
  {
    period: "2026 — Present",
    role: "Independent Software Studio",
    company: "Bit Foundry Labs",
    href: "https://www.bitfoundrylabs.io",
    description:
      "Build and iterate on systems-adjacent developer tools, learning software, and cross-platform applications. Own implementation, testing, documentation, and product direction.",
    skills: ["Developer tools", "Cross-platform", "Testing", "Documentation"],
  },
  {
    period: "2026 — Present",
    role: "M.S. in Computer Science",
    company: "Georgia Southwestern State University",
    href: "https://www.gsw.edu",
    description:
      "Graduate study focused on operating systems, distributed computing, networking, information security, data structures, database design, and human-computer interaction.",
    skills: ["Operating systems", "Distributed systems", "Networking", "Security"],
  },
  {
    period: "2026",
    role: "Systems & Security Labs",
    company: "Linux, Networking & Application Security",
    href: "https://github.com/brittneyleighb",
    description:
      "Used Linux and Kali Linux for administration, process inspection, permissions, networking, logs, and troubleshooting. Analyzed application behavior with Wireshark, Burp Suite, ADB, emulators, and SQLite.",
    skills: ["Linux", "Wireshark", "Burp Suite", "ADB"],
  },
];

const projects = [
  {
    name: "Neural Trace",
    kicker: "Linux diagnostics",
    description:
      "An interactive Linux CLI that inspects processes, network activity, open ports, uptime, firewall state, and other OS signals, then organizes them into actionable diagnostics.",
    skills: ["Bash", "Linux", "jq", "Networking"],
    href: "https://github.com/brittneyleighb/neural-trace",
    variant: "violet",
    inProgress: false,
  },
  {
    name: "Mini Port Scanner",
    kicker: "Network utility",
    description:
      "A multithreaded TCP scanner built with Python sockets to identify open ports and likely services while exploring connection behavior beneath tools such as Nmap.",
    skills: ["Python", "TCP sockets", "Threading"],
    href: "https://github.com/brittneyleighb/mini-port-scanner",
    variant: "orange",
    inProgress: false,
  },
  {
    name: "Win Sentinel",
    kicker: "Windows diagnostics",
    description:
      "A read-only diagnostics tool for CPU-heavy processes, memory, disk, startup programs, listening ports, services, and recent Windows system errors.",
    skills: ["Bash", "PowerShell", "Windows systems"],
    href: "https://github.com/brittneyleighb/win-sentinel",
    variant: "pink",
    inProgress: false,
  },
  {
    name: "Simplified Raft Key-Value Store",
    kicker: "Distributed systems",
    description:
      "A three-node Java key-value store with leader election, randomized election timers, heartbeats, replicated logs, client PUT operations, and simulated network isolation.",
    skills: ["Java", "Raft", "Consensus", "Fault simulation"],
    href: "https://github.com/brittneyleighb/raft-project",
    variant: "violet",
    inProgress: false,
  },
  {
    name: "Mindful Moments",
    kicker: "App Development",
    description:
      "A mindfulness app with daily activities, optional reflections, journal history, local saving, and date navigation, supported by testable validation and state recovery.",
    skills: ["Flutter", "Dart", "Testing", "Local storage"],
    href: "#mindful-moments",
    variant: "orange",
    inProgress: true,
  },
];

type IconName =
  | "arrow"
  | "external"
  | "github"
  | "mail"
  | "substack"
  | "threads";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    external: (
      <>
        <path d="M15 4h5v5" />
        <path d="m10 14 10-10" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </>
    ),
    github: (
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.28-.36 6.72-1.61 6.72-7.25A5.67 5.67 0 0 0 19.22 3.3 5.3 5.3 0 0 0 19.07.2S17.89-.18 15 1.7a13.38 13.38 0 0 0-7 0C5.11-.18 3.93.2 3.93.2a5.3 5.3 0 0 0-.15 3.1 5.67 5.67 0 0 0-1.5 3.95c0 5.63 3.44 6.88 6.72 7.25A4.8 4.8 0 0 0 8 18v4M8 19c-3 .92-3-1.5-4-2" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    substack: (
      <>
        <path d="M4 5h16M4 9h16M6 13h12v8l-6-3.5L6 21v-8Z" />
      </>
    ),
    threads: (
      <>
        <path d="M12.2 21c-5.1 0-8.7-3.5-8.7-9S7 3 12.1 3c4.3 0 7.5 2.5 8.2 6.7" />
        <path d="M15.8 9.3c-.7-2-2-3-3.8-3-2.3 0-3.8 1.5-3.8 3.3 0 1.5 1 2.7 2.7 3 1.4.3 3.4.1 4.6-.5 1.4-.8 2.2-2.1 1.8-3.5" />
        <path d="M17.4 8.7c1.9 1.1 3.1 2.9 3.1 5.2 0 4.2-3 7.1-7.3 7.1-3.1 0-5.3-1.6-5.3-4 0-2.2 1.9-3.7 4.8-3.7 1.5 0 2.8.3 3.8.9" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [projectNotice, setProjectNotice] = useState("");

  useEffect(() => {
    const sections = ["about", "experience", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const trackPointer = (event: ReactMouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  return (
    <main className="portfolio" onMouseMove={trackPointer}>
      <div className="ambient-glow" />
      <div className="page-grid">
        <div className="cosmic-sparkles" aria-hidden="true">
          <i className="sparkle sparkle-two" />
          <i className="sparkle sparkle-three" />
          <i className="sparkle sparkle-four" />
        </div>
        <aside className="intro-panel">
          <div>
            <p className="overline">Hello, I’m</p>
            <h1>{profile.name}</h1>
            <h2>{profile.title}</h2>
            <p className="tagline">{profile.tagline}</p>

            <nav className="section-nav" aria-label="Page sections">
              {["about", "experience", "projects", "contact"].map((section, index) => (
                <a
                  className={activeSection === section ? "active" : ""}
                  href={`#${section}`}
                  key={section}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                  {section}
                </a>
              ))}
            </nav>
          </div>

          <div className="intro-footer">
            <div className="social-links">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icon name="github" size={20} />
              </a>
              <a href={profile.business} target="_blank" rel="noreferrer" aria-label="Bit Foundry Labs">
                <Icon name="external" size={20} />
              </a>
              <a href={profile.threads} target="_blank" rel="noreferrer" aria-label="Threads">
                <Icon name="threads" size={20} />
              </a>
              <a href={profile.substack} target="_blank" rel="noreferrer" aria-label="Substack">
                <Icon name="substack" size={20} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Icon name="mail" size={20} />
              </a>
            </div>
          </div>
        </aside>

        <div className="content-panel">
          <section className="content-section about" id="about">
            <p className="mobile-label">About</p>
            <p className="lead">
              I’m a computer science graduate student and software builder drawn
              to the layers where applications meet{" "}
              <strong>operating systems, networks, and distributed computing.</strong>
            </p>
            <p>
              I like understanding what happens beneath the interface: how
              processes coordinate, how data moves across a network, and how
              software behaves when systems fail. My work spans Linux utilities,
              network tooling, distributed systems, and cross-platform apps.
            </p>
            <p>
              At{" "}
              <a className="inline-link" href={profile.business} target="_blank" rel="noreferrer">
                Bit Foundry Labs <Icon name="external" size={14} />
              </a>
              , I build systems-adjacent developer tools and learning software,
              owning the work from implementation and testing through
              documentation and product direction.
            </p>
            <p>
              I’m currently pursuing an M.S. in Computer Science at Georgia
              Southwestern State University, with graduate work in operating
              systems, distributed computing, networking, and information
              security.
            </p>

            <div className="availability">
              <span />
              Open to systems software opportunities
            </div>
          </section>

          <section className="content-section" id="experience">
            <p className="mobile-label">Experience</p>
            <div className="experience-list">
              {experience.map((item) => (
                <a
                  className="experience-row"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={`${item.company}-${item.period}`}
                >
                  <p className="period">{item.period}</p>
                  <div>
                    <h3>
                      {item.role} · <span>{item.company}</span>
                      <Icon name="external" size={14} />
                    </h3>
                    <p>{item.description}</p>
                    <div className="chip-row">
                      {item.skills.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <a className="resume-link" href={profile.resume} target="_blank" rel="noreferrer">
              View full résumé <Icon name="arrow" />
            </a>
          </section>

          <section className="content-section" id="projects">
            <p className="mobile-label">Selected projects</p>
            <div className="project-list">
              {projects.map((project) => (
                <a
                  className="project-row"
                  href={project.href}
                  target={project.inProgress ? undefined : "_blank"}
                  rel={project.inProgress ? undefined : "noreferrer"}
                  onClick={(event) => {
                    if (project.inProgress) {
                      event.preventDefault();
                      setProjectNotice("Mindful Moments is currently in progress.");
                      window.setTimeout(() => setProjectNotice(""), 2400);
                    }
                  }}
                  key={project.name}
                >
                  <div className={`project-preview ${project.variant}`}>
                    <div className="browser-bar"><i /><i /><i /></div>
                    <div className="preview-layout">
                      <b />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div>
                    <p className="project-kicker">{project.kicker}</p>
                    <h3>
                      {project.name} <Icon name="external" size={14} />
                    </h3>
                    <p>{project.description}</p>
                    <div className="chip-row">
                      {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <a className="resume-link" href={profile.github} target="_blank" rel="noreferrer">
              View all projects on GitHub <Icon name="arrow" />
            </a>
          </section>

          <section className="content-section contact" id="contact">
            <div
              className="contact-nebula"
              style={{ backgroundImage: `url("${spaceImages.nebula}")` }}
              aria-hidden="true"
            />
            <p className="mobile-label">What’s next?</p>
            <span className="contact-number">04</span>
            <h2>Let’s make something meaningful.</h2>
            <p>
              I’m interested in systems software, Linux, distributed computing,
              developer tooling, and security-minded engineering. If you’re
              working in that space, I’d love to hear from you.
            </p>
            <a className="contact-button" href={`mailto:${profile.email}`}>
              Start a conversation <Icon name="arrow" />
            </a>
          </section>

          <footer>
            <p>
              Built with ☕️ and ❤️
            </p>
            <p>
              Space imagery by{" "}
              <a href="https://unsplash.com/@hubblespacetelescope" target="_blank" rel="noreferrer">
                NASA Hubble
              </a>
            </p>
            <p>© {new Date().getFullYear()} {profile.name}</p>
          </footer>
        </div>
      </div>
      <div
        className={projectNotice ? "project-notice visible" : "project-notice"}
        role="status"
        aria-live="polite"
      >
        <span />
        {projectNotice}
      </div>
    </main>
  );
}

export default App;
