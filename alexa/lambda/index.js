const https = require('https');
const Alexa = require('ask-sdk-core');
const APPS_SCRIPT_URL = '<YOUR_https://script.google.com/macros/...../exec_GAS_FILE>';


function makeRequest(endpoint, data = null, redirectCount = 0) {
    const MAX_REDIRECTS = 5;
    
    return new Promise((resolve, reject) => {
        if (redirectCount > MAX_REDIRECTS) {
            reject(new Error('Troppi redirect'));
            return;
        }

        const url = new URL(APPS_SCRIPT_URL);
        url.searchParams.append('endpoint', endpoint);
        
        if (data) {
            url.searchParams.append('data', data);
        }

        const request = https.get(url.toString(), (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redirectUrl = res.headers.location;
                console.log(`Redirect ${res.statusCode} verso: ${redirectUrl}`);

                https.get(redirectUrl, (redirectRes) => {
                    let body = '';
                    
                    redirectRes.on('data', (chunk) => {
                        body += chunk;
                    });
                    
                    redirectRes.on('end', () => {
                        try {
                            const response = JSON.parse(body);
                            resolve(response);
                        } catch (e) {
                            resolve({ success: true, message: body });
                        }
                    });
                }).on('error', (error) => {
                    reject(error);
                });
                
                return;
            }
            
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    resolve(response);
                } catch (e) {
                    resolve({ success: true, message: body });
                }
            });
        });

        request.on('error', (error) => {
            reject(error);
        });
    });
}


const SimpleGetIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SimpleGetIntent';
    },
    async handle(handlerInput) {
        try {
            const response = await makeRequest('simple');
            const speakOutput = response.message || 'Richiesta semplice eseguita con successo.';
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('C\'è altro che posso fare per te?')
                .getResponse();
        } catch (error) {
            console.error('Errore:', error);
            return handlerInput.responseBuilder
                .speak('Si è verificato un errore durante l\'elaborazione della richiesta.')
                .getResponse();
        }
    }
};


const DataGetIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DataGetIntent';
    },
    async handle(handlerInput) {
        const data = Alexa.getSlotValue(handlerInput.requestEnvelope, 'data');
        
        if (!data) {
            return handlerInput.responseBuilder
                .speak('Non ho capito quale dato vuoi inviare. Puoi ripetere?')
                .reprompt('Quale dato vuoi inviare?')
                .getResponse();
        }
        
        try {
            const response = await makeRequest('data', data);
            const speakOutput = response.message || `Ho inviato il dato: ${data}`;
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('C\'è altro che posso fare per te?')
                .getResponse();
        } catch (error) {
            console.error('Errore:', error);
            return handlerInput.responseBuilder
                .speak('Si è verificato un errore durante l\'invio del dato.')
                .getResponse();
        }
    }
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Benvenuto nella skill test. Puoi farmi una richiesta semplice o inviarmi dei dati. Come posso aiutarti?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puoi dirmi di fare una richiesta semplice, oppure puoi inviarmi dei dati dicendo: invia il dato seguito dal tuo messaggio. Come posso aiutarti?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'A presto!';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Sessione terminata: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};


const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Errore gestito: ${error.message}`);
        const speakOutput = 'Scusa, ho avuto un problema. Riprova per favore.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SimpleGetIntentHandler,
        DataGetIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
