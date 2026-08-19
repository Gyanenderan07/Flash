/**
 * Flash Google Identity — official GIS when a client ID is configured, otherwise an explicit
 * browser-local account chooser keeps the prototype flow active without implying live OAuth.
 */
import { useEffect, useRef, useState } from "react";
import { ChevronRight, UserPlus, X } from "lucide-react";
import type { GoogleProfile } from "@/contexts/AuthContext";
import SafeImage from "@/components/common/SafeImage";

type GoogleIdApi = { initialize: (options: { client_id: string; callback: (response: { credential?: string }) => void; auto_select?: boolean; cancel_on_tap_outside?: boolean; itp_support?: boolean }) => void; renderButton: (element: HTMLElement, options: { theme: "outline"; size: "large"; text: "continue_with"; shape: "pill"; logo_alignment: "left"; width: number }) => void; prompt: () => void };
const getGoogleId = () => (Reflect.get(window, "google") as { accounts?: { id?: GoogleIdApi } } | undefined)?.accounts?.id;
const GIS_SRC = "https://accounts.google.com/gsi/client";
const fallbackAccounts: GoogleProfile[] = [
  { id: "local-aanya-mehta", name: "Aanya Mehta", email: "aanya@flash.example", avatar: "https://api.dicebear.com/9.x/personas/svg?seed=Aanya%20Mehta&backgroundColor=e2f800" },
  { id: "local-arjun-nair", name: "Arjun Nair", email: "arjun@flash.example", avatar: "https://api.dicebear.com/9.x/personas/svg?seed=Arjun%20Nair&backgroundColor=e2f800" },
  { id: "local-mira-shah", name: "Mira Shah", email: "mira@flash.example", avatar: "https://api.dicebear.com/9.x/personas/svg?seed=Mira%20Shah&backgroundColor=e2f800" },
];
let scriptPromise: Promise<void> | null = null;
function loadGoogleIdentity() { if (getGoogleId()) return Promise.resolve(); if (scriptPromise) return scriptPromise; scriptPromise = new Promise((resolve, reject) => { const script = document.createElement("script"); script.src = GIS_SRC; script.async = true; script.defer = true; script.onload = () => resolve(); script.onerror = () => reject(new Error("GIS failed to load")); document.head.appendChild(script); }); return scriptPromise; }

export default function GoogleIdentityButton({ onCredential, onProfile, oneTap = true }: { onCredential: (credential: string) => void; onProfile: (profile: GoogleProfile) => void; oneTap?: boolean }) {
  const holderRef = useRef<HTMLDivElement>(null); const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading"); const [chooserOpen, setChooserOpen] = useState(false); const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  useEffect(() => { let active = true; if (!clientId) { setStatus("fallback"); return; } loadGoogleIdentity().then(() => { const googleId = getGoogleId(); if (!active || !googleId || !holderRef.current) return; googleId.initialize({ client_id: clientId, callback: (response) => response.credential && onCredential(response.credential), auto_select: false, cancel_on_tap_outside: true, itp_support: true }); holderRef.current.innerHTML = ""; googleId.renderButton(holderRef.current, { theme: "outline", size: "large", text: "continue_with", shape: "pill", logo_alignment: "left", width: Math.min(Math.max(holderRef.current.clientWidth, 260), 360) }); setStatus("ready"); if (oneTap) window.setTimeout(() => active && googleId.prompt(), 450); }).catch(() => active && setStatus("fallback")); return () => { active = false; }; }, [clientId, onCredential, oneTap]);
  return <>{status === "ready" || status === "loading" ? <div className={`google-identity-slot ${status === "loading" ? "is-loading" : ""}`} ref={holderRef} aria-label="Continue with Google" /> : <button type="button" className="google-fallback-button" onClick={() => setChooserOpen(true)}><GoogleMark /> Continue with Google</button>}{chooserOpen && <div className="google-chooser-backdrop" onMouseDown={() => setChooserOpen(false)}><section className="google-chooser" role="dialog" aria-modal="true" aria-label="Choose a Google account" onMouseDown={(event) => event.stopPropagation()}><header><div><GoogleMark /><span>Sign in with Google</span></div><button onClick={() => setChooserOpen(false)} aria-label="Close account chooser"><X size={18} /></button></header><div className="google-chooser__content"><p className="google-chooser__tag">Browser-local account picker</p><h2>Choose an account</h2><p>to continue to <b>Flash</b></p><div className="google-account-list">{fallbackAccounts.map((account) => <button key={account.id} onClick={() => { onProfile(account); setChooserOpen(false); }}><SafeImage src={account.avatar} alt="" /><span><b>{account.name}</b><small>{account.email}</small></span><ChevronRight size={18} /></button>)}</div><button className="google-use-other" onClick={() => setChooserOpen(false)}><UserPlus size={18} /> Use another account</button></div></section></div>}</>;
}
function GoogleMark() { return <span className="google-mark" aria-hidden="true">G</span>; }
