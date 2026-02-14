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
  languages: ["Bahasa Indonesia", "English"],
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
  image: "/images/og/home.jpg",
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
  description: `${person.name} is an IT Infrastructure Engineer based in ${person.location}, specializing in network and IoT operations.`,
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
    title: "Introduction",
    description: (
      <>
        I am an Informatics Engineering graduate from Bani Saleh University (GPA 3.76/4.00),
        currently working in IT infrastructure operations. My daily focus is maintaining stable
        connectivity, monitoring critical services, and keeping field devices operational.
        <br />
        <br />I work comfortably from Layer 1 and Layer 2 troubleshooting up to service monitoring
        and incident coordination. I value clear communication, practical documentation, and
        solutions that are reliable over time, not just quick fixes.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Sinar Mas Land",
        timeframe: "Nov 2025 – Present",
        role: "IT Infrastructure Engineer",
        achievements: [
          "Operate multi-site network infrastructure with ICCC, ITMS, and The Dude for daily service visibility.",
          "Handle Layer 1 and Layer 2 troubleshooting on fiber and access network segments.",
          "Maintain IoT endpoints including environmental sensors and CCTV across operational areas.",
          "Perform preventive maintenance and root cause analysis for P1-P4 incidents within SLA targets.",
        ],
        images: [],
      },
      {
        company: "Sinar Mas Land",
        timeframe: "Sep 2025 – Nov 2025",
        role: "IT Infrastructure Internship",
        achievements: [
          "Diagnosed and maintained ATCS devices and supporting IoT sensors in field operations.",
          "Built a monitoring dashboard stack using Grafana and Docker for clearer operational tracking.",
        ],
        images: [],
      },
      {
        company: "Damai Putra Group",
        timeframe: "Dec 2024 – Jun 2025",
        role: "IT Support Internship",
        achievements: [
          "Supported hardware, software, and connectivity troubleshooting across office operations.",
          "Assisted LAN/WAN, VPN, firewall, server administration, and Active Directory maintenance.",
        ],
        images: [],
      },
      {
        company: "BAZNAS",
        timeframe: "Nov 2024 – Dec 2024",
        role: "Web Development Internship",
        achievements: [
          "Developed a Zakat reporting dashboard with Looker Studio and supported a web-based email broadcast system.",
        ],
        images: [],
      },
      {
        company: "Kominfo",
        timeframe: "Oct 2024 – Nov 2024",
        role: "Network Technician Internship",
        achievements: [
          "Maintained internet connectivity and assisted LAN cabling deployment.",
          "Configured basic network security controls including DHCP snooping and rogue DHCP mitigation.",
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
            Sep 2021 – Aug 2025
            <br />
            Relevant courses: Network Administration, Computer Architecture, Operating Systems, Web
            and Android Development.
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
          "Led and coordinated 57 members to execute organization programs from planning to evaluation.",
          "Monitored team performance, aligned responsibilities, and ensured each division met its targets.",
          "Built active communication channels with Informatics Engineering students to capture real needs.",
          "Established collaboration with other student organizations for cross-event execution.",
        ],
      },
      {
        organization: "Himpunan Mahasiswa Teknik Informatika (HMTI)",
        timeframe: "Nov 2022 - Jan 2024",
        role: "Member of Publications, Documentation, and Decoration",
        achievements: [
          "Produced and edited event documentation (photo, video, design assets) for publication quality.",
          "Designed promotional materials including posters, banners, and digital campaign assets.",
          "Supported MAESTRO 2023 execution for the Faculty of Information and Digital Technology with committee coordination.",
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
          <>Router and switch configuration, network troubleshooting, and LAN/WAN operations.</>
        ),
        tags: [
          { name: "Cisco", icon: "globe" },
          { name: "MikroTik", icon: "globe" }, // generic icon
          { name: "Fiber Optics", icon: "grid" },
          { name: "VoIP", icon: "grid" },
          { name: "ATCS", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Systems, Monitoring & IoT",
        description: (
          <>Hybrid monitoring operations, server administration, and field IoT device management.</>
        ),
        tags: [
          { name: "Linux", icon: "linux" },
          { name: "Windows Server", icon: "person" },
          { name: "IoT", icon: "grid" },
          { name: "Grafana", icon: "grid" },
          { name: "Docker", icon: "grid" },
          { name: "ICCC / ITMS / The Dude", icon: "grid" },
          { name: "Incident SLA P1-P4", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Programming & Automation",
        description: (
          <>
            Application development and scripting for automation, integration, and operational
            tooling.
          </>
        ),
        tags: [
          { name: "Flutter", icon: "person" },
          { name: "Java", icon: "person" },
          { name: "Python", icon: "person" },
          { name: "JavaScript", icon: "javascript" },
          { name: "HTML", icon: "person" },
          { name: "CSS", icon: "person" },
          { name: "PHP", icon: "person" },
          { name: "C++", icon: "person" },
        ],
        images: [],
      },
      {
        title: "Database & Platform Tools",
        description: (
          <>
            Hands-on database usage for app backends, reporting, and operational support workflows.
          </>
        ),
        tags: [
          { name: "MariaDB", icon: "grid" },
          { name: "Oracle Database", icon: "grid" },
          { name: "Microsoft SQL Server", icon: "grid" },
          { name: "Firebase", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Professional Skills",
        description: (
          <>
            Strong execution under pressure with clear communication, ownership, and team
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
      alt: "Belajar Dasar-Dasar DevOps",
      title: "Belajar Dasar-Dasar DevOps",
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
      skills: ["Network Architecture", "Pengelolaan Jaringan", "+4 skills"],
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
      skills: ["Pengembangan Aplikasi", "HTML", "+5 skills"],
      link: "https://digitalent.komdigi.go.id/",
      invertInDark: true,
    },
    {
      src: "/images/issuers/oracle.svg",
      alt: "Java Programming certificate",
      title: "Java Programming",
      issuer: "Oracle",
      issued: "Aug 2023",
      skills: ["Java", "Pengembangan Aplikasi", "+1 skill"],
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
      skills: ["Cisco Routers", "Pengelolaan Jaringan", "+1 skill"],
      link: "https://www.credly.com/badges/2c1220c3-1c21-43b8-9f26-a07cafdbaaae/public_url",
    },
    {
      src: "/images/issuers/oracle.svg",
      alt: "Java Fundamental certificate",
      title: "Java Fundamental",
      issuer: "Oracle",
      issued: "Feb 2023",
      skills: ["Java", "Pemrograman Berorientasi Objek (OOP)"],
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



