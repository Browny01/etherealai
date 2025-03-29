import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon } from 'lucide-react';
import { useStore } from '../store';

export function LogoUpload() {
  const { setLogo } = useStore();

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [setLogo]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <input {...getInputProps()} />
      <ImageIcon className="w-5 h-5 text-gray-400" />
    </div>
  );
}