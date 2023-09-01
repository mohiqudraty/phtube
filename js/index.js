// const getApi = () => {
//   fetch("https://openapi.programming-hero.com/api/videos/categories")
//     .then((Response) => Response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err));
// };

// get all categories api here
const getApi = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  //   console.log(data.data);
  setCategory(data);
};

// set category with dynamic id here &&&&& handleVideo() call here on button click
const tabContainer = document.getElementById("tab-container");
const setCategory = (data) => {
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="py-2 px-5 rounded text-[#252525B2] hover:text-black bg-[#25252526]" onclick="handleVideo('${category.category_id}')">${category.category}</button>
    `;
    tabContainer.appendChild(div);
  });
};

// set all video cards with required information &&&&& and call isNoData/ not found function
const handleVideo = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  isNoData(data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((video) => {
    const blueBadge = video.authors[0].verified
      ? '<img src="./image/badge.svg" />'
      : "";
    const div = document.createElement("div");
    div.innerHTML = ` <div class="card bg-base-100 shadow-xl">
<figure class="relative">
  <img
   class="w-[312px] h-[200px] object-cover" src="${video.thumbnail}"
  />
  <p class="text-xs text-white absolute right-3 bottom-4 bg-[#171717] py-1 px-1 ">${video.others.posted_date}</p>
</figure>
<div class="p-4">
<div class="flex gap-3">
<img class="w-10 h-10 rounded-full"  src="${video.authors[0].profile_picture}" />
<h2 class="text-base font-bold">${video.title}</h2>
</div>

<div class="pl-[50px]" > 
<div class="card-actions my-2">
<div class="text-sm text-[#252525B2] ">${video.authors[0].profile_name}</div>
${blueBadge}
</div>
<p class="text-sm text-[#252525B2] ">${video.others.views} views</p>
</div>
</div>`;
    cardContainer.appendChild(div);
    // console.log(video.others.posted_date);
  });
};

// if no have elements than show not found
const isNoData = (id) => {
  const notFoundContainer = document.getElementById("not-found-container");
  notFoundContainer.innerHTML = "";

  const status =
    id.status === false
      ? `
      <img class="mx-auto" src="./image/Icon.png" alt="" />
      <h3 class="text-3xl font-bold mt-8">
        Oops!! Sorry, There is no <br />
        content here
      </h3>
  `
      : "";
  const div = document.createElement("div");
  div.innerHTML = `${status}`;
  notFoundContainer.appendChild(div);

  // console.log(status);
};

const homePage = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  const data = await response.json();
  handleVideo(1000);
};

// button click to go blog page.
const readBlog = () => {
  // console.log("hello");
  window.location.href = "http://127.0.0.1:5500/blog.html";
};

// call function which element i want to show default in home page
homePage();

getApi();

// const test = async () => {
//   const response = await fetch(
//     `https://openapi.programming-hero.com/api/videos/category/1005`
//   );
//   const data = await response.json();
//   console.log(data.data.status ? "goood" : "notfound");
// };
// test();
