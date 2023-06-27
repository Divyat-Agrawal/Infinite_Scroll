const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalimage = 0;
let photosarray = [];
const count = 30;
const apikey = 'E7X1WraxlveRZvXeuZKlQy_p4Suyf0irIFl4yE9K9H8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

function imageLoaded(){
  console.log('image loaded');
  imagesLoaded++;

  if(imagesLoaded === totalimage){
    ready = true;
    loader.hidden = true
    console.log('ready = ',ready)
  }
}

function dislayphotos() {
  imagesLoaded = 0;
  totalimage = photosarray.length;
  console.log('total images = ',totalimage);
  photosarray.forEach((photo) => {
    //create<a> to link to unplash

    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //create <img> for photo

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    img.addEventListener('load',imageLoaded)
    // put <img> inside <a>, then put both inside image container element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photosarray = await response.json();
    dislayphotos();
  } catch (error) {}
}

window.addEventListener('scroll' , ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
      ready = false;
      getPhoto();
      console.log("load more")
    }

});
getPhoto();
