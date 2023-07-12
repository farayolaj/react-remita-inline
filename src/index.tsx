import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";

/**
 * Options needed by remita as specified {@link https://www.remita.net/developers/#/payment/inline here}.
 */
type RemitaInlineData = {
  key: string;
  transactionId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  amount?: number;
  narration?: string;
  processRrr?: boolean;
  extendedData?: {
    customFields?: { name?: string; value?: string }[];
  };
};

type RemitaInlineButtonProps = {
  /**
   * Options needed by remita as specified {@link https://www.remita.net/developers/#/payment/inline here}.
   */
  data: RemitaInlineData;
  /** Use to style button for declarative api. */
  className?: string;
  /**
   * Text to show in button.
   * @default "Pay"
   */
  text?: string;
};

type UseRemitaInlineProps = {
  /**
   * Use the demo or live sdk.
   */
  isLive: boolean;
  /**
   * Success callback.
   * @param response Success response from remita
   */
  onSuccess?: (response: any) => void;
  /**
   * Error callback.
   * @param response Error response from remita
   */
  onError?: (response: any) => void;
  /**
   * Callback on closing payment modal.
   */
  onClose?: () => void;
};

function useRemitaInline(props: UseRemitaInlineProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const src = !props.isLive
      ? "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"
      : "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    const onScriptLoad = () => {
      setIsLoaded(true);
      setError(false);
    };

    const onScriptError = () => {
      setIsLoaded(true);
      setError(true);
    };

    script.addEventListener("load", onScriptLoad);
    script.addEventListener("complete", onScriptLoad);
    script.addEventListener("error", onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("complete", onScriptLoad);
      script.removeEventListener("error", onScriptError);

      script.remove();

      setIsLoaded(false);
      setError(false);
    };
  }, [props.isLive]);

  const initPayment = useCallback(
    (data: RemitaInlineData) => {
      if (isLoaded) {
        const payload = {
          ...data,
          onSuccess: props.onSuccess,
          onError: props.onError,
          onClose: props.onClose,
        };

        // @ts-ignore
        const paymentEngine = RmPaymentEngine.init(payload);
        paymentEngine.showPaymentWidget();
      }
    },
    [isLoaded, props.onClose, props.onError, props.onSuccess]
  );

  const RemitaInlineButton = forwardRef(function RemitaInlineButton(
    { data, className, text = "Pay" }: RemitaInlineButtonProps,
    ref: ForwardedRef<HTMLButtonElement | null>
  ) {
    return (
      <button
        onClick={() => initPayment(data)}
        className={className}
        disabled={!isLoaded || error}
        ref={ref}
      >
        {text}
      </button>
    );
  });

  return {
    initPayment,
    RemitaInlineButton,
  };
}

export { useRemitaInline };
