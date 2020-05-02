# Vue Firebase Startup Kit

## Overview

This is a template repository, which would help any level of developers to quickly start to develop a web application using Firebase as a backand and Vue as a front-end. All you need to do is:

1. Fork this repository
2. Create your own project in Firebase console and create Hosting and Firestore.
3. Create your own project.ts at src/config directory by copy & paset firbaseConfig from Firebase console, and add export it, wihch should look like this. 

```
export const firebaseConfig = {
  apiKey: "AIzaSyDz2zsrTAb3Tq8-2qxvdMf0t2kkCaqpuK0",
  authDomain: "vue-firebase-kit.firebaseapp.com",
  databaseURL: "https://vue-firebase-kit.firebaseio.com",
  projectId: "vue-firebase-kit",
  storageBucket: "vue-firebase-kit.appspot.com",
  messagingSenderId: "267570366791",
  appId: "1:267570366791:web:cb1a0179314fd9da3ee462"
};
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
