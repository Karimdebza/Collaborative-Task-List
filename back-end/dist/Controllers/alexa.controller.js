"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAlexaRequest = void 0;
let currentTaskId = null;
const handleAlexaRequest = async (req, res) => {
    const requestBody = req.body;
    if (requestBody.request.type === 'IntentRequest') {
        const intentName = requestBody.request.intent.name;
        try {
            if (intentName === 'IntentRequest') {
                const taskName = requestBody.request.intent.slots.taskName.value;
            }
        }
        catch (error) {
        }
    }
};
exports.handleAlexaRequest = handleAlexaRequest;
