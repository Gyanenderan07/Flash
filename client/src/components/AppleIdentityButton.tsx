/**
 * Flash Apple Identity — Official Sign in with Apple Web Integration.
 * Triggers Apple's official authentication popup and handles authorization token response securely.
 */
import { useEffect, useState } from "react";
import { Apple, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type AppleAuthResponse = {
  authorization: {
    code: string;
    id_token: string;
    state?: string;
  };
  user?: {
    name?: { firstName?: string; lastName?: string };
    email?: string;
  };
};

type AppleIdApi = {
  init: (config: {
    clientId: string;
    scope: string;
    redirectURI: string;
    state?: string;
    nonce?: string;
    usePopup?: boolean;
  }) => void;
  signIn: () => Promise<AppleAuthResponse>;
};

const getAppleId = (): AppleIdApi | undefined =>
  (Reflect.get(window, "AppleID") as { auth?: AppleIdApi } | undefined)?.auth;

const APPLE_SDK_SRC = "https://appleid.cdn-apple.com/appleauth/static/js/v2/pb/appleid.auth.js";

let scriptPromise: Promise<void> | null = null;
function loadAppleSdk(): Promise<void> {
  if (getAppleId()) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = APPLE_SDK_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Sign in with Apple SDK failed to load"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function AppleIdentityButton({
  onSuccess,
  disabled,
}: {
  onSuccess: () => void;
  disabled?: boolean;
}) {
  const { signInWithAppleResponse } = useAuth();
  const [loading, setLoading] = useState(false);
  const rawClientId = import.meta.env.VITE_APPLE_CLIENT_ID as string | undefined;
  const rawRedirectUri = import.meta.env.VITE_APPLE_REDIRECT_URI as string | undefined;

  const isConfigured = Boolean(
    rawClientId &&
      !rawClientId.includes("com.example") &&
      !rawClientId.includes("flash.storefront.client")
  );

  useEffect(() => {
    loadAppleSdk()
      .then(() => {
        const appleAuth = getAppleId();
        if (appleAuth && isConfigured && rawClientId) {
          try {
            appleAuth.init({
              clientId: rawClientId,
              scope: "name email",
              redirectURI: rawRedirectUri || window.location.origin + "/login",
              state: "flash_apple_auth_state",
              usePopup: true,
            });
          } catch {
            /* Init may be called multiple times safely */
          }
        }
      })
      .catch(() => {
        /* SDK load failure handled on click */
      });
  }, [isConfigured, rawClientId, rawRedirectUri]);

  const handleAppleClick = async () => {
    if (!rawClientId || rawClientId.includes("your-apple-client-id")) {
      toast.error("Apple Client ID is not configured. Please set VITE_APPLE_CLIENT_ID in your environment.");
      return;
    }

    setLoading(true);
    try {
      await loadAppleSdk();
      const appleAuth = getAppleId();
      if (!appleAuth) {
        toast.error("Sign in with Apple is currently unavailable in this browser.");
        setLoading(false);
        return;
      }

      // Re-initialize for popup mode
      appleAuth.init({
        clientId: rawClientId,
        scope: "name email",
        redirectURI: rawRedirectUri || window.location.origin + "/login",
        state: `flash_state_${Date.now()}`,
        usePopup: true,
      });

      const response = await appleAuth.signIn();
      if (response?.authorization?.id_token) {
        const success = await signInWithAppleResponse(
          response.authorization.id_token,
          response.user
        );
        if (success) {
          toast.success("Signed in with Apple successfully.");
          onSuccess();
        } else {
          toast.error("Could not complete Apple sign-in. Invalid response token.");
        }
      } else {
        toast.error("Apple sign-in did not return a valid authentication token.");
      }
    } catch (err: any) {
      if (err?.error === "popup_closed_by_user" || err?.error === "user_cancelled_authorize") {
        toast.info("Apple sign-in was cancelled.");
      } else {
        toast.error("Something went wrong connecting to Apple Sign-In.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={handleAppleClick}
    >
      {loading ? (
        <>
          <LoaderCircle className="auth-spinner" size={17} /> Connecting
        </>
      ) : (
        <>
          <Apple size={17} fill="currentColor" /> Apple
        </>
      )}
    </button>
  );
}
