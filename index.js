const rpio = require('rpio');

/**
 * requestActivity express middleware
 * 
 * Whenever a request is received, the configured pin output
 * will be set high/on, turning the light on. 
 * 
 * It will then wait for the configured time
 * and set the configured pin output to low/off to
 * turn the light off.
 * 
 * If the light was already on when receiving a new request
 * the on light timer will reset and wait the configured time
 * again before turning the light off.
 * 
 * @param {Object} config
 * @param {number} config.lightPin The GPIO pin the light is connected to, this should be the physical pin number
 * @param {number} config.lightOnTimeInMs The number of milliseconds the light should be kept on when activity is received
 * @returns {(req: Object, res: Object, next: () => void) => void}
 */
function requestActivity(config) {
    let requestDebounceTimeoutId = null;

    rpio.open(config.lightPin, rpio.OUTPUT);

    /**
     * 
     * @param {Object} req Express Request Object
     * @param {Object} res Express Response Object
     * @param {Function} next Express next function
     */
    const _requestActivity = (req, res, next) => {
        clearTimeout(requestDebounceTimeoutId);

        rpio.write(config.lightPin, rpio.HIGH);

        requestDebounceTimeoutId = setTimeout(() => {
            rpio.write(config.lightPin, rpio.LOW);
        }, config.lightOnTimeInMs);

        next();
    };

    return _requestActivity;
}

module.exports = {
    requestActivity
};