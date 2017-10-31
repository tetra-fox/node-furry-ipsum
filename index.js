const shuffle = require("knuth-shuffle").knuthShuffle;
const express = require("express");
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

allCategories.forEach(function (category) {
    totalWeight += category.weight;
});

app.get("/", function (req, res) {
    var phrases = [];

    allCategories.forEach(function (category) {
        var selections = Math.round(category.weight / totalWeight * 100);
        for (var i = 0; i < selections; i++) {
            phrases.push(category.phrases[Math.floor(Math.random() * category.phrases.length)]);
        }
    });

    phrases = shuffle(phrases);

    res.set({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        "owo": "what's this?"
    });

    res.send(phrases.join(" "));
});

app.listen(process.env.PORT || 1337);