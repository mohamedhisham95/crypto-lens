import { Coins, LoaderCircle } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center">
      <div className="flex items-center gap-3">
        <Coins size={30} className="stroke-primary" />
        <span className="text-lg text-primary">Crypto Lens</span>
      </div>
      <LoaderCircle
        size={30}
        className="animate-spin stroke-muted-foreground"
      />
    </div>
  );
}
