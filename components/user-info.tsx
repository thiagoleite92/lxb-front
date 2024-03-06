import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ProductsListProps {
  label: string;
}

export const ProductsList = () => {
  return (
    <Card className="flex w-5/6 items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <CardHeader />
    </Card>
  );
};
