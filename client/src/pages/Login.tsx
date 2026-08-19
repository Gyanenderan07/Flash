/**
 * Flash login route — the focused, full-page companion to the header auth trigger, styled as
 * a high-contrast entry lane into the established Flash storefront.
 */
import { Link, useSearchParams } from "react-router-dom";
import AuthPanel from "@/components/AuthPanel";
import { ArrowRight, Zap } from "lucide-react";

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? undefined;
  return <section className="auth-page shell"><div className="auth-page__stage"><aside className="auth-poster"><Link className="auth-poster__brand" to="/"><Zap fill="currentColor" /> Flash</Link><div><p className="eyebrow">Flash account</p><h2>Every drop.<br /><em>In your lane.</em></h2><p>One sign-in keeps your saved finds, profile, and order activity close to the action.</p></div><Link className="auth-poster__link" to="/shop">Shop without signing in <ArrowRight size={17} /></Link><span className="auth-poster__bolt"><Zap fill="currentColor" /></span></aside><AuthPanel redirectTo={redirectTo} /></div></section>;
}
