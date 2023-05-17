export class ResonseUseraDTO {
    userId: string
    accountsId: Array<string>
    permission: string
    isNewUser: boolean

    constructor(userId: string, accountsId: Array<string>, permission: string, isNewUser: boolean) {
        this.userId = userId
        this.accountsId = accountsId
        this.permission = permission
        this.isNewUser = isNewUser
    }
}
