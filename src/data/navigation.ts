export interface NavItem {
  label: string;
  /** Section id on the home page */
  id: string;
}

export const navItems: NavItem[] = [
  { label: "Work", id: "work" },
  { label: "Engineering", id: "engineering" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export const marqueeRows: string[][] = [
  ["Build", "Experiment", "Engineer", "Repeat"],
  ["Full-Stack", "Artificial Intelligence", "Product Engineering"],
];
