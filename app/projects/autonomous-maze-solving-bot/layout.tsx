import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autonomous Maze Solving Bot | Pawandai',
  description: 'A concise technical case study of an ESP32 flood-fill maze solving robot.',
}

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
