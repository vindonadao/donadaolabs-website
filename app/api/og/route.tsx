import { ImageResponse } from 'next/og';
import { HERO, MANIFESTO, SITE } from '@/lib/constants';

export const runtime = 'edge';

const SIZE = {
  width: 1200,
  height: 630,
};

async function loadFont(origin: string, weight: 600 | 800): Promise<ArrayBuffer> {
  const fontUrl = `${origin}/fonts/InterTight-${weight}.ttf`;
  const response = await fetch(fontUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch InterTight-${weight}: ${response.status}`);
  }

  return response.arrayBuffer();
}

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const [fontExtraBold, fontSemiBold] = await Promise.all([
      loadFont(url.origin, 800),
      loadFont(url.origin, 600),
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px 80px',
            background: '#0E0E10',
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(110, 91, 255, 0.32) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(75, 61, 217, 0.18) 0%, transparent 50%)',
            position: 'relative',
            fontFamily: 'Inter Tight',
          }}
        >
          {/* Top: badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 18px',
              border: '1px solid rgba(110, 91, 255, 0.4)',
              borderRadius: '9999px',
              background: 'rgba(110, 91, 255, 0.12)',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#8B7BFF',
              alignSelf: 'flex-start',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '9999px',
                background: '#6E5BFF',
                boxShadow: '0 0 16px rgba(110, 91, 255, 0.7)',
              }}
            />
            AI Software Lab · 2026
          </div>

          {/* Center: tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '128px',
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 0.95,
              color: '#FAFAFA',
            }}
          >
            <span>{HERO.headline}</span>
            <span style={{ display: 'flex' }}>
              that{' '}
              <span
                style={{
                  marginLeft: '0.25em',
                  background: 'linear-gradient(135deg, #8B7BFF 0%, #4B3DD9 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {HERO.headlineEm}
              </span>
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#27272A',
            }}
          />

          {/* Bottom: quote + url */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                color: '#D4D4D8',
                fontStyle: 'italic',
                maxWidth: '720px',
              }}
            >
              <span>“{MANIFESTO.quote}</span>
              <span>{MANIFESTO.quoteEm}”</span>
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '24px',
                fontWeight: 600,
                letterSpacing: '-0.005em',
                color: '#A1A1AA',
              }}
            >
              {SITE.url.replace('https://', '')}
            </div>
          </div>
        </div>
      ),
      {
        ...SIZE,
        fonts: [
          {
            name: 'Inter Tight',
            data: fontExtraBold,
            weight: 800,
            style: 'normal',
          },
          {
            name: 'Inter Tight',
            data: fontSemiBold,
            weight: 600,
            style: 'normal',
          },
        ],
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    return new Response(`OG image generation failed: ${message}`, { status: 500 });
  }
}
