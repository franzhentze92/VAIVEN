import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Shield, Clock, Users, BarChart3, MessageSquare, CreditCard, Zap, Globe, Award, Smartphone, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Features: React.FC = () => {
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

  const mainFeatures = [
    {
      icon: <Truck className="h-12 w-12 text-white" />,
      title: "Conexión Inteligente",
      description: "Algoritmo avanzado con IA que conecta transportistas con cargas compatibles en tiempo real, optimizando rutas y reduciendo costos.",
      gradient: "from-blue-600 to-indigo-600",
      badge: "IA Avanzada"
    },
    {
      icon: <MapPin className="h-12 w-12 text-white" />,
      title: "Seguimiento GPS en Vivo",
      description: "Monitorea tu carga desde la recogida hasta la entrega con actualizaciones en tiempo real y notificaciones automáticas.",
      gradient: "from-cyan-500 to-blue-600",
      badge: "Tiempo Real"
    },
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: "Seguridad Total",
      description: "Sistema de pagos protegido con garantía de satisfacción, seguros incluidos y verificación completa de transportistas.",
      gradient: "from-indigo-600 to-purple-600",
      badge: "Garantizado"
    }
  ];

  const additionalFeatures = [
    { icon: <Clock className="h-8 w-8 text-blue-600" />, title: "Disponibilidad 24/7", description: "Plataforma disponible las 24 horas" },
    { icon: <Users className="h-8 w-8 text-blue-600" />, title: "Red Verificada", description: "Transportistas certificados y verificados" },
    { icon: <BarChart3 className="h-8 w-8 text-blue-600" />, title: "Análisis Avanzado", description: "Reportes detallados y métricas" },
    { icon: <MessageSquare className="h-8 w-8 text-blue-600" />, title: "Chat Integrado", description: "Comunicación directa en plataforma" },
    { icon: <CreditCard className="h-8 w-8 text-blue-600" />, title: "Facturación Auto", description: "Genera facturas automáticamente" },
    { icon: <Zap className="h-8 w-8 text-blue-600" />, title: "Respuesta Rápida", description: "Conexiones instantáneas" },
    { icon: <Globe className="h-8 w-8 text-blue-600" />, title: "Cobertura Total", description: "15+ países en América Latina" },
    { icon: <Award className="h-8 w-8 text-blue-600" />, title: "Calidad Premium", description: "Servicio certificado ISO 9001" },
    { icon: <Smartphone className="h-8 w-8 text-blue-600" />, title: "App Móvil", description: "Acceso desde cualquier dispositivo" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg border border-blue-200">
            <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
            Características de CargoConnect
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
            🚀 Características Poderosas
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Descubre todas las herramientas avanzadas que hacen de CargoConnect la plataforma líder en logística y transporte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl font-semibold"
              onClick={handleClientClick}
            >
              🚀 Acceder como Cliente
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-xl font-semibold"
              onClick={handleTransporterClick}
            >
              🚛 Acceder como Transportista
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* KPI Cards Section */}
      <section className="py-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-7 w-7 text-blue-600" />, label: 'Envíos Completados', value: '50,000+', color: 'from-blue-600 to-indigo-600'
              },
              {
                icon: <Users className="h-7 w-7 text-blue-600" />, label: 'Transportistas Activos', value: '10,000+', color: 'from-cyan-500 to-blue-600'
              },
              {
                icon: <Globe className="h-7 w-7 text-blue-600" />, label: 'Cobertura', value: '500+ ciudades', color: 'from-indigo-600 to-purple-600'
              },
              {
                icon: <Award className="h-7 w-7 text-blue-600" />, label: 'Satisfacción', value: '99%', color: 'from-blue-500 to-cyan-500'
              }
            ].map((kpi, idx) => (
              <Card key={idx} className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`mb-3 bg-gradient-to-r ${kpi.color} w-12 h-12 flex items-center justify-center rounded-full shadow-lg`}>{kpi.icon}</div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{kpi.value}</div>
                <div className="text-slate-600 font-medium text-sm">{kpi.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
              Comparativa
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">¿Por qué elegir CargoConnect?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Compara las ventajas de nuestra plataforma frente a la logística tradicional y otros competidores.</p>
          </div>
          <Card className="overflow-x-auto p-0 md:p-6 bg-white/95 shadow-xl border-0 max-w-5xl mx-auto">
            <table className="min-w-full text-center border-separate border-spacing-y-2">
              <thead>
                <tr className="text-blue-700 text-base">
                  <th className="py-3 px-2"></th>
                  <th className="py-3 px-2 font-bold">CargoConnect</th>
                  <th className="py-3 px-2">Logística Tradicional</th>
                  <th className="py-3 px-2">Competidor X</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  { label: 'Conexión Inteligente', cc: true, trad: false, comp: false },
                  { label: 'Seguimiento en Tiempo Real', cc: true, trad: false, comp: true },
                  { label: 'Red de Transportistas Verificada', cc: true, trad: false, comp: true },
                  { label: 'Cobertura Nacional', cc: true, trad: true, comp: false },
                  { label: 'Soporte 24/7', cc: true, trad: false, comp: false },
                  { label: 'Facturación Automática', cc: true, trad: false, comp: true },
                  { label: 'Optimización de Rutas con IA', cc: true, trad: false, comp: false },
                  { label: 'App Móvil', cc: true, trad: false, comp: true },
                ].map((row, idx) => (
                  <tr key={idx} className="bg-white/90 hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-2 font-semibold text-slate-800 text-left">{row.label}</td>
                    <td className="py-3 px-2">
                      {row.cc ? <span className="inline-block text-green-600 font-bold text-xl">✔</span> : <span className="inline-block text-red-400 font-bold text-xl">✘</span>}
                    </td>
                    <td className="py-3 px-2">
                      {row.trad ? <span className="inline-block text-green-600 font-bold text-xl">✔</span> : <span className="inline-block text-red-400 font-bold text-xl">✘</span>}
                    </td>
                    <td className="py-3 px-2">
                      {row.comp ? <span className="inline-block text-green-600 font-bold text-xl">✔</span> : <span className="inline-block text-red-400 font-bold text-xl">✘</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Feature Timeline/Process Flow Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
              ¿Cómo funciona?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tu logística en 5 pasos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Descubre lo fácil que es usar CargoConnect para optimizar tus envíos.</p>
          </div>
          <div className="relative flex flex-col md:flex-row items-start justify-center gap-10 md:gap-0">
            {/* Timeline line - now behind icons at the top */}
            <div className="hidden md:block absolute left-0 right-0" style={{top: '44px', height: '4px'}}>
              <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-300 rounded-full z-0"></div>
            </div>
            {/* Timeline steps */}
            {[
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: 'Registro',
                desc: 'Crea tu cuenta gratis en minutos.'
              },
              {
                icon: <Truck className="h-8 w-8 text-blue-600" />,
                title: 'Publica tu carga',
                desc: 'Describe tu envío y publica los detalles.'
              },
              {
                icon: <MapPin className="h-8 w-8 text-blue-600" />,
                title: 'Conexión con transportistas',
                desc: 'Recibe ofertas de transportistas verificados.'
              },
              {
                icon: <Globe className="h-8 w-8 text-blue-600" />,
                title: 'Seguimiento en tiempo real',
                desc: 'Monitorea tu carga desde cualquier dispositivo.'
              },
              {
                icon: <CreditCard className="h-8 w-8 text-blue-600" />,
                title: 'Entrega y pago seguro',
                desc: 'Recibe confirmación y paga de forma protegida.'
              }
            ].map((step, idx, arr) => (
              <div key={step.title} className="relative z-10 flex flex-col items-center md:w-1/5 w-full mb-12 md:mb-0">
                {/* Icon with connector dot */}
                <div className="relative z-20 mb-3">
                  <div className="mb-0 bg-gradient-to-r from-blue-600 to-indigo-600 w-14 h-14 flex items-center justify-center rounded-full shadow-lg">{step.icon}</div>
                  {/* Connector dot */}
                  {idx < arr.length - 1 && (
                    <div className="hidden md:block absolute right-[-50%] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full border-4 border-white z-30" style={{left: '100%'}}></div>
                  )}
                </div>
                <Card className="w-full bg-white/90 shadow-xl border-0 p-6 flex flex-col items-center text-center mt-0">
                  <CardTitle className="text-lg font-bold text-slate-800 mb-2 min-h-[32px] flex items-center justify-center">{step.title}</CardTitle>
                  <CardContent className="p-0">
                    <CardDescription className="text-slate-600 text-base min-h-[56px] flex items-center justify-center leading-normal">{step.desc}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              <Zap className="h-4 w-4 mr-2 text-blue-600" />
              Características Principales
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              ✨ Características Principales
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tecnología de vanguardia para optimizar tu logística
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:bg-white/90 overflow-hidden">
                <div className={`bg-gradient-to-r ${feature.gradient} p-8 relative`}>
                  <Badge className="absolute top-4 right-4 bg-white/20 text-white border-0">
                    {feature.badge}
                  </Badge>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-white text-2xl font-bold mb-2">{feature.title}</CardTitle>
                </div>
                <CardContent className="p-6">
                  <CardDescription className="text-slate-600 leading-relaxed text-base mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                    Saber más
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
              Más Características
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              🛠️ Más Características
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Herramientas adicionales para maximizar tu eficiencia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-slate-600 text-base mb-4">{feature.description}</p>
                  <div className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                    Saber más
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;