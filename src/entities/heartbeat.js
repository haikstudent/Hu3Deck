export default function createMakeHeartbeat({uid}) {
    return function makeHeartbeat({
        id = uid(),
        measurement_date = new Date,
        bpm,
        sessionId
    }) {

        // check if bpm exist
        if(!bpm) {
            throw new Error("Bpm is needed to properly measure the heartbeat.");
        }
        // checks if sesison id exist
        if(!sessionId) {
            throw new Error("Session needs to be set.");
        }   
        
        return Object.freeze({
            getId: () => id,
            getBpm: () => bpm,
            getSessionId: () => sessionId,
            getMeasurementDate: () => measurement_date
        });
    }
}