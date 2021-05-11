

class CreateCommand {

    /**
     * @param {String} name name project
     * @param {String} organization name organizatión proyect
     */
    static createProject({ name, organization }: any) {
        console.log(name, organization)
    }
}

export default CreateCommand;