import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import FilterRoles from "@/components/FilterRoles";
import RoleProfileSummary from "@/components/RoleProfileSummary";
import AuthorizationObjects from "@/components/AuthorizationObjects";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreateSimulation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseFilter, setLicenseFilter] = useState("all");
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [editedObjects, setEditedObjects] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedChanges, setSavedChanges] = useState(false);

  // Mock data with 20 roles
  const roles = [
    {
      id: "Z:SAP_MM_IM_GOODS_MOVEMENTS",
      description: "SAP Materials Management - Inventory Management Goods Movements",
      classification: "GB Advanced Use",
      gb: 1, gc: 2, gd: 28,
      assignedUsers: 337,
      objects: [
        {
          id: 1,
          object: "M_EINF_EKO",
          classification: "GA Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        },
        {
          id: 2,
          object: "M_EINF_EKO",
          classification: "GD Self-Service Use",
          fieldName: "ACTVT", 
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "/SKYBFRHC_TEAMS_MAINTAIN_AD",
      description: "Teams Maintenance Administration",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 1,
      assignedUsers: 108,
      objects: [
        {
          id: 3,
          object: "S_USER_GRP",
          classification: "GB Advanced Use",
          fieldName: "CLASS",
          valueLow: "*",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "/SKYBFRIDD_CC_TEAMS_ADMIN_SST",
      description: "Teams Administration Self-Service Tools",
      classification: "GB Advanced Use", 
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 105,
      objects: [
        {
          id: 4,
          object: "S_ADMIN",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "ZUCM_SAP_INTNW_BMT_WFM_DEVELOP",
      description: "SAP Internal Network Business Management Tools - Workflow Development",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 0,
      assignedUsers: 3,
      objects: [
        {
          id: 5,
          object: "S_DEVELOP",
          classification: "GB Advanced Use",
          fieldName: "DEVCLASS",
          valueLow: "Z*",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_AIO_PURCHASER-S",
      description: "SAP All-in-One Purchaser Standard",
      classification: "GB Advanced Use",
      gb: 2, gc: 3, gd: 156,
      assignedUsers: 336,
      objects: [
        {
          id: 6,
          object: "M_BANF_EKG",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_FI_GL_MASTER_RECORD_MAINTAIN",
      description: "Financial Accounting General Ledger Master Record Maintenance",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 5,
      assignedUsers: 89,
      objects: [
        {
          id: 7,
          object: "F_SKA1_MAI",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_SD_SALES_ORDER_PROCESSING",
      description: "Sales and Distribution Sales Order Processing",
      classification: "GB Advanced Use",
      gb: 1, gc: 1, gd: 45,
      assignedUsers: 234,
      objects: [
        {
          id: 8,
          object: "V_VBAK_VKO",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_PP_PRODUCTION_PLANNING",
      description: "Production Planning and Control",
      classification: "GB Advanced Use",
      gb: 2, gc: 1, gd: 23,
      assignedUsers: 145,
      objects: [
        {
          id: 9,
          object: "P_PKHD_LOW",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_HR_PERSONNEL_ADMINISTRATION",
      description: "Human Resources Personnel Administration",
      classification: "GC Core Use",
      gb: 0, gc: 2, gd: 12,
      assignedUsers: 78,
      objects: [
        {
          id: 10,
          object: "P_PERNR_REP",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_CO_COST_CENTER_ACCOUNTING",
      description: "Controlling Cost Center Accounting",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 8,
      assignedUsers: 67,
      objects: [
        {
          id: 11,
          object: "K_CSKS_MNT",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_QM_QUALITY_MANAGEMENT",
      description: "Quality Management System",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 15,
      assignedUsers: 56,
      objects: [
        {
          id: 12,
          object: "Q_QALS_CHG",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_WM_WAREHOUSE_MANAGEMENT",
      description: "Warehouse Management System",
      classification: "GD Self-Service Use",
      gb: 0, gc: 0, gd: 34,
      assignedUsers: 123,
      objects: [
        {
          id: 13,
          object: "L_LAGP_REP",
          classification: "GD Self-Service Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_PM_PLANT_MAINTENANCE",
      description: "Plant Maintenance and Service Management",
      classification: "GB Advanced Use",
      gb: 1, gc: 1, gd: 19,
      assignedUsers: 89,
      objects: [
        {
          id: 14,
          object: "I_EQUI_CHG",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_PS_PROJECT_SYSTEM",
      description: "Project System Management",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 7,
      assignedUsers: 45,
      objects: [
        {
          id: 15,
          object: "K_PROJECT_REP",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_BC_BASIS_ADMINISTRATION",
      description: "Basis System Administration",
      classification: "GB Advanced Use",
      gb: 3, gc: 0, gd: 2,
      assignedUsers: 12,
      objects: [
        {
          id: 16,
          object: "S_TCODE",
          classification: "GB Advanced Use",
          fieldName: "TCD",
          valueLow: "SM*",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_TR_TREASURY_MANAGEMENT",
      description: "Treasury and Risk Management",
      classification: "GC Core Use",
      gb: 0, gc: 2, gd: 5,
      assignedUsers: 34,
      objects: [
        {
          id: 17,
          object: "F_TR_TABLE",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_IS_INDUSTRY_SOLUTIONS",
      description: "Industry-Specific Solutions",
      classification: "GD Self-Service Use",
      gb: 0, gc: 0, gd: 25,
      assignedUsers: 87,
      objects: [
        {
          id: 18,
          object: "IS_OIL_REP",
          classification: "GD Self-Service Use",
          fieldName: "ACTVT",
          valueLow: "03",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_LE_LOGISTICS_EXECUTION",
      description: "Logistics Execution and Transportation",
      classification: "GB Advanced Use",
      gb: 1, gc: 0, gd: 18,
      assignedUsers: 76,
      objects: [
        {
          id: 19,
          object: "V_LIKP_VST",
          classification: "GB Advanced Use",
          fieldName: "ACTVT",
          valueLow: "01",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    },
    {
      id: "SAP_CRM_CUSTOMER_RELATIONSHIP",
      description: "Customer Relationship Management",
      classification: "GC Core Use",
      gb: 0, gc: 1, gd: 22,
      assignedUsers: 98,
      objects: [
        {
          id: 20,
          object: "CRM_OPPORTUNITY",
          classification: "GC Core Use",
          fieldName: "ACTVT",
          valueLow: "02",
          valueHigh: "",
          action: null,
          newValue: "",
          isNew: false
        }
      ]
    }
  ];

  // Filter roles based on search and license type
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLicense = licenseFilter === "all" || role.classification.includes(licenseFilter);
    return matchesSearch && matchesLicense;
  }).slice(0, 10); // Show only 10 entries

  const handleRoleSelect = (role: any) => {
    setSelectedRole(role);
    setEditedObjects([...role.objects]);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const updateObjectAction = (objectId: number, action: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, action, newValue: action === "Remove" ? "" : obj.newValue } : obj
      )
    );
    setHasChanges(true);
    setSavedChanges(false);
  };

  const updateObjectNewValue = (objectId: number, newValue: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, newValue } : obj
      )
    );
    setHasChanges(true);
    setSavedChanges(false);
  };

  const updateObjectField = (objectId: number, field: string, value: string) => {
    setEditedObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, [field]: value } : obj
      )
    );
    setHasChanges(true);
    setSavedChanges(false);
  };

  const handleAddObject = () => {
    const newObject = {
      id: Date.now(),
      object: "",
      classification: "",
      fieldName: "",
      valueLow: "",
      valueHigh: "",
      action: "Add",
      newValue: "",
      isNew: true
    };
    setEditedObjects(prev => [...prev, newObject]);
    setHasChanges(true);
    setSavedChanges(false);
  };

  const handleSave = () => {
    console.log("Saving changes for role:", selectedRole?.id, "Objects:", editedObjects);
    setIsEditing(false);
    setSavedChanges(true);
    setHasChanges(false);
    toast({
      title: "Changes Saved",
      description: "Role changes have been saved successfully.",
    });
  };

  const handleReset = () => {
    if (selectedRole) {
      setEditedObjects([...selectedRole.objects]);
      setHasChanges(false);
      setIsEditing(false);
      setSavedChanges(false);
    }
  };

  const generateRequestNumber = () => {
    return `SIM${String(Date.now()).slice(-6)}`;
  };

  const handleRunSimulation = () => {
    const requestNumber = generateRequestNumber();
    
    toast({
      title: "Simulation Request Submitted",
      description: `Request for Simulation Run has been submitted. Request Number: ${requestNumber}`,
    });
    
    // Navigate back to simulation run page
    setTimeout(() => {
      navigate("/simulation-run");
    }, 2000);
  };

  return (
    <Layout title="Create New Simulation">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/simulation-run" className="flex items-center text-blue-600">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Simulation Run
          </Link>
        </div>

        <FilterRoles
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          licenseFilter={licenseFilter}
          setLicenseFilter={setLicenseFilter}
        />

        <RoleProfileSummary
          filteredRoles={filteredRoles}
          selectedRole={selectedRole}
          onRoleSelect={handleRoleSelect}
          onRunSimulation={handleRunSimulation}
          savedChanges={savedChanges}
        />

        <AuthorizationObjects
          selectedRole={selectedRole}
          editedObjects={editedObjects}
          isEditing={isEditing}
          onEditClick={handleEditClick}
          onSave={handleSave}
          onReset={handleReset}
          onAddObject={handleAddObject}
          updateObjectAction={updateObjectAction}
          updateObjectNewValue={updateObjectNewValue}
          updateObjectField={updateObjectField}
        />
      </div>
    </Layout>
  );
};

export default CreateSimulation;
