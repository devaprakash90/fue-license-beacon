
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Eye } from "lucide-react";

interface UploadRecord {
  id: string;
  timestamp: string;
  clientName: string;
  systemId: string;
  filename: string;
  status: "InProgress" | "Success" | "Failed";
  logData: string | null;
}

// Sample data for demonstration
const mockUploadRecords: UploadRecord[] = [
  {
    id: "1",
    timestamp: "2025-04-30T10:15:30",
    clientName: "ACME Corp",
    systemId: "PRD001",
    filename: "roles_objects_mapping.xml",
    status: "Success",
    logData: null,
  },
  {
    id: "2",
    timestamp: "2025-04-30T09:45:22",
    clientName: "ACME Corp",
    systemId: "PRD001",
    filename: "user_details.xlsx",
    status: "Success",
    logData: null,
  },
  {
    id: "3",
    timestamp: "2025-04-29T16:30:45",
    clientName: "ACME Corp",
    systemId: "DEV002",
    filename: "role_auth_mapping.csv",
    status: "Failed",
    logData: "Error in row 15: Invalid data format for field 'AUTH_NAME'.\nError in row 23: Missing required field 'FIELD'.",
  },
  {
    id: "4",
    timestamp: "2025-04-29T14:20:10",
    clientName: "Globex Inc",
    systemId: "TST001",
    filename: "master_derived_roles.xlsx",
    status: "InProgress",
    logData: null,
  },
  {
    id: "5",
    timestamp: "2025-04-28T11:05:33",
    clientName: "Globex Inc",
    systemId: "TST001",
    filename: "user_roles.csv",
    status: "Success",
    logData: null,
  },
  {
    id: "6",
    timestamp: "2025-04-28T10:15:30",
    clientName: "Initech",
    systemId: "QAS001",
    filename: "fiori_apps_mapping.xlsx",
    status: "Failed",
    logData: "Error: File format not recognized. Expected headers not found.",
  },
  {
    id: "7",
    timestamp: "2025-04-27T15:45:20",
    clientName: "Initech",
    systemId: "QAS001",
    filename: "roles_objects_mapping.xml",
    status: "Success",
    logData: null,
  },
  {
    id: "8",
    timestamp: "2025-04-27T13:20:10",
    clientName: "Cyberdyne",
    systemId: "DEV003",
    filename: "user_details.xlsx",
    status: "Success",
    logData: null,
  },
  {
    id: "9",
    timestamp: "2025-04-26T09:30:45",
    clientName: "Cyberdyne",
    systemId: "DEV003",
    filename: "user_roles.csv",
    status: "Success",
    logData: null,
  },
  {
    id: "10",
    timestamp: "2025-04-25T16:15:30",
    clientName: "Wayne Enterprises",
    systemId: "SND001",
    filename: "role_auth_mapping.csv",
    status: "Failed",
    logData: "Error: System connection failure. Please try again.",
  },
];

const UploadStatus = () => {
  const [records, setRecords] = useState<UploadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecords(mockUploadRecords);
      } catch (error) {
        console.error("Error fetching upload status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusBadgeClass = (status: "InProgress" | "Success" | "Failed") => {
    switch (status) {
      case "InProgress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Success":
        return "bg-green-100 text-green-800 border-green-200";
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Layout title="File Upload Status">
      <div className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          View the status of your recent file uploads. Monitor progress and check for any issues that may have occurred.
        </p>

        <div className="table-container">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader className="h-6 w-6 animate-spin text-belize-500" />
              <span className="ml-2 text-belize-500">Loading...</span>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Client Name</th>
                  <th>System ID</th>
                  <th>Filename</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((record) => (
                    <tr key={record.id}>
                      <td>{formatDate(record.timestamp)}</td>
                      <td>{record.clientName}</td>
                      <td>{record.systemId}</td>
                      <td className="font-mono text-xs">{record.filename}</td>
                      <td>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                            record.status
                          )}`}
                        >
                          {record.status === "InProgress" && (
                            <Loader className="h-3 w-3 mr-1 animate-spin" />
                          )}
                          {record.status}
                        </span>
                      </td>
                      <td>
                        {record.logData && record.status === "Failed" ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-belize-600 hover:text-belize-700 hover:bg-belize-50"
                              >
                                <Eye className="h-4 w-4 mr-1" /> View Error
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Error Details</DialogTitle>
                              </DialogHeader>
                              <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-80">
                                <pre className="text-sm text-red-600 whitespace-pre-wrap">
                                  {record.logData}
                                </pre>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <span className="text-gray-400 text-sm">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No upload records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UploadStatus;
