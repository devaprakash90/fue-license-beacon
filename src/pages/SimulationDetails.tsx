
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

  // Mock changes data
  const changes = [
    {
      id: 1,
      roleId: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      roleDescription: "SAP Materials Management - Inventory Management Goods Movements",
      changeType: "License Reduction",
      from: "GB Advanced Use",
      to: "GC Core Use",
      impact: "Reduced 15 FUE",
      authObject: "M_EINF_EKO",
      field: "ACTVT",
      valueLow: "01",
      valueHigh: ""
    },
    {
      id: 2,
      roleId: "/SKYBFRHC_TEAMS_MAINTAIN_AD",
      roleDescription: "Teams Maintenance Administration",
      changeType: "Object Removal",
      from: "S_USER_GRP",
      to: "Removed",
      impact: "Reduced 8 FUE",
      authObject: "S_USER_GRP",
      field: "CLASS",
      valueLow: "*",
      valueHigh: ""
    },
    {
      id: 3,
      roleId: "SAP_AIO_PURCHASER-S",
      roleDescription: "SAP All-in-One Purchaser Standard",
      changeType: "License Optimization",
      from: "GB Advanced Use",
      to: "GD Self-Service Use",
      impact: "Reduced 12 FUE",
      authObject: "M_BANF_EKG",
      field: "ACTVT",
      valueLow: "01",
      valueHigh: ""
    }
  ];

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

        {/* Changes Made */}
        <Card>
          <CardHeader>
            <CardTitle>Changes Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role ID</TableHead>
                    <TableHead>Role Description</TableHead>
                    <TableHead>Change Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Auth Object</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Value Low</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {changes.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell className="font-medium">{change.roleId}</TableCell>
                      <TableCell>{change.roleDescription}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {change.changeType}
                        </span>
                      </TableCell>
                      <TableCell>{change.from}</TableCell>
                      <TableCell>{change.to}</TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{change.impact}</span>
                      </TableCell>
                      <TableCell>{change.authObject}</TableCell>
                      <TableCell>{change.field}</TableCell>
                      <TableCell>{change.valueLow}</TableCell>
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

export default SimulationDetails;
