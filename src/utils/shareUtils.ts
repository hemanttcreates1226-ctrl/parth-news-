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
 * Avoids sharing unreachable localhost or private development preview addresses (e.g. ais-dev)
 * which external crawlers like WhatsApp or Facebook cannot access due to auth cookies.
 */
export function getPostPublicOrigin(customOrigin?: string): string {
  if (customOrigin) return customOrigin;
  
  if (typeof window !== 'undefined') {
    // Check if user set a custom live domain in site settings
    try {
      const storedSettings = localStorage.getItem('parth_news_settings');
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed.siteUrl && parsed.siteUrl.startsWith('http')) {
          return parsed.siteUrl.replace(/\/$/, '');
        }
      }
    } catch {
      // ignore
    }

    const { origin, hostname } = window.location;
    // When running inside AI Studio development environment or localhost,
    // external web crawlers (WhatsApp scraper) are blocked by Google's cookie wall.
    // Use the official public domain so WhatsApp links are crawlable and previewable.
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.includes('ais-dev-') ||
      hostname.includes('.run.app')
    ) {
      return 'https://parthnews.in';
    }
    return origin;
  }

  return 'https://parthnews.in';
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
 * Robustly converts an image URL (remote, base64 data-URL, or local path) into a Blob.
 */
export async function getPostImageBlob(imageUrl: string): Promise<Blob | null> {
  if (!imageUrl) return null;

  // 1. If base64 data URL
  if (imageUrl.startsWith('data:image/')) {
    try {
      const parts = imageUrl.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    } catch (e) {
      console.warn('Error decoding base64 image', e);
    }
  }

  // 2. Direct fetch with CORS
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(imageUrl, { mode: 'cors', signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.blob();
    }
  } catch {
    // CORS or fetch error, proceed to canvas method
  }

  // 3. Fallback: load image via HTMLImageElement and render to canvas
  try {
    const blob = await new Promise<Blob | null>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width || 800;
          canvas.height = img.naturalHeight || img.height || 450;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(null);
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92);
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = imageUrl;
    });
    if (blob) return blob;
  } catch {
    // fallback
  }

  return null;
}

/**
 * Creates a standard File object for the post's featured thumbnail image.
 */
export async function getPostImageFile(post: Post): Promise<File | null> {
  if (!post || !post.featuredImage) return null;
  try {
    const blob = await getPostImageBlob(post.featuredImage);
    if (!blob) return null;
    const isPng = blob.type.includes('png');
    const filename = `parth-news-${post.id || 'article'}.${isPng ? 'png' : 'jpg'}`;
    return new File([blob], filename, { type: blob.type || 'image/jpeg' });
  } catch {
    return null;
  }
}

/**
 * Copies the post's thumbnail photo to the system clipboard.
 * Allows users on desktop to easily paste (Ctrl+V) directly into WhatsApp Web.
 */
export async function copyPostImageToClipboard(post: Post): Promise<boolean> {
  if (!post.featuredImage || typeof navigator === 'undefined' || !navigator.clipboard) {
    return false;
  }
  try {
    const blob = await getPostImageBlob(post.featuredImage);
    if (!blob || !window.ClipboardItem) return false;

    // Browser Clipboard API requires image/png
    let pngBlob = blob;
    if (!blob.type.includes('png')) {
      pngBlob = await new Promise<Blob>((resolve) => {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((b) => resolve(b || blob), 'image/png');
          } else {
            resolve(blob);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve(blob);
        };
        img.src = url;
      });
    }

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': pngBlob })
    ]);
    return true;
  } catch (e) {
    console.warn('Could not copy image to clipboard:', e);
    return false;
  }
}

/**
 * Triggers a download of the post's thumbnail image.
 */
export async function downloadPostImage(post: Post): Promise<boolean> {
  try {
    const blob = await getPostImageBlob(post.featuredImage);
    if (!blob) return false;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parth-news-${post.id || 'post'}.jpg`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
    return true;
  } catch {
    return false;
  }
}

/**
 * Formats a clean WhatsApp share message with headline, summary,
 * and the clean news link.
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
 * - If native file sharing is supported (Android, iOS, modern OS):
 *   Attaches the ACTUAL IMAGE FILE directly into the share dialog so WhatsApp
 *   sends the real photo with headline & news link caption!
 * - On desktop or browsers where file sharing is unsupported:
 *   Copies the image to clipboard (so the user can just Ctrl+V into WhatsApp Web),
 *   and opens WhatsApp with the formatted headline and public news link!
 */
export async function sharePostToWhatsApp(post: Post, customOrigin?: string): Promise<{
  method: 'native-share' | 'whatsapp-link';
  copiedImage?: boolean;
}> {
  const headline = post.titleHindi || post.title;
  const origin = getPostPublicOrigin(customOrigin);
  const messageText = formatWhatsAppShareText(post, origin);

  // 1. Check if device supports sharing files directly via Web Share API
  if (typeof navigator !== 'undefined' && navigator.canShare && post.featuredImage) {
    try {
      const file = await getPostImageFile(post);
      if (file && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: headline,
          text: messageText,
          files: [file]
        });
        return { method: 'native-share' };
      }
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        // User cancelled share dialog
        return { method: 'native-share' };
      }
      // Otherwise fall through to direct WhatsApp
    }
  }

  // 2. Desktop WhatsApp Web / fallback:
  // Try to copy image to clipboard so user can easily paste (Ctrl+V) into WhatsApp Web
  let copiedImage = false;
  try {
    copiedImage = await copyPostImageToClipboard(post);
  } catch {
    // Ignore clipboard error
  }

  // 3. Open WhatsApp Web / App
  openDirectWhatsApp(post, customOrigin);
  return { method: 'whatsapp-link', copiedImage };
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
