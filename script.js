const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
const photoArray=[];
const count=30;

const apiKey="xHlQ-LN_dVMK9-VLtlA5oAdDk60xzJQxf2XgkthyK38";
const apiURL=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
  imagesLoaded++;
 console.log(imagesLoaded);
  if(imagesLoaded===totalImages){
       ready=true;
       
  }
}


//Functino to set the element attr
function setAttribute(element,attribute){
  //looping through the oject and creating element
  for(let key in attribute){
      element.setAttribute(key,attribute[key]);
  }
}

function displayPhotos(photoArray){
    imagesLoaded=0;
    totalImages=photoArray.length;

//for  in loop looping each photos in the array and then displaying them
    photoArray.forEach((photo)=>{
      //creating a image container hyperlink <a>
      const image=document.createElement('a');
      setAttribute(image,{
        href:photo.links.html,
        target:'_blank'
      });
       
      //**********DRY PRINCIPLE**********/
      // image.setAttribute('href',photo.links.html);
      // image.setAttribute('target','_blank');

      const img=document.createElement('img');
      setAttribute(img,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.description
       });
      // img.setAttribute('src',photo.urls.regular);
      // img.setAttribute('alt',photo.alt_description);
      // img.setAttribute('title',photo.description);
     
      //checking if our photos has loaded or not
        img.addEventListener('load',imageLoaded);
      
      image.appendChild(img);
      imageContainer.appendChild(image);
    })
}

const getPhotos = async ()=>{
  try{
      const response= await fetch(apiURL);
      const photoArray=await response.json();
       displayPhotos(photoArray);
  }catch{
      alert("Error during fetching data");
  }
}

// EventListener for scrolling
window.addEventListener('scroll',()=>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
   ready=false;
   getPhotos(); 
   console.log("load more");
}
});

getPhotos(); 