import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autonomous Navigation Bot | Pawandai",
  description:
    "A technical project dashboard for DQN navigation in Gazebo, ROS2, and micro-ROS.",
};

export default function AutonomousNavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
