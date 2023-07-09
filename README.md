# ddfui

This is a React-based web UI for the
[dance-floor](https://github.com/tennessee-garage/dance-floor)
[server interface](https://github.com/tennessee-garage/dance-floor/blob/main/floor/floor/server/README.md)

![image](https://user-images.githubusercontent.com/390829/64398555-41f51100-d033-11e9-89e6-8d7e59ddac49.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Developer Setup](#developer-setup)
  - [Quick start instructions](#quick-start-instructions)
- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn build`](#yarn-build)
  - [`yarn toc`](#yarn-toc)

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
poetry shell
poetry install
```

Run the dance floor server:
```
cd ~/git/dance-floor/floor
poetry shell
python run-show.py --driver=devserver
```

In another terminal, launch the ddfui devserer:
```
cd ~/git/ddfui
yarn devserver
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `dist` folder.

### `yarn toc`

Update this README's auto-generated table of contents.