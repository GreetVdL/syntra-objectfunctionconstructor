// ----- Opdracht: Make one primary array 'allSporters' that contains 5000 sporters. Each sporter has between 200 and 400 training logs.

// Deze variabelen aanpassen om hoeveelheid sporters en logs te controleren

var numberOfSporters = 5000;
// tussen 200 en 400 logs per sporter
var minVal = 200;
var maxVal = 400;

// Objects and their methods

function Log(sport, distanceKm, timeMin) {
  this.sport = sport;
  this.distanceKm = distanceKm;
  this.timeMin = timeMin;
}

function Sporter(firstName, lastName, age, trainingLogBook = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.trainingLogBook = trainingLogBook;
}

Sporter.prototype.addLog = function (log) {
  this.trainingLogBook.push(log);
};

Sporter.prototype.printPerson = function () {
  console.log(
    "First name: " +
      this.firstName +
      "\nLast name: " +
      this.lastName +
      "\nAge: " +
      this.age
  );
};

Sporter.prototype.filterSport = function (typeSport) {
  return this.trainingLogBook.filter((log) => log.sport === typeSport);
};

Sporter.prototype.totalDistance = function (typeSport = "") {
  if (typeSport) {
    return this.filterSport(typeSport).reduce(
      (acc, log) => acc + log.distanceKm,
      0
    );
  } else {
    return this.trainingLogBook.reduce((acc, log) => acc + log.distanceKm, 0);
  }
};

Sporter.prototype.longestDistance = function (typeSport) {
  var max = 0;
  this.filterSport(typeSport).forEach(
    (log) => (max = log.distanceKm > max ? log.distanceKm : max)
  );
  return max;
};

Sporter.prototype.averageSpeed = function (typeSport = "") {
  if (typeSport) {
    return (
      this.filterSport(typeSport).reduce(
        (acc, log) => acc + (log.distanceKm / log.timeMin) * 60,
        0
      ) / this.filterSport(typeSport).length
    );
  } else {
    return (
      this.trainingLogBook.reduce(
        (acc, log) => acc + (log.distanceKm / log.timeMin) * 60,
        0
      ) / this.trainingLogBook.length
    );
  }
};

// Big array including all 5000 sporters

var allSporters = [];

// Add 5000 sporters with random data to the big array

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

for (var i = 0; i < numberOfSporters; i++) {
  var randomFirstName = "fn-" + Math.random().toString(36).substr(2).slice(-4); // een wat kortere voornaam
  var randomLastName = "ln-" + Math.random().toString(36).substr(2).slice(-10); // een wat langere achternaam
  var randomAge = Math.floor(randomRange(17, 80)); // leeftijd mogelijk van 17 t.e.m. 80 jaar
  allSporters.push(new Sporter(randomFirstName, randomLastName, randomAge));
}

// Add between 200 and 400 training logs with random data to the sporters in the big array

function generateRandomLog() {
  switch (Math.floor(randomRange(0, 3))) {
    case 0: {
      var distance = parseFloat(randomRange(3, 5).toFixed(2)); // tussen 3 en 5 km zwemmen per trainingssessie
      var speed = randomRange(3, 6); // tussen 3 en 6 km per uur zwemmen
      var time = Math.floor((distance / speed) * 60);
      return new Log("swimming", distance, time);
    }
    case 1: {
      var distance = parseFloat(randomRange(150, 200).toFixed(2)); // tussen 150 en 200 km fietsen per trainingssessie
      var speed = randomRange(30, 50); // tussen 30 en 50 km per uur fietsen
      var time = Math.floor((distance / speed) * 60);
      return new Log("cycling", distance, time);
    }
    case 2: {
      var distance = parseFloat(randomRange(30, 43).toFixed(2)); // tussen 30 en 43 km lopen per trainingssessie
      var speed = randomRange(14, 18); // tussen 14 en 18 km per uur lopen
      var time = Math.floor((distance / speed) * 60);
      return new Log("running", distance, time);
    }
  }
}

for (var i = 0; i < allSporters.length; i++) {
  var amountLogs = randomRange(minVal, maxVal);
  for (var j = 0; j < amountLogs; j++) {
    allSporters[i].addLog(generateRandomLog());
  }
}

// Print big array and one example log

// console.log(JSON.stringify(allSporters));
// console.log(allSporters);
// console.log(allSporters[0].trainingLogBook[0]);

// ----------------- OPDRACHTEN ----------------------------------------------------------------------------
// ----- Opdracht 1: sum of all sports kms => Calculate the total distance of all traininglogs of all people

var result = parseFloat(
  allSporters.reduce((acc, e) => acc + e.totalDistance(), 0).toFixed(2)
);
console.log("Opdracht 1: " + result);

// ----- Opdracht 2: person with the longest total swimming distance => search for the first-name, last-name and age of the guy that did the longest total swimdistance

function farrestSwimmer() {
  var max = 0;
  var sporter;
  for (var i = 0; i < allSporters.length; i++) {
    if (allSporters[i].totalDistance("swimming") > max) {
      max = allSporters[i].totalDistance("swimming");
      sporter = allSporters[i];
    }
  }
  return sporter;
}

console.log("Opdracht 2:");
farrestSwimmer().printPerson();

// ----- Opdracht 3: person with the longest swim distance log => find the guy with the biggest single distance swimtraining

function farrestSwimmerInOneTraining() {
  var max = 0;
  var sporter;
  for (var i = 0; i < allSporters.length; i++) {
    if (allSporters[i].longestDistance("swimming") > max) {
      max = allSporters[i].longestDistance("swimming");
      sporter = allSporters[i];
    }
  }
  return sporter;
}

console.log("Opdracht 3:");
farrestSwimmerInOneTraining().printPerson();

// ----- Opdracht 4: sum of all running km of all sporters => Calculate the total running distance of all traininglogs of all people

result = parseFloat(
  allSporters
    .reduce((acc, sporter) => acc + sporter.totalDistance("running"), 0)
    .toFixed(2)
);
console.log("Opdracht 4: " + result);

// ----- Opdracht 5: average running speed of all sporters  => Calculate avg-speed of all running of all people in all logs

function avgSpeedRunning() {
  var count = 0;
  var totalSpeed = 0;
  for (var i = 0; i < allSporters.length; i++) {
    for (var j = 0; j < allSporters[i].trainingLogBook.length; j++) {
      var log = allSporters[i].trainingLogBook[j];
      if (log.sport === "running") {
        totalSpeed += (log.distanceKm / log.timeMin) * 60;
        count++;
      }
    }
  }
  return parseFloat((totalSpeed / count).toFixed(2));
}

console.log("Opdracht 5: " + avgSpeedRunning());

// ----- Opdracht 6: fastest average cycler => Find the guy that is the fastest cycler returning its name and its avg km/h

function fastestCycler() {
  var max = 0;
  var sporter;
  for (var i = 0; i < allSporters.length; i++) {
    if (allSporters[i].averageSpeed("cycling") > max) {
      max = allSporters[i].averageSpeed("cycling");
      sporter = allSporters[i];
    }
  }
  max = parseFloat(max.toFixed(2));
  return sporter.firstName + " " + sporter.lastName + " " + max;
}

console.log("Opdracht 6: " + fastestCycler());
