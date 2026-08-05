import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle, IndianRupee, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

function LoanRecommendationsContent() {
  const [showComparison, setShowComparison] = useState(false);

  const loanProducts = [
    {
      name: 'Shishu',
      maxAmount: 50000,
      tenure: '12-36 months',
      interestRate: '8-10%',
      recommended: false,
      reasons: ['Amount too low for business expansion', 'Training level exceeds scheme'],
      score: 65
    },
    {
      name: 'Kishor',
      maxAmount: 500000,
      tenure: '12-60 months',
      interestRate: '9-12%',
      recommended: true,
      recommendedAmount: 200000,
      recommendedTenure: 24,
      reasons: [
        'Matches business maturity (2 years experience)',
        'EMI comfort zone (₹10,500/month fits your capacity)',
        'Lower default risk based on training + income stability',
        'Ideal for food processing equipment purchase'
      ],
      score: 92
    },
    {
      name: 'Tarun',
      maxAmount: 1000000,
      tenure: '36-84 months',
      interestRate: '10-14%',
      recommended: false,
      reasons: ['Monthly income below recommended threshold', 'Business experience requirement not met'],
      score: 48
    }
  ];

  const recommended = loanProducts.find(p => p.recommended);

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Lightbulb className="text-indigo-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Smart Loan Recommendation Engine</h2>
              <p className="text-indigo-100">AI-matched loan products based on your profile</p>
            </div>
          </div>
        </div>

        {/* Recommended Loan Highlight */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-yellow-300" size={32} />
            <div>
              <div className="text-sm text-green-100">Best Match for You</div>
              <div className="text-2xl font-bold">Recommended: {recommended.name} Loan</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm text-green-100">Loan Amount</div>
              <div className="text-xl font-bold">₹{recommended.recommendedAmount.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm text-green-100">Tenure</div>
              <div className="text-xl font-bold">{recommended.recommendedTenure} months</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm text-green-100">Monthly EMI</div>
              <div className="text-xl font-bold">~₹10,500</div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="font-semibold mb-2">Why This Loan is Right for You:</div>
            <div className="space-y-1.5">
              {recommended.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-200 mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compare Options */}
        <div className="text-center mb-6">
          <Button
            onClick={() => setShowComparison(!showComparison)}
            variant="outline"
            className="border-2"
          >
            {showComparison ? 'Hide' : 'Show'} All Loan Options Comparison
          </Button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-hidden"
          >
            <h3 className="font-bold text-gray-800 mb-4">Loan Product Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Scheme</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Max Amount</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Tenure</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Interest Rate</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Match Score</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loanProducts.map((product, idx) => (
                    <tr key={idx} className={`border-b ${product.recommended ? 'bg-green-50' : ''}`}>
                      <td className="p-3 font-semibold">{product.name}</td>
                      <td className="p-3">₹{product.maxAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3">{product.tenure}</td>
                      <td className="p-3">{product.interestRate}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                product.score >= 80 ? 'bg-green-500' :
                                product.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${product.score}%` }}
                            />
                          </div>
                          <span className="font-semibold">{product.score}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {product.recommended ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            ✓ Recommended
                          </span>
                        ) : (
                          <span className="text-gray-500 text-xs">Not suitable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reasons for Non-Recommended */}
            <div className="mt-4 space-y-3">
              {loanProducts.filter(p => !p.recommended).map((product, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3">
                  <div className="font-semibold text-gray-800 mb-1">{product.name} - Not Recommended</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {product.reasons.map((r, i) => (
                      <div key={i}>• {r}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Right loan for the right borrower:</strong> AI matches you to suitable products</li>
                <li>• <strong>Reduced rejection risk:</strong> Apply for loans you're likely to get</li>
                <li>• <strong>Optimal EMI planning:</strong> Recommendations fit your repayment capacity</li>
                <li>• <strong>Transparent reasoning:</strong> Understand why each loan is or isn't recommended</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function LoanRecommendations() {
  return (
    <RoleProvider>
      <LoanRecommendationsContent />
    </RoleProvider>
  );
}