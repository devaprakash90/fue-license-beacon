
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

const LogManagement = () => {
  const [daysOlder, setDaysOlder] = useState<string>("30");
  const { toast } = useToast();

  const handleDeleteLogs = () => {
    toast({
      title: "Logs Deleted",
      description: `Logs older than ${daysOlder} days have been deleted successfully.`,
    });
    setDaysOlder("30");
  };

  return (
    <Layout title="Log Management">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Delete Old Logs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Remove logs older than a specified number of days to free up storage space.
            </p>
            
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="days">Delete logs older than (days)</Label>
                <Input
                  id="days"
                  type="number"
                  value={daysOlder}
                  onChange={(e) => setDaysOlder(e.target.value)}
                  placeholder="Enter number of days"
                  min="1"
                />
              </div>
              <Button 
                onClick={handleDeleteLogs}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Logs
              </Button>
            </div>
            
            <p className="text-sm text-gray-500">
              Warning: This action cannot be undone. Please ensure you have backed up any important logs before deletion.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500 text-center">
            <h3 className="text-xl font-medium mb-2">Additional Log Management Features</h3>
            <p>More log management features will be implemented soon.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogManagement;
