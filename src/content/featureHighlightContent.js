import { Network, ShieldCheck, Zap } from "lucide-react";

export const featureHighlightContent = {
  featureLabelPrefix: "Core Feature",
  processingLabel: "OPTIMIZING YOUR WORKFLOWS...",
  features: [
    {
      id: "integration",
      title: "Integration Hub",
      subtitle: "Connect what you already use.",
      description:
        "Easily integrate your existing tools so teams can work from one connected flow instead of switching across disconnected systems.",
      stat: "Easy",
      statLabel: "Plug-and-Play Integration",
      icon: Network,
      gradient: "from-indigo-500 via-purple-500 to-indigo-900",
    },
    {
      id: "backup",
      title: "Secure Cloud Backup",
      subtitle: "Your data is always protected.",
      description:
        "Keep business records secure with automated cloud backups, controlled access, and recovery-ready infrastructure.",
      stat: "24/7",
      statLabel: "Backup Monitoring",
      icon: ShieldCheck,
      gradient: "from-emerald-500 via-teal-500 to-emerald-900",
    },
    {
      id: "automation",
      title: "Automation Studio",
      subtitle: "Save time and lower costs.",
      description:
        "Build smart workflows that automate repetitive actions and reduce operational effort across sales, support, and back-office teams.",
      stat: "Smart",
      statLabel: "Cost-Efficient Workflows",
      icon: Zap,
      gradient: "from-orange-500 via-red-500 to-orange-900",
    },
  ],
};
