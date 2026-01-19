"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Search,
  Plus,
  User,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Briefcase,
  Star,
  CheckCircle2,
  X,
  Edit,
  Trash2,
} from "lucide-react";
import mockData from "../../mockData.json";

// Types
type Employee = (typeof mockData.employees)[0];

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(mockData.employees);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, employees]);

  // Handlers
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEmp: any = {
      _id: `emp${Date.now()}`,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      designation: formData.get("designation"),
      commissionRate: Number(formData.get("commissionRate")),
      isActive: true,
      workingSchedule: {}, // Mock empty schedule
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEmployees([newEmp, ...employees]);
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Staff Management
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Manage your team and schedules
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-teal-200 dark:shadow-none"
          >
            <Plus size={18} />
            Add Staff Member
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-96 dark:bg-slate-900 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search staff by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto pb-6 custom-scrollbar pr-2">
          {filteredEmployees.map((emp) => (
            <div
              key={emp._id}
              className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="h-24 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-80" />

              <div className="px-6 -mt-10 mb-4 flex justify-between items-end">
                <div className="h-20 w-20 rounded-2xl bg-white p-1 shadow-sm dark:bg-slate-900">
                  <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-2xl dark:bg-slate-800">
                    {emp.name.charAt(0)}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${emp.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30" : "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800 dark:text-slate-400"}`}
                >
                  {emp.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="px-6 pb-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {emp.name}
                </h3>
                <p className="text-sm font-medium text-teal-600 mb-4 dark:text-teal-400">
                  {emp.designation}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Mail
                      size={16}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Phone
                      size={16}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <span>{emp.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Star
                      size={16}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <span>{emp.commissionRate}% Commission</span>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium text-xs hover:bg-teal-50 hover:text-teal-600 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400">
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium text-xs hover:bg-red-50 hover:text-red-500 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
              <h3 className="text-xl font-bold dark:text-white">
                Add Team Member
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Role
                  </label>
                  <select
                    name="designation"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="THERAPIST">Therapist</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="RECEPTIONIST">Receptionist</option>
                    <option value="MANAGER">Manager</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Commission (%)
                  </label>
                  <input
                    name="commissionRate"
                    required
                    type="number"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    defaultValue={0}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Phone
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-200 dark:shadow-none"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
