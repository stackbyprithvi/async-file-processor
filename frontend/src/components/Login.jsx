export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <a
        href="http://localhost:3000/auth/google"
        className="inline-flex items-center gap-3 rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 transition-colors"
      >
        <img src="https://www.google.com/favicon.ico" className="h-4 w-4" />
        Continue with Google
      </a>
    </div>
  );
}
