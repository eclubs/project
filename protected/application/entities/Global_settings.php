<?php

class Global_settings extends RabbitORM\Model
{
    var $table = "global_settings";

    const Global_settingsDefinition = '{"name": "users", "table": "global_settings"}';

    private $fac_edit_proj;
    const fac_edit_projDefinition = '{"name": "fac_edit_proj", "column": "fac_edit_proj"}';
    private $login_link;
    const login_linkDefinition = '{"name": "login_link", "column": "login_link"}';
    private $fac_assn_asst;
    const fac_assn_asstDefinition = '{"name": "fac_assn_asst", "column": "fac_assn_asst"}';
    private $fac_rate_stud;
    const fac_rate_studDefinition = '{"name": "fac_rate_stud", "column": "fac_rate_stud"}';
    private $stud_edit_prof;
    const stud_edit_profDefinition = '{"name": "stud_edit_prof", "column": "stud_edit_prof"}';
    private $stud_see_proj;
    const stud_see_projDefinition = '{"name": "stud_see_proj", "column": "stud_see_proj"}';
    private $stud_apply;
    const stud_applyDefinition = '{"name": "stud_apply", "column": "stud_apply"}';
    private $stud_accept;
    const stud_acceptDefinition = '{"name": "stud_accept", "column": "stud_accept"}';
    private $app_stage;
    const app_stageDefinition = '{"name": "app_stage", "column": "app_stage"}';
    private $fac_see_matches;
    const fac_see_matchesDefinition = '{"name": "fac_see_matches", "column": "fac_see_matches"}';
    private $message_misc;
    const message_miscDefinition = '{"name": "message_misc", "column": "message_misc"}';
    private $message_match;
    const message_matchDefinition = '{"name": "message_match", "column": "message_match"}';
}

?>
