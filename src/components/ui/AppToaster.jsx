import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "border border-[#31312f] bg-[#050402] text-[#f7f6f1] font-sans",
          title: "font-medium",
          description: "text-[#b8b8b0]",
          actionButton: "bg-[#e8cb2f] text-[#111110]",
          cancelButton: "bg-[#21211f] text-[#f7f6f1]",
        },
      }}
    />
  );
}
