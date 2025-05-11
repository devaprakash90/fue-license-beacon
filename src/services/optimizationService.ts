
import { supabase } from "@/integrations/supabase/client";
import { 
  OptimizationRequest, 
  OptimizationRequestType,
  RoleOptimizationResult,
  UserOptimizationResult,
  LicenseType,
  RatioOption
} from "@/types/optimization";

export const getLicenseTypes = async (): Promise<LicenseType[]> => {
  const { data, error } = await supabase
    .from('license_types')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const getRatioOptions = async (): Promise<RatioOption[]> => {
  const { data, error } = await supabase
    .from('ratio_options')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const createOptimizationRequest = async (
  requestType: OptimizationRequestType,
  filters: Record<string, any>
): Promise<string> => {
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
  return data.id;
};

export const getOptimizationRequests = async (
  requestType: OptimizationRequestType
): Promise<OptimizationRequest[]> => {
  const { data, error } = await supabase
    .from('optimization_requests')
    .select('*')
    .eq('request_type', requestType)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as unknown as OptimizationRequest[] || [];
};

export const getRoleOptimizationResults = async (
  requestId: string
): Promise<RoleOptimizationResult[]> => {
  const { data, error } = await supabase
    .from('role_optimization_results')
    .select('*')
    .eq('request_id', requestId);
  
  if (error) throw error;
  return data || [];
};

export const getUserOptimizationResults = async (
  requestId: string
): Promise<UserOptimizationResult[]> => {
  const { data, error } = await supabase
    .from('user_optimization_results')
    .select('*')
    .eq('request_id', requestId);
  
  if (error) throw error;
  return data || [];
};

// Mock data creation for demonstration purposes
export const createMockResults = async (requestId: string, requestType: OptimizationRequestType) => {
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
    
    await supabase.from('role_optimization_results').insert(mockResults);
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
    
    await supabase.from('user_optimization_results').insert(mockResults);
  }
  
  // Update request status to completed
  await supabase
    .from('optimization_requests')
    .update({ status: 'Completed' })
    .eq('id', requestId);
};
