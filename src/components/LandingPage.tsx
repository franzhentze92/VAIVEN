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
      {/* KPI Cards Section */}
      <section className="py-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-7 w-7 text-blue-600" />, label: 'Envíos Completados', value: '50,000+', color: 'from-blue-600 to-indigo-600'
              },
              {
                icon: <Truck className="h-7 w-7 text-blue-600" />, label: 'Transportistas Activos', value: '10,000+', color: 'from-cyan-500 to-blue-600'
              },
              {
                icon: <Truck className="h-7 w-7 text-blue-600" />, label: 'Cobertura', value: '500+ ciudades', color: 'from-indigo-600 to-purple-600'
              },
              {
                icon: <Truck className="h-7 w-7 text-blue-600" />, label: 'Satisfacción', value: '99%', color: 'from-blue-500 to-cyan-500'
              }
            ].map((kpi, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`mb-3 bg-gradient-to-r ${kpi.color} w-12 h-12 flex items-center justify-center rounded-full shadow-lg`}>{kpi.icon}</div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{kpi.value}</div>
                <div className="text-slate-600 font-medium text-sm">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for? Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              ¿Para quién es?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">¿Quién puede usar CargoConnect?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Nuestra plataforma está diseñada para empresas que necesitan transportar mercancía y para transportistas que buscan nuevas oportunidades.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Empresas/Clientes */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Empresas / Clientes</h3>
              <ul className="text-slate-600 text-base space-y-2 mb-2">
                <li>• Publica tus necesidades de transporte en minutos</li>
                <li>• Recibe ofertas competitivas de transportistas verificados</li>
                <li>• Monitorea tus envíos en tiempo real y paga de forma segura</li>
              </ul>
            </div>
            {/* Transportistas */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Transportistas</h3>
              <ul className="text-slate-600 text-base space-y-2 mb-2">
                <li>• Encuentra cargas compatibles con tus rutas</li>
                <li>• Cotiza y gana nuevos clientes fácilmente</li>
                <li>• Recibe pagos seguros y calificaciones</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
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