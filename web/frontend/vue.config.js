module.exports = {
  devServer: {
    proxy: {
      
      '/backend': {
        target: 'https://backend-gulugulu.app.secoder.net/', 
        changOrigin: true,
      }
    }
  }
}

//https://backend-gulugulu.app.secoder.net/
//http://localhost:8000
