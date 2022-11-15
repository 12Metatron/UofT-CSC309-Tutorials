
$(document).ready(function() {
  // all custom jQuery will go here and are executed once the page is ready
  console.log("jQuery is ready!");

  // The "displayItem" function takes the following arguments and prepare
  // an HTML structure to represent a news item in a user-friendly style
  function displayItem(
    itemId, itemTitle, itemUpdateDate,
    itemNewsSite, itemUrl, itemImageUrl, itemSummary){
      // Arguments:
      //    1. itemId
      //    2. itemTitle
      //    3. itemUpdateDate,
      //    4. itemNewsSite
      //    5. itemUrl
      //    6. itemImageUrl
      //    7. itemSummary

      // TODO: Construct and return a <div> block that represent "flex-item" like a
      // sample in the main.html using all given arguments.
      var div = document.createElement('div');
      div.setAttribute('class', 'flex-item item-description');
      div.setAttribute('id', itemId);
      div.innerHTML = `
        <img src=${itemImageUrl}>
        <div class="item-title">
          <a href=${itemUrl} target="_blank">
            ${itemTitle}
          </a>
        </div>
        <div class="source">From: ${itemNewsSite}</div>
        <div class="item-update-at">
          <span class="badge badge-info">${itemUpdateDate}</span>
        </div>
        <div class="item-summary">
          ${itemSummary}
        </div>
        `;
      document.getElementbyID('container-flex').appendChild(div);
      console.log(div);
      return div;
  }
  // <div id="container-flex" class="container-flex">
  //   <div id="p-873" class="flex-item item-description">
  //     <img src="https://planetary.s3.amazonaws.com/web/assets/pictures/_768x768_crop_center-center_82_line/612692/neptune-rings.jpg">
  //     <div class="item-title">
  //       <a href="https://www.planetary.org/space-missions/best-jwst-pictures" target="_blank">
  //         The best space pictures from JWST
  //       </a>
  //     </div>
  //     <div class="source">From: Planetary Society</div>
  //     <div class="item-update-at">
  //       <span class="badge badge-info">2022-10-04</span>
  //     </div>
  //     <div class="item-summary">
  //       The observatory is continuing to deliver a steady stream of beautiful cosmic images.
  //     </div>
  //   </div>
  //
  // </div>

  // This function retrieve information using Ajax. Upon a successful call, it calls
  // "displayItem" functions and provides appropriate data as arguments, then
  // it populates the page using the return value of the "displayItem" function.
  function loadItems(itemNumber, pageSize){
    // itemNumber: is the start number for the items. If it is set to "10" it
    //    asks items starting from the 10th item.
    // pageSize: is the number of items you would like to display when
    //    user clicks on the "Load More!" button

    let requestUrl = "https://api.spaceflightnewsapi.net/v3/blogs?_limit="+pageSize+"&_start="+itemNumber;

    /* TODO:
        1. Write Ajax to retrieve product information.
        2. Then iterate through the list of items that are returned and call
          the "displayItem" function with appropriate information.
        3. Make sure you are hiding the "#alert-box" entity. Since we were able
          to get the data and there isn't any error to show to the user.
        4. Use the returned value of "displayItem" function and put it into the
          right place on the page
        5. If the call to the API fails, put an appropriate message into the
          "#alert-box" entity and make it visible.
    */
    // Arguments:
    //    1. itemId
    //    2. itemTitle
    //    3. itemUpdateDate,
    //    4. itemNewsSite
    //    5. itemUrl
    //    6. itemImageUrl
    //    7. itemSummary
    console.log("requesting url:", requestUrl);
    $.ajax({
      url : requestUrl,
      method : "GET",
      dataType : "json"
    }).then(function(respJson){
      console.log("First function in the chain!");
      console.log(respJson);
    }).fail(function(reason){
      console.log("error in processing the request", reason);
    }).done(function(respJson){
      console.log("We are done, the call was successful");
    }).always(function(respJson){
      console.log("The call was completed.");
    });
  }


  /* TODO:
      1. Make sure when you click on "Load more!" button, it loads 5 more items.
      2. Make sure scroll bar does not jump to the top of the page! Take a look at built-in "preventDefault" function.
      3. Change the default text of the button from "Load some news" to "Load More!".
      4. Call "loadItems" function with appropriate arguments. What would be a correct value for "itemNumber" argument?
      */
  const load_button = document.getElementById('load-more');
  //console.log(load_button);
  load_button.onclick = function() {
    console.log("test");
    let items1 = document.querySelectorAll('div.flex-item');
    console.log("the items are", items1);
    loadItems(items1.length -1, 5);
  }

});




// Week 3 materials

const items = document.getElementsByClassName("flex-item");

let min_img_height = Infinity;
for(let item of items){
  var item_img = item.querySelector("img")
  item_img.height < min_img_height ? min_img_height = item_img.height : min_img_height = min_img_height
}


const adjust_btn = document.getElementById("adjust-btn");
adjust_btn.onclick = function(){
  console.log(min_img_height);
  for(let item of items){
    var item_img = item.querySelector("img");
    item_img.style.height = min_img_height + "px";
    item_img.style["margin-bottom"] = "1.0rem";
  }
};


for(let item of items){
  let colors = ['red', 'blue', 'cyan', 'green', 'orange', 'brown', 'purple'];
  item.addEventListener("mouseenter", (event) => {
      color_index = Math.floor(Math.random() * colors.length);
      event.target.style.border = "0.1rem solid " + colors[color_index];
      let list_item = event.target.querySelector("ul li");
      list_item.style["color"] = colors[color_index];
      list_item.style["font-weight"] = "bold";
    }, false);

  item.addEventListener("mouseleave", (event) => {
    let list_item = event.target.querySelector("ul li");
    list_item.style["font-weight"] = "normal";
    list_item.style["color"] = "black";
    event.target.style.border = "0.1rem solid gray";
  }, false);
}
