import type { Achievement, Provenance } from "./types";
import ebcFinalist from "@/assets/ebc-grand-demo-day-finalist.webp";
import sihCertificate from "@/assets/bu-sih-26-rank-14-certificate.webp";

export const achievements: Achievement[] = [
  {
    id: "bootcamp",
    figure: "Finalist",
    title: "Grand Demo Day",
    context: "Entrepreneurship Boot-Camp 2.0 · Bennett University",
    note: "Grand Demo Day finalist as Founder of RenoCred — see the official poster. Selected in the top 15 of 200 teams (count as reported).",
    provenance: "documented",
    project: "renocred",
    tone: "ink",
    evidence: {
      src: ebcFinalist,
      alt: "Official Entrepreneurship Boot-Camp 2.0 poster from Bennett University: 'Grand Demo Day Finalist — Aditya Sinha, Founder, Renocred'. Organised by CIE, supported by Hatchery Bennett University and the Entrepreneurship Cell.",
      width: 591,
      height: 1004,
      kind: "poster",
      caption: "Official finalist poster · Entrepreneurship Boot-Camp 2.0, Bennett University (organised by CIE; supported by Hatchery and E-Cell).",
    },
  },
  {
    id: "sih",
    figure: "14",
    figureSub: "th",
    title: "Smart India Hackathon 2026",
    context: "Bennett University internal round (BU SIH-26) · NEXGram · Team Leader",
    note: "Rank 14, selected among the top 100 teams — see the certificate. 600+ participating teams, as reported.",
    provenance: "documented",
    project: "nexgram",
    tone: "lime",
    evidence: {
      src: sihCertificate,
      alt: "Certificate of Appreciation: Aditya Sinha has been selected among the Top 100 Teams, securing Rank 14, in BU SIH-26 (Smart India Internal Hackathon), conducted by the AI Student Executive Senate, School of AI, Bennett University, 11–13 September 2026. Signed by Dr. Gaurav Sharma, SIH SPOC, and Dr. Rajeev Tiwari, Dean SOAI.",
      width: 1600,
      height: 1131,
      kind: "certificate",
      caption: "Certificate of Appreciation · BU SIH-26 (Smart India Internal Hackathon), School of AI, Bennett University, 11–13 Sep 2026.",
    },
  },
  {
    id: "founder",
    figure: "Founder",
    title: "RenoCred",
    context: "Independent fintech product",
    note: "Built and led an independent fintech product initiative — live at renocred.com.",
    provenance: "observed",
    project: "renocred",
    tone: "paper",
  },
  {
    id: "dataset",
    figure: "536+",
    title: "Card records",
    context: "RenoCred master card dataset",
    note: "Reported dataset count — not an independently audited production metric.",
    provenance: "reported",
    project: "renocred",
    tone: "paper",
  },
  {
    id: "local-ai",
    figure: "OK",
    title: "Local tool-calling round trip",
    context: "Qwen × DeepSeek Harness on Apple Silicon",
    note: "Validated a local Qwen + DeepSeek Harness tool-calling round trip.",
    provenance: "reported",
    project: "local-llm",
    tone: "ink",
  },
];

export const provenanceLabel: Record<Provenance, string> = {
  measured: "Measured",
  repo: "Per repository",
  reported: "Reported",
  observed: "Verifiable",
  documented: "Documented",
  pending: "Pending",
};
