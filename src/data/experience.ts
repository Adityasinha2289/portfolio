import type { Certification, ExperienceEntry } from "./types";
import { logos } from "./logos";
import nptelCertificate from "@/assets/nptel-soft-skills-certificate.webp";

/** Dates come from Aditya's resume. Where none exists, none is shown. */
export const experience: ExperienceEntry[] = [
  {
    id: "renocred",
    logo: logos.renocred,
    role: "Founder & Full-Stack Product Engineer",
    org: "RenoCred",
    orgDetail: "renocred.com",
    period: "Ongoing",
    tag: "Founder",
    summary:
      "Founded and developed an AI-powered fintech intelligence platform focused on credit card discovery, rewards optimization and financial product intelligence.",
    points: [
      "Product conceptualization, strategy and business model development.",
      "Full-stack engineering and technical architecture.",
      "Financial data infrastructure and AI integrations.",
      "Authentication and database security — Clerk JWTs into Supabase RLS.",
      "Deployment, domains, partnerships and onboarding an intern dev team.",
    ],
    project: "renocred",
    recognition: {
      text: "Grand Demo Day finalist — Entrepreneurship Boot-Camp 2.0, Bennett University.",
      provenance: "documented",
    },
  },
  {
    id: "cnh",
    logo: logos.cnh,
    role: "Consultant — IT Latin America IT Ops & Financial Services",
    org: "CNH Ind Capital India Ltd",
    orgDetail: "Gurgaon",
    period: "Jul 2026 — Present",
    tag: "IT · FinServ",
    summary: "IT support for the Financial Services division.",
    points: [
      "System analysis for critical applications in the Financial Services IT function.",
      "Troubleshooting financial data workflows to keep data accurate and applications reliable.",
      "Processing enterprise datasets and writing technical documentation for optimisation projects.",
    ],
  },
  {
    id: "nexgram",
    logo: logos.sih,
    role: "Team Leader & Software Developer",
    org: "NEXGram",
    orgDetail: "Smart India Hackathon 2026 · Bennett internal round",
    period: "Sep 2026",
    tag: "Team lead",
    summary: "Led a hackathon team building explainable B2B retail–distributor intelligence.",
    points: [
      "Led project execution and coordinated product development.",
      "Worked on backend architecture and developed APIs.",
      "Designed procurement workflows with PostgreSQL and SQLAlchemy.",
    ],
    project: "nexgram",
    recognition: {
      text: "Rank 14 at BU SIH-26, Bennett University's internal Smart India Hackathon — top 100 teams (certificate).",
      provenance: "documented",
    },
  },
  {
    id: "acm",
    logo: logos.acm,
    role: "Management Head",
    org: "ACM Student Chapter",
    orgDetail: "Bennett University",
    period: "Oct 2025 — Jun 2026",
    tag: "Leadership",
    summary: "Led the 8-member core team behind the flagship hackathons Infuturum 4.0 and DDC 2.0.",
    points: [
      "Owned budgeting, resource planning and execution for events with 200+ participants.",
      "Introduced KPI dashboards to track and improve event performance.",
    ],
  },
  {
    id: "devops",
    logo: logos.bennett,
    role: "Management Core",
    org: "DevOps Club",
    orgDetail: "Bennett University",
    period: "Oct 2024 — Jul 2025",
    tag: "Operations",
    summary: "Planned and ran logistics for technical bootcamps and student workshops.",
    points: [
      "Coordinated cross-functional teams on event requirements.",
      "Tracked participation and reported performance from structured data.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Developing Soft Skills and Personality",
    issuer: "NPTEL · IIT Kanpur",
    detail: "Elite · 81% · Aug–Oct 2026 (8 weeks)",
    evidence: {
      src: nptelCertificate,
      alt: "NPTEL Online Certification (Elite), IIT Kanpur: awarded to Aditya Sinha for successfully completing Developing Soft Skills and Personality with a consolidated score of 81% (online assignments 24.04/25, proctored exam 56.25/75), Aug–Oct 2026, 8-week course.",
      width: 1600,
      height: 1132,
      kind: "certificate",
      caption: "NPTEL Online Certification (Elite) · Developing Soft Skills and Personality · IIT Kanpur · Aug–Oct 2026.",
    },
  },
  { name: "Data Analytics Simulation", issuer: "Deloitte (Forage)" },
  { name: "Text Mining & Analytics", issuer: "UIUC" },
  { name: "Design Thinking", issuer: "University of Virginia" },
  { name: "Computer Networking", issuer: "Google" },
];
