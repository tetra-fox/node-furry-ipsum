const shuffle = require("knuth-shuffle").knuthShuffle;
const express = require("express");
const app = express();

// create categories
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
    phrases: ["🐺", ":3", ":3c", "^w^", "o.o", "owo"] // surprised owo isn't in the original furry-ipsum
};
var conventions = {
    weight: 2,
    phrases: ["Anthrocon", "Midwest FurFest", "Biggest Little Fur Con", "Rainfurrest"]
};

// combine the categories into one array
var allCategories = [lingo, anatomy, species, roleplay, noises, emoji, conventions];

// initialize totalWeight variable
var totalWeight = 0;

// iterate over the allCategories array and combine the category weights into totalWeight
allCategories.forEach(function (category) {
    // add category weight to value of totalWeight
    totalWeight += category.weight;
});

function ipsum() {
    // initialize phrases array
    var phrases = [];

    // iterate over the allCategories array and make selections
    allCategories.forEach(function (category) {
        // make weighted selections
        var selections = Math.round(category.weight / totalWeight * 100);

        for (var i = 0; i < selections; i++) {
            // push the selections to the phrases array
            phrases.push(category.phrases[Math.floor(Math.random() * category.phrases.length)]);
        }
    });

    // shuffle the array with the fisher-yates (knuth shuffle) algorithm
    phrases = shuffle(phrases);

    // pass the phrases array
    return phrases;
}

app.get("/", function (req, res) {
    // set response headers
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        "owo": "what's this?"
    });

    // check if p is a valid int
    if (!isNaN(req.query.p)) {
        // initialize paragraphs string
        var paragraphs = "";

        // generate an ipsum p times
        for (i = 0; i < req.query.p; i++) {
            paragraphs = paragraphs + ipsum().join(" ") + "\n\n";
        }

        // respond with the paragraphs
        res.send(paragraphs);
    } else {
        // join the phrases array and send it as a response
        res.send(ipsum().join(" "));
    }
});

// start app
app.listen(process.env.PORT || 1337);