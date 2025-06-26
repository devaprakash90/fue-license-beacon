
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

const SimulationRun = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [simulations] = useState([
    {
      id: 1,
      name: "Simulation Run 1",
      date: "2024-01-15",
      time: "14:30",
      simulationFue: 280,
      actualFue: 306,
      savings: 26,
      status: "Completed"
    },
    {
      id: 2,
      name: "Simulation Run 2", 
      date: "2024-01-10",
      time: "09:15",
      simulationFue: 295,
      actualFue: 306,
      savings: 11,
      status: "Completed"
    },
    {
      id: 3,
      name: "Simulation Run 3",
      date: "2024-01-08",
      time: "16:45",
      simulationFue: 310,
      actualFue: 306,
      savings: -4,
      status: "Completed"
    }
  ]);

  const handleRunSimulation = () => {
    if (hasChanges) {
      // Run simulation logic here
      console.log("Running simulation...");
    }
  };

  return (
    <Layout title="Simulation Run">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Simulation Runs</h2>
          <div className="flex items-center gap-2">
            <Link to="/create-simulation">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Simulation
              </Button>
            </Link>
            <Button 
              onClick={handleRunSimulation}
              disabled={!hasChanges}
              className={`${hasChanges ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400'} text-white`}
            >
              Run Simulation
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {simulations.map((simulation) => (
            <Card key={simulation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{simulation.name}</CardTitle>
                  <Badge variant="outline">
                    {simulation.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  {simulation.date} at {simulation.time}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Simulation FUE:</span>
                    <span className="font-medium">{simulation.simulationFue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Actual FUE:</span>
                    <span className="font-medium">{simulation.actualFue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Potential Savings:</span>
                    <div className="flex items-center gap-1">
                      {simulation.savings > 0 ? (
                        <>
                          <TrendingDown className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-600">
                            {simulation.savings} FUE
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-600">
                            {Math.abs(simulation.savings)} FUE
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t">
                  <Link to={`/simulation-details/${simulation.id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SimulationRun;
