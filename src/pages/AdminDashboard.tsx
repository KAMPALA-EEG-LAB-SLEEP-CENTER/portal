import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Search,
  Calendar as CalendarIcon,
  List,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarClock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Kampala EEG Original logo on white background copy.png";
import {
  UserPlus,
  X,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  Ban,
  PlayCircle,
  UserX,
} from "lucide-react";

interface Appointment {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  symptoms: string[];
  symptomDetails: string | null;
  medications: string | null;
  referralFilePath: string | null;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  today: number;
}

interface AdminListItem {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
}

const serviceLabels: Record<string, string> = {
  EEG_TEST: "EEG Test",
  SLEEP_STUDY: "Sleep Study",
  DEPRESSION_SCREEN: "Depression Screen",
  OTHER_CONSULTATION: "Other Consultation",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600",
  CONFIRMED: "bg-teal-50 text-[#0D9488]",
  COMPLETED: "bg-blue-50 text-blue-600",
  CANCELLED: "bg-red-50 text-red-500",
};

const toLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function AdminDashboard() {
  const { admin, token, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"table" | "calendar">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addAdminError, setAddAdminError] = useState("");
  const [addAdminSuccess, setAddAdminSuccess] = useState("");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [showManageAdmins, setShowManageAdmins] = useState(false);
  const [adminsList, setAdminsList] = useState<AdminListItem[]>([]);

  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showNewAdminPassword, setShowNewAdminPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatingAdminId, setUpdatingAdminId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isLoadingReferral, setIsLoadingReferral] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleViewReferral = async (id: string) => {
    setIsLoadingReferral(true);
    try {
      const res = await fetch(`${apiUrl}/appointments/${id}/referral-url`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to get referral file link");
      const data = await res.json();
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      alert("Could not open the referral file. Please try again.");
    } finally {
      setIsLoadingReferral(false);
    }
  };

  const fetchData = async () => {
    try {
      const [apptRes, statsRes] = await Promise.all([
        fetch(`${apiUrl}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/appointments/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (apptRes.status === 401 || statsRes.status === 401) {
        logout();
        navigate("/admin");
        return;
      }

      const apptData = await apptRes.json();
      const statsData = await statsRes.json();
      setAppointments(apptData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAdminStatus = async (
    adminId: string,
    status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED",
  ) => {
    setUpdatingAdminId(adminId);
    try {
      const res = await fetch(`${apiUrl}/auth/admins/${adminId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to update admin status");
      }
      fetchAdmins();
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to update admin status",
      );
    } finally {
      setUpdatingAdminId(null);
    }
  };

  const fetchAdmins = async () => {
    setIsLoadingAdmins(true);
    try {
      const res = await fetch(`${apiUrl}/auth/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch admins");
      const data = await res.json();
      setAdminsList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  const openManageAdmins = () => {
    setShowManageAdmins(true);
    fetchAdmins();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddAdminError("");
    setAddAdminSuccess("");
    setIsAddingAdmin(true);
    try {
      const res = await fetch(`${apiUrl}/auth/add-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAdminData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to add admin");
      }
      setAddAdminSuccess(
        `Admin "${newAdminData.name}" added successfully. Login credentials have been emailed to them.`,
      );
      setNewAdminData({ name: "", email: "", password: "" });
      fetchAdmins();
    } catch (err) {
      setAddAdminError(
        err instanceof Error ? err.message : "Failed to add admin",
      );
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await fetch(`${apiUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to change password");
      }
      setPasswordSuccess("Password changed successfully.");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Failed to change password",
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${apiUrl}/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const matchesSearch =
        appt.fullName.toLowerCase().includes(search.toLowerCase()) ||
        appt.email.toLowerCase().includes(search.toLowerCase()) ||
        appt.phoneNumber.includes(search);
      const matchesStatus =
        statusFilter === "ALL" || appt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / itemsPerPage),
  );

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(start, start + itemsPerPage);
  }, [filteredAppointments, currentPage]);

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    appointments.forEach((appt) => {
      const dateKey = toLocalDateKey(new Date(appt.preferredDate));
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(appt);
    });
    return map;
  }, [appointments]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const days: (Date | null)[] = Array(startOffset).fill(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [calendarMonth]);

  const statCards = stats
    ? [
        {
          label: "Total Appointments",
          value: stats.total,
          icon: Users,
          color: "bg-teal-50 text-[#0D9488]",
        },
        {
          label: "Today's Appointments",
          value: stats.today,
          icon: CalendarClock,
          color: "bg-blue-50 text-blue-600",
        },
        {
          label: "Pending",
          value: stats.pending,
          icon: Clock,
          color: "bg-amber-50 text-amber-600",
        },
        {
          label: "Confirmed",
          value: stats.confirmed,
          icon: CheckCircle2,
          color: "bg-teal-50 text-[#0D9488]",
        },
        {
          label: "Completed",
          value: stats.completed,
          icon: CheckCircle2,
          color: "bg-blue-50 text-blue-600",
        },
        {
          label: "Cancelled",
          value: stats.cancelled,
          icon: XCircle,
          color: "bg-red-50 text-red-500",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#0B1220] text-white flex-col hidden lg:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Kampala EEG Labs logo"
              className="h-9 w-auto object-contain"
            />
            <div>
              <p className="text-sm font-semibold">EEG &amp; Sleep Center</p>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/10 text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </div>
          <button
            onClick={() => setShowChangePassword(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors w-full mt-1"
          >
            <KeyRound className="w-4 h-4" />
            Change Password
          </button>
          {admin?.role === "SUPER_ADMIN" && (
            <>
              <button
                onClick={() => setShowAddAdmin(true)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors w-full mt-1"
              >
                <UserPlus className="w-4 h-4" />
                Add Admin
              </button>
              <button
                onClick={openManageAdmins}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors w-full mt-1"
              >
                <Users className="w-4 h-4" />
                Manage Admins
              </button>
            </>
          )}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-400 px-4 mb-2">{admin?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1220]">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage patient appointments and bookings.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="lg:hidden flex items-center gap-2 text-sm text-gray-500"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>

        {isLoading ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 mb-3" />
                  <div className="h-6 w-10 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-40 bg-gray-100 rounded-lg animate-pulse" />
              </div>
              <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 animate-pulse"
                  >
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-28 bg-gray-100 rounded" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                    <div className="h-4 w-36 bg-gray-100 rounded" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="bg-white rounded-xl shadow-sm p-4"
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${card.color} mb-3`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold text-[#0B1220]">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setView("table")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "table" ? "bg-white text-[#0B1220] shadow-sm" : "text-gray-500"}`}
                  >
                    <List className="w-4 h-4" />
                    Table
                  </button>
                  <button
                    onClick={() => setView("calendar")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "calendar" ? "bg-white text-[#0B1220] shadow-sm" : "text-gray-500"}`}
                  >
                    <CalendarIcon className="w-4 h-4" />
                    Calendar
                  </button>
                </div>

                {view === "table" && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name, email, phone..."
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] w-full sm:w-64"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                )}
              </div>

              {view === "table" ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                          <th className="pb-3 pr-4 font-medium">Patient</th>
                          <th className="pb-3 pr-4 font-medium">Service</th>
                          <th className="pb-3 pr-4 font-medium">
                            Date &amp; Time
                          </th>
                          <th className="pb-3 pr-4 font-medium">Contact</th>
                          <th className="pb-3 pr-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedAppointments.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="text-center text-gray-400 py-10"
                            >
                              No appointments found.
                            </td>
                          </tr>
                        ) : (
                          paginatedAppointments.map((appt) => (
                            <tr
                              key={appt.id}
                              onClick={() => setSelectedAppointment(appt)}
                              className="border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-4 pr-4">
                                <p className="font-medium text-[#0B1220]">
                                  {appt.fullName}
                                </p>
                              </td>
                              <td className="py-4 pr-4 text-gray-600">
                                {serviceLabels[appt.service] ?? appt.service}
                              </td>
                              <td className="py-4 pr-4 text-gray-600">
                                {new Date(
                                  appt.preferredDate,
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                                <br />
                                <span className="text-xs text-gray-400">
                                  {appt.preferredTime}
                                </span>
                              </td>
                              <td className="py-4 pr-4 text-gray-600">
                                {appt.phoneNumber}
                                <br />
                                <span className="text-xs text-gray-400">
                                  {appt.email}
                                </span>
                              </td>
                              <td
                                className="py-4 pr-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <select
                                  value={appt.status}
                                  disabled={updatingId === appt.id}
                                  onChange={(e) =>
                                    handleStatusChange(appt.id, e.target.value)
                                  }
                                  className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#0D9488] ${statusStyles[appt.status]}`}
                                >
                                  <option value="PENDING">Pending</option>
                                  <option value="CONFIRMED">Confirmed</option>
                                  <option value="COMPLETED">Completed</option>
                                  <option value="CANCELLED">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {filteredAppointments.length > 0 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Showing {(currentPage - 1) * itemsPerPage + 1}–
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredAppointments.length,
                        )}{" "}
                        of {filteredAppointments.length}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-medium text-gray-600 px-2">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() =>
                        setCalendarMonth(
                          new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth() - 1,
                            1,
                          ),
                        )
                      }
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-500" />
                    </button>
                    <p className="text-sm font-semibold text-[#0B1220]">
                      {calendarMonth.toLocaleDateString("en-GB", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <button
                      onClick={() =>
                        setCalendarMonth(
                          new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth() + 1,
                            1,
                          ),
                        )
                      }
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-400 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (d) => (
                        <div key={d}>{d}</div>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                      if (!day) return <div key={`empty-${index}`} />;
                      const dateKey = toLocalDateKey(day);
                      const dayAppointments = appointmentsByDate[dateKey] ?? [];
                      const isToday = dateKey === toLocalDateKey(new Date());
                      return (
                        <div
                          key={dateKey}
                          className={`min-h-[80px] rounded-lg border p-2 ${isToday ? "border-[#0D9488] bg-teal-50" : "border-gray-100"}`}
                        >
                          <p
                            className={`text-xs font-medium mb-1 ${isToday ? "text-[#0D9488]" : "text-gray-500"}`}
                          >
                            {day.getDate()}
                          </p>
                          {dayAppointments.slice(0, 2).map((appt) => (
                            <p
                              key={appt.id}
                              className="text-[10px] truncate bg-white rounded px-1.5 py-0.5 mb-1 text-gray-600"
                            >
                              {appt.fullName}
                            </p>
                          ))}
                          {dayAppointments.length > 2 && (
                            <p className="text-[10px] text-gray-400">
                              +{dayAppointments.length - 2} more
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {showAddAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddAdmin(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <button
              onClick={() => setShowAddAdmin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-[#0B1220] mb-1">
              Add New Admin
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Create a new admin account with dashboard access.
            </p>
            <form onSubmit={handleAddAdmin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newAdminData.name}
                  onChange={(e) =>
                    setNewAdminData({ ...newAdminData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={newAdminData.email}
                  onChange={(e) =>
                    setNewAdminData({ ...newAdminData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showNewAdminPassword ? "text" : "password"}
                    value={newAdminData.password}
                    onChange={(e) =>
                      setNewAdminData({
                        ...newAdminData,
                        password: e.target.value,
                      })
                    }
                    required
                    minLength={8}
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewAdminPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showNewAdminPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {addAdminError && (
                <p className="text-xs text-red-500">{addAdminError}</p>
              )}
              {addAdminSuccess && (
                <p className="text-xs text-[#0D9488]">{addAdminSuccess}</p>
              )}
              <button
                type="submit"
                disabled={isAddingAdmin}
                className="bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isAddingAdmin ? "Adding..." : "Add Admin"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showManageAdmins && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowManageAdmins(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowManageAdmins(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-[#0B1220] mb-1">
              Manage Admins
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              All admin accounts with dashboard access.
            </p>

            {isLoadingAdmins ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 bg-gray-100 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {adminsList.map((a) => {
                  const isSelf = a.id === admin?.id;
                  const isSuperAdmin = a.role === "SUPER_ADMIN";
                  const isUpdating = updatingAdminId === a.id;

                  return (
                    <div
                      key={a.id}
                      className="flex flex-col gap-3 p-3 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-50 shrink-0">
                            {isSuperAdmin ? (
                              <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                            ) : (
                              <Users className="w-4 h-4 text-[#0D9488]" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0B1220]">
                              {a.name}
                            </p>
                            <p className="text-xs text-gray-500">{a.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${isSuperAdmin ? "bg-teal-50 text-[#0D9488]" : "bg-gray-100 text-gray-600"}`}
                          >
                            {isSuperAdmin ? "Super Admin" : "Admin"}
                          </span>
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              a.status === "ACTIVE"
                                ? "bg-teal-50 text-[#0D9488]"
                                : a.status === "SUSPENDED"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-red-50 text-red-500"
                            }`}
                          >
                            {a.status === "ACTIVE"
                              ? "Active"
                              : a.status === "SUSPENDED"
                                ? "Suspended"
                                : "Deactivated"}
                          </span>
                        </div>
                      </div>

                      {!isSelf && !isSuperAdmin && (
                        <div className="flex gap-2 pt-2 border-t border-gray-50">
                          {a.status !== "ACTIVE" && (
                            <button
                              onClick={() =>
                                handleUpdateAdminStatus(a.id, "ACTIVE")
                              }
                              disabled={isUpdating}
                              className="flex items-center gap-1.5 text-xs font-medium text-[#0D9488] px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              Activate
                            </button>
                          )}
                          {a.status !== "SUSPENDED" && (
                            <button
                              onClick={() =>
                                handleUpdateAdminStatus(a.id, "SUSPENDED")
                              }
                              disabled={isUpdating}
                              className="flex items-center gap-1.5 text-xs font-medium text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              Suspend
                            </button>
                          )}
                          {a.status !== "DEACTIVATED" && (
                            <button
                              onClick={() =>
                                handleUpdateAdminStatus(a.id, "DEACTIVATED")
                              }
                              disabled={isUpdating}
                              className="flex items-center gap-1.5 text-xs font-medium text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                              <UserX className="w-3.5 h-3.5" />
                              Deactivate
                            </button>
                          )}
                        </div>
                      )}

                      {isSelf && (
                        <p className="text-xs text-gray-400 pt-2 border-t border-gray-50">
                          This is your account.
                        </p>
                      )}
                      {isSuperAdmin && !isSelf && (
                        <p className="text-xs text-gray-400 pt-2 border-t border-gray-50">
                          Super admin accounts cannot be modified.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowChangePassword(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <button
              onClick={() => setShowChangePassword(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-[#0B1220] mb-1">
              Change Password
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Update your admin account password.
            </p>
            <form
              onSubmit={handleChangePassword}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    minLength={8}
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-xs text-[#0D9488]">{passwordSuccess}</p>
              )}
              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isChangingPassword ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedAppointment(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold text-[#0B1220] mb-1">
              {selectedAppointment.fullName}
            </h3>
            <span
              className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-5 ${statusStyles[selectedAppointment.status]}`}
            >
              {selectedAppointment.status}
            </span>

            <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Date of Birth</p>
                <p className="text-[#0B1220]">
                  {new Date(selectedAppointment.dateOfBirth).toLocaleDateString(
                    "en-GB",
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Gender</p>
                <p className="text-[#0B1220]">{selectedAppointment.gender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                <p className="text-[#0B1220]">
                  {selectedAppointment.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <p className="text-[#0B1220] truncate">
                  {selectedAppointment.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Service</p>
                <p className="text-[#0B1220]">
                  {serviceLabels[selectedAppointment.service] ??
                    selectedAppointment.service}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Preferred Slot</p>
                <p className="text-[#0B1220]">
                  {new Date(
                    selectedAppointment.preferredDate,
                  ).toLocaleDateString("en-GB")}
                  {" · "}
                  {selectedAppointment.preferredTime}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-gray-400 mb-1.5">Symptoms</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedAppointment.symptoms.length > 0 ? (
                  selectedAppointment.symptoms.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-teal-50 text-[#0D9488] px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">None selected</p>
                )}
              </div>
            </div>

            {selectedAppointment.symptomDetails && (
              <div className="mb-5">
                <p className="text-xs text-gray-400 mb-1">Symptom Details</p>
                <p className="text-sm text-gray-700">
                  {selectedAppointment.symptomDetails}
                </p>
              </div>
            )}

            {selectedAppointment.medications && (
              <div className="mb-5">
                <p className="text-xs text-gray-400 mb-1">Medications</p>
                <p className="text-sm text-gray-700">
                  {selectedAppointment.medications}
                </p>
              </div>
            )}

            {selectedAppointment.referralFilePath && (
              <button
                onClick={() => handleViewReferral(selectedAppointment.id)}
                disabled={isLoadingReferral}
                className="flex items-center gap-2 bg-[#0D9488] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full justify-center"
              >
                {isLoadingReferral ? "Opening..." : "View Referral File"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
