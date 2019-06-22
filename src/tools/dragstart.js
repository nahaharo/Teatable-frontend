function dragstart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}//for dragable objects

export default dragstart;