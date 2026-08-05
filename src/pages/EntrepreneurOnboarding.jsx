import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Phone, User, Briefcase, Home as HomeIcon, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import DocumentUploader from '../components/DocumentUploader';

function EntrepreneurOnboardingContent() {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    fullName: '',
    aadhar: '',
    address: '',
    district: '',
    state: '',
    sector: '',
    businessName: '',
    experience: ''
  });
  
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

  const steps = [
    { id: 1, title: 'Mobile Verification', icon: Phone },
    { id: 2, title: 'Basic Details', icon: User },
    { id: 3, title: 'Document Upload', icon: FileText },
    { id: 4, title: 'Business Information', icon: Briefcase },
    { id: 5, title: 'Location Capture', icon: MapPin }
  ];

  const sectors = [
    'Food Processing & Packaging',
    'Handicrafts & Textiles',
    'Retail & Trading',
    'Service Sector',
    'Agriculture Allied',
    'Manufacturing'
  ];

  return (
    <MUDRA2Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Entrepreneur Onboarding</h2>
          <p className="text-gray-600">Simple, guided registration for micro-entrepreneurs</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-8">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step >= s.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > s.id ? <CheckCircle size={24} /> : <StepIcon size={20} />}
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">{s.title}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step > s.id ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step 1: Mobile Verification */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800">Mobile Number Verification</h3>
              <p className="text-sm text-gray-600">Enter your mobile number to receive an OTP</p>
              
              <Input
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                maxLength={10}
              />
              
              {!otpSent ? (
                <Button onClick={() => setOtpSent(true)} className="w-full bg-red-700">
                  Send OTP
                </Button>
              ) : (
                <>
                  <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800">
                    ✓ OTP sent to {formData.phone}
                  </div>
                  <Input
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                    maxLength={6}
                  />
                  <Button onClick={() => setStep(2)} className="w-full bg-red-700">
                    Verify & Continue
                  </Button>
                </>
              )}
            </motion.div>
          )}

          {/* Step 2: Basic Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800">Basic Details</h3>
              <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded p-2">
                💡 <strong>Tip:</strong> Fill details as per your Aadhar card
              </p>
              
              <Input
                placeholder="Full Name (as per Aadhar)"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <Input
                placeholder="Aadhar Number"
                value={formData.aadhar}
                onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
                maxLength={12}
              />
              <Input
                placeholder="Complete Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              
              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-red-700">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Document Upload */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Required Documents</h3>
                <p className="text-sm text-gray-600">Securely upload your documents for verification</p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 text-lg">⚠️</span>
                  <div className="text-sm text-amber-800">
                    <strong>Important:</strong> All documents are stored securely and encrypted. Only authorized personnel can access them.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <DocumentUploader
                  documentType="aadharDoc"
                  label="Aadhar Card"
                  description="Upload scanned copy or photo of your Aadhar card"
                  required={true}
                  onUploadComplete={handleDocumentUpload}
                />

                <DocumentUploader
                  documentType="panDoc"
                  label="PAN Card"
                  description="Upload your Permanent Account Number card"
                  required={true}
                  onUploadComplete={handleDocumentUpload}
                />

                <DocumentUploader
                  documentType="bankStatement"
                  label="Bank Statement (Last 3 months)"
                  description="Recent bank statement showing transaction history"
                  required={false}
                  onUploadComplete={handleDocumentUpload}
                />

                <DocumentUploader
                  documentType="businessProof"
                  label="Business Proof"
                  description="Shop photo, business registration, or GST certificate"
                  required={false}
                  onUploadComplete={handleDocumentUpload}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-blue-800">
                  <strong>Accepted formats:</strong> PDF, JPG, PNG<br/>
                  <strong>Maximum size:</strong> 5MB per file<br/>
                  <strong>Note:</strong> Documents marked with * are mandatory
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline">
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(4)} 
                  className="flex-1 bg-red-700"
                  disabled={!documents.aadharDoc || !documents.panDoc}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Business Information */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800">Business Information</h3>
              
              <Input
                placeholder="Business / Activity Name"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Your Sector</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Choose sector</option>
                  {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              
              <Input
                placeholder="Years of Experience"
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
              
              <div className="flex gap-3">
                <Button onClick={() => setStep(3)} variant="outline">
                  Back
                </Button>
                <Button onClick={() => setStep(5)} className="flex-1 bg-red-700">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Location Capture */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800">Location Verification</h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center">
                <MapPin className="mx-auto text-blue-700 mb-3" size={48} />
                <p className="font-semibold text-gray-800 mb-2">Capture Current Location</p>
                <p className="text-sm text-gray-600 mb-4">This helps verify your business address</p>
                
                <div className="bg-white rounded p-3 text-sm text-left">
                  <div className="text-gray-600">📍 Detected Location:</div>
                  <div className="font-semibold text-gray-800">Nashik, Maharashtra</div>
                  <div className="text-xs text-gray-500 mt-1">Lat: 19.9975, Long: 73.7898</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={() => setStep(4)} variant="outline">
                  Back
                </Button>
                <Button onClick={() => setStep(6)} className="flex-1 bg-green-600">
                  Complete Registration
                </Button>
              </div>
            </motion.div>
          )}

          {/* Completion */}
          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-6">Welcome to MUDRA 2.0, Sita Devi</p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <div className="text-sm font-semibold text-gray-800 mb-2">Next Steps:</div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>✓ Complete Skill India training (recommended)</div>
                  <div>✓ Check your AI Credit Score</div>
                  <div>✓ Get personalized loan recommendations</div>
                </div>
              </div>

              <Button onClick={() => window.location.href = createPageUrl('SkillTraining')} className="bg-red-700">
                Continue to Training Module
              </Button>
            </motion.div>
          )}
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Faster onboarding:</strong> OTP-based verification reduces branch visits</li>
                <li>• <strong>Fewer errors:</strong> Guided forms with validation ensure data quality</li>
                <li>• <strong>Inclusive access:</strong> Simple language for low digital literacy users</li>
                <li>• <strong>Fraud prevention:</strong> Geo-tagging verifies physical presence</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function EntrepreneurOnboarding() {
  return (
    <RoleProvider>
      <EntrepreneurOnboardingContent />
    </RoleProvider>
  );
}