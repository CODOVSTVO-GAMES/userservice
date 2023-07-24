import { Account } from "src/app.service"

export class ResonseUseraDTO {
    userId: string
    accounts: Account[]
    permission: string
    isNewUser: boolean

    constructor(userId: string, accounts: Account[], permission: string, isNewUser: boolean) {
        this.userId = userId
        this.permission = permission
        this.isNewUser = isNewUser
        this.accounts = accounts
    }
}
