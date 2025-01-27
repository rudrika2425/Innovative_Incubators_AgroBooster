import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define the dataset directory
dataset_directory = r'C:\Users\aksha\.cache\kagglehub\datasets\emmarex\plantdisease\versions\1\PlantVillage'

# Create an ImageDataGenerator for data augmentation and normalization
datagen = ImageDataGenerator(rescale=1.0 / 255, validation_split=0.2)

# Create training data generator
train_data = datagen.flow_from_directory(
    dataset_directory,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

# Create validation data generator
val_data = datagen.flow_from_directory(
    dataset_directory,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# Load the base model (EfficientNetB0) without the top layer
base_model = tf.keras.applications.EfficientNetB0(input_shape=(224, 224, 3), include_top=False, weights='imagenet')
base_model.trainable = False  # Freeze the base model

# Add custom layers on top of the base model
x = tf.keras.layers.GlobalAveragePooling2D()(base_model.output)
x = tf.keras.layers.Dense(train_data.num_classes, activation='softmax')(x)
model = tf.keras.Model(inputs=base_model.input, outputs=x)

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(train_data, validation_data=val_data, epochs=5)

# Define the path to save the model
model_save_path = os.path.join(os.path.dirname(__file__), 'models', 'plant_disease_model.h5')

# Save the model
model.save(model_save_path)
print(f"Model saved to {model_save_path}")