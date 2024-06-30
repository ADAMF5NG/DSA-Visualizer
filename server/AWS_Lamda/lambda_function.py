import sys, io, subprocess, tempfile, os, shutil, time

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
        
        print('Run result:', run_result.returncode)
        return run_result.stdout.decode()
    except Exception as e:
        return str(e)
    
def print_directory_tree(dir_path, indent=''):
    print(indent + os.path.basename(dir_path) + '/')
    indent += '  '
    for item in os.listdir(dir_path):
        item_path = os.path.join(dir_path, item)
        if os.path.isdir(item_path):
            print_directory_tree(item_path, indent)
        else:
            print(indent + item)
    
def run_csharp_code(code):
    try:
        # Create a temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            print("Temporary directory:", temp_dir)

            # Create a new .NET console project
            project_dir = os.path.join(temp_dir, 'csharp_project')
            if not os.path.exists(project_dir):
                os.makedirs(project_dir)

            print("Writing C# code to:", project_dir)

            # Write the C# code to the Program.cs file in the project directory
            program_file_path = os.path.join(project_dir, 'Program.cs')
            with open(program_file_path, 'w') as program_file:
                program_file.write(code)

            # Create a new .NET console project
            subprocess.run(['dotnet', 'new', 'console', '--output', project_dir, '--force'], check=True)

            # Publish the project as a self-contained executable
            print("Publishing project...")
            publish_result = subprocess.run(
                ['dotnet', 'publish', project_dir, '-c', 'Release', '--self-contained', '-r', 'linux-x64'],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                universal_newlines=True, check=True)

            if publish_result.returncode != 0:
                return publish_result.stderr.strip()

            print("Project published successfully.")

            # Determine the path to the compiled executable
            csharp_project = os.path.join(project_dir, 'bin', 'Release', 'net6.0', 'linux-x64', 'csharp_project')

            # Ensure executable has proper permissions (if needed)
            # subprocess.run(['chmod', '-R', '777', csharp_project], check=True)

            # Run the compiled executable
            print("Running the compiled executable...")
            run_result = subprocess.run(
                [csharp_project],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                universal_newlines=True)

            if run_result.returncode != 0:
                return run_result.stderr.strip()

            return run_result.stdout.strip()

    except subprocess.CalledProcessError as e:
        return f"Error compiling or running C# code:\n{e.stderr.strip()}"
    except Exception as e:
        return f"Exception occurred: {str(e)}"
    
def execute_csharp_code(code):
    try:
        project_dir = '/tmp/csharp_project'
        program_file_path = os.path.join(project_dir, 'Program.cs')
        
        start_time = time.time()

        if os.path.exists(project_dir):
            shutil.rmtree(project_dir)
        os.makedirs(project_dir)
        print(f"Setup time: {time.time() - start_time}s")

        start_time = time.time()
        # Create a new .NET console project
        subprocess.run(['dotnet', 'new', 'console', '--output', project_dir], check=True)
        print(f"Project creation time: {time.time() - start_time}s")

        start_time = time.time()
        # Write the user's C# code to the Program.cs file
        with open(program_file_path, 'w') as program_file:
            program_file.write(code)
        print(f"Code writing time: {time.time() - start_time}s")

        start_time = time.time()
        # Compile the C# code
        compile_result = subprocess.run(
            ['dotnet', 'build', project_dir],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Compilation time: {time.time() - start_time}s")
        
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        start_time = time.time()
        # Run the compiled C# code
        dll_path = os.path.join(project_dir, 'bin', 'Debug', 'net6.0', 'csharp_project.dll')
        run_result = subprocess.run(
            ['dotnet', dll_path],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Execution time: {time.time() - start_time}s")

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
    elif language == 'csharp':
        result = execute_csharp_code(event.get('code'))
    else:
        result = 'unsupported language' + language

    return {
        'statusCode': 200,
        'body': result,
    }