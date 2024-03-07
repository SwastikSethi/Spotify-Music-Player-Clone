import os

def remove_prefix(directory, prefix):
    # Get list of all files in the directory
    files = os.listdir(directory)

    # Iterate through each file and rename it
    for file_name in files:
        if file_name.startswith(prefix):
            # Construct new file name without the prefix
            new_file_name = file_name[len(prefix):]

            # Get current file path
            old_path = os.path.join(directory, file_name)

            # Construct new file path
            new_path = os.path.join(directory, new_file_name)

            # Rename file
            os.rename(old_path, new_path)
            print(f"Renamed: {old_path} to {new_path}")

# Replace 'directory_path' with the path to your directory
directory_path = "C:/college/webdev/spotifyClone/songs/Karan Aujla"
# Specify the prefix to remove
prefix_to_remove = "[SPOTIFY-DOWNLOADER.COM] "
remove_prefix(directory_path, prefix_to_remove)
