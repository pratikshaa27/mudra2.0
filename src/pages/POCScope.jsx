import React from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { FileCheck, CheckCircle, Rocket, Target, Users } from 'lucide-react';

function POCScopeContent() {
  const achievements = [
    'End-to-end entrepreneur journey (onboarding → training → scoring → loan → repayment)',
    'Explainable AI credit scoring (not a black box)',
    'Skill India integration showing training impact on eligibility',
    'Smart loan recommendations based on AI + skills + business maturity',
    'Fraud detection with real-time alerts',
    'Bank officer workflow with AI-assisted decisions',
    'Government dashboard with analytics and policy insights',
    'Multi-channel notifications (SMS/WhatsApp/Email)',
    'Digital loan passbook for repayment tracking',
    'Mobile-first design with regional language support',
    'Complete audit trail and RBAC implementation',
    'Security and compliance transparency'
  ];

  const nextSteps = [
    {
      phase: 'Phase 1: Integration',
      items: [
        'Integrate with Skill India API for real training data',
        'Connect to CIBIL/credit bureau APIs',
        'Integrate with core banking systems',
        'Setup SMS/WhatsApp gateways'
      ]
    },
    {
      phase: 'Phase 2: AI Enhancement',
      items: [
        'Train ML models on historical MUDRA loan data',
        'Implement real fraud detection algorithms',
        'Build predictive analytics for default risk',
        'Create personalized recommendation engine'
      ]
    },
    {
      phase: 'Phase 3: Scale & Deploy',
      items: [
        'Multi-state rollout with regional customization',
        'Bank onboarding and training',
        'Mobile app development (iOS + Android)',
        'Helpdesk and support infrastructure'
      ]
    }
  ];

  const stakeholderBenefits = [
    {
      stakeholder: 'Micro-Entrepreneurs',
      icon: Users,
      benefits: [
        'Faster loan approvals (4 days vs 15+ days)',
        'Transparent eligibility criteria',
        'Skill development linked to credit access',
        'Digital convenience - less branch visits'
      ],
      color: 'blue'
    },
    {
      stakeholder: 'Banks & Financial Institutions',
      icon: Briefcase,
      benefits: [
        'Lower NPAs through better risk assessment',
        'Faster processing with automated validations',
        'Reduced fraud and duplicate applications',
        'Data-driven decision making'
      ],
      color: 'green'
    },
    {
      stakeholder: 'Government & MUDRA',
      icon: Target,
      benefits: [
        'Real-time policy monitoring and insights',
        'Better targeting of underserved districts',
        'Improved accountability with audit trails',
        'Inclusive growth through skill + credit linkage'
      ],
      color: 'red'
    }
  ];

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <FileCheck className="text-indigo-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">POC Scope & Next Steps</h2>
              <p className="text-indigo-100">What we've built and the roadmap ahead</p>
            </div>
          </div>
        </div>

        {/* What This POC Demonstrates */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-600" size={24} />
            What This POC Demonstrates
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
              >
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span className="text-sm text-gray-700">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stakeholder Benefits */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Stakeholder Benefits</h3>
          
          <div className="space-y-4">
            {stakeholderBenefits.map((stakeholder, idx) => {
              const Icon = stakeholder.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border-l-4 border-${stakeholder.color}-500 bg-${stakeholder.color}-50 rounded-lg p-4`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`text-${stakeholder.color}-600`} size={24} />
                    <h4 className="font-bold text-gray-800">{stakeholder.stakeholder}</h4>
                  </div>
                  <ul className="space-y-1.5 ml-2">
                    {stakeholder.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Rocket className="text-blue-600" size={24} />
            Implementation Roadmap
          </h3>
          
          <div className="space-y-4">
            {nextSteps.map((phase, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-800 mb-3">{phase.phase}</div>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6">
          <h3 className="font-bold mb-4 text-xl">Key Differentiators of MUDRA 2.0</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-bold mb-2">🎯 Skills + Credit Linkage</div>
              <div className="text-sm text-green-100">
                First-of-its-kind integration showing how training improves creditworthiness
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-bold mb-2">🧠 Explainable AI</div>
              <div className="text-sm text-green-100">
                Transparent scoring with plain-language explanations - no black box
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-bold mb-2">📱 Mobile-First Inclusion</div>
              <div className="text-sm text-green-100">
                Regional language support and low-tech friendly design for rural reach
              </div>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function POCScope() {
  return (
    <RoleProvider>
      <POCScopeContent />
    </RoleProvider>
  );
}