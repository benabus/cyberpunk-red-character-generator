<template>
  <section class="lifepath-gen">
    <h1 class="lifepath-gen__title">Cyberpunk 2020 Lifepath Generator</h1>
    <div v-html="lifepath" class="lifepath-gen__content"></div>

    <div class="lifepath-gen__persons">
      <h2 class="lifepath-gen__persons-title">Friends</h2>
      <dl v-if="Object.keys(friends).length" class="lifepath-gen__persons-list">
        <template v-for="(text, name, index) in friends">
          <dt :key="`friend-name_${index}`" v-text="name"></dt>
          <dd :key="`friend-text_${index}`" v-text="text"></dd>
        </template>
      </dl>
      <p v-else>No friends</p>
    </div>

    <div class="lifepath-gen__persons">
      <h2 class="lifepath-gen__persons-title">Enemies</h2>
      <dl v-if="Object.keys(enemies).length" class="lifepath-gen__persons-list">
        <template v-for="(text, name, index) in enemies">
          <dt :key="`enemy-name_${index}`" v-text="name"></dt>
          <dd :key="`enemy-text_${index}`" v-text="text"></dd>
        </template>
      </dl>
      <p v-else>No enemies</p>
    </div>

    <div class="lifepath-gen__persons">
      <h2 class="lifepath-gen__persons-title">Lovers</h2>
      <dl v-if="Object.keys(lovers).length" class="lifepath-gen__persons-list">
        <template v-for="(text, name, index) in lovers">
          <dt :key="`lover-name_${index}`" v-text="name"></dt>
          <dd :key="`lover-text_${index}`" v-text="text"></dd>
        </template>
      </dl>
      <p v-else>No lovers</p>
    </div>
  </section>
</template>


<script>
import RandomName from "node-random-name";
import Database from "@/database";

export default {
    data: function() {
        return {
            lifepath: ""
        };
    },
    computed: {
        friends: function() {
            return friends;
        },
        enemies: function() {
            return enemies;
        },
        lovers: function(){
            return lovers;
        }
    },
    methods: {},
    mounted: function() {
        // lifepath = "";
        this.lifepath += "<p>" + getStyleAndOrigin() + "</p>";
        this.lifepath += "<p>" + background() + "</p>";
        this.lifepath += "<p>" + motivation() + "</p>";
        this.lifepath += "<p>" + lifeEvents() + "</p>";
        // this.lifepath = lifepath;
    }
};
let lifepath = "";
function d10() {
    let max = 9;
    let min = 0;
    return Math.floor(Math.random() * max + min);
}
function d6() {
    let max = 5;
    let min = 0;
    return Math.floor(Math.random() * max + min);
}
function coinflip() {
    let max = 1;
    let min = 0;
    return Math.floor(Math.random() * max + min);
}

function getStyleAndOrigin() {
    let result = "";
    result += "You are " + Database.appearance.Origins[d10()] + ". ";
    result += "You dress in " + Database.appearance.Clothes[d10()] + ", ";
    result +=
        "you've got a " +
        Database.appearance.Hairstyle[d10()] +
        " hair style, ";
    result += " and some " + Database.appearance.Affectations[d10()] + ". ";
    return result;
}

function background() {
    // let roll = d10();
    let lifepath = "";

    lifepath += "Your family is that of ";
    lifepath += [
        "a Corporate Executive",
        "a Corporate Manager",
        "a Corporate Technician",
        "a Nomad Pack",
        "a Pirate Fleet",
        "a Gang Family",
        "a Crime Lord",
        "the Combat Zone Poor",
        "the Urban homeless",
        "an Arcology family"
    ][d10()];
    lifepath += ". ";

    // let roll = ;
    if (d10() < 6) {
        lifepath += "Both parents are living. ";
        // familyStatus();
    } else {
        // lifepath += "Something has happened to your parents. ";

        lifepath +=
            [
                "Your parent(s) died In warfare.",
                "Your parent(s) died in an accident.",
                "Your parent(s) were murdered.",
                "Your parent(s) have amnesia and don't remember you.",
                "You never knew your parent(s).",
                "Your parent(s) are in hiding to protect you.",
                "You were left with relatives for safekeeping.",
                "You grew up on the Street and never had parents.",
                "Your parent(s) gave you up for adoption.",
                "Your parent(s) sold you for mone."
            ][d10()] + " ";
    }

    if (d10() < 6) {
        // lifepath += "Family status in danger, and you risk losing everything (if you haven't already). "

        lifepath += [
            "Family lost everything through betrayal. ",
            "Family lost everything through bad management. ",
            "Family exiled orotherwise driven from their original home/nation/corporation. ",
            "Family is imprisoned and you alone escaped. ",
            "Family vanished. You are the only remaining member. ",
            "Family was murdered /killed and you were the only survivor. ",
            "Family is involved in a longterm conspiracy, organization or association, such as a crime family or revolutionary group. ",
            "Your family was scattered to the winds due to misfortune. ",
            "Your family is cursed with a hereditary feud that has lasted for generations. ",
            "You are the inheritor of a family debt; you must honor this debt before moving on with your life. "
        ][d10()];
    }

    lifepath +=
        "Your childhood was " +
        [
            "spent on the Street, with no adult supervision.",
            "spent in a safe Corporate Suburbia.",
            "in a Nomad Pack moving from town to town.",
            "in a decaying, once upscale neighborhood.",
            "in a defended Corporate Zone in the central City.",
            "in the heart of the Combat Zone.",
            "in a small village or town far from the City.",
            "in a large arcology city.",
            "in an aquatic Pirate Pack.",
            "on a Corporate controlled Farm or Research Facility."
        ][d10()] +
        " ";

    let number_of_siblings = d10() + 1;
    if (number_of_siblings >= 8) {
        number_of_siblings = 0;
        lifepath = "You are an only child. ";
    } else {
        lifepath +=
            "You have " +
            number_of_siblings +
            " sibling" +
            (number_of_siblings > 1 ? "s" : "") +
            ". ";
        for (let sibling = 1; sibling <= number_of_siblings; sibling++) {
            let gender = d10() % 2 ? "sister" : "brother";
            let age = d10();
            if (age < 5) {
                age = "older";
            } else if (age < 9) {
                age = "younger";
            } else {
                age = "twin";
            }

            lifepath += [
                `Your ${age} ${gender} dislikes you. `,
                `Your ${age} ${gender} dislikes you. `,
                `Your ${age} ${gender} likes you. `,
                `Your ${age} ${gender} likes you. `,
                `Your ${age} ${gender} is neutral to you. `,
                `Your ${age} ${gender} is neutral to you. `,
                `Your ${age} ${gender} hero worships you. `,
                `Your ${age} ${gender} hero worships you. `,
                `Your ${age} ${gender} hates you. `,
                `Your ${age} ${gender} hates you. `
            ][d10()];
        }
    }

    return lifepath;
}

function motivation() {
    let lifepath = "";
    lifepath +=
        "You are " +
        [
            "shy and secretive",
            "rebellious, antisocial, violent",
            "arrogant, proud and aloof",
            "moody, rash and headstrong",
            "picky, fussy and nervous",
            "stable and serious",
            "silly and fluffheaded",
            "sneaky and deceptive",
            "intellectual and detatched",
            "friendly and outgoing"
        ][d10()] +
        ". ";

    lifepath +=
        "The person you value most is " +
        [
            "a parent",
            "a brother or sister",
            "a lover",
            "a friend",
            "yourself",
            "a pet",
            "a teacher or mentor",
            "a public figure",
            "a personal hero",
            "no one"
        ][d10()] +
        ". ";

    lifepath +=
        "The thing you value most is " +
        [
            "money",
            "honor",
            "your word",
            "honesty",
            "knowledge",
            "vengeance",
            "love",
            "power",
            "having a good time",
            "friendship"
        ][d10()] +
        ". ";

    lifepath +=
        [
            "You're Neutral toward most people",
            "You're Neutral toward most people",
            "You like almost everyone",
            "You hate almost everyone ",
            "You feel that People are tools. Use them for your own goals and discard them",
            "You feel thatEvery person is a valuable individual",
            "You feel that People are obstacles to be destroyed if they cross you",
            "You think that People are untrustworthy. Don't depend on anyone",
            "People? Wipe 'em all out and give the place to the cockroaches",
            "You think that People are wonderful"
        ][d10()] + ". ";

    lifepath +=
        "Your most valued posession is " +
        [
            "a weapon",
            "a tool",
            "a piece of clothing",
            "a photograph",
            "a book or diary",
            "a recording",
            "a musical instrument",
            "a piece of jewelry",
            "a toy",
            "a letter"
        ][d10()] +
        ". ";

    return lifepath;
}

function lifeEvents() {
    let years = d6() + 1 + d6() + 1; //2d6,
    let age = 16 + years;

    let lifepath = "";
    lifepath += "You're " + (age + 1) + " years old. ";
    lifepath += "<ul>";
    for (let year = 16; year <= age; year++) {
        let event = d10() + 1;
        if (event <= 8) {
            lifepath += "<li>" + "At age " + year + ", ";

            if (event <= 3) {
                lifepath += bigProblemsBigWins();
            } else if (event <= 6) {
                // lifepath += "friends";
                lifepath += friendsAndEnemies();
            } else if (event <= 8) {
                // lifepath += "romance";
                lifepath += romanticInvolvement();
            }
            lifepath += "</li>";
        }
    }
    lifepath += "</ul>";

    return lifepath;

    function friendsAndEnemies() {
        let result = "";
        let roll = d10() + 1;
        if (roll <= 5) {
            result = makeAFriend();
        } else {
            result = makeAnEnemy();
        }
        return result;
    }
    function bigProblemsBigWins() {
        let result = "";
        if (d10() % 2) {
            //you get lucky
            let roll = d10() + 1;
            let roll2 = d10() + 1;

            if (roll == 1) {
                result += "you made a powerful connection in ";
                if (roll2 <= 4) {
                    result += "the city Police Department. ";
                } else if (roll2 <= 7) {
                    result += "the city's District Attorney's office. ";
                } else {
                    result += "the Mayor's Office. ";
                }
                // 1 Make a Powerful Connection in CityGoverment. Roll1 010.
                // 1-4, it's in the Police Dept.
                //5-7, it's in the District Attorney's Office.
                // 8-10, it's in the Mayor's Office.
            } else if (roll == 2) {
                // Financial Windfall: Roll1 01 Ox1 00 for amount in Eurodollars.
                result += "you came into " + roll2 * 100 + " Eurodollars.";
            } else if (roll == 3) {
                result +=
                    "you made a big score on a job and collected " +
                    roll2 * 100 +
                    " Eurodollars.";
                // Big Score on job or deal! Roll 101 Ox1 00 for amount in Eurodollars.
            } else if (roll == 4) {
                result +=
                    "you found a Sensei (Begin at +2 or add +1 to a Martial Arts Skill of your choice). ";
                // Find a Sensei (teacher) Begin at +2 or add+ 1 to a Martial Arts Skill of your choice.
            } else if (roll == 5) {
                result +=
                    "you found a Teacher (Add +1 to any INT based skill, or begin a new INT based skill at +2). ";
                // Find a Teacher: Add + 1 to any INT based skill, or begin a new INT based skill at +2.
            } else if (roll == 6) {
                result += "a powerful corporate exec owes you on favor.";
                // Powerful Corporate Exec owes you one favor.
            } else if (roll == 7) {
                result +=
                    "a local Nomad Pack befriended you.  You can call upon them for one favor per month (equivalent to a Family Special Ability of +2). ";
                // 7 local Nomad Pack befriends you. You can call upon them for one favor a month, equivalent to a Family Special Ability of +2.
            } else if (roll == 8) {
                result +=
                    "you made a Friend on the Police Force.  You may use him for inside information at a level of +2 Streetwise on any police related situation. ";
                // Make a Friend on the Police Force. You may·use him for inside information at a level of +2 Streetwise on any police related situation.
            } else if (roll == 9) {
                result +=
                    "a local Boostergang decided it likes you (Who knows why.  These are Boosters, right?).  You can call upon them for 1 favor a  month, equivalent to a Family Special Ability of +2.  But don't push it. ";
                // 9 local Boostergang likes you (Who knows why. These are Boosters, right?) You can call upon them for 1 favor a month, equivalent to a Family Special Ability of +2. But don't push it.
            } else {
                result +=
                    "you found a Combat Teacher.  Add +1 to any weapon skill with the exception of Martial Arts or Brawling, or begin a new combat skill at +2. ";
                // 10 Find a Combat Teacher. Add+ 1 to any weapon skill with the exception of Martial Arts or Brawling, or begin a new combat skill at +2.
            }
        } else {
            let roll = d10() + 1;
            let disaster = "";
            if (roll == 1) {
                let lost = (d10() + 1) * 100;
                disaster = `you lost ${lost} Eurodollars.  If you can't pay it now, you have a debt to pay in cash or blood. `;
            } else if (roll == 2) {
                let length = d10() + 1;
                disaster =
                    "you were " +
                    (coinflip() ? "held hostage" : "in prison") +
                    " for " +
                    length +
                    " month" +
                    (length > 1 ? "s" : "") +
                    ". ";
            } else if (roll == 3) {
                disaster =
                    "you contracted " +
                    (coinflip() ? "an illness" : "a drug habit") +
                    "  in this time and lost 1 pt of REF permanently as a result. ";
            } else if (roll == 4) {
                let roll2 = d10() + 1;
                if (roll2 < 3) {
                    disaster = "you were blackmailed.";
                } else if (roll2 < 7) {
                    disaster = "a secret was exposed.";
                } else {
                    disaster = "you were betrayed by a close friend in ";
                    disaster += coinflip() ? "romance" : "business";
                }
            } else if (roll == 5) {
                let roll2 = d10() + 1;
                disaster = "you had a terrible accident. ";
                if (roll2 <= 4) {
                    disaster +=
                        "You were terribly disfigured and must subtract 5 from your Attractiveness.";
                } else if (roll2 <= 6) {
                    let months = d10() + 1;
                    disaster +=
                        "You were hospitalized for " +
                        months +
                        " month" +
                        (months > 1 ? "s" : "") +
                        ".";
                } else if (roll2 <= 8) {
                    let months = d10() + 1;
                    disaster +=
                        "You lost " +
                        months +
                        " month" +
                        (months > 1 ? "s" : "") +
                        " of memory.";
                } else {
                    disaster +=
                        "You constantly relive nightmares of the accident.";
                }
            } else if (roll == 6) {
                let person = [
                    "lover",
                    "lover",
                    "friend",
                    "friend",
                    "relative",
                    "relative"
                ][d6()];
                disaster = `you lost a ${person} you really cared about. `;
                let how = d10() + 1;
                if (how <= 5) {
                    disaster += "They died accidentally. ";
                } else if (how <= 8) {
                    disaster += "They were murdered by unknown parties. ";
                } else {
                    disaster +=
                        "They were murdered and you know who did it.  You just need the proof. ";
                }
            } else if (roll == 7) {
                let roll2 = d10();
                disaster = "you were set up. You were accused of ";
                if (roll2 < 3) {
                    disaster += "theft. ";
                } else if (roll2 < 5) {
                    disaster += "cowardice. ";
                } else if (roll2 < 8) {
                    disaster += "murder. ";
                } else if (roll2 == 9) {
                    disaster += "lying. ";
                } else {
                    disaster += "betrayal. ";
                }
            } else if (roll == 8) {
                let roll2 = d10();
                disaster = "you were hunted by ";
                if (roll2 < 3) {
                    disaster += "a couple of local cops.";
                }
                if (roll2 < 6) {
                    disaster += "the entire local police force.";
                }
                if (roll2 < 8) {
                    disaster += "the state police.";
                } else {
                    disaster += "the FBI or equivalent national police force.";
                }
            } else if (roll == 9) {
                disaster =
                    "you angered some corporate honcho and were hunted by a ";
                let roll2 = d10() + 1;
                if (roll2 < 3) {
                    disaster += "small, local firm.";
                }
                if (roll2 < 6) {
                    disaster += "larger corp with offices statewide.";
                }
                if (roll2 < 8) {
                    disaster +=
                        "big, national corp with agents in major cities nationwide.";
                } else {
                    disaster +=
                        "huge multinational with armies, ninjas, and spies everywhere.";
                }
            } else {
                let roll2 = d10() + 1;
                if (roll2 < 3) {
                    disaster =
                        "you developed some type of nervous disorder, propbably from a bioplague (-1 REF).";
                }
                if (roll2 < 7) {
                    disaster =
                        "you developed some kind of mental problem; you suffer anxiety attacks and phobias (-1 COOL).";
                } else {
                    disaster =
                        "you developed a major psychosis.  You hear voices, are violent, irrational, depressive (-1 COOL, -1 REF";
                }
            }

            //what ya going to do about it!?

            roll = d10() + 1;
            let whatDo = "Now, you've got to ";
            if (roll <= 2) {
                whatDo += "clear your name. ";
            } else if (roll <= 4) {
                whatDo += "live it down and try to forget it. ";
            } else if (roll <= 6) {
                whatDo += "hunt down those responsible and make them pay! ";
            } else if (roll <= 8) {
                whatDo += "get what's rightfully yours. ";
            } else {
                whatDo +=
                    "save, if possible, anyone else involved in the situation. ";
            }

            result += disaster + " " + whatDo + " ";
        }
        return result;
    }
    function makeAFriend() {
        let gender = d10() % 2 ? "female" : "male";
        let name = RandomName({
            random: Math.random,
            seed: "Friend",
            gender: gender
        });

        let result = `you made a <b>friend</b>, ${name}. ${
            gender == "male" ? "He" : "She"
        } `;
        result +=
            [
                "is like a big " +
                    (gender == "male" ? "brother" : "sister") +
                    " to you",
                "is like a kid " +
                    (gender == "male" ? "brother" : "sister") +
                    " to you",
                "is a teacher or mentor",
                "is a partner or co-worker",
                "is an old lover",
                "is an old enemy",
                "is like a foster parent to you",
                "is a relative",
                "is an old, childhood friend",
                "met you through a common interest"
            ][d10()] + ". ";

        friends[name] = getStyleAndOrigin() + " " + motivation();

        return result;
    }
    function makeAnEnemy() {
        let gender = d10() % 2 ? "female" : "male";
        let name = RandomName({
            random: Math.random,
            seed: "Enemy",
            gender: gender
        });
        let he = gender == "male" ? "He" : "She";
        let him = gender == "male" ? "Him" : "Her";
        let his = gender == "male" ? "His" : "Hers";
        let brother = gender == "male" ? "Brother" : "Sister";

        let result = `you made an <b>enemy</b>, ${name}. ${he}'s `;
        result +=
            [
                "an Ex friend ",
                "an Ex lover ",
                "a Relative ",
                "a Childhood enemy ",
                "a Person working for you ",
                "a Person you work for ",
                "a Partner or co-worker ",
                "a Booster gang member ",
                "a Corporate Exec ",
                "a Government Official "
            ][d10()] + ". ";

        result +=
            "This emnity started when one of you " +
            [
                "caused the other to lose face or status",
                "caused the loss of a lover, friend or relative",
                "caused a major humllitiation",
                "accused the other of cowardice or some other personal flaw ",
                "caused a physical disability: " +
                    ["lost an eye", "lost an arm", "badly scarred"][
                        Math.floor(d6() / 2)
                    ],
                "deserted or betrayed the other",
                "turned down other's offer of job or romantic involvement ",
                "just didn't like the other",
                "was a romantic rival",
                "foiled a plan of the other"
            ][d10()] +
            ". ";

        result += [
            he + " hates you. ",
            he + " hates you. ",
            "You hate " + him.toLowerCase() + ". ",
            "You hate " + him.toLowerCase() + ". ",
            "The feeling's mutual. ",
            "The feeling's mutual. "
        ][d6()];

        result +=
            "If the two of you met face to face, the injured party would most likely " +
            [
                `go into a murderous, killing rage and rip ${his.toLowerCase()} face off. `,
                "avoid the scum. ",
                `backstab ${him.toLowerCase()} indirectly. `,
                "ignore the scum. ",
                `rip into ${him.toLowerCase()} verbally. `
            ][Math.floor(d10() / 2)];

        result +=
            `What can ${he.toLowerCase()} throw against you? ` +
            [
                `Just ${him.toLowerCase()}self. `,
                `Just ${him.toLowerCase()}self. `,
                `Just ${him.toLowerCase()}self. `,
                `${him}self and a few friends. `,
                `${him}self and a few friends. `,
                `An entire Gang. `,
                `An entire Gang. `,
                `A small Corporation. `,
                `A large Corporation. `,
                `An entire Government Agency. `
            ][d10()];

        enemies[name] = getStyleAndOrigin() + " " + motivation();

        return result;
    }
    function romanticInvolvement() {
        let result = "";
        let roll = d10() + 1;

        let name = RandomName({ random: Math.random, seed: "Lover" });
        let lover_style = getStyleAndOrigin() + " " + motivation();
        let feelings = [
            "they still love you. ",
            "you still love them. ",
            "you still love each other. ",
            "you hate them. ",
            "they hate you. ",
            "you hate each other. ",
            "you're friends. ",
            "there's no feelings either way; it's over. ",
            "you like them, they hate you. ",
            "they like you, you hate them. "
        ];
        if (roll <= 4) {
            result =
                "you had a happy love affair. Their name was " + name + ". ";
            result += "Now that it's over, " + feelings[d10()];
            lovers[name] = lover_style;
        } else if (roll == 5) {
            result =
                "you had a tragic love affair. Their name was " +
                name +
                " but ";
            lovers[name] = lover_style;
            let roll2 = d10();
            result += [
                "they died in accident.",
                "they mysteriously vanished.",
                "it didn't work out.",
                "a personal goal or vendetta came between you.",
                "they were kidnapped.",
                "they went Insane.",
                "they committed suicide.",
                "they were killed in a fight.",
                "a rival cut you out of the action.",
                "they were imprisoned or exiled."
            ][roll2];

            if (roll2 != 0 && roll2 != 6 && roll2 != 7) {
                result += " As far as you know, " + feelings[d10()];
            }
        } else if (roll <= 7) {
            result =
                "you had a love affair, but it had problems. Their name was " +
                name +
                ". ";
            lovers[name] = lover_style;
            let friends = coinflip()?"friends":"family";
            let you = coinflip()?"You":"They"
            result += [
                `Your lover's ${friends} hate you `,
                `Your lover's ${friends} would use any means to get rid of you `,
                `Your ${friends} hate your lover `,
                `${you} had a romantic rival `,
                `You were separated in some way `,
                `You fought constantly `,
                `You're professional rivals `,
                `${you} were insanely jealous `,
                `${you} were "messing around" `,
                `You have conflicting backgrounds and familes `
            ][d10()];

            result += "and now that it's over " + feelings[d10()] + " ";

        } else {
            result = "you had fast affairs and hot dates. ";
        }
        return result;
    }
}

let friends = {};
let enemies = {};
let lovers = {};
</script>
