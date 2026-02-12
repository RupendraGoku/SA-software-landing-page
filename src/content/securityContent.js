import { FileKey, Lock, Server, Shield } from "lucide-react";

export const securityContent = {
  badgeLabel: "Security by Design",
  heading: {
    line1: "Protect critical",
    line2: "operational data.",
  },
  description:
    "From user permissions to auditability, every workflow is designed to keep business-critical data secure and accountable.",
  controls: [
    "Encrypted data in transit and at rest",
    "Granular role-based access controls",
    "Action-level logs for key processes",
  ],
  certificationLabel: "Core Security Controls",
  certifications: [
    { name: "Access Controls", icon: Shield },
    { name: "Audit Trails", icon: FileKey },
    { name: "Encrypted Backups", icon: Lock },
    { name: "Disaster Recovery", icon: Server },
  ],
};
