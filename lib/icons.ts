import {
  Award,
  BookOpen,
  Briefcase,
  Camera,
  Cloud,
  Code2,
  Database,
  Dumbbell,
  Gamepad2,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  Mountain,
  Music,
  Palette,
  Plane,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Every icon referenced by `content/site.ts` must be registered here.
 * Content stays plain serialisable data; the icon name maps to a component.
 */
export const iconMap = {
  award: Award,
  book: BookOpen,
  briefcase: Briefcase,
  camera: Camera,
  cloud: Cloud,
  code: Code2,
  database: Database,
  dumbbell: Dumbbell,
  gamepad: Gamepad2,
  globe: Globe,
  graduation: GraduationCap,
  layers: Layers,
  mail: Mail,
  mountain: Mountain,
  music: Music,
  palette: Palette,
  plane: Plane,
  rocket: Rocket,
  server: Server,
  sparkles: Sparkles,
  terminal: Terminal,
  food: UtensilsCrossed,
  wrench: Wrench,
} as const;

export type IconName = keyof typeof iconMap;

/** Resolves an icon name, falling back to a neutral icon when unknown. */
export function getIcon(name: string): LucideIcon {
  return (iconMap as Record<string, LucideIcon>)[name] ?? Sparkles;
}
