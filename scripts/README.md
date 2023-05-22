# STEP 1 - Download YouTube Videos

## Setup Environment

`conda env list`c
`conda activate youtube-chat`

## Scrape Channel

`python scripts/scrape_youtube_channel_videos.py https://www.youtube.com/@AlexHormozi 100 scripts/scrapped_channels/ah.csv`

## Download Audio Files

`python scripts/youtube_download.py scripts/scrapped_channels/ah.csv scripts/audio_files/`

# Step 2 - Transcribe Audio Files wih AssemblyAI

`python scripts/transcribe_youtube_vides.py`

# Step 3 - Upload Transcriptions to Pinecone

`python scripts/pinecone_helper.py scripts/scrapped_channels/ah.csv scripts/video_transcriptions/`
