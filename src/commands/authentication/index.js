const { read } = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const typeAuthentication = [
    { index: 0, type: 'gmail' },
    { index: 1, type: 'username and password' }
]

class AuthenticationFrelo {

    /**
     * @description that is a initial method for user authentication 
     */
    authenticationUser() {
        readline.question(this.questionTypeLoginUser(), (response) => {
            if (response === 0) console.log(0)
            else if (response === 1) console.log(1)
            else console.log('that option not found')
        })
    }

    questionTypeLoginUser() {
        console.log('select type authentication')
        typeAuthentication.forEach(typeAuth => (console.log(`${typeAuth.index} - ${typeAuth.type}`)));
    }

}


module.exports = AuthenticationFrelo;