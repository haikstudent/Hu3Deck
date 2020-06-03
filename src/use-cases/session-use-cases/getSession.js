import { makeSession } from './../../entities/';
export default function createGetSession({ sessionDb }) {
    return async function getSession({
        id
    }) {

        //Could use more validation.
        if(!id) {
            throw new Error("To get a session, you need a sessionId.");
        }

        const sessionObject = await sessionDb.findById({
            id
        });

        if (Object.keys(sessionObject).length < 1) {
            return {};
        } 

        return {
            ...makeSession(sessionObject).toObject()
        };
    }
}