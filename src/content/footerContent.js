import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export const footerContent = {
  brand: {
    name: "SA Softech India",
    description:
      `SA Softech India provides user-friendly business software with easy integration, secure cloud backup, and smart automation.`,
    subDescription:
      `Verma Karpura House, 504 - 5th Floor, SP Verma Road, Patna 800001 [Bihar].`,
  },

  socialLinks: [
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/sasoftechindia/" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/sasoftechindia/" },
    { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@SASoftechIndia" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ],

  linkGroups: [
    {
      title: "Products",
      links: [
        { label: "E-commerce", href: "https://gkakn.com/" },
        { label: "Siksapath", href: "https://siksapath.com/" },
        { label: "BuyyBox", href: "http://buyybox.com/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Solutions", href: "#" },
        { label: "Customers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms and Conditions", href: "#" },
        { label: "Data Policy", href: "#" },
        { label: "SLA", href: "#" },
      ],
    },
  ],

  newsletter: {
    title: "Stay Updated",
    description: "Get software updates, workflow tips, and product announcements.",
    placeholder: "Enter your email",
    buttonLabel: "Join",
  },

  bottomBar: {
    copyright: "(c) 2026 SA Softech India. All rights reserved.",
    note: "Address: Verma Karpura House, 504 - 5th Floor, SP Verma Road, Patna 800001 [Bihar].",
  },
};