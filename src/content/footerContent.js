import { Github, Linkedin, Twitter } from "lucide-react";

export const footerContent = {
  brand: {
    name: "SA Softech India",
    description:
      "SA Softech India provides user-friendly business software with easy integration, secure cloud backup, and smart automation. Nem Naryan Rai Market, Krishna Vihar Colony, Beur, Patna.",
  },
  socialLinks: [
    { icon: Twitter, label: "Website", href: "#" },
    { icon: Github, label: "Product", href: "#" },
    { icon: Linkedin, label: "Contact", href: "#" },
  ],
  linkGroups: [
    { title: "Products", links: ["Tracker", "Wheeler", "Infinity", "Integrations", "Pricing"] },
    { title: "Company", links: ["About Us", "Solutions", "Customers", "Blog", "Contact"] },
    { title: "Legal", links: ["Privacy Policy", "Terms and Conditions", "Data Policy", "SLA"] },
  ],
  newsletter: {
    title: "Stay Updated",
    description: "Get software updates, workflow tips, and product announcements.",
    placeholder: "Enter your email",
    buttonLabel: "Join",
  },
  bottomBar: {
    copyright: "(c) 2026 SA Softech India. All rights reserved.",
    note: "Address: Nem Naryan Rai Market, Krishna Vihar Colony, Beur, Patna.",
  },
};
