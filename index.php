<?php
define('BASEPATH', 1);
define('ENVIRONMENT', 'development');

include 'protected/application/config/database.php';

/*$mysqli = new mysqli($db['default']['hostname'],$db['default']['username'],$db['default']['password'],$db['default']['database']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$res = $mysqli->query("SELECT html FROM dyn_pages where view = 'landing'");
$row = $res->fetch_assoc();
$landing = $row['html'];

$res = $mysqli->query("SELECT login_link FROM global_settings");
$row = $res->fetch_assoc();
$doShowLoginLink = $row['login_link'];

if ($doShowLoginLink) {
    $loginLink = '<a href ="/protected/index.php/curis">Enter</a>';
}
else {
    $loginLink = 'Login currently disabled';
}*/
?>

<html>
	<head>
		<title>Stanford CS Research</title>
        <link type="text/css" rel="stylesheet" href="/themes/curis.css" />
        <script type="text/javascript">
            /*function fa() {
                var indexMain = document.getElementById('index-main');
                indexMain.classList.toggle('fade');
            }*/
        </script>
	</head>
	<body>

        <div id="brand-bar">
            <a href="https://www.stanford.edu/" class="su-brand" id="header--wordmark">Stanford CS Research</a>
        </div>

        <div id="index-main">
            <div class="app-div">
                <a class="app" href="/protected/index.php">
                    <img src="themes/images/academicYearResearchLogo.png"/>
                    <div><span class="name">Academic Year Research</span></div>
                </a>
            </div>
            <div class="app-div">
                <a class="app" href="/protected/index.php">
                    <img src="themes/images/curis_logo_small.png"/>
                    <div><span class="name">CURIS</span></div>
                </a>
            </div>
            <div class="app-div">
                <a class="app" href="/protected/index.php?">
                    <img src="themes/images/projects2.png"/>
                    <div><span class="name">Post Projects</span></div>
                </a>
            </div>
        </div>

	</body>
</html>