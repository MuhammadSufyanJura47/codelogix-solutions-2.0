import { Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/lib/data";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] surface-card transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(28,43,71,0.12)]">
      <div className="aspect-[16/10] overflow-hidden bg-[#eef3f9]">
        <Image
          src={course.image}
          alt={`${course.title} course`}
          width={1200}
          height={750}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap gap-2 text-xs font-bold text-[#1f5fa6]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f0fb] px-3 py-1">
            <Tag size={14} /> {course.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f7f9fc] px-3 py-1 text-[#1c2b47]">
            <Clock size={14} /> {course.duration}
          </span>
        </div>
        <h3 className="text-[1.08rem] font-black leading-tight text-[#1c2b47]">{course.title}</h3>
        <p className="min-h-16 text-sm leading-7 text-[#4b5b74]">{course.description}</p>
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-[#d6dfeb] pt-4">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#6d7a90]">Starting at</p>
            <p className="mt-1 text-xs text-gray-400 line-through">
              PKR {Math.round(course.pricePKR * 1.25).toLocaleString()}
            </p>
            <p className="text-lg font-black text-[#1f5fa6]">PKR {course.pricePKR.toLocaleString()}</p>
          </div>
          <Link href={`/apply?course=${encodeURIComponent(course.title)}`} className="btn-primary px-4 py-2.5 text-sm">
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
}
