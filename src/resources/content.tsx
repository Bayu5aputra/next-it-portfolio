import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Bayu",
  lastName: "Saputra",
  name: "Bayu Saputra",
  role: "IT Infrastructure Engineer",
  avatar: "/images/avatar.jpg",
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
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Resilient Infrastructure & <br /> Intelligent IoT Ecosystems</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Recent Work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Multi-site Network Ops
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm Bayu, an IT Infrastructure Engineer specialized in <Text as="span" size="xl" weight="strong">High Availability Networks</Text>, <br /> Hybrid Monitoring Systems, and IoT Integration.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
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
        Bayu is an Informatic Engineering graduate from Bani Saleh University with a GPA of 3.76/4.00
        and proven experience as an IT Infrastructure Engineer. He specializes in orchestrating multi-site
        network operations, implementing hybrid monitoring systems (ICCC, ITMS, The Dude), and managing
        complex IoT ecosystems including environmental sensors and CCTV networks.
        <br /><br />
        With expert troubleshooting skills in Layer 1/2 connectivity across fiber optic backbones, Bayu
        combines technical precision with leadership abilities, having managed large student organizations
        and led engineering recruitment processes.
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
          <>
            Orchestrated multi-site network operations using ICCC, ITMS, and The Dude, ensuring high availability.
          </>,
          <>
            Resolved complex Layer 1 & Layer 2 connectivity issues across fiber optic backbones.
          </>,
          <>
            Managed extensive IoT ecosystem including flood sensors, soil sensors, and CCTV networks.
          </>,
          <>
            Conducted preventive maintenance and detailed Root Cause Analysis for P1-P4 incidents within SLA.
          </>,
        ],
        images: [],
      },
      {
        company: "Sinar Mas Land",
        timeframe: "Sep 2025 – Nov 2025",
        role: "IT Infrastructure Internship",
        achievements: [
          <>
            Diagnosed and maintained ATCS (Area Traffic Control System) devices and field IoT sensors.
          </>,
          <>
            Developed comprehensive monitoring dashboard using Grafana & Docker.
          </>,
        ],
        images: [],
      },
      {
        company: "Damai Putra Group",
        timeframe: "Dec 2024 – Jun 2025",
        role: "IT Support Internship",
        achievements: [
          <>
            Troubleshot hardware, software, and network connectivity; configured LAN/WAN, VPN, and firewalls.
          </>,
          <>
            Managed Windows/Linux servers and Active Directory; implemented IT security measures and ITIL framework.
          </>,
        ],
        images: [],
      },
      {
        company: "BAZNAS",
        timeframe: "Nov 2024 – Dec 2024",
        role: "Web Development Internship",
        achievements: [
          <>
            Developed Zakat dashboard utilizing Looker Studio and implemented a web-based email broadcast system.
          </>,
        ],
        images: [],
      },
      {
        company: "Kominfo",
        timeframe: "Oct 2024 – Nov 2024",
        role: "Network Technician Internship",
        achievements: [
          <>
            Maintained internet connectivity and installed LAN cabling infrastructure.
          </>,
          <>
            Configured firewall protocols, DHCP Snooping, and detected/mitigated DHCP Rogue devices.
          </>,
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
            Bachelor of Computer Science (GPA: 3.76/4.00)<br />
            Sep 2021 – Aug 2025<br />
            Relevant Courses: Network Admin, Computer Architecture, OS, Web/Android Programming.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Network & Infra",
        description: (
          <>Expertise in Fiber Optic Backbones, LAN/WAN, Router/Switch Config.</>
        ),
        tags: [
          { name: "Cisco", icon: "globe" },
          { name: "MikroTik", icon: "globe" }, // generic icon
          { name: "Fiber Optics", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Systems & IoT",
        description: (
          <>Server Administration (Windows/Linux) and IoT Ecosystem Management.</>
        ),
        tags: [
          { name: "Linux", icon: "linux" },
          { name: "Windows Server", icon: "person" },
          { name: "IoT", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Programming",
        description: (
          <>Development skills for automation and dashboards.</>
        ),
        tags: [
          { name: "Python", icon: "person" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Flutter", icon: "person" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Engineering Logs",
  description: `Technical notes and insights from ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Infrastructure and Development projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Moments – ${person.name}`,
  description: `A collection of milestones and memories`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
