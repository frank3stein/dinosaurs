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

function Human(species, weight, height, diet, image, name) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  // this.height = feet + inches/12
  this.diet = diet;
  this.image = image;
  this.name = name;
}

Human.prototype.log = function() {
  console.log(this);
};

// it takes an array of strings, which are key values we want to exclude.
Human.prototype.getRandomKeysWithExclusion = function(arrayOfKeysToExclude) {
  let keys = Object.keys(this); // get keys of object
  console.log(keys);

  // For each exclusion `element` we filter the keys array and return the filtered array to be reduced for the next element. In the end we have an array filtered for the whole exlusion array elements.
  return arrayOfKeysToExclude.reduce(
    (keys, element) => keys.filter(key => key !== element),
    keys
  );
};

function Dinosaur(species, weight, height, diet, image, where, when, fact) {
  Human.call(this, species, weight, height, diet, image);
  this.where = where;
  this.when = when;
  this.fact = fact;
}

Dinosaur.prototype = Object.create(Human.prototype);

const dinoCompare = document.getElementById("dino-compare");
dinoCompare.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector(".form-container").style.display = "none";

  // coerce the feet value from string to number
  const height = (+e.target.feet.value + e.target.inches.value / 18).toFixed(2);
  const human = new Human(
    "Homo Sapiens",
    e.target.weight.value,
    height,
    e.target.diet.value,
    "./images/human.png",
    e.target.name.value
  );
  dinoCompare.append(createComparisonDiv(Dinosaurs, human));
});

const Dinosaurs = Dinos.map(
  dino =>
    new Dinosaur(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.image,
      dino.where,
      dino.when,
      dino.fact
    )
);

const createComparisonDiv = (Dinosaurs, human) => {
  const randomDinosaursSurroundingHuman = randomSelectWithOneStaticSelect(
    Dinosaurs,
    human
  );

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
        const humanRandomKey = getRandomFactofObjectWithExclusion([
          "species",
          "image",
          "name"
        ]);
        console.log(human[humanRandomKey], typeof humanRandomKey);
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
      <p>${dino.fact}</p>
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

const randomSelectWithOneStaticSelect = (array, staticSelect) => {
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
  array.splice(4, 0, staticSelect);
  return array;
};
