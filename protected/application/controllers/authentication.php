<?php
/**
 * This authentication function is invoked by the CURIS controller for every
 * page request. It validates using Shibboleth-provided information and loads
 * additional user information stored in the CURIS database.
 */

//user sunetid
//$sunetid = getenv("REMOTE_USER");
$sunetid = "llao";

// Warning -- this was not caught before. If you pass a false or empty string to
// the queries below, you get LOTS of matches (select * from users where sunetid = NULL).
/*if(!$sunetid) {
    show_error("SUNetID user variable not found, please report this at https://support.cs.stanford.edu");
}*/

$name = getenv("displayName");
$email = getenv("mail");
$affiliation = getenv("Affiliation");

//Affiliation	member;staff;affiliate
//displayName	Lilian Lao
//eppn	llao@stanford.edu
//mail	llao@cs.stanford.edu
//scope-affiliation	staff@stanford.edu;affiliate@stanford.edu;member@stanford.edu
//uid	llao;llao

/*if (stristr($privelegegrp, "stanford:faculty")) {
    $type = "faculty";
}
else {
    $type = "student";
}*/


//var_dump(new User());

//$class_methods = get_class_methods(new User());
//foreach ($class_methods as $method_name) {
//    echo "$method_name\n";
//}

/*var_dump($this->user);
$class_methods = get_class_methods($this->user);
foreach ($class_methods as $method_name) {
    echo "$method_name\n";
}*/

/*var_dump($this->current_user);
$class_methods = get_class_methods($this->current_user);
foreach ($class_methods as $method_name) {
    echo "$method_name\n";
}*/
$this->current_user = User::where('sunetid', $sunetid)->first();

if (!$this->current_user->sunetid) {
    //print("sunetid not found");
    $this->current_user->sunetid = $sunetid;
    $this->current_user->name = $name;
    $this->current_user->namelf = $namelf;
    $this->current_user->email = $email;
    $this->current_user->type = $type;
    $this->current_user->admin = 0;
    //$this->current_user->save();
}
else {
    //print("sunetid found");
}

//var_dump($this->current_user);

/*$query = $this->db->query("SELECT * FROM assistants WHERE asst_id='{$this->current_user->id}'");
if ($query->num_rows() > 0) {
    $this->current_user->is_assistant = true;
}
else {
    $this->current_user->is_assistant = false;
}*/
?>
