/**
 * IndexNow API integration for automatic search engine indexing
 * 
 * IndexNow is a protocol that allows you to instantly inform search engines
 * when URLs on your website are created, updated, or deleted.
 * 
 * Supported by: Bing, Yandex, Seznam.cz, Naver, and others
 * Google doesn't officially support IndexNow yet, but it helps with discovery
 * 
 * @see https://www.indexnow.org/
 */

const INDEXNOW_API_URLS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

/**
 * Generate a random key for IndexNow authentication
 * This should be stored in your .env file as INDEXNOW_KEY
 */
export function generateIndexNowKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Submit URLs to IndexNow for immediate indexing
 * 
 * @param urls Array of full URLs to submit
 * @param key Your IndexNow key (should be stored in .env)
 * @returns Promise<boolean> True if at least one submission succeeded
 */
export async function submitToIndexNow(
  urls: string[],
  key?: string
): Promise<boolean> {
  const indexNowKey = key || process.env.INDEXNOW_KEY;
  
  if (!indexNowKey) {
    console.warn('IndexNow: No key provided. Set INDEXNOW_KEY in .env to enable automatic indexing.');
    return false;
  }

  if (!urls || urls.length === 0) {
    return false;
  }

  // Extract hostname from first URL to create key file location
  try {
    const firstUrl = new URL(urls[0]);
    const hostname = firstUrl.hostname;
    
    // IndexNow requires a key file at: https://yourdomain.com/{key}.txt
    // This is handled separately - you need to create this file manually
    // or via your hosting provider
    
    const payload = {
      host: hostname,
      key: indexNowKey,
      keyLocation: `https://${hostname}/${indexNowKey}.txt`,
      urlList: urls,
    };

    // Try multiple IndexNow endpoints for better coverage
    const results = await Promise.allSettled(
      INDEXNOW_API_URLS.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (response.ok || response.status === 202) {
            console.log(`IndexNow: Successfully submitted ${urls.length} URL(s) to ${endpoint}`);
            return true;
          } else {
            console.warn(`IndexNow: Failed to submit to ${endpoint}: ${response.status}`);
            return false;
          }
        } catch (error) {
          console.warn(`IndexNow: Error submitting to ${endpoint}:`, error);
          return false;
        }
      })
    );

    // Return true if at least one submission succeeded
    return results.some(result => result.status === 'fulfilled' && result.value === true);
  } catch (error) {
    console.error('IndexNow: Error processing URLs:', error);
    return false;
  }
}

/**
 * Submit a single URL to IndexNow
 */
export async function submitUrlToIndexNow(url: string, key?: string): Promise<boolean> {
  return submitToIndexNow([url], key);
}

