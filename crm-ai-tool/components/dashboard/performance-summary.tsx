import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, MousePointerClick, ShoppingCart } from 'lucide-react';

interface PerformanceSummaryProps {
  totalSends: number;
  avgCtr: number;
  avgConversionRate: number;
}

export function PerformanceSummary({ totalSends, avgCtr, avgConversionRate }: PerformanceSummaryProps) {
  const stats = [
    {
      title: '총 발송 수',
      value: (totalSends ?? 0).toLocaleString(),
      icon: TrendingUp,
      color: 'text-[#5FB3B3]',
    },
    {
      title: '평균 클릭률',
      value: `${(avgCtr ?? 0).toFixed(1)}%`,
      icon: MousePointerClick,
      color: 'text-[#5FB3B3]',
    },
    {
      title: '평균 전환율',
      value: `${(avgConversionRate ?? 0).toFixed(1)}%`,
      icon: ShoppingCart,
      color: 'text-[#5FB3B3]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#475569]">
                {stat.title}
              </CardTitle>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E293B]">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
