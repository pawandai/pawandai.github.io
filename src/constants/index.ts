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

export const dummyPosts = [
  {
    id: 1,
    slug: "first-post",
    title: "First Post",
    description:
      "This is the first post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 2,
    slug: "second-post",
    title: "Second Post",
    description:
      "This is the second post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 3,
    slug: "third-post",
    title: "Third Post",
    description:
      "This is the third post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 4,
    slug: "fourth-post",
    title: "Fourth Post",
    description:
      "This is the fourth post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 5,
    slug: "fifth-post",
    title: "Fifth Post",
    description:
      "This is the fifth post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 6,
    slug: "sixth-post",
    title: "Sixth Post",
    description:
      "This is the sixth post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 7,
    slug: "seventh-post",
    title: "Seventh Post",
    description:
      "This is the seventh post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 8,
    slug: "eighth-post",
    title: "Eighth Post",
    description:
      "This is the eighth post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 9,
    slug: "ninth-post",
    title: "Ninth Post",
    description:
      "This is the ninth post lorem ipsum dolor sit amet. lorem ipsum",
  },
  {
    id: 10,
    slug: "tenth-post",
    title: "Tenth Post",
    description:
      "This is the tenth post lorem ipsum dolor sit amet. lorem ipsum",
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: "first-post",
    title: "The Benefits of Meditation",
    topics: ["meditation", "mental health"],
    category: "Wellness",
    tags: ["meditation", "mental health"],
    content:
      "Meditation has been shown to have numerous benefits for both mental and physical health...",
    createdAt: "2021-09-01",
    timeToRead: 5,
  },
  {
    id: 2,
    slug: "second-post",
    topics: ["meditation", "mental health"],
    title: "Top 10 Hiking Trails in the Pacific Northwest",
    category: "Travel",
    tags: ["hiking", "nature"],
    content:
      "From the rugged coastlines of Oregon to the snow-capped peaks of Washington, the Pacific Northwest is a hiker's paradise...",
    createdAt: "2021-09-01",
    timeToRead: 5,
  },
  {
    id: 3,
    slug: "third-post",
    topics: ["meditation", "mental health"],
    title: "5 Easy Vegetarian Recipes for Busy Weeknights",
    category: "Food",
    tags: ["vegetarian", "recipes"],
    content:
      "Eating a plant-based diet doesn't have to be complicated or time-consuming. These five vegetarian recipes are perfect for busy weeknights...",
    createdAt: "2021-09-01",
    timeToRead: 5,
  },
  {
    id: 4,
    slug: "fourth-post",
    topics: ["meditation", "mental health"],
    title: "The Importance of Mental Health Awareness",
    category: "Wellness",
    tags: ["mental health", "awareness"],
    content:
      "Mental health is a critical aspect of overall well-being, yet it is often overlooked or stigmatized. It's time to change that...",
    createdAt: "2021-09-01",
    timeToRead: 5,
  },
  {
    id: 5,
    slug: "fifth-post",
    topics: ["meditation", "mental health"],
    title: "The Top 5 Destinations for Solo Travelers",
    category: "Travel",
    tags: ["solo travel", "destinations"],
    content:
      "Traveling solo can be an incredibly rewarding experience, allowing you to explore the world on your own terms...",
    createdAt: "2021-09-01",
    timeToRead: 5,
  },
  {
    id: 6,
    slug: "sixth-post",
    topics: ["meditation", "mental health"],
    title: "The Science Behind the Perfect Cup of Coffee",
    category: "Food",
    tags: ["coffee", "science"],
    content:
      "From bean selection to brewing method, there's a lot that goes into creating the perfect cup of coffee. Let's dive into the science behind it...",
    createdAt: "2021-09-01",
    timeToRead: 5,
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Task Manager App - Trello Clone",
    imageUrls: [
      "/projects/task_manager/tasks.jpeg",
      "/projects/task_manager/tasks.jpeg",
      "/projects/task_manager/tasks.jpeg",
      "/projects/task_manager/tasks.jpeg",
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
