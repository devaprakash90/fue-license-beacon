
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OptimizationRequest } from "@/types/optimization";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface OptimizationRequestsTableProps {
  requests: OptimizationRequest[];
  requestType: 'role' | 'user';
}

const OptimizationRequestsTable: React.FC<OptimizationRequestsTableProps> = ({
  requests,
  requestType,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Error":
        return "text-red-600";
      case "In Progress":
        return "text-blue-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No optimization requests found. Use the filters above to start a new analysis.
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id.slice(0, 8)}</TableCell>
                <TableCell>
                  {format(new Date(request.created_at), "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
                <TableCell>
                  <span className={getStatusColor(request.status)}>
                    {request.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {request.status === "Completed" && (
                    <Link 
                      to={`/${requestType === 'role' ? 'role' : 'user'}-optimization-results/${request.id}`}
                    >
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OptimizationRequestsTable;
