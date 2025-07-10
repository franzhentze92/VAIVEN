import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
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

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email",
      details: ["info@cargoconnect.com", "soporte@cargoconnect.com"],
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: <Phone className="h-6 w-6 text-white" />,
      title: "Teléfono",
      details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Oficina Principal",
      details: ["Av. Reforma 123, Piso 15", "Ciudad de Guatemala, Guatemala"],
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Horarios",
      details: ["Lunes - Viernes: 9:00 - 18:00", "Sábados: 9:00 - 14:00"],
      gradient: "from-blue-500 to-cyan-500"
    }
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
            Contáctanos
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
            Contáctanos
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo de expertos.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="h-7 w-7 text-blue-600" />, label: 'Tiempo de Respuesta', value: '24h', color: 'from-blue-600 to-indigo-600'
              },
              {
                icon: <Phone className="h-7 w-7 text-blue-600" />, label: 'Soporte', value: 'Lun-Sab', color: 'from-cyan-500 to-blue-600'
              },
              {
                icon: <Sparkles className="h-7 w-7 text-blue-600" />, label: 'Satisfacción', value: '99%', color: 'from-indigo-600 to-purple-600'
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
      
      {/* Contact Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="group shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
                <CardTitle className="text-2xl font-bold mb-2">📧 Envíanos un Mensaje</CardTitle>
                <CardDescription className="text-blue-100">
                  Completa el formulario y nos pondremos en contacto contigo pronto.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Tu nombre" className="border-2 focus:border-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Tu apellido" className="border-2 focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" className="border-2 focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="+502 1234-5678" className="border-2 focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Input id="subject" placeholder="¿En qué podemos ayudarte?" className="border-2 focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                      rows={5}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg font-semibold py-4 text-lg rounded-xl">
                    ✨ Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  Información de Contacto
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  📞 Información de Contacto
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  Múltiples formas de ponerte en contacto con nosotros. Elige la que más te convenga.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="group shadow-lg border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm hover:bg-white/90">
                    <CardContent className="p-0">
                      <div className="flex items-start">
                        <div className={`bg-gradient-to-r ${info.gradient} p-4 flex items-center justify-center rounded-l-2xl h-full`}>
                          {info.icon}
                        </div>
                        <div className="p-6 flex-1">
                          <h3 className="font-semibold text-slate-800 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                            {info.title}
                          </h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-slate-600 text-base mb-1">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200">
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              Encuéntranos
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Nuestra Ubicación</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Visítanos en nuestra oficina principal en Ciudad de Guatemala.</p>
          </div>
          <Card className="overflow-hidden shadow-xl border-0 max-w-4xl mx-auto">
            <div className="w-full h-96">
              <iframe
                title="Ubicación CargoConnect"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.857234567890!2d-90.5132736846771!3d14.634915789776073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a1e7b1e7b1e7%3A0x1234567890abcdef!2sAv.%20Reforma%20123%2C%20Ciudad%20de%20Guatemala!5e0!3m2!1ses-419!2sgt!4v1680000000000!5m2!1ses-419!2sgt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;