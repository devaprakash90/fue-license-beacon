
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CreateSimulation = () => {
  // Mock data - same as FUE Calculation but for simulation context
  const roles = [
    {
      id: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      profile: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      classification: "GB Advanced Use",
      gb: 1, gc: 2, gd: 28,
      assignedUsers: 337
    },
    {
      id: "/SKYBFRHC_TEAMS_MAINTAIN_AD",
      profile: "/SKYBFRHC_TEAMS_MAINTAIN_AD", 
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 1,
      assignedUsers: 108
    },
    {
      id: "/SKYBFRIDD_CC_TEAMS_ADMIN_SST",
      profile: "/SKYBFRIDD_CC_TEAMS_ADMIN_SST",
      classification: "GB Advanced Use", 
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 105
    },
    {
      id: "SAP_AIO_PURCHASER-S",
      profile: "SAP_AIO_PURCHASER-S",
      classification: "GB Advanced Use",
      gb: 2, gc: 3, gd: 156,
      assignedUsers: 336
    }
  ];

  return (
    <Layout title="Create New Simulation">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/simulation-run" className="flex items-center text-belize-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Simulation Run
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Roles for Simulation</CardTitle>
            <p className="text-sm text-gray-600">
              Click on roles to modify their authorization objects and create simulation scenarios
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
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
                  {roles.map((role) => (
                    <TableRow key={role.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Link 
                          to={`/simulation-role-details/${encodeURIComponent(role.id)}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {role.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800">
                          {role.classification}
                        </Badge>
                      </TableCell>
                      <TableCell>{role.gb}</TableCell>
                      <TableCell>{role.gc}</TableCell>
                      <TableCell>{role.gd}</TableCell>
                      <TableCell className="bg-yellow-100 font-medium">{role.assignedUsers}</TableCell>
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

export default CreateSimulation;
