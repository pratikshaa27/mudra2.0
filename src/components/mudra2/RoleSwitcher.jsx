import React, { useState } from 'react';
import { useRole } from '../RoleContext';
import { ChevronDown, User, Briefcase, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoleSwitcher() {
  const { currentRole, setCurrentRole, roles } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const roleIcons = {
    entrepreneur: User,
    bank: Briefcase,
    admin: Shield
  };

  const currentRoleData = roles[currentRole];
  const Icon = roleIcons[currentRole];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="text-2xl">{currentRoleData.avatar}</div>
        <div className="text-left">
          <div className="text-sm font-semibold text-gray-800">{currentRoleData.name}</div>
          <div className="text-xs text-gray-500">{currentRoleData.type}</div>
        </div>
        <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="p-3 border-b border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase">Switch Role</div>
            </div>
            <div className="p-2">
              {Object.entries(roles).map(([key, role]) => {
                const RoleIcon = roleIcons[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentRole(key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                      currentRole === key ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                  >
                    <div className="text-2xl">{role.avatar}</div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">{role.name}</span>
                        {currentRole === key && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Active</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{role.type}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {role.district || role.bank || role.department}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}