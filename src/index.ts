import '@fortawesome/fontawesome-free/css/all.css'
import 'prism-themes/themes/prism-darcula.css'
import './styles/styles.scss'
import '@babel/polyfill'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import start from './start'

start({
  element: document.getElementById('main')!,
  render,
  history: createBrowserHistory()
})
