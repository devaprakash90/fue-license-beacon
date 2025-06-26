
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FueCalculation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseFilter, setLicenseFilter] = useState("all");

  // Mock data based on the screenshot
  const fueCalculation = {
    totalFue: 306,
    breakdown: [
      { classification: "GB - Advanced Use", users: 194, fue: 194 },
      { classification: "GC - Core Use", users: 470, fue: 94 },
      { classification: "GD - Self-Service Use", users: 101, fue: 4 }
    ]
  };

  // Generate 20 mock roles
  const roles = [
    {
      id: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      profile: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      description: "SAP Materials Management - Inventory Management Goods Movements",
      classification: "GB Advanced Use",
      gb: 1, gc: 2, gd: 28,
      assignedUsers: 337
    },
    {
      id: "/SKYBFRHC_TEAMS_MAINTAIN_AD",
      profile: "/SKYBFRHC_TEAMS_MAINTAIN_AD", 
      description: "Teams Maintenance Administration",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 1,
      assignedUsers: 108
    },
    {
      id: "/SKYBFRIDD_CC_TEAMS_ADMIN_SST",
      profile: "/SKYBFRIDD_CC_TEAMS_ADMIN_SST",
      description: "Teams Administration Self-Service Tools",
      classification: "GB Advanced Use", 
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 105
    },
    {
      id: "ZUCM_SAP_INTNW_BMT_WFM_DEVELOP",
      profile: "ZUCM_SAP_INTNW_BMT_WFM_DEVELOP",
      description: "SAP Internal Network Business Management Tools - Workflow Development",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 3
    },
    {
      id: "SAP_AIO_PURCHASER-S",
      profile: "SAP_AIO_PURCHASER-S",
      description: "SAP All-in-One Purchaser Standard",
      classification: "GB Advanced Use",
      gb: 2, gc: 3, gd: 156,
      assignedUsers: 336
    },
    {
      id: "Z:SAP_FI_ACCOUNTING_CLERK",
      profile: "Z:SAP_FI_ACCOUNTING_CLERK",
      description: "SAP Financial Accounting Clerk",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 45,
      assignedUsers: 89
    },
    {
      id: "SAP_HR_EMPLOYEE_ESS",
      profile: "SAP_HR_EMPLOYEE_ESS",
      description: "SAP HR Employee Self Service",
      classification: "GD Self-Service Use",
      gb: 0, gc: 0, gd: 1,
      assignedUsers: 1250
    },
    {
      id: "Z:SAP_SD_SALES_REP",
      profile: "Z:SAP_SD_SALES_REP",
      description: "SAP Sales & Distribution Sales Representative",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 23,
      assignedUsers: 156
    },
    {
      id: "SAP_PP_PRODUCTION_PLANNER",
      profile: "SAP_PP_PRODUCTION_PLANNER",
      description: "SAP Production Planning Planner",
      classification: "GB Advanced Use",
      gb: 1, gc: 2, gd: 12,
      assignedUsers: 45
    },
    {
      id: "Z:SAP_QM_QUALITY_INSPECTOR",
      profile: "Z:SAP_QM_QUALITY_INSPECTOR",
      description: "SAP Quality Management Inspector",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 8,
      assignedUsers: 67
    },
    {
      id: "SAP_WM_WAREHOUSE_WORKER",
      profile: "SAP_WM_WAREHOUSE_WORKER",
      description: "SAP Warehouse Management Worker",
      classification: "GD Self-Service Use",
      gb: 0, gc: 0, gd: 1,
      assignedUsers: 234
    },
    {
      id: "Z:SAP_CO_CONTROLLER",
      profile: "Z:SAP_CO_CONTROLLER",
      description: "SAP Controlling Controller",
      classification: "GB Advanced Use",
      gb: 1, gc: 1, gd: 15,
      assignedUsers: 78
    },
    {
      id: "SAP_PM_MAINTENANCE_TECH",
      profile: "SAP_PM_MAINTENANCE_TECH",
      description: "SAP Plant Maintenance Technician",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 18,
      assignedUsers: 123
    },
    {
      id: "Z:SAP_PS_PROJECT_MANAGER",
      profile: "Z:SAP_PS_PROJECT_MANAGER",
      description: "SAP Project System Manager",
      classification: "GB Advanced Use",
      gb: 1, gc: 2, gd: 25,
      assignedUsers: 89
    },
    {
      id: "SAP_IS_INDUSTRY_SPECIFIC",
      profile: "SAP_IS_INDUSTRY_SPECIFIC",
      description: "SAP Industry Specific Solutions",
      classification: "GB Advanced Use",
      gb: 1, gc: 1, gd: 10,
      assignedUsers: 56
    },
    {
      id: "Z:SAP_BASIS_ADMIN",
      profile: "Z:SAP_BASIS_ADMIN",
      description: "SAP Basis Administration",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 5,
      assignedUsers: 12
    },
    {
      id: "SAP_SECURITY_ADMIN",
      profile: "SAP_SECURITY_ADMIN",
      description: "SAP Security Administration",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 3,
      assignedUsers: 8
    },
    {
      id: "Z:SAP_BI_ANALYST",
      profile: "Z:SAP_BI_ANALYST",
      description: "SAP Business Intelligence Analyst",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 20,
      assignedUsers: 145
    },
    {
      id: "SAP_CRM_SALES_MANAGER",
      profile: "SAP_CRM_SALES_MANAGER",
      description: "SAP Customer Relationship Management Sales Manager",
      classification: "GB Advanced Use",
      gb: 1, gc: 1, gd: 15,
      assignedUsers: 67
    },
    {
      id: "Z:SAP_PORTAL_USER",
      profile: "Z:SAP_PORTAL_USER",
      description: "SAP Enterprise Portal User",
      classification: "GD Self-Service Use",
      gb: 0, gc: 0, gd: 1,
      assignedUsers: 890
    }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = !searchTerm || 
      role.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.profile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLicense = licenseFilter === "all" || 
      role.classification.toLowerCase().includes(licenseFilter.toLowerCase());
    
    return matchesSearch && matchesLicense;
  });

  // Show only 10 entries
  const displayedRoles = filteredRoles.slice(0, 10);

  return (
    <Layout title="FUE Calculation">
      <div className="space-y-6">
        {/* FUE Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Full Use Equivalent Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium">
                    <div>Authorization Classification</div>
                    <div>Users</div>
                    <div>FUEs</div>
                  </div>
                  {fueCalculation.breakdown.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                      <div>{item.classification}</div>
                      <div>{item.users}</div>
                      <div>{item.fue}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <div className="border p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">{fueCalculation.totalFue}</div>
                  <div className="text-sm text-gray-600">Full Use Equivalent</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="search">Search by Role ID or Description</Label>
                <Input
                  id="search"
                  placeholder="Enter role ID or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="license-filter">License Type</Label>
                <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All License Types</SelectItem>
                    <SelectItem value="gb">GB - Advanced Use</SelectItem>
                    <SelectItem value="gc">GC - Core Use</SelectItem>
                    <SelectItem value="gd">GD - Self-Service Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Role/Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
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
                  {displayedRoles.map((role) => (
                    <TableRow key={role.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Link 
                          to={`/role-details/${encodeURIComponent(role.id)}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {role.id}
                        </Link>
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
      </div>
    </Layout>
  );
};

export default FueCalculation;
