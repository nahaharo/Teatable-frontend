function dragstart(ev) {
    let code = ev.currentTarget.getAttribute('subcode');
    let num = ev.currentTarget.getAttribute('num');

    ev.dataTransfer.setData("text", JSON.stringify({ "code": code, "num": num}));

    // ev.dataTransfer.setData("text/code", ev.currentTarget.getAttribute('subcode'));
    // ev.dataTransfer.setData("text/num", ev.currentTarget.getAttribute('num'));

}//for dragable objects

export default dragstart;