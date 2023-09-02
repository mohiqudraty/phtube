let default_id = 1000;

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
const setCategory = (data) => {
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="${category.category_id}" class="py-2 px-5 rounded text-[#252525B2] hover:text-black bg-[#25252526]" onclick="handleVideo('${category.category_id}')">${category.category}</button>
    `;
    tabContainer.appendChild(div);
  });
};

// set all video cards with required information &&&&& and call isNoData/ not found function
const handleVideo = async (categoryId = 1000, sortByViews = "") => {
  default_id = categoryId;

  const tabContainer = document.getElementById("tab-container");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();

  let viewsData = data.data;
  if (sortByViews) {
    viewsData.sort((a, b) => {
      return (
        parseInt(b.others.views.replace("K", "")) -
        parseInt(a.others.views.replace("K", ""))
      );
    });
  }

  const items = tabContainer.children;
  for (let item of items) {
    const button = item.children[0];
    if (button.getAttribute("id") == default_id) {
      button.classList.add("bg-rose-600");
      button.classList.add("text-gray-50");
    } else {
      button.classList.remove("bg-rose-600");
      button.classList.remove("text-gray-50");
    }
  }
  isThereData(data);

  // setPostTime(data, categoryId);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((video) => {
    const time = Math.floor(video.others.posted_date);
    // let time = 2629440;
    let extraSec = time % 60;

    let min = time - extraSec;
    min = min / 60;

    let extraMin = min % 60;

    let hours = min - extraMin;
    hours = hours / 60;

    let extraHours = hours % 60;

    let days = hours - extraHours;
    days = days / 24;

    let extraDays = days % 30;

    let months = days - extraDays;
    months = months / 30;

    let extraMonths = months % 12;

    let years = months - extraMonths;
    years = years / 12;
    // console.log(years);

    const blueBadge = video.authors[0].verified
      ? '<img src="./image/badge.svg" />'
      : "";
    const div = document.createElement("div");
    div.innerHTML = ` <div class="card bg-base-100 shadow-xl">
<figure class="relative">
  <img
   class="w-[312px] h-[200px] object-cover" src="${video.thumbnail}"
  />
  <p class="text-xs text-white absolute right-3 bottom-4 bg-[#171717] py-1 px-1 ">${
    years ? `${years}years ago` : extraMonths ? `${extraMonths} Months ago` : ""
  }
  ${!years && days ? `${days} Days ago` : ""}
  ${!years && extraHours > 0 ? `${extraHours} Hours` : ""}
  ${!years && extraMin > 0 ? `${extraMin} Min ago` : ""}
  </p>
</figure>
<div class="p-4">
<div class="flex gap-3">
<img class="w-10 h-10 rounded-full"  src="${
      video.authors[0].profile_picture
    }" />
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
const isThereData = (id) => {
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
};

const homePage = () => {
  getApi();
  handleVideo();
};

// button click to go blog page.
const readBlog = () => {
  // console.log("hello");
  window.location.href = "http://127.0.0.1:5500/blog.html";
};

const sortByViews = () => {
  handleVideo(default_id, default_id);
};

// call function which element i want to show default in home page

homePage();
