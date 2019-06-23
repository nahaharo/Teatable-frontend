
function time2int(h, m) {
    return Number(h)*60+ Number(m);
}

function int2time(i) {
    return [i/60>>0, Number(i)%60];
}

function time_loc_string(time, loc) { // time is {월: [[570, 690],[]]}, loc is ["E4-114"]
    let i = 0;
    let ans = [];
    for(let day in time)
    {
        for(let block of time[day])
        {
            let start = int2time(block[0]);
            let end = int2time(block[1]);
            ans.push(` ${day} ${start[0]}:${start[1] ? start[1] : "00" }-${end[0]}:${end[1] ? end[1] : "00" }(${loc[i]})`);
            i++;
        }
    }
    return ans.toString();
}

export { time2int, int2time, time_loc_string }