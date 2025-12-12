const categoryContainer = document.getElementById("categoryContainer");
const treeContainer = document.getElementById("treeContainer");

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

    showActiveBtn(data.categories);
  } catch (error) {
    console.log(error);
  }
};
// display all categories in category container
const displayCategories = (categories) => {
  categoryContainer.innerHTML = `<p class="bg-[#15803d40] hover:bg-[#15803d] hover:text-white font-semibold w-44  py-1 rounded-sm pl-3" id="btn-1">All Trees</p>
  `;
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
    
  <p class="bg-[#15803d40] hover:bg-[#15803d] hover:text-white font-semibold w-44 py-1 rounded-sm pl-3 tree"  id="btn-${
    category.id + 1
  }">${category.category_name}</p>`;
  });
  showSpinner(false);
};

categoryContainer.addEventListener("click", (e) => {
  if (e.target.id === "btn-1") {
    loadAllTreeBtn();
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
    console.log(plant);
    treeContainer.innerHTML += `
    
    <div class="space-y-3 rounded-lg p-3 bg-white">
              <img class="w-full h-72 object-cover rounded-t-lg" src="${plant.image}" alt="" />
              <h2 class="text-xl font-bold">${plant.name}</h2>
              <p>${plant.description}</p>
              <div class="flex justify-between items-center">
                <button class="btn">${plant.category}</button>
                <button class="btn">${plant.price}</button>
              </div>
              <button class="bg-green-700 py-2 w-full rounded-2xl text-white">
                Add to cart
              </button>
            </div>
    
    
    `;
  });
};

loadCategories();
loadAllTreeBtn();
