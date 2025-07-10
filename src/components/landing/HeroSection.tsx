import React from 'react';
import { Button } from '@/components/ui/button';
import { Truck, Users, Sparkles, ArrowRight, Shield, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-15 animate-ping"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg border border-blue-200">
              <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
              Plataforma líder en logística de Guatemala
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              La Red Líder de Logística y Transporte en
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Guatemala
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
              La plataforma más confiable de Guatemala para conectar transportistas con cargas. 
              Optimizamos rutas, reducimos costos y garantizamos entregas seguras.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-6 text-lg rounded-xl font-semibold group"
                onClick={handleClientClick}
              >
                <Users className="h-6 w-6 mr-3" />
                Soy Cliente
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-6 text-lg rounded-xl font-semibold group"
                onClick={handleTransporterClick}
              >
                <Truck className="h-6 w-6 mr-3" />
                Soy Transportista
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm text-slate-500">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                <span>Respuesta en 24h</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                <span>Verificados</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600">2,500+</div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Transportistas Activos</h3>
              <p className="text-slate-600 text-sm">En toda Guatemala</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-indigo-600">15,000+</div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Envíos Completados</h3>
              <p className="text-slate-600 text-sm">Con éxito garantizado</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600">99%</div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Satisfacción</h3>
              <p className="text-slate-600 text-sm">De nuestros clientes</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-cyan-600">24h</div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Soporte Disponible</h3>
              <p className="text-slate-600 text-sm">Todos los días</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;