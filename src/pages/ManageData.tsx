
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, Trash, Search } from "lucide-react";

interface DataTypeInfo {
  id: string;
  title: string;
  tableName: string;
}

const dataTypes: DataTypeInfo[] = [
  {
    id: "role-objects",
    title: "FUE License Roles & Objects Mapping Data",
    tableName: "Z_FUE_CLIENTNAME_SYSNAME_ROLE_OBJ_LICENSE_INFO",
  },
  {
    id: "role-auth",
    title: "Role Authorization Object Mapping Data",
    tableName: "Z_FUE_CLIENTNAME_SYSNAME_ROLE_AUTH_OBJ_DATA",
  },
  {
    id: "role-fiori",
    title: "Role Fiori Apps Mapping Data",
    tableName: "Z_FUE_CLIENTNAME_SYSNAME_ROLE_FIORI_DATA",
  },
  {
    id: "master-derived",
    title: "Master & Derived Role Mapping Data",
    tableName: "Z_FUE_CLIENTNAME_SYSNAME_ROLE_MSTR_DERVI",
  },
  {
    id: "user-details",
    title: "User Details Data",
    tableName: "Z_FUE_CLIENTNAME_SYSNAME_USER_DATA",
  },
  {
    id: "user-role",
    title: "User Role Mapping Data",
    tableName: "Z_FUE_CLIENTNAME_SYSNAME_USER_ROLE_DATA",
  },
];

// Sample client and system data
const clients = ["ACME Corp", "Globex Inc", "Initech", "Cyberdyne", "Wayne Enterprises"];
const systems = {
  "ACME Corp": ["PRD001", "DEV002"],
  "Globex Inc": ["TST001", "DEV005"],
  "Initech": ["QAS001", "PRD002"],
  "Cyberdyne": ["DEV003", "QAS002"],
  "Wayne Enterprises": ["SND001", "PRD003"],
};

const ManageData = () => {
  const { toast } = useToast();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DataTypeInfo[] | null>(null);

  const handleSearch = () => {
    if (!selectedClient || !selectedSystem) {
      toast({
        title: "Selection Required",
        description: "Please select both a Client and a System ID",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call to fetch data
    // For now, we'll simulate showing results after search
    setSearchResults(dataTypes);
    
    toast({
      title: "Search Complete",
      description: `Found ${dataTypes.length} data sources for ${selectedClient} - ${selectedSystem}`,
    });
  };

  const handleDownload = (dataType: DataTypeInfo) => {
    if (!selectedClient || !selectedSystem) {
      toast({
        title: "Selection Required",
        description: "Please select both a Client and a System ID",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      title: "Download Started",
      description: `Downloading ${dataType.title} for ${selectedClient} - ${selectedSystem}`,
    });
  };

  const handleDelete = (dataType: DataTypeInfo) => {
    if (!selectedClient || !selectedSystem) {
      toast({
        title: "Selection Required",
        description: "Please select both a Client and a System ID",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call with confirmation
    toast({
      title: "Delete Successful",
      description: `${dataType.title} data for ${selectedClient} - ${selectedSystem} has been deleted`,
    });
  };

  return (
    <Layout title="Manage Data">
      <div className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          Download or delete data based on client and system selection. Select a client and system ID before performing any actions.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Client
            </label>
            <Select
              value={selectedClient}
              onValueChange={(value) => {
                setSelectedClient(value);
                setSelectedSystem("");
                setSearchResults(null); // Clear results when selection changes
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select System ID
            </label>
            <Select
              value={selectedSystem}
              onValueChange={(value) => {
                setSelectedSystem(value);
                setSearchResults(null); // Clear results when selection changes
              }}
              disabled={!selectedClient}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedClient ? "Select System ID" : "Select Client first"} />
              </SelectTrigger>
              <SelectContent>
                {selectedClient &&
                  systems[selectedClient as keyof typeof systems]?.map((system) => (
                    <SelectItem key={system} value={system}>
                      {system}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/3">
            <Button 
              onClick={handleSearch} 
              className="w-full bg-belize-300 hover:bg-belize-400 text-white"
            >
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
        </div>

        {searchResults && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>Client Name</th>
                  <th>System ID</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((dataType) => (
                  <tr key={dataType.id}>
                    <td className="font-medium">{dataType.title}</td>
                    <td>{selectedClient}</td>
                    <td>{selectedSystem}</td>
                    <td>
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(dataType)}
                          className="text-belize-600 hover:text-belize-700 hover:bg-belize-50"
                        >
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(dataType)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!searchResults && selectedClient && selectedSystem && (
          <div className="text-center py-8 text-gray-500">
            Click Search to view available data
          </div>
        )}

        {!searchResults && (!selectedClient || !selectedSystem) && (
          <div className="text-center py-8 text-gray-500">
            Please select a Client and System ID to search for data
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageData;
