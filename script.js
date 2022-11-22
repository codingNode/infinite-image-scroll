import UNSPLASH_API_KEY from './apiKey.js'

let ready=false;
let imagesLoaded =0;
let totalEntries = 0;

function setAttributes(element, attributes)
{
    for (const key in attributes)
    {
        element.setAttribute(key, attributes[key])
    }
}

function imgLoaded()
{
    const loader = document.getElementById('loader')
    console.log('total ', totalEntries)
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalEntries)
    {
        ready = true;
        loader.hidden = true;
        console.log('ready=',ready)
    }
    else
    {
        ready = false;
    }
    
}

function displayPhotos(arr)
{
    imagesLoaded = 0;
    totalEntries = arr.length;
    
    const imgContainer = document.getElementById('image-container')
    arr.forEach((photo) => {
        //creating <a>
        let item = document.createElement('a')
     
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        })

        //creating <img/>

        let img = document.createElement('img')

        setAttributes(img, {
            src: photo.urls.regular,
            title: photo.description,
            alt: photo.description
        })
        
        img.addEventListener('load',imgLoaded)

        item.appendChild(img)
        imgContainer.appendChild(item)
    });
}
async function getPhoto()
{
    const count= 20;
    let key=UNSPLASH_API_KEY;
    const Url= `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;
    try
    {
        const response = await fetch(Url)
        const photos = await response.json()
        console.log(photos)
        displayPhotos(photos)
    }
    catch(err)
    {
        console.log(err)
    }
}

window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight-600 && ready)
    { 
        getPhoto()
        console.log('load more')
    }
})

getPhoto()