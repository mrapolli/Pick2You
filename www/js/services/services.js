angular.module('starter').factory('Scopes', function ($rootScope) {
  var mem = {};
  return {
    store: function (key, value) {
      mem[key] = value;
    },

    get: function (key) {
      return mem[key];
    }
  };
});


angular.module('starter').factory('FotoEscolhida', function ($rootScope) {
  var mem = {};
  return {
    store: function (value) {
      mem[0] = value;
    },

    get: function () {
      return mem[0];
    }
  };
});
