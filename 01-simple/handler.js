'use strict';

module.exports.hi = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello friend!'
      }
    ),
  };

  return callback(null, response)
};
