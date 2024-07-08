import { Request, Response } from 'express';
import { AlexaRequest } from '../models/alexa.Request';
import { AlexaResponse } from '../models/alexa.Response';
import { createTask as createTaskInDb, updateTask as updateTaskInDb } from '../Controllers/task.controller';

let currentTaskId : number | null = null;

export const handleAlexaRequest = async (req: Request, res: Response) => {
    const requestBody = req.body;

    if(requestBody.request.type === 'IntentRequest'){
        const intentName = requestBody.request.intent.name;
        try {
            if(intentName === 'IntentRequest'){
                const taskName = requestBody.request.intent.slots.taskName.value;
                
            }
        } catch (error) {
            
        }
    }
}