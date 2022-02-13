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
pub fn search_object(list: &JsValue, query: String) -> String {
	let data: Vec<RankingListData> = list.into_serde().unwrap();
	let results = search(&data, query);

	serde_json::to_string(&results).unwrap()
}

fn search(list: &Vec<RankingListData>, query: String) -> Vec<&RankingListData> {
	let lowercased = query.to_lowercase();

	let results = list
		.iter()
		.filter(|item| (
			item.rank.to_string().to_lowercase().contains(&lowercased) ||
			item.username().to_lowercase().contains(&lowercased) ||
			item.score.to_string().to_lowercase().contains(&lowercased) ||
			item.pp.to_string().to_lowercase().contains(&lowercased)
		))
		.collect();

	results
}

#[test]
fn serde_test() {
  let input = "{\"id\":1,\"rank\":1,\"userName\":\"User 1\",\"score\":123,\"pp\":12,\"delta\":1}";

  let data: RankingListData = serde_json::from_str(&input).unwrap();
  assert_eq!(1, data.id);
  assert_eq!(1, data.rank);
  assert_eq!("User 1".to_string(), data.username());
  assert_eq!(123, data.score);
  assert_eq!(12, data.pp);
  assert_eq!(1, data.delta);

  let output = serde_json::to_string(&data).unwrap();
  assert_eq!(input, output);
}

#[test]
fn search_test() {
	let data: Vec<RankingListData> = vec![
		RankingListData::new(1, 1, "Rick".to_string(), 13445, 132, 0),
		RankingListData::new(2, 2, "Morty".to_string(), 12344, 123, 0),
		RankingListData::new(3, 3, "Tom".to_string(), 11233, 112, 0)
	];

	let res_one = search(&data, "ort".to_string()); // returns [1]
	assert_eq!("Morty".to_string(), res_one[0].username());
	assert_ne!("Tom".to_string(), res_one[0].username());

	let res_two = search(&data, "o".to_string()); // returns [1] and [2]
	assert_eq!(2, res_two.len());
	assert_eq!("Morty".to_string(), res_two[0].username());
	assert_eq!("Tom".to_string(), res_two[1].username());

	let res_three = search(&data, "12".to_string()); // returns [1] and [2]
	assert_eq!(2, res_three.len());
	assert_eq!("Morty".to_string(), res_three[0].username());
	assert_eq!("Tom".to_string(), res_three[1].username());
}
