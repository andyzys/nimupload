const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM(`<!doctype html><html><body><input type="file" id="fileInput" value=""><button id="fileUpload">上传</button></body></html>`);
if (typeof document === 'undefined') {
  global.document = dom.window.document
  global.window = dom.window
  global.navigator = dom.window.navigator
}
