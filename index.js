//#region imports
const clc = require("cli-color");
const _info = require("./general/info.json");
const _express = require("express");
const _app = _express();

//#endregion imports

//#region variables

let sort_by_options = ["id", "reads", "likes", "popularity"];

let direction_options = ["asc", "desc"];

let _map = new Map();

let map_direction = new Map();

//#endregion variables

//#region pre-use 

for (let i = 0; i < sort_by_options.length; i++) {
    _map.set(sort_by_options[i], i);
}

for (let i = 0; i < direction_options.length; i++) {
    map_direction.set(direction_options[i], i);
}

//#endregion pre-use

_app.get("/", (req, res) => {
    res.send("Not found, please use /api/posts");
});

_app.get("/api/posts", (req, res) => {
    let tags_error = {
        error: "tags parameter is required"
    };

    let query = req.query;

    if (query.tags == null) {
        console.log("[ " + clc.red(JSON.stringify(tags_error)) + " ]");
        return res.status(400).json(tags_error);
    }

    async function get_info() {
        try {
            let all_tags = query.tags.toString().split(",");

            let _posts = {
                posts: []
            }

            if (query.tags.length > 0) {
                for (let j = 0; j < _info.posts.length; j++) {
                    for (let i = 0; i < all_tags.length; i++) {
                        if (_info.posts[j].tags.includes(all_tags[i])) {
                            let info = {
                                author: _info.posts[j].author,
                                authorId: _info.posts[j].authorId,
                                id: _info.posts[j].id,
                                likes: _info.posts[j].likes,
                                popularity: _info.posts[j].popularity,
                                reads: _info.posts[j].reads,
                                tags: _info.posts[j].tags
                            }

                            _posts.posts.push(info);
                        }
                    }
                }

                console.log("[ " + clc.greenBright("Done, included " + _posts.posts.length + " posts") + " ]");
            } else {

                let _error = {
                    error: "tags parameter is required"
                };

                console.log("[ " + clc.red("Error, " + _error.error) + " ]");
                return res.status(400).json(_error);
            }

            if (query.sortBy != null) {
                if (query.sortBy.length > 0 && _map.has(query.sortBy)) {
                    _posts.posts.sort((a, b) => {
                        return a[query.sortBy] - b[query.sortBy];
                    });

                    console.log("[ " + clc.greenBright("Done, sorted by " + query.sortBy) + " ]");
                } else {
                    let _error = {
                        error: "sortBy parameter is invalid"
                    };

                    console.log("[ " + clc.red("Error, " + _error.error) + " ]");
                    return res.status(400).json(_error);
                }
            }

            if (query.direction != null) {
                if (query.direction.length > 0 && map_direction.has(query.direction)) {
                    _posts.posts.sort((a, b) => {
                        switch (query.direction) {
                            case "asc":
                                return a[query.sortBy] - b[query.sortBy];
                                break;

                            case "desc":
                                return b[query.sortBy] - a[query.sortBy];
                                break;
                        }
                    });

                    console.log("[ " + clc.greenBright("Done, by " + query.direction) + " ]");
                } else {
                    let _error = {
                        error: "desc parameter is invalid"
                    };

                    console.log("[ " + clc.red("Error, " + _error.error) + " ]");
                    return res.status(400).json(_error);
                }
            }

            res.send(_posts);
            return _posts;
        } catch (err) {
            res.send(err);
        }
    }

    get_info();
});

_app.listen(3000, () => {
    console.log("Starting at http://127.0.0.1:3000");
});