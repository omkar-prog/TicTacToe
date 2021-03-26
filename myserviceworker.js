self.addEventListener('install', e => {
    console.log('Install !')
    e.waitUntil(
        caches.open('static').then(cache => {
            return cache.addAll([
                'index.html',
                'style.css',
                'logo1.png',
                'logo2.png',
                'script.js',
                'lose.mp3',
                'win.mp3'
            ])
        })
    )
})
self.addEventListener('fetch', e => {
    console.log(`Intercepting fetch request from ${e.request.url}`)
})