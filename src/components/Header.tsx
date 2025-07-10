import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Truck, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loginAsClient, loginAsTransporter } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show header on dashboard pages
  const isDashboard = location.pathname.includes('dashboard');
  if (isDashboard) return null;

  const handleClientLogin = () => {
    loginAsClient();
    navigate('/client-dashboard');
  };

  const handleTransporterLogin = () => {
    loginAsTransporter();
    navigate('/transporter-dashboard');
  };

  const navigationItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Características', href: '/features' },
    { name: 'Como Funciona', href: '/how-it-works' }, // Update this href if you have a dedicated page/section
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 shadow-lg border-b border-purple-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">CargoConnect</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white">Hola, {user?.name}</span>
                <Button
                  variant="outline"
                  className="bg-white text-purple-600 hover:bg-purple-50 border-white"
                  onClick={() => {
                    if (user?.userType === 'client') {
                      navigate('/client-dashboard');
                    } else if (user?.userType === 'transporter') {
                      navigate('/transporter-dashboard');
                    }
                  }}
                >
                  Mi Panel
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-transparent text-white border-white hover:bg-white hover:text-purple-600"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
                  onClick={handleClientLogin}
                >
                  <User className="h-4 w-4 mr-2" />
                  Panel Cliente
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
                  onClick={handleTransporterLogin}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Panel Transportista
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 border-t border-white/20">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-yellow-300 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="space-y-2 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
                  onClick={() => {
                    handleClientLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Panel Cliente
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
                  onClick={() => {
                    handleTransporterLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Panel Transportista
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}