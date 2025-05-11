
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultiSelect, { Option } from "@/components/MultiSelect";
import OptimizationRequestsTable from "@/components/OptimizationRequestsTable";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { OptimizationRequest, LicenseType, RatioOption } from "@/types/optimization";
import { 
  getLicenseTypes, 
  getRatioOptions, 
  getOptimizationRequests, 
  createOptimizationRequest,
  createMockResults
} from "@/services/optimizationService";
import { useQuery, useMutation } from "@tanstack/react-query";

const RoleOptimization = () => {
  const { toast } = useToast();
  const [roleIds, setRoleIds] = useState<string>("");
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [selectedRatios, setSelectedRatios] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch license types
  const { data: licenseTypes = [] } = useQuery({
    queryKey: ['licenseTypes'],
    queryFn: getLicenseTypes
  });
  
  // Fetch ratio options
  const { data: ratioOptions = [] } = useQuery({
    queryKey: ['ratioOptions'],
    queryFn: getRatioOptions
  });
  
  // Fetch optimization requests
  const { 
    data: requests = [], 
    refetch: refetchRequests 
  } = useQuery({
    queryKey: ['roleOptimizationRequests'],
    queryFn: () => getOptimizationRequests('role')
  });
  
  // Create license type options
  const licenseOptions: Option[] = licenseTypes.map((license) => ({
    value: license.id,
    label: license.name
  }));
  
  // Create ratio options
  const ratioOptionsList: Option[] = ratioOptions.map((ratio) => ({
    value: ratio.id,
    label: ratio.value
  }));
  
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
    onSuccess: () => {
      toast({
        title: "Analysis Started",
        description: "Your role optimization analysis request has been submitted.",
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
    // Extract role IDs into an array
    const roleIdArray = roleIds.split(',').map(id => id.trim()).filter(id => id);
    
    const filters = {
      roleIds: roleIdArray.length > 0 ? roleIdArray : null,
      licenses: selectedLicenses.length > 0 ? selectedLicenses : null,
      ratios: selectedRatios.length > 0 ? selectedRatios : null,
    };
    
    createRequestMutation.mutate(filters);
  };
  
  const handleClear = () => {
    setRoleIds("");
    setSelectedLicenses([]);
    setSelectedRatios([]);
  };
  
  return (
    <Layout title="Role Level License Optimization">
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
                      License Type(s)
                    </label>
                    <MultiSelect
                      options={licenseOptions}
                      selectedValues={selectedLicenses}
                      onSelectionChange={setSelectedLicenses}
                      placeholder="Select license types"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Ratio
                    </label>
                    <MultiSelect
                      options={ratioOptionsList}
                      selectedValues={selectedRatios}
                      onSelectionChange={setSelectedRatios}
                      placeholder="Select ratios"
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
          <OptimizationRequestsTable requests={requests} requestType="role" />
        </div>
      </div>
    </Layout>
  );
};

export default RoleOptimization;
