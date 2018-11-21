# Software prerequisites

* homebrew - `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  * https://docs.brew.sh/Installation
* nvm - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
  * https://github.com/creationix/nvm#important-notes
* node - `nvm install 8.9.4 && nvm use 8.9.4`
* watchman - `brew install watchman`
  * https://facebook.github.io/watchman/docs/install.html#buildinstall
* Xcode - https://developer.apple.com/download/
* XCode command line utilities
  * https://facebook.github.io/react-native/docs/getting-started.html#command-line-tools
* cocoapods - `sudo gem install cocoapods`
  * https://guides.cocoapods.org/using/getting-started.html#installation
* yarn - `brew install yarn --without-node`
  * https://yarnpkg.com/en/docs/install#mac-stable

# Getting started

* Clone this repo locally
  * `git clone git@github.com:hippware/rn-chat.git`
* Nav to the newly created directory and install node dependencies
  * `cd rn-chat`
  * `yarn`
* Open in XCode
  * `open ios/tinyrobot.xcworkspace/`
* Run the app in an iOS simulator

# Technologies/concepts to learn

* Typescript - https://www.typescriptlang.org/index.html
* Mobx
  * https://github.com/mobxjs/mobx
  * https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx
* Mobx-state-tree
  * https://github.com/mobxjs/mobx-state-tree
  * https://egghead.io/courses/manage-application-state-with-mobx-state-tree (this course is for MST v2 which is a few months out of date as of writing)
* React Flux architecture
  * https://facebook.github.io/flux/docs/in-depth-overview.html#content
* Flexbox layout
  * https://facebook.github.io/react-native/docs/flexbox
  * https://css-tricks.com/snippets/css/a-guide-to-flexbox/
