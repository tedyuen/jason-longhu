/**
 * Error class for an error raised trying to make an API call
 *
 * @class RequestError
 * @access public
 * @param {string} message - the error message
 */
class RequestError extends Error {
  constructor(message) {
    super();
    this.name = 'RequestError';
    this.message = message;
  }
}

export { RequestError };
