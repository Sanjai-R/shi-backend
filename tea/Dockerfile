FROM ubuntu:latest

WORKDIR /usr/src/app

RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev

RUN pip install redis
RUN pip install resume-parser
RUN pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.3.1/en_core_web_sm-2.3.1.tar.gz
RUN pip install importlib-metadata==3.2.0

RUN python -m nltk.downloader stopwords
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader averaged_perceptron_tagger
RUN python -m nltk.downloader universal_tagset
RUN python -m nltk.downloader wordnet
RUN python -m nltk.downloader brown
RUN python -m nltk.downloader maxent_ne_chunker-

COPY . .


CMD [ "python", "./script.py" ]