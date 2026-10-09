'use client';

/** Last-resort error screen when the root layout itself fails. Must render <html> and <body>. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1.5rem', textAlign: 'center', color: '#12112e' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ marginTop: '0.75rem', color: '#57534e' }}>Please refresh the page or try again in a moment.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: 'none',
            background: '#c2250c',
            color: '#ffffff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
