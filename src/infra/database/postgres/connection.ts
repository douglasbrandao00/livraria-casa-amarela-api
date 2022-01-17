import pgp from "pg-promise";

export default class DatabaseConnection {
	pgp: any;
	static instance: DatabaseConnection;

	private constructor () {
		this.pgp = pgp()("postgres://postgres:123456@localhost:5432/app");
	}

	static getInstance () {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new DatabaseConnection();
		}
		return DatabaseConnection.instance;
	}

	async query(statement: string, params: any[]): Promise<any> {
		return this.pgp.query(statement, params);
	}
}
