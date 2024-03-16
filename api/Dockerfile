# Use a Python base image
FROM python:3.9


EXPOSE 7117
# Set the working directory inside the container
WORKDIR /app

# Copy the Python script and model.pkl into the container
COPY Models_8.py /app/Models_8.py
COPY model.pkl /app/model.pkl

# Copy the requirements file into the container
COPY requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Command to run when the container starts
CMD ["python", "/app/Models_8.py"]
