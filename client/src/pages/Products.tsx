import { useApi } from '../hooks/useApi';
import { getProducts } from '../api/products.api';
import type { Product } from '../types/product';
import { DataTable, ErrorState, Loading, PageHeader, StatusBadge } from '../components';

export default function Products() {
  const { data, loading, error, refetch } = useApi(getProducts, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  const products = data ?? [];

  const columns = [
    {
      key: 'code',
      title: 'Code',
      render: (product: Product) => product.code,
    },

    {
      key: 'name',
      title: 'Name',
      render: (product: Product) => product.name,
    },

    {
      key: 'category',
      title: 'Category',
      render: (product: Product) => product.category,
    },

    {
      key: 'unit',
      title: 'Unit',
      render: (product: Product) => product.unit,
    },

    {
      key: 'status',
      title: 'Status',
      render: (product: Product) => <StatusBadge status={product.status} />,
    },
  ];

  return (
    <div>
      <PageHeader title="Products" description="Manage finished products" />

      <DataTable data={products} columns={columns} />
    </div>
  );
}
