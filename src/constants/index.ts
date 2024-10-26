import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Linkedin, Mail } from "lucide-react";

export const socials = [
  {
    id: "1",
    title: "Github",
    link: "https://github.com/pawandai",
    icon: GitHubLogoIcon,
  },
  {
    id: "2",
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/pawan-awasthi-5a1a6b244/",
    icon: Linkedin,
  },
  {
    id: "3",
    title: "Twitter",
    link: "https://x.com/paw1awasthi",
    icon: TwitterLogoIcon,
  },
  {
    id: "5",
    title: "Email",
    link: "mailto:contactpawandai@gmail.com",
    icon: Mail,
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Task Manager App - Trello Clone",
    imageUrls: [
      "/projects/task_manager/tasks.jpeg",
      "/projects/task_manager/landing.PNG",
      "/projects/task_manager/dashboard.PNG",
    ],
    tags: ["Next.js", "Prisma", "PostgresQL", "Stripe", "Server-Actions"],
    description:
      "The Task Manager is a Next.js app, similar to Trello, designed for managing tasks, lists, and boards. Users can perform actions such as creating, updating, and deleting tasks, with additional features like drag-and-drop functionality, user authentication, and subscription-based payments. Prisma serves as the ORM, while PostgreSQL is used for database management, and Stripe handles the payment processing. Server-side logic is implemented using server actions. The application follows best practices for both Next.js and server actions.",
    createdBy: [
      { id: 1, name: "pawandai", link: "https://github.com/pawandai" },
    ],
    createdAt: "24 Aug 2024",
    liveDemoUrl: "https://tasks-saas.vercel.app/",
    githubUrl: "https://github.com/pawandai/SaaS_Task_Manager",
  },
  {
    id: 2,
    title: "Destination Australia",
    imageUrls: [
      "/projects/destination_aus/dashboard.PNG",
      "/projects/destination_aus/home.PNG",
    ],
    tags: ["MongoDB", "Next.js", "Express", "Azure"],
    description:
      "Destination Australia is a web application that allows users to explore Australia. The application features a dashboard for managing blog posts, user authentication, and a user-friendly interface for browsing and reading blog posts. The backend is built with Express and MongoDB, while the frontend is developed using Next.js. Images are stored in Azure Blob Storage, and the application is deployed on Azure App Service. The project demonstrates best practices for building a full-stack web application with Next.js and Express. It is also social media platform for students to share their experiences in Australia and help each other.",
    createdBy: [
      { id: 1, name: "pawandai", link: "https://github.com/pawandai" },
    ],
    createdAt: "In Development",
    liveDemoUrl: "https://destinationaus.com/",
    githubUrl: "https://github.com/thestartek/DestinationAusWeb",
  },
];

export const SKILLS = [
  {
    id: 1,
    name: "Angular",
    icon: "/skills/angular.svg",
  },
  {
    id: 2,
    name: "Azure",
    icon: "/skills/azure.svg",
  },
  {
    id: 3,
    name: "MySQL",
    icon: "/skills/mysql.svg",
  },
  {
    id: 4,
    name: "Django",
    icon: "/skills/django.svg",
  },
  {
    id: 5,
    name: "Git",
    icon: "/skills/git.svg",
  },
  {
    id: 6,
    name: "Github",
    icon: "/skills/github.svg",
  },
  {
    id: 7,
    name: "GraphQL",
    icon: "/skills/graphql.svg",
  },
  {
    id: 8,
    name: "MongoDB",
    icon: "/skills/mongodb.svg",
  },
  {
    id: 9,
    name: "Next.js",
    icon: "/skills/nextjs.svg",
  },
  {
    id: 10,
    name: "Node.js",
    icon: "/skills/nodejs.svg",
  },
  {
    id: 11,
    name: "Vue.js",
    icon: "/skills/vue.svg",
  },
  {
    id: 12,
    name: "Nuxt.js",
    icon: "/skills/nuxt.svg",
  },
  {
    id: 13,
    name: "PostgreSQL",
    icon: "/skills/postgresql.svg",
  },
  {
    id: 14,
    name: "Prisma",
    icon: "/skills/prisma.svg",
  },
  {
    id: 15,
    name: "React",
    icon: "/skills/reactjs.svg",
  },
  {
    id: 16,
    name: "Redux",
    icon: "/skills/redux.svg",
  },
  {
    id: 17,
    name: "TypeScript",
    icon: "/skills/typescript.svg",
  },
  {
    id: 18,
    name: "Python",
    icon: "/skills/python.svg",
  },
  {
    id: 19,
    name: "Docker",
    icon: "/skills/docker.svg",
  },
];
