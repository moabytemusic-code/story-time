import os
from moviepy.editor import ImageClip, AudioFileClip, concatenate_videoclips

def create_story_video(image_folder, audio_path, output_path):
    """
    Creates a simple slideshow video with a single audio track.
    images in image_folder should be named 1.jpg, 2.jpg, etc.
    """
    # 1. Load Audio
    audio = AudioFileClip(audio_path)
    audio_duration = audio.duration
    
    # 2. Load Images
    images = sorted([img for img in os.listdir(image_folder) if img.endswith(('.png', '.jpg', '.jpeg'))])
    
    if not images:
        print("No images found in the folder!")
        return

    # 3. Calculate duration per image
    duration_per_image = audio_duration / len(images)
    
    clips = []
    for image in images:
        clip = ImageClip(os.path.join(image_folder, image)).set_duration(duration_per_image)
        clips.append(clip)
    
    # 4. Concatenate and add audio
    video = concatenate_videoclips(clips, method="compose")
    video = video.set_audio(audio)
    
    # 5. Write to file
    video.write_videofile(output_path, fps=24, codec="libx264", audio_codec="aac")
    print(f"Video created successfully at {output_path}")

if __name__ == "__main__":
    # Example usage (placeholders)
    # create_story_video("./percy_images", "percy_audio.mp3", "percy_video.mp4")
    print("Video Generator Ready. Usage: create_story_video(image_folder, audio_path, output_path)")
