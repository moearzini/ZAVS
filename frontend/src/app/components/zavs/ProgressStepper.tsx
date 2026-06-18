import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
  status: "complete" | "current" | "upcoming";
}

interface ProgressStepperProps {
  steps: Step[];
}

export function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li
            key={step.label}
            className={`relative ${stepIdx !== steps.length - 1 ? "flex-1" : ""}`}
          >
            <div className="group flex items-center">
              <span className="flex items-center relative">
                <span
                  className={`
                    relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300
                    ${
                      step.status === "complete"
                        ? "bg-[#E2001A] shadow-sm"
                        : step.status === "current"
                        ? "border-2 border-[#E2001A] bg-white"
                        : "border-2 border-gray-300 bg-white"
                    }
                  `}
                >
                  {step.status === "complete" ? (
                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                  ) : (
                    <span
                      className={`
                        ${
                          step.status === "current"
                            ? "text-[#E2001A]"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {step.number}
                    </span>
                  )}
                </span>
                <span
                  className={`
                    ml-3 text-sm hidden sm:block transition-colors
                    ${
                      step.status === "complete" || step.status === "current"
                        ? "text-gray-900"
                        : "text-gray-500"
                    }
                  `}
                >
                  {step.label}
                </span>
              </span>
              {stepIdx !== steps.length - 1 && (
                <div className="flex-1 px-4">
                  <div
                    className={`
                      h-0.5 transition-all duration-300
                      ${step.status === "complete" ? "bg-[#E2001A]" : "bg-gray-300"}
                    `}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
