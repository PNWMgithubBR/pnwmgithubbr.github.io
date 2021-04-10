/* global io noCanvas select createP windowWidth windowHeight random */

var socket = io(location.host);
let box;
function setup() {
  noCanvas();
  box = select("#chatter input");
  box.changed(send);
}
function send() {
  socket.emit("msg", { chat: this.value() });
  newMsg(this.value());
  this.value("");
}
socket.on("msg", function(msg) {
  newMsg(msg.chat);
  console.log(msg);
});
function newMsg(abc) {
  var p = createP(abc);
  p.position(random(500), random(500));
  dragElement(p.elt);
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    last_elmt = elmnt;
    // elmnt.style.fontSize = parseFloat(elmnt.style.fontSize) - 2 + "pt";
  }

  var last_elmt = undefined;
  function keyPressed() {
    if (keyCode === UP_ARROW) {
      last_elmt.style.fontSize =
        parseFloat(last_elmt.style.fontSize) + 10 + "pt";
    } else if (keyCode === DOWN_ARROW) {
      last_elmt.style.fontSize =
        parseFloat(last_elmt.style.fontSize) - 10 + "pt";
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
