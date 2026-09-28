import { NavLink, Outlet } from 'react-router-dom';

const groups = [
  {
    title: 'Overview',
    items: [['Dashboard', '/']],
  },

  {
    title: 'Master Data',
    items: [
      ['Products', '/products'],
      ['Materials', '/materials'],
      ['Work Centers', '/work-centers'],
      ['Machines', '/machines'],
      ['BOM', '/bom'],
      ['Routing', '/routing'],
    ],
  },

  {
    title: 'Production',
    items: [
      ['Production Orders', '/production-orders'],
      ['Work Orders', '/work-orders'],
      ['Production Execution', '/production-execution'],
    ],
  },

  {
    title: 'Monitoring',
    items: [
      ['Quality', '/quality'],
      ['Downtime', '/downtime'],
      ['Traceability', '/traceability'],
      ['OEE', '/oee'],
      ['Reports', '/reports'],
    ],
  },

  {
    title: 'Administration',
    items: [['Users', '/users']],
  },
];

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-950 p-5 text-white">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Mini MES</h1>

          <p className="text-xs text-slate-400">Manufacturing Execution</p>
        </div>

        <nav className="space-y-6">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">{group.title}</p>

              <div className="space-y-1">
                {group.items.map(([label, path]) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm ${
                        isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
