# express-request-activity
Turn light on/off based off of request activity, built targeting Raspberry Pi.

## How to use
Install the npm package:
```
npm install express-request-activity
```

Require and use the middleware:
```javascript
const express = require('express');

// Requiring the middleware
const requestActivity = require('express-request-activity');

// This might be slightly different for you
// but incorporation into your express app
// should be similar
const app = express();

// Using the middleware
app.use(requestActivity({
    // The physical pin on the raspberry pi the
    // light is connected to
    lightPin: 11,

    // The amount of time in milliseconds you want
    // the light to stay on before turning off on request
    // activity
    lightOnTimeInMs: 500
}));

// The rest of your code...
```