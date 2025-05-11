
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultiSelect, { Option } from "@/components/MultiSelect";
import OptimizationRequestsTable from "@/components/OptimizationRequestsTable";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  getLicenseTypes, 
  getOptimizationRequests, 
  createOptimizationRequest,
  createMockResults
} from "@/services/optimizationService";
import { useQuery, useMutation } from "@tanstack/react-query";

// Mock user groups for demonstration
const USER_GROUPS = [
  { id: "finance", name: "Finance" },
  { id: "it", name: "IT" },
  { id: "hr", name: "Human Resources" },
  { id: "sales", name: "Sales" },
  { id: "marketing", name: "Marketing" }
];

const UserOptimization = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string>("");
  const [selectedUserGroups, setSelectedUserGroups] = useState<string[]>([]);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch license types
  const { data: licenseTypes = [] } = useQuery({
    queryKey: ['licenseTypes'],
    queryFn: getLicenseTypes
  });
  
  // Fetch optimization requests
  const { 
    data: requests = [], 
    refetch: refetchRequests 
  } = useQuery({
    queryKey: ['userOptimizationRequests'],
    queryFn: () => getOptimizationRequests('user')
  });
  
  // Create license type options
  const licenseOptions: Option[] = licenseTypes.map((license) => ({
    value: license.id,
    label: license.name
  }));
  
  // Create user group options
  const userGroupOptions: Option[] = USER_GROUPS.map((group) => ({
    value: group.id,
    label: group.name
  }));
  
  // Create optimization request mutation
  const createRequestMutation = useMutation({
    mutationFn: async (filters: Record<string, any>) => {
      setIsLoading(true);
      try {
        const requestId = await createOptimizationRequest('user', filters);
        // Create mock results (in a real app, this would be handled by a backend process)
        await createMockResults(requestId, 'user');
        return requestId;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      toast({
        title: "Analysis Started",
        description: "Your user optimization analysis request has been submitted.",
      });
      refetchRequests();
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
    const filters = {
      userId: userId.trim() || null,
      userGroups: selectedUserGroups.length > 0 ? selectedUserGroups : null,
      licenses: selectedLicenses.length > 0 ? selectedLicenses : null,
    };
    
    createRequestMutation.mutate(filters);
  };
  
  const handleClear = () => {
    setUserId("");
    setSelectedUserGroups([]);
    setSelectedLicenses([]);
  };
  
  return (
    <Layout title="User Level License Optimization">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex justify-between items-center">
              <span>Optimization Filters</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {isFilterOpen ? 'Hide' : 'Show'}
              </Button>
            </CardTitle>
          </CardHeader>
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label htmlFor="userId" className="text-sm font-medium">
                      User ID
                    </label>
                    <Input
                      id="userId"
                      placeholder="Enter user ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Leave blank to analyze based on other filters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      User Group
                    </label>
                    <MultiSelect
                      options={userGroupOptions}
                      selectedValues={selectedUserGroups}
                      onSelectionChange={setSelectedUserGroups}
                      placeholder="Select user groups"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      License Type
                    </label>
                    <MultiSelect
                      options={licenseOptions}
                      selectedValues={selectedLicenses}
                      onSelectionChange={setSelectedLicenses}
                      placeholder="Select license types"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleClear}>
                    Clear
                  </Button>
                  <Button onClick={handleAnalyze} disabled={isLoading}>
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
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Optimization Requests</h3>
          <OptimizationRequestsTable requests={requests} requestType="user" />
        </div>
      </div>
    </Layout>
  );
};

export default UserOptimization;
