# Description

[https://en.wikipedia.org/wiki/Phutball](https://en.wikipedia.org/wiki/Phutball)

My version places pieces on squares instead of vertices, and assumes a board 
with 19 x 15 squares instead of 19 x 15 vertices. Player X scores by placing the
ball in the top row.

Play it live [HERE](http://phutball.surge.sh)

# Local Setup

1. Globally [install](https://github.com/yarnpkg/yarn#installing-yarn) [yarn](https://github.com/yarnpkg/yarn), a deterministic replacement for NPM
2. Globally [install](https://webpack.js.org/guides/installation/) [Webpack](https://github.com/webpack/webpack)
3. `NODE_ENV=development && yarn install`
4. `yarn run webpack-dev` to start the local React server that re-compiles code  
on change. Navigate to [http://localhost:3000](http://localhost:3000) to view 
the results, or open the index.html file in your browser.
5. `yarn run webpack-prod` to use minified production code. Open the index.html 
file in your browser to view compiled production code.
