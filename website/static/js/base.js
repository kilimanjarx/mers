function sidebar() {
  $("#basenavi").sidebar("toggle");
}

function achievement(a,b){
  return a.map((x,index) => { return (b[index]/x * 100).toFixed(2)})
}

function toggleShow(id) {
  var element = document.getElementById(id);
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

function hide(id) {
  let element = document.querySelector(id);
  element.style.display = "none";
}

function hideClass(obj) {
  let elements = document.getElementsByClassName(obj);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}

function showClass(obj) {
  let elements = document.getElementsByClassName(obj);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "inline-block";
  }
}

function show(id) {
  let element = document.querySelector(id);
  element.style.display = "inline";
}

function buttonActive(elem, color) {
  document.getElementById(elem).addEventListener("click", event => {
    let target = event.target;
    let parentNode = target.parentNode;
    let c = parentNode.getElementsByTagName("button");
    for (let i = 0; i < c.length; i++) {
      if (c[i].classList.contains(color)) {
        c[i].classList.remove(color);
      }
    }
    target.classList.add(color);
  });
}

function getDayName(d) {
  var a = new Date(d);
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  return weekdays[a.getDay()];
}

function zip(a,b){
  let c = a.map(function(e,i){
      return {value:b[i], name: e}
  });
  return c
}

function convertToMil(value, index) {
  if (value >= 1000000000){
      value = value / 1000000000;
      value = value.toFixed(1) + 'Bil';
  }
  else if (value >= 1000000) {
      value = value / 1000000;
      value = value.toFixed(1) + 'Mil';
  }
  else if(value >= 1000){
      value = value / 1000;
      value = value.toFixed(1) + 'K';
  }
  return value;
}

function convertToK(value, index) {
  if(value >= 1000){
      value = value / 1000;
      value = value.toFixed(1) + 'K';
  }
  return value;
}