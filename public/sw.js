if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let i={};const t=e=>a(e,r),d={module:{uri:r},exports:i,require:t};s[r]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(c(...e),i)))}}define(["./workbox-2e6be583"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d1a085f31fb2cf3a6155e3be6659c215"},{url:"/_next/static/I7dTh6w4qsZrx0JdZ6KVL/_buildManifest.js",revision:"f6a26e99491ea6980fb9b063c1e38178"},{url:"/_next/static/I7dTh6w4qsZrx0JdZ6KVL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/576-ea304d2668d02eae.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/58b651db-6b43a8ca683004ef.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/891-10351b157b2aee4a.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/963-b1e79381f5f0da90.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/app/_not-found-c3070d377c1c1a75.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/app/layout-022ab9f2c2fa56f7.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/app/page-c7d3b203f9787bf0.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/app/posts/delete/%5Bid%5D/page-247a31a47f21ad6b.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/app/posts/edit/%5Bid%5D/page-b27e087491103669.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/app/posts/new/page-085d3abaf2ab8aa3.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/app/posts/revalidate/page-f19056e3188148c0.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/main-app-fe129eab96894078.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/main-dc49fceeba6ee980.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/pages/_app-0a1f15402f8b18c2.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/pages/_error-8cae7343ea415eb5.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d65c00d7235ac364.js",revision:"I7dTh6w4qsZrx0JdZ6KVL"},{url:"/_next/static/css/d0e01f2e89d23fe1.css",revision:"d0e01f2e89d23fe1"},{url:"/characters/anakin-skywalker.png",revision:"d88a81935f294832e1ad248ea113ad49"},{url:"/characters/aragorn.png",revision:"9b24dc4b9664583d40ca03f4afccfae9"},{url:"/characters/bilbo-baggins.png",revision:"bb735152409272a99ae046e4aca05621"},{url:"/characters/captain-jack-sparrow.png",revision:"703ad0f04275ad5e72ffaeb02d3a9ecf"},{url:"/characters/darth-vader.png",revision:"63cea82e11e60fad77d21ed0d2fef684"},{url:"/characters/frodo-baggins.png",revision:"49d681dbc9fe349158a40a2bb46ab592"},{url:"/characters/geralt-of-rivia.png",revision:"442bc2a0c8cef39fa7ea0967c67e4c41"},{url:"/characters/gollum.png",revision:"cf51bf5986492a43582f66922467924c"},{url:"/characters/indiana-jones.png",revision:"8d08c4fa87992ee337e0ed77c8b02dc8"},{url:"/characters/jack-sparrow-2.png",revision:"703ad0f04275ad5e72ffaeb02d3a9ecf"},{url:"/characters/jack-sparrow-3.png",revision:"703ad0f04275ad5e72ffaeb02d3a9ecf"},{url:"/characters/jar-jar.png",revision:"7c562920848a6327a2c703d97961dc41"},{url:"/characters/little-anakin.png",revision:"14262fbecf989d883d1a357a485f0656"},{url:"/characters/luna-lovegood.png",revision:"d53724497456c8c471122da3b2bdebf7"},{url:"/characters/morton.png",revision:"5412541f08e6379f445b24e2e2b28b51"},{url:"/characters/newt-scamander.png",revision:"66ef6da447c5f1575ffefa1cf1e64b39"},{url:"/characters/niffler.png",revision:"a5e49af25e242c34cc1da319bb82030d"},{url:"/characters/obi-wan-kenobi.png",revision:"52aa3bc3ad8287d799469c34a085a1f6"},{url:"/characters/samwise-gamgee.png",revision:"3578226fe9cb9299598dcacf4140f597"},{url:"/characters/sherry.png",revision:"c5b079c420f33041d4593ffdd4daa386"},{url:"/characters/towns-guard.png",revision:"41e5a821ae65d3ae4078f5d9baf7eda7"},{url:"/characters/yoda.png",revision:"8a42468735755b76eb3422a0f81dee73"},{url:"/fonts/RINGM___.TTF",revision:"bec1dc061960782df16e73f9881c9829"},{url:"/icon-192x192.png",revision:"38971bbce9aa98e4a93f6223d575c060"},{url:"/icon-256x256.png",revision:"37bb0fbacc1a0e26c055781c7f497346"},{url:"/icon-512x512.png",revision:"91ccfae2e3cd0a9ac05aace91a1c91e4"},{url:"/icons/scroll.svg",revision:"fc3752d5e0f9c178e49e06a57c007800"},{url:"/icons/sparkles.svg",revision:"878a09db96a0eb00a24dbe49f223d43f"},{url:"/manifest.json",revision:"40bbb90c8009eff7afc8b325716bcdbe"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));