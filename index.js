const cli = require('cac')();
//commands class
const CreateFreelo = require('./src/commands/create');
const AuthenticationFreelo = require('./src/commands/authentication');

cli.command('auth', 'generate first auth user in aplication')
    .example('freelo auth')
    .action(() => {
     AuthenticationFreelo.questionTypeLoginUser();
    })


cli.command('create <name> <organization>', 'create new project in freelo')
    .example('freelo create name-project name-organization')
    .action((name, organization) => {
        CreateFreelo.createProject({ name, organization })
    })


cli.help()

cli.parse();