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
	pub isActive: bool
}

#[wasm_bindgen]
impl RankingListData {
	pub fn new(id: i32, rank: i32, user_name: String, score: i64, pp: i32, is_active: bool) -> RankingListData {
		RankingListData {
			id: id,
			rank: rank,
			userName: user_name,
			score: score,
			pp: pp,
			isActive: is_active
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
