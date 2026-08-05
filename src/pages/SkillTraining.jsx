import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Award, BookOpen, TrendingUp, PlayCircle, GraduationCap } from 'lucide-react';

function SkillTrainingContent() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const trainings = [
    {
      id: 1,
      title: 'Entrepreneurship Basics',
      category: 'Mandatory',
      duration: '4 hours',
      status: 'completed',
      progress: 100,
      certificate: true,
      impact: '+50 points to credit score',
      modules: 4,
      description: 'Business planning, financial literacy, market research'
    },
    {
      id: 2,
      title: 'Food Processing & Packaging',
      category: 'Sector-Specific',
      duration: '8 hours',
      status: 'completed',
      progress: 100,
      certificate: true,
      impact: '+80 points to credit score',
      modules: 6,
      description: 'Food safety, packaging standards, quality control'
    },
    {
      id: 3,
      title: 'Digital Payments Basics',
      category: 'Optional',
      duration: '2 hours',
      status: 'in_progress',
      progress: 60,
      certificate: false,
      impact: '+30 points on completion',
      modules: 3,
      description: 'UPI, QR codes, digital wallets, online transactions'
    },
    {
      id: 4,
      title: 'GST & Compliance for MSMEs',
      category: 'Recommended',
      duration: '3 hours',
      status: 'not_started',
      progress: 0,
      certificate: false,
      impact: '+40 points on completion',
      modules: 4,
      description: 'GST registration, filing, invoicing, compliance basics'
    }
  ];

  const overallProgress = Math.round(
    trainings.reduce((sum, t) => sum + t.progress, 0) / trainings.length
  );

  const completedCount = trainings.filter(t => t.status === 'completed').length;

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-inner">
              <GraduationCap className="text-orange-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Skill India Training Module</h2>
              <p className="text-orange-100 text-sm">Build skills + improve loan eligibility</p>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Your Training Progress</h3>
              <p className="text-sm text-gray-600">{completedCount} of {trainings.length} courses completed</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{overallProgress}%</div>
              <div className="text-xs text-gray-500">Overall Progress</div>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="bg-green-600 h-full rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>

        {/* Impact Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-600" size={24} />
            <div>
              <div className="font-semibold text-gray-800 text-sm">Training Improves Eligibility</div>
              <div className="text-xs text-gray-600">Capital + Capability = Better Success Outcomes</div>
            </div>
          </div>
        </div>

        {/* Training Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {trainings.map((training, idx) => (
            <motion.div
              key={training.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              {/* Status Badge */}
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  training.status === 'completed' ? 'bg-green-100 text-green-700' :
                  training.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {training.category}
                </span>
                {training.certificate && (
                  <Award className="text-yellow-500" size={20} />
                )}
              </div>

              <h4 className="font-bold text-gray-800 mb-1 text-base">{training.title}</h4>
              <p className="text-xs text-gray-600 mb-4">{training.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {training.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={14} />
                    {training.modules} modules
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{training.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full transition-all duration-500" style={{ width: `${training.progress}%` }}></div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-2 text-xs text-green-700 font-semibold">
                  {training.impact}
                </div>

                {training.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-green-600 text-xs font-semibold pt-1">
                    <CheckCircle size={16} />
                    Completed • Certificate Earned
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <PlayCircle size={16} />
                    {training.status === 'in_progress' ? 'Continue Training' : 'Start Training'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-base">Earned Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainings.filter(t => t.certificate).map((training, idx) => (
              <div key={idx} className="border-2 border-green-200 rounded-2xl p-4 bg-green-50/60">
                <div className="flex items-center gap-3">
                  <Award className="text-green-600 shrink-0" size={32} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm">{training.title}</div>
                    <div className="text-xs text-gray-600">Certified by Skill India</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">Issued: Jan 15, 2026</div>
                  </div>
                  <button type="button" className="px-3 py-1.5 border border-green-600 text-green-700 bg-white rounded-xl text-xs font-semibold hover:bg-green-50">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function SkillTraining() {
  return (
    <RoleProvider>
      <SkillTrainingContent />
    </RoleProvider>
  );
}