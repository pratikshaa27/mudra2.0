import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { FileText, Loader, Brain, TrendingUp, TrendingDown, Info, CheckCircle, ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import DocumentUploader from '../components/DocumentUploader';

export default function LoanApplication() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [creditScore, setCreditScore] = useState(null);
  const [scoreBreakdown, setScoreBreakdown] = useState([]);
  const [documents, setDocuments] = useState({
    aadharDoc: null,
    panDoc: null,
    bankStatement: null,
    businessProof: null
  });

  const handleDocumentUpload = (docType, fileUri, fileName) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: { uri: fileUri, name: fileName }
    }));
  };
  
  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm({
    defaultValues: {
      applicantName: '',
      email: '',
      phone: '',
      address: '',
      loanAmount: '',
      loanPurpose: 'business_expansion',
      monthlyIncome: '',
      employmentStatus: 'self_employed',
      businessType: '',
      experienceYears: '',
      existingEMI: '',
      hasTraining: 'yes'
    }
  });

  const calculateCreditScore = (data) => {
    let baseScore = 550;
    const monthlyIncome = parseFloat(data.monthlyIncome) || 0;
    const existingEMI = parseFloat(data.existingEMI) || 0;
    const hasTraining = data.hasTraining === 'yes';
    
    const breakdown = [];

    // Skills & certification
    if (hasTraining) {
      baseScore += 130;
      breakdown.push({
        factor: 'Skills & Certification Readiness',
        value: '+130',
        status: 'positive',
        explanation: 'Completed Skill India certifications'
      });
    } else {
      breakdown.push({
        factor: 'Skills & Certification Readiness',
        value: '+0',
        status: 'neutral',
        explanation: 'No training completed yet'
      });
    }
    
    // Monthly inflow stability
    let incomePoints = 0;
    if (monthlyIncome >= 30000) incomePoints = 120;
    else if (monthlyIncome >= 20000) incomePoints = 80;
    else incomePoints = 40;
    baseScore += incomePoints;
    breakdown.push({
      factor: 'Monthly Inflow Stability',
      value: `+${incomePoints}`,
      status: 'positive',
      explanation: `Consistent income of ₹${monthlyIncome.toLocaleString('en-IN')}/month`
    });
    
    // Existing EMI burden
    let emiPoints = 0;
    if (existingEMI < 2000) emiPoints = 50;
    else if (existingEMI < 5000) emiPoints = 20;
    else emiPoints = -30;
    baseScore += emiPoints;
    breakdown.push({
      factor: 'Existing EMI Burden',
      value: emiPoints > 0 ? `+${emiPoints}` : `${emiPoints}`,
      status: emiPoints > 0 ? 'positive' : 'negative',
      explanation: `Current EMI: ₹${existingEMI.toLocaleString('en-IN')}/month - ${existingEMI < 5000 ? 'Manageable' : 'High burden'}`
    });
    
    // Repayment capacity
    const capacity = monthlyIncome - existingEMI;
    const capacityPoints = capacity >= 25000 ? 70 : capacity >= 15000 ? 40 : 20;
    baseScore += capacityPoints;
    breakdown.push({
      factor: 'Repayment Capacity',
      value: `+${capacityPoints}`,
      status: 'positive',
      explanation: `Available surplus: ₹${capacity.toLocaleString('en-IN')}/month`
    });
    
    // Document completeness
    baseScore += 30;
    breakdown.push({
      factor: 'Document Completeness',
      value: '+30',
      status: 'positive',
      explanation: 'Ready to verify (Aadhar, Bank, PAN)'
    });
    
    const finalScore = Math.min(900, Math.max(300, baseScore));
    return { score: finalScore, breakdown };
  };

  const handleStepOneSubmit = () => {
    const data = getValues();
    const { score, breakdown } = calculateCreditScore(data);
    setCreditScore(score);
    setScoreBreakdown(breakdown);
    setCurrentStep(2);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await base44.entities.LoanApplication.create({
      applicantName: data.applicantName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      loanAmount: parseFloat(data.loanAmount),
      loanPurpose: data.loanPurpose,
      monthlyIncome: parseFloat(data.monthlyIncome),
      employmentStatus: data.employmentStatus,
      businessType: data.businessType,
      experienceYears: data.experienceYears ? parseInt(data.experienceYears) : null,
      status: 'submitted'
    });
    navigate(createPageUrl('LoanApplicationSuccess'));
    setIsSubmitting(false);
  };

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 py-16 shadow-2xl overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl">
              <FileText size={48} className="text-white" />
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-2"
              >
                <span className="bg-amber-400 text-red-900 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg">
                  {currentStep === 1 ? 'STEP 1 OF 3' : currentStep === 2 ? 'STEP 2 OF 3' : 'FINAL STEP'}
                </span>
              </motion.div>
              <h1 className="text-5xl font-black text-white drop-shadow-2xl mb-3">Apply for MUDRA Loan</h1>
              <p className="text-amber-100 text-lg font-medium">
                {currentStep === 1 ? '📝 Basic Information & Credit Check' : 
                 currentStep === 2 ? '🧠 Your AI Credit Score Analysis' : 
                 '✅ Complete Your Application'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
          <div className="flex justify-between mb-3">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div className={`flex items-center gap-2 ${step < 4 ? 'flex-1' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep >= step 
                      ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step ? '✓' : step}
                  </div>
                  <span className={`text-xs font-semibold hidden lg:block ${
                    currentStep >= step ? 'text-red-700' : 'text-gray-400'
                  }`}>
                    {step === 1 ? 'Info' : step === 2 ? 'Score' : step === 3 ? 'Docs' : 'Apply'}
                  </span>
                </div>
                {step < 4 && (
                  <div className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                    currentStep > step ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-800">
              {currentStep === 1 ? 'Enter Basic Information' : 
               currentStep === 2 ? 'Review Your Credit Score' : 
               currentStep === 3 ? 'Upload Required Documents' :
               'Complete Application Details'}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          {/* STEP 1: Basic Information for Credit Scoring */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-200"
            >
              <div className="mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Let's Start with Basic Information</h2>
                    <p className="text-gray-600 mt-1">We'll use this to calculate your AI credit score</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Full Name *</label>
                    <Input
                      {...register('applicantName', { required: 'Required' })}
                      placeholder="Enter your full name"
                      className="h-12 text-base border-2 focus:border-red-600"
                    />
                    {errors.applicantName && <p className="text-red-600 text-sm mt-2 font-medium">{errors.applicantName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      {...register('email', { required: 'Required' })}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      {...register('phone', { required: 'Required' })}
                      placeholder="10-digit phone"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income (₹) *</label>
                    <Input
                      type="number"
                      {...register('monthlyIncome', { required: 'Required', min: 5000 })}
                      placeholder="Enter monthly income"
                    />
                    {errors.monthlyIncome && <p className="text-red-600 text-sm mt-1">{errors.monthlyIncome.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Existing EMI (₹)</label>
                    <Input
                      type="number"
                      {...register('existingEMI')}
                      placeholder="Current EMI obligations"
                      defaultValue="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Completed Skill India Training? *</label>
                    <select
                      {...register('hasTraining')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                    >
                      <option value="yes">Yes - Completed Training</option>
                      <option value="no">No - Not Yet</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-5 shadow-inner">
                  <p className="text-sm text-blue-900 font-medium flex items-start gap-2">
                    <span className="text-xl">💡</span>
                    <span>We'll calculate your AI credit score based on this information to give you instant feedback on your loan eligibility</span>
                  </p>
                </div>

                <Button
                  onClick={handleStepOneSubmit}
                  className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all rounded-xl"
                >
                  Calculate My Credit Score
                  <ArrowRight className="ml-2" size={22} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: AI Credit Score Display */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Credit Score Display */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="text-purple-700" size={32} />
                  <h2 className="text-2xl font-bold text-gray-800">Your AI Credit Score</h2>
                </div>

                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <div className="text-sm text-gray-600 font-semibold mb-3 tracking-wider uppercase">Your Calculated Score</div>
                      <div className={`text-8xl font-black ${getScoreColor(creditScore)} mb-3 drop-shadow-2xl`}>{creditScore}</div>
                      <div className="text-gray-500 text-xl font-medium mb-4">out of 900</div>
                      <div className={`inline-block px-8 py-3 rounded-2xl mt-2 font-bold text-lg shadow-xl ${
                        creditScore >= 750 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                        creditScore >= 650 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                        'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                      }`}>
                        ⭐ {getScoreGrade(creditScore)}
                      </div>
                    </motion.div>
                  </div>

                <div className="max-w-2xl mx-auto mb-6">
                  <Progress value={(creditScore / 900) * 100} className="h-4" />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>300</span>
                    <span>600</span>
                    <span>900</span>
                  </div>
                </div>

                {/* Plain Language Explanation */}
                <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 mb-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                      <Info className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-3">Plain Language Explanation</h3>
                      <p className="text-base text-gray-800 leading-relaxed">
                        Your score is <strong className="text-blue-700 text-lg">{getScoreGrade(creditScore).toLowerCase()}</strong> based on your 
                        {watch('hasTraining') === 'yes' ? ' completed training, ' : ' profile, '}
                        steady income of <strong className="text-green-700">₹{parseFloat(watch('monthlyIncome')).toLocaleString('en-IN')}/month</strong>, 
                        and {parseFloat(watch('existingEMI') || 0) < 5000 ? 'manageable' : 'existing'} liabilities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    Score Breakdown
                  </h3>

                  <div className="space-y-4">
                  {scoreBreakdown.map((factor, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15, type: "spring" }}
                      className="flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        factor.status === 'positive' ? 'bg-gradient-to-br from-green-500 to-green-600' : 
                        factor.status === 'negative' ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      }`}>
                        <span className="text-2xl font-black text-white drop-shadow">
                          {factor.value}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-2 text-base">{factor.factor}</div>
                        <div className="text-sm text-gray-700 leading-relaxed">{factor.explanation}</div>
                      </div>
                      {factor.status === 'positive' ? (
                        <TrendingUp className="text-green-600" size={24} />
                      ) : factor.status === 'negative' ? (
                        <TrendingDown className="text-red-600" size={24} />
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-6 text-base border-2 hover:border-gray-400 rounded-xl"
                >
                  <ArrowLeft size={18} />
                  Back to Edit
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-7 text-lg font-bold shadow-xl hover:shadow-2xl rounded-xl"
                >
                  Continue to Upload Documents
                  <ArrowRight className="ml-2" size={22} />
                </Button>
              </div>
              </motion.div>
              )}

              {/* STEP 3: Document Upload */}
              {currentStep === 3 && (
              <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-200"
              >
              <div className="mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Upload className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Upload Required Documents</h2>
                    <p className="text-gray-600 mt-1">Securely upload your documents for verification</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-5 mb-6 shadow-inner">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <div className="text-sm text-amber-900">
                    <strong>Secure & Encrypted:</strong> All documents are stored with bank-level encryption. Only authorized loan officers can access your files during the verification process.
                  </div>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <DocumentUploader
                  documentType="aadharDoc"
                  label="Aadhar Card"
                  description="Upload clear scanned copy or photo of both sides of your Aadhar card"
                  required={true}
                  onUploadComplete={handleDocumentUpload}
                />

                <DocumentUploader
                  documentType="panDoc"
                  label="PAN Card"
                  description="Upload your Permanent Account Number card for tax verification"
                  required={true}
                  onUploadComplete={handleDocumentUpload}
                />

                <DocumentUploader
                  documentType="bankStatement"
                  label="Bank Statement (Last 3 months)"
                  description="Recent bank statement showing your transaction history"
                  required={true}
                  onUploadComplete={handleDocumentUpload}
                />

                <DocumentUploader
                  documentType="businessProof"
                  label="Business Proof"
                  description="Shop photo, business registration, GST certificate, or trade license"
                  required={false}
                  onUploadComplete={handleDocumentUpload}
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-5 mb-6">
                <div className="text-sm text-blue-900 space-y-2">
                  <div><strong>📄 Accepted formats:</strong> PDF, JPG, PNG</div>
                  <div><strong>📦 Maximum size:</strong> 5MB per file</div>
                  <div><strong>⚡ Processing time:</strong> Instant upload with real-time validation</div>
                  <div><strong>✓ Required documents:</strong> Aadhar, PAN, Bank Statement (marked with *)</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                  className="px-8 py-6 text-base border-2 hover:border-gray-400 rounded-xl"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-7 text-lg font-bold shadow-xl hover:shadow-2xl rounded-xl"
                  disabled={!documents.aadharDoc || !documents.panDoc || !documents.bankStatement}
                >
                  Continue to Application Form
                  <ArrowRight className="ml-2" size={22} />
                </Button>
              </div>
              </motion.div>
              )}

              {/* STEP 4: Complete Loan Application */}
              {currentStep === 4 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-200"
            >
              {/* Score Summary at Top */}
              <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-2xl p-6 mb-8 flex items-center justify-between shadow-xl border border-purple-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Brain className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="text-sm text-purple-200 font-semibold mb-1">Your AI Credit Score</div>
                    <div className="text-4xl font-black text-white">{creditScore} / 900</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 font-semibold px-4 py-2 text-sm"
                  >
                    View Score Details
                  </Button>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
                    documents.aadharDoc && documents.panDoc && documents.bankStatement 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {documents.aadharDoc && documents.panDoc && documents.bankStatement 
                      ? '✓ Docs Uploaded' 
                      : 'Docs Required'}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Address */}
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Complete Your Details</h2>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                    <input
                      type="text"
                      {...register('address', { 
                        required: 'Address is required',
                        minLength: { value: 10, message: 'Address must be at least 10 characters' }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                      placeholder="Enter your residential address"
                    />
                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
                  </div>
                </div>

                {/* Loan Details */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">💰 Loan Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount (₹) *</label>
                      <input
                        type="number"
                        {...register('loanAmount', { 
                          required: 'Loan amount is required',
                          min: { value: 10000, message: 'Minimum loan amount is ₹10,000' },
                          max: { value: 2000000, message: 'Maximum loan amount is ₹20,00,000' }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                        placeholder="Enter loan amount"
                      />
                      {errors.loanAmount && <p className="text-red-600 text-sm mt-1">{errors.loanAmount.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Purpose *</label>
                      <select
                        {...register('loanPurpose', { required: 'Please select loan purpose' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                      >
                        <option value="business_expansion">Business Expansion</option>
                        <option value="equipment_purchase">Equipment Purchase</option>
                        <option value="working_capital">Working Capital</option>
                        <option value="inventory">Inventory Management</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">💼 Employment & Business</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Status *</label>
                      <select
                        {...register('employmentStatus', { required: 'Required' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                      >
                        <option value="self_employed">Self Employed</option>
                        <option value="salaried">Salaried</option>
                        <option value="business_owner">Business Owner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business/Employment Type *</label>
                      <input
                        type="text"
                        {...register('businessType', { required: 'Required' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                        placeholder="e.g., Food Processing, Retail"
                      />
                      {errors.businessType && <p className="text-red-600 text-sm mt-1">{errors.businessType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                      <input
                        type="number"
                        {...register('experienceYears', { min: 0, max: 70 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                        placeholder="Years of experience"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-8">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    variant="outline"
                    className="px-8 py-6 text-base border-2 hover:border-gray-400 rounded-xl"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </Button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white font-black py-6 text-xl rounded-2xl hover:from-red-800 hover:to-red-950 transition-all shadow-2xl disabled:opacity-70 flex items-center justify-center gap-3 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={24} className="animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={24} />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Box - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-600 rounded-xl shadow-lg">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Why This Process is Better?</h3>
              <ul className="text-base text-gray-800 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong className="text-green-700">Know before you apply:</strong> See your credit score upfront and understand eligibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong className="text-green-700">Transparent AI scoring:</strong> Clear explanation of how your score is calculated</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong className="text-green-700">Pre-filled application:</strong> Less manual typing, faster submission</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong className="text-green-700">Instant feedback:</strong> Real-time validation to prevent errors</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}