import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Upload, Package, Truck, DollarSign, Clock, Search, Filter, MapPin, Weight, Ruler, FileText, MessageSquare, Phone, Star, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for published cargo
const mockPublishedCargo = [
  {
    id: 1,
    origin: 'Ciudad de Guatemala',
    destination: 'Antigua Guatemala',
    cargoType: 'General',
    weight: '500 kg',
    dimensions: '120 x 80 x 60 cm',
    budget: 'Q 2,500',
    status: 'Activo',
    date: '2024-01-15',
    offers: 3,
    description: 'Carga de productos electrónicos que requiere manejo cuidadoso. Incluye computadoras, monitores y accesorios. Necesita transporte refrigerado.',
    pickupDate: '2024-01-20',
    deliveryDate: '2024-01-22',
    specialRequirements: 'Transporte refrigerado, manejo cuidadoso',
    contactPhone: '+502 1234-5678',
    contactEmail: 'cliente@ejemplo.com'
  },
  {
    id: 2,
    origin: 'Quetzaltenango',
    destination: 'Huehuetenango',
    cargoType: 'Frágil',
    weight: '200 kg',
    dimensions: '80 x 60 x 40 cm',
    budget: 'Q 1,800',
    status: 'En Proceso',
    date: '2024-01-14',
    offers: 5,
    description: 'Carga de cristalería y porcelana fina. Requiere embalaje especial y transporte sin vibraciones.',
    pickupDate: '2024-01-18',
    deliveryDate: '2024-01-19',
    specialRequirements: 'Sin vibraciones, embalaje especial',
    contactPhone: '+502 2345-6789',
    contactEmail: 'cliente2@ejemplo.com'
  },
  {
    id: 3,
    origin: 'Escuintla',
    destination: 'Retalhuleu',
    cargoType: 'Perecedero',
    weight: '1,000 kg',
    dimensions: '200 x 150 x 100 cm',
    budget: 'Q 4,200',
    status: 'Completado',
    date: '2024-01-13',
    offers: 2,
    description: 'Carga de productos agrícolas frescos. Incluye frutas y verduras que requieren refrigeración.',
    pickupDate: '2024-01-16',
    deliveryDate: '2024-01-17',
    specialRequirements: 'Refrigeración constante',
    contactPhone: '+502 3456-7890',
    contactEmail: 'cliente3@ejemplo.com'
  },
  {
    id: 4,
    origin: 'Chimaltenango',
    destination: 'Sacatepéquez',
    cargoType: 'General',
    weight: '750 kg',
    dimensions: '150 x 100 x 80 cm',
    budget: 'Q 3,100',
    status: 'Activo',
    date: '2024-01-12',
    offers: 4,
    description: 'Carga de muebles y electrodomésticos. Incluye sofás, mesas y refrigeradores.',
    pickupDate: '2024-01-19',
    deliveryDate: '2024-01-21',
    specialRequirements: 'Manejo cuidadoso, no apilar',
    contactPhone: '+502 4567-8901',
    contactEmail: 'cliente4@ejemplo.com'
  },
  {
    id: 5,
    origin: 'Petén',
    destination: 'Alta Verapaz',
    cargoType: 'Peligroso',
    weight: '300 kg',
    dimensions: '100 x 80 x 60 cm',
    budget: 'Q 5,500',
    status: 'Pendiente',
    date: '2024-01-11',
    offers: 1,
    description: 'Carga de productos químicos industriales. Requiere certificaciones especiales y transporte autorizado.',
    pickupDate: '2024-01-25',
    deliveryDate: '2024-01-27',
    specialRequirements: 'Certificaciones especiales, transporte autorizado',
    contactPhone: '+502 5678-9012',
    contactEmail: 'cliente5@ejemplo.com'
  }
];

// Mock offers data
const mockOffers = [
  {
    id: 1,
    transporterName: 'Transportes Rápidos GT',
    price: 'Q 2,300',
    rating: 4.8,
    reviews: 127,
    estimatedTime: '2 días',
    vehicle: 'Camión Refrigerado',
    experience: '5 años',
    phone: '+502 1111-1111',
    status: 'Pendiente'
  },
  {
    id: 2,
    transporterName: 'Logística Express',
    price: 'Q 2,600',
    rating: 4.5,
    reviews: 89,
    estimatedTime: '1.5 días',
    vehicle: 'Furgón Cerrado',
    experience: '3 años',
    phone: '+502 2222-2222',
    status: 'Aceptada'
  },
  {
    id: 3,
    transporterName: 'Cargo Seguro',
    price: 'Q 2,400',
    rating: 4.9,
    reviews: 203,
    estimatedTime: '2.5 días',
    vehicle: 'Camión Plataforma',
    experience: '8 años',
    phone: '+502 3333-3333',
    status: 'Pendiente'
  }
];

export default function PublishCargo() {
  const [date, setDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('publish');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCargo, setSelectedCargo] = useState<any>(null);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    cargoType: '',
    weight: '',
    dimensions: '',
    description: '',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cargo published:', { ...formData, date });
    // Reset form
    setFormData({
      origin: '',
      destination: '',
      cargoType: '',
      weight: '',
      dimensions: '',
      description: '',
      budget: ''
    });
    setDate(undefined);
  };

  // Filter cargo based on search and status
  const filteredCargo = mockPublishedCargo.filter(cargo => {
    const matchesSearch = cargo.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cargo.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cargo.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cargo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI calculations
  const totalCargo = mockPublishedCargo.length;
  const activeCargo = mockPublishedCargo.filter(c => c.status === 'Activo').length;
  const totalBudget = mockPublishedCargo.reduce((sum, cargo) => sum + parseInt(cargo.budget.replace('Q ', '').replace(',', '')), 0);
  const avgOffers = mockPublishedCargo.reduce((sum, cargo) => sum + cargo.offers, 0) / mockPublishedCargo.length;

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Activo': 'bg-green-100 text-green-800 border-green-200',
      'En Proceso': 'bg-blue-100 text-blue-800 border-blue-200',
      'Completado': 'bg-purple-100 text-purple-800 border-purple-200',
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles]} font-semibold`}>
        {status}
      </Badge>
    );
  };

  const getOfferStatusBadge = (status: string) => {
    const statusStyles = {
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Aceptada': 'bg-green-100 text-green-800 border-green-200',
      'Rechazada': 'bg-red-100 text-red-800 border-red-200'
    };
    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles]} font-semibold`}>
        {status}
      </Badge>
    );
  };

  const handleViewCargo = (cargo: any) => {
    setSelectedCargo(cargo);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Gestión de Carga</h1>
        <p className="text-blue-600">Publica nueva carga y gestiona tus envíos existentes</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Cargas</p>
                <p className="text-2xl font-bold text-blue-800">{totalCargo}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Cargas Activas</p>
                <p className="text-2xl font-bold text-green-800">{activeCargo}</p>
              </div>
              <Truck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Presupuesto Total</p>
                <p className="text-2xl font-bold text-purple-800">Q {totalBudget.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Promedio Ofertas</p>
                <p className="text-2xl font-bold text-orange-800">{avgOffers.toFixed(1)}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border-2 border-blue-200">
          <TabsTrigger value="publish" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Publicar Nueva Carga</TabsTrigger>
          <TabsTrigger value="manage" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Gestionar Cargas</TabsTrigger>
        </TabsList>

        <TabsContent value="publish" className="mt-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 max-w-3xl mx-auto">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Detalles de la Carga</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="origin" className="text-blue-800 font-semibold">Origen</Label>
                    <Input
                      id="origin"
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                      placeholder="Ciudad de origen"
                      className="border-2 border-blue-200 focus:border-blue-500 bg-white/70"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="destination" className="text-blue-800 font-semibold">Destino</Label>
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      placeholder="Ciudad de destino"
                      className="border-2 border-blue-200 focus:border-blue-500 bg-white/70"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-blue-800 font-semibold">Tipo de Carga</Label>
                    <Select value={formData.cargoType} onValueChange={(value) => setFormData({...formData, cargoType: value})}>
                      <SelectTrigger className="border-2 border-blue-200 bg-white/70">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Carga General</SelectItem>
                        <SelectItem value="fragile">Frágil</SelectItem>
                        <SelectItem value="perishable">Perecedero</SelectItem>
                        <SelectItem value="dangerous">Peligroso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-blue-800 font-semibold">Fecha de Recogida</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal border-2 border-blue-200 bg-white/70 hover:bg-blue-50">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : 'Selecciona fecha'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="weight" className="text-blue-800 font-semibold">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      placeholder="Peso en kilogramos"
                      className="border-2 border-blue-200 focus:border-blue-500 bg-white/70"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget" className="text-blue-800 font-semibold">Presupuesto (Q)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="Presupuesto estimado"
                      className="border-2 border-blue-200 focus:border-blue-500 bg-white/70"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dimensions" className="text-blue-800 font-semibold">Dimensiones</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                    placeholder="Largo x Ancho x Alto (cm)"
                    className="border-2 border-blue-200 focus:border-blue-500 bg-white/70"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-blue-800 font-semibold">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe tu carga en detalle"
                    className="border-2 border-blue-200 focus:border-blue-500 bg-white/70"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-blue-800 font-semibold">Fotos de la Carga</Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-100 transition-all">
                    <Upload className="mx-auto h-12 w-12 text-blue-400" />
                    <p className="mt-2 text-sm text-blue-600">Arrastra fotos aquí o haz clic para seleccionar</p>
                    <Button type="button" variant="outline" className="mt-2 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold">
                      Seleccionar Fotos
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg py-4 text-lg rounded-xl">
                  Publicar Carga
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mis Cargas Publicadas</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por origen, destino o tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-blue-200 focus:border-blue-500 bg-white/70"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 border-2 border-blue-200 bg-white/70">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los Estados</SelectItem>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="En Proceso">En Proceso</SelectItem>
                      <SelectItem value="Completado">Completado</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Más Filtros
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-xl border-2 border-blue-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <TableRow>
                      <TableHead className="text-blue-800 font-semibold">ID</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Origen</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Destino</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Tipo</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Peso</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Presupuesto</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Estado</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Fecha</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Ofertas</TableHead>
                      <TableHead className="text-blue-800 font-semibold">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCargo.map((cargo) => (
                      <TableRow key={cargo.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell className="font-medium text-blue-800">#{cargo.id}</TableCell>
                        <TableCell className="text-blue-700">{cargo.origin}</TableCell>
                        <TableCell className="text-blue-700">{cargo.destination}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                            {cargo.cargoType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-blue-700">{cargo.weight}</TableCell>
                        <TableCell className="font-semibold text-blue-800">{cargo.budget}</TableCell>
                        <TableCell>{getStatusBadge(cargo.status)}</TableCell>
                        <TableCell className="text-blue-700">{cargo.date}</TableCell>
                        <TableCell>
                          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                            {cargo.offers} ofertas
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                  onClick={() => handleViewCargo(cargo)}
                                >
                                  Ver
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Detalles de Carga #{cargo.id}
                                  </DialogTitle>
                                </DialogHeader>
                                
                                <div className="space-y-6">
                                  {/* Basic Information */}
                                  <Card className="border-2 border-blue-200 bg-blue-50/30">
                                    <CardHeader>
                                      <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Información Básica
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                          <MapPin className="h-4 w-4 text-blue-500" />
                                          <div>
                                            <p className="text-sm text-blue-600">Origen</p>
                                            <p className="font-semibold text-blue-800">{cargo.origin}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPin className="h-4 w-4 text-green-500" />
                                          <div>
                                            <p className="text-sm text-blue-600">Destino</p>
                                            <p className="font-semibold text-blue-800">{cargo.destination}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Weight className="h-4 w-4 text-orange-500" />
                                          <div>
                                            <p className="text-sm text-blue-600">Peso</p>
                                            <p className="font-semibold text-blue-800">{cargo.weight}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Ruler className="h-4 w-4 text-purple-500" />
                                          <div>
                                            <p className="text-sm text-blue-600">Dimensiones</p>
                                            <p className="font-semibold text-blue-800">{cargo.dimensions}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-green-500" />
                                        <div>
                                          <p className="text-sm text-blue-600">Presupuesto</p>
                                          <p className="font-semibold text-blue-800">{cargo.budget}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Description and Requirements */}
                                  <Card className="border-2 border-blue-200 bg-blue-50/30">
                                    <CardHeader>
                                      <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Descripción y Requisitos
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div>
                                        <p className="text-sm text-blue-600 mb-2">Descripción</p>
                                        <p className="text-blue-800">{cargo.description}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-blue-600 mb-2">Requisitos Especiales</p>
                                        <p className="text-blue-800">{cargo.specialRequirements}</p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Dates and Status */}
                                  <Card className="border-2 border-blue-200 bg-blue-50/30">
                                    <CardHeader>
                                      <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                                        <CalendarIcon className="h-5 w-5" />
                                        Fechas y Estado
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <p className="text-sm text-blue-600">Fecha de Publicación</p>
                                          <p className="font-semibold text-blue-800">{cargo.date}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-blue-600">Fecha de Recogida</p>
                                          <p className="font-semibold text-blue-800">{cargo.pickupDate}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-blue-600">Fecha de Entrega</p>
                                          <p className="font-semibold text-blue-800">{cargo.deliveryDate}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm text-blue-600">Estado:</p>
                                        {getStatusBadge(cargo.status)}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Contact Information */}
                                  <Card className="border-2 border-blue-200 bg-blue-50/30">
                                    <CardHeader>
                                      <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5" />
                                        Información de Contacto
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                          <Phone className="h-4 w-4 text-blue-500" />
                                          <div>
                                            <p className="text-sm text-blue-600">Teléfono</p>
                                            <p className="font-semibold text-blue-800">{cargo.contactPhone}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MessageSquare className="h-4 w-4 text-green-500" />
                                          <div>
                                            <p className="text-sm text-blue-600">Email</p>
                                            <p className="font-semibold text-blue-800">{cargo.contactEmail}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Offers */}
                                  <Card className="border-2 border-blue-200 bg-blue-50/30">
                                    <CardHeader>
                                      <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                                        <Truck className="h-5 w-5" />
                                        Ofertas Recibidas ({mockOffers.length})
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-4">
                                        {mockOffers.map((offer) => (
                                          <div key={offer.id} className="border-2 border-blue-200 rounded-lg p-4 bg-white/70">
                                            <div className="flex justify-between items-start mb-3">
                                              <div>
                                                <h4 className="font-semibold text-blue-800">{offer.transporterName}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                  <span className="text-sm text-blue-600">{offer.rating} ({offer.reviews} reseñas)</span>
                                                </div>
                                              </div>
                                              <div className="text-right">
                                                <p className="text-lg font-bold text-blue-800">{offer.price}</p>
                                                <p className="text-sm text-blue-600">{offer.estimatedTime}</p>
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                              <div>
                                                <p className="text-blue-600">Vehículo</p>
                                                <p className="font-medium text-blue-800">{offer.vehicle}</p>
                                              </div>
                                              <div>
                                                <p className="text-blue-600">Experiencia</p>
                                                <p className="font-medium text-blue-800">{offer.experience}</p>
                                              </div>
                                              <div>
                                                <p className="text-blue-600">Teléfono</p>
                                                <p className="font-medium text-blue-800">{offer.phone}</p>
                                              </div>
                                              <div>
                                                <p className="text-blue-600">Estado</p>
                                                {getOfferStatusBadge(offer.status)}
                                              </div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Aceptar
                                              </Button>
                                              <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                                                <XCircle className="h-4 w-4 mr-1" />
                                                Rechazar
                                              </Button>
                                              <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                Contactar
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Actions */}
                                  <div className="flex gap-4 justify-end">
                                    <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Descargar PDF
                                    </Button>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Contactar Soporte
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                              Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCargo.length === 0 && (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                  <p className="text-blue-600">No se encontraron cargas que coincidan con los filtros</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}