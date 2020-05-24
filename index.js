const rpio = require('rpio');

/**
 * requestActivity express middleware
 * @param {Object} config
 * @param {number} config.ledPin
 */
function requestActivity(config) {
    let requestDebounceTimeoutId = null;

    rpio.open(config.ledPin, rpio.OUTPUT);

    return (req, res, next) => {
        clearTimeout(requestDebounceTimeoutId);

        rpio.write(config.ledPin, rpio.HIGH);

        requestDebounceTimeoutId = setTimeout(() => {
            rpio.write(config.ledPin, rpio.LOW);
        }, 100);

        next();
    };
}

module.exports = {
    requestActivity
};