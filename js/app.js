
ScrollReveal().reveal('.main', { delay: 400 });
ScrollReveal().reveal('.address', { delay: 500 });
ScrollReveal().reveal('.card', { delay: 200 });

const filterTag = ""; 
dataFilter("*")
function dataFilter(c) {
  var x, i;
  x = document.getElementsByClassName(filterTag);
  if (c == "*") c = "";
  for (i = 0; i < x.length; i++) {
    removeItem(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addItem(x[i], "show");
  }
}

function addItem(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function removeItem(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}
