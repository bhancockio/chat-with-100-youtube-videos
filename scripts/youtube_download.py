"""
TODO:
- need to pass in the video id instead of the index on line 37.

"""

import csv
import yt_dlp  # replace youtube_dl with yt_dlp


def download_audio(url, output_path):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',  # this remains the same
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'SponsorBlock': False,  # this is a yt-dlp option, it's not a postprocessor
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


# Read YouTube URLs from a CSV file
with open('./scripts/youtube_urls.csv', 'r') as f:
    youtube_urls = f.read().splitlines()

for i, url in enumerate(youtube_urls):
    url = url.strip()  # Remove leading/trailing whitespace
    if not url or not url.startswith("http"):
        # Skip if the URL is empty or doesn't start with http
        print(f"Skipping invalid URL: '{url}'")
        continue
    # This will save the files as audio0.mp3, audio1.mp3, etc.
    output_path = f'./audio_files/audio{i}.mp3'
    download_audio(url, output_path)
