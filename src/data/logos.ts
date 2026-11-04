import type { Logo } from "./types";
import renocred from "@/assets/logos/renocred.webp";
import cnhCapital from "@/assets/logos/cnh-capital.webp";
import sih from "@/assets/logos/sih.webp";
import bennett from "@/assets/logos/bennett.webp";
import acm from "@/assets/logos/acm.svg";

/**
 * Organisation marks, sourced from each organisation's own website
 * (ACM's from Wikimedia Commons). Used only to identify where the work happened.
 */
export const logos = {
  renocred: { src: renocred, alt: "RenoCred logo", width: 160, height: 160, fit: "cover" },
  cnh: { src: cnhCapital, alt: "CNH Capital logo", width: 480, height: 150, fit: "contain", wide: true },
  sih: { src: sih, alt: "Smart India Hackathon logo", width: 57, height: 58, fit: "contain" },
  bennett: { src: bennett, alt: "Bennett University logo", width: 160, height: 160, fit: "contain" },
  acm: { src: acm, alt: "ACM logo", width: 160, height: 160, fit: "contain" },
} satisfies Record<string, Logo>;
