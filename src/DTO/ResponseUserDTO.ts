export class ResonseUseraDTO {
    userId: string
    accountsId: Array<string>
    permission: string
    isNewUser: boolean
    coordinates: string

    constructor(userId: string, accountsId: Array<string>, permission: string, isNewUser: boolean, coordinates: string) {
        this.userId = userId
        this.accountsId = accountsId
        this.permission = permission
        this.isNewUser = isNewUser
        this.coordinates = coordinates
    }
}
