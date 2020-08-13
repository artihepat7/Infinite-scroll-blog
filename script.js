//https://jsonplaceholder.typicode.com/posts?_limit=5&_page=2
const blogContainer = document.getElementById("blog-container");
const filter = document.getElementById("filter");
const loading = document.querySelector(".loader");

const limit = 5;
let page = 1;

//fetch data from API

async function getData() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();
  return data;
}

//rendering

async function renderingPost() {
  const data = await getData();
  //console.log(data);
  data.forEach((blog) => {
    const post = document.createElement("div");
    post.classList.add("blog");
    post.innerHTML = `
    <div class="number">${blog.id}</div>
          <div class="blog-info">
            <h2 class="blog-title">${blog.title}</h2>
            <p class="blog-body">
              ${blog.body}
            </p>
          </div>`;

    blogContainer.appendChild(post);
  });
}
renderingPost();

function filterBlog(event) {
  const text = event.target.value.toUpperCase();
  const allBlogs = blogContainer.querySelectorAll(".blog");

  allBlogs.forEach((blog) => {
    const title = blog.querySelector(".blog-title").innerText.toUpperCase();
    const body = blog.querySelector(".blog-body").innerText.toUpperCase();
    if (title.indexOf(text) > -1 || body.indexOf(text) > -1) {
      blog.style.display = "flex";
    } else {
      blog.style.display = "none";
    }
  });
}

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      renderingPost();
    }, 300);
  }, 1000);
}

//EVENT listener

window.addEventListener("scroll", () => {
  console.log(document.documentElement.scrollTop); //top to wherer we are scrolling at
  console.log(document.documentElement.scrollHeight); //height of document
  console.log(document.documentElement.clientHeight); //visible height

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterBlog);
