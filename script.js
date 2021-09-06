const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInicialLoad = true;

// Unsplash API
function getApiWithCount(count) {
  const apiKey = "-vsT4K5i9x_q4WdgZTelIB65wlEW8696xaND8X284Fg";
  return (api = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`);
}

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded += 1;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Helper add attributes to element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links and Photos and add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  isInicialLoad = false;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listner, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos
async function getPhotos() {
  try {
    const response = await fetch(
      isInicialLoad ? getApiWithCount(5) : getApiWithCount(10)
    );
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

//Check to see if scrolling near bottom of page to load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos();
  }
});

// On load
getPhotos();
