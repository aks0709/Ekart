from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

class BusinessException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code

class NotFoundException(BusinessException):
    def __init__(self, message: str):
        super().__init__(message, status_code=404)

class UnauthorizedException(BusinessException):
    def __init__(self, message: str):
        super().__init__(message, status_code=401)

class BadRequestException(BusinessException):
    def __init__(self, message: str):
        super().__init__(message, status_code=400)

async def business_exception_handler(request: Request, exc: BusinessException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message}
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        # Skip non-serializable input values
        error_dict = {"loc": error["loc"], "msg": error["msg"], "type": error["type"]}
        errors.append(error_dict)
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"message": "Validation error", "details": errors}
    )
