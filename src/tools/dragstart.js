function dragstart(ev) {
    ev.dataTransfer.setData("text/code", ev.currentTarget.getAttribute('subcode'));
    ev.dataTransfer.setData("text/num", ev.currentTarget.getAttribute('num'));

}//for dragable objects

export default dragstart;