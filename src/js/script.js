(function () {
  /*
  * ------------------------------------
  *             VARIABLES
  * ------------------------------------
  *
  */

  var clock = document.getElementById('clock');
  var date = new Date();

  /*
  * ------------------------------------
  *            CHANGE TIME
  * ------------------------------------
  *
  */

  console.log('---------------------');
  console.log('You can change the time displayed on the clock by using:');
  console.log('setTime(hours, minutes, seconds);');

  function setTime(hours, minutes, seconds) {
    if (hours instanceof Date) {
      seconds = hours.getSeconds();
      minutes = hours.getMinutes();
      hours = hours.getHours();
    }

    var secondsDelay = '-' + (seconds) + 's';
    var minutesDelay = '-' + (minutes * 60 + seconds) + 's';
    var hoursDelay = '-' + (hours * 3600 + minutes * 60 + seconds) + 's';

    document.getElementById('seconds').style.animationDelay = secondsDelay;
    document.getElementById('minutes').style.animationDelay = minutesDelay;
    document.getElementById('hours').style.animationDelay = hoursDelay;

    document.getElementById('ticker-minutes').style.animationDelay = '-' + seconds + 's';
  }

  /*
  * ------------------------------------
  *         APPLY CURRENT TIME
  * ------------------------------------
  *
  */

  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  var currentSeconds = date.getSeconds();

  setTime(currentHours, currentMinutes, currentSeconds);

  /*
  * ------------------------------------
  *              ADD TIME
  * ------------------------------------
  *
  */

  console.log('or add time with:');
  console.log('addTime(hours, minutes, seconds);');

  var addedHours = 0;
  var addedMinutes = 0;
  var addedSeconds = 0;

  function addTime(hours, minutes, seconds) {
    var date = new Date();
    addedHours += hours;
    addedMinutes += minutes;
    addedSeconds += seconds;
    setTime(date.getHours() + addedHours, date.getMinutes() + addedMinutes, date.getSeconds() + addedSeconds);
  }

  /*
  * ------------------------------------
  *            CHANGE VIEW
  * ------------------------------------
  *
  */

  console.log('---------------------');
  console.log('You can change how the clock is exploded by using:');
  console.log('setView(view);');
  console.log('with one of theses arguments: "bottom", "middle" or "top"');

  function setView(view) {
    view = typeof view === 'string' ? view.toLowerCase() : view;
    if (view === 'bottom' || view === 'btm' || view === 1) {
      clock.className = 'clock view-bottom';
    } else if (view === 'middle' || view === 'mid' || view === 2) {
      clock.className = 'clock view-middle';
    } else if (view === 'top' || view === 3) {
      clock.className = 'clock view-top';
    } else {
      console.warn('Unknown view:', view);
    }
  }

  /*
  * ------------------------------------
  *               BUTTONS
  * ------------------------------------
  *
  */

  const actions = {
    pause: function () {
      clock.classList.toggle('paused');
    },
    time: function () {
      addTime(0, 15, 0);
    },
    build: function () {
      clock.classList.toggle('build');
    },
  };

  function attach(key) {
    const button = document.getElementById('button-' + key);
    button.addEventListener('click', function (event) {
      actions[key](button.classList.toggle('clicked'));
      event.preventDefault();
    });
  }

  for (const key in actions) {
    attach(key);
  }

  /*
  * ------------------------------------
  *                EXPORT
  * ------------------------------------
  *
  */

  window.setTime = setTime;
  window.addTime = addTime;
  window.setView = setView;

  console.log('---------------------');
}());
