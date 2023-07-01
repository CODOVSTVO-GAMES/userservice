export class ResponseDTO {
    status: number;
    msg: string;
    data: object;
    constructor() {
        this.status = 200
        this.msg = 'OK'
    }
}
