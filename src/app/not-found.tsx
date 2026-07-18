export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-900 text-white">
      <div className="text-center">
        <h1 className="font-display text-6xl md:text-8xl text-accent-crimson text-glow mb-4">404</h1>
        <p className="text-xl text-ink-400 mb-6">Page not found</p>
        <a href="/My-Portfolio/" className="px-6 py-3 bg-accent-crimson hover:bg-accent-crimson/80 text-white rounded-xl font-medium transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  );
}