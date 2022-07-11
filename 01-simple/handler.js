'use strict';

module.exports.hi = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hi! Welcome!'
      }
    ),
  };

  return callback(null, response)
};
