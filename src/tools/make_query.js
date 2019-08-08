function make_query(params) {
    let esc = encodeURIComponent;
    return Object.keys(params)
    .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
    .join('&');
}

export default make_query;