"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCommand {
    /**
     * @param {String} name name project
     * @param {String} organization name organizatión proyect
     */
    static createProject({ name, organization }) {
        console.log(name, organization);
    }
}
exports.default = CreateCommand;
