import { useToast } from './use-toast';
import { Info, AlertCircle, CheckCircle } from 'lucide-react';
import './toast.css';

const VARIANT_CLASSES: Record<string, string> = {
  default: 'bg-neutral-800 text-white border border-neutral-700',
  destructive: 'bg-red-900/90 text-white border border-red-700',
  success: 'bg-green-900/90 text-white border border-green-700',
};

const ICONS: Record<string, React.ElementType> = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
};

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="toaster fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => {
        const Icon = ICONS[t.variant ?? 'default'] ?? Info;
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-200 ${VARIANT_CLASSES[t.variant ?? 'default']}`}
          >
            <div className="shrink-0 text-sm"><Icon /></div>
            <div className="flex flex-col gap-1">
              {t.title && <h4 className="font-semibold text-sm">{t.title}</h4>}
              {t.description && (
                <p className="text-sm leading-relaxed opacity-90">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="absolute top-2 right-2 opacity-60 hover:opacity-100 text-sm"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
