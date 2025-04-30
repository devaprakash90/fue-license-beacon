
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
  onClientNameChange: (value: string) => void;
  onSystemIdChange: (value: string) => void;
  onSystemReleaseChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  clientName: string;
  systemId: string;
  systemRelease: string;
}

const FileUploadRow: React.FC<FileUploadRowProps> = ({
  title,
  allowedExtensions,
  onClientNameChange,
  onSystemIdChange,
  onSystemReleaseChange,
  onFileChange,
  clientName,
  systemId,
  systemRelease,
}) => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) {
      onFileChange(null);
      setFileName("");
      return;
    }
    
    // Check file extension
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    
    if (!allowedExtensions.includes(`.${extension}`)) {
      toast({
        title: "Invalid File",
        description: `Please upload a file with one of these extensions: ${allowedExtensions.join(", ")}`,
        variant: "destructive",
      });
      e.target.value = "";
      onFileChange(null);
      setFileName("");
      return;
    }
    
    onFileChange(file);
    setFileName(file.name);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 border-b border-gray-200 items-center">
      <div className="text-sm font-medium">{title}</div>
      
      <div>
        <Input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
        />
      </div>
      
      <div>
        <Input
          type="text"
          placeholder="System SID"
          value={systemId}
          maxLength={10}
          onChange={(e) => onSystemIdChange(e.target.value)}
        />
      </div>
      
      <div>
        <Input
          type="text"
          placeholder="System Release Info"
          value={systemRelease}
          onChange={(e) => onSystemReleaseChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative w-full">
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
      </div>
    </div>
  );
};

const UploadFile = () => {
  const { toast } = useToast();
  
  // Common state for all rows
  const [clientName, setClientName] = useState<string>("");
  const [systemId, setSystemId] = useState<string>("");
  const [systemRelease, setSystemRelease] = useState<string>("");
  
  // File states for each row
  const [fileUploads, setFileUploads] = useState<{
    [key: string]: File | null;
  }>({
    roleObjectsFile: null,
    roleAuthFile: null,
    roleFioriFile: null,
    masterDerivedFile: null,
    userDetailsFile: null,
    userRoleFile: null,
  });

  const handleUpload = async () => {
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

    // Check if at least one file is selected
    if (Object.values(fileUploads).every((file) => file === null)) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, you would use FormData to send the files to your backend
    toast({
      title: "Upload Started",
      description: "Your files are being uploaded and processed...",
    });

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Upload Complete",
        description: "Your files have been uploaded successfully!",
      });
    }, 2000);
  };

  return (
    <Layout title="Upload File">
      <div className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          Upload your data files to populate the system. Please ensure that files are in the correct format.
        </p>

        <div className="table-container">
          <div className="bg-gray-50 p-4 border-b border-gray-200 font-medium">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div>Data Type</div>
              <div>Client Name</div>
              <div>System SID</div>
              <div>System Release Info</div>
              <div>File</div>
            </div>
          </div>

          <FileUploadRow
            title="FUE License Roles & Objects Mapping Data"
            allowedExtensions={[".xml"]}
            clientName={clientName}
            systemId={systemId}
            systemRelease={systemRelease}
            onClientNameChange={(value) => setClientName(value)}
            onSystemIdChange={(value) => setSystemId(value)}
            onSystemReleaseChange={(value) => setSystemRelease(value)}
            onFileChange={(file) => setFileUploads({ ...fileUploads, roleObjectsFile: file })}
          />

          <FileUploadRow
            title="Role Authorization Object Mapping Data"
            allowedExtensions={[".csv", ".xlsx"]}
            clientName={clientName}
            systemId={systemId}
            systemRelease={systemRelease}
            onClientNameChange={(value) => setClientName(value)}
            onSystemIdChange={(value) => setSystemId(value)}
            onSystemReleaseChange={(value) => setSystemRelease(value)}
            onFileChange={(file) => setFileUploads({ ...fileUploads, roleAuthFile: file })}
          />

          <FileUploadRow
            title="Role Fiori Apps Mapping data"
            allowedExtensions={[".csv", ".xlsx"]}
            clientName={clientName}
            systemId={systemId}
            systemRelease={systemRelease}
            onClientNameChange={(value) => setClientName(value)}
            onSystemIdChange={(value) => setSystemId(value)}
            onSystemReleaseChange={(value) => setSystemRelease(value)}
            onFileChange={(file) => setFileUploads({ ...fileUploads, roleFioriFile: file })}
          />

          <FileUploadRow
            title="Master & Derived Role Mapping Data"
            allowedExtensions={[".csv", ".xlsx"]}
            clientName={clientName}
            systemId={systemId}
            systemRelease={systemRelease}
            onClientNameChange={(value) => setClientName(value)}
            onSystemIdChange={(value) => setSystemId(value)}
            onSystemReleaseChange={(value) => setSystemRelease(value)}
            onFileChange={(file) => setFileUploads({ ...fileUploads, masterDerivedFile: file })}
          />

          <FileUploadRow
            title="User Details Data"
            allowedExtensions={[".csv", ".xlsx"]}
            clientName={clientName}
            systemId={systemId}
            systemRelease={systemRelease}
            onClientNameChange={(value) => setClientName(value)}
            onSystemIdChange={(value) => setSystemId(value)}
            onSystemReleaseChange={(value) => setSystemRelease(value)}
            onFileChange={(file) => setFileUploads({ ...fileUploads, userDetailsFile: file })}
          />

          <FileUploadRow
            title="User Role Mapping Data"
            allowedExtensions={[".csv", ".xlsx"]}
            clientName={clientName}
            systemId={systemId}
            systemRelease={systemRelease}
            onClientNameChange={(value) => setClientName(value)}
            onSystemIdChange={(value) => setSystemId(value)}
            onSystemReleaseChange={(value) => setSystemRelease(value)}
            onFileChange={(file) => setFileUploads({ ...fileUploads, userRoleFile: file })}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleUpload} className="bg-belize-500 hover:bg-belize-600">
            Upload Files
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default UploadFile;
