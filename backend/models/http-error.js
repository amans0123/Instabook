//Making a error model to avoid code duplication and same code writitng

class HttpError extends Error{
    //Making a constructor for our Error
    constructor(message,ErrorCode){
        super(message);//Adds the message property
        this.code=ErrorCode;//Adds the ErrorCode property
    }
};

module.exports= HttpError;