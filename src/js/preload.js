const { contextBridge, ipcRenderer } = require('electron');

// the renderer can send messages to the main process.
contextBridge.exposeInMainWorld('myApi', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});