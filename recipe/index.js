

let count = 0;
let inpt = document.querySelector(".inpt_con input");

let beg = document.querySelectorAll(".bag");

gsap.set(beg, { xPercent: 100});
gsap.set(beg[0], { xPercent: 0 });

function next()
{
    //the fist slide of the pack
    gsap.fromTo(beg[count], { xPercent: 0, zIndex: 0 }, { delay: 0.2, duration: 2, xPercent: 0, zIndex: -10 });
    // this increments the count variable 
    if(count < beg.length)
    {
        count = (count + 1) % beg.length;
    }
    gsap.fromTo(beg[count], { xPercent: 100, zIndex: 10 }, { duration: 2, xPercent: 0, zIndex: 0 });
}

setInterval(next, 3000);

////////////////////////////////////////////////////////            the recipe code    //////////////////////////////////////////////////

async function cook()
{
    try{
        let res = await fetch("https://api.api-ninjas.com/v1/recipe?query=italian wedding soup", {
                    headers: {
                        'X-Api-Key': 'coDfCEalUAEBtuYaOW89cg==xs7JdfTSsatHx0bd'
                    }
                })
        if(res.ok)
        {
            const data = res.json();
            console.log(data)
        }else{
            throw new Error("failed to get the recipe");
        }
    }
    catch(error)
    {
        console.error("error: ", error)
    }
}
let rec_con = document.querySelector(".rec_con");
function getRecipe()
{
    gsap.to(".inpt_con", { y: -260});
    gsap.to(".inpt_con input", {  x : -50});
    gsap.to(".inpt_con button", {  x : 200, y: -72})
    gsap.to(".cover", { backgroundColor: " rgba(25, 25, 26, 0.953)"})
    setTimeout(()=> { rec_con.style.display = "flex";
}, 400);
getImage();
}
   
//////////////////////////////////////////// displaying the data to the user ///////////////////////////////////////////
let imageDisplay = document.getElementById("imageDisplay");
function display(data)
{

}

////////////////////////////////////////  finding  the images for the recipes ////////////////////////////

function getImage()
{
    const accessKey = 'n6Ozn9HOlSzWZOYn0OB8ea1_FT38xqWFBsphJl1N42I';
const query = inpt.value;
const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

async function searchImages() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    imageDisplay.src = data.results[0].urls.regular;
    // Process the image data
    data.results.forEach(image => {
      console.log(image.urls.regular); // URL of the image
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function
searchImages();
}

