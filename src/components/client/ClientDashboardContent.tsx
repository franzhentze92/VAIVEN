import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, Clock, CheckCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function ClientDashboardContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'Cargas Activas', value: '3', icon: Package, color: 'from-blue-600 to-indigo-600' },
    { title: 'En Tránsito', value: '2', icon: Truck, color: 'from-cyan-500 to-blue-600' },
    { title: 'Pendientes', value: '1', icon: Clock, color: 'from-yellow-400 to-yellow-600' },
    { title: 'Completadas', value: '15', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
  ];

  const recentShipments = [
    { id: '001', origin: 'Ciudad de Guatemala', destination: 'Quetzaltenango', status: 'En tránsito', date: '2024-02-15' },
    { id: '002', origin: 'Antigua Guatemala', destination: 'Escuintla', status: 'Completado', date: '2024-02-14' },
    { id: '003', origin: 'Cobán', destination: 'Puerto Barrios', status: 'Pendiente', date: '2024-02-13' },
  ];

  // Mock data for charts
  const monthlyShipments = [
    { month: 'Ene', envios: 2 },
    { month: 'Feb', envios: 3 },
    { month: 'Mar', envios: 1 },
    { month: 'Abr', envios: 4 },
    { month: 'May', envios: 2 },
    { month: 'Jun', envios: 3 },
    { month: 'Jul', envios: 5 },
    { month: 'Ago', envios: 4 },
  ];
  const cargoTypes = [
    { type: 'Electrónicos', value: 5, color: '#3B82F6' },
    { type: 'Agrícolas', value: 3, color: '#10B981' },
    { type: 'Textiles', value: 2, color: '#F59E0B' },
    { type: 'Otros', value: 1, color: '#EF4444' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">Hola, {user?.name || 'Cliente'} 👋</h1>
          <p className="text-blue-600">Este es tu panel principal. Aquí puedes ver el resumen de tus envíos y actividad en Guatemala.</p>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700"
          onClick={() => navigate('/client-dashboard?tab=publish')}
        >
          <PlusCircle className="h-5 w-5" /> Publicar Nueva Carga
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className="group border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900">Envíos por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyShipments} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="envios" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} name="Envíos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900">Tipos de Carga</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={cargoTypes} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={70} label>
                  {cargoTypes.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Envíos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {recentShipments.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-blue-400 py-8"
              >
                <p className="text-lg">No tienes envíos recientes.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-blue-300 text-blue-700"
                  onClick={() => navigate('/client-dashboard?tab=publish')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Publicar tu primer envío
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {recentShipments.map((shipment, idx) => (
                  <motion.div
                    key={shipment.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="flex items-center justify-between p-4 border border-blue-200 rounded-xl bg-white/60 shadow-sm hover:shadow-md transition-all"
                  >
                    <div>
                      <p className="font-semibold text-blue-900">#{shipment.id}</p>
                      <p className="text-sm text-blue-600">{shipment.origin} → {shipment.destination}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-colors duration-300 ${
                        shipment.status === 'Completado' ? 'bg-green-100 text-green-800' :
                        shipment.status === 'En tránsito' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shipment.status}
                      </span>
                      <p className="text-sm text-blue-500 mt-1">{shipment.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}