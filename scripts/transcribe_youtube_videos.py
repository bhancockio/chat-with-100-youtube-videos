# Welcome to AssemblyAI! Get started with the API by transcribing
# a file using Python.
#
# In this example, we'll transcribe a local file. Get started by
# downloading the snippet, then update the 'filename' variable
# to point to the local path of the file you want to upload and
# use the API to transcribe.
#
# IMPORTANT: Update line 128 to point to a local file.
# 
# Have fun!

import requests
import json
import time
from dotenv import load_dotenv
import os


# Load environment variables from .env file
load_dotenv()

# Get the API token from the environment variables
your_api_token = os.getenv("ASSEMBLY_AI_API_TOKEN")

# If the API token is not set, raise an error
if your_api_token is None:
    raise RuntimeError("Please set the ASSEMBLY_AI_API_TOKEN environment variable")

def read_file(filename, chunk_size=5242880):
    # Open the file in binary mode for reading
    with open(filename, 'rb') as _file:
        while True:
            # Read a chunk of data from the file
            data = _file.read(chunk_size)
            # If there's no more data, stop reading
            if not data:
                break
            # Yield the data as a generator
            yield data

def upload_file(api_token, path):
    """
    Upload a file to the AssemblyAI API.

    Args:
        api_token (str): Your API token for AssemblyAI.
        path (str): Path to the local file.

    Returns:
        str: The upload URL.
    """
    print(f"Uploading file: {path}")

    # Set the headers for the request, including the API token
    headers = {'authorization': api_token}
    
    # Send a POST request to the API to upload the file, passing in the headers
    # and the file data
    response = requests.post('https://api.assemblyai.com/v2/upload',
                             headers=headers,
                             data=read_file(path))

    # If the response is successful, return the upload URL
    if response.status_code == 200:
        return response.json()["upload_url"]
    # If the response is not successful, print the error message and return
    # None
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

def create_transcript(api_token, audio_url):
    """
    Create a transcript using AssemblyAI API.

    Args:
        api_token (str): Your API token for AssemblyAI.
        audio_url (str): URL of the audio file to be transcribed.

    Returns:
        dict: Completed transcript object.
    """
    print("Transcribing audio... This might take a moment.")

    # Set the API endpoint for creating a new transcript
    url = "https://api.assemblyai.com/v2/transcript"

    # Set the headers for the request, including the API token and content type
    headers = {
        "authorization": api_token,
        "content-type": "application/json"
    }

    # Set the data for the request, including the URL of the audio file to be
    # transcribed
    data = {
        "audio_url": audio_url
    }

    # Send a POST request to the API to create a new transcript, passing in the
    # headers and data
    response = requests.post(url, json=data, headers=headers)

    # Get the transcript ID from the response JSON data
    transcript_id = response.json()['id']

    # Set the polling endpoint URL by appending the transcript ID to the API endpoint
    polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"

    # Keep polling the API until the transcription is complete
    while True:
        # Send a GET request to the polling endpoint, passing in the headers
        transcription_result = requests.get(polling_endpoint, headers=headers).json()

        # If the status of the transcription is 'completed', exit the loop
        if transcription_result['status'] == 'completed':
            break

        # If the status of the transcription is 'error', raise a runtime error with
        # the error message
        elif transcription_result['status'] == 'error':
            raise RuntimeError(f"Transcription failed: {transcription_result['error']}")

        # If the status of the transcription is not 'completed' or 'error', wait for
        # 3 seconds and poll again
        else:
            time.sleep(3)

    return transcription_result

# Your API token is already set in this variable
your_api_token = "99e69a9dff014da6ba06376c80c478be"

# -----------------------------------------------------------------------------
# Update the file path here, pointing to a local audio or video file.
# If you don't have one, download a sample file: https://storage.googleapis.com/aai-web-samples/espn-bears.m4a
# You may also remove the upload step and update the 'audio_url' parameter in the
# 'create_transcript' function to point to a remote audio or video file.
# -----------------------------------------------------------------------------

import os
# Directory containing audio files to transcribe
audio_directory = "./audio_files"

# Get a list of all audio files in the directory
audio_files = [os.path.join(audio_directory, filename) for filename in os.listdir(audio_directory) if filename.endswith('.m4a')]

# Loop through each audio file
for filename in audio_files:
    # Upload the file to AssemblyAI and get the upload URL
    upload_url = upload_file(your_api_token, filename)

    # Transcribe the audio file using the upload URL
    transcript = create_transcript(your_api_token, upload_url)

    # Print the completed transcript object
    print(transcript)