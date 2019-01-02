

const CACHE_STATIC    = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const CACHE_DYNAMIC   = 'dynamic-v1';


self.addEventListener('install', e=>{
    
    caches.open( CACHE_STATIC ).then(cache=>{
        
        const resStatic = cache.addAll([
               // '/',
                'index.html',
                'css/style.css',
                'img/avatars/spiderman.jpg',
                'img/avatars/ironman.jpg',
                'img/avatars/wolverine.jpg',
                'img/avatars/thor.jpg',
                'img/avatars/hulk.jpg',
                'js/app.js'
                ]);
        
    });
    
    caches.open(CACHE_INMUTABLE).then(cache=>{
        
        const resInmutable = cache.addAll([
            'https://fonts.googleapis.com/css?family=Quicksand:300,400',
            'https://fonts.googleapis.com/css?family=Lato:400,300',
            'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
            'css/animate.css',
            'js/libs/jquery.js'

        ]);
        
    });
    
    e.waitUntil(Promise.all([resStatic,resInmutable]));
    
});


  self.addEventListener('fetch', e=>{
    
    
    const respuesta = caches.match(e.request).then(res=>{
        
        if(res){
            
            return res;
            
        }else{
            
            return fetch(e.request).then(newRes=>{
                
                caches.open(CACHE_DYNAMIC).then(cache=>{
                    cache.put(e.request,newRes );
                });
                
                
                
            });
            
        }
        
    });
    
    
    
    e.respondWith(respuesta);
    
});



