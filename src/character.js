import Database from "@/database";
// console.debug(Database);

function random(max, min) {
    max = max || 1;
    min = min || 0;
    return Math.floor(Math.random() * max + min);
}

function getRandom(database) {
    let item = undefined;
    try {
        let d = Database[database] || Database[database + "s"];
        if (d.length) {
            let index = random(d.length);
            item = d[index];
        } else if (typeof d == "object") {
            let keys = Object.keys(d);
            let key = keys[random(keys.length)];
            item = {
                name: key,
                ...d[key]
            };
        }
    } catch (e) {
        console.error(e);
    }
    return item;
}

const Character = function() {
    let return_obj = {};

    let role = ROLES[random(ROLES.length)];
    let stats = {};
    if (role == "None" || Database.role_stats[role].length == 0) {
        stats = {
            int: random(10, 1),
            ref: random(10, 1),
            dex: random(10, 1),
            tech: random(10, 1),
            cool: random(10, 1),
            will: random(10, 1),
            luck: random(10, 1),
            move: random(10, 1),
            body: random(10, 1),
            emp: random(10, 1)
        };
    }
    else
    {
        let role_stats = Database.role_stats[role];
        let roll = random(role_stats.length-1);
        console.debug(roll);
        stats = role_stats[roll];
    }

    let starting_hits = Math.ceil(stats.body * 5);
    let seriously_wounded = Math.ceil(stats.body * 2.5);
    let death_save = stats.body;

    let skills = [];
    let armor = {
        head: getRandom("armor"),
        body: getRandom("armor")
    };

    let weapons = [];
    for (let i = 0; i < random(3); i++) {
        weapons.push(getRandom("weapons"));
    }

    let cyberware = [];
    let gear = [];
    let lifepath = {
        background: "",
        motivation: "",
        goals: "",
        friends: "",
        enemies: "",
        romance: "",
        personality: ""
    };

    return_obj = {
        role,
        stats,
        starting_hits,
        seriously_wounded,
        death_save,
        skills,
        armor,
        weapons,
        cyberware,
        gear,
        lifepath
    };

    return return_obj;
};

export default Character;

const ROLES = [
    "None",
    "Rockerboy",
    "Solo",
    "Netrunner",
    "Tech",
    "Media",
    "Lawman",
    "Exec",
    "Fixer",
    "Nomad",
    "Street Scum",
    "Booster",
    "Private Security"
];
