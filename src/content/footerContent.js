import { Github, Linkedin, Twitter } from "lucide-react";

export const footerContent = {
  brand: {
    name: "SA Softech India",
    description:
      "Custom software and ERP solutions for CFS, ICD, transport, and execution-heavy business operations. Nem Naryan Rai Market, Krishna Vihar Colony, Beur, Patna.",
  },
  socialLinks: [
    { icon: Twitter, label: "Website", href: "#" },
    { icon: Github, label: "Product", href: "#" },
    { icon: Linkedin, label: "Contact", href: "#" },
  ],
  linkGroups: [
    { title: "Products", links: ["Tracker", "Wheeler", "Infinity", "Integrations", "Pricing"] },
    { title: "Company", links: ["About Us", "Industries", "Clients", "Blog", "Contact"] },
    { title: "Legal", links: ["Privacy Policy", "Terms and Conditions", "Data Policy", "SLA"] },
  ],
  newsletter: {
    title: "Stay Updated",
    description: "Get product news, rollout tips, and operational best practices.",
    placeholder: "Enter your email",
    buttonLabel: "Join",
  },
  bottomBar: {
    copyright: "(c) 2026 SA Softech India. All rights reserved.",
    note: "Address: Nem Naryan Rai Market, Krishna Vihar Colony, Beur, Patna.",
  },
};
