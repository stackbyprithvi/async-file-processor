import { useEffect } from "react";

export default function AuthCallback({ onAuth }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      onAuth(token);
      window.history.replaceState({}, "", "/"); // clean the URL
    }
  }, []);

  return (
    <p className="text-center text-sm text-zinc-400 mt-20">Signing you in…</p>
  );
}
