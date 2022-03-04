const DOG_URL_RAND = "https://dog.ceo/api/breeds/image/random";
const DOG_URL_BREED_LIST = "https://dog.ceo/api/breeds/list/all";

const dogImg = document.querySelector("#dog-img");
const select = document.querySelector("#select-breed");
const button = document.querySelector("#button");
const loader = document.querySelector("#loader");

async function initialData() {
  const firstImg = await fetch(DOG_URL_RAND);
  const firstImgJson = await firstImg.json();

  dogImg.src = firstImgJson.message;

  setTimeout(function() {
    loader.style.display = "none";
    dogImg.style.display = "block";
  }, 800);

  const breedList = await fetch(DOG_URL_BREED_LIST);
  const breedListJson = await breedList.json();
  const breedListArray = Object.keys(breedListJson.message);

  for (let i = 0; i < breedListArray.length; i++) {
    const element = breedListArray[i];
    const option = document.createElement("option");

    option.textContent = element;
    option.value = element;
    
    select.appendChild(option);
  }
}

initialData();

async function getMyDog() {
  console.log(select.value);
  const res = await fetch("https://dog.ceo/api/breed/" + select.value + "/images/random");
  const resJson = await res.json();

  dogImg.style.display = "none";
  loader.style.display = "block";
  dogImg.src = resJson.message;

  setTimeout(function() {
    loader.style.display = "none";
    dogImg.style.display = "block";
  }, 200);

}

// async function getDoggo(event) {
//   const res = await fetch("https://dog.ceo/api/breeds/image/random");
//   const resJson = await res.json();
//   document.getElementById("doggo").src = resJson.message;
// }

select.addEventListener('change', getMyDog);
