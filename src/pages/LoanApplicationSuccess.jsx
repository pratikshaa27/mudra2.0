import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, FileText } from 'lucide-react';
import { createPageUrl } from '@/utils';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

export default function LoanApplicationSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto redirect after 8 seconds
      // navigate(createPageUrl('Home'));
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Success Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle size={56} className="text-white" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-green-700 mb-4"
          >
            Application Submitted Successfully!
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Your loan application has been received and is now under review. We'll contact you shortly with updates on your application status.
          </motion.p>

          {/* Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 mb-8 border border-green-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">What Happens Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Document Verification</h3>
                  <p className="text-sm text-gray-600 mt-1">Our team will verify the information provided in your application.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Credit Assessment</h3>
                  <p className="text-sm text-gray-600 mt-1">We'll assess your creditworthiness and loan eligibility (5-7 business days).</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Approval & Disbursement</h3>
                  <p className="text-sm text-gray-600 mt-1">Once approved, funds will be disbursed to your bank account.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200 text-left"
          >
            <h3 className="font-bold text-blue-900 mb-4">Keep This Information Safe</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>✓ Check your email regularly for updates from our team</p>
              <p>✓ You can track your application status on the portal</p>
              <p>✓ Average processing time is 5-7 business days</p>
              <p>✓ Contact us if you have any questions</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate(createPageUrl('Home'))}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-700 to-red-800 text-white font-bold rounded-lg hover:from-red-800 hover:to-red-900 transition-all shadow-lg"
            >
              <Home size={20} />
              Back to Home
            </button>
            <button
              onClick={() => navigate(createPageUrl('Dashboard'))}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
            >
              <FileText size={20} />
              View Dashboard
            </button>
          </motion.div>

          {/* Support Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600 text-sm mb-4">Need assistance? Contact our support team</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-700">
              <span>📧 support@mudra.gov.in</span>
              <span>|</span>
              <span>📞 1800-180-1111</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}