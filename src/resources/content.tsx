import type { About, Badges, Blog, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Bayu",
  lastName: "Saputra",
  name: "Bayu Saputra",
  role: "IT Infrastructure Engineer",
  avatar: "/images/avatar-20260215.jpg",
  email: "bayusaputra.005.003@gmail.com",
  location: "Bekasi, West Java",
  timeZone: "Asia/Jakarta",
  languages: ["Indonesian", "English"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Connect with {person.firstName}</>,
  description: <>Let's discuss infrastructure, security, and the future of IoT.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/bayu5aputra",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/bayusaputra05",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name} | IT Infrastructure Engineer Portfolio`,
  description: "IT Infrastructure Engineer portfolio focused on network reliability, observability, and IoT operations in Indonesia.",
  headline: (
    <>
      Resilient Networks & <br /> Practical IoT Systems
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured Work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Multi-site Network Operations
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I design and operate dependable infrastructure across{" "}
      <Text as="span" size="xl" weight="strong">
        network reliability, observability, and IoT deployment
      </Text>
      . <br /> From incident response to preventive maintenance, I build systems that stay useful in
      real conditions.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `${person.name} is an IT Infrastructure Engineer based in ${person.location}, specializing in multi-site network operations, hybrid monitoring, and IoT reliability.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "mailto:bayusaputra.005.003@gmail.com",
  },
  intro: {
    display: true,
    title: "About & Case Study Method",
    description: (
      <>
        I'm an IT Infrastructure Engineer at Sinar Mas Land, focused on multi-site network
        operations, hybrid monitoring (ICCC, ITMS, The Dude), and improving IoT reliability for
        environmental sensors and CCTV systems. I handle SLA-based incidents (P1-P4), troubleshoot
        fiber backbone connectivity, and translate technical findings into clear actions that
        improve uptime.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Sinar Mas Land",
        timeframe: "Nov 2025 - Present",
        role: "IT Infrastructure Engineer",
        achievements: [
          "Orchestrate multi-site network operations with hybrid monitoring, ICCC and ITMS for high-level visibility, and The Dude for granular device health.",
          "Resolve Layer 1 and Layer 2 issues across fiber backbone and access segments, including blind-spot devices such as Unit Master Controllers and VoIP endpoints.",
          "Manage field IoT ecosystem reliability for flood sensors, soil movement sensors, rain meters, and CCTV network components.",
          "Lead preventive maintenance and root cause analysis to detect abnormalities early, including NVR storage constraints and recurrent offline devices.",
          "Direct SLA-based incident handling from Critical P1 to Low P4, and apply Stop the Clock controls for external dependencies to keep uptime accounting fair and auditable.",
          "Prepare technical reporting for management on inventory status, service performance, and vendor compliance risks.",
          "Supported engineering recruitment process from junior to lead-level candidates to strengthen team delivery capacity.",
        ],
        images: [],
      },
      {
        company: "Sinar Mas Land",
        timeframe: "Sep 2025 - Nov 2025",
        role: "IT Infrastructure Internship",
        achievements: [
          "Diagnosed ATCS (Area Traffic Control System) malfunctions and performed repair and maintenance for hardware and system components.",
          "Handled ATCS-related support tickets and coordinated repair progress with field operations.",
          "Maintained field IoT devices, including flood sensors, soil sensors, and rain meters.",
          "Developed and implemented ATCS monitoring with Grafana and Docker to improve detection speed and operational visibility.",
          "Completed foundational training for ATCS and IoT device management workflows.",
        ],
        images: [],
      },
      {
        company: "Damai Putra Group",
        timeframe: "Dec 2024 - Jun 2025",
        role: "IT Support Internship",
        achievements: [
          "Identified, analyzed, and resolved technical issues across hardware, software, and enterprise network systems.",
          "Configured and maintained LAN/WAN, VPN, and firewall controls to sustain network stability and security.",
          "Supported Windows and Linux servers, Active Directory administration, and backup operations.",
          "Delivered user support and basic technical training to minimize downtime and increase service quality.",
          "Contributed to IT security implementation, threat analysis, asset management, and technical documentation.",
        ],
        images: [],
      },
      {
        company: "BAZNAS",
        timeframe: "Nov 2024 - Dec 2024",
        role: "Web Development Internship",
        achievements: [
          "Built a Zakat, Infak, and Sedekah monitoring dashboard in Looker Studio for collection visibility and reporting.",
          "Developed a web-based email broadcast system to support donor and beneficiary communications.",
          "Contributed to digital communication strategy and helped improve internal network reliability for daily operations.",
        ],
        images: [],
      },
      {
        company: "Kominfo",
        timeframe: "Oct 2024 - Nov 2024",
        role: "Network Technician Internship",
        achievements: [
          "Maintained internet connectivity by diagnosing and resolving network performance issues across operational units.",
          "Installed LAN cabling from switches to user workstations to improve distribution stability.",
          "Configured network security controls, including firewall policy, DHCP snooping, and rogue DHCP mitigation.",
          "Monitored throughput and resolved speed degradation to sustain service quality.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Bani Saleh University",
        description: (
          <>
            Bachelor of Computer Science, GPA 3.76/4.00
            <br />
            Sep 2021 - Aug 2025
            <br />
            Relevant courses: Network Administration, Computer Architecture, Operating Systems,
            Computer Networks, Web Programming, and Android Programming.
          </>
        ),
      },
    ],
  },
  organization: {
    display: true,
    title: "Organization Experience",
    experiences: [
      {
        organization: "Himpunan Mahasiswa Teknik Informatika (HMTI)",
        timeframe: "Feb 2024 - Feb 2025",
        role: "Leader of HMTI",
        achievements: [
          "Led and coordinated 57 members in executing annual programs from planning through evaluation.",
          "Monitored team performance, aligned responsibilities across divisions, and ensured delivery against targets.",
          "Built communication channels with Informatics Engineering students to capture operational needs and feedback.",
          "Established collaboration with other student organizations for cross-committee program execution.",
        ],
      },
      {
        organization: "Himpunan Mahasiswa Teknik Informatika (HMTI)",
        timeframe: "Nov 2022 - Jan 2024",
        role: "Member of Publications, Documentation, and Decoration",
        achievements: [
          "Edited and curated event documentation assets, photo, video, and design content, to maintain publication quality and visual consistency.",
          "Designed promotional materials including posters, banners, brochures, and digital campaign assets.",
          "Supported MAESTRO 2023 committee execution for the Faculty of Information and Digital Technology.",
        ],
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Networking & Infrastructure",
        description: (
          <>
            Router and switch configuration, fiber troubleshooting, and resilient LAN/WAN operations
            for multi-site environments.
          </>
        ),
        tags: [
          { name: "Cisco", icon: "globe" },
          { name: "MikroTik", icon: "globe" },
          { name: "Fortinet", icon: "globe" },
          { name: "Sophos", icon: "globe" },
          { name: "Fiber Optics", icon: "grid" },
          { name: "VoIP", icon: "grid" },
          { name: "ATCS", icon: "grid" },
          { name: "LAN/WAN", icon: "grid" },
          { name: "Firewall", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Systems, Monitoring & IoT",
        description: (
          <>
            Hybrid monitoring operations, reliability engineering, and field IoT device management
            across critical service areas.
          </>
        ),
        tags: [
          { name: "Linux", icon: "linux" },
          { name: "Ubuntu", icon: "linux" },
          { name: "Debian", icon: "linux" },
          { name: "Windows Server", icon: "globe" },
          { name: "IoT", icon: "grid" },
          { name: "Grafana", icon: "grid" },
          { name: "Uptime Kuma", icon: "grid" },
          { name: "Docker", icon: "grid" },
          { name: "Apache", icon: "grid" },
          { name: "Nginx", icon: "grid" },
          { name: "ICCC / ITMS / The Dude", icon: "grid" },
          { name: "ESP32", icon: "grid" },
          { name: "MQTT", icon: "grid" },
          { name: "Arduino", icon: "grid" },
          { name: "Incident SLA P1-P4", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Programming & Automation",
        description: (
          <>
            Application development and scripting for automation, integration, and infrastructure
            support tooling.
          </>
        ),
        tags: [
          { name: "Flutter", icon: "javascript" },
          { name: "Dart", icon: "javascript" },
          { name: "Java", icon: "javascript" },
          { name: "Python", icon: "javascript" },
          { name: "JavaScript", icon: "javascript" },
          { name: "React", icon: "javascript" },
          { name: "HTML", icon: "javascript" },
          { name: "CSS", icon: "javascript" },
          { name: "Tailwind CSS", icon: "javascript" },
          { name: "Bootstrap", icon: "javascript" },
          { name: "jQuery", icon: "javascript" },
          { name: "PHP", icon: "javascript" },
          { name: "Laravel", icon: "javascript" },
          { name: "CodeIgniter", icon: "javascript" },
          { name: "C++", icon: "javascript" },
        ],
        images: [],
      },
      {
        title: "Database & Platform Tools",
        description: (
          <>
            Practical database and platform tooling for app backends, reporting, and operational
            support workflows.
          </>
        ),
        tags: [
          { name: "MariaDB", icon: "grid" },
          { name: "MySQL", icon: "grid" },
          { name: "Oracle Database", icon: "grid" },
          { name: "Microsoft SQL Server", icon: "grid" },
          { name: "SQLite", icon: "grid" },
          { name: "Firebase", icon: "grid" },
          { name: "Looker Studio", icon: "grid" },
          { name: "npm", icon: "grid" },
          { name: "Git", icon: "grid" },
          { name: "GitHub", icon: "github" },
          { name: "Figma", icon: "grid" },
          { name: "Canva", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Professional Skills",
        description: (
          <>
            Strong execution under pressure with clear communication, ownership, and cross-team
            collaboration.
          </>
        ),
        tags: [
          { name: "Problem Solving", icon: "person" },
          { name: "Logical Thinking", icon: "person" },
          { name: "Adaptability", icon: "person" },
          { name: "Teamwork", icon: "person" },
          { name: "Time Management", icon: "person" },
          { name: "Technical Documentation", icon: "person" },
          { name: "Root Cause Analysis", icon: "person" },
          { name: "Leadership", icon: "person" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Engineering Logs | Network, IoT, and Infrastructure",
  description: "Technical notes on network operations, infrastructure reliability, troubleshooting, and IoT systems.",
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects - ${person.name}`,
  description: `Network infrastructure, IoT, and software projects by ${person.name}.`,
};

const badges: Badges = {
  path: "/badges",
  label: "Badges",
  title: `Certifications - ${person.name}`,
  description: "IT certifications in networking, infrastructure, DevOps, and software development.",
  items: [
    {
      src: "/images/issuers/mikrotik.svg",
      alt: "MikroTik Certified Network Associate",
      title: "MikroTik Certified Network Associate (MTCNA)",
      issuer: "MikroTik",
      issued: "Feb 2025",
      expires: "Feb 2028",
      skills: ["Network Architecture", "Network Engineering", "+6 skills"],
      link: "https://mikrotik.com/training/about",
      invertInDark: true,
    },
    {
      src: "https://www.gstatic.com/marketing-cms/assets/images/c5/3a/200414104c669203c62270f7884f/google-wordmarks-2x.webp=n-w300-h96-fcrop64=1,00000000ffffffff-rw",
      alt: "Google Play Store Listing Certificate",
      title: "Google Play Store Listing Certificate",
      issuer: "United Latino Students Association",
      issued: "Sep 2024",
      expires: "Sep 2027",
      credentialId: "116543787",
    },
    {
      src: "https://assets.cdn.dicoding.com/original/commons/certificate_logo.png",
      alt: "DevOps Fundamentals",
      title: "DevOps Fundamentals",
      issuer: "Dicoding Indonesia",
      issued: "Sep 2024",
      expires: "Sep 2027",
      credentialId: "2VX34N7NVZYQ",
      skills: ["Network Architecture"],
      link: "https://www.dicoding.com/certificates",
    },
    {
      src: "https://bnsp.go.id/assets/landing-page/img/logo.png",
      alt: "Network and Infrastructure certificate",
      title: "Network and Infrastructure",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      issued: "Jul 2024",
      expires: "Jul 2027",
      skills: ["Network Architecture", "Network Engineering", "+1 skill"],
      invertInDark: true,
    },
    {
      src: "https://digitalent.komdigi.go.id/assets/img/dts-mono.png",
      alt: "Junior Network Administrator certificate",
      title: "Junior Network Administrator (Vocational School Graduate Academy)",
      issuer: "Digital Talent Scholarship",
      issued: "Feb 2024",
      credentialId: "19374231150-32",
      skills: ["Network Architecture", "Network Administration", "+4 skills"],
      link: "https://digitalent.komdigi.go.id/",
      invertInDark: true,
    },
    {
      src: "https://digitalent.komdigi.go.id/assets/img/dts-mono.png",
      alt: "Junior Web Developer certificate",
      title: "Junior Web Developer (Vocational School Graduate Academy)",
      issuer: "Digital Talent Scholarship",
      issued: "Jun 2023",
      credentialId: "1936551860-25",
      skills: ["Application Development", "HTML", "+5 skills"],
      link: "https://digitalent.komdigi.go.id/",
      invertInDark: true,
    },
    {
      src: "/images/issuers/oracle.svg",
      alt: "Java Programming certificate",
      title: "Java Programming",
      issuer: "Oracle",
      issued: "Aug 2023",
      skills: ["Java", "Application Development", "+1 skill"],
    },
    {
      src: "https://images.credly.com/size/680x680/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png",
      alt: "CCNA Switching, Routing, and Wireless Essentials",
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco",
      issued: "Sep 2023",
      skills: ["Cisco Routers", "Network Architecture", "+4 skills"],
      link: "https://www.credly.com/badges/544ffdda-b55a-442d-9780-2f515900f695/public_url",
    },
    {
      src: "https://images.credly.com/size/680x680/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png",
      alt: "CCNA Introduction to Networks",
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      issued: "Sep 2023",
      skills: ["Cisco Routers", "Network Administration", "+1 skill"],
      link: "https://www.credly.com/badges/2c1220c3-1c21-43b8-9f26-a07cafdbaaae/public_url",
    },
    {
      src: "/images/issuers/oracle.svg",
      alt: "Java Fundamental certificate",
      title: "Java Fundamental",
      issuer: "Oracle",
      issued: "Feb 2023",
      skills: ["Java", "Object-Oriented Programming (OOP)"],
    },
    {
      src: "https://images.credly.com/size/680x680/images/04e8034c-81f5-4f7f-ab23-e8b428c31ce9/ITE.png",
      alt: "IT Essentials certificate",
      title: "IT Essentials",
      issuer: "Cisco",
      issued: "Sep 2022",
      skills: ["Troubleshooting"],
      link: "https://www.credly.com/badges/82867bb1-1404-4b1a-ad0c-54b6a2289257/public_url",
    },
  ],
};
export { person, social, newsletter, home, about, blog, work, badges };



