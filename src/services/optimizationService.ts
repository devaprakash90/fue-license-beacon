
import { supabase } from "@/integrations/supabase/client";
import { 
  OptimizationRequest, 
  OptimizationRequestType,
  RoleOptimizationResult,
  UserOptimizationResult,
  LicenseType,
  RatioOption
} from "@/types/optimization";

// Mock data for license types if the database query fails
const mockLicenseTypes: LicenseType[] = [
  { id: "prof", name: "Professional", description: "Full access to all features" },
  { id: "std", name: "Standard", description: "Standard feature access" },
  { id: "basic", name: "Basic", description: "Limited feature access" },
  { id: "self", name: "Self Service", description: "Minimal access for self-service tasks" }
];

// Mock data for ratio options if the database query fails
const mockRatioOptions: RatioOption[] = [
  { id: "1", value: "1:1" },
  { id: "2", value: "1:2" },
  { id: "3", value: "1:3" },
  { id: "4", value: "1:4" },
  { id: "5", value: "1:5" }
];

export const getLicenseTypes = async (): Promise<LicenseType[]> => {
  try {
    const { data, error } = await supabase
      .from('license_types')
      .select('*');
    
    if (error) throw error;
    return data || mockLicenseTypes;
  } catch (error) {
    console.error("Error fetching license types:", error);
    return mockLicenseTypes; // Fallback to mock data
  }
};

export const getRatioOptions = async (): Promise<RatioOption[]> => {
  try {
    const { data, error } = await supabase
      .from('ratio_options')
      .select('*');
    
    if (error) throw error;
    return data || mockRatioOptions;
  } catch (error) {
    console.error("Error fetching ratio options:", error);
    return mockRatioOptions; // Fallback to mock data
  }
};

export const createOptimizationRequest = async (
  requestType: OptimizationRequestType,
  filters: Record<string, any>
): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('optimization_requests')
      .insert({
        request_type: requestType,
        filters,
        status: 'Started'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data?.id || crypto.randomUUID();
  } catch (error) {
    console.error("Error creating optimization request:", error);
    // Generate a mock UUID for development purposes
    return crypto.randomUUID();
  }
};

export const getOptimizationRequests = async (
  requestType: OptimizationRequestType
): Promise<OptimizationRequest[]> => {
  try {
    const { data, error } = await supabase
      .from('optimization_requests')
      .select('*')
      .eq('request_type', requestType)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as OptimizationRequest[];
  } catch (error) {
    console.error(`Error fetching ${requestType} optimization requests:`, error);
    
    // Return mock data for development
    const mockRequests: OptimizationRequest[] = [
      {
        id: crypto.randomUUID(),
        request_type: requestType,
        filters: { test: "filter" },
        status: 'Completed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        request_type: requestType,
        filters: { test: "filter2" },
        status: 'In Progress',
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        updated_at: new Date(Date.now() - 3600000).toISOString()
      }
    ];
    
    return mockRequests;
  }
};

export const getRoleOptimizationResults = async (
  requestId: string
): Promise<RoleOptimizationResult[]> => {
  try {
    const { data, error } = await supabase
      .from('role_optimization_results')
      .select('*')
      .eq('request_id', requestId);
    
    if (error) throw error;
    return (data || []) as RoleOptimizationResult[];
  } catch (error) {
    console.error("Error fetching role optimization results:", error);
    
    // Return mock results for development
    return [
      {
        id: crypto.randomUUID(),
        request_id: requestId,
        role_id: 'ADMIN_ROLE',
        role_description: 'System Administrator',
        auth_object: 'S_TCODE',
        field: 'TCD',
        value: 'SU01',
        license_can_be_reduced: true,
        insights: 'This role contains admin privileges that may be excessive for most users',
        recommendations: 'Consider splitting into separate roles with fewer privileges',
        explanations: 'Admin privileges should be limited to reduce security risks',
        created_at: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        request_id: requestId,
        role_id: 'FINANCE_ROLE',
        role_description: 'Finance Department Access',
        auth_object: 'F_BKPF_BUK',
        field: 'BUKRS',
        value: '1000',
        license_can_be_reduced: false,
        insights: 'This role has appropriate permissions for finance users',
        recommendations: 'No changes needed',
        explanations: 'Role is properly configured for finance department needs',
        created_at: new Date().toISOString()
      }
    ];
  }
};

export const getUserOptimizationResults = async (
  requestId: string
): Promise<UserOptimizationResult[]> => {
  try {
    const { data, error } = await supabase
      .from('user_optimization_results')
      .select('*')
      .eq('request_id', requestId);
    
    if (error) throw error;
    return (data || []) as UserOptimizationResult[];
  } catch (error) {
    console.error("Error fetching user optimization results:", error);
    
    // Return mock results for development
    return [
      {
        id: crypto.randomUUID(),
        request_id: requestId,
        user_id: 'USER001',
        display_name: 'John Doe',
        valid_from: new Date('2023-01-01').toISOString(),
        valid_to: new Date('2024-12-31').toISOString(),
        user_group: 'FINANCE',
        last_logon: new Date('2023-06-15').toISOString(),
        license_can_be_reduced: true,
        insights: 'User has not logged in for over 3 months',
        recommendations: 'Consider downgrading to Self-Service license',
        explanations: 'Infrequent usage does not justify Professional license cost',
        created_at: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        request_id: requestId,
        user_id: 'USER002',
        display_name: 'Jane Smith',
        valid_from: new Date('2023-01-01').toISOString(),
        valid_to: null,
        user_group: 'IT',
        last_logon: new Date('2023-10-01').toISOString(),
        license_can_be_reduced: false,
        insights: 'User actively uses advanced features',
        recommendations: 'Maintain current Professional license',
        explanations: 'Usage patterns justify the current license type',
        created_at: new Date().toISOString()
      }
    ];
  }
};

// Mock data creation for demonstration purposes
export const createMockResults = async (requestId: string, requestType: OptimizationRequestType) => {
  try {
    // Update request status
    await supabase
      .from('optimization_requests')
      .update({ status: 'In Progress' })
      .eq('id', requestId);
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (requestType === 'role') {
      // Create mock role optimization results
      const mockResults = [
        {
          request_id: requestId,
          role_id: 'ADMIN_ROLE',
          role_description: 'System Administrator',
          auth_object: 'S_TCODE',
          field: 'TCD',
          value: 'SU01',
          license_can_be_reduced: true,
          insights: 'This role contains admin privileges that may be excessive for most users',
          recommendations: 'Consider splitting into separate roles with fewer privileges',
          explanations: 'Admin privileges should be limited to reduce security risks'
        },
        {
          request_id: requestId,
          role_id: 'FINANCE_ROLE',
          role_description: 'Finance Department Access',
          auth_object: 'F_BKPF_BUK',
          field: 'BUKRS',
          value: '1000',
          license_can_be_reduced: false,
          insights: 'This role has appropriate permissions for finance users',
          recommendations: 'No changes needed',
          explanations: 'Role is properly configured for finance department needs'
        }
      ];
      
      try {
        await supabase.from('role_optimization_results').insert(mockResults);
      } catch (error) {
        console.error("Error inserting mock role results:", error);
      }
    } else {
      // Create mock user optimization results
      const mockResults = [
        {
          request_id: requestId,
          user_id: 'USER001',
          display_name: 'John Doe',
          valid_from: new Date('2023-01-01').toISOString(),
          valid_to: new Date('2024-12-31').toISOString(),
          user_group: 'FINANCE',
          last_logon: new Date('2023-06-15').toISOString(),
          license_can_be_reduced: true,
          insights: 'User has not logged in for over 3 months',
          recommendations: 'Consider downgrading to Self-Service license',
          explanations: 'Infrequent usage does not justify Professional license cost'
        },
        {
          request_id: requestId,
          user_id: 'USER002',
          display_name: 'Jane Smith',
          valid_from: new Date('2023-01-01').toISOString(),
          valid_to: null,
          user_group: 'IT',
          last_logon: new Date('2023-10-01').toISOString(),
          license_can_be_reduced: false,
          insights: 'User actively uses advanced features',
          recommendations: 'Maintain current Professional license',
          explanations: 'Usage patterns justify the current license type'
        }
      ];
      
      try {
        await supabase.from('user_optimization_results').insert(mockResults);
      } catch (error) {
        console.error("Error inserting mock user results:", error);
      }
    }
    
    // Update request status to completed
    await supabase
      .from('optimization_requests')
      .update({ status: 'Completed' })
      .eq('id', requestId);
  } catch (error) {
    console.error("Error creating mock results:", error);
    // Continue with execution even if there's an error with Supabase
  }
};
