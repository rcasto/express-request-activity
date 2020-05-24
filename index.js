const rpio = require('rpio');

/**
 * requestActivity express middleware
 * @param {Object} config
 * @param {number} config.ledPin The GPIO pin the LED is connected to
 * @returns {(req: Object, res: Object, next: () => void) => void}
 */
function requestActivity(config) {
    let requestDebounceTimeoutId = null;

    rpio.open(config.ledPin, rpio.OUTPUT);

    /**
     * 
     * @param {Object} req Express Request Object
     * @param {Object} res Express Response Object
     * @param {Function} next Express next function
     */
    const _requestActivity = (req, res, next) => {
        clearTimeout(requestDebounceTimeoutId);

        rpio.write(config.ledPin, rpio.HIGH);

        requestDebounceTimeoutId = setTimeout(() => {
            rpio.write(config.ledPin, rpio.LOW);
        }, 100);

        next();
    };

    return _requestActivity;
}

module.exports = {
    requestActivity
};