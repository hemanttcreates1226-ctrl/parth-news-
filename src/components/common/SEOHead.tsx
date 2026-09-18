import React, { useEffect } from 'react';
import { Post } from '../../types';
import { getPostShortUrl } from '../../utils/shareUtils';

interface SEOHeadProps {
  post: Post;
  siteName?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ 
  post, 
  siteName = 'पार्थ न्यूज़ (Parth News) - सच के साथ, एक कदम आगे' 
}) => {
  useEffect(() => {
    if (!post) return;

    const title = post.titleHindi || post.title;
    const desc = post.description || post.title;
    const imageUrl = post.featuredImage;
    const shortUrl = getPostShortUrl(post);

    // Update document title
    document.title = `${title} | पार्थ न्यूज़`;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    setMetaTag('name', 'description', desc);

    // OpenGraph (Crucial for WhatsApp link preview thumbnail, title, description)
    setMetaTag('property', 'og:site_name', siteName);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:url', shortUrl);
    if (imageUrl) {
      setMetaTag('property', 'og:image', imageUrl);
      setMetaTag('property', 'og:image:secure_url', imageUrl);
      setMetaTag('property', 'og:image:width', '1200');
      setMetaTag('property', 'og:image:height', '630');
      setMetaTag('property', 'og:image:alt', title);
      setMetaTag('property', 'og:image:type', 'image/jpeg');
    }

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', desc);
    if (imageUrl) {
      setMetaTag('name', 'twitter:image', imageUrl);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', shortUrl);

    return () => {
      // Revert title when unmounting
      document.title = 'Parth News - सच के साथ, एक कदम आगे | Official News Portal';
    };
  }, [post, siteName]);

  return null;
};
