import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Clock, MapPin, DollarSign, Zap, ArrowRight } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Conexión Directa",
      description: "Conectamos directamente transportistas con clientes, eliminando intermediarios y reduciendo costos significativamente.",
      gradient: "from-blue-500 to-indigo-600",
      color: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description: "Sistema de verificación completo y seguimiento en tiempo real para máxima seguridad y tranquilidad en cada envío.",
      gradient: "from-indigo-500 to-purple-600",
      color: "text-indigo-600"
    },
    {
      icon: Clock,
      title: "Eficiencia Máxima",
      description: "Optimizamos rutas y aprovechamos cada viaje al máximo, reduciendo tiempos muertos y aumentando ganancias.",
      gradient: "from-purple-500 to-pink-600",
      color: "text-purple-600"
    },
    {
      icon: MapPin,
      title: "Seguimiento en Vivo",
      description: "Monitorea tus envíos en tiempo real con GPS integrado y notificaciones automáticas en cada paso del proceso.",
      gradient: "from-cyan-500 to-blue-600",
      color: "text-cyan-600"
    },
    {
      icon: DollarSign,
      title: "Precios Competitivos",
      description: "Sistema de cotizaciones transparente que garantiza los mejores precios del mercado guatemalteco.",
      gradient: "from-emerald-500 to-teal-600",
      color: "text-emerald-600"
    },
    {
      icon: Zap,
      title: "Respuesta Rápida",
      description: "Encuentra transportistas disponibles en minutos y confirma tu envío al instante con nuestra tecnología avanzada.",
      gradient: "from-orange-500 to-red-600",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
            <Zap className="h-4 w-4 mr-2 text-blue-600" />
            Características Principales
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            ¿Por qué elegir
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CargoConnect?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            La solución más completa y confiable para optimizar tus envíos y transportes en Guatemala
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <CardHeader className="pb-6">
                  <div className={`p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className={`inline-flex items-center text-sm font-semibold ${feature.color} group-hover:translate-x-1 transition-transform duration-300`}>
                    Saber más
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para optimizar tu logística?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Únete a miles de empresas y transportistas que ya confían en CargoConnect
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300">
                Comenzar Ahora
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;