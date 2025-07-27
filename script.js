let menuItems = [];

async function getMenu(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

function takeOrder(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shuffled = data.sort(()=> 0.5 - Math.random());
      let order = shuffled.slice(0,3);
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // let status =
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  return new Promise((resolve, reject) => {
    resolve({ paid: true });
  });
}

function createCard(item) {
  return `<div class="card">
              <div class="card-img-div">
              <img src="${item.imgSrc}" alt="item img">
            </div>
              <div class="card-body">
              <div class="card-text">
                <p class="item-name">${item.name}</p>
                <p class="item-price">$${item.price}</p>
              </div>            
              <div class="add-symbol">+</div>
            </div>
          </div>`;
}

// Example usage:
getMenu("./data.json").then((data) => {
  menuItems = data;
  console.log("menuitems: ", menuItems);
  const container = document.getElementById("menu-card-section");
  // for(item of data){
  //   console.log(item);
  //   container.innerHTML += createCard(item);
  // }
  container.innerHTML += menuItems.map(createCard).join("");

  takeOrder(menuItems)
    .then((data) => {
      console.log("Your Order",data);
      return orderPrep();
    })
    .then((data) => {
      console.log("Order Preparation status: ",data);
      return payOrder(data);
    })
    .then((data) => {
      console.log("Payment Status: ",data);
      return thankyouFnc();
    })
    .then(() => {
      alert("Thank you for eating with us")
      // console.log(data);
      return;
    });
});

