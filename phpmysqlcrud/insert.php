<?php
// Include config file
ini_set('display_errors',1); error_reporting(E_ALL);
require_once "config.php";
 
// Define variables and initialize with empty values
$name = $address = $department = $position = $salary = "";
$name_err = $address_err = $department_err = $position_err = $salary_err = "";
 
// Processing form data when form is submitted
// if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate name
    $input_name = trim($_REQUEST["name"]);
    if(empty($input_name)){
        $name_err = "Please enter a name.";
    } elseif(!filter_var($input_name, FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))){
        $name_err = "Please enter a valid name.";
    } else{
        $name = $input_name;
    }
    
    // Validate address
    $input_address = trim($_REQUEST["address"]);
    if(empty($input_address)){
        $address_err = "Please enter an address.";     
    } else{
        $address = $input_address;
    }

    // Validate department
    $input_dept = trim($_REQUEST["department"]);
    if(empty($input_dept)){
        $department_err = "Please select a department.";     
    } else{
        $department = $input_dept;
    }

    // Validate position
    $input_position = trim($_REQUEST["position"]);
    if(empty($input_position)){
        $position_err = "Please enter a position.";     
    } else{
        $position = $input_position;
    }
    
    // Validate salary
    $input_salary = trim($_REQUEST["salary"]);
    if(empty($input_salary)){
        $salary_err = "Please enter the salary amount.";     
    } elseif(!ctype_digit($input_salary)){
        $salary_err = "Please enter a positive integer value.";
    } else{
        $salary = $input_salary;
    }
    
    // Check input errors before inserting in database
    if(empty($name_err) && empty($address_err) && empty($department_err) && empty($position_err) && empty($salary_err)){
        // Prepare an insert statement
        $sql = "INSERT INTO employees (name, address, department, position, salary) VALUES (?, ?, ?, ?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sss", $param_name, $param_address, $param_dept, $param_position, $param_salary);
            
            // Set parameters
            $param_name = $name;
            $param_address = $address;
            $param_dept = $department;
            $param_position = $position;
            $param_salary = $salary;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Records created successfully. Redirect to landing page
                // header("location: index.php");
                echo "Record submitted";
                exit();
            } else{
                echo "Something went wrong. Please try again later.";
            }
        }
         
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
// }
?>
 