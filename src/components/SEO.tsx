import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export function SEO({
  title = 'JSON Formatter - Format JSON & Generate C# Classes',
  description = 'Professional JSON formatter and C# class generator tool. Format, minify JSON and generate C# classes instantly. Free forever.',
  keywords = 'JSON formatter, C# generator, JSON to C#, JSON minifier, JSON beautifier, JSON validator',
  ogType = 'website',
  canonicalUrl
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://jsonformater.com';
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: fullUrl },
      { property: 'og:site_name', content: 'JSON Formatter' },
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

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Enhanced structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: title.split(' - ')[0],
      description: description,
      url: fullUrl,
      applicationCategory: 'DeveloperTool',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        '@type': 'Organization',
        name: 'JSON Formatter'
      },
      featureList: [
        'JSON formatting and validation',
        'Excel to JSON conversion',
        'JSON to Excel conversion',
        'C# class generation',
        'Free online tool'
      ]
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
