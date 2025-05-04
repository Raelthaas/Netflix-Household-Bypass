var interval = setInterval(popUperaser, 1000);

function popUperaser() {
  let divs = document.querySelectorAll("body > div");
  if (divs.length > 0) {
    console.log(divs[0].className);
    if (!divs[0].className.includes("appMountPoint")) {
      divs[0].style.display = "none";
      clearInterval(interval);
    }
  }
}
