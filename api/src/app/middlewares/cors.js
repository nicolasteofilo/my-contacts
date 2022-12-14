module.exports = (request, response, next) => {
  const allowedOrigens = ['http://localhost:3000', 'http://localhost:3001'];
  
  const origin = request.header('origin');
  const isAllowed = allowedOrigens.includes(origin)

  if(isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Age', '10');
  }

  next();
}
