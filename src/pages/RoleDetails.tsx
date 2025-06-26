
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
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RoleDetails = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const [editedObjects, setEditedObjects] = useState<any[]>([]);

  // Mock data based on the screenshot
  const roleData = {
    id: decodeURIComponent(roleId || ""),
    description: "SAP Materials Management - Inventory Management Goods Movements",
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

  const currentObjects = roleData.objects;

  return (
    <Layout title={`Role Details: ${roleData.id}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/fue-calculation" className="flex items-center text-blue-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to FUE Calculation
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role: {roleData.id}</CardTitle>
            <p className="text-sm text-gray-600">Description: {roleData.description}</p>
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
