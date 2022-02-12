extern crate wasm_bindgen;
extern crate serde_json;
extern crate serde_derive;

use wasm_bindgen::prelude::*;

mod list;
use list::RankingListData;

#[wasm_bindgen]
pub fn greet() -> String {
	"Hello, world!".to_string()
}

#[wasm_bindgen]
pub fn sort_object(list: &JsValue) -> String {
	let data: Vec<RankingListData> = list.into_serde().unwrap();
	let serialized = serde_json::to_string(&data).unwrap();
	serialized
}

#[test]
pub fn object_test() {
	let item = RankingListData::new(1, 1, "Test".to_string(), 123, 12, 1);

	assert_eq!(1, item.id);
	assert_eq!(1, item.rank);
	assert_eq!("Test".to_string(), item.username());
	assert_eq!(123, item.score);
	assert_eq!(12, item.pp);
	assert_eq!(1, item.delta);

	let serialized = serde_json::to_string(&item).unwrap();
	println!("serialized = {}", serialized);
}
