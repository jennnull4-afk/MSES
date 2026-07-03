import { useEffect } from 'react';

const DEFAULT_KEYWORDS = 'environmental services, emergency response, industrial services, remediation, waste management, spill response, environmental compliance, disaster response, storm cleanup, industrial cleaning, rail support services, Mississippi, Tennessee, Arkansas, Louisiana, Southeast United States';

/**
 * Custom hook to manage SEO metadata per page
 * @param {Object} config - SEO configuration
 * @param {string} config.title - Page title
 * @param {string} config.description - Meta description
 * @param {string} config.canonical - Canonical URL
 * @param {string} [config.image] - Open Graph / Twitter image URL
 * @param {string} [config.ogType] - Open Graph type (default: website)
 */
export function useSEO({ title, description, canonical, image = 'https://www.mses.online/faviconshare.png.jpeg', ogType = 'website' }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    const setSchema = (schemaObject) => {
      let script = document.querySelector('script[type="application/ld+json"][data-seo-schema="true"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.seoSchema = 'true';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaObject, null, 2);
    };

    setMeta('description', description);
    setMeta('keywords', DEFAULT_KEYWORDS);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', 'Mid-South Environmental Services', true);
    setMeta('og:image', image, true);
    setMeta('og:locale', 'en_US', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:url', canonical);

    if (canonical) {
      setLink('canonical', canonical);
    }

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mses.online/'
      }
    ];

    if (canonical && canonical !== 'https://www.mses.online/') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: canonical
      });
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: canonical,
      name: title,
      description,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      }
    };

    setSchema(schema);
  }, [title, description, canonical, image, ogType]);
}

export default useSEO;
