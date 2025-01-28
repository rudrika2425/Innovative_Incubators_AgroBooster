import kagglehub

# Download the latest version of the PlantDisease dataset
path = kagglehub.dataset_download("emmarex/plantdisease")

# Print the path to the downloaded dataset files
print("Path to dataset files:", path)
