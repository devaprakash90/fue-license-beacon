
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
import { ArrowLeft, pencil, save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RoleDetails = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedObjects, setEditedObjects] = useState<any[]>([]);

  // Mock data based on the screenshot
  const roleData = {
    id: decodeURIComponent(roleId || ""),
    system: "ERQ/800",
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
      },
      {
        id: 3,
        object: "M_LFMF_EKO",
        classification: "GC Core Use",
        fieldName: "ACTVT",
        valueLow: "01",
        valueHigh: "",
        action: null,
        newValue: ""
      },
      {
        id: 4,
        object: "M_MSEG_BME",
        classification: "GD Self-Service Use",
        fieldName: "ACTVT",
        valueLow: "02",
        valueHigh: "",
        action: null,
        newValue: ""
      }
    ]
  };

  const licenseOptions = [
    "01 (Create)/GC Core Use",
    "02 (Change)/GC Core Use", 
    "03 (Display)/GD Self-Service Use",
    "16 (Execute)/GD Self-Service Use",
    "F4 (Look Up)/GD Self-Service Use"
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedObjects([...roleData.objects]);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the changes to the backend
    console.log("Saving changes:", editedObjects);
  };

  const handleRestore = () => {
    setEditedObjects([...roleData.objects]);
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

  const currentObjects = isEditing ? editedObjects : roleData.objects;

  return (
    <Layout title={`Role Details: ${roleData.id}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/fue-calculation" className="flex items-center text-belize-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to FUE Calculation
          </Link>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button onClick={handleEdit} className="flex items-center gap-2">
                <pencil className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleRestore}>
                  Restore
                </Button>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <save className="h-4 w-4" />
                  Save
                </Button>
              </>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role: {roleData.id}</CardTitle>
            <p className="text-sm text-gray-600">System: {roleData.system}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Meaning of colors:</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Newly added</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Marked for deletion</span>
                </div>
              </div>
            </div>

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
                        <Badge 
                          variant="outline" 
                          className={
                            obj.classification.includes("Advanced") ? "bg-orange-100 text-orange-800" :
                            obj.classification.includes("Core") ? "bg-green-100 text-green-800" :
                            "bg-blue-100 text-blue-800"
                          }
                        >
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
      </div>
    </Layout>
  );
};

export default RoleDetails;
