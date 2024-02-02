const HtmlWebpackPlugin = require("html-webpack-plugin");
function CSPPlugin(options) {
  this.options = options;
}
CSPPlugin.prototype.apply = function(compiler) {
  const setOptions = this.options;
  compiler.hooks.thisCompilation.tap("options", compilation => {
    HtmlWebpackPlugin.getHooks(
      compilation
    ).beforeEmit.tapAsync("CSPPlugin", (data, cb) => {
      console.log(data.html);
      let cspContent = "";
      for (const key in setOptions) {
        cspContent += `${key} '${setOptions[key].join('\' \'')}'`;
      }
      let insertHtml = `<meta 
      http-equiv="Content=Security-Policy" content="${cspContent}" />"
      `;
      const index = data.html.indexOf("<head>");
      data.html =
        data.html.substring(0, index + 6) +
        insertHtml +
        data.html.substring(index + 6);
        console.log(data.html);
      cb(null, data);
    });
  });
  console.log(111);
};

module.exports = {
  CSPPlugin
};
