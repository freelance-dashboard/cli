"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const testApiFirebase = Promise.resolve({ numberDocument: '1234', userName: 'testUser', firm: new File([""], 'testfile.png') });
const readLineEvent = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
class UserCommand {
    static showUser() {
        testApiFirebase.then((response) => {
            console.log(`
            número de documento: ${response.numberDocument}
            nombre de usuario: ${response.userName}
            `);
        });
    }
    static updateUser() {
        testApiFirebase.then((response) => {
            let newInfoUser = response;
        });
    }
}
exports.default = UserCommand;
