class ChatWebSocket {
    constructor(url, messageCallback) {
      this.socket = new WebSocket(url);
      this.messageCallback = messageCallback;
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
      };
  
      this.socket.onmessage = (event) => {
        this.messageCallback(JSON.parse(event.data));
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnected = false;
      };
    }
  
    send(message) {
      if (this.isConnected) {
        this.socket.send(JSON.stringify(message));
      }
    }
  
    close() {
      this.socket.close();
    }
  }
  
  export default ChatWebSocket;
  