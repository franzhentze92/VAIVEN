import React from 'react';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import HowItWorksSection from './landing/HowItWorksSection';
import StatsSection from './landing/StatsSection';
import PartnersSection from './landing/PartnersSection';
import TestimonialsSection from './landing/TestimonialsSection';
import NewsSection from './landing/NewsSection';
import FAQSection from './landing/FAQSection';
import PricingSection from './landing/PricingSection';
import CTASection from './landing/CTASection';

const LandingPage: React.FC = () => {
  const { loginAsClient, loginAsTransporter } = useAuth();
  const navigate = useNavigate();

  const handleClientClick = () => {
    loginAsClient();
    navigate('/client-dashboard');
  };

  const handleTransporterClick = () => {
    loginAsTransporter();
    navigate('/transporter-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <PartnersSection />
      <TestimonialsSection />
      <NewsSection />
      <FAQSection />
      <PricingSection onClientClick={handleClientClick} onTransporterClick={handleTransporterClick} />
      <CTASection onClientClick={handleClientClick} onTransporterClick={handleTransporterClick} />

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 text-white py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">CargoConnect</h4>
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                La plataforma líder en Guatemala para conectar empresas con transportistas confiables. 
                Optimizamos tu logística con tecnología avanzada y garantizamos entregas seguras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
                  onClick={handleClientClick}
                >
                  🚀 Panel Cliente
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transform hover:scale-105 transition-all"
                  onClick={handleTransporterClick}
                >
                  🚛 Panel Transportista
                </Button>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-blue-300 text-lg">Servicios</h5>
              <ul className="space-y-4 text-slate-300">
                <li><a href="#" className="hover:text-blue-300 transition-colors flex items-center group">📦 Transporte de Carga <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors flex items-center group">📍 Seguimiento GPS <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors flex items-center group">🚛 Gestión de Flotas <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors flex items-center group">💰 Cotizaciones <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-indigo-300 text-lg">Empresa</h5>
              <ul className="space-y-4 text-slate-300">
                <li><a href="/about" className="hover:text-indigo-300 transition-colors flex items-center group">ℹ️ Acerca de <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors flex items-center group">👥 Carreras <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors flex items-center group">📰 Prensa <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors flex items-center group">📝 Blog <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-purple-300 text-lg">Soporte</h5>
              <ul className="space-y-4 text-slate-300">
                <li><a href="#" className="hover:text-purple-300 transition-colors flex items-center group">❓ Centro de Ayuda <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="/contact" className="hover:text-purple-300 transition-colors flex items-center group">📞 Contacto <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors flex items-center group">📋 Términos <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors flex items-center group">🔒 Privacidad <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span></a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400">&copy; 2024 CargoConnect. Todos los derechos reservados. Hecho con ❤️ en Guatemala</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;