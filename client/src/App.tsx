import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>

      <p className="mt-2 text-slate-500">Page implementation uses the corresponding API module.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />

          <Route path="/materials" element={<Placeholder title="Materials" />} />

          <Route path="/work-centers" element={<Placeholder title="Work Centers" />} />

          <Route path="/machines" element={<Placeholder title="Machines" />} />

          <Route path="/bom" element={<Placeholder title="BOM" />} />

          <Route path="/routing" element={<Placeholder title="Routing" />} />

          <Route path="/production-orders" element={<Placeholder title="Production Orders" />} />

          <Route path="/work-orders" element={<Placeholder title="Work Orders" />} />

          <Route
            path="/production-execution"
            element={<Placeholder title="Production Execution" />}
          />

          <Route path="/quality" element={<Placeholder title="Quality" />} />

          <Route path="/downtime" element={<Placeholder title="Downtime" />} />

          <Route path="/traceability" element={<Placeholder title="Traceability" />} />

          <Route path="/oee" element={<Placeholder title="OEE" />} />

          <Route path="/reports" element={<Placeholder title="Reports" />} />

          <Route path="/users" element={<Placeholder title="Users" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
