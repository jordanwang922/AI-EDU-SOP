"use client";

type Props = {
  /** Server Action */
  formAction: (formData: FormData) => void | Promise<void>;
  className?: string;
  label: string;
  message: string;
};

/** QQ / 部分 WebView 下需在按钮层拦截提交并弹出原生确认框 */
export function ConfirmSubmitButton({ formAction, className, label, message }: Props) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className={className}
      onClick={(e) => {
        if (typeof window !== "undefined" && !window.confirm(message)) {
          e.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}
