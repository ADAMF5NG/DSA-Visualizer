import sys, io, subprocess, json

def execute_python_code(code):
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()

    try:
        exec(code)
        output = output_capture.getvalue()
        print('out of the code', output)
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

def execute_java_code(code):
    try:
        print('this is the code that we have received', code)
        with open('/tmp/Main.java', 'w') as java_file:
            java_file.write(code)
        
        compile_result = subprocess.run(
            ['javac', '/tmp/Main.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        print('Compilation result:', compile_result.returncode)
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()
        
        run_result = subprocess.run(
            ['java', '-classpath', '/tmp', 'Main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        if run_result.returncode != 0:
            return run_result.stderr.decode()
        
        print('Run result:', run_result.returncode)
        return run_result.stdout.decode()
    except Exception as e:
        return str(e)
    
def execute_js_code(code):
    try:
        print('Code:', code)
        with open('/tmp/script.js', 'w') as js_file:
            js_file.write(code)
            
        run_result = subprocess.run(
            ['node', '/tmp/script.js'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        if run_result.returncode != 0:
            return run_result.stderr.decode()
        
        return run_result.stdout.decode()
    except Exception as e:
        return str(e)
    
def execute_csharp_code(code):
    try:
        # Create and write the C# code to a file
        with open('/tmp/Program.cs', 'w') as cs_file:
            cs_file.write(code)
        
        # Create a new .NET console project
        project_creation_result = subprocess.run(
            ['dotnet', 'new', 'console', '--output', '/tmp/ConsoleApp', '--force'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        if project_creation_result.returncode != 0:
            return project_creation_result.stderr.decode()

        # Write the C# code to the project file
        with open('/tmp/ConsoleApp/Program.cs', 'w') as cs_file:
            cs_file.write(code)
        
        # Compile the C# project
        compile_result = subprocess.run(
            ['dotnet', 'build', '/tmp/ConsoleApp'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        # Run the compiled project
        run_result = subprocess.run(
            ['dotnet', 'run', '--project', '/tmp/ConsoleApp'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        if run_result.returncode != 0:
            return run_result.stderr.decode()
        
        return run_result.stdout.decode()
    except Exception as e:
        return str(e)
        

def handler(event, context):
    print("Received event: " + json.dumps(event))
    ran_code = ""

    if 'body' in event:
        # Event from API Gateway or similar
        body = json.loads(event['body'])
    else:
        # Direct invocation event
        body = event

    language = body.get('language')
    code = body.get('code')
    
    if language == 'python':
        ran_code = execute_python_code(code)
    elif language == 'javascript':
        ran_code = execute_js_code(code)
    elif language == 'java':
        ran_code = execute_java_code(code)
    elif language == 'csharp':
        ran_code = execute_csharp_code(code)
    else:
        ran_code = "Unsupported language"

    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body": json.dumps({
            "message": ran_code
        }),
    }

    return response


