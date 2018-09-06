<?php

class Project extends RabbitORM\Model {
	var $table = "projects";

	const UserDefinition = '{"name": "projects", "table": "projects"}';

	private $id;
	const idDefinition = '{"name": "id", "column": "id", "primaryKey": "true"}';

	private $title;
	const titleDefinition = '{"name": "title", "column": "title"}';

	private $description;
	const descriptionDefinition = '{"name": "description", "column": "description"}';


}


?>
