import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MessageSquare, Truck, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Publica tu Carga",
      description: "Clientes publican sus cargas con detalles específicos y transportistas sus rutas disponibles.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-500"
    },
    {
      icon: MessageSquare,
      title: "Recibe Cotizaciones",
      description: "Sistema inteligente conecta automáticamente las mejores opciones con cotizaciones competitivas.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500"
    },
    {
      icon: Truck,
      title: "Transporta Seguro",
      description: "Seguimiento en tiempo real, comunicación directa y monitoreo GPS durante todo el viaje.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500"
    },
    {
      icon: CheckCircle,
      title: "Confirma y Paga",
      description: "Entrega confirmada, pago seguro a través de nuestra plataforma y calificación del servicio.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500"
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
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
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-xl bg-white group">
                    <CardContent className="pt-8 pb-8">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Icon */}
                      <div className={`p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r ${step.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <Icon className="h-12 w-12 text-white" />
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
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              &lt; 5 min
            </div>
            <div className="text-slate-600 font-medium">Tiempo promedio para encontrar transportista</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              30%
            </div>
            <div className="text-slate-600 font-medium">Reducción en costos de transporte</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-slate-600 font-medium">Envíos con seguimiento GPS</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;