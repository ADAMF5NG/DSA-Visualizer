import sys, io, subprocess

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
        with open('/tmp/Main.java', 'a') as java_file:
            java_file.write(code)
        
        compile_result = subprocess.run(
            ['java', '/tmp/Main.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        print('Compilation result:', compile_result.returncode)
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()
        
        run_result = subprocess.run(
            ['java', '-classpath', '/tmp', 'Main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        print('Run result:', run_result.returncode)
        return run_result.stdout.decode()
    except Exception as e:
        return str(e)
        

def handler(event, context):
    language = event.get('language', 'python')
    if language == 'python': 
        result = execute_python_code(event.get('code'))
    elif language == 'java':
        result = execute_java_code(event.get('code'))
    else:
        result = 'unsupported language' + language

    return {
        'statusCode': 200,
        'body': result,
    }