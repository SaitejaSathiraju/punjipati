# Punjipati Finance - Finance Content Platform

A modern finance-focused content platform built with Next.js, Markdown, and TypeScript. Punjipati Finance allows you to publish finance-related articles, market analysis, investment guides, and financial insights.

## Features

- 📝 **Markdown-Based Content**: Write and publish articles using simple Markdown files
- 🚀 **Static Site Generation**: Fast, SEO-friendly static pages with Next.js
- 💰 **Finance-Focused**: Designed specifically for finance content and analysis
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🌓 **Dark Mode**: Built-in theme switcher for light and dark modes
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized for speed and user experience

## How to Publish Content

Publishing content on Punjipati Finance is simple:

1. **Create a Markdown file** in the `_posts` directory
2. **Add front matter** at the top of your file with metadata:
   ```markdown
   ---
   title: "Your Article Title"
   excerpt: "A brief description of your article"
   coverImage: "/assets/blog/your-post/cover.jpg"
   date: "2024-01-20T10:00:00.000Z"
   author:
     name: Author Name
     picture: "/assets/blog/authors/author.jpg"
   ogImage:
     url: "/assets/blog/your-post/cover.jpg"
   ---
   
   Your article content in Markdown...
   ```
3. **Save the file** - The site will automatically rebuild and your content will be live!

### Content Guidelines

- Use clear, descriptive titles
- Write engaging excerpts (150-200 characters recommended)
- Add relevant cover images to the `public/assets/blog/` directory
- Use proper Markdown formatting for readability
- Include relevant finance topics: investments, market analysis, personal finance, etc.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your site.

### Building for Production

Build the production-ready site:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
punjipati/
├── _posts/              # Your Markdown blog posts go here
├── public/              # Static assets (images, favicons)
│   └── assets/
│       └── blog/        # Blog post images
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── _components/ # React components
│   │   ├── posts/       # Dynamic post pages
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── interfaces/      # TypeScript interfaces
│   └── lib/             # Utility functions
│       ├── api.ts       # Post fetching logic
│       └── markdownToHtml.ts  # Markdown processing
├── package.json
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Content Management

### Adding New Posts

1. Create a new `.md` file in `_posts/`
2. Use the front matter format shown above
3. Write your content in Markdown
4. Add any images to `public/assets/blog/your-post-name/`
5. Save and the site will automatically update

### Post Metadata

- **title**: The article title (required)
- **excerpt**: Brief description shown in previews (required)
- **coverImage**: Path to cover image (optional but recommended)
- **date**: Publication date in ISO format (required)
- **author**: Author information with name and picture (required)
- **ogImage**: Open Graph image for social sharing (optional)

## Customization

### Branding

Update the site name and branding in:
- `src/lib/constants.ts` - Site constants
- `src/app/layout.tsx` - Metadata and SEO
- `src/app/_components/header.tsx` - Header component
- `src/app/_components/intro.tsx` - Homepage intro
- `src/app/_components/footer.tsx` - Footer component

### Styling

The site uses Tailwind CSS. Customize colors, fonts, and styles in:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically deploy your site

### Other Platforms

This Next.js app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any Node.js hosting service

## Technologies Used

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Markdown** - Content format
- **remark** - Markdown processing
- **gray-matter** - Front matter parsing

## Contributing

To contribute content:

1. Create a new Markdown file in `_posts/`
2. Follow the content guidelines
3. Ensure proper formatting and metadata
4. Test locally before publishing

## License

This project is open source and available for use.

## Support

For issues or questions about the platform, please refer to the Next.js documentation or create an issue in the repository.

---

**Punjipati Finance** - Empowering financial decisions through quality content.
