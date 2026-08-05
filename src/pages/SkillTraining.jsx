import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Award, BookOpen, TrendingUp, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="text-orange-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Skill India Training Module</h2>
              <p className="text-orange-100">Build skills + improve loan eligibility</p>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Impact Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-600" size={24} />
            <div>
              <div className="font-semibold text-gray-800">Training Improves Eligibility</div>
              <div className="text-sm text-gray-600">Capital + Capability = Better Success Outcomes</div>
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
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
            >
              {/* Status Badge */}
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
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

              <h4 className="font-bold text-gray-800 mb-2">{training.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{training.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock size={14} />
                    {training.duration}
                  </span>
                  <span className="text-gray-600 flex items-center gap-2">
                    <BookOpen size={14} />
                    {training.modules} modules
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{training.progress}%</span>
                  </div>
                  <Progress value={training.progress} className="h-2" />
                </div>

                <div className="bg-green-50 rounded p-2 text-xs text-green-700 font-semibold">
                  {training.impact}
                </div>

                {training.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <CheckCircle size={16} />
                    Completed • Certificate Earned
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    size="sm"
                  >
                    <PlayCircle size={16} className="mr-2" />
                    {training.status === 'in_progress' ? 'Continue Training' : 'Start Training'}
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Earned Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainings.filter(t => t.certificate).map((training, idx) => (
              <div key={idx} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center gap-3">
                  <Award className="text-green-600" size={32} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{training.title}</div>
                    <div className="text-xs text-gray-600">Certified by Skill India</div>
                    <div className="text-xs text-gray-500 mt-1">Issued: Jan 15, 2026</div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Better success outcomes:</strong> Training improves business viability</li>
                <li>• <strong>Higher credit scores:</strong> Certified skills boost eligibility</li>
                <li>• <strong>Reduced defaults:</strong> Financial literacy leads to better repayment</li>
                <li>• <strong>Inclusive growth:</strong> Skill + capital empowerment model</li>
              </ul>
            </div>
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