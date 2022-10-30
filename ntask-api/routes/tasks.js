module.exports = app => {
	const Tasks = app.models.tasks;

	app.get("/", (req, res) => {
		res.json({ status: "NTask API" });
	});

	app.get("/tasks", async (req, res) => {
		try {
			const tasks = await Tasks.findAll();
			res.json({ tasks });
		} catch (error) {
			res.status(500).json(error);			
		}
	});
}