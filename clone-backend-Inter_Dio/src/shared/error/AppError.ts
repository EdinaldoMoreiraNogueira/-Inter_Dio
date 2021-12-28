
class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public readonly data?: any

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, statusCode = 400, data?: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}

export default AppError;