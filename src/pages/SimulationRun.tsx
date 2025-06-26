
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

const SimulationRun = () => {
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
    },
    {
      id: 4,
      name: "Simulation Run 4",
      date: "2024-01-05",
      time: "11:20",
      simulationFue: 275,
      actualFue: 306,
      savings: 31,
      status: "Completed"
    },
    {
      id: 5,
      name: "Simulation Run 5",
      date: "2024-01-03",
      time: "15:45",
      simulationFue: 290,
      actualFue: 306,
      savings: 16,
      status: "Completed"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Running":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout title="Simulation Run">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Simulation Runs</h2>
          <Link to="/create-simulation">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Simulation
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {simulations.map((simulation) => (
            <Card key={simulation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{simulation.name}</CardTitle>
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
