import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ title = '오류가 발생했습니다', message, retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{title}</h3>
      <p className="text-[#475569] mb-4">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-[#5FB3B3] text-white rounded-lg hover:bg-[#4A9999] transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
