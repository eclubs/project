<?php

class Dyn_page extends RabbitORM\Model {
	var $table = "dyn_pages";

	const Dyn_pageDefinition = '{"name": "dyn_pages", "table": "dyn_pages"}';

	private $view;
	const viewDefinition = '{"name": "view", "column": "view"}';

	private $html;
	const htmlDefinition = '{"name": "html", "column": "html"}';


}

?>
