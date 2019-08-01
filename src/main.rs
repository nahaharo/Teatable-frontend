pub mod backend;
use lazy_static::lazy_static;
use std::collections::HashMap;
use actix_web::{web, App, HttpResponse, HttpServer};
use actix_cors::Cors;
use serde_json::{Value, json};
use serde::{Serialize, Deserialize};
use std::env;

lazy_static! {
static ref SUB_MAP: HashMap<String, Vec<backend::read_csv::Subject>> = backend::read_csv::read_csv("./data/data.csv").unwrap();
static ref SUB_JSON: String = backend::read_csv::get_json(&SUB_MAP);
}

#[derive(Serialize, Deserialize, Debug)]
struct SearchReq {
    fix: Value,
    req: Value,
    sel: Value
}

fn base(subs: &String) -> HttpResponse {
    HttpResponse::Ok().body(subs)
}

fn query(info: web::Query<SearchReq>) -> HttpResponse
{
    let fix = &info.fix.as_str().unwrap_or("[]");
    let req = &info.req.as_str().unwrap_or("[]");
    let sel = &info.sel.as_str().unwrap_or("[]");
    let fix_subs: Vec<(String, usize)> = serde_json::from_str(fix).unwrap_or(Vec::new());
    let req_subs: Vec<String> = serde_json::from_str(req).unwrap_or(Vec::new());
    let sel_subs: Vec<String> = serde_json::from_str(sel).unwrap_or(Vec::new());
    let ans = backend::subject_table::comb_sub(&SUB_MAP, &fix_subs, &req_subs, &sel_subs);
    let res: String;
    match ans
    {
        Ok(t) =>  {
            match t
            {
                Some(v) => res = json!({"s":"s", "comb":v}).to_string(),
                None => res = json!({"s":"f", "msg" :"조합이 없습니다."}).to_string()
            }
        },
        Err(t) => res = json!({"s":"f", "msg" :t}).to_string()
    }
    HttpResponse::Ok().body(res)
}

fn main()
{
    let args: Vec<String> = env::args().collect();
    let default_bind = "127.0.0.1:8088".to_string();
    let bind = args.get(1).unwrap_or(&default_bind);
    print!("Service was binded to {:?}\n", bind);
    HttpServer::new(|| {
        App::new()
        .wrap(
            Cors::new().send_wildcard()
        )
        .service(web::resource("/comb").route(web::post().to(query)))
        .route("/", web::get().to(|| base(&SUB_JSON)))
            
    })
    .bind(bind)
    .unwrap()
    .run()
    .unwrap();
}


