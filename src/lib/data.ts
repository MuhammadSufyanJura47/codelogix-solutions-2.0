import {
  BadgeCheck,
  BrainCircuit,
  Code2,
  GraduationCap,
  LayoutTemplate,
  MonitorCheck,
  Palette,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export type Course = {
  title: string;
  description: string;
  duration: string;
  category: string;
  image: string;
  pricePKR: number;
  priceUSD: number;
};

export const siteConfig = {
  name: "CODELOGIX Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://codelogixsolutions.vercel.app",
  description:
    "Premium technology training, AI solutions, web development, design, and internship pathways for ambitious learners.",
  email: "codelogixsolutions@gmail.com",
  phone: "+92 339 5858284",
  socials: {
    linkedin: "https://www.linkedin.com/company/codelogix-solutions",
    instagram: "https://www.instagram.com/codelogixsolutions?igsh=MXVqN2h5ampkeTlzMA==",
    tiktok: "https://www.tiktok.com/@codelogixsolutions",
    github: "https://github.com/codelogixsolutions",
    facebook: "https://www.facebook.com/codelogixsolutions",
  },
};

export const services = [
  { title: "Web Development", icon: Code2, text: "Scalable websites, dashboards, portals, and product interfaces." },
  { title: "AI Solutions", icon: BrainCircuit, text: "AI workflows, automation, model integration, and business tools." },
  { title: "Graphic Design", icon: Palette, text: "Brand systems, social content, visual identity, and campaign assets." },
  { title: "Online Courses", icon: GraduationCap, text: "Practical, mentor-led learning paths for students and professionals." },
  { title: "Tech Training", icon: MonitorCheck, text: "Focused training for portfolios, internships, and career readiness." },
];

export const benefits = [
  "Live practical learning sessions",
  "Industry-oriented curriculum",
  "Real-world projects",
  "Professional mentorship",
  "Lifetime learning resources when applicable",
  "Course completion certificate",
  "Dedicated learning support",
  "Microsoft official events and certificate access when announced",
];

export const internshipBenefits = [
  "Official internship offer letter",
  "Weekly mentorship sessions",
  "Industry-based tasks and projects",
  "Performance evaluation and guidance",
  "Internship completion certificate",
  "Portfolio-building opportunities",
  "Professional networking exposure",
];

export const whyChooseUs = [
  { title: "Practical Learning", icon: LayoutTemplate },
  { title: "Affordable Fees", icon: BadgeCheck },
  { title: "Expert Instructors", icon: UsersRound },
  { title: "Certificates", icon: ShieldCheck },
  { title: "Online Learning", icon: MonitorCheck },
];

export const team = [
  {
    name: "Mr. Zeeshan Manzoor",
    role: "Founder",
    bio: "Technology educator focused on practical software training, web platforms, and student career development.",
    image: "/images/team-founder.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/zeeshan-manzoor-96702b273/",
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
  {
    name: "Muhammad Sufyan Jura",
    role: "Co-Founder",
    bio: "Technology educator focused on practical software training, web platforms, and student career development.",
    image: "/images/team-leadership.jpg",
    socials: {
      linkedin: siteConfig.socials.linkedin,
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
];

export const instructors = [
  {
    name: "Mr. Zeeshan Manzoor",
    role: "Founder, Wordpress & Web Development Instructor",
    bio: "Technology educator focused on practical software training, web platforms, and student career development.",
    image: "/images/team-founder.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/zeeshan-manzoor-96702b273/",
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
  {
    name: "Muhammad Sufyan Jura",
    role: "Co-Founder, Web Development & Generative AI Instructor",
    bio: "Technology educator focused on practical software training, web platforms, and student career development.",
    image: "/images/team-leadership.jpg",
    socials: {
      linkedin: siteConfig.socials.linkedin,
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
  {
    name: "Rahique Fatima",
    role: "Graphic Designing Instructor",
    expertise: "Adobe Photoshop, Illustrator",
    bio: "Teaches visual design principles, branding, and social content creation with hands-on projects.",
    image: "/images/instructor-rahique.jpg",
    socials: {
      linkedin: siteConfig.socials.linkedin,
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
  {
    name: "Fareeha Naveed",
    role: "Python Programming & Cyber Security Instructor",
    expertise: "Python, AI Integration, Cybersecurity",
    bio: "Guides learners in Python programming, AI integration, and cybersecurity practices for real-world applications.",
    image: "/images/instructor-fareeha.jpg",
    socials: {
      linkedin: siteConfig.socials.linkedin,
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
  {
    name: "Saira Batool",
    role: "MERN Stack Development Instructor",
    expertise: "MongoDB, Express.js, React, Node.js",
    bio: "Guides learners in building full-stack web applications with the MERN stack.",
    image: "/images/instructor-saira.jpg",
    socials: {
      linkedin: siteConfig.socials.linkedin,
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
  {
    name: "Shayan Khan Nawab",
    role: "Mobile App Development Instructor",
    expertise: "Flutter, React Native",
    bio: "Teaches mobile app development with Flutter and React Native, focusing on cross-platform solutions.",
    image: "/images/instructor-shayan.jpg",
    socials: {
      linkedin: siteConfig.socials.linkedin,
      github: siteConfig.socials.github,
      email: siteConfig.email,
    },
  },
];

export const pakistaniPayment = {
  accountTitle: "Muhammad Sufyan Jura",
  accountNumber: "03395858284",
  bank: "Easypaisa",
  instructions:
    "Submit the course fee, upload your receipt to Google Drive with public access enabled, and paste the share link in the form.",
};

export const internationalPayment = {
  accountTitle: "Zeeshan Manzoor",
  accountNumber: "0425297736141",
  bank: "Bank Transfer",
  instructions:
    "Complete the international payment, upload your receipt to Google Drive with public access enabled, and paste the share link in the form.",
};
