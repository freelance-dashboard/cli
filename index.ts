import cli from 'cac';
import AuthenticationCommand from './src/commands/authentication';
import UserCommand from './src/commands/user';
//commands class
import CreateCommand from './src/commands/create';


//Auth
const cliClient = cli();
cliClient.command('auth', 'generate first auth user in aplication')
    .example('freelo auth')
    .action(() => {
        AuthenticationCommand.orchestador();
    })

//Company
cliClient.command('create <name> <organization>', 'create new project in freelo')
    .example('freelo create name-project name-organization')
    .action((name: string, organization: string) => {
        CreateCommand.createProject({ name, organization })
    })

//User
cliClient.command('user', 'command for work with user')
    .option('update', 'updatede info user')
    .option('show', 'view info user')
    .example('freelo user update')
    .example('freelo user show')
    .action((options) => {
        if ('show' in options) UserCommand.showUser
        else if ('update' in options) UserCommand.updateUser
    })


cliClient.help()

cliClient.parse();