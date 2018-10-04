import { JSDOM } from 'jsdom'
const dom = new JSDOM(``, { runScripts: "outside-only", url: 'http://localhost' });
global.window = dom.window
global.document = dom.window.document
global.DocumentFragment = dom.window.DocumentFragment
global.Event = dom.window.Event
global.navigator = dom.window.navigator
global.KeyboardEvent = dom.window.KeyboardEvent
global.MouseEvent = dom.window.MouseEvent
global.self = dom.window.self

class Web3 {}
global.Web3 = Web3

class Storage {}
global.localStorage = new Storage()
global.sessionStorage = new Storage()
