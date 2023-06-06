export class ResonseUseraDTO {
    userId: string
    accountsId: Array<string>
    permission: string
    isNewUser: boolean
    zoneId: string

    constructor(userId: string, accountsId: Array<string>, permission: string, isNewUser: boolean, zoneId: string) {
        this.userId = userId
        this.accountsId = accountsId
        this.permission = permission
        this.isNewUser = isNewUser
        this.zoneId = zoneId
    }
}
