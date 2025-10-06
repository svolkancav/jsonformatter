import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
}

export function SEO({
  title = 'JSON Formatter - Format JSON & Generate C# Classes',
  description = 'Professional JSON formatter and C# class generator tool. Format, minify JSON and generate C# classes instantly. Free forever.',
  keywords = 'JSON formatter, C# generator, JSON to C#, JSON minifier, JSON beautifier, JSON validator',
  ogType = 'website'
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://jsonformater.com';
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: fullUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description }
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const value = name || property;

      let element = document.querySelector(`meta[${attribute}="${value}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value!);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'JSON Formatter',
      description: description,
      url: baseUrl,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, ogType, fullUrl]);

  return null;
}
