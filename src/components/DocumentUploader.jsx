import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, CheckCircle, X, Loader2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

const ALLOWED_TYPES = {
  'image/jpeg': { ext: 'JPG/JPEG', icon: '🖼️' },
  'image/png': { ext: 'PNG', icon: '🖼️' },
  'application/pdf': { ext: 'PDF', icon: '📄' }
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function DocumentUploader({ 
  documentType, 
  label, 
  description, 
  required = false,
  onUploadComplete 
}) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES[file.type]) {
      return 'Invalid file type. Please upload PDF, JPG, or PNG only.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size is 5MB.';
    }
    return null;
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setUploading(true);

    try {
      const response = await base44.integrations.Core.UploadPrivateFile({
        file: selectedFile
      });
      
      setFileUri(response.file_uri);
      setUploaded(true);
      if (onUploadComplete) {
        onUploadComplete(documentType, response.file_uri, selectedFile.name);
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setUploaded(false);
    setFileUri(null);
    setError(null);
    if (onUploadComplete) {
      onUploadComplete(documentType, null, null);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-red-400 transition-all bg-gradient-to-br from-gray-50 to-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-gray-900 flex items-center gap-2">
            {label}
            {required && <span className="text-red-600 text-sm">*</span>}
          </div>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!file && !uploaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <label className="cursor-pointer block">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-white rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all">
                <Upload className="text-gray-400 mb-2" size={32} />
                <span className="text-sm font-semibold text-gray-700">Click to upload</span>
                <span className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</span>
              </div>
            </label>
          </motion.div>
        )}

        {uploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <Loader2 className="text-blue-600 animate-spin" size={24} />
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">Uploading {file?.name}</div>
              <div className="text-xs text-gray-600">Please wait...</div>
            </div>
          </motion.div>
        )}

        {uploaded && file && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 shadow-md"
          >
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                {file.name}
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">Uploaded</span>
              </div>
              <div className="text-xs text-gray-600">
                {(file.size / 1024).toFixed(0)} KB • {ALLOWED_TYPES[file.type]?.ext}
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-600 transition-colors p-2"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200"
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}
    </div>
  );
}