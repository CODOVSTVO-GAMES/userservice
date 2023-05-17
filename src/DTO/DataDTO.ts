export class DataDTO {
    userId: string;
    //любые полученые данные
    constructor(userId: string, sessionHash: string, sessionId: number) {
        this.userId = userId
    }
}
