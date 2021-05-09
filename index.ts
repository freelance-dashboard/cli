import cli from 'cac';
import AuthenticationFreelo from './src/commands/authentication';
//commands class
const CreateFreelo = require('./src/commands/create');

const cliClient = cli();
cliClient.command('auth', 'generate first auth user in aplication')
    .example('freelo auth')
    .action(() => {
        AuthenticationFreelo.orchestador();
    })


cliClient.command('create <name> <organization>', 'create new project in freelo')
    .example('freelo create name-project name-organization')
    .action((name, organization) => {
        CreateFreelo.createProject({ name, organization })
    })


cliClient.help()

cliClient.parse();