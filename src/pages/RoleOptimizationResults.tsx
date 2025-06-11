
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Loader2, Calculator } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRoleOptimizationResults } from "@/services/optimizationService";
import { generateSimulation } from "@/services/simulationService";
import { RoleOptimizationResult } from "@/types/optimization";
import { useToast } from "@/hooks/use-toast";

const RoleOptimizationResults = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showReducibleOnly, setShowReducibleOnly] = useState(false);
  
  const { data: results = [], isLoading } = useQuery({
    queryKey: ['roleOptimizationResults', requestId],
    queryFn: () => getRoleOptimizationResults(requestId!),
    enabled: !!requestId,
  });

  const simulationMutation = useMutation({
    mutationFn: () => generateSimulation(requestId!),
    onSuccess: () => {
      toast({
        title: "Simulation Generated",
        description: "Your simulation results are ready for review.",
      });
      navigate(`/simulation-results/${requestId}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate simulation. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Filter results based on search term and reducible checkbox
  const filteredResults = results.filter((result) => {
    const matchesSearch =
      !searchTerm ||
      result.role_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (result.role_description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (result.auth_object?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
    return matchesSearch && (!showReducibleOnly || result.license_can_be_reduced === true);
  });
  
  return (
    <Layout title="Role Optimization Results">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/role-optimization" className="flex items-center text-belize-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Role Optimization
          </Link>
          <div>
            <span className="text-sm font-medium">Request ID: </span>
            <span className="text-sm">{requestId}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-md border p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Filter Results</h3>
          <div className="grid gap-4 md:grid-cols-3 items-end">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by role ID, description, object..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reducibleOnly"
                checked={showReducibleOnly}
                onCheckedChange={(checked) => 
                  setShowReducibleOnly(checked === true)}
              />
              <Label htmlFor="reducibleOnly">
                Show only roles with reducible licenses
              </Label>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => simulationMutation.mutate()}
                disabled={simulationMutation.isPending}
                className="flex items-center gap-2"
              >
                {simulationMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4" />
                    View Simulation
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border bg-white">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-belize-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role ID</TableHead>
                    <TableHead>Role Description</TableHead>
                    <TableHead>Authorization Object</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>License Reducible</TableHead>
                    <TableHead>Insights & Recommendations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No results found. Try adjusting your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.role_id}</TableCell>
                        <TableCell>{result.role_description || "-"}</TableCell>
                        <TableCell>{result.auth_object || "-"}</TableCell>
                        <TableCell>{result.field || "-"}</TableCell>
                        <TableCell>{result.value || "-"}</TableCell>
                        <TableCell>
                          {result.license_can_be_reduced ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              No
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          {result.insights && (
                            <div className="mb-1">
                              <span className="font-medium">Insights:</span> {result.insights}
                            </div>
                          )}
                          {result.recommendations && (
                            <div>
                              <span className="font-medium">Recommendations:</span>{" "}
                              {result.recommendations}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RoleOptimizationResults;
