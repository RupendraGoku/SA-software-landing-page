import { FileKey, Lock, Server, Shield } from "lucide-react";

export const securityContent = {
  badgeLabel: "Secure Cloud Backup",
  heading: {
    line1: "Your data is always",
    line2: "safe and backed up.",
  },
  description:
    "We combine secure cloud infrastructure with backup and recovery controls so your business data stays protected at every stage.",
  controls: [
    "Encrypted storage and transfer protection",
    "Automated secure cloud backups",
    "Granular role-based access controls",
  ],
  certificationLabel: "Data Protection Layers",
  certifications: [
    { name: "Access Control", icon: Shield },
    { name: "Audit Trails", icon: FileKey },
    { name: "Encrypted Backups", icon: Lock },
    { name: "Recovery Ready", icon: Server },
  ],
};
