const https = require("https");
const fs = require("fs");

const certs = {
	key: fs.readFileSync("ntask.key", "utf-8"),
	cert: fs.readFileSync("ntask.cert", "utf-8")
};

module.exports = app => {
	async function start(port) {
		try {
			await app.db.authenticate();
			await app.db.sync();
			if(process.env.NODE_ENV !== "test") {
				const server = https.createServer(certs, app);
				server.listen(port, () => {
					console.log(`NTask API - porta ${port}`);
				});
			}
		} catch(error) {
			console.log("Erro de conexão com banco de dados");
			console.error(error);
		}
	}
	start(app.get("port"));
}