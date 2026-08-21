import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { CheckCircle } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      duration={1800}
      className="toaster group z-[9999]"
      toastOptions={{
        className:
          "group toast group-[.toaster]:bg-[#0F1115]/95 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-full group-[.toaster]:px-4 group-[.toaster]:py-2.5 group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:gap-2.5 group-[.toaster]:text-xs group-[.toaster]:font-semibold font-sans animate-in slide-in-from-top-4 fade-in duration-200 ease-out",
      }}
      icons={{
        success: <CheckCircle size={16} className="text-[#CCFF00] animate-pulse" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
