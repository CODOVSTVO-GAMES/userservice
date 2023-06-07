export class ResonseUseraDTO {
    userId: string
    accountsId: Array<string>
    permission: string
    isNewUser: boolean
    zoneId: string
    chunk: string

    constructor(userId: string, accountsId: Array<string>, permission: string, isNewUser: boolean, zoneId: string, chunk: string) {
        this.userId = userId
        this.accountsId = accountsId
        this.permission = permission
        this.isNewUser = isNewUser
        this.zoneId = zoneId
        this.chunk = chunk
    }
}
