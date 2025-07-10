import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CargoConnect</span>
            </div>
            <p className="text-gray-300 mb-4">
              Optimiza tus envíos. Aprovecha cada viaje. Conectamos transportistas con cargas de ida y vuelta, reduciendo viajes vacíos y costos.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">info@cargoconnect.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">Características</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Precios</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Transporte de Carga</span></li>
              <li><span className="text-gray-300">Logística</span></li>
              <li><span className="text-gray-300">Seguimiento</span></li>
              <li><span className="text-gray-300">Soporte 24/7</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CargoConnect. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;