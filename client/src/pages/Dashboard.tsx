import { useApi } from '../hooks/useApi';
import { getDashboard } from '../api/dashboard.api';
import { Card, ErrorState, Loading, PageHeader, StatusBadge } from '../components';

export default function Dashboard() {
  const { data, loading, error, refetch } = useApi(getDashboard, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (!data) {
    return null;
  }

  const { counts, machineStatus, production } = data;

  const cards = [
    {
      label: 'Products',
      value: counts.products,
    },
    {
      label: 'Materials',
      value: counts.materials,
    },
    {
      label: 'Machines',
      value: counts.machines,
    },
    {
      label: 'Production Orders',
      value: counts.productionOrders,
    },
    {
      label: 'Work Orders',
      value: counts.workOrders,
    },
    {
      label: 'Downtime Events',
      value: counts.downtimeEvents,
    },
    {
      label: 'Inspections',
      value: counts.inspections,
    },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description="Manufacturing execution overview" />

      {/* Counts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="text-sm text-slate-500">{card.label}</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
          </Card>
        ))}
      </div>

      {/* Machine Status */}
      <Card className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">Machine Status</h2>

        {machineStatus.length === 0 ? (
          <p className="text-sm text-slate-500">No machines available.</p>
        ) : (
          <div className="space-y-3">
            {machineStatus.map((machine) => (
              <div key={machine.code} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{machine.name}</p>

                  <p className="text-xs text-slate-500">{machine.code}</p>
                </div>

                <StatusBadge status={machine.status} />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Production */}
      <Card className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">Production</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">Planned</p>
            <p className="mt-1 text-2xl font-bold">{production.planned}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Produced</p>
            <p className="mt-1 text-2xl font-bold">{production.produced}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Good</p>
            <p className="mt-1 text-2xl font-bold">{production.good}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Scrap</p>
            <p className="mt-1 text-2xl font-bold">{production.scrap}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
