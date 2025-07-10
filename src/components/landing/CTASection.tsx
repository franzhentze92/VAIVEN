import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Play, Truck, Users } from 'lucide-react';

interface CTASectionProps {
  onClientClick: () => void;
  onTransporterClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onClientClick, onTransporterClick }) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full opacity-10 animate-bounce"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <h3 className="text-4xl md:text-5xl font-bold mb-6">
          ¿Listo para Optimizar tu Logística?
        </h3>
        <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          Únete a miles de transportistas y clientes que ya confían en CargoConnect.
          Comienza hoy mismo y transforma tu negocio.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-10 py-6 text-lg rounded-full group"
            onClick={onTransporterClick}
          >
            <Truck className="mr-3 h-6 w-6" />
            Dashboard Transportista
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-10 py-6 text-lg rounded-full group"
            onClick={onClientClick}
          >
            <Users className="mr-3 h-6 w-6" />
            Dashboard Cliente
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm opacity-80 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 max-w-2xl mx-auto">
          <div className="flex items-center">
            <Download className="h-4 w-4 mr-2 text-yellow-300" />
            <span>App móvil disponible</span>
          </div>
          <div className="flex items-center">
            <Play className="h-4 w-4 mr-2 text-green-300" />
            <span>Demo en vivo disponible</span>
          </div>
          <div className="flex items-center">
            <span className="bg-green-400 w-2 h-2 rounded-full mr-2 animate-pulse"></span>
            <span>Soporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;