
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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
import SimulationResults from "./pages/SimulationResults";
import LogManagement from "./pages/LogManagement";
import ViewLogs from "./pages/ViewLogs";
import NotFound from "./pages/NotFound";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload-file" element={<UploadFile />} />
          <Route path="/upload-status" element={<UploadStatus />} />
          <Route path="/manage-data" element={<ManageData />} />
          <Route path="/role-optimization" element={<RoleOptimization />} />
          <Route path="/user-optimization" element={<UserOptimization />} />
          <Route path="/role-optimization-results/:requestId" element={<RoleOptimizationResults />} />
          <Route path="/user-optimization-results/:requestId" element={<UserOptimizationResults />} />
          <Route path="/simulation-results/:requestId" element={<SimulationResults />} />
          <Route path="/simulation-results" element={<SimulationResults />} />
          <Route path="/log-management" element={<LogManagement />} />
          <Route path="/view-logs" element={<ViewLogs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
