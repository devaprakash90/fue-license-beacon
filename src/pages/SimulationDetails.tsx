
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
import { ArrowLeft, Calendar, TrendingUp, TrendingDown } from "lucide-react";

const SimulationDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Mock simulation data
  const simulation = {
    id: id,
    name: `Simulation Run ${id}`,
    date: "2024-01-15",
    time: "14:30",
    simulationFue: 280,
    actualFue: 306,
    savings: 26,
    status: "Completed"
  };

  // Mock changes data grouped by role
  const roleChanges = [
    {
      roleId: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      roleDescription: "SAP Materials Management - Inventory Management Goods Movements",
      currentLicense: "GB Advanced Use",
      simulatedLicense: "GC Core Use",
      changes: [
        {
          id: 1,
          authObject: "M_EINF_EKO",
          field: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          operation: "Change"
        },
        {
          id: 2,
          authObject: "M_BANF_EKG",
          field: "ACTVT",
          valueLow: "02",
          valueHigh: "03",
          operation: "Add"
        }
      ]
    },
    {
      roleId: "/SKYBFRHC_TEAMS_MAINTAIN_AD",
      roleDescription: "Teams Maintenance Administration",
      currentLicense: "GB Advanced Use",
      simulatedLicense: "Removed",
      changes: [
        {
          id: 3,
          authObject: "S_USER_GRP",
          field: "CLASS",
          valueLow: "*",
          valueHigh: "",
          operation: "Remove"
        }
      ]
    },
    {
      roleId: "SAP_AIO_PURCHASER-S",
      roleDescription: "SAP All-in-One Purchaser Standard",
      currentLicense: "GB Advanced Use",
      simulatedLicense: "GD Self-Service Use",
      changes: [
        {
          id: 4,
          authObject: "M_BANF_EKG",
          field: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          operation: "Change"
        },
        {
          id: 5,
          authObject: "M_EINK_FRG",
          field: "FRGCO",
          valueLow: "M",
          valueHigh: "",
          operation: "Add"
        }
      ]
    }
  ];

  const getOperationBadgeColor = (operation: string) => {
    switch (operation) {
      case "Add":
        return "bg-green-100 text-green-800";
      case "Remove":
        return "bg-red-100 text-red-800";
      case "Change":
        return "bg-blue-100 text-blue-800";
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
              <CardTitle className="text-xl">{simulation.name}</CardTitle>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {simulation.date} at {simulation.time}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{simulation.simulationFue}</div>
                <div className="text-sm text-gray-600">Simulation FUE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{simulation.actualFue}</div>
                <div className="text-sm text-gray-600">Actual FUE</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {simulation.savings > 0 ? (
                    <>
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        {simulation.savings} FUE
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-5 w-5 text-red-600" />
                      <span className="text-2xl font-bold text-red-600">
                        {Math.abs(simulation.savings)} FUE
                      </span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-600">Potential Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes Made - Hierarchical View */}
        <Card>
          <CardHeader>
            <CardTitle>Changes Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roleChanges.map((role) => (
                <div key={role.roleId} className="border border-gray-200 rounded-lg p-4">
                  {/* Role Header */}
                  <div className="mb-4 pb-3 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{role.roleId}</h3>
                        <p className="text-sm text-gray-600">{role.roleDescription}</p>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Current License: </span>
                          <span className="text-gray-900">{role.currentLicense}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Simulated License: </span>
                          <span className="text-gray-900">{role.simulatedLicense}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Changes Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Authorization Object</TableHead>
                          <TableHead>Field</TableHead>
                          <TableHead>Value Low</TableHead>
                          <TableHead>Value High</TableHead>
                          <TableHead>Operation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {role.changes.map((change) => (
                          <TableRow key={change.id}>
                            <TableCell className="font-medium">{change.authObject}</TableCell>
                            <TableCell>{change.field}</TableCell>
                            <TableCell>{change.valueLow}</TableCell>
                            <TableCell>{change.valueHigh || "-"}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getOperationBadgeColor(change.operation)}`}>
                                {change.operation}
                              </span>
                            </TableCell>
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
