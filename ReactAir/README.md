## Minimal react setup using create-react-app

To start, run docker-compose up in the root directory.
By default the app is available on http://localhost:3001.

Edit source to reload the app (including CSS files).

#### App component

`App.js` defines the central component which holds the whole app.
It is the parent of all other components.

#### Entry point

`index.js` is the entry file of the final bundle.
It is the first thing to be executed in the compiled JS.
It creates the React instance and adds the App component to the page.

#### CSS

Any css files which are included in the JS files is bundled and added automatically to page.
For example `App.css` is included in `App.js`, so the styles are automatically appended to the page.
SASS and LESS are not configured. In case they are really needed,
follow https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc

#### Tests

The project comes with pre-configured jest for unit testing.
Every file matching `*.test.js` is considered a test. There is an example in `App.test.js`.
Run `docker-compose exec web yarn test` to execute all tests.
