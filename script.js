const categoryContainer = document.getElementById("categoryContainer");
const treeContainer = document.getElementById("treeContainer");

let cart = [];

// showLoading
const showSpinner = (status) => {
  if (status) {
    document.getElementById("spiner").classList.remove("hidden");
    document
      .getElementById("spiner")
      .classList.add("flex", "justify-center", "items-center");
    categoryContainer.classList.add("hidden");
  } else {
    document.getElementById("spiner").classList.add("hidden");
    document
      .getElementById("spiner")
      .classList.remove("flex", "justify-center", "items-center");
    categoryContainer.classList.remove("hidden");
  }
};

// fetch all categories
const loadCategories = async () => {
  showSpinner(true);
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    displayCategories(data.categories);
    const btn1 = document.querySelector("#btn-1");
    btn1.classList.add("bg-green-700", "text-white");
    // showActiveBtn(data.categories);
  } catch (error) {
    console.log(error);
  }
};

// display all categories in category container
const displayCategories = (categories) => {
  categoryContainer.innerHTML = `<p class="bg-[#15803d40] hover:bg-[#15803d] hover:text-white font-semibold w-44  py-1 rounded-sm pl-3 cursor-pointer" id="btn-1">All Trees</p>
  `;
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
    
  <p class="bg-[#15803d40] hover:bg-[#15803d] hover:text-white font-semibold w-44 py-1 rounded-sm pl-3 tree"  id="${category.id}">${category.category_name}</p>`;
  });
  showSpinner(false);
};

categoryContainer.addEventListener("click", (e) => {
  if (e.target.id === "btn-1") {
    loadAllTreeBtn();
    const btn1 = document.querySelector("#btn-1");
    btn1.classList.add("bg-green-700", "text-white");
    const allBtns = document.querySelectorAll("#categoryContainer .tree");
    allBtns.forEach((btn) => {
      btn.classList.remove("bg-green-700", "text-white");
    });
  }
  if (e.target.classList.contains("tree")) {
    othersCategory(e);
    // console.log(e.target);
  }
});

const loadAllTreeBtn = async () => {
  try {
    const reg = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await reg.json();

    displayAllTree(data.plants);
  } catch (error) {
    console.log(error);
  }
};

const displayAllTree = (plants) => {
  treeContainer.innerHTML = "";
  plants.forEach((plant) => {
    // modalShow(plant);
    // console.log(plant);
    treeContainer.innerHTML += `
    
    <div id=${plant.id} class="space-y-3 rounded-lg p-3 h-fit bg-white">
              <img onclick="modalShow(${plant.id})" class="w-full h-72 object-cover rounded-t-lg" src="${plant.image}" alt="" />
              <h2 class="text-xl font-bold">${plant.name}</h2>
              <p>${plant.description}</p>
              <div class="flex justify-between items-center">
                <button class="btn">${plant.category}</button>
                <button class="btn">${plant.price}</button>
              </div>
              <button onclick="addToCart('${plant.id}','${plant.name}','${plant.price}')" class="bg-green-700 py-2 w-full rounded-2xl text-white cursor-pointer">
                Add to cart
              </button>
            </div>
    
    
    `;
  });
};

const modalShow = (id) => {
  const fetchDetails = async () => {
    try {
      const reg = await fetch(
        `https://openapi.programming-hero.com/api/plant/${id}`
      );
      const data = await reg.json();
      const plant = data.plants;

      document.getElementById("modalContainer").innerHTML = `
<img class="w-full object-cover rounded-t-lg" src="${plant.image}" alt="" />
<p class="my-2 text-xl font-bold">${plant.name}</p>
<p class="my-2">${plant.description}</p>
<p class="my-2 font-bold">Price : ${plant.price}</p>
<p class="my-2">${plant.category}</p>

`;
    } catch (error) {
      console.log(error);
    }
  };
  fetchDetails();
  myModal.showModal();
};

const othersCategory = (e) => {
  //   console.log(e.target.id);
  const allBtns = document.querySelectorAll("#categoryContainer .tree");
  allBtns.forEach((btn) => {
    btn.classList.remove("bg-green-700", "text-white");
    const btn1 = document.querySelector("#btn-1");
    btn1.classList.remove("bg-green-700", "text-white");
  });
  const id = e.target.id;
  document.getElementById(id).classList.add("bg-green-700", "text-white");

  fetchCategoryWiseTrees(id);
};

const fetchCategoryWiseTrees = async (id) => {
  //   console.log(id);
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${id}`
    );
    const data = await res.json();
    // console.log(data.plants);

    displayAllTree(data.plants);
  } catch (error) {
    console.log(error);
  }
};

const addToCart = (id, name, price) => {
  //   console.log(id, name, price);
  const exist = cart.some((item) => item.id == id);

  if (exist) return;
  else {
    cart.push({ id: id, name: name, price: price });
    //   console.log(cart);

    displayCart(cart);
  }
};

let displayCart = (cart) => {
  const cartContainer = document.getElementById("cartContainer");
  let sum = 0;
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    sum = sum + parseFloat(item.price);
    // console.log(sum);

    cartContainer.innerHTML += `

<div
              class="flex justify-between items-center mt-5 px-6 py-2 rounded-xl shadow-2xl bg-white"
            >
              <div>
                <p>${item.name}</p>
                <span class="mr-2" id="itemPrice">${item.price}</span>
               
              </div>
              <div class="text-red-600 cursor-pointer hover:font-semibold transition-all" id=${item.id}>delete</div>
            </div>

`;
  });
  document.getElementById("total").innerText = sum;
};

// showActiveBtn();
// const newarr = [];
document.getElementById("cartContainer").addEventListener("click", (e) => {
  if (e.target.innerText === "delete") {
    const id = e.target.id;

    const newArr = cart.filter((item) => item.id != id);

    cart = [...newArr];
    displayCart(cart);
  }
});

loadCategories();
loadAllTreeBtn();

document.getElementById("searchBtn").addEventListener("click", () => {
  const allBtns = document.querySelectorAll("#categoryContainer .tree");
  allBtns.forEach((btn) => {
    btn.classList.remove("bg-green-700", "text-white");
    const btn1 = document.querySelector("#btn-1");
    btn1.classList.remove("bg-green-700", "text-white");
  });
  const input = document.getElementById("searchInput");
  const text = input.value.trim().toLowerCase();

  const fetchAllWords = async () => {
    try {
      const reg = await fetch(
        `https://openapi.programming-hero.com/api/plants`
      );
      const data = await reg.json();

      const plants = data.plants;
      const newArr = plants.filter((item) =>
        item.name.toLowerCase().includes(text)
      );
      input.value = "";
      displayAllTree(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  fetchAllWords();
});
