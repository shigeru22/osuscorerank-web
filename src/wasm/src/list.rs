use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[allow(non_snake_case)]
#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct RankingListData {
	pub id: i32,
	pub rank: i32,
	userName: String,
	pub score: i64,
	pub pp: i32,
	pub delta: i32
}

#[wasm_bindgen]
impl RankingListData {
	pub fn new(id: i32, rank: i32, user_name: String, score: i64, pp: i32, delta: i32) -> RankingListData {
		RankingListData {
			id: id,
			rank: rank,
			userName: user_name,
			score: score,
			pp: pp,
			delta: delta
		}
	}

	#[wasm_bindgen(getter)]
	pub fn username(&self) -> String {
		self.userName.clone()
	}

	#[wasm_bindgen(setter)]
	pub fn set_username(&mut self, user_name: String) {
		self.userName = user_name;
	}
}
