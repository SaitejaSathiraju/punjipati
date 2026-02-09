# Quick Indexing Reference Guide

## 🚀 Quick Setup (5 Minutes)

### 1. Google Search Console
```bash
1. Go to: https://search.google.com/search-console
2. Add property: https://punjipati.com
3. Verify domain (DNS or HTML file)
4. Submit sitemap: sitemap.xml
```

### 2. IndexNow (Optional)
```bash
# Generate key
node -e "console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))"

# Add to .env
INDEXNOW_KEY=your_generated_key_here

# Create key file: public/{your_key}.txt
# Content: just the key (no quotes)
```

## ✅ What Happens Automatically

When you publish a post:

1. ✅ Sitemap updates automatically
2. ✅ IndexNow pings automatically (if configured)
3. ✅ Google discovers via sitemap (within 1-7 days)
4. ✅ Page gets indexed (within 1-14 days)
5. ✅ Page ranks (if content is good)

**No manual work needed!**

## 🔍 Check Indexing Status

### Google Search Console
- **Coverage:** See indexed vs excluded pages
- **Performance:** See ranking pages
- **URL Inspection:** Check individual pages

### Test URLs
- Sitemap: `https://punjipati.com/sitemap.xml`
- IndexNow API: `https://punjipati.com/api/indexnow`
- Robots.txt: `https://punjipati.com/robots.txt`

## 📊 Expected Timeline

- **IndexNow:** Instant (Bing, Yandex)
- **Google Discovery:** 1-7 days
- **Google Indexing:** 1-14 days  
- **Ranking:** 1-30+ days

## 🐛 Common Issues

### Pages Not Indexing?
1. Check GSC Coverage report
2. Ensure pages have internal links
3. Ensure content is >300 words
4. Fix any 404s or errors

### IndexNow Not Working?
1. Check `INDEXNOW_KEY` in `.env`
2. Verify key file exists: `public/{key}.txt`
3. Test API: `curl https://punjipati.com/api/indexnow`

## 📝 Checklist

- [ ] GSC property added & verified
- [ ] Sitemap submitted to GSC
- [ ] IndexNow key generated & added to `.env`
- [ ] IndexNow key file created
- [ ] Test sitemap: `https://punjipati.com/sitemap.xml`
- [ ] Monitor GSC Coverage report

---

**Full guide:** See `AUTOMATIC_INDEXING_SETUP.md`









