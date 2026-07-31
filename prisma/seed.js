const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const courses = [
  {
    title: "Full Stack Web Development",
    description: "Build production-ready web apps with React, Next.js, APIs, databases, authentication, and deployment.",
    duration: "12 Weeks",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    pricePKR: 18000,
    priceUSD: 120,
  },
  {
    title: "Artificial Intelligence Essentials",
    description: "Learn practical AI workflows, prompt engineering, model integration, and automation use cases.",
    duration: "10 Weeks",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    pricePKR: 22000,
    priceUSD: 150,
  },
  {
    title: "Graphic Design Masterclass",
    description: "Master visual identity, social content, typography, layout systems, and portfolio-ready projects.",
    duration: "8 Weeks",
    category: "Design",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=80",
    pricePKR: 14000,
    priceUSD: 95,
  },
  {
    title: "Frontend Engineering",
    description: "Create polished interfaces with React, TypeScript, Tailwind CSS, accessibility, and performance practices.",
    duration: "8 Weeks",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    pricePKR: 16000,
    priceUSD: 110,
  },
  {
    title: "Python for Data Science",
    description: "Analyze data with Python, notebooks, visualization, statistics, and practical business datasets.",
    duration: "10 Weeks",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    pricePKR: 20000,
    priceUSD: 135,
  },
  {
    title: "Digital Skills Bootcamp",
    description: "A fast-track program covering freelancing, portfolios, client communication, and core tech tools.",
    duration: "6 Weeks",
    category: "Tech Training",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    pricePKR: 12000,
    priceUSD: 80,
  },
];

const teachers = [
  {
    name: "Mr. Zeeshan Manzoor",
    role: "Founder, Wordpress & Web Development Instructor",
    expertise: "WordPress, Web Development",
    bio: "Technology educator focused on practical software training, web platforms, and student career development.",
    image: "/images/team-founder.jpg",
    linkedin: "https://www.linkedin.com/in/zeeshan-manzoor-96702b273/",
    github: "https://github.com/codelogixsolutions",
    email: "codelogixsolutions@gmail.com",
  },
  {
    name: "Muhammad Sufyan Jura",
    role: "Co-Founder, Web Development & Generative AI Instructor",
    expertise: "Web Development, Generative AI",
    bio: "Technology educator focused on practical software training, web platforms, and student career development.",
    image: "/images/team-leadership.jpg",
    linkedin: "https://www.linkedin.com/company/codelogix-solutions",
    github: "https://github.com/codelogixsolutions",
    email: "codelogixsolutions@gmail.com",
  },
  {
    name: "Rahique Fatima",
    role: "Graphic Designing Instructor",
    expertise: "Adobe Photoshop, Illustrator",
    bio: "Teaches visual design principles, branding, and social content creation with hands-on projects.",
    image: "/images/instructor-rahique.jpg",
    linkedin: "https://www.linkedin.com/company/codelogix-solutions",
    github: "https://github.com/codelogixsolutions",
    email: "codelogixsolutions@gmail.com",
  },
  {
    name: "Fareeha Naveed",
    role: "Python Programming & Cyber Security Instructor",
    expertise: "Python, AI Integration, Cybersecurity",
    bio: "Guides learners in Python programming, AI integration, and cybersecurity practices for real-world applications.",
    image: "/images/instructor-fareeha.jpg",
    linkedin: "https://www.linkedin.com/company/codelogix-solutions",
    github: "https://github.com/codelogixsolutions",
    email: "codelogixsolutions@gmail.com",
  },
  {
    name: "Saira Batool",
    role: "MERN Stack Development Instructor",
    expertise: "MongoDB, Express.js, React, Node.js",
    bio: "Guides learners in building full-stack web applications with the MERN stack.",
    image: "/images/instructor-saira.jpg",
    linkedin: "https://www.linkedin.com/company/codelogix-solutions",
    github: "https://github.com/codelogixsolutions",
    email: "codelogixsolutions@gmail.com",
  },
  {
    name: "Shayan Khan Nawab",
    role: "Mobile App Development Instructor",
    expertise: "Flutter, React Native",
    bio: "Teaches mobile app development with Flutter and React Native, focusing on cross-platform solutions.",
    image: "/images/instructor-shayan.jpg",
    linkedin: "https://www.linkedin.com/company/codelogix-solutions",
    github: "https://github.com/codelogixsolutions",
    email: "codelogixsolutions@gmail.com",
  },
];

async function main() {
  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: courses.indexOf(course) + 1 },
      update: course,
      create: course,
    });
  }

  for (const teacher of teachers) {
    await prisma.teacher.upsert({
      where: { id: teachers.indexOf(teacher) + 1 },
      update: teacher,
      create: teacher,
    });
  }

  const email = (process.env.ADMIN_EMAIL || "codelogixsolutions@gmail.com").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "codelogixsolutions@47";
  const hash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { password: hash, role: "admin" },
    create: { email, password: hash, role: "admin" },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
