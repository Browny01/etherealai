import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

export function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      {isDragActive ? (
        <p className="text-sm text-gray-600">Drop the files here...</p>
      ) : (
        <p className="text-sm text-gray-600">
          Drag & drop files here, or click to select files
        </p>
      )}
    </div>
  );
}