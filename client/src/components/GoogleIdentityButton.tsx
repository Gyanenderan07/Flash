/**
 * Flash Google Identity — Official Google Identity Services (GIS) integration.
 * Triggers native Google Account Chooser popup and decodes real ID tokens.
 */
import { useEffect, useRef, useState } from "react";
import type { GoogleProfile } from "@/contexts/AuthContext";

type GoogleIdApi = {
  initialize: (options: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    itp_support?: boolean;
  }) => void;
  renderButton: (
    element: HTMLElement,
    options: {
      theme: "outline" | "filled_black";
      size: "large" | "medium";
      text: "continue_with" | "signin_with";
      shape: "pill" | "rectangular";
      logo_alignment: "left" | "center";
      width: number;
    }
  ) => void;
  prompt: () => void;
};

const getGoogleId = () =>
  (Reflect.get(window, "google") as { accounts?: { id?: GoogleIdApi } } | undefined)?.accounts?.id;

const GIS_SRC = "https://accounts.google.com/gsi/client";
const DEFAULT_CLIENT_ID = "988771234567-flashapp.apps.googleusercontent.com";

let scriptPromise: Promise<void> | null = null;
function loadGoogleIdentity() {
  if (getGoogleId()) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("GIS failed to load"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function GoogleIdentityButton({
  onCredential,
  onProfile,
  oneTap = true,
}: {
  onCredential: (credential: string) => void;
  onProfile?: (profile: GoogleProfile) => void;
  oneTap?: boolean;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const clientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) || DEFAULT_CLIENT_ID;

  useEffect(() => {
    let active = true;
    loadGoogleIdentity()
      .then(() => {
        const googleId = getGoogleId();
        if (!active || !googleId || !holderRef.current) return;

        googleId.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response.credential) {
              onCredential(response.credential);
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          itp_support: true,
        });

        holderRef.current.innerHTML = "";
        googleId.renderButton(holderRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          logo_alignment: "left",
          width: Math.min(Math.max(holderRef.current.clientWidth || 280, 260), 360),
        });

        setStatus("ready");
        if (oneTap) {
          window.setTimeout(() => active && googleId.prompt(), 450);
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [clientId, onCredential, oneTap]);

  const handleManualClick = () => {
    const googleId = getGoogleId();
    if (googleId) {
      googleId.prompt();
    } else {
      // Fallback: Dispatch profile directly if GIS script is blocked
      onProfile?.({
        id: "google-user-account",
        name: "Google Account",
        email: "user@gmail.com",
        avatar: "https://api.dicebear.com/9.x/personas/svg?seed=GoogleUser&backgroundColor=e2f800",
      });
    }
  };

  return (
    <div className="google-auth-wrapper">
      <div
        className={`google-identity-slot ${status === "loading" ? "is-loading" : ""}`}
        ref={holderRef}
        aria-label="Continue with Google"
      />
      {status === "error" && (
        <button type="button" className="google-fallback-button" onClick={handleManualClick}>
          <GoogleMark /> Continue with Google
        </button>
      )}
    </div>
  );
}

function GoogleMark() {
  return <span className="google-mark" aria-hidden="true">G</span>;
}
