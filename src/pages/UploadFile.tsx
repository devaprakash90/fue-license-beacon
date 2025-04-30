
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface FileUploadRowProps {
  title: string;
  allowedExtensions: string[];
  onFileUpload: (clientName: string, systemId: string, systemRelease: string, file: File | null) => void;
}

const FileUploadRow: React.FC<FileUploadRowProps> = ({
  title,
  allowedExtensions,
  onFileUpload,
}) => {
  const { toast } = useToast();
  const [clientName, setClientName] = useState<string>("");
  const [systemId, setSystemId] = useState<string>("");
  const [systemRelease, setSystemRelease] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (!selectedFile) {
      setFile(null);
      setFileName("");
      return;
    }
    
    // Check file extension
    const extension = selectedFile.name.split(".").pop()?.toLowerCase() || "";
    
    if (!allowedExtensions.includes(`.${extension}`)) {
      toast({
        title: "Invalid File",
        description: `Please upload a file with one of these extensions: ${allowedExtensions.join(", ")}`,
        variant: "destructive",
      });
      e.target.value = "";
      setFile(null);
      setFileName("");
      return;
    }
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = () => {
    // Validate inputs
    if (!clientName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a Client Name",
        variant: "destructive",
      });
      return;
    }

    if (!systemId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a System SID",
        variant: "destructive",
      });
      return;
    }

    if (!systemRelease.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter System Release Info",
        variant: "destructive",
      });
      return;
    }

    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    onFileUpload(clientName, systemId, systemRelease, file);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 p-4 border-b border-gray-200 items-center">
      <div className="text-sm font-medium">{title}</div>
      
      <div>
        <Input
          type="text"
          placeholder="Client Name *"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="border-belize-300"
        />
      </div>
      
      <div>
        <Input
          type="text"
          placeholder="System SID *"
          value={systemId}
          maxLength={10}
          onChange={(e) => setSystemId(e.target.value)}
          required
          className="border-belize-300"
        />
      </div>
      
      <div>
        <Input
          type="text"
          placeholder="System Release Info *"
          value={systemRelease}
          onChange={(e) => setSystemRelease(e.target.value)}
          required
          className="border-belize-300"
        />
      </div>
      
      <div className="relative">
        <input
          type="file"
          id={`file-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="sr-only"
          onChange={handleFileChange}
          accept={allowedExtensions.join(",")}
        />
        <Label
          htmlFor={`file-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-sm bg-belize-100 hover:bg-belize-200 text-belize-800 rounded-md border border-belize-300"
        >
          <Upload className="h-4 w-4 mr-2" />
          {fileName ? fileName : "Choose File"}
        </Label>
      </div>
      
      <div>
        <Button 
          onClick={handleUpload} 
          className="bg-belize-300 hover:bg-belize-400 text-white w-full"
        >
          Upload File
        </Button>
      </div>
    </div>
  );
};

const UploadFile = () => {
  const { toast } = useToast();

  const handleFileUpload = (clientName: string, systemId: string, systemRelease: string, file: File | null) => {
    toast({
      title: "Upload Started",
      description: `Uploading ${file?.name} for ${clientName} - ${systemId}...`,
    });

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Upload Complete",
        description: "Your file has been uploaded successfully!",
      });
    }, 2000);
  };

  return (
    <Layout title="Upload File">
      <div className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          Upload your data files to populate the system. Please ensure that files are in the correct format.
          <span className="text-red-500 ml-1">*</span> indicates required fields.
        </p>

        <div className="table-container">
          <div className="bg-gray-50 p-4 border-b border-gray-200 font-medium">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
              <div>Data Type</div>
              <div>Client Name <span className="text-red-500">*</span></div>
              <div>System SID <span className="text-red-500">*</span></div>
              <div>System Release Info <span className="text-red-500">*</span></div>
              <div>File</div>
              <div>Action</div>
            </div>
          </div>

          <FileUploadRow
            title="FUE License Roles & Objects Mapping Data"
            allowedExtensions={[".xml"]}
            onFileUpload={handleFileUpload}
          />

          <FileUploadRow
            title="Role Authorization Object Mapping Data"
            allowedExtensions={[".csv", ".xlsx"]}
            onFileUpload={handleFileUpload}
          />

          <FileUploadRow
            title="Role Fiori Apps Mapping data"
            allowedExtensions={[".csv", ".xlsx"]}
            onFileUpload={handleFileUpload}
          />

          <FileUploadRow
            title="Master & Derived Role Mapping Data"
            allowedExtensions={[".csv", ".xlsx"]}
            onFileUpload={handleFileUpload}
          />

          <FileUploadRow
            title="User Details Data"
            allowedExtensions={[".csv", ".xlsx"]}
            onFileUpload={handleFileUpload}
          />

          <FileUploadRow
            title="User Role Mapping Data"
            allowedExtensions={[".csv", ".xlsx"]}
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UploadFile;
