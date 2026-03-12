import { parts, changeRequests } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, GitPullRequest, Users, DollarSign } from 'lucide-react';

export default function Project4Dashboard() {
  // Prepare data for charts
  const partsBySupplier = parts.reduce((acc, part) => {
    acc[part.supplier] = (acc[part.supplier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const supplierData = Object.entries(partsBySupplier).map(([name, count]) => ({ name, count }));

  const crByStatus = changeRequests.reduce((acc, cr) => {
    acc[cr.status] = (acc[cr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const statusData = Object.entries(crByStatus).map(([name, value]) => ({ name, value }));
  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

  const totalCost = parts.reduce((sum, p) => sum + p.cost, 0);

  return (
    <div className="h-full flex flex-col overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">PLM Data Lake Dashboard</h1>
        <p className="text-slate-500 mt-1">Analytics and visualizations of Windchill product data.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Parts</p>
            <p className="text-2xl font-bold text-slate-900">{parts.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Change Requests</p>
            <p className="text-2xl font-bold text-slate-900">{changeRequests.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Suppliers</p>
            <p className="text-2xl font-bold text-slate-900">{Object.keys(partsBySupplier).length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total BOM Cost</p>
            <p className="text-2xl font-bold text-slate-900">${totalCost.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-800 mb-6">Parts by Supplier</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-800 mb-6">Change Requests by Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
