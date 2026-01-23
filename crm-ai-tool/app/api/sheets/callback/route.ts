import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode, encryptToken } from '@/lib/api/google-auth';
import { updateGoogleSheetConnection } from '@/lib/db/queries/performance';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL('/dashboard?error=auth_failed', request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/dashboard?error=no_code', request.url)
      );
    }

    const tokens = await getTokensFromCode(code);

    if (!tokens.access_token) {
      return NextResponse.redirect(
        new URL('/dashboard?error=no_token', request.url)
      );
    }

    const encryptedAccessToken = encryptToken(tokens.access_token);
    const encryptedRefreshToken = tokens.refresh_token
      ? encryptToken(tokens.refresh_token)
      : null;

    await updateGoogleSheetConnection({
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      status: 'connected',
    });

    return NextResponse.redirect(
      new URL('/dashboard?success=connected', request.url)
    );
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/dashboard?error=callback_failed', request.url)
    );
  }
}
