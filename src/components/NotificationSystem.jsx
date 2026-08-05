import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Application Approved',
      message: 'Your loan application has been approved. Funds will be disbursed within 2-3 business days.',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Document Required',
      message: 'Please upload your bank statements for the past 6 months to proceed.',
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: 3,
      type: 'alert',
      title: 'Action Required',
      message: 'Your application status update is pending. Please review and confirm.',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClose = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="text-green-600" size={20} />;
      case 'alert': return <AlertCircle className="text-red-600" size={20} />;
      case 'info': return <Info className="text-blue-600" size={20} />;
      default: return <Bell className="text-gray-600" size={20} />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'alert': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Bell size={24} className="text-red-700" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-16 right-0 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Notifications</h3>
                <p className="text-sm text-red-100">{unreadCount} unread</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-red-700 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`p-4 border-l-4 ${getBgColor(notif.type)} ${!notif.read ? 'border-l-red-600 bg-opacity-50' : 'border-l-gray-300'} cursor-pointer hover:bg-opacity-100 transition-all`}
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm">{notif.title}</h4>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{notif.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{formatTime(notif.timestamp)}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClose(notif.id);
                          }}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={32} className="mx-auto mb-2 opacity-30" />
                  <p>No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-gray-200 p-3 bg-gray-50">
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-red-700 hover:text-red-800 font-semibold w-full text-center"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}