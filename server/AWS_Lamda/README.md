## Getting started with AWS Lambda

## Instruction 

Step 1: Build the image 
### `docker build --platform linux/amd64 -t docker-image:test .`

Step 2: Start and run the container 
### `docker run --platform linux/amd64 -p 9000:8080 docker-image:test`

Step 3: Open a new terminal and send a simple request
### `curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d "{\"language\":\"python\", \"code\": \"print('Hello, docker from Python')\"}"`

If you received `{"statusCode": 200, "body": "Hello, docker from Python\n"}%`, then you are good to go! 

## Debugging Tips

Check what port is the container running on 
### `docker ps`

Kill a container 
### `docker kill [container id]`

## Next step

Figure out what if wrong with this input

### `curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"language":"java", "code": "public class HelloWorld {public static void main(String[] args) {System.out.println(\"Hello, World\");}}"}'`




    
