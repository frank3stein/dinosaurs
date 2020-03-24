const Dinos = [
  {
    species: "Triceratops",
    weight: 13000,
    height: 114,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "First discovered in 1889 by Othniel Charles Marsh",
    image: "./images/triceratops.png"
  },
  {
    species: "Tyrannosaurus Rex",
    weight: 11905,
    height: 144,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "The largest known skull measures in at 5 feet long.",
    image: "./images/tyrannosaurus rex.png"
  },
  {
    species: "Anklyosaurus",
    weight: 10500,
    height: 55,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Anklyosaurus survived for approximately 135 million years.",
    image: "./images/anklyosaurus.png"
  },
  {
    species: "Brachiosaurus",
    weight: 70000,
    height: "372",
    diet: "herbavor",
    where: "North America",
    when: "Late Jurasic",
    fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
    image: "./images/brachiosaurus.png"
  },
  {
    species: "Stegosaurus",
    weight: 11600,
    height: 79,
    diet: "herbavor",
    where: "North America, Europe, Asia",
    when: "Late Jurasic to Early Cretaceous",
    fact:
      "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    image: "./images/stegosaurus.png"
  },
  {
    species: "Elasmosaurus",
    weight: 16000,
    height: 59,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
    image: "./images/elasmosaurus.png"
  },
  {
    species: "Pteranodon",
    weight: 44,
    height: 20,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    image: "./images/pteranodon.png"
  },
  {
    species: "Pigeon",
    weight: 0.5,
    height: 9,
    diet: "herbavor",
    where: "World Wide",
    when: "Holocene",
    fact: "All birds are living dinosaurs.",
    image: "./images/pigeon.png"
  }
];

function Human(species, weight, diet, image, feet, inches, name) {
  this.species = species;
  this.weight = weight;
  if (feet && inches) {
    this.height = this.getHeightInInches(feet, inches);
  }
  this.diet = diet;
  this.image = image;
  this.feet = feet;
  this.inches = inches;
  this.name = name;
}

Human.prototype.getHeightInInches = function(feet, inches) {
  //coercing string values to numbers with (+)inches
  return +feet * 12 + +inches;
};

// it takes an array of strings, which are key values we want to exclude.
Human.prototype.getRandomKeysWithExclusion = function(arrayOfKeysToExclude) {
  let keys = Object.keys(this); // get keys of object

  // For each exclusion `element` we filter the keys array and return the filtered array to be reduced for the next element. In the end we have an array filtered for the whole exlusion array elements.
  return arrayOfKeysToExclude.reduce(
    (keys, element) => keys.filter(key => key !== element),
    keys
  );
};

function Dinosaur(
  species,
  weight,
  diet,
  image,
  where,
  when,
  fact,
  height,
  human
) {
  Human.call(this, species, weight, diet, image);
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.human = human; // reference to the human info object
  this.height = height;
}

Dinosaur.prototype = Object.create(Human.prototype);

Dinosaur.prototype.compareHeight = function() {
  return this.height > this.human.height
    ? `${this.species} is taller ${this.height - this.human.height} than you`
    : `You are taller than ${this.species}. ${this.species} is only ${this.height} inches tall`;
};

Dinosaur.prototype.compareWeight = function() {
  return this.weight > this.human.weight
    ? `${this.species} (${this.weight}) weighs ${this.weight -
        this.human.weight} pounds heavier than you (${this.human.weight})`
    : `You (${this.human.weight}) are heavier than ${this.species}. ${this.species} weighs only ${this.weight}`;
};

Dinosaur.prototype.compareDiet = function() {
  return this.diet !== this.human.diet
    ? `${this.species} is not a ${this.human.diet}. Instead they follow the ${this.diet} diet`
    : `You follow the ${this.diet} diet as ${this.species}`;
};

const dinoCompare = document.getElementById("dino-compare");
dinoCompare.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector(".form-container").style.display = "none";
  const humanComparisonInfo = {
    diet: e.target.diet.value.toLowerCase(),
    weight: e.target.weight.value,
    height: {
      feet: e.target.feet.value,
      inches: e.target.inches.value
    }
  };

  const human = new Human(
    "Homo Sapiens",
    humanComparisonInfo.weight,
    humanComparisonInfo.diet,
    "./images/human.png",
    humanComparisonInfo.height.feet,
    humanComparisonInfo.height.inches,
    e.target.name.value
  );

  const Dinosaurs = Dinos.map(
    dino =>
      new Dinosaur(
        dino.species,
        dino.weight,
        dino.diet,
        dino.image,
        dino.where,
        dino.when,
        dino.fact,
        dino.height,
        humanComparisonInfo
      )
  );

  dinoCompare.append(createComparisonDiv(Dinosaurs, human));
  // get the computed height when human is initiliazed with Human constructor
  humanComparisonInfo.heightInInches = human.height;
  Object.freeze(humanComparisonInfo);
});

const createComparisonDiv = (Dinosaurs, human) => {
  // Here we create a shuffled Dino array
  // I could use const to get the same effect, but I want to
  const randomDinosaursSurroundingHuman = shuffleArray(Dinosaurs);
  // add human to the array
  randomDinosaursSurroundingHuman.splice(4, 0, human);

  const getRandomFactofObjectWithExclusion = excludedArrayOfKeys => {
    const toCompareArray = human.getRandomKeysWithExclusion(
      excludedArrayOfKeys
    );
    return toCompareArray[getRandomInt(toCompareArray.length)];
  };

  const comparisonDiv = document.createElement("section");
  comparisonDiv.id = "grid";
  comparisonDiv.innerHTML = randomDinosaursSurroundingHuman
    .map(dino => {
      if (dino.name !== undefined) {
        // we only need to exclude if we do not want it to be compared explicitly
        const humanRandomKey = getRandomFactofObjectWithExclusion([
          "species",
          "image",
          "name",
          "inches", // instead we compare height in total inches
          "feet"
        ]);
        return `
        <div class="grid-item">
        <h2>${dino.name}</h2>
        <p>${dino.name}'s ${humanRandomKey} : ${dino[humanRandomKey]}</p>
        <img src="${dino.image}" alt="${dino.name}">
        </div>`;
      }
      return `
      <div class="grid-item">
      <h2>${dino.species}</h2>
      <p>${
        dino.species === "Pigeon"
          ? dino.fact
          : // Here we select at random one of the compare methods and set its this to dino, otherwise since we use the array to call it, this points to the array.
            [dino.compareDiet, dino.compareHeight, dino.compareWeight][
              getRandomInt(3)
            ].call(dino)
      }</p>
      <img src="${dino.image}" alt="${dino.species}">
      </div>`;
    })
    .reduce((x, y) => x + y);
  return comparisonDiv;
};
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const insertAnElementAtIndex = (array, toInsert, index) => {
  array.splice(index, 0, toInsert);
};

const shuffleArray = array => {
  array = array.slice();
  const swapArrayElements = (array, swappedElementIndex, goToIndexPosition) => {
    const memoIndexPositionElement = array[goToIndexPosition];
    array[goToIndexPosition] = array[swappedElementIndex];
    array[swappedElementIndex] = memoIndexPositionElement;
  };

  let i = array.length,
    j;
  while (--i > 0) {
    j = getRandomInt(i);
    swapArrayElements(array, j, i);
  }
  // I thought making this function more generic means I can use it for any randomization. So I instead add the human after I shuffle the array not during the shuffle function
  // array.splice(4, 0, staticSelect);
  return array;
};
