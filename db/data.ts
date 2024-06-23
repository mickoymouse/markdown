import * as fs from "fs";
import * as path from "path";

interface Data {
	id: string;
	name: string;
	created_at: string;
	content: string;
}

const dataPath = path.join(process.cwd(), "db/data.json");

const jsonData = fs.readFileSync(dataPath, "utf-8");
const data: Data[] = JSON.parse(jsonData);

export default data;
