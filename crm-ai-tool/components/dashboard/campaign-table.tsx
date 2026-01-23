import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate, formatTime } from '@/lib/utils/date';

interface Campaign {
  id: string;
  title: string;
  createdAt: Date | string;
  predictedCtr?: number | null;
  predictedConversion?: number | null;
}

interface CampaignTableProps {
  campaigns: Campaign[];
}

export function CampaignTable({ campaigns }: CampaignTableProps) {
  // 안전 장치: campaigns가 배열이 아닐 경우 빈 배열로 처리
  const safeCampaigns = Array.isArray(campaigns) ? campaigns : [];

  if (safeCampaigns.length === 0) {
    return (
      <div className="text-center py-12 text-[#64748B]">
        <p className="text-lg mb-2">아직 생성된 캠페인이 없습니다</p>
        <p className="text-sm">새 캠페인을 만들어보세요!</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F8FAFC]">
            <TableHead className="font-semibold text-[#1E293B]">캠페인 제목</TableHead>
            <TableHead className="font-semibold text-[#1E293B]">생성일</TableHead>
            <TableHead className="font-semibold text-[#1E293B]">생성 시간</TableHead>
            <TableHead className="font-semibold text-[#1E293B] text-right">예상 CTR</TableHead>
            <TableHead className="font-semibold text-[#1E293B] text-right">예상 전환율</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeCampaigns.map((campaign) => (
            <TableRow key={campaign.id} className="hover:bg-[#F8FAFC]">
              <TableCell className="font-medium text-[#1E293B]">
                {campaign.title}
              </TableCell>
              <TableCell className="text-[#475569]">
                {formatDate(campaign.createdAt)}
              </TableCell>
              <TableCell className="text-[#475569]">
                {formatTime(campaign.createdAt)}
              </TableCell>
              <TableCell className="text-[#475569] text-right">
                {campaign.predictedCtr ? `${campaign.predictedCtr.toFixed(1)}%` : '-'}
              </TableCell>
              <TableCell className="text-[#475569] text-right">
                {campaign.predictedConversion ? `${campaign.predictedConversion.toFixed(1)}%` : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
