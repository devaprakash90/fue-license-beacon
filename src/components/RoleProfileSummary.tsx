
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Role {
  id: string;
  description: string;
  classification: string;
  gb: number;
  gc: number;
  gd: number;
  assignedUsers: number;
  objects: any[];
}

interface RoleProfileSummaryProps {
  filteredRoles: Role[];
  selectedRole: Role | null;
  onRoleSelect: (role: Role) => void;
  onRunSimulation: () => void;
  savedChanges: boolean;
}

const RoleProfileSummary: React.FC<RoleProfileSummaryProps> = ({
  filteredRoles,
  selectedRole,
  onRoleSelect,
  onRunSimulation,
  savedChanges,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Role/Profile Summary</CardTitle>
          <Button 
            onClick={onRunSimulation}
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
                  onClick={() => onRoleSelect(role)}
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
  );
};

export default RoleProfileSummary;
