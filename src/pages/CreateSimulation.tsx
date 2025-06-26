
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  const [editedObjects, setEditedObjects] = useState<any[]>([]);

  // Mock data for roles in simulation
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
    }
  ];

  const [selectedRole, setSelectedRole] = useState<any>(null);

  const licenseOptions = [
    "01 (Create)/GC Core Use",
    "02 (Change)/GC Core Use", 
    "03 (Display)/GD Self-Service Use",
    "16 (Execute)/GD Self-Service Use",
    "F4 (Look Up)/GD Self-Service Use"
  ];

  const handleEdit = () => {
    setIsEditing(true);
    if (selectedRole) {
      setEditedObjects([...selectedRole.objects]);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Update the role objects and enable run simulation button
    console.log("Saving changes:", editedObjects);
  };

  const handleRestore = () => {
    if (selectedRole) {
      setEditedObjects([...selectedRole.objects]);
    }
  };

  const updateObjectAction = (objectId: number, action: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, action, newValue: action === "Remove" ? "" : obj.newValue } : obj
      )
    );
  };

  const updateObjectNewValue = (objectId: number, newValue: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, newValue } : obj
      )
    );
  };

  const currentObjects = isEditing ? editedObjects : (selectedRole?.objects || []);

  return (
    <Layout title="Create Simulation">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/simulation-run" className="flex items-center text-blue-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Simulation Run
          </Link>
        </div>

        {/* Roles Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Role to Modify</CardTitle>
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
                  {roles.map((role) => (
                    <TableRow 
                      key={role.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedRole(role)}
                    >
                      <TableCell className="font-medium text-blue-600">
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

        {/* Role Details for Editing */}
        {selectedRole && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Role: {selectedRole.id}</CardTitle>
                  <p className="text-sm text-gray-600">Description: {selectedRole.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <Button onClick={handleEdit} className="flex items-center gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={handleRestore}>
                        Restore
                      </Button>
                      <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save
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
                      {isEditing && (
                        <>
                          <TableHead>Action</TableHead>
                          <TableHead>New Value</TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentObjects.map((obj) => (
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
                        {isEditing && (
                          <>
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
                          </>
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
