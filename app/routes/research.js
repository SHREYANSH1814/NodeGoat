const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require("needle");
const {
    environmentalScripts
} = require("../../config/config");

function ResearchHandler(db) {
    "use strict";

    const researchDAO = new ResearchDAO(db);

    this.displayResearch = (req, res) => {

        if (req.query.symbol) {
            // Validate and sanitize inputs
            const symbol = req.query.symbol;
            const urlBase = req.query.url;

            // Basic validation: symbol should be alphanumeric and urlBase should be a known safe base URL
            const symbolRegex = /^[a-zA-Z0-9]+$/;
            const allowedUrlBases = ["https://example.com/api/", "https://api.example.org/"];

            if (!symbolRegex.test(symbol) || !allowedUrlBases.includes(urlBase)) {
                res.status(400).send("Invalid parameters");
                return;
            }

            const url = urlBase + symbol;
            return needle.get(url, (error, newResponse, body) => {
                if (!error && newResponse.statusCode === 200) {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                }
                res.write("<h1>The following is the stock information you requested.</h1>\n\n");
                res.write("\n\n");
                if (body) {
                    res.write(body);
                }
                return res.end();
            });
        }

        return res.render("research", {
            environmentalScripts
        });
    };

}

module.exports = ResearchHandler;
