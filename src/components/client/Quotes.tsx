import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Filter, Search, Download, Eye, MessageCircle, Phone, Star, MapPin, Truck, Package, Calendar } from 'lucide-react';

export default function Quotes() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const quotes = [
    {
      id: 'Q001',
      cargoType: 'Electrónicos',
      origin: 'Ciudad de Guatemala',
      destination: 'Antigua Guatemala',
      weight: '500 kg',
      budget: 'Q 2,500',
      status: 'Pendiente',
      transporter: 'Transportes Rápidos GT',
      driver: 'Carlos Méndez',
      phone: '+502 1234-5678',
      rating: 4.8,
      reviews: 127,
      quote: 'Q 2,300',
      savings: 'Q 200',
      estimatedTime: '2 horas',
      vehicle: 'Camión Refrigerado',
      insurance: 'Completa',
      createdAt: '2024-01-15 10:30',
      expiresAt: '2024-01-16 10:30',
      description: 'Carga de dispositivos electrónicos que requiere manejo especial y temperatura controlada.',
      specialRequirements: ['Manejo cuidadoso', 'Temperatura controlada', 'Entrega programada'],
      documents: ['Factura comercial', 'Certificado de origen', 'Seguro de carga']
    },
    {
      id: 'Q002',
      cargoType: 'Cristalería',
      origin: 'Quetzaltenango',
      destination: 'Huehuetenango',
      weight: '200 kg',
      budget: 'Q 1,800',
      status: 'Aceptada',
      transporter: 'Logística Maya',
      driver: 'Ana Rodríguez',
      phone: '+502 2345-6789',
      rating: 4.9,
      reviews: 89,
      quote: 'Q 1,650',
      savings: 'Q 150',
      estimatedTime: '3 horas',
      vehicle: 'Furgón Cerrado',
      insurance: 'Básica',
      createdAt: '2024-01-14 14:20',
      expiresAt: '2024-01-15 14:20',
      description: 'Carga de cristalería fina que requiere embalaje especial y transporte sin vibraciones.',
      specialRequirements: ['Sin vibraciones', 'Embalaje especial', 'Ruta pavimentada'],
      documents: ['Factura comercial', 'Certificado de fragilidad']
    },
    {
      id: 'Q003',
      cargoType: 'Productos Agrícolas',
      origin: 'Escuintla',
      destination: 'Retalhuleu',
      weight: '1,000 kg',
      budget: 'Q 4,200',
      status: 'Rechazada',
      transporter: 'Cargo Express',
      driver: 'Roberto Morales',
      phone: '+502 3456-7890',
      rating: 4.6,
      reviews: 203,
      quote: 'Q 4,500',
      savings: '-Q 300',
      estimatedTime: '4 horas',
      vehicle: 'Camión Refrigerado',
      insurance: 'Completa',
      createdAt: '2024-01-13 09:15',
      expiresAt: '2024-01-14 09:15',
      description: 'Carga de productos agrícolas perecederos que requiere refrigeración constante.',
      specialRequirements: ['Refrigeración constante', 'Entrega rápida'],
      documents: ['Certificado fitosanitario', 'Factura comercial']
    },
    {
      id: 'Q004',
      cargoType: 'Textiles',
      origin: 'Chimaltenango',
      destination: 'Sacatepéquez',
      weight: '800 kg',
      budget: 'Q 3,000',
      status: 'Expirada',
      transporter: 'Transportes Unidos',
      driver: 'María López',
      phone: '+502 4567-8901',
      rating: 4.7,
      reviews: 156,
      quote: 'Q 2,800',
      savings: 'Q 200',
      estimatedTime: '2.5 horas',
      vehicle: 'Furgón Cerrado',
      insurance: 'Básica',
      createdAt: '2024-01-12 16:45',
      expiresAt: '2024-01-13 16:45',
      description: 'Carga de textiles que requiere protección contra humedad y polvo.',
      specialRequirements: ['Protección contra humedad', 'Carga seca'],
      documents: ['Factura comercial', 'Certificado de calidad']
    }
  ];

  // KPI calculations
  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter(q => q.status === 'Pendiente').length;
  const acceptedQuotes = quotes.filter(q => q.status === 'Aceptada').length;
  const totalSavings = quotes
    .filter(q => q.status === 'Aceptada')
    .reduce((sum, q) => sum + parseInt(q.savings.replace('Q ', '').replace(',', '')), 0);

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.transporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && quote.status === 'Pendiente') ||
                      (activeTab === 'accepted' && quote.status === 'Aceptada') ||
                      (activeTab === 'rejected' && quote.status === 'Rechazada') ||
                      (activeTab === 'expired' && quote.status === 'Expirada');
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Aceptada': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rechazada': return 'bg-red-100 text-red-800 border-red-200';
      case 'Expirada': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendiente': return <Clock className="h-4 w-4" />;
      case 'Aceptada': return <CheckCircle className="h-4 w-4" />;
      case 'Rechazada': return <XCircle className="h-4 w-4" />;
      case 'Expirada': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const selectedQuoteData = quotes.find(q => q.id === selectedQuote);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Gestión de Cotizaciones</h1>
        <p className="text-blue-600">Revisa y gestiona las cotizaciones de tus envíos</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Cotizaciones</p>
                <p className="text-2xl font-bold text-blue-800">{totalQuotes}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-800">{pendingQuotes}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Aceptadas</p>
                <p className="text-2xl font-bold text-green-800">{acceptedQuotes}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Ahorro Total</p>
                <p className="text-2xl font-bold text-purple-800">Q {totalSavings.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Buscar por ID, tipo de carga o transportista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-blue-200">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Aceptada">Aceptada</SelectItem>
                <SelectItem value="Rechazada">Rechazada</SelectItem>
                <SelectItem value="Expirada">Expirada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border-2 border-blue-200">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Todas</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Pendientes</TabsTrigger>
              <TabsTrigger value="accepted" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Aceptadas</TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Rechazadas</TabsTrigger>
              <TabsTrigger value="expired" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Expiradas</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-200">
                <TableHead className="text-blue-800 font-semibold">ID</TableHead>
                <TableHead className="text-blue-800 font-semibold">Carga</TableHead>
                <TableHead className="text-blue-800 font-semibold">Ruta</TableHead>
                <TableHead className="text-blue-800 font-semibold">Transportista</TableHead>
                <TableHead className="text-blue-800 font-semibold">Cotización</TableHead>
                <TableHead className="text-blue-800 font-semibold">Ahorro</TableHead>
                <TableHead className="text-blue-800 font-semibold">Estado</TableHead>
                <TableHead className="text-blue-800 font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id} className="border-blue-100 hover:bg-blue-50/50 transition-colors">
                  <TableCell className="font-medium text-blue-800">#{quote.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-blue-800">{quote.cargoType}</p>
                      <p className="text-sm text-blue-600">{quote.weight}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-blue-800">{quote.origin}</p>
                      <p className="text-sm text-blue-600">→ {quote.destination}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-blue-800">{quote.transporter}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm text-blue-600">{quote.rating} ({quote.reviews})</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-blue-800">{quote.quote}</p>
                      <p className="text-sm text-blue-600">Presupuesto: {quote.budget}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={parseInt(quote.savings.replace('Q ', '').replace(',', '')) >= 0 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                      {quote.savings}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(quote.status)}>
                      {getStatusIcon(quote.status)}
                      <span className="ml-1">{quote.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                              Detalles de Cotización #{quote.id}
                            </DialogTitle>
                            <DialogDescription>
                              Información completa de la cotización y el transportista
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-semibold text-blue-800 mb-2">Información de Carga</h3>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Tipo:</span>
                                      <span className="text-sm font-medium text-blue-800">{quote.cargoType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Peso:</span>
                                      <span className="text-sm font-medium text-blue-800">{quote.weight}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Presupuesto:</span>
                                      <span className="text-sm font-medium text-blue-800">{quote.budget}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Cotización:</span>
                                      <span className="text-sm font-bold text-blue-800">{quote.quote}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-semibold text-blue-800 mb-2">Información de Ruta</h3>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Origen:</span>
                                      <span className="text-sm font-medium text-blue-800">{quote.origin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Destino:</span>
                                      <span className="text-sm font-medium text-blue-800">{quote.destination}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Tiempo Estimado:</span>
                                      <span className="text-sm font-medium text-blue-800">{quote.estimatedTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-600">Vehículo:</span>
                                      <span className="text-sm font-medium text-blue-800">{quote.vehicle}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold text-blue-800 mb-2">Transportista</h3>
                                <div className="bg-blue-50/50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <p className="font-semibold text-blue-800">{quote.transporter}</p>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span className="text-sm text-blue-600">{quote.rating} ({quote.reviews} reseñas)</span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Llamar
                                      </Button>
                                      <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Chat
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-blue-600">Conductor:</span>
                                      <p className="font-medium text-blue-800">{quote.driver}</p>
                                    </div>
                                    <div>
                                      <span className="text-blue-600">Teléfono:</span>
                                      <p className="font-medium text-blue-800">{quote.phone}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {quote.specialRequirements.length > 0 && (
                              <div>
                                <h3 className="font-semibold text-blue-800 mb-2">Requerimientos Especiales</h3>
                                <div className="space-y-1">
                                  {quote.specialRequirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-blue-700">
                                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                                      {req}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex gap-2">
                              {quote.status === 'Pendiente' && (
                                <>
                                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Aceptar Cotización
                                  </Button>
                                  <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Rechazar
                                  </Button>
                                </>
                              )}
                              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                <Download className="h-4 w-4 mr-2" />
                                Descargar PDF
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 