# osu! Inactive User Score Ranking Viewer

This project is intended to recreate [Venta](https://osu.ppy.sh/users/11320627)'s spreadsheet with the same purpose into a website.

Uses [osu!api v2](https://osu.ppy.sh/docs) to retrieve the scores to a database periodically due to rate limits.

## Setup

Make sure to install [Node.js](https://nodejs.org/en/download) (tested using [v14.17.6](https://nodejs.org/dist/v14.17.6) with [NVM for Windows](https://github.com/coreybutler/nvm-windows)) and [Rust toolchain](https://www.rust-lang.org/tools/install). To prepare the environment, do these steps:

1. Clone the repository.
2. Inside the repository's folder, install the dependencies used for the project.

```shell
$ npm install
```

3. Build Rust Wasm module from the provided NPM script.

```shell
$ npm run build-wasm
```

4. Start development server using this command.

```shell
$ npm start
```

To create an optimized production build, run `npm run build` instead of `npm start`. Build results could be found inside `build` folder and may be served using any HTTP server.