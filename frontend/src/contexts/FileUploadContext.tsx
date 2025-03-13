import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import axios from 'axios';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface FileUploadContextType {
  file: File | null;
  uploadStatus: UploadStatus;
  progress: number;
  setFile: (file: File | null) => void;
  uploadFile: () => Promise<void>;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);

export const FileUploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('uploading');

      const response = await axios.post('http://localhost:3000/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          }
        },
      });

      console.log('Upload success:', response.data);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    } finally {
      setTimeout(() => {
        setFile(null);
        setProgress(0);
        setUploadStatus('idle');
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 2000);
    }
  }, [file]);

  return (
    <FileUploadContext.Provider value={{ file, uploadStatus, progress, setFile, uploadFile }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUpload = (): FileUploadContextType => {
  const context = useContext(FileUploadContext);
  if (!context) throw new Error('useFileUpload must be used within a FileUploadProvider');
  return context;
};
