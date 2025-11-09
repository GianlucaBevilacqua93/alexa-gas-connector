function doGet(e) {
  try {
    if (!e || !e.parameter) {
      return createResponse(false, 'Nessun parametro ricevuto');
    }
    
    const endpoint = e.parameter.endpoint;
    const data = e.parameter.data;
    
    switch(endpoint) {
      case 'simple':
        return handleSimpleRequest();
      
      case 'data':
        return handleDataRequest(data);
      
      default:
        return createResponse(false, 'Endpoint non riconosciuto');
    }
    
  } catch (error) {
    Logger.log('Errore: ' + error.toString());
    return createResponse(false, 'Errore del server: ' + error.toString());
  }
}
