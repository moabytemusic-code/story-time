import { BLOG_POSTS } from '@/data/blog-posts';

export default function sitemap() {
    const baseUrl = 'https://storytimewithmserica.com'; // Replace with actual domain

    // Static pages
    const routes = [
        '',
        '/stories',
        '/membership',
        '/parents',
        '/fun-zone',
        '/sample-pack',
        '/about',
        '/contact',
        '/faq',
        '/shop',
        '/login',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Blog Posts
    const blogRoutes = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/parents/${post.id}`,
        lastModified: new Date(post.date), // Or current date
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic Stories (Assuming we had a fetch for stories, but we'll manually add the base dynamic route logic if needed)
    // For now, stories don't have individual SEO pages in our current mock setup as effectively as blogs, 
    // but if /stories/[id] exists we should map them eventually.

    return [...routes, ...blogRoutes];
}
