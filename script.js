const imageContainer=document.getElementById('image-container');
const photoArray=[];
const count=10;

const apiKey="xHlQ-LN_dVMK9-VLtlA5oAdDk60xzJQxf2XgkthyK38";
const apiURL=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


//Functino to set the element attr
function setAttribute(element,attribute){
  //looping through the oject and creating element
  for(let key in attribute){
      element.setAttribute(key,attribute[key]);
  }
}

function displayPhotos(photoArray){
//for in loop looping each photos in the array and then displaying them
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
     
      image.appendChild(img);
      imageContainer.appendChild(image);
    })
}

const getPhotos = async ()=>{
  try{
      const response= await fetch(apiURL);
      const photoArray=await response.json();
       displayPhotos(photoArray);
       console.log(photoArray);
  }catch{
      alert("Error during fetching data");
  }
}

getPhotos(); 