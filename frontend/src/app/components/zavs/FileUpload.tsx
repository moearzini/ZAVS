import { Upload, FileText, X, Check } from "lucide-react";
import { useState } from "react";

interface UploadedFile {
  name: string;
  size: string;
  status: "uploading" | "complete";
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileAdd = () => {
    // Simulate file upload
    const newFile: UploadedFile = {
      name: "screenshot_beamerraum.png",
      size: "1,2 MB",
      status: "uploading",
    };
    setFiles([...files, newFile]);

    // Simulate upload completion
    setTimeout(() => {
      setFiles(prev => prev.map(f =>
        f.name === newFile.name ? { ...f, status: "complete" } : f
      ));
    }, 1000);
  };

  const removeFile = (fileName: string) => {
    setFiles(files.filter(f => f.name !== fileName));
  };

  return (
    <div className="space-y-3">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${isDragging
            ? "border-[#E2001A] bg-red-50"
            : "border-gray-300 hover:border-gray-400 bg-white"
          }
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileAdd();
        }}
      >
        <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
        <p className="text-sm text-gray-600 mb-1">
          Dateien hier ablegen oder{" "}
          <button
            type="button"
            onClick={handleFileAdd}
            className="text-[#E2001A] hover:underline"
          >
            auswählen
          </button>
        </p>
        <p className="text-xs text-gray-500">
          Unterstützte Formate: PDF, PNG, JPG
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
              {file.status === "complete" ? (
                <>
                  <Check className="h-5 w-5 text-emerald-600" />
                  <button
                    type="button"
                    onClick={() => removeFile(file.name)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <div className="h-5 w-5 border-2 border-gray-300 border-t-[#E2001A] rounded-full animate-spin" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
