
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UploadFile from "./pages/UploadFile";
import UploadStatus from "./pages/UploadStatus";
import ManageData from "./pages/ManageData";
import RoleOptimization from "./pages/RoleOptimization";
import UserOptimization from "./pages/UserOptimization";
import RoleOptimizationResults from "./pages/RoleOptimizationResults";
import UserOptimizationResults from "./pages/UserOptimizationResults";
import LogManagement from "./pages/LogManagement";
import ViewLogs from "./pages/ViewLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload-file" element={<UploadFile />} />
          <Route path="/upload-status" element={<UploadStatus />} />
          <Route path="/manage-data" element={<ManageData />} />
          <Route path="/role-optimization" element={<RoleOptimization />} />
          <Route path="/user-optimization" element={<UserOptimization />} />
          <Route path="/role-optimization-results/:requestId" element={<RoleOptimizationResults />} />
          <Route path="/user-optimization-results/:requestId" element={<UserOptimizationResults />} />
          <Route path="/log-management" element={<LogManagement />} />
          <Route path="/view-logs" element={<ViewLogs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
