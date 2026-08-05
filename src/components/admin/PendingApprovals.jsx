import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PendingApprovals() {
  const [pendingCount, setPendingCount] = useState(0);
  const [underReviewCount, setUnderReviewCount] = useState(0);

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    try {
      const submitted = await base44.entities.LoanApplication.filter({ status: 'submitted' });
      const underReview = await base44.entities.LoanApplication.filter({ status: 'under_review' });
      setPendingCount(submitted.length);
      setUnderReviewCount(underReview.length);
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg p-6"
    >
      <div className="flex items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <AlertCircle className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Pending Actions</h3>
            <p className="text-sm text-gray-600 mt-1">
              {pendingCount} new applications • {underReviewCount} under review
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-500" size={20} />
            <p className="text-sm font-semibold text-gray-700">New Submissions</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="text-blue-500" size={20} />
            <p className="text-sm font-semibold text-gray-700">Under Review</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">{underReviewCount}</p>
        </div>
      </div>
    </motion.div>
  );
}