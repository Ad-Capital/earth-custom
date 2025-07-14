'use client';

import { useSession, signOut } from "next-auth/react";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <div className="flex justify-center items-center h-screen">Access denied. Please&nbsp;<a href="/admin/login" className="text-blue-500">log in</a>.</div>;
  }

  return (
    <div>
      <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 m-2 rounded">
        Logout
      </button>
      <AdminDashboard />
    </div>
  );
}
