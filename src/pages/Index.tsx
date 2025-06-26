
import React from "react";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import { Upload, FileText, Database, UserCog, User, BarChart, ListFilter, Calculator, Play } from "lucide-react";

const Index = () => {
  return (
    <Layout title="" showBackButton={false}>
      <div className="space-y-8">
        {/* Master Data Section */}
        <section>
          <h2 className="section-title">Master Data</h2>
          <div className="card-grid">
            <FeatureCard 
              title="Upload File" 
              description="Upload files with the latest data"
              link="/upload-file"
              icon={<Upload size={24} />}
            />
            
            <FeatureCard 
              title="File Upload Status" 
              description="Monitor and verify file upload status"
              link="/upload-status"
              icon={<FileText size={24} />}
            />
            
            <FeatureCard 
              title="Manage Data" 
              description="Download and maintain uploaded data"
              link="/manage-data"
              icon={<Database size={24} />}
            />
          </div>
        </section>
        
        {/* License Optimizer Section */}
        <section>
          <h2 className="section-title">License Optimizer</h2>
          <div className="card-grid">
            <FeatureCard 
              title="Role Level Optimization" 
              description="Optimize license assignments at role level"
              link="/role-optimization"
              icon={<UserCog size={24} />}
            />
            
            <FeatureCard 
              title="User Level Optimization" 
              description="Optimize license assignments at user level"
              link="/user-optimization"
              icon={<User size={24} />}
            />
          </div>
        </section>

        {/* Simulation Section */}
        <section>
          <h2 className="section-title">Simulation</h2>
          <div className="card-grid">
            <FeatureCard 
              title="FUE Calculation" 
              description="View FUE calculation and role analysis"
              link="/fue-calculation"
              icon={<Calculator size={24} />}
            />
            
            <FeatureCard 
              title="Simulation Run" 
              description="Run simulations to calculate FUE requirements"
              link="/simulation-run"
              icon={<Play size={24} />}
            />
          </div>
        </section>

        {/* Troubleshooting & Logs Section */}
        <section>
          <h2 className="section-title">Troubleshooting & Logs</h2>
          <div className="card-grid">
            <FeatureCard 
              title="Log Management" 
              description="Manage system logs and troubleshooting data"
              link="/log-management"
              icon={<BarChart size={24} />}
            />
            
            <FeatureCard 
              title="View Logs" 
              description="View and analyze detailed system logs"
              link="/view-logs"
              icon={<ListFilter size={24} />}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
