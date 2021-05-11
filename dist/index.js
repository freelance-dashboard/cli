"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const authentication_1 = __importDefault(require("./src/commands/authentication"));
const user_1 = __importDefault(require("./src/commands/user"));
//commands class
const create_1 = __importDefault(require("./src/commands/create"));
//Auth
const cliClient = cac_1.default();
cliClient.command('auth', 'generate first auth user in aplication')
    .example('freelo auth')
    .action(() => {
    authentication_1.default.orchestador();
});
//Company
cliClient.command('create <name> <organization>', 'create new project in freelo')
    .example('freelo create name-project name-organization')
    .action((name, organization) => {
    create_1.default.createProject({ name, organization });
});
//User
cliClient.command('user', 'command for work with user')
    .option('update', 'updatede info user')
    .option('show', 'view info user')
    .example('freelo user update')
    .example('freelo user show')
    .action((options) => {
    if ('show' in options)
        user_1.default.showUser;
    else if ('update' in options)
        user_1.default.updateUser;
});
cliClient.help();
cliClient.parse();
