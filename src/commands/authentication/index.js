const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const typeAuthentication = [
    { index: 0, type: 'gmail' },
    { index: 1, type: 'username and password' },
]

class AuthenticationFreelo {

    /**
     * @description message to options
     */
    static questionTypeLoginUser() {
        console.log('select type authentication');
        typeAuthentication.forEach(typeAuth => (console.log(`${typeAuth.index}- ${typeAuth.type}`)));
        this.authenticationUser();
    }

    /**
     * @description that is a initial method for user authentication 
     */
    static authenticationUser() {
        readline.question('Write option: ', (response) => {
            if (response == 0) console.log(0)
            else if (response == 1) console.log(1)
            else console.log('that option not found')
            readline.close();
        })
    }

    /**
     * @description that is a resolve Promise function login
     * @param {String} valueType type auth user
     */
    static resolvePromiseFirebase(valueType){
        
    }
}


module.exports = AuthenticationFreelo;