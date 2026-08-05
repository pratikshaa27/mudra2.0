import React from 'react';
import { useRole } from '../RoleContext';

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <div className="inline-flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
      <span className="text-slate-500 dark:text-slate-400">Role:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-transparent text-slate-900 dark:text-white font-extrabold focus:outline-none cursor-pointer"
      >
        <option value="applicant">Entrepreneur / Applicant</option>
        <option value="banker">Bank Officer</option>
        <option value="admin">System Admin</option>
      </select>
    </div>
  );
}
