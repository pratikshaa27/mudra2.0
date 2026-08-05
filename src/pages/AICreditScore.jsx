import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, TrendingDown, Info, Sliders } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

function AICreditScoreContent() {
  const [monthlyInflow, setMonthlyInflow] = useState(31500);
  const [existingEMI, setExistingEMI] = useState(1250);
  const [trainingCompleted, setTrainingCompleted] = useState(true);

  const calculateScore = () => {
    let baseScore = 550;
    
    // Skills & certification
    if (trainingCompleted) baseScore += 130;
    
    // Monthly inflow stability
    if (monthlyInflow >= 30000) baseScore += 120;
    else if (monthlyInflow >= 20000) baseScore += 80;
    else baseScore += 40;
    
    // Existing EMI burden
    if (existingEMI < 2000) baseScore += 50;
    else if (existingEMI < 5000) baseScore += 20;
    else baseScore -= 30;
    
    // Repayment capacity
    const capacity = monthlyInflow - existingEMI;
    if (capacity >= 25000) baseScore += 70;
    else if (capacity >= 15000) baseScore += 40;
    
    // Document completeness
    baseScore += 30;
    
    return Math.min(900, Math.max(300, baseScore));
  };

  const score = calculateScore();

  const scoreFactors = [
    {
      factor: 'Skills & Certification Readiness',
      value: trainingCompleted ? '+130' : '+0',
      status: trainingCompleted ? 'positive' : 'neutral',
      explanation: trainingCompleted 
        ? 'Completed 2 Skill India certifications' 
        : 'No training completed yet'
    },
    {
      factor: 'Monthly Inflow Stability',
      value: monthlyInflow >= 30000 ? '+120' : monthlyInflow >= 20000 ? '+80' : '+40',
      status: 'positive',
      explanation: `Consistent income of ₹${monthlyInflow.toLocaleString('en-IN')}/month`
    },
    {
      factor: 'Existing EMI Burden',
      value: existingEMI < 2000 ? '+50' : existingEMI < 5000 ? '+20' : '-30',
      status: existingEMI < 5000 ? 'positive' : 'negative',
      explanation: `Current EMI: ₹${existingEMI.toLocaleString('en-IN')}/month - ${existingEMI < 5000 ? 'Manageable' : 'High burden'}`
    },
    {
      factor: 'Repayment Capacity',
      value: (monthlyInflow - existingEMI) >= 25000 ? '+70' : '+40',
      status: 'positive',
      explanation: `Available surplus: ₹${(monthlyInflow - existingEMI).toLocaleString('en-IN')}/month`
    },
    {
      factor: 'Document Completeness',
      value: '+30',
      status: 'positive',
      explanation: 'All required documents verified (Aadhar, Bank, PAN)'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-blue-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Brain className="text-purple-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">AI Credit Score & Eligibility</h2>
              <p className="text-purple-100">Transparent, explainable, and fair credit assessment</p>
            </div>
          </div>
        </div>

        {/* Credit Score Display */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-600 mb-2">Your AI Credit Score</div>
            <div className={`text-7xl font-bold ${getScoreColor(score)} mb-2`}>{score}</div>
            <div className="text-gray-500 text-lg">out of 900</div>
            <div className={`inline-block px-4 py-2 rounded-full mt-3 ${
              score >= 750 ? 'bg-green-100 text-green-700' :
              score >= 650 ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {getScoreGrade(score)}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Progress value={(score / 900) * 100} className="h-4" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>300</span>
              <span>600</span>
              <span>900</span>
            </div>
          </div>
        </div>

        {/* Plain Language Explanation */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-3">
            <Info className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Plain Language Explanation</h3>
              <p className="text-sm text-gray-700">
                Your score is <strong>strong</strong> because you completed relevant training, show steady income inflows, 
                and have manageable liabilities. Your repayment capacity is healthy with ₹{(monthlyInflow - existingEMI).toLocaleString('en-IN')} 
                available after existing EMI.
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Brain size={20} />
            Score Explanation - Detailed Breakdown
          </h3>
          
          <div className="space-y-4">
            {scoreFactors.map((factor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  factor.status === 'positive' ? 'bg-green-100' : 
                  factor.status === 'negative' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <span className={`text-xl font-bold ${
                    factor.status === 'positive' ? 'text-green-600' : 
                    factor.status === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {factor.value}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-1">{factor.factor}</div>
                  <div className="text-sm text-gray-600">{factor.explanation}</div>
                </div>
                {factor.status === 'positive' ? (
                  <TrendingUp className="text-green-600" size={20} />
                ) : factor.status === 'negative' ? (
                  <TrendingDown className="text-red-600" size={20} />
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>

        {/* What-If Simulation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sliders size={20} />
            What-If Simulation (Interactive)
          </h3>
          
          <div className="space-y-6">
            {/* Monthly Inflow Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Monthly Inflow</label>
                <span className="text-sm font-bold text-gray-800">₹{monthlyInflow.toLocaleString('en-IN')}</span>
              </div>
              <Slider
                value={[monthlyInflow]}
                onValueChange={(val) => setMonthlyInflow(val[0])}
                min={10000}
                max={100000}
                step={1000}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹10,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Existing EMI Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Existing EMI</label>
                <span className="text-sm font-bold text-gray-800">₹{existingEMI.toLocaleString('en-IN')}</span>
              </div>
              <Slider
                value={[existingEMI]}
                onValueChange={(val) => setExistingEMI(val[0])}
                min={0}
                max={20000}
                step={500}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹0</span>
                <span>₹20,000</span>
              </div>
            </div>

            {/* Training Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-700">Training Completed</div>
                <div className="text-xs text-gray-500">2 Skill India certifications</div>
              </div>
              <button
                onClick={() => setTrainingCompleted(!trainingCompleted)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  trainingCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {trainingCompleted ? 'Yes' : 'No'}
              </button>
            </div>

            {/* Updated Score */}
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-4 border-2 border-purple-300">
              <div className="text-sm text-gray-700 mb-2">Updated Score Based on Changes:</div>
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score} / 900</div>
            </div>
          </div>
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Transparent scoring:</strong> No black box - see exactly how your score is calculated</li>
                <li>• <strong>Fair assessment:</strong> Multiple factors considered, not just credit history</li>
                <li>• <strong>Confidence building:</strong> Understand your strengths and improvement areas</li>
                <li>• <strong>Actionable insights:</strong> What-if scenarios help you plan improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function AICreditScore() {
  return (
    <RoleProvider>
      <AICreditScoreContent />
    </RoleProvider>
  );
}