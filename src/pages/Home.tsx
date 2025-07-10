import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, Shield, MapPin, TrendingUp, Star, Sparkles, ArrowRight, Clock, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-white" />,
      title: "Conexión Inteligente",
      description: "Conectamos transportistas con cargas compatibles usando algoritmos avanzados de IA.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Pagos Seguros",
      description: "Transacciones protegidas con garantía de satisfacción y seguimiento completo.",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: "Seguimiento Real",
      description: "Monitorea tu carga en tiempo real con GPS integrado desde la recogida hasta la entrega.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      title: "Optimización de Rutas",
      description: "Algoritmos inteligentes que optimizan rutas y reducen costos de transporte.",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Respuesta Rápida",
      description: "Encuentra transportistas disponibles en minutos y confirma tu envío al instante.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Star className="h-8 w-8 text-white" />,
      title: "Calificación Verificada",
      description: "Sistema de calificaciones y reseñas para garantizar la calidad del servicio.",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Transportistas Activos", icon: <Truck className="h-6 w-6" /> },
    { number: "15,000+", label: "Envíos Completados", icon: <CheckCircle className="h-6 w-6" /> },
    { number: "99%", label: "Satisfacción del Cliente", icon: <Star className="h-6 w-6" /> },
    { number: "24h", label: "Soporte Disponible", icon: <Clock className="h-6 w-6" /> }
  ];

  const steps = [
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: "Publica tu Carga",
      description: "Describe tu carga y especifica origen, destino y requisitos.",
      step: "1"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Recibe Cotizaciones",
      description: "Recibe propuestas de transportistas verificados en minutos.",
      step: "2"
    },
    {
      icon: <Truck className="h-8 w-8 text-white" />,
      title: "Transporta Seguro",
      description: "Seguimiento en tiempo real y comunicación directa durante el viaje.",
      step: "3"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: "Confirma y Paga",
      description: "Entrega confirmada, pago seguro y calificación del servicio.",
      step: "4"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
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
                Conectamos
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Carga y Transporte
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
                >
                  <Users className="h-6 w-6 mr-3" />
                  Soy Cliente
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-6 text-lg rounded-xl font-semibold group"
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
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{stat.label}</h3>
                  <p className="text-slate-600 text-sm">En toda Guatemala</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
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
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <CardHeader className="pb-6">
                  <div className={`p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
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

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              Proceso Simple
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              ¿Cómo funciona
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CargoConnect?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Un proceso simple y eficiente en 4 pasos para conectar carga y transporte de manera segura
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-xl bg-white/80 backdrop-blur-sm group">
                    <CardContent className="pt-8 pb-8">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg">
                        {step.step}
                      </div>
                      
                      {/* Icon */}
                      <div className="p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {step.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {step.description}
                      </p>
                      
                      {/* Arrow for connection */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full shadow-lg">
                            <ArrowRight className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para optimizar tu logística?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Únete a miles de empresas y transportistas que ya confían en CargoConnect para sus necesidades logísticas en Guatemala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-6 text-lg rounded-xl font-semibold"
            >
              Comenzar Gratis
            </Button>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-6 text-lg rounded-xl font-semibold"
              >
                Contactar Ventas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;