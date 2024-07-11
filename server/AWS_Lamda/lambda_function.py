import sys, io, subprocess, json

def execute_python_code(code):
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()

    try:
        exec(code)
        output = output_capture.getvalue()
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

def execute_java_code(code):
    try:
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
    
def handler(event, context):
    language = event.get('language')
    print(language)
    if language == 'python': 
        result = execute_python_code(event.get('code'))
    elif language == 'java':
        result = execute_java_code(event.get('code'))
    elif language == 'javascript':
        result = execute_js_code(event.get('code'))
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


