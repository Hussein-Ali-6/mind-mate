import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const alertVariants = cva(
  "px-3 py-2 rounded font-semibold text-base w-full border",
  {
    variants: {
      variant: {
        success: "bg-emerald-50 text-emerald-800 border-emerald-300",
        destructive: "bg-red-50 text-red-800 border-red-300",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);

type Props = {
  className?: string;
  message: string;
} & VariantProps<typeof alertVariants>;

const Alert = ({ className, variant, message }: Props) => {
  return (
    <div className={cn(alertVariants({ variant, className }))}>{message}</div>
  );
};

export { Alert };
