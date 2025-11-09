function handleSimpleRequest() {  
  const timestamp = new Date();
  Logger.log('Richiesta semplice ricevuta alle: ' + timestamp);  
  return createResponse(true, 'Richiesta semplice elaborata con successo');
}

function handleDataRequest(data) {
  if (!data) {
    return createResponse(false, 'Nessun dato ricevuto');
  }
  
  const timestamp = new Date();
  Logger.log('Dati ricevuti: ' + data + ' alle ' + timestamp);  
  return createResponse(true, 'Dato ricevuto correttamente: ' + data);
}

function createResponse(success, message, additionalData = {}) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString(),
    ...additionalData
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
