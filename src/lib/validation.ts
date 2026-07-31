import { z } from "zod";

const phoneRegex = /^[+()\-\s0-9]{7,20}$/;
const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/.+/i;
const driveRegex = /^https?:\/\/(drive|docs)\.google\.com\/.+/i;

export const applicationSchema = z
  .object({
    studentType: z.enum(["PAKISTANI", "INTERNATIONAL"]),
    fullName: z.string().trim().min(2),
    fatherName: z.string().trim().min(2),
    phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
    email: z.string().trim().email(),
    linkedin: z.string().trim().regex(linkedInRegex, "Enter a valid LinkedIn URL"),
    selectedCourse: z.string().trim().min(1),
    semesterClass: z.string().trim().min(1),
    department: z.string().trim().min(1),
    university: z.string().trim().min(2),
    city: z.string().trim().optional(),
    country: z.string().trim().optional(),
    profilePictureLink: z.string().trim().regex(driveRegex, "Enter a public Google Drive link"),
    paymentProofLink: z.string().trim().regex(driveRegex, "Enter a public Google Drive link"),
    acknowledgement: z.boolean().refine(Boolean, "Acknowledgement is required"),
  })
  .superRefine((value, context) => {
    if (value.studentType === "PAKISTANI" && !value.city) {
      context.addIssue({ code: "custom", path: ["city"], message: "City is required" });
    }
    if (value.studentType === "INTERNATIONAL" && !value.country) {
      context.addIssue({ code: "custom", path: ["country"], message: "Country is required" });
    }
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  subject: z.string().trim().min(3),
  message: z.string().trim().min(10),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
});

export const statusSchema = z.object({
  verificationStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]),
});

export const courseSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(10),
  duration: z.string().trim().min(2),
  category: z.string().trim().min(2),
  image: z.string().trim().min(3),
  pricePKR: z.coerce.number().int().nonnegative(),
  priceUSD: z.coerce.number().int().nonnegative(),
});

export const teacherSchema = z.object({
  name: z.string().trim().min(2),
  role: z.string().trim().min(2),
  expertise: z.string().trim().optional(),
  bio: z.string().trim().min(10),
  image: z.string().trim().min(3),
  linkedin: z.string().trim().url(),
  github: z.string().trim().url(),
  email: z.string().trim().email(),
});
