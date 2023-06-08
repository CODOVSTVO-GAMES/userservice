export class ResonseUseraDTO {
    userId: string
    accountsId: Array<string>
    permission: string
    isNewUser: boolean
    zone: string

    constructor(userId: string, accountsId: Array<string>, permission: string, isNewUser: boolean, zone: string) {
        this.userId = userId
        this.accountsId = accountsId
        this.permission = permission
        this.isNewUser = isNewUser
        this.zone = zone
    }
}
