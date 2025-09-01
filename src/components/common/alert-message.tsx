import { Terminal, CheckCircle2 } from 'lucide-react';

// Components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Props = {
  variant?: 'default' | 'destructive';
  message: string | object;
};

export function AlertMessage({ variant = 'destructive', message }: Props) {
  return (
    <Alert variant={variant}>
      {variant === 'default' ? <CheckCircle2 /> : <Terminal />}
      <AlertTitle>{variant === 'default' ? 'Info' : 'Error!'}</AlertTitle>
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
