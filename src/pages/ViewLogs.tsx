
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Download, X } from "lucide-react";

const ViewLogs = () => {
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock log data based on the screenshots
  const logs = [
    {
      id: 1,
      timestamp: "Jun 23, 2025, 10:23 AM",
      clientName: "FUJI",
      systemId: "S4HANA",
      fileName: "FUJI-S4HANA-20250623-102301.log",
      content: `2025-06-23 10:23:01,641 - app.core.logger - INFO -
license_optimizer_router:43 - Received request to optimize license for
client: FUJI, system_id: S4HANA, roles: ['ZD_FTM_M_BP_APPROVE_SUP_2100']
2025-06-23 10:23:01,641 - app.core.logger - INFO -
license_optimizer_service:41 - Starting license optimization for client:
FUJI, roles: ['ZD_FTM_M_BP_APPROVE_SUP_2100']
2025-06-23 10:23:01,719 - app.core.logger - INFO -
license_optimizer_service:171 - prompt:
I'm optimizing SAP FUE license consumption for an SAP role.
client: FUJI
SAP System ID:S4HANA
SAP System Info: S4 HANA OnPremise 1909 Initial Support Pack

Here's the role data in JSON:`
    },
    {
      id: 2,
      timestamp: "Jun 23, 2025, 10:06 AM",
      clientName: "FUJI",
      systemId: "S4HANA",
      fileName: "FUJI-S4HANA-20250623-100601.log",
      content: `2025-06-23 10:06:01,123 - app.core.logger - INFO -
license_optimizer_router:43 - Received request to optimize license for
client: FUJI, system_id: S4HANA, roles: ['SAP_MM_IM_GOODS_MOVEMENTS']
2025-06-23 10:06:01,124 - app.core.logger - INFO -
license_optimizer_service:41 - Starting license optimization for client:
FUJI, roles: ['SAP_MM_IM_GOODS_MOVEMENTS']`
    },
    {
      id: 3,
      timestamp: "Jun 23, 2025, 09:59 AM",
      clientName: "FUJI",
      systemId: "S4HANA",
      fileName: "FUJI-S4HANA-20250623-095901.log",
      content: `2025-06-23 09:59:01,456 - app.core.logger - INFO -
license_optimizer_router:43 - Received request to optimize license for
client: FUJI, system_id: S4HANA, roles: ['TEAMS_MAINTAIN_AD']`
    },
    {
      id: 4,
      timestamp: "Jun 23, 2025, 09:56 AM",
      clientName: "FUJI",
      systemId: "S4HANA",
      fileName: "FUJI-S4HANA-20250623-095601.log",
      content: `2025-06-23 09:56:01,789 - app.core.logger - INFO -
license_optimizer_router:43 - Received request to optimize license for
client: FUJI, system_id: S4HANA, roles: ['SAP_BASIS_ADMIN']`
    },
    {
      id: 5,
      timestamp: "Jun 18, 2025, 06:45 PM",
      clientName: "FUJI",
      systemId: "S4HANA",
      fileName: "FUJI-S4HANA-20250618-184501.log",
      content: `2025-06-18 18:45:01,234 - app.core.logger - INFO -
license_optimizer_router:43 - Received request to optimize license for
client: FUJI, system_id: S4HANA, roles: ['SAP_SECURITY_ADMIN']`
    },
    {
      id: 6,
      timestamp: "Jun 18, 2025, 06:43 PM",
      clientName: "FUJI",
      systemId: "S4HANA",
      fileName: "FUJI-S4HANA-20250618-184301.log",
      content: `2025-06-18 18:43:01,567 - app.core.logger - INFO -
license_optimizer_router:43 - Received request to optimize license for
client: FUJI, system_id: S4HANA, roles: ['SAP_BI_ANALYST']`
    }
  ];

  const handleViewLog = (log: any) => {
    setSelectedLog(log);
    setIsDialogOpen(true);
  };

  const handleDownload = (log: any) => {
    const element = document.createElement("a");
    const file = new Blob([log.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = log.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Layout title="View Logs">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <p className="text-gray-600">
              View logs for specific client and system activities.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>TIMESTAMP</TableHead>
                    <TableHead>CLIENT NAME</TableHead>
                    <TableHead>SYSTEM ID</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.clientName}</TableCell>
                      <TableCell>{log.systemId}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewLog(log)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View Log
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Log Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Log Details: {selectedLog?.fileName}</DialogTitle>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => selectedLog && handleDownload(selectedLog)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap font-mono">
                {selectedLog?.content}
              </pre>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ViewLogs;
