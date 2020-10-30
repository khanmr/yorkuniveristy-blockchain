
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Record</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        .wrapper{
            width: 500px;
            margin: 0 auto;
        }
    </style>
<script>
function insrecord() {
    // if (str.length == 0) { 
    //     document.getElementById("txtsuccess").innerHTML = "";
    //     return;
    // } else {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("txtsuccess").innerHTML = this.responseText;
        }
    };
    name = document.getElementById("name").value;
    address = document.getElementById("address").value;
    department = document.getElementById("department").value;
    position = document.getElementById("position").value;
    salary = document.getElementById("salary").value;
    str="name="+name+"&address="+address+"&department="+department+"&position="+position+"&salary="+salary;
    xmlhttp.open("GET", "insert.php?" + str, true);
    xmlhttp.send();
    // }
}
</script>
</head>
<body>
    <div class="wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="page-header">
                        <h2>Create Record</h2>
                    </div>
                    <span id="txtsuccess" style="color:green"></span></p>
                    <p>Please fill this form and submit to add employee record to the database.</p>
                    <!-- <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post"> -->
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" id="name" class="form-control" value="">
                            <!-- <span class="help-block"><?php echo $name_err;?></span> -->
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <textarea name="address" id="address" class="form-control"></textarea>
                            <!-- <span class="help-block"><?php echo $address_err;?></span> -->
                        </div>
                        <div class="form-group">
                            <label for="department">Department</label>
                            <select name="department" id="department">
                                <option value="finance">Finance</option>
                                <option value="it">IT</option>
                                <option value="operations">Operations</option>
                            </select>
                            <!-- <span class="help-block"><?php echo $department_err;?></span> -->
                        </div>
                        <div class="form-group">
                            <label>Position</label>
                            <textarea name="position" id="position" class="form-control"></textarea>
                            <!-- <span class="help-block"><?php echo $position_err;?></span> -->
                        </div>
                        <div class="form-group">
                            <label>Salary</label>
                            <input type="text" id="salary" name="salary" class="form-control" value="">
                            <!-- <span class="help-block"><?php echo $salary_err;?></span> -->
                        </div>
                        <input type="button" class="btn btn-primary" value="Submit" onclick="insrecord();">
                        <a href="index.php" class="btn btn-default">Cancel</a>
                    <!-- </form> -->
                </div>
            </div>        
        </div>
    </div>
</body>
</html>