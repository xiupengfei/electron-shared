// import { createApp } from 'vue'
// import App from './App.vue'
// import './samples/node-api'

// createApp(App).mount('#app').$nextTick(window.removeLoading)
import { ipcRenderer } from 'electron'
const remote = require('@electron/remote')
// import Shared from '../../main/share'
// window.removeLoading()
const btn = document.getElementById('btn') as HTMLButtonElement

const sharedObject = remote.getGlobal('sharedObject')
const asyncMap = sharedObject.async

btn.onclick = function () {
  asyncMap.set('local', null)
  console.log('------start')

  console.log('ssss', asyncMap.get('local'))
  ipcRenderer.send('test-r')
  // eslint-disable-next-line prettier/prettier
  while (!asyncMap.get('local')) {}
  console.log('ssss----', asyncMap.get('local'))
  console.log('------end')
}
