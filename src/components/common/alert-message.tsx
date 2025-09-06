import { Terminal, CheckCircle2 } from 'lucide-react';

// Components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Props = {
  variant?: 'default' | 'destructive';
  message: string | object;
  className?: string;
};

export function AlertMessage({
  variant = 'destructive',
  message,
  className = '',
}: Props) {
  return (
    <Alert variant={variant} className={`${className} flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        {variant === 'default' ? <CheckCircle2 /> : <Terminal />}
        <AlertTitle>{variant === 'default' ? 'Info' : 'Error!'}</AlertTitle>
      </div>
      <AlertDescription>
        {message && typeof message === 'string' ? (
          message
        ) : (
          <pre className="break-all whitespace-pre-wrap">
            {JSON.stringify(message, null, 2)}
          </pre>
        )}
      </AlertDescription>
    </Alert>
  );
}
