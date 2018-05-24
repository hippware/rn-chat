echo "Installing applesimutils"
mkdir simutils
cd simutils
curl https://raw.githubusercontent.com/wix/homebrew-brew/master/AppleSimulatorUtils-0.5.22.tar.gz -o applesimutils.tar.gz
tar xzvf applesimutils.tar.gz
sh buildForBrew.sh 
cd ..
export PATH=$PATH:./simutils/build/Build/Products/Release

echo "Installing NVM..."
brew install nvm
source $(brew --prefix nvm)/nvm.sh

echo "Installing v8.5..."
nvm install v8.5.0
nvm use --delete-prefix v8.5.0
nvm alias default v8.5.0

echo "Detecting applesimutils"
which applesimutils

echo "Figuring out node version..."
node --version

echo "Installing detox cli..."
npm install -g detox-cli

echo "Building the project..."
npm install

echo "Run tests"
npm test

echo "Run detox"
npm detox
