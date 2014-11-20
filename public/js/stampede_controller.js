var StampedeController;

StampedeController = (function() {
  StampedeController.prototype.max = {
    light: 0.65039062,
    sound: 0.19921875,
    temp: 28.8156,
    humid: 49.851
  };

  StampedeController.prototype.min = {
    light: 0.00976562,
    sound: 0.01464844,
    temp: 26.9387,
    humid: 34.3557
  };

  StampedeController.prototype.lastChangeTime = void 0;

  StampedeController.prototype.lastChangeData = {
    light: 0.00976562,
    sound: 0.01464844,
    temp: 26.9387,
    humid: 34.3557
  };

  function StampedeController(logger) {
    this.lastChangeTime = new Date;
  }

  StampedeController.prototype.process = function(sensors) {
    var animal, _i, _ref, _results;
    this.checkIdle(sensors);
    if (typeof logger !== "undefined" && logger !== null) {
      logger.log(sensors);
    }
    console.log(sensors);
    _results = [];
    for (animal = _i = 0, _ref = this.animalCount(sensors); 0 <= _ref ? _i < _ref : _i > _ref; animal = 0 <= _ref ? ++_i : --_i) {
      _results.push(addRandomAnimal(this.hslOffset(sensors)));
    }
    return _results;
  };

  StampedeController.prototype.animalCount = function(sensors) {
    var count;
    count = this.percent(sensors.sound, this.min.sound, this.max.sound);
    return Math.floor(count);
  };

  StampedeController.prototype.hslOffset = function(sensors) {
    var hue, light, lum, sat;
    hue = Math.random();
    light = this.percent(sensors.light, this.min.light, this.max.light);
    sat = Math.random() + 5;
    if (light < 1) {
      sat = void 0;
    }
    lum = Math.random() + 10;
    return {
      hue: hue,
      sat: sat,
      lum: lum
    };
  };

  StampedeController.prototype.percent = function(value, min, max) {
    return (value - min) / (max - min) * 100;
  };

  StampedeController.prototype.checkIdle = function(sensors) {
    if (sensors.sound !== this.lastChangeData.sound || sensors.light !== this.lastChangeData.light) {
      this.lastChangeTime = new Date;
      this.lastChangeData = sensors;
    }
    if ((new Date - this.lastChangeTime) > 4000) {
      console.log('generating idle animal');
      this.lastChangeTime = new Date;
      return addRandomAnimal(this.hslOffset(sensors));
    }
  };

  return StampedeController;

})();

window.StampedeController = StampedeController;
