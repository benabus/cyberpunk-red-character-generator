import Database from "@/database";
import CryptoJS from "crypto-js";
import RandomName from "node-random-name";
// console.debug(Database);

function random(max, min) {
    max = max || 1;
    min = min || 0;
    return Math.floor(Math.random() * max + min);
}

function getRandom(database, sub) {
    let item = undefined;
    try {
        let d = Database[database] || Database[database + "s"];
        if(sub)
        {
            d = d[sub];
        }
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
    // console.debug(item);
    return item;
}

function setHas(set, name) {
    for (let item in set) {
        if (item.name == name) {
            return true;
        }
    }
    return false;
}

function Character(settings) {
    let return_obj = {};
    if (typeof settings == "string") {
        return_obj = this.decode64(settings);
    } else {
        settings = settings || {};
        let role = settings.role || getRandom("roles");

        let name = RandomName();

        let stats = {};
        // console.debug(Database.role_stats[role]);
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
        } else {
            let role_stats = Database.role_stats[role];
            let roll = random(role_stats.length - 1);
            // console.debug(roll);
            stats = role_stats[roll];
        }

        let weapon_count = random(3);
        let skill_count = random(12);
        let cyberware_count = random(3);
        let gear_count = random(6,1);
        // console.debug(role, cyberware_count);

        let starting_hits = Math.ceil(stats.body * 5);
        let seriously_wounded = Math.ceil(stats.body * 2.5);
        let death_save = stats.body;
        let reputation = random(10, 1);

        let skills_set = new Set();
        let skill_names = Object.keys(Database.skills);
        if (role == "Netrunner") {
            skills_set.add("Interface");
        }
        while (skills_set.size < skill_count) {
            let skill_name = skill_names[random(skill_names.length - 1)];
            if (skill_name == "Interface") {
                continue;
            }
            skills_set.add(skill_name);
        }
        let skills = [...skills_set].map(skill_name => {
            let skill = Database.skills[skill_name];
            skill.modifier = random(10, 1);
            return skill;
        });
        skills = skills.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );

        // let gear_set = new Set();
        // let gear_names = Object.keys(Database.gear);
        // // if (role == "Netrunner") {
        // //     gear_set.add("Interface");
        // // }
        // while (gear_set.size < gear_count) {
        //     let gear_name = gear_names[random(gear_names.length - 1)];
        //     // if (gear_name == "Interface") {
        //     //     continue;
        //     // }
        //     gear_set.add(gear_name);
        // }
        // let gear = [...gear_set].map(gear_name => {
        //     let item = Database.gear[gear_name];
        //     // item.modifier = random(10, 1);
        //     return item;
        // });
        // gear = gear.sort((a, b) =>
        //     a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        // );


        let cyberware_set = new Set();
        let cyberware_names = Object.keys(Database.cyberware);
        if (role == "Netrunner") {
            cyberware_set.add("Interface Plugs");
        }
        if (role == "Solo") {
            cyberware_count += 1;
        }
        while (cyberware_set.size < cyberware_count) {
            let cyberware_name =
                cyberware_names[random(cyberware_names.length - 1)];
            if (cyberware_name == "Interface Plugs") {
                continue;
            }
            cyberware_set.add(cyberware_name);
        }

        let armor = {
            head: getRandom("armor"),
            body: getRandom("armor")
        };

        // let weapons_set = new Set();
        let weapons = [];
        for (let i = 0; i < weapon_count; i++) {
            weapons.push(getRandom("weapons"));

            if (weapons[i].cyber) {
                cyberware_set.add("Cyberarm");
            }

            // weapons_set.add(weapons[i].name);
        }

        if (cyberware_set.has("Cyberarm")) {
            if (!setHas(weapons, "Cyberarm")) {
                let ca = Database.weapons["Cyberarm"];
                ca.name = "Cyberarm";
                weapons.push(ca);
            }
        }

        let cyberware = [...cyberware_set].map(cyberware_name => {
            let cyberware = Database.cyberware[cyberware_name];
            cyberware.name = cyberware_name;
            return cyberware;
        });

        cyberware = cyberware.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        weapons = weapons.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );


        // let gear = [];
        let gear_set = new Set();
        gear_set.add("Agent");
        if(role == "Netrunner")
        {
            gear_set.add("Cyberdeck & Cables");
            gear_set.add("Programs");
            gear_set.add("Black ICE");
            // gear.push({...Database.gear["Cyberdeck & Cables"], name: "Cyberdeck & Cables"});
            // gear.push({... Database.gear["Programs"], name: "Programs"});
            // gear.push({... Database.gear["Black ICE"], name: "Black ICE"});
        }
        while(gear_set.size < gear_count)
        {
            let item = (getRandom("gear"));
            if(item.role && item.role != role)
            {
                continue;
            }
            gear_set.add(item.name);
        }
        let gear = [...gear_set].map(gear_name => {
            let gear = Database.gear[gear_name];
            gear.name = gear_name;
            return gear;
        });
        gear = gear.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );



        let number_of_friends = random(10, 1) - 7;
        let number_of_enemies = random(10, 1) - 5;

        let lifepath = {
            background: getRandom("background"),
            motivation: getRandom("motivation"),
            goals: getRandom("goals"),
            friends: [],
            enemies: [],
            romance: getRandom("romance"),
            personality: getRandom("personality")
        };

        for (let i = 0; i < number_of_friends; i++) {
            lifepath.friends.push(getRandom("friends"));
        }
        for (let i = 0; i < number_of_enemies; i++) {
            lifepath.enemies.push(getRandom("enemies"));
        }

        let appearance = {
            clothes: getRandom("appearance", "Clothes"),
            hair: getRandom("appearance", "Hairstyle"),
            affectations: getRandom("appearance", "Affectations"),
            origin: getRandom("appearance", "Origins")
        };

        return_obj = {
            name,
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
            lifepath,
            reputation,
            appearance
        };
    }
    console.debug(return_obj);
    for (let attr in return_obj) {
        this[attr] = return_obj[attr];
    }

    // console.debug(this);
    // console.debug(return_obj);
    // return return_obj;
}

Character.prototype.toString = function() {
    return JSON.stringify(this);
};
Character.prototype.encode64 = function() {
    //encrypt
    let rawStr = JSON.stringify(this);
    let wordArray = CryptoJS.enc.Utf8.parse(rawStr);
    let base64 = CryptoJS.enc.Base64.stringify(wordArray);
    return base64;
};
Character.prototype.decode64 = function(base64) {
    //decrypt
    try {
        let parsedWordArray = CryptoJS.enc.Base64.parse(base64);
        let parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
        return JSON.parse(parsedStr);
    } catch (err) {
        console.error(err);
        return {};
    }
};

export default Character;
