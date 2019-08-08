# Teatable Frontend
## https://jjuba.me/

Frontend for Teatable service which shows possible time table from given subjects time.

## Before launch...
Please check these things.
### rejecting subjects
src/drop_box/base_drop_box.vue:42
```js
let rej_code = new Set(["BS900", "EM900", "ES900", "IC900", "NB900", "RT900", "HL472", "HL303"]);
if((this.type_subs=="req_subs"||this.type_subs=="sel_subs") && rej_code.has(code)){
    alert("Thesis 과목과 UGRP과목은 고정과목에 넣어야 합니다.");
}
else{
    this.$store.commit('addsubject', {type: this.type_subs, code: code, num: num});
}
```

### url Config
src/assets/config.json

#### local use
```json
{
    "Comb_URL_prefix":  "http://127.0.0.1:8088/comb?",
    "Absolute_Table_URL_prefix": "http://127.0.0.1:8080/table?"
}
```

#### public use
```json
{
    "Comb_URL_prefix":  "/comb?",
    "Absolute_Table_URL_prefix": "https://jjuba.me/table?"
}
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
