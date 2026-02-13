import {
  Database,
  Code,
  Server,
  Globe,
  Layers,
  Box,
  Palette,
  Container,
  FileCode,
  Zap,
  Terminal,
  GitBranch,
} from "lucide-react";

export const techStackContent = {
  heading: {
    line1: "Technology that powers",
    highlight: "modern software delivery.",
  },
  stack: [
    { icon: Code, name: "React / Next.js" },
    { icon: Palette, name: "Tailwind CSS" },
    { icon: FileCode, name: "TypeScript" },
    { icon: Layers, name: "Laravel" },
    { icon: Box, name: ".NET Core" },
    { icon: Server, name: "Node.js" },
    { icon: Globe, name: "Hostinger" },
    { icon: Container, name: "Docker" },
    { icon: GitBranch, name: "CI/CD Pipelines" },
    { icon: Database, name: "PostgreSQL" },
    { icon: Terminal, name: "MySQL" },
    { icon: Zap, name: "Redis Cache" },
  ],
};
