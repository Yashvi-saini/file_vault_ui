"use client";

import React, { useState, useCallback, useRef } from "react";
import { 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  Music, 
  FileVideo, 
  FileArchive, 
  File, 
  CloudUpload,
  X
} from "lucide-react";

interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export default function FileVault() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    const newFiles: FileData[] = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));

    setFiles((prev) => [...newFiles, ...prev]);
  }, []);

  const deleteFile = (id: string) => {
    setFiles((prev) => {
      const fileToDelete = prev.find((f) => f.id === id);
      if (fileToDelete?.preview) {
        URL.revokeObjectURL(fileToDelete.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    const size = 28;
    
    if (type.includes("pdf")) {
      return <FileText size={size} color="#e53e3e" strokeWidth={2} />;
    }
    if (type.includes("excel") || type.includes("sheet") || type.includes("csv")) {
      return <FileSpreadsheet size={size} color="#2f855a" strokeWidth={2} />;
    }
    if (type.includes("word") || type.includes("text") || type.includes("officedocument.wordprocessingml")) {
      return <FileText size={size} color="#2b6cb0" strokeWidth={2} />;
    }
    if (type.includes("audio")) {
      return <Music size={size} color="#e53e3e" strokeWidth={2} />;
    }
    if (type.includes("video")) {
      return <FileVideo size={size} color="#805ad5" strokeWidth={2} />;
    }
    if (type.includes("zip") || type.includes("archive") || type.includes("compressed")) {
      return <FileArchive size={size} color="#d69e2e" strokeWidth={2} />;
    }
    
    return <File size={size} color="#718096" strokeWidth={2} />;
  };



  return (
    <div className="upload-card animate-fade-in">
      {/* Left Column - Upload Section */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-primary mb-1">Upload Files</h1>
        <p className="text-text-muted text-sm mb-8">
          Upload documents you want to share with your team
        </p>

        <div
          className={`drop-zone flex-1 ${isDragging ? "active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileUpload(e.dataTransfer.files);
          }}
        >
          <div className="flex flex-col items-center">
            {/* Cloud Icon */}
            <div className="mb-6">
              <CloudUpload size={64} color="#cbd5e0" strokeWidth={1.5} />
            </div>
            <p className="text-primary font-medium text-lg mb-2">
              Drag and drop files here
            </p>
            <p className="text-text-muted text-sm mb-6">-OR-</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary"
            >
              Browse Files
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </div>
        </div>
      </div>

      {/* Right Column - Uploaded Files Section */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold mb-6">Uploaded Files</h2>
        
        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border border-dashed">
              <p className="text-text-muted italic">No files uploaded yet</p>
            </div>
          ) : (
            files.map((file) => (
              <div key={file.id} className="relative group border rounded-lg p-4 bg-white shadow-sm hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-3">
                  {/* Icon or Image Preview */}
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded overflow-hidden border border-gray-100">
                    {file.preview ? (
                      <img 
                        src={file.preview} 
                        alt={file.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold truncate pr-2">
                        {file.name}
                      </p>
                      <span className="text-xs text-text-muted">Completed</span>
                    </div>
                    
                    {/* File Details: Size and Type */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded">
                        {file.type.split("/")[1] || "file"}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {formatFileSize(file.size)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar">
                      <div className="progress-fill w-full" />
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="ml-2 text-text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

}
