export default function manifest() {
    return {
        name: 'Story Time with Ms. Erica',
        short_name: 'Story Time',
        description: 'Magical audio stories for little learners.',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFF5F9',
        theme_color: '#EC4899',
        orientation: 'portrait-primary',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
