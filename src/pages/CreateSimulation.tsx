
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateSimulation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseFilter, setLicenseFilter] = useState("all");
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [editedObjects, setEditedObjects] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // All roles data
  const roles = [
    {
      id: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      description: "SAP Materials Management - Inventory Management Goods Movements",
      classification: "GB Advanced Use",
      gb: 1, gc: 2, gd: 28,
      assignedUsers: 337,
      objects: [
        {
          id: 1,
          object: "M_EINF_EKO",
          classification: "GA Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: ""
        },
        {
          id: 2,
          object: "M_EINF_EKO",
          classification: "GD Self-Service Use",
          fieldName: "ACTVT", 
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: ""
        }
      ]
    },
    {
      id: "/SKYBFRHC_TEAMS_MAINTAIN_AD",
      description: "Teams Maintenance Administration",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 1,
      assignedUsers: 108,
      objects: [
        {
          id: 3,
          object: "S_USER_GRP",
          classification: "GB Advanced Use",
          fieldName: "CLASS",
          valueLow: "*",
          valueHigh: "",
          action: null,
          newValue: ""
        }
      ]
    },
    {
      id: "/SKYBFRIDD_CC_TEAMS_ADMIN_SST",
      description: "Teams Administration Self-Service Tools",
      classification: "GB Advanced Use", 
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 105,
      objects: [
        {
          id: 4,
          object: "S_ADMIN",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: ""
        }
      ]
    },
    {
      id: "ZUCM_SAP_INTNW_BMT_WFM_DEVELOP",
      description: "SAP Internal Network Business Management Tools - Workflow Development",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 3,
      objects: [
        {
          id: 5,
          object: "S_DEVELOP",
          classification: "GB Advanced Use",
          fieldName: "DEVCLASS",
          valueLow: "Z*",
          valueHigh: "",
          action: null,
          newValue: ""
        }
      ]
    },
    {
      id: "SAP_AIO_PURCHASER-S",
      description: "SAP All-in-One Purchaser Standard",
      classification: "GB Advanced Use",
      gb: 2, gc: 3, gd: 156,
      assignedUsers: 336,
      objects: [
        {
          id: 6,
          object: "M_BANF_EKG",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: ""
        }
      ]
    }
  ];

  const licenseOptions = [
    "01 (Create)/GC Core Use",
    "02 (Change)/GC Core Use", 
    "03 (Display)/GD Self-Service Use",
    "16 (Execute)/GD Self-Service Use",
    "F4 (Look Up)/GD Self-Service Use"
  ];

  // Filter roles based on search and license type
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLicense = licenseFilter === "all" || role.classification.includes(licenseFilter);
    return matchesSearch && matchesLicense;
  }).slice(0, 10); // Show only 10 entries

  const handleRoleSelect = (role: any) => {
    setSelectedRole(role);
    setEditedObjects([...role.objects]);
  };

  const updateObjectAction = (objectId: number, action: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, action, newValue: action === "Remove" ? "" : obj.newValue } : obj
      )
    );
    setHasChanges(true);
  };

  const updateObjectNewValue = (objectId: number, newValue: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, newValue } : obj
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log("Saving changes for role:", selectedRole?.id, "Objects:", editedObjects);
    // Here you would update the role's objects with the changes
  };

  const handleReset = () => {
    if (selectedRole) {
      setEditedObjects([...selectedRole.objects]);
      setHasChanges(false);
    }
  };

  const handleRunSimulation = () => {
    // Create a new simulation entry and navigate back
    const newSimulation = {
      id: Date.now(),
      name: `Simulation Run ${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      simulationFue: Math.floor(Math.random() * 50) + 250,
      actualFue: 306,
      savings: Math.floor(Math.random() * 40) - 10,
      status: "Running"
    };
    
    console.log("Creating new simulation:", newSimulation);
    navigate("/simulation-run");
  };

  return (
    <Layout title="Create New Simulation">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/simulation-run" className="flex items-center text-blue-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Simulation Run
          </Link>
        </div>

        {/* First Part: Filter Roles */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search by Role ID or Description</label>
                <Input
                  placeholder="Enter role ID or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">License Type</label>
                <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All License Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All License Types</SelectItem>
                    <SelectItem value="GB Advanced Use">GB Advanced Use</SelectItem>
                    <SelectItem value="GC Core Use">GC Core Use</SelectItem>
                    <SelectItem value="GD Self-Service Use">GD Self-Service Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second Part: Role Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Role Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-y-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role/Profile</TableHead>
                    <TableHead>Authorization Classification</TableHead>
                    <TableHead>GB</TableHead>
                    <TableHead>GC</TableHead>
                    <TableHead>GD</TableHead>
                    <TableHead>Assigned to Users</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow 
                      key={role.id} 
                      className={`cursor-pointer hover:bg-gray-50 ${selectedRole?.id === role.id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleRoleSelect(role)}
                    >
                      <TableCell className="font-medium text-blue-600">
                        {role.id}
                      </TableCell>
                      <TableCell>{role.classification}</TableCell>
                      <TableCell>{role.gb}</TableCell>
                      <TableCell>{role.gc}</TableCell>
                      <TableCell>{role.gd}</TableCell>
                      <TableCell className="font-medium">{role.assignedUsers}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Third Part: Authorization Objects Table */}
        {selectedRole && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Authorization Objects - {selectedRole.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Description: {selectedRole.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Object</TableHead>
                      <TableHead>Classification</TableHead>
                      <TableHead>Field Name</TableHead>
                      <TableHead>Value Low</TableHead>
                      <TableHead>Value High</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>New Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editedObjects.map((obj) => (
                      <TableRow key={obj.id}>
                        <TableCell className="font-medium">{obj.object}</TableCell>
                        <TableCell>{obj.classification}</TableCell>
                        <TableCell>{obj.fieldName}</TableCell>
                        <TableCell>{obj.valueLow}</TableCell>
                        <TableCell>{obj.valueHigh}</TableCell>
                        <TableCell>
                          <Select 
                            value={obj.action || ""} 
                            onValueChange={(value) => updateObjectAction(obj.id, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Add">Add</SelectItem>
                              <SelectItem value="Change">Change</SelectItem>
                              <SelectItem value="Remove">Remove</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {obj.action && obj.action !== "Remove" && (
                            <Select 
                              value={obj.newValue || ""} 
                              onValueChange={(value) => updateObjectNewValue(obj.id, value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select new value" />
                              </SelectTrigger>
                              <SelectContent>
                                {licenseOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Run Simulation Button */}
        {hasChanges && (
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleRunSimulation}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
              size="lg"
            >
              Run Simulation
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateSimulation;
