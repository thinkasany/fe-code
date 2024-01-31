const { stringifyRequest } = require("loader-utils");
function loader(source) {
  console.log("source", source);
  return source;
}

loader.pitch = function(remainingRequest, previousRequest, data) {
  const modulePath = stringifyRequest(this, `!!${remainingRequest}`);
  const options = this.getOptions();
  //   console.log(11111, options,  JSON.stringify(options.attributes));
  console.log(modulePath);
  //   var content = require(modulePath);
  //   console.log(content);
  return `
    var element = document.createElement('style');
    const attributes = ${JSON.stringify(options.attributes || {})};
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    var content = require(${modulePath});
    content = content.__esModule ? content.default : content;
    element.innerHTML = content;
    const parentEle = document.querySelector('head');
    parentEle.appendChild(element);
    `;
};

module.exports = loader;
