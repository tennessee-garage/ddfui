# ddfui

This is a React-based web UI for the
[dance-floor](https://github.com/tennessee-garage/dance-floor)
[server interface](https://github.com/tennessee-garage/dance-floor/blob/master/floor/floor/server/README.md)

![image](https://user-images.githubusercontent.com/390829/64398555-41f51100-d033-11e9-89e6-8d7e59ddac49.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

  - [Developer Setup](#developer-setup)
    - [Quick start instructions](#quick-start-instructions)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Developer Setup

For maximum enjoyment, you will want to be running and developing against a local instance of the [dance-floor server](https://github.com/tennessee-garage/dance-floor).

You don't need any special hardware to run the dance floor server, in fact, most of this UI was developed while bored on an airplane.

### Quick start instructions

Install the dance floor server:
```
cd ~/git
git clone https://github.com/tennessee-garage/dance-floor.git
cd floor
pipenv shell
pipenv install
```

Run the dance floor server:
```
cd ~/git/dance-floor/floor
pipenv shell
python run-show.py --driver=devserver
```

In another terminal, launch the ddfui devserer:
```
cd ~/git/ddfui
yarn start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
