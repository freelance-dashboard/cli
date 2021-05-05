import readline from 'readline';

import { typeAuthentication, responseLogin } from '../../interface/authentication';
import User from '../user'


const testAuthGmail: Promise<responseLogin> = Promise.resolve({ status: 201, message: 'complete info user' })
const testAuthUserAndPassword: Promise<responseLogin> = Promise.resolve({ status: 201, message: 'complete info user' })

const readLineEvent = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const types: Array<typeAuthentication> = [
    { index: 0, type: 'gmail' },
    { index: 1, type: 'username and password' },
]

class AuthenticationFreelo {


    static orchestador(): void {
        const option: number | void = this.authenticationUser();
        if (option === 0) this.authGmail();
    }

    /**
     * @description that is a initial method for user authentication 
     */
    static authenticationUser(): number | void {
        types.forEach(typeAuth => (console.log(`${typeAuth.index}- ${typeAuth.type}`)));
        this.authenticationUser();
        readLineEvent.question('Write option: ', (response: string) => {
            const value: number = parseInt(response);
            if (value === 0 || value === 1) return value
            else console.log('that option not found')
            readLineEvent.close();
        })
    }

    /**
     * @description that is a resolve Promise function login
     * @param {String} valueType type auth user
     */
    static authGmail(): void {
        testAuthGmail.then((response: responseLogin) => {
            if (response.status === 201) User.updateUser();
            else console.log(response.message)
        })
    }
}


export default AuthenticationFreelo;