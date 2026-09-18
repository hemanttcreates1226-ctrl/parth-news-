import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { INITIAL_POSTS, INITIAL_ARTICLES } from './src/services/seedData';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function findPostByParam(param: string) {
  if (!param) return null;
  const clean = decodeURIComponent(param).trim().toLowerCase();
  const all = [...INITIAL_POSTS, ...INITIAL_ARTICLES];
  return all.find((p) => {
    if (!p) return false;
    const pId = p.id.toLowerCase();
    const pSlug = p.slug.toLowerCase();
    return (
      pId === clean ||
      pId === `post-${clean}` ||
      pId === `art-${clean}` ||
      pId.replace(/^post-/, '') === clean ||
      pId.replace(/^art-/, '') === clean ||
      pSlug === clean
    );
  });
}

function whatsappSeoPlugin(): Plugin {
  return {
    name: 'whatsapp-seo-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        
        // Match short URLs /p/:id and canonical news /news/:slug or /article/:slug
        const pMatch = url.match(/^\/p\/([^/?#]+)/);
        const newsMatch = url.match(/^\/news\/([^/?#]+)/);
        const articleMatch = url.match(/^\/article\/([^/?#]+)/);

        const param = pMatch ? pMatch[1] : (newsMatch ? newsMatch[1] : (articleMatch ? articleMatch[1] : null));

        if (param) {
          const userAgent = req.headers['user-agent'] || '';
          const isBot = /WhatsApp|facebookexternalhit|Facebot|Twitterbot|TelegramBot|Slackbot|LinkedInBot|Discordbot|Pinterest|Googlebot|bingbot/i.test(userAgent);

          const post = findPostByParam(param);

          // If social scraper/bot (WhatsApp crawler) accesses the URL, serve direct Open Graph HTML
          if (post && isBot) {
            const host = req.headers.host || 'localhost:3000';
            const protocol = req.headers['x-forwarded-proto'] || 'https';
            const baseUrl = `${protocol}://${host}`;
            const shortCode = post.id.startsWith('post-') ? post.id.replace('post-', '') : post.id;
            const canonicalUrl = `${baseUrl}/p/${shortCode}`;
            const title = escapeHtml(post.titleHindi || post.title);
            const desc = escapeHtml(post.description || post.title);
            const imageUrl = post.featuredImage.startsWith('http') 
              ? post.featuredImage 
              : `${baseUrl}${post.featuredImage.startsWith('/') ? '' : '/'}${post.featuredImage}`;

            const html = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>${title} | पार्थ न्यूज़ (Parth News)</title>
  <meta name="description" content="${desc}">
  <meta property="og:site_name" content="पार्थ न्यूज़ (Parth News) - सच के साथ, एक कदम आगे">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:secure_url" content="${imageUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${imageUrl}">
  <link rel="canonical" href="${canonicalUrl}">
</head>
<body>
  <h1>${title}</h1>
  <p>${desc}</p>
  <img src="${imageUrl}" alt="${title}">
  <p><a href="${canonicalUrl}">पार्थ न्यूज़ पर पूरी खबर पढ़ें</a></p>
  <script>window.location.replace("${canonicalUrl}");</script>
</body>
</html>`;

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=300');
            res.end(html);
            return;
          }
        }

        next();
      });
    },

    transformIndexHtml(html, ctx) {
      const url = ctx.originalUrl || ctx.path || '';
      const pMatch = url.match(/^\/p\/([^/?#]+)/);
      const newsMatch = url.match(/^\/news\/([^/?#]+)/);
      const articleMatch = url.match(/^\/article\/([^/?#]+)/);

      const param = pMatch ? pMatch[1] : (newsMatch ? newsMatch[1] : (articleMatch ? articleMatch[1] : null));
      if (!param) return html;

      const post = findPostByParam(param);
      if (!post) return html;

      const title = escapeHtml(post.titleHindi || post.title);
      const desc = escapeHtml(post.description || post.title);
      const imageUrl = post.featuredImage;

      // Replace generic meta tags with post-specific tags
      let modified = html;
      modified = modified.replace(
        /<title>.*?<\/title>/i,
        `<title>${title} | पार्थ न्यूज़</title>`
      );
      modified = modified.replace(
        /<meta property="og:title" content=".*?" \/>/i,
        `<meta property="og:title" content="${title}" />`
      );
      modified = modified.replace(
        /<meta property="og:description" content=".*?" \/>/i,
        `<meta property="og:description" content="${desc}" />`
      );
      modified = modified.replace(
        /<meta property="og:image" content=".*?" \/>/i,
        `<meta property="og:image" content="${imageUrl}" />`
      );
      modified = modified.replace(
        /<meta property="og:image:secure_url" content=".*?" \/>/i,
        `<meta property="og:image:secure_url" content="${imageUrl}" />`
      );
      modified = modified.replace(
        /<meta name="twitter:title" content=".*?" \/>/i,
        `<meta name="twitter:title" content="${title}" />`
      );
      modified = modified.replace(
        /<meta name="twitter:description" content=".*?" \/>/i,
        `<meta name="twitter:description" content="${desc}" />`
      );
      modified = modified.replace(
        /<meta name="twitter:image" content=".*?" \/>/i,
        `<meta name="twitter:image" content="${imageUrl}" />`
      );

      return modified;
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), whatsappSeoPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
