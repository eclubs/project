<?php

class Project extends RabbitORM\Model {
	var $table = "projects";

	const ProjectDefinition = '{"name": "projects", "table": "projects"}';

	private $id;
	const idDefinition = '{"name": "id", "column": "id", "primaryKey": "true"}';

	private $type;
	const typeDefinition = '{"name": "type", "column": "type"}';

	private $title;
	const titleDefinition = '{"name": "title", "column": "title"}';

	private $department;
	const departmentDefinition = '{"name": "department", "column": "department"}';

	private $researchfield;
	const researchfieldDefinition = '{"name": "researchfield", "column": "researchfield"}';

	private $secondfield;
	const secondfieldDefinition = '{"name": "secondfield", "column": "secondfield"}';

	private $thirdfield;
	const thirdfieldDefinition = '{"name": "thirdfield", "column": "thirdfield"}';

	private $term;
	const termDefinition = '{"name": "term", "column": "term"}';

	private $year;
	const yearDefinition = '{"name": "year", "column": "year"}';

	private $compensation_type;
	const compensation_typeDefinition = '{"name": "compensation_type", "column": "compensation_type"}';

	private $url;
	const urlDefinition = '{"name": "url", "column": "url"}';

	private $description;
	const descriptionDefinition = '{"name": "description", "column": "description"}';

	private $prof_email;
	const prof_emailDefinition = '{"name": "prof_email", "column": "prof_email"}';

	private $prerequisite;
	const prerequisiteDefinition = '{"name": "prerequisite", "column": "prerequisite"}';

	private $background;
	const backgroundDefinition = '{"name": "background", "column": "background"}';

	private $capacity;
	const capacityDefinition = '{"name": "capacity", "column": "capacity"}';

	private $prof_id;
	const prof_idDefinition = '{"name": "prof_id", "column": "prof_id"}';

	private $creation_time;
	const creation_timeDefinition = '{"name": "creation_time", "column": "creation_time"}';
}


?>
