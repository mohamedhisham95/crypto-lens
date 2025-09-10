// 'use client';

// // Lib
// import { cn } from '@/lib/utils';

// type Props = {
//   value: number;
//   position?: 'justify-start' | 'justify-end' | 'justify-center';
//   text_size?: string;
// };

// export function Percentage({
//   value = 0,
//   position = 'justify-end',
//   text_size = 'text-xs',
// }: Props) {
//   return (
//     <div
//       className={cn(
//         'flex items-center gap-1',
//         text_size,
//         position,
//         value > 0
//           ? 'text-primary'
//           : value < 0
//           ? 'text-destructive'
//           : 'text-primary-foreground'
//       )}
//     >
//       {Number.isFinite(value) ? (
//         <>
//           {value > 0 ? '▲' : value < 0 ? '▼' : ''}
//           <span>{value}%</span>
//         </>
//       ) : (
//         <span>-</span>
//       )}
//     </div>
//   );
// }

'use client';

import { cn } from '@/lib/utils';

type Props = {
  value: number;
  position?: 'justify-start' | 'justify-end' | 'justify-center';
  text_size?: string;
};

export function Percentage({
  value = 0,
  position = 'justify-end',
  text_size = 'text-xs',
}: Props) {
  const formattedValue = Number.isFinite(value)
    ? value >= 1 || value <= -1
      ? value.toFixed(2) // Normal numbers → 2 decimals
      : value.toFixed(4) // Small numbers → 4 decimals
    : '-';

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        text_size,
        position,
        value > 0
          ? 'text-primary'
          : value < 0
          ? 'text-destructive'
          : 'text-primary-foreground'
      )}
    >
      {Number.isFinite(value) ? (
        <>
          {value > 0 ? '▲' : value < 0 ? '▼' : ''}
          <span>{formattedValue}%</span>
        </>
      ) : (
        <span>-</span>
      )}
    </div>
  );
}
