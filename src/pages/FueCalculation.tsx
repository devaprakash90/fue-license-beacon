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
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

const FueCalculation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseFilter, setLicenseFilter] = useState("all");

  // Mock data based on the screenshot
  const fueCalculation = {
    totalFue: 306,
    breakdown: [
      { classification: "GA - Developer", users: 7, fue: 14 },
      { classification: "GB - Advanced Use", users: 194, fue: 194 },
      { classification: "GC - Core Use", users: 470, fue: 94 },
      { classification: "GD - Self-Service Use", users: 101, fue: 4 }
    ]
  };

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
      id: "ZUCM_SAP_INTNW_BMT_WFM_DEVELOP",
      profile: "ZUCM_SAP_INTNW_BMT_WFM_DEVELOP",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 3
    },
    {
      id: "SAP_AIO_PURCHASER-S",
      profile: "SAP_AIO_PURCHASER-S",
      classification: "GB Advanced Use",
      gb: 2, gc: 3, gd: 156,
      assignedUsers: 336
    }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = !searchTerm || 
      role.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.profile.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLicense = licenseFilter === "all" || 
      role.classification.toLowerCase().includes(licenseFilter.toLowerCase());
    
    return matchesSearch && matchesLicense;
  });

  return (
    <Layout title="FUE Calculation">
      <div className="space-y-6">
        {/* FUE Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Full Use Equivalent Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-1">
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-800">{fueCalculation.totalFue}</div>
                  <div className="text-sm text-yellow-600">Full Use Equivalent</div>
                </div>
              </div>
              <div className="lg:col-span-4">
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
            <CardTitle>Role Summary</CardTitle>
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
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Link 
                          to={`/role-details/${encodeURIComponent(role.id)}`}
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

export default FueCalculation;
