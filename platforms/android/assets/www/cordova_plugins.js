cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-insomnia.Insomnia",
    "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
    "pluginId": "cordova-plugin-insomnia",
    "clobbers": [
      "window.plugins.insomnia"
    ]
  },
  {
    "id": "cordova-plugin-nativeaudio.nativeaudio",
    "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
    "pluginId": "cordova-plugin-nativeaudio",
    "clobbers": [
      "window.plugins.NativeAudio"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-insomnia": "4.3.0",
  "cordova-plugin-nativeaudio": "3.0.9"
};
// BOTTOM OF METADATA
});