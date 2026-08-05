import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('entrepreneur');

  const roles = {
    entrepreneur: {
      id: 'entrepreneur',
      name: 'Sita Devi',
      type: 'Entrepreneur (Citizen)',
      district: 'Nashik, Maharashtra',
      business: 'Food Processing & Packaging',
      avatar: '👩‍🌾'
    },
    bank: {
      id: 'bank',
      name: 'Rajesh Kumar',
      type: 'Bank Officer',
      bank: 'State Bank of India',
      branch: 'Nashik Main Branch',
      avatar: '👨‍💼'
    },
    admin: {
      id: 'admin',
      name: 'Dr. Amit Sharma',
      type: 'MUDRA Admin / Government Official',
      department: 'Ministry of Finance',
      designation: 'Deputy Director',
      avatar: '👔'
    }
  };

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, roles }}>
      {children}
    </RoleContext.Provider>
  );
};