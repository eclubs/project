<?php

class Application extends RabbitORM\Model {
	var $table = "applications";

	const ApplicationDefinition = '{"name": "applications", "table": "applications"}';

	private $id;
	const idDefinition = '{"name": "id", "column": "id", "primaryKey": "true"}';

	private $project_id;
	const project_idDefinition = '{"name": "project_id", "column": "project_id"}';

	private $user_id;
	const user_idDefinition = '{"name": "user_id", "column": "user_id"}';

	private $score;
	const scoreDefinition = '{"name": "score", "column": "score"}';

	private $statement;
	const statementDefinition = '{"name": "statement", "column": "statement"}';

	private $topmatch;
	const topmatchDefinition = '{"name": "topmatch", "column": "topmatch"}';

	private $prematch;
	const prematchDefinition = '{"name": "prematch", "column": "prematch"}';

	private $fac_rating1;
	const fac_rating1Definition = '{"name": "fac_rating1", "column": "fac_rating1"}';

	private $fac_rating2;
	const fac_rating2Definition = '{"name": "fac_rating2", "column": "fac_rating2"}';

	private $fac_rating3;
	const fac_rating3Definition = '{"name": "fac_rating3", "column": "fac_rating3"}';

	private $fac_topmatch;
	const fac_topmatchDefinition = '{"name": "fac_topmatch", "column": "fac_topmatch"}';

	private $status;
	const statusDefinition = '{"name": "status", "column": "status"}';
}


?>
