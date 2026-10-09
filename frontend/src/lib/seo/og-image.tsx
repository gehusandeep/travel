import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

interface OgCardProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  facts?: string[];
}

let logoDataUri: Promise<string> | undefined;

/** Reads the brand shield from /public once per server process. */
function loadLogo(): Promise<string> {
  logoDataUri ??= readFile(join(process.cwd(), 'public', siteConfig.logo)).then(
    (file) => `data:image/png;base64,${file.toString('base64')}`,
  );
  return logoDataUri;
}

/**
 * Shared Open Graph card used by the generated opengraph-image routes.
 * Text is kept to plain Latin characters so the built-in font renders it
 * without fetching extra glyphs at build time.
 */
export async function renderOgImage({ eyebrow, title, subtitle, facts = [] }: OgCardProps): Promise<ImageResponse> {
  const logo = await loadLogo();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #12112e 0%, #2f2e74 60%, #c2250c 140%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
          <img src={logo} width={84} height={84} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</span>
            <span style={{ fontSize: 18, letterSpacing: 4, color: '#f6983a', textTransform: 'uppercase' }}>
              {siteConfig.tagline}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {eyebrow ? (
            <span style={{ fontSize: 24, letterSpacing: 3, color: '#f6983a', textTransform: 'uppercase' }}>
              {eyebrow}
            </span>
          ) : null}
          <span style={{ fontSize: title.length > 55 ? 52 : 64, fontWeight: 700, lineHeight: 1.1 }}>{title}</span>
          {subtitle ? (
            <span style={{ fontSize: 28, lineHeight: 1.35, color: 'rgba(255,255,255,0.85)' }}>{subtitle}</span>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {facts.map((fact) => (
            <span
              key={fact}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 999,
                fontSize: 24,
                background: 'rgba(255,255,255,0.14)',
              }}
            >
              {fact}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
