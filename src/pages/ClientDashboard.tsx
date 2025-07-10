import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

import ClientSidebar from '@/components/client/ClientSidebar';
import ClientDashboardContent from '@/components/client/ClientDashboardContent';
import PublishCargo from '@/components/client/PublishCargo';
import SearchTransporters from '@/components/client/SearchTransporters';
import TrackingMap from '@/components/client/TrackingMap';
import Quotes from '@/components/client/Quotes';
import History from '@/components/client/History';
import Profile from '@/components/client/Profile';
import Facturas from '@/components/client/Facturas';
import Reports from '@/components/client/Reports';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ClientDashboardContent />;
      case 'publish':
        return <PublishCargo />;
      case 'search':
        return <SearchTransporters />;
      case 'quotes':
        return <Quotes />;
      case 'tracking':
        return <TrackingMap />;
      case 'history':
        return <History />;
      case 'facturas':
        return <Facturas />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile />;
      default:
        return <ClientDashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex h-screen">
        <ClientSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 shadow-xl rounded-b-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
                <p className="text-blue-100">Panel de Cliente</p>
              </div>
              <Button 
                variant="outline" 
                onClick={logout} 
                className="border-2 border-blue-100 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 font-semibold shadow-md"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}