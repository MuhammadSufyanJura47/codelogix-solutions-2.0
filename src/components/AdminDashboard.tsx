"use client";

import { CheckCircle2, Clock3, DollarSign, Edit3, LayoutDashboard, Loader2, LogOut, Plus, Search, School2, Trash2, UsersRound, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Application = {
  id: number;
  studentType: "PAKISTANI" | "INTERNATIONAL";
  fullName: string;
  phone: string;
  email: string;
  selectedCourse: string;
  feeAmount: number;
  currency: string;
  profilePictureLink: string;
  paymentProofLink: string;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: string;
};

type Dashboard = {
  stats: Record<string, number>;
  revenue: {
    nationalVerified: number;
    nationalTotalPKR: number;
    internationalVerified: number;
    internationalTotalUSD: number;
    todayPKR: number;
    todayUSD: number;
    monthlyPKR: number;
    monthlyUSD: number;
    overallPKR: number;
    overallUSD: number;
  };
  recentVerified: Application[];
  applications: Application[];
  courses: Course[];
  teachers: Teacher[];
  courseStats: CourseStat[];
};

type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  image: string;
  pricePKR: number;
  priceUSD: number;
};

type CourseStat = {
  id: number;
  title: string;
  totalStudents: number;
  pakistaniStudents: number;
  internationalStudents: number;
  revenuePKR: number;
  revenueUSD: number;
};

type Teacher = {
  id: number;
  name: string;
  role: string;
  expertise: string | null;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
};

type CourseFormState = {
  title: string;
  description: string;
  duration: string;
  category: string;
  image: string;
  pricePKR: string;
  priceUSD: string;
};

const emptyCourseForm: CourseFormState = {
  title: "",
  description: "",
  duration: "",
  category: "",
  image: "/images/course-full-stack.jpg",
  pricePKR: "",
  priceUSD: "",
};

type TeacherFormState = {
  name: string;
  role: string;
  expertise: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
};

const emptyTeacherForm: TeacherFormState = {
  name: "",
  role: "",
  expertise: "",
  bio: "",
  image: "/images/team-founder.jpg",
  linkedin: "https://www.linkedin.com/company/codelogix-solutions",
  github: "https://github.com/codelogixsolutions",
  email: "codelogixsolutions@gmail.com",
};

const statusStyles = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  VERIFIED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
};

export function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "courses" | "create-course" | "teachers" | "create-teacher">("overview");
  const [studentType, setStudentType] = useState("");
  const [course, setCourse] = useState("");
  const [query, setQuery] = useState("");
  const [courseForm, setCourseForm] = useState<CourseFormState>(emptyCourseForm);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [savingCourse, setSavingCourse] = useState(false);
  const [courseError, setCourseError] = useState("");
  const [teacherForm, setTeacherForm] = useState<TeacherFormState>(emptyTeacherForm);
  const [editingTeacherId, setEditingTeacherId] = useState<number | null>(null);
  const [savingTeacher, setSavingTeacher] = useState(false);
  const [teacherError, setTeacherError] = useState("");

  const load = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    const params = new URLSearchParams();
    if (studentType) params.set("studentType", studentType);
    if (course) params.set("course", course);
    if (query) params.set("q", query);
    const response = await fetch(`/api/admin/dashboard?${params.toString()}`, { cache: "no-store" });
    if (response.ok) {
      setData(await response.json());
    }
    setLoading(false);
  }, [course, query, studentType]);

  const courseOptions = useMemo(() => data?.courses ?? [], [data?.courses]);

  useEffect(() => {
    let active = true;

    (async () => {
      if (active) {
        await load(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [load]);

  async function updateStatus(id: number, verificationStatus: string) {
    await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verificationStatus }),
    });
    await load();
  }

  function beginEdit(courseItem: Course) {
    setCourseError("");
    setEditingCourseId(courseItem.id);
    setCourseForm({
      title: courseItem.title,
      description: courseItem.description,
      duration: courseItem.duration,
      category: courseItem.category,
      image: courseItem.image,
      pricePKR: String(courseItem.pricePKR),
      priceUSD: String(courseItem.priceUSD),
    });
    setActiveTab("create-course");
  }

  function clearCourseForm() {
    setEditingCourseId(null);
    setCourseForm(emptyCourseForm);
    setCourseError("");
  }

  async function saveCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingCourse(true);

    const payload = {
      ...courseForm,
      pricePKR: Number(courseForm.pricePKR),
      priceUSD: Number(courseForm.priceUSD),
    };

    try {
      const response = await fetch(editingCourseId ? `/api/admin/courses/${editingCourseId}` : "/api/admin/courses", {
        method: editingCourseId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setCourseError(result?.error || "Course could not be saved.");
        return;
      }

      clearCourseForm();
      setActiveTab("courses");
      await load();
    } catch {
      setCourseError("Course could not be saved. Check your connection and try again.");
    } finally {
      setSavingCourse(false);
    }
  }

  async function deleteCourse(id: number) {
    if (!window.confirm("Delete this course?")) {
      return;
    }

    const response = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      window.alert(result?.error || "Course could not be deleted.");
      return;
    }
    if (editingCourseId === id) {
      clearCourseForm();
    }
    await load();
  }

  function beginTeacherEdit(teacher: Teacher) {
    setTeacherError("");
    setEditingTeacherId(teacher.id);
    setTeacherForm({
      name: teacher.name,
      role: teacher.role,
      expertise: teacher.expertise || "",
      bio: teacher.bio,
      image: teacher.image,
      linkedin: teacher.linkedin,
      github: teacher.github,
      email: teacher.email,
    });
    setActiveTab("create-teacher");
  }

  function clearTeacherForm() {
    setEditingTeacherId(null);
    setTeacherForm(emptyTeacherForm);
    setTeacherError("");
  }

  async function saveTeacher(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingTeacher(true);

    try {
      const response = await fetch(editingTeacherId ? `/api/admin/teachers/${editingTeacherId}` : "/api/admin/teachers", {
        method: editingTeacherId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherForm),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setTeacherError(result?.error || "Teacher could not be saved.");
        return;
      }

      clearTeacherForm();
      setActiveTab("teachers");
      await load();
    } catch {
      setTeacherError("Teacher could not be saved. Check your connection and try again.");
    } finally {
      setSavingTeacher(false);
    }
  }

  async function deleteTeacher(id: number) {
    if (!window.confirm("Delete this teacher?")) {
      return;
    }

    const response = await fetch(`/api/admin/teachers/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      window.alert(result?.error || "Teacher could not be deleted.");
      return;
    }
    if (editingTeacherId === id) {
      clearTeacherForm();
    }
    await load();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (loading && !data) {
    return (
      <div className="grid min-h-96 place-items-center">
        <Loader2 className="animate-spin text-[#1f5fa6]" size={34} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="surface-card sticky top-24 h-fit rounded-[2rem] p-5 backdrop-blur">
        <div className="flex items-center gap-3 border-b border-[#d6dfeb] pb-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8f0fb] text-[#1f5fa6] shadow-sm">
            <LayoutDashboard size={22} />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1f5fa6]">Admin</p>
            <p className="text-sm font-semibold text-[#4b5b74]">Professional control panel</p>
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          {([
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "applications", label: "Applications", icon: School2 },
            { id: "courses", label: "Courses", icon: Plus },
            { id: "teachers", label: "Teachers", icon: UsersRound },
          ] as const).map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 rounded-[1rem] border px-4 py-3 text-left text-sm font-semibold transition duration-200 ${
                  active ? "border-[#1f5fa6] bg-[#e8f0fb] text-[#1f5fa6] shadow-sm" : "border-transparent bg-[#f7f9fc] text-[#1c2b47] hover:border-[#d6dfeb] hover:bg-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 rounded-[1.25rem] bg-[#f7f9fc] p-4 text-sm text-[#4b5b74]">
          <div className="flex items-center justify-between">
            <span>Total Applications</span>
            <span className="font-black text-[#1c2b47]">{data?.stats.totalApplications || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Courses</span>
            <span className="font-black text-[#1c2b47]">{data?.stats.totalCourses || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Teachers</span>
            <span className="font-black text-[#1c2b47]">{data?.stats.totalTeachers || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Contact Messages</span>
            <span className="font-black text-[#1c2b47]">{data?.stats.contactMessages || 0}</span>
          </div>
        </div>

        <button className="btn-secondary mt-5 w-full justify-center" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <div className="space-y-6">
        {activeTab === "overview" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Stat label="Total Applications" value={data?.stats.totalApplications || 0} icon={<Clock3 size={20} />} />
              <Stat label="Verified Applications" value={data?.stats.verifiedApplications || 0} icon={<CheckCircle2 size={20} />} />
              <Stat label="Pending Applications" value={data?.stats.pendingApplications || 0} icon={<Clock3 size={20} />} />
              <Stat label="Rejected Applications" value={data?.stats.rejectedApplications || 0} icon={<XCircle size={20} />} />
              <Stat label="Pakistani Students" value={data?.stats.pakistaniApplications || 0} icon={<CheckCircle2 size={20} />} />
              <Stat label="International Students" value={data?.stats.internationalApplications || 0} icon={<CheckCircle2 size={20} />} />
              <Stat label="Total Courses" value={data?.stats.totalCourses || 0} icon={<School2 size={20} />} />
              <Stat label="Contact Messages" value={data?.stats.contactMessages || 0} icon={<School2 size={20} />} />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Revenue title="National Revenue" lines={[`Verified Pakistani Students: ${data?.revenue.nationalVerified || 0}`, `Total Revenue: PKR ${(data?.revenue.nationalTotalPKR || 0).toLocaleString()}`]} />
              <Revenue title="International Revenue" lines={[`Verified International Students: ${data?.revenue.internationalVerified || 0}`, `Total Revenue: USD ${(data?.revenue.internationalTotalUSD || 0).toLocaleString()}`]} />
              <Revenue
                title="Time-Based Revenue"
                lines={[
                  `Today: PKR ${(data?.revenue.todayPKR || 0).toLocaleString()} / USD ${(data?.revenue.todayUSD || 0).toLocaleString()}`,
                  `Monthly: PKR ${(data?.revenue.monthlyPKR || 0).toLocaleString()} / USD ${(data?.revenue.monthlyUSD || 0).toLocaleString()}`,
                  `Overall: PKR ${(data?.revenue.overallPKR || 0).toLocaleString()} / USD ${(data?.revenue.overallUSD || 0).toLocaleString()}`,
                ]}
              />
            </div>

            <div className="surface-card rounded-[1.75rem] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#14213d]">Recent verified students</h2>
                  <p className="mt-1 text-sm text-[#4b5b74]">Latest successful applications and verified submissions.</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {(data?.recentVerified || []).map((application) => (
                  <div key={application.id} className="rounded-[1rem] border border-[#d6dfeb] bg-[#f7f9fc] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#bfd0e7] hover:bg-white">
                    <p className="font-black text-[#14213d]">{application.fullName}</p>
                    <p className="text-sm text-[#4b5b74]">{application.selectedCourse} • {application.studentType} • {application.currency} {application.feeAmount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "applications" && (
          <>
            <div className="surface-card rounded-[1.75rem] p-4">
              <div className="grid gap-3 lg:grid-cols-[1fr_1fr_2fr_auto]">
                <select className="field-input" value={studentType} onChange={(event) => setStudentType(event.target.value)}>
                  <option value="">All student types</option>
                  <option value="PAKISTANI">Pakistani</option>
                  <option value="INTERNATIONAL">International</option>
                </select>
                <select className="field-input" value={course} onChange={(event) => setCourse(event.target.value)}>
                  <option value="">All courses</option>
                  {courseOptions.map((courseItem) => (
                    <option key={courseItem.id} value={courseItem.title}>{courseItem.title}</option>
                  ))}
                </select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1f5fa6]" size={18} />
                  <input className="field-input pl-10" placeholder="Search name, email, or phone" value={query} onChange={(event) => setQuery(event.target.value)} />
                </div>
                <button className="btn-primary justify-center" onClick={() => load()} type="button">Search</button>
              </div>
            </div>

            <div className="surface-card overflow-hidden rounded-[1.75rem]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <thead className="bg-[#f7f9fc] text-xs uppercase text-[#1c2b47]">
                    <tr>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Course</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Fee</th>
                      <th className="px-4 py-3">Proof</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d6dfeb]">
                    {(data?.applications || []).map((application) => (
                      <tr key={application.id} className="align-top">
                        <td className="px-4 py-4">
                          <p className="font-bold text-[#1c2b47]">{application.fullName}</p>
                          <p className="text-[#4b5b74]">{application.email}</p>
                          <p className="text-[#4b5b74]">{application.phone}</p>
                        </td>
                        <td className="px-4 py-4 text-[#4b5b74]">{application.selectedCourse}</td>
                        <td className="px-4 py-4 text-[#4b5b74]">{application.studentType}</td>
                        <td className="px-4 py-4 font-bold text-[#1c2b47]">{application.currency} {application.feeAmount.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <div className="grid gap-2">
                            <a className="text-[#1f5fa6] underline" href={application.paymentProofLink} target="_blank">Payment Proof</a>
                            <a className="text-[#1f5fa6] underline" href={application.profilePictureLink} target="_blank">Profile Picture</a>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusStyles[application.verificationStatus]}`}>
                            {application.verificationStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <select className="field-input" value={application.verificationStatus} onChange={(event) => updateStatus(application.id, event.target.value)}>
                            <option value="PENDING">Pending</option>
                            <option value="VERIFIED">Verified</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "courses" && (
          <div className="space-y-5">
            <div className="surface-card rounded-[1.75rem] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#14213d]">Course Management</h2>
                  <p className="mt-1 text-sm text-[#4b5b74]">Review the catalog, edit entries, or delete outdated courses.</p>
                </div>
                <button type="button" className="btn-primary justify-center" onClick={() => { clearCourseForm(); setActiveTab("create-course"); }}>Create Course</button>
              </div>
            </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5 xl:col-span-2">
              <div className="surface-card rounded-[1.75rem] p-5">
                <h2 className="text-xl font-black text-[#1c2b47]">Course Statistics</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[780px] text-left text-sm">
                    <thead className="bg-[#f7f9fc] text-xs uppercase text-[#1c2b47]">
                      <tr>
                        <th className="px-3 py-3">Course</th>
                        <th className="px-3 py-3">Total</th>
                        <th className="px-3 py-3">Pakistani</th>
                        <th className="px-3 py-3">International</th>
                        <th className="px-3 py-3">Revenue PKR</th>
                        <th className="px-3 py-3">Revenue USD</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d6dfeb]">
                      {(data?.courseStats || []).map((item) => (
                        <tr key={item.id}>
                          <td className="px-3 py-3 font-semibold text-[#1c2b47]">{item.title}</td>
                          <td className="px-3 py-3">{item.totalStudents}</td>
                          <td className="px-3 py-3">{item.pakistaniStudents}</td>
                          <td className="px-3 py-3">{item.internationalStudents}</td>
                          <td className="px-3 py-3 font-semibold">PKR {item.revenuePKR.toLocaleString()}</td>
                          <td className="px-3 py-3 font-semibold">USD {item.revenueUSD.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-4">
                {(data?.courses || []).map((courseItem) => (
                  <div key={courseItem.id} className="surface-card rounded-[1.5rem] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1f5fa6]">{courseItem.category}</p>
                        <h3 className="mt-2 text-xl font-black text-[#1c2b47]">{courseItem.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#4b5b74]">{courseItem.description}</p>
                        <p className="mt-3 text-sm font-semibold text-[#4b5b74]">{courseItem.duration} • PKR {courseItem.pricePKR.toLocaleString()} • USD {courseItem.priceUSD.toLocaleString()}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button type="button" className="btn-secondary px-3 py-2" onClick={() => beginEdit(courseItem)} aria-label="Edit course">
                          <Edit3 size={16} />
                        </button>
                        <button type="button" className="btn-secondary px-3 py-2 text-red-600 hover:border-red-300 hover:text-red-600" onClick={() => deleteCourse(courseItem.id)} aria-label="Delete course">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        )}

        {activeTab === "create-course" && (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <form onSubmit={saveCourse} className="surface-card rounded-[1.75rem] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#1c2b47]">{editingCourseId ? "Edit Course" : "Create Course"}</h2>
                  <p className="mt-1 text-sm text-[#4b5b74]">Use this dedicated screen to add a new course to the public catalog.</p>
                </div>
                <button type="button" className="btn-secondary px-4 py-2" onClick={() => { clearCourseForm(); setActiveTab("courses"); }}>
                  Back
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {courseError && (
                  <div className="rounded-[1rem] border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">
                    {courseError}
                  </div>
                )}
                <label className="field-label sm:col-span-2">
                  Title
                  <input className="field-input" value={courseForm.title} onChange={(event) => setCourseForm((current) => ({ ...current, title: event.target.value }))} required />
                </label>
                <label className="field-label sm:col-span-2">
                  Description
                  <textarea className="field-input min-h-32 resize-y" value={courseForm.description} onChange={(event) => setCourseForm((current) => ({ ...current, description: event.target.value }))} required />
                </label>
                <label className="field-label">
                  Duration
                  <input className="field-input" value={courseForm.duration} onChange={(event) => setCourseForm((current) => ({ ...current, duration: event.target.value }))} required />
                </label>
                <label className="field-label">
                  Category
                  <input className="field-input" value={courseForm.category} onChange={(event) => setCourseForm((current) => ({ ...current, category: event.target.value }))} required />
                </label>
                <label className="field-label sm:col-span-2">
                  Image path
                  <input className="field-input" value={courseForm.image} onChange={(event) => setCourseForm((current) => ({ ...current, image: event.target.value }))} placeholder="/images/course-full-stack.jpg" required />
                </label>
                <label className="field-label">
                  Price PKR
                  <input className="field-input" type="number" min="0" value={courseForm.pricePKR} onChange={(event) => setCourseForm((current) => ({ ...current, pricePKR: event.target.value }))} required />
                </label>
                <label className="field-label">
                  Price USD
                  <input className="field-input" type="number" min="0" value={courseForm.priceUSD} onChange={(event) => setCourseForm((current) => ({ ...current, priceUSD: event.target.value }))} required />
                </label>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full justify-center" disabled={savingCourse}>
                {savingCourse ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} {editingCourseId ? "Update Course" : "Save Course"}
              </button>
            </form>

            <div className="space-y-5">
              <div className="surface-card rounded-[1.75rem] p-5">
                <h2 className="text-xl font-black text-[#1c2b47]">Create Course Tips</h2>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-[#4b5b74]">
                  <p>Keep the title concise and recognizable on the public courses page.</p>
                  <p>Use a clear image path and aligned pricing so the catalog stays consistent.</p>
                  <p>After saving, you can return to the course list to edit or remove entries.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="space-y-5">
            <div className="surface-card rounded-[1.75rem] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#14213d]">Teacher Management</h2>
                  <p className="mt-1 text-sm text-[#4b5b74]">Add, edit, and remove instructors shown on the public teachers page.</p>
                </div>
                <button type="button" className="btn-primary justify-center" onClick={() => { clearTeacherForm(); setActiveTab("create-teacher"); }}>Create Teacher</button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(data?.teachers || []).map((teacher) => (
                <article key={teacher.id} className="surface-card overflow-hidden rounded-[1.5rem]">
                  <div className="profile-photo-frame profile-photo-frame--flush">
                    <img src={teacher.image} alt={teacher.name} />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f5fa6]">{teacher.role}</p>
                    <h3 className="mt-2 text-xl font-black text-[#1c2b47]">{teacher.name}</h3>
                    {teacher.expertise && <p className="mt-2 text-sm font-semibold text-[#4b5b74]">{teacher.expertise}</p>}
                    <p className="mt-3 text-sm leading-7 text-[#4b5b74]">{teacher.bio}</p>
                    <div className="mt-5 flex gap-2">
                      <button type="button" className="btn-secondary px-3 py-2" onClick={() => beginTeacherEdit(teacher)} aria-label="Edit teacher">
                        <Edit3 size={16} />
                      </button>
                      <button type="button" className="btn-secondary px-3 py-2 text-red-600 hover:border-red-300 hover:text-red-600" onClick={() => deleteTeacher(teacher.id)} aria-label="Delete teacher">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === "create-teacher" && (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <form onSubmit={saveTeacher} className="surface-card rounded-[1.75rem] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#1c2b47]">{editingTeacherId ? "Edit Teacher" : "Create Teacher"}</h2>
                  <p className="mt-1 text-sm text-[#4b5b74]">Teacher records are saved in the connected database and shown publicly.</p>
                </div>
                <button type="button" className="btn-secondary px-4 py-2" onClick={() => { clearTeacherForm(); setActiveTab("teachers"); }}>
                  Back
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {teacherError && (
                  <div className="rounded-[1rem] border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">
                    {teacherError}
                  </div>
                )}
                <label className="field-label">
                  Name
                  <input className="field-input" value={teacherForm.name} onChange={(event) => setTeacherForm((current) => ({ ...current, name: event.target.value }))} required />
                </label>
                <label className="field-label">
                  Role
                  <input className="field-input" value={teacherForm.role} onChange={(event) => setTeacherForm((current) => ({ ...current, role: event.target.value }))} required />
                </label>
                <label className="field-label sm:col-span-2">
                  Expertise
                  <input className="field-input" value={teacherForm.expertise} onChange={(event) => setTeacherForm((current) => ({ ...current, expertise: event.target.value }))} placeholder="MERN Stack, AI, UI/UX" />
                </label>
                <label className="field-label sm:col-span-2">
                  Bio
                  <textarea className="field-input min-h-32 resize-y" value={teacherForm.bio} onChange={(event) => setTeacherForm((current) => ({ ...current, bio: event.target.value }))} required />
                </label>
                <label className="field-label sm:col-span-2">
                  Image path
                  <input className="field-input" value={teacherForm.image} onChange={(event) => setTeacherForm((current) => ({ ...current, image: event.target.value }))} placeholder="/images/team-founder.jpg" required />
                </label>
                <label className="field-label">
                  LinkedIn URL
                  <input className="field-input" value={teacherForm.linkedin} onChange={(event) => setTeacherForm((current) => ({ ...current, linkedin: event.target.value }))} required />
                </label>
                <label className="field-label">
                  GitHub URL
                  <input className="field-input" value={teacherForm.github} onChange={(event) => setTeacherForm((current) => ({ ...current, github: event.target.value }))} required />
                </label>
                <label className="field-label sm:col-span-2">
                  Email
                  <input className="field-input" type="email" value={teacherForm.email} onChange={(event) => setTeacherForm((current) => ({ ...current, email: event.target.value }))} required />
                </label>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full justify-center" disabled={savingTeacher}>
                {savingTeacher ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} {editingTeacherId ? "Update Teacher" : "Save Teacher"}
              </button>
            </form>

            <div className="space-y-5">
              <div className="surface-card rounded-[1.75rem] p-5">
                <h2 className="text-xl font-black text-[#1c2b47]">Teacher Image Preview</h2>
                <div className="profile-photo-frame mt-4">
                  <img src={teacherForm.image} alt={teacherForm.name || "Teacher preview"} />
                </div>
                <p className="mt-4 text-sm leading-7 text-[#4b5b74]">Use square or portrait images when possible. The public cards keep every teacher image the same size.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="surface-card rounded-[1.5rem] p-5">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-[#e8f0fb] text-[#1f5fa6]">{icon}</div>
      <p className="text-3xl font-black text-[#1c2b47]">{value.toLocaleString()}</p>
      <p className="mt-1 text-sm font-semibold text-[#4b5b74]">{label}</p>
    </div>
  );
}

function Revenue({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="surface-card rounded-[1.5rem] p-5">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-[#eef3f9] text-[#1c2b47]">
        <DollarSign size={20} />
      </div>
      <h2 className="text-lg font-black text-[#1c2b47]">{title}</h2>
      <div className="mt-3 space-y-2 text-sm font-semibold text-[#4b5b74]">
        {lines.map((line) => <p key={line}>{line}</p>)}
      </div>
    </div>
  );
}
