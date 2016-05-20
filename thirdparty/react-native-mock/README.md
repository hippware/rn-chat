# react-native-mock
A fully mocked and test-friendly version of react native


## How Am I Supposed To Use This?

```bash
npm i react-native-mock --save-dev
```

```js
/* file-that-runs-before-all-of-my-tests.js */

// This will mutate `react-native`'s require cache with `react-native-mock`'s.
require('react-native-mock/mock'); // <-- side-effects!!! 
```


## Why?

Testing React Native components is *hard*.  I'm hoping this makes it easier.

I wrote a React Testing Library that works really well for React "Web", but didn't really work for
React "Native" without something like this.


## Wait... Is this actually a terrible idea?

I don't know. Maybe.

I'd love to figure that out though... feel free to file an issue if you have opinions.
