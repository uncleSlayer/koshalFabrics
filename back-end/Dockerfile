FROM python:3

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip install boto3

COPY . .

CMD ["python3", "-u", "run.py"]