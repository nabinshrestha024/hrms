import { useState, type ReactNode } from 'react';
import { cn } from '@erp/utils';
import { Check } from 'lucide-react';
import { Button } from '../primitives/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../primitives/dialog';

// ── Types ───────────────────────────────────────────────────────────

export interface StepConfig {
  label: string;
  content: ReactNode;
}

export interface MultiStepFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  steps: StepConfig[];
  /** Called when final step submits */
  onSubmit: () => void;
  /** Is the form currently submitting? */
  isSubmitting?: boolean;
  /** Label for the final submit button. Default: "Add" */
  submitLabel?: string;
  /** Validate current step before advancing. Return true to allow, false to block. */
  onValidateStep?: (stepIndex: number) => Promise<boolean> | boolean;
  /** Called when dialog is closed (X, Cancel, overlay click). Use for form.reset(). */
  onReset?: () => void;
  /** Size of the dialog */
  size?: 'md' | 'lg' | 'xl' | 'full';
}

const sizeMap = {
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-5xl',
};

// ── Stepper Indicator ───────────────────────────────────────────────

function Stepper({
  steps,
  currentStep,
}: {
  steps: StepConfig[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-center px-8 py-6">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.label} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                  isCompleted && 'bg-primary text-primary-foreground',
                  isActive && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                  !isCompleted && !isActive && 'border-2 border-muted-foreground/30 text-muted-foreground',
                )}
              >
                {isCompleted ? <Check className="size-5" strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium whitespace-nowrap',
                  isActive ? 'text-primary' : isCompleted ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={cn(
                  'mx-2 h-0.5 w-20 sm:w-28 transition-colors',
                  i < currentStep ? 'bg-primary' : 'bg-muted-foreground/20',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────

export function MultiStepForm({
  open,
  onOpenChange,
  title,
  steps,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Add',
  onValidateStep,
  onReset,
  size = 'lg',
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = async () => {
    if (onValidateStep) {
      const isValid = await onValidateStep(currentStep);
      if (!isValid) return;
    }

    if (isLastStep) {
      onSubmit();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const handleClose = () => {
    setCurrentStep(0);
    onReset?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={cn(sizeMap[size], 'max-h-[90vh] flex flex-col p-0 overflow-hidden')}>
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} />

        {/* Step content — vertical scroll only */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6">
          {steps[currentStep].content}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          {!isFirstStep && (
            <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
              Back
            </Button>
          )}
          <Button onClick={handleNext} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : isLastStep ? submitLabel : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
