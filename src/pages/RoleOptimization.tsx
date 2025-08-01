
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OptimizationRequestsTable from "@/components/OptimizationRequestsTable";
import { Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { OptimizationRequest, LicenseType, RatioOption } from "@/types/optimization";
import { 
  getOptimizationRequests, 
  createOptimizationRequest,
  createMockResults
} from "@/services/optimizationService";
import { useQuery, useMutation } from "@tanstack/react-query";

const RoleOptimization = () => {
  const { toast } = useToast();
  const [roleIds, setRoleIds] = useState<string>("");
  const [selectedLicense, setSelectedLicense] = useState<string>("");
  const [ratioValue, setRatioValue] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [requestNumber, setRequestNumber] = useState<string>("");
  
  // Fixed license types as per requirements
  const licenseOptions = [
    { value: "gb_advanced", label: "GB Advanced Use" },
    { value: "gc_core", label: "GC Core Use" },
    { value: "gd_self_service", label: "GD Self-Service Use" }
  ];
  
  // Fetch optimization requests
  const { 
    data: requests = [], 
    refetch: refetchRequests,
    isRefetching 
  } = useQuery({
    queryKey: ['roleOptimizationRequests'],
    queryFn: () => getOptimizationRequests('role')
  });
  
  // Create optimization request mutation
  const createRequestMutation = useMutation({
    mutationFn: async (filters: Record<string, any>) => {
      setIsLoading(true);
      try {
        const requestId = await createOptimizationRequest('role', filters);
        // Create mock results (in a real app, this would be handled by a backend process)
        await createMockResults(requestId, 'role');
        return requestId;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (requestId) => {
      // Generate random request number and show dialog
      const randomRequestNumber = `REQ-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      setRequestNumber(randomRequestNumber);
      setShowDialog(true);
    },
    onError: (error) => {
      console.error("Error creating optimization request:", error);
      toast({
        title: "Error",
        description: "Failed to create optimization request. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleAnalyze = () => {
    // Extract role IDs into an array
    const roleIdArray = roleIds.split(',').map(id => id.trim()).filter(id => id);
    
    const filters = {
      roleIds: roleIdArray.length > 0 ? roleIdArray : null,
      license: selectedLicense || null,
      ratio: ratioValue.trim() || null,
    };
    
    createRequestMutation.mutate(filters);
  };
  
  const handleClear = () => {
    setRoleIds("");
    setSelectedLicense("");
    setRatioValue("");
  };

  const handleRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow whole numbers from 1 to 100
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 100)) {
      setRatioValue(value);
    }
  };

  const handleDialogClose = async () => {
    setShowDialog(false);
    // Add a small delay to make the refresh feel more realistic
    setTimeout(() => {
      refetchRequests();
    }, 500);
  };
  
  return (
    <Layout title="Role Level License Optimization">
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="roleIds" className="text-sm font-medium">
                    Role ID(s)
                  </label>
                  <Input
                    id="roleIds"
                    placeholder="Enter one or more role IDs, comma separated"
                    value={roleIds}
                    onChange={(e) => setRoleIds(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Leave blank to analyze all roles
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    License Type
                  </label>
                  <Select value={selectedLicense} onValueChange={setSelectedLicense}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent>
                      {licenseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Ratio (1-100)
                  </label>
                  <Input
                    placeholder="Enter ratio value (1-100)"
                    value={ratioValue}
                    onChange={handleRatioChange}
                    type="text"
                  />
                  <p className="text-xs text-gray-500">
                    Whole numbers only, range: 1-100
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleClear}>
                  Clear
                </Button>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-800 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Optimization Requests</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetchRequests()}
              disabled={isRefetching}
              className="flex items-center gap-2"
            >
              {isRefetching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
          <OptimizationRequestsTable requests={requests} requestType="role" />
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Submitted</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-2">
                Request Number: <span className="font-mono font-medium">{requestNumber}</span>
              </p>
              <p>Your request has been submitted and analysis is in progress.</p>
            </div>
            <DialogFooter>
              <Button onClick={handleDialogClose}>Ok</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default RoleOptimization;
