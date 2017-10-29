const shuffle = require("knuth-shuffle").knuthShuffle;
const express = require("express");
const cors = require("cors");
const app = express();

var lingo = {
    weight: 5,
    phrases: ["furry", "fursona", "popufur", "pawsome", "furry trash", "furries", "fandom", "convention", "fursuit", "fursuiter", "fluff", "fuzz", "fuzzbutt", "furr", "fluffbutt", "cutie", "fursuiting", "everyfur", "nofur", "anyfur", "somefur"]
};
var anatomy = {
    weight: 3,
    phrases: ["paw", "paws", "footpaws", "handpaws", "tail", "tails", "ears"]
};
var species = {
    weight: 3,
    phrases: ["wolf", "fox", "otter", "snep", "deer", "husky", "dragon", "jackal", "raccoon", "goat", "bunny", "trash panda", "foxes", "wuff", "waffle"]
};
var roleplay = {
    weight: 1,
    phrases: ["*nuzzles you*", "*hugs*"]
};
var noises = {
    weight: 3,
    phrases: ["meow", "bark", "bork", "woof", "yap", "purr"]
};
var emoji = {
    weight: 1,
    phrases: ["🐺", ":3", ":3c", "^w^", "o.o"]
};
var conventions = {
    weight: 2,
    phrases: ["Anthrocon", "Midwest FurFest", "Biggest Little Fur Con", "Rainfurrest"]
};

var allCategories = [lingo, anatomy, species, roleplay, noises, emoji, conventions];
var totalWeight = 0;

allCategories.forEach(function (entry) {
    totalWeight += entry.weight;
});

function generate() {
    var phrases = [];

    allCategories.forEach(function (entry, index) {
        var selections = Math.round(entry.weight / totalWeight * 100);
        for (var i = 0; i < selections; i++) {
            phrases.push(entry.phrases[Math.floor(Math.random() * entry.phrases.length)]);
        }
    });

    phrases = shuffle(phrases);
    phrases = phrases.join(" ");

    return phrases;
}

app.use(cors());

app.get("/", function (req, res) {
    res.send(generate());
});

app.listen(process.env.PORT || 1337);