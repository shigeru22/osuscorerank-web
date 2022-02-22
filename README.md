# osu! Inactive User Score Ranking Viewer

This project is intended to recreate [Venta](https://osu.ppy.sh/users/11320627)'s spreadsheet with the same purpose into a website.

Uses [osu!api v2](https://osu.ppy.sh/docs) to retrieve the scores to a database periodically due to rate limits.

## Setup

Make sure to install [Node.js](https://nodejs.org/en/download) (tested using [v14.17.6](https://nodejs.org/dist/v14.17.6) with [NVM for Windows](https://github.com/coreybutler/nvm-windows)), [Rust toolchain](https://www.rust-lang.org/tools/install), and [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) globally. To prepare the environment, do these steps:

1. Clone the repository.

2. Inside the repository's folder, build Rust Wasm module from the provided NPM script. This compiles the Rust project, runs `wasm-pack`, and outputs the build inside `/pkg` in `/wasm` project directory.

    **Note:** Run this before installing Node dependencies, since the output build will be used for it!

    ```shell
    $ npm run build-wasm
    ```

3. Inside the repository's folder, install the dependencies used for the project.

    ```shell
    $ npm install
    ```

4. Start development server using this command.

    ```shell
    $ npm start
    ```

To create an optimized production build, run `npm run build` instead of `npm start`. Build results could be found inside `build` folder and may be served using any HTTP server.