<?php

class Test_entity extends RabbitORM\Model {
	var $table = "test_entities";

	const Test_entityDefinition = '{"name": "Test_entities", "table": "test_entities"}';

	private $id;
	const idDefinition = '{"name": "id", "column": "id", "primaryKey": "true"}';

	private $name;
	const nameDefinition = '{"name": "name", "column": "name"}';

	/*public getIdUser() {
    }*/

}

?>
