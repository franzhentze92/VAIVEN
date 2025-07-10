import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

import TransporterSidebar from '@/components/transporter/TransporterSidebar';
import TransporterDashboardContent from '@/components/transporter/TransporterDashboardContent';
import PublishRoute from '@/components/transporter/PublishRoute';
import ViewCargo from '@/components/transporter/ViewCargo';
import ManageOffers from '@/components/transporter/ManageOffers';
import TransporterTracking from '@/components/transporter/TransporterTracking';
import TransporterHistory from '@/components/transporter/TransporterHistory';
import TransporterProfile from '@/components/transporter/TransporterProfile';

export default function TransporterDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TransporterDashboardContent activeTab={activeTab} />;
      case 'routes':
        return <PublishRoute />;
      case 'cargo':
        return <ViewCargo />;
      case 'offers':
        return <ManageOffers />;
      case 'tracking':
        return <TransporterTracking />;
      case 'history':
        return <TransporterHistory />;
      case 'profile':
        return <TransporterProfile />;
      default:
        return <TransporterDashboardContent activeTab={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      <div className="flex h-screen">
        <TransporterSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white px-6 py-4 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">Bienvenido, {user?.name}</h1>
                <p className="text-blue-100">Panel de Transportista</p>
              </div>
              <Button 
                variant="outline" 
                onClick={logout} 
                className="bg-white text-blue-600 hover:bg-blue-50 border-white flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
