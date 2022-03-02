/* tslint:disable */
/* eslint-disable */
/**
* @returns {string}
*/
export function greet(): string;
/**
* @param {any} list
* @param {string} query
* @returns {string}
*/
export function search_object(list: any, query: string): string;
/**
*/
export class RankingListData {
  free(): void;
/**
* @param {number} id
* @param {number} rank
* @param {string} user_name
* @param {BigInt} score
* @param {number} pp
* @param {number} delta
* @returns {RankingListData}
*/
  static new(id: number, rank: number, user_name: string, score: BigInt, pp: number, delta: number): RankingListData;
/**
*/
  delta: number;
/**
*/
  id: number;
/**
*/
  pp: number;
/**
*/
  rank: number;
/**
*/
  score: BigInt;
/**
* @returns {string}
*/
  username: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_rankinglistdata_free: (a: number) => void;
  readonly __wbg_get_rankinglistdata_id: (a: number) => number;
  readonly __wbg_set_rankinglistdata_id: (a: number, b: number) => void;
  readonly __wbg_get_rankinglistdata_rank: (a: number) => number;
  readonly __wbg_set_rankinglistdata_rank: (a: number, b: number) => void;
  readonly __wbg_get_rankinglistdata_score: (a: number, b: number) => void;
  readonly __wbg_set_rankinglistdata_score: (a: number, b: number, c: number) => void;
  readonly __wbg_get_rankinglistdata_pp: (a: number) => number;
  readonly __wbg_set_rankinglistdata_pp: (a: number, b: number) => void;
  readonly __wbg_get_rankinglistdata_delta: (a: number) => number;
  readonly __wbg_set_rankinglistdata_delta: (a: number, b: number) => void;
  readonly rankinglistdata_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly rankinglistdata_username: (a: number, b: number) => void;
  readonly rankinglistdata_set_username: (a: number, b: number, c: number) => void;
  readonly greet: (a: number) => void;
  readonly search_object: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
