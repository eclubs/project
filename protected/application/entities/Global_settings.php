<?php

class Global_settings extends RabbitORM\Model {
	var $table = "global_settings";

	const Global_settingsDefinition = '{"name": "users", "table": "global_settings"}';

	private $fac_edit_proj;
	const fac_edit_projDefinition = '{"name": "fac_edit_proj", "column": "fac_edit_proj"}';


	private $login_link;
	const login_linkDefinition = '{"name": "login_link", "column": "login_link"}';

}

?>
