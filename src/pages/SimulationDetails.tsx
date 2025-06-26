
import React from "react";
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
import { ArrowLeft, Calendar, TrendingUp, TrendingDown } from "lucide-react";

const SimulationDetails = () => {
  const { simulationId } = useParams<{ simulationId: string }>();

  // Mock simulation data - in real app this would come from API
  const simulationData = {
    id: simulationId,
    name: `Simulation Run ${simulationId}`,
    date: "2024-01-15",
    time: "14:30",
    simulationFue: 280,
    actualFue: 306,
    savings: 26,
    status: "Completed",
    description: "SAP Materials Management optimization analysis",
    changes: [
      {
        roleId: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
        roleDescription: "SAP Materials Management - Inventory Management Goods Movements",
        objectsModified: 2,
        changes: [
          {
            object: "M_EINF_EKO",
            fieldName: "ACTVT",
            originalValue: "01",
            newValue: "03 (Display)/GD Self-Service Use",
            action: "Change",
            impact: "License downgrade from GB to GD"
          },
          {
            object: "M_EINF_EKO",
            fieldName: "ACTVT",
            originalValue: "02",
            newValue: "",
            action: "Remove",
            impact: "Removed unnecessary permission"
          }
        ]
      },
      {
        roleId: "/SKYBFRHC_TEAMS_MAINTAIN_AD",
        roleDescription: "Teams Maintenance Administration",
        objectsModified: 1,
        changes: [
          {
            object: "S_USER_GRP",
            fieldName: "CLASS",
            originalValue: "*",
            newValue: "16 (Execute)/GD Self-Service Use",
            action: "Change",
            impact: "License optimization to Self-Service"
          }
        ]
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Running":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "Add":
        return "bg-blue-100 text-blue-800";
      case "Change":
        return "bg-orange-100 text-orange-800";
      case "Remove":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout title="Simulation Details">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/simulation-run" className="flex items-center text-blue-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Simulation Run
          </Link>
        </div>

        {/* Simulation Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{simulationData.name}</CardTitle>
              <Badge className={getStatusColor(simulationData.status)}>
                {simulationData.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {simulationData.date} at {simulationData.time}
            </div>
            <p className="text-gray-600 mt-2">{simulationData.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{simulationData.simulationFue}</div>
                <div className="text-sm text-gray-600">Simulation FUE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{simulationData.actualFue}</div>
                <div className="text-sm text-gray-600">Actual FUE</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {simulationData.savings > 0 ? (
                    <>
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        {simulationData.savings}
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-5 w-5 text-red-600" />
                      <span className="text-2xl font-bold text-red-600">
                        {Math.abs(simulationData.savings)}
                      </span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-600">Potential Savings (FUE)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes Made */}
        <Card>
          <CardHeader>
            <CardTitle>Changes Made During Simulation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {simulationData.changes.map((roleChange, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-blue-600">{roleChange.roleId}</h3>
                    <p className="text-sm text-gray-600">{roleChange.roleDescription}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {roleChange.objectsModified} object(s) modified
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Object</TableHead>
                          <TableHead>Field Name</TableHead>
                          <TableHead>Original Value</TableHead>
                          <TableHead>New Value</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Impact</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roleChange.changes.map((change, changeIndex) => (
                          <TableRow key={changeIndex}>
                            <TableCell className="font-medium">{change.object}</TableCell>
                            <TableCell>{change.fieldName}</TableCell>
                            <TableCell>{change.originalValue}</TableCell>
                            <TableCell>{change.newValue || "—"}</TableCell>
                            <TableCell>
                              <Badge className={getActionColor(change.action)}>
                                {change.action}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{change.impact}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SimulationDetails;
