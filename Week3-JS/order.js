
/* TODO: We have a hidden information box, just before the submit button on
    the order.html page and we want to show the total costs of the items a user selects.
    Select the <div> block with "info-msg" class:
*/
let info_box = document.querySelector("div.info-msg");
console.log(info_box);

/*  querySelector("flex-item"),
  querySelectorAll("flex-item"),
  getElementsbyClassName("flex-item"),
  getElementById("flex-item") */

/* TODO: Select all <input> elements withing the <div> block that has the class "item-selection"
*/
const item_checkboxes = document.querySelectorAll("#item-selection input");
console.log(item_checkboxes);

/* TODO: We want to show a message like: "hey USER! The total cost is: $80." in the
    info_box element when a user selects some items. You need to calculate the total
    cost based on the user's selections. Replace the USER in the message above with
    the name that the user has entered in the Name input field. If there is nothing
    entered, change it to a blank (i.e. "")
*/

let total_price = 0
var user = "";
// added message myself
let message = "hey " + user + "! The total cost is: $" + total_price + ".";
// You need to iterate through all checkboxes
for (let this_checkbox of item_checkboxes){
  /* Define an event listener for each checkbox (when a user selects an item or
    deselects it, the message should be updated with the new total cost). Steps:
      1. Define the event listener for each checkbox
      2. Set the display style of info-msg block to "block" (the display property
          is set to none when the page loads)
      3. Find the cost of the selected item
      4. Convert the cost to an integer and update the total costs
      5. Find the name of the user entered in the name input field
      6. Update the message in the info-msg block with the updated total cost and
          user's name. Something like: "hey USER! The total cost is: $80."
    */
  this_checkbox.onclick = function(){
    //total_price += this_checkbox.cost
    console.log(this_checkbox);
    info_box.style["display"] = "block";
    let box_name = this_checkbox.id;
    var price = document.querySelector("label[for='"+box_name+ "'] span[class='price']");
    console.log(price);
    price = price.textContent;
    console.log(price);
    user = document.getElementById("name").value;
    if (this_checkbox.checked) {
      total_price += parseFloat(price.slice(1));
    } else {
      total_price -= parseFloat(price.slice(1));
    }
    message = "hey " + user + "! The total cost is: $" + total_price + ".";
    info_box.textContent = message;
    console.log(message);
  }


}
