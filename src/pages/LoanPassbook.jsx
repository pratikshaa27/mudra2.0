import React from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle, Clock, AlertCircle, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

function LoanPassbookContent() {
  const loanDetails = {
    loanId: 'MUDRA2026012345',
    scheme: 'Kishor',
    principalAmount: 200000,
    interestRate: 10.5,
    tenure: 24,
    monthlyEMI: 10500,
    disbursementDate: '2026-02-05',
    maturityDate: '2028-02-05'
  };

  const emiSchedule = [
    { month: 'Feb 2026', dueDate: '05-Feb-2026', emi: 10500, principal: 8750, interest: 1750, status: 'upcoming' },
    { month: 'Mar 2026', dueDate: '05-Mar-2026', emi: 10500, principal: 8825, interest: 1675, status: 'pending' },
    { month: 'Apr 2026', dueDate: '05-Apr-2026', emi: 10500, principal: 8900, interest: 1600, status: 'pending' },
    { month: 'May 2026', dueDate: '05-May-2026', emi: 10500, principal: 8975, interest: 1525, status: 'pending' },
    { month: 'Jun 2026', dueDate: '05-Jun-2026', emi: 10500, principal: 9050, interest: 1450, status: 'pending' }
  ];

  const repaymentHistory = [
    // Will show once payments start
  ];

  const nextEMI = emiSchedule[0];
  const daysUntilDue = 2;

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Wallet className="text-teal-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Digital Loan Passbook</h2>
              <p className="text-teal-100">Complete EMI schedule and repayment tracking</p>
            </div>
          </div>
        </div>

        {/* Loan Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Loan Details</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Loan Amount</div>
              <div className="text-xl font-bold text-blue-700">₹{loanDetails.principalAmount.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Monthly EMI</div>
              <div className="text-xl font-bold text-green-700">₹{loanDetails.monthlyEMI.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Interest Rate</div>
              <div className="text-xl font-bold text-purple-700">{loanDetails.interestRate}%</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Tenure</div>
              <div className="text-xl font-bold text-orange-700">{loanDetails.tenure} months</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Disbursement Date: </span>
              <span className="font-semibold">{loanDetails.disbursementDate}</span>
            </div>
            <div>
              <span className="text-gray-600">Maturity Date: </span>
              <span className="font-semibold">{loanDetails.maturityDate}</span>
            </div>
          </div>
        </div>

        {/* Next EMI Reminder */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 border-l-4 border-orange-500 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-orange-600 mt-1" size={32} />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">Next EMI Due</h3>
              <div className="text-2xl font-bold text-orange-700 mb-1">₹{nextEMI.emi.toLocaleString('en-IN')}</div>
              <div className="text-sm text-gray-700">Due on: {nextEMI.dueDate}</div>
              <div className="text-xs text-gray-600 mt-1">⏰ {daysUntilDue} days remaining</div>
              
              <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                Pay EMI Now
              </Button>
            </div>
          </div>
        </div>

        {/* EMI Schedule Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">EMI Schedule (Next 5 months)</h3>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Download Full Schedule
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Month</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Due Date</th>
                  <th className="text-right p-3 font-semibold text-gray-700">EMI</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Principal</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Interest</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {emiSchedule.map((emi, idx) => (
                  <tr key={idx} className={`border-b ${emi.status === 'upcoming' ? 'bg-orange-50' : ''}`}>
                    <td className="p-3">{emi.month}</td>
                    <td className="p-3">{emi.dueDate}</td>
                    <td className="p-3 text-right font-semibold">₹{emi.emi.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right">₹{emi.principal.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right">₹{emi.interest.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        emi.status === 'upcoming' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {emi.status === 'upcoming' ? 'Next Due' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Repayment History */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Repayment History</h3>
          
          {repaymentHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No repayments yet. First EMI due on {nextEMI.dueDate}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Will populate after first payment */}
            </div>
          )}
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Improves repayment discipline:</strong> Clear visibility of upcoming EMIs</li>
                <li>• <strong>Reduces NPAs:</strong> Timely reminders prevent defaults</li>
                <li>• <strong>Financial planning:</strong> Complete schedule helps budgeting</li>
                <li>• <strong>Digital convenience:</strong> Access anytime, anywhere</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function LoanPassbook() {
  return (
    <RoleProvider>
      <LoanPassbookContent />
    </RoleProvider>
  );
}