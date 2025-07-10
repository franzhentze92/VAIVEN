import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Users, Truck, MapPin, Globe, CreditCard, Sparkles, ArrowRight, Shield, Zap, Award, ClipboardList, CheckCircle, MessageSquare, Star } from 'lucide-react';

const clientSteps = [
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: 'Regístrate',
    desc: 'Crea tu cuenta gratis y accede a la plataforma.'
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-blue-600" />,
    title: 'Publica tu carga',
    desc: 'Describe tu envío, origen, destino y requisitos.'
  },
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: 'Recibe ofertas',
    desc: 'Transportistas verificados te envían cotizaciones.'
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    title: 'Elige y coordina',
    desc: 'Selecciona la mejor opción y coordina detalles.'
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    title: 'Seguimiento y pago',
    desc: 'Monitorea el envío y paga de forma segura al finalizar.'
  }
];

const transporterSteps = [
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: 'Regístrate',
    desc: 'Crea tu cuenta y completa tu perfil de transportista.'
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-blue-600" />,
    title: 'Busca cargas',
    desc: 'Explora cargas publicadas compatibles con tu ruta.'
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    title: 'Envía ofertas',
    desc: 'Cotiza y ofrece tu servicio a los clientes.'
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    title: 'Confirma y transporta',
    desc: 'Coordina detalles, recoge la carga y realiza el envío.'
  },
  {
    icon: <Star className="h-8 w-8 text-blue-600" />,
    title: 'Califica y cobra',
    desc: 'Recibe tu pago seguro y califica la experiencia.'
  }
];

const benefits = [
  {
    icon: <Shield className="h-7 w-7 text-blue-600" />,
    title: 'Seguridad Garantizada',
    desc: 'Tus datos y envíos están protegidos en todo momento.'
  },
  {
    icon: <Zap className="h-7 w-7 text-blue-600" />,
    title: 'Tecnología Avanzada',
    desc: 'Optimizamos rutas y procesos con IA y automatización.'
  },
  {
    icon: <Award className="h-7 w-7 text-blue-600" />,
    title: 'Calidad Certificada',
    desc: 'Servicio avalado por miles de clientes satisfechos.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg border border-blue-200">
            <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
            Cómo Funciona
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
            ¿Cómo funciona CargoConnect?
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Descubre el proceso sencillo y seguro para conectar cargas con transportistas en minutos.
          </p>
        </div>
      </section>

      {/* Tabs for Cliente/Transportista */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <Tabs defaultValue="cliente" className="w-full">
            <TabsList className="flex justify-center mb-12 bg-white/80 rounded-xl shadow p-2 gap-4">
              <TabsTrigger value="cliente" className="text-lg font-semibold">Para Clientes</TabsTrigger>
              <TabsTrigger value="transportista" className="text-lg font-semibold">Para Transportistas</TabsTrigger>
            </TabsList>
            <TabsContent value="cliente">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">¿Cómo funciona para Clientes?</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">Publica tu carga, recibe ofertas y gestiona tus envíos de forma segura y eficiente.</p>
              </div>
              <div className="relative flex flex-col md:flex-row items-start justify-center gap-10 md:gap-0">
                <div className="hidden md:block absolute left-0 right-0" style={{top: '44px', height: '4px'}}>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-300 rounded-full z-0"></div>
                </div>
                {clientSteps.map((step, idx, arr) => (
                  <div key={step.title} className="relative z-10 flex flex-col items-center md:w-1/5 w-full mb-12 md:mb-0">
                    <div className="relative z-20 mb-3">
                      <div className="mb-0 bg-gradient-to-r from-blue-600 to-indigo-600 w-14 h-14 flex items-center justify-center rounded-full shadow-lg">{step.icon}</div>
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
            </TabsContent>
            <TabsContent value="transportista">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">¿Cómo funciona para Transportistas?</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">Encuentra cargas, cotiza y gestiona tus servicios de transporte de manera eficiente y segura.</p>
              </div>
              <div className="relative flex flex-col md:flex-row items-start justify-center gap-10 md:gap-0">
                <div className="hidden md:block absolute left-0 right-0" style={{top: '44px', height: '4px'}}>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-300 rounded-full z-0"></div>
                </div>
                {transporterSteps.map((step, idx, arr) => (
                  <div key={step.title} className="relative z-10 flex flex-col items-center md:w-1/5 w-full mb-12 md:mb-0">
                    <div className="relative z-20 mb-3">
                      <div className="mb-0 bg-gradient-to-r from-blue-600 to-indigo-600 w-14 h-14 flex items-center justify-center rounded-full shadow-lg">{step.icon}</div>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white/90">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              Beneficios
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">¿Por qué elegir CargoConnect?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Ventajas exclusivas para clientes y transportistas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 flex items-center justify-center rounded-full shadow-lg">{benefit.icon}</div>
                <CardTitle className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</CardTitle>
                <CardContent className="p-0">
                  <CardDescription className="text-slate-600 text-base flex items-center justify-center leading-normal">{benefit.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto flex justify-center">
          <Card className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between p-10 bg-white/95 shadow-2xl border-0 text-center md:text-left">
            <div className="flex-1 mb-6 md:mb-0">
              <h3 className="text-3xl font-bold text-blue-700 mb-2">¿Listo para transformar tu logística?</h3>
              <p className="text-lg text-slate-700">Únete a la red líder en transporte colaborativo y lleva tu negocio al siguiente nivel.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:ml-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl font-semibold">
                Regístrate Gratis
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-xl font-semibold">
                Solicita una Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorks; 