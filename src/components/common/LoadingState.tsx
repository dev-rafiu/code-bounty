import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type LoadingStateProps = {
  message?: string;
  className?: string;
  fullscreen?: boolean;
};

export const LoadingState = ({
  message = 'Loading...',
  className,
  fullscreen = true,
}: LoadingStateProps) => {
  return (
    <div
      role="status"
      className={twMerge(
        'flex items-center justify-center',
        fullscreen ? 'min-h-screen' : 'min-h-40',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
};
