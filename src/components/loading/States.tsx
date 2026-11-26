import { AlertCircle, FolderSearch, RefreshCw, ArrowLeft } from 'lucide-react';
import ButtonLoader from './ButtonLoader';

// ============================================================================
// ERROR STATE
// ============================================================================
export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
  isRetrying?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an unexpected issue while loading this content. Please try again.',
  onRetry,
  onBack,
  className = '',
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div
      className={`rounded-3xl bg-white border border-rose-100 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-[0_10px_35px_rgba(244,63,94,0.06)] my-8 ${className}`}
      role="alert"
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold text-[#0B132B] mb-2">{title}</h3>
      <p className="text-sm text-[#64748B] mb-6 leading-relaxed">{message}</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,196,255,0.25)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isRetrying ? (
              <ButtonLoader text="Retrying..." color="white" />
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </>
            )}
          </button>
        )}

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-700 text-xs sm:text-sm font-medium hover:border-gray-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// EMPTY STATE
// ============================================================================
export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'No items found',
  message = 'There are currently no items matching your criteria. Try adjusting your filters or search terms.',
  actionText,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs my-8 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#E0F7FF] text-[#0088CC] border border-[#00C4FF]/20 flex items-center justify-center mx-auto mb-4">
        <FolderSearch className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold text-[#0B132B] mb-2">{title}</h3>
      <p className="text-sm text-[#64748B] mb-6 leading-relaxed">{message}</p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,196,255,0.25)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}

// ============================================================================
// RETRY STATE
// ============================================================================
export interface RetryStateProps {
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function RetryState({
  message = 'Failed to load data.',
  onRetry,
  isRetrying = false,
}: RetryStateProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-sm">
      <span className="font-medium">{message}</span>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-600 text-white font-semibold text-xs hover:bg-amber-700 transition-colors disabled:opacity-50 cursor-pointer flex-shrink-0"
      >
        <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
        <span>{isRetrying ? 'Retrying...' : 'Retry'}</span>
      </button>
    </div>
  );
}
