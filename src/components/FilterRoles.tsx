
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterRolesProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  licenseFilter: string;
  setLicenseFilter: (filter: string) => void;
}

const FilterRoles: React.FC<FilterRolesProps> = ({
  searchTerm,
  setSearchTerm,
  licenseFilter,
  setLicenseFilter,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search by Role ID or Description</label>
            <Input
              placeholder="Enter role ID or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">License Type</label>
            <Select value={licenseFilter} onValueChange={setLicenseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All License Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All License Types</SelectItem>
                <SelectItem value="GB Advanced Use">GB Advanced Use</SelectItem>
                <SelectItem value="GC Core Use">GC Core Use</SelectItem>
                <SelectItem value="GD Self-Service Use">GD Self-Service Use</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterRoles;
