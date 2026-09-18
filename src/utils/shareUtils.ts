import { Post } from '../types';

/**
 * Derives a clean, short code for any post or editorial article.
 * E.g., 'post-1' -> '1', 'post-2' -> '2', 'art-1' -> 'a1'
 */
export function getPostShortCode(post: { id: string; slug?: string }): string {
  if (!post || !post.id) return '';
  if (post.id.startsWith('post-')) {
    return post.id.replace('post-', '');
  }
  if (post.id.startsWith('art-')) {
    return 'a' + post.id.replace('art-', '');
  }
  return post.id;
}

/**
 * Determines the public origin for sharing links.
 * Avoids sharing unreachable localhost/private addresses.
 */
export function getPostPublicOrigin(customOrigin?: string): string {
  if (customOrigin) return customOrigin;
  if (typeof window === 'undefined') return 'https://parthnews.in';
  const { origin, hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
    return 'https://parthnews.in';
  }
  return origin;
}

/**
 * Returns a short, clean, and simple URL for the post.
 * Format: https://domain/p/1 or https://domain/p/2
 */
export function getPostShortUrl(post: { id: string; slug?: string }, customOrigin?: string): string {
  const origin = getPostPublicOrigin(customOrigin);
  const code = getPostShortCode(post);
  return `${origin}/p/${code}`;
}

/**
 * Returns the full canonical URL for the post.
 */
export function getPostFullUrl(post: { id: string; slug?: string }, customOrigin?: string): string {
  const origin = getPostPublicOrigin(customOrigin);
  return `${origin}/news/${post.slug || post.id}`;
}

/**
 * Formats a clean WhatsApp share message with headline, summary,
 * and the clean news link.
 * Note: The thumbnail image URL is NOT included in the text to avoid raw link exposure.
 * Instead, WhatsApp generates the thumbnail preview card directly from the article's link!
 */
export function formatWhatsAppShareText(post: Post, customOrigin?: string): string {
  const headline = post.titleHindi || post.title;
  const desc = post.description ? post.description.trim() : '';
  const shortUrl = getPostShortUrl(post, customOrigin);

  let text = `*🔴 ${headline}*\n\n`;
  if (desc) {
    text += `${desc}\n\n`;
  }
  text += `📰 *पूरी खबर पढ़ें (Parth News):*\n${shortUrl}\n\n`;
  text += `*पार्थ न्यूज़ (सच के साथ, एक कदम आगे)*`;
  return text;
}

/**
 * Returns the direct WhatsApp intent URL with the full share payload.
 */
export function getWhatsAppShareUrl(post: Post, customOrigin?: string): string {
  const messageText = formatWhatsAppShareText(post, customOrigin);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
}

/**
 * Direct opening of WhatsApp intent. Synchronous to prevent popup blocking.
 */
export function openDirectWhatsApp(post: Post, customOrigin?: string): void {
  const whatsappUrl = getWhatsAppShareUrl(post, customOrigin);
  
  if (typeof window !== 'undefined') {
    const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Fallback if popup blocker intercepted
    if (!win || win.closed || typeof win.closed === 'undefined') {
      const a = document.createElement('a');
      a.href = whatsappUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try {
          document.body.removeChild(a);
        } catch {
          // ignore
        }
      }, 200);
    }
  }
}

/**
 * Shares a post to WhatsApp.
 * - On mobile (Android/iOS), if Web Share with file is supported, it attaches the
 *   actual image file directly so WhatsApp sends a full photo with the caption!
 * - On desktop or browsers without file sharing, it opens WhatsApp directly
 *   with the formatted headline and clean article short URL (no raw image link in text).
 */
export async function sharePostToWhatsApp(post: Post, customOrigin?: string): Promise<void> {
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  
  // On mobile devices, try sharing the actual image file so WhatsApp receives the real thumbnail photo
  if (isMobile && typeof navigator !== 'undefined' && navigator.canShare && post.featuredImage) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      const res = await fetch(post.featuredImage, { mode: 'cors', signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const blob = await res.blob();
        const file = new File([blob], 'parth-news-thumbnail.jpg', { type: blob.type || 'image/jpeg' });
        const headline = post.titleHindi || post.title;
        const origin = getPostPublicOrigin(customOrigin);
        const messageText = formatWhatsAppShareText(post, origin);

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: headline,
            text: messageText,
            files: [file]
          });
          return;
        }
      }
    } catch {
      // User cancelled share dialog or fetch timed out, fall back to direct WhatsApp intent
    }
  }

  // Synchronous direct WhatsApp opening for desktop & fallback
  openDirectWhatsApp(post, customOrigin);
}

/**
 * Optional: shares post with attached image file on mobile devices supporting Web Share API files.
 */
export async function sharePostWithImageFile(post: Post): Promise<boolean> {
  const headline = post.titleHindi || post.title;
  const origin = getPostPublicOrigin();
  const shortUrl = getPostShortUrl(post, origin);
  const messageText = formatWhatsAppShareText(post, origin);

  if (typeof navigator !== 'undefined' && navigator.canShare && post.featuredImage) {
    try {
      const res = await fetch(post.featuredImage, { mode: 'cors' });
      if (res.ok) {
        const blob = await res.blob();
        const file = new File([blob], 'parth-news-thumbnail.jpg', { type: blob.type || 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: headline,
            text: messageText,
            url: shortUrl,
            files: [file]
          });
          return true;
        }
      }
    } catch {
      // Fallback
    }
  }

  sharePostToWhatsApp(post);
  return true;
}

/**
 * Copies the short URL of a post to clipboard.
 */
export async function copyPostShortUrl(post: Post): Promise<string> {
  const shortUrl = getPostShortUrl(post);
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(shortUrl);
  }
  return shortUrl;
}
