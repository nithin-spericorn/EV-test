exports.goodResponse = (response, message) => {
    return (returnData = {
      ...response,
      success: true,
      message: message,
      statusCode: 200,
    });
}

exports.failedResponse = (response, message, statusCode = 422) => {
    return (returnData = {
      ...response,
      success: false,
      message: message,
      statusCode: statusCode,
    });
  }