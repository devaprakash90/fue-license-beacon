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
import { ArrowLeft, Save, RotateCcw, Pencil, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const CreateSimulation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseFilter, setLicenseFilter] = useState("all");
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [editedObjects, setEditedObjects] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedChanges, setSavedChanges] = useState(false);

  // Mock data with 20 roles
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
          newValue: "",
          isNew: false
        },
        {
          id: 2,
          object: "M_EINF_EKO",
          classification: "GD Self-Service Use",
          fieldName: "ACTVT", 
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
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
          newValue: "",
          isNew: false
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
          newValue: "",
          isNew: false
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
          newValue: "",
          isNew: false
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
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_FI_GL_MASTER_RECORD_MAINTAIN",
      description: "Financial Accounting General Ledger Master Record Maintenance",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 5,
      assignedUsers: 89,
      objects: [
        {
          id: 7,
          object: "F_SKA1_MAI",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_SD_SALES_ORDER_PROCESSING",
      description: "Sales and Distribution Sales Order Processing",
      classification: "GB Advanced Use",
      gb: 1, gc: 1, gd: 45,
      assignedUsers: 234,
      objects: [
        {
          id: 8,
          object: "V_VBAK_VKO",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_PP_PRODUCTION_PLANNING",
      description: "Production Planning and Control",
      classification: "GB Advanced Use",
      gb: 2, gc: 1, gd: 23,
      assignedUsers: 145,
      objects: [
        {
          id: 9,
          object: "P_PKHD_LOW",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_HR_PERSONNEL_ADMINISTRATION",
      description: "Human Resources Personnel Administration",
      classification: "GC Core Use",
      gb: 0, gc: 2, gd: 12,
      assignedUsers: 78,
      objects: [
        {
          id: 10,
          object: "P_PERNR_REP",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_CO_COST_CENTER_ACCOUNTING",
      description: "Controlling Cost Center Accounting",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 8,
      assignedUsers: 67,
      objects: [
        {
          id: 11,
          object: "K_CSKS_MNT",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_QM_QUALITY_MANAGEMENT",
      description: "Quality Management System",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 15,
      assignedUsers: 56,
      objects: [
        {
          id: 12,
          object: "Q_QALS_CHG",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_WM_WAREHOUSE_MANAGEMENT",
      description: "Warehouse Management System",
      classification: "GD Self-Service Use",
      gb: 0, gc: 0, gd: 34,
      assignedUsers: 123,
      objects: [
        {
          id: 13,
          object: "L_LAGP_REP",
          classification: "GD Self-Service Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_PM_PLANT_MAINTENANCE",
      description: "Plant Maintenance and Service Management",
      classification: "GB Advanced Use",
      gb: 1, gc: 1, gd: 19,
      assignedUsers: 89,
      objects: [
        {
          id: 14,
          object: "I_EQUI_CHG",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_PS_PROJECT_SYSTEM",
      description: "Project System Management",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 7,
      assignedUsers: 45,
      objects: [
        {
          id: 15,
          object: "K_PROJECT_REP",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_BC_BASIS_ADMINISTRATION",
      description: "Basis System Administration",
      classification: "GB Advanced Use",
      gb: 3, gc: 0, gd: 2,
      assignedUsers: 12,
      objects: [
        {
          id: 16,
          object: "S_TCODE",
          classification: "GB Advanced Use",
          fieldName: "TCD",
          valueLow: "SM*",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_TR_TREASURY_MANAGEMENT",
      description: "Treasury and Risk Management",
      classification: "GC Core Use",
      gb: 0, gc: 2, gd: 5,
      assignedUsers: 34,
      objects: [
        {
          id: 17,
          object: "F_TR_TABLE",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_IS_INDUSTRY_SOLUTIONS",
      description: "Industry-Specific Solutions",
      classification: "GD Self-Service Use",
      gb: 0, gc: 0, gd: 25,
      assignedUsers: 87,
      objects: [
        {
          id: 18,
          object: "IS_OIL_REP",
          classification: "GD Self-Service Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_LE_LOGISTICS_EXECUTION",
      description: "Logistics Execution and Transportation",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 18,
      assignedUsers: 76,
      objects: [
        {
          id: 19,
          object: "V_LIKP_VST",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_CRM_CUSTOMER_RELATIONSHIP",
      description: "Customer Relationship Management",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 22,
      assignedUsers: 98,
      objects: [
        {
          id: 20,
          object: "CRM_OPPORTUNITY",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
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
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const updateObjectAction = (objectId: number, action: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, action, newValue: action === "Remove" ? "" : obj.newValue } : obj
      )
    );
    setHasChanges(true);
    setSavedChanges(false);
  };

  const updateObjectNewValue = (objectId: number, newValue: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, newValue } : obj
      )
    );
    setHasChanges(true);
    setSavedChanges(false);
  };

  const updateObjectField = (objectId: number, field: string, value: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, [field]: value } : obj
      )
    );
    setHasChanges(true);
    setSavedChanges(false);
  };

  const handleAddObject = () => {
    const newObject = {
      id: Date.now(),
      object: "",
      classification: "",
      fieldName: "",
      valueLow: "",
      valueHigh: "",
      action: "Add",
      newValue: "",
      isNew: true
    };
    setEditedObjects(prev => [...prev, newObject]);
    setHasChanges(true);
    setSavedChanges(false);
  };

  const handleSave = () => {
    console.log("Saving changes for role:", selectedRole?.id, "Objects:", editedObjects);
    setIsEditing(false);
    setSavedChanges(true);
    setHasChanges(false);
    toast({
      title: "Changes Saved",
      description: "Role changes have been saved successfully.",
    });
  };

  const handleReset = () => {
    if (selectedRole) {
      setEditedObjects([...selectedRole.objects]);
      setHasChanges(false);
      setIsEditing(false);
      setSavedChanges(false);
    }
  };

  const generateRequestNumber = () => {
    return `SIM${String(Date.now()).slice(-6)}`;
  };

  const handleRunSimulation = () => {
    const requestNumber = generateRequestNumber();
    
    toast({
      title: "Simulation Request Submitted",
      description: `Request for Simulation Run has been submitted. Request Number: ${requestNumber}`,
    });
    
    // Navigate back to simulation run page
    setTimeout(() => {
      navigate("/simulation-run");
    }, 2000);
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

        {/* Second Part: Role/Profile Summary Table with Run Simulation Button */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Role/Profile Summary</CardTitle>
              <Button 
                onClick={handleRunSimulation}
                disabled={!savedChanges}
                className="bg-orange-600 hover:bg-orange-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Run Simulation
              </Button>
            </div>
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
                  {!isEditing ? (
                    <Button onClick={handleEditClick} variant="outline">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleAddObject} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Object
                      </Button>
                    </>
                  )}
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
                      {isEditing && <TableHead>Action</TableHead>}
                      {isEditing && <TableHead>New Value</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editedObjects.map((obj) => (
                      <TableRow key={obj.id}>
                        <TableCell>
                          {isEditing && obj.isNew ? (
                            <Input 
                              value={obj.object} 
                              onChange={(e) => updateObjectField(obj.id, 'object', e.target.value)}
                              placeholder="Enter object"
                            />
                          ) : (
                            <span className="font-medium">{obj.object}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {obj.isNew ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            obj.classification
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && obj.isNew ? (
                            <Input 
                              value={obj.fieldName} 
                              onChange={(e) => updateObjectField(obj.id, 'fieldName', e.target.value)}
                              placeholder="Enter field name"
                            />
                          ) : (
                            obj.fieldName
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && obj.isNew ? (
                            <Input 
                              value={obj.valueLow} 
                              onChange={(e) => updateObjectField(obj.id, 'valueLow', e.target.value)}
                              placeholder="Enter value low"
                            />
                          ) : (
                            obj.valueLow
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && obj.isNew ? (
                            <Input 
                              value={obj.valueHigh} 
                              onChange={(e) => updateObjectField(obj.id, 'valueHigh', e.target.value)}
                              placeholder="Enter value high"
                            />
                          ) : (
                            obj.valueHigh
                          )}
                        </TableCell>
                        {isEditing && (
                          <TableCell>
                            <Select 
                              value={obj.action || ""} 
                              onValueChange={(value) => updateObjectAction(obj.id, value)}
                              disabled={obj.isNew}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={obj.isNew ? "Add" : "Select action"} />
                              </SelectTrigger>
                              <SelectContent>
                                {obj.isNew ? (
                                  <SelectItem value="Add">Add</SelectItem>
                                ) : (
                                  <>
                                    <SelectItem value="Change">Change</SelectItem>
                                    <SelectItem value="Remove">Remove</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        )}
                        {isEditing && (
                          <TableCell>
                            {obj.action && obj.action !== "Remove" && !obj.isNew && (
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
                            {obj.isNew && (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CreateSimulation;
