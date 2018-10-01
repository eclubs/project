<?php

class Login extends RabbitORM\Model {
	var $table = "logins";

	const LoginDefinition = '{"name": "logins", "table": "logins"}';

	private $id;
	const idDefinition = '{"name": "id", "column": "id", "primaryKey": "true"}';

	private $name;
	const nameDefinition = '{"name": "name", "column": "name"}';

	private $sunetid;
	const sunetidDefinition = '{"name": "sunetid", "column": "sunetid"}';

}

?>
