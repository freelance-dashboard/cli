"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const user_1 = __importDefault(require("../user"));
const testAuthGmail = Promise.resolve({ status: 201, message: 'complete info user' });
const testAuthUserAndPassword = Promise.resolve({ status: 200, message: 'succesfull' });
const readLineEvent = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const types = [
    { index: 0, type: 'gmail' },
    { index: 1, type: 'username and password' },
];
class AuthenticationCommand {
    static orchestador() {
        const option = this.authenticationUser();
        if (option === 0)
            this.authGmail;
        else if (option === 1)
            this.authPassAndUser;
    }
    /**
     * @description that is a initial method for user authentication
     */
    static authenticationUser() {
        types.forEach(typeAuth => (console.log(`${typeAuth.index}- ${typeAuth.type}`)));
        this.authenticationUser();
        readLineEvent.question('Write option: ', (response) => {
            const value = parseInt(response);
            if (value === 0 || value === 1)
                return value;
            else
                console.log('that option not found');
            readLineEvent.close();
        });
    }
    /**
     * @description that is a resolve Promise function login gmail
     */
    static authGmail() {
        testAuthGmail.then((response) => {
            this.finallySecuency(response);
        });
    }
    /**
   * @description that is a resolve Promise function login authPassword
   */
    static authPassAndUser() {
        testAuthUserAndPassword.then((response) => {
            this.finallySecuency(response);
        });
    }
    /**
     * @description  that is a implement usser call update
     */
    static finallySecuency(response) {
        if (response.status === 201)
            user_1.default.updateUser();
        else
            console.log(response.message);
    }
}
exports.default = AuthenticationCommand;
