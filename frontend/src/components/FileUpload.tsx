import React, { useCallback } from 'react';
import { useFileUpload } from '../contexts/FileUploadContext';

export const FileUpload: React.FC = () => {
  const { file, setFile, uploadFile, uploadStatus, progress } = useFileUpload();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        setFile(event.target.files[0]);
      }
    },
    [setFile],
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md text-center">
      <h2 className="text-xl font-semibold mb-4">Upload CSV File</h2>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-4 pb-2">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Choose a file</span>
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {file ? (
        <>
          <p className="text-sm text-gray-600">Selected: {file.name}</p>
          <button
            onClick={uploadFile}
            disabled={!file || uploadStatus === 'uploading'}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            {uploadStatus === 'uploading' ? `Uploading (${progress}%)...` : 'Upload'}
          </button>
        </>
      ) : (
        ''
      )}

      {uploadStatus === 'success' && <p className="text-green-500 mt-2">Upload successful!</p>}
      {uploadStatus === 'error' && <p className="text-red-500 mt-2">Upload failed.</p>}
    </div>
  );
};
