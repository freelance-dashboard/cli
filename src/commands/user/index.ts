
import readline from 'readline';
import { User } from '../../interface/user';

const testApiFirebase: Promise<User> = Promise.resolve({ numberDocument: '1234', userName: 'testUser', firm: new File([""], 'testfile.png',) });

const readLineEvent = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class UserCommand {

    static showUser(): void {
        testApiFirebase.then((response: User) => {
            console.log(`
            número de documento: ${response.numberDocument}
            nombre de usuario: ${response.userName}
            `)
        })
    }

    static updateUser(): void {
        testApiFirebase.then((response: User) => {
            let newInfoUser: User = response;

        })
    }

}

export default UserCommand;