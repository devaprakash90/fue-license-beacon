
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pencil, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateSimulation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editedRoles, setEditedRoles] = useState<any[]>([]);

  // All roles data (similar to FUE Calculation)
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

  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);

  const licenseOptions = [
    "01 (Create)/GC Core Use",
    "02 (Change)/GC Core Use", 
    "03 (Display)/GD Self-Service Use",
    "16 (Execute)/GD Self-Service Use",
    "F4 (Look Up)/GD Self-Service Use"
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedRoles([...roles]);
  };

  const handleSave = () => {
    setIsEditing(false);
    setHasChanges(true);
    console.log("Saving changes:", editedRoles);
  };

  const handleRestore = () => {
    setEditedRoles([...roles]);
  };

  const handleRunSimulation = () => {
    if (hasChanges) {
      console.log("Running simulation with changes...");
      // Here you would save the changes to database and run simulation
    }
  };

  const updateObjectAction = (roleId: string, objectId: number, action: string) => {
    setEditedRoles(prev => 
      prev.map(role => 
        role.id === roleId 
          ? {
              ...role,
              objects: role.objects.map((obj: any) => 
                obj.id === objectId ? { ...obj, action, newValue: action === "Remove" ? "" : obj.newValue } : obj
              )
            }
          : role
      )
    );
  };

  const updateObjectNewValue = (roleId: string, objectId: number, newValue: string) => {
    setEditedRoles(prev => 
      prev.map(role => 
        role.id === roleId 
          ? {
              ...role,
              objects: role.objects.map((obj: any) => 
                obj.id === objectId ? { ...obj, newValue } : obj
              )
            }
          : role
      )
    );
  };

  const currentRoles = isEditing ? editedRoles : roles;

  return (
    <Layout title="Create Simulation">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/simulation-run" className="flex items-center text-blue-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Simulation Run
          </Link>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button onClick={handleEdit} className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                Edit Roles
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleRestore}>
                  Restore
                </Button>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </>
            )}
            {hasChanges && (
              <Button 
                onClick={handleRunSimulation}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Run Simulation
              </Button>
            )}
          </div>
        </div>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Roles for Simulation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role/Profile</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Authorization Classification</TableHead>
                    <TableHead>GB</TableHead>
                    <TableHead>GC</TableHead>
                    <TableHead>GD</TableHead>
                    <TableHead>Assigned to Users</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        {role.id}
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {role.classification}
                        </Badge>
                      </TableCell>
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

        {/* Authorization Objects for Each Role */}
        {isEditing && currentRoles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <CardTitle>Authorization Objects - {role.id}</CardTitle>
              <p className="text-sm text-gray-600">Description: {role.description}</p>
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
                    {role.objects.map((obj: any) => (
                      <TableRow key={obj.id}>
                        <TableCell className="font-medium">{obj.object}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {obj.classification}
                          </Badge>
                        </TableCell>
                        <TableCell>{obj.fieldName}</TableCell>
                        <TableCell>{obj.valueLow}</TableCell>
                        <TableCell>{obj.valueHigh}</TableCell>
                        <TableCell>
                          <Select 
                            value={obj.action || ""} 
                            onValueChange={(value) => updateObjectAction(role.id, obj.id, value)}
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
                              onValueChange={(value) => updateObjectNewValue(role.id, obj.id, value)}
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
        ))}
      </div>
    </Layout>
  );
};

export default CreateSimulation;
