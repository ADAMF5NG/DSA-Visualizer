# Stage 1: Use an official Python runtime as a parent image
FROM python:3.12.2 AS python

# Run Python code directly inside the Dockerfile
RUN echo 'print("Hello, Docker from Python!")' > /python_output.txt

# Stage 2: Use an official Node.js runtime as a parent image
FROM node:14 AS nodejs

# Run JavaScript code directly inside the Dockerfile
RUN echo "console.log('Hello, Docker from Node.js!')" > /nodejs_output.txt

# Final stage
FROM debian:buster-slim

# Copy artifacts from Python stage
COPY --from=python /python_output.txt /

# Copy artifacts from Node.js stage
COPY --from=nodejs /nodejs_output.txt /

# Define the command to run your application
CMD ["bash", "-c", "cat /python_output.txt && cat /nodejs_output.txt"]


# Replace the CMD with appropriate command based on your application needs