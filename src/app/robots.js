export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/admin/', '/api/'],
        },
        sitemap: 'https://storytimewithmserica.com/sitemap.xml', // Replace with real domain
    }
}
