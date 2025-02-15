# 🌱 AgroBooster: AI-Driven Farming Optimization Platform

## Team Name: Innovative Incubators

## Department: Department of Agriculture

### Problem Statement
Traditional farming methods often rely on intuition, manual observation, and unpredictable weather patterns, leading to inefficiencies and suboptimal yields. AgroBooster is an AI-powered solution that integrates data analytics, machine learning, and precision farming tools to help farmers optimize their agricultural practices, improve productivity, and enhance crop health.

## 🚀 Project Overview
AgroBooster is an AI-powered precision farming platform designed to maximize crop yield through data-driven insights. It offers AI-personalized crop predictions, an intelligent calendar for farm management, and an AI chatbot for disease detection and treatment suggestions. With seamless soil testing integration, weather forecasting, and a farmer-to-farmer tool rental marketplace, AgroBooster empowers farmers to make informed decisions and optimize their agricultural productivity.

---

## Live Demo: 🌍 [Visit AgroBooster Website](https://agrobooster.pages.dev/)

---
## 🔑 Key Features

### 🌾 Soil Testing & Analysis
- Integration with nearby soil testing agencies via Google Maps API.
- AI-driven analysis of uploaded soil reports to suggest suitable crops.

### 🌱 AI-Powered Crop Prediction
- AI-generated crop recommendations based on soil analysis, weather conditions, and farm location.
- Personalized yield-maximizing pathways for optimal crop selection.

### 📅 AI-Generated Farming Calendar
- A dynamic calendar that guides farmers through every stage of crop growth.
- Optimized scheduling for irrigation, fertilization, and pest control.

### 📊 Farm Dashboard
- A centralized dashboard displaying farm details and AI-generated calendars.
- Weather updates, farming recommendations, and alerts.
- Support for multiple farm registrations

### 🤖 AI Chatbot for Disease Detection & Treatment
- Image-based plant disease detection using AI/ML models.
- Voice and text-integrated chatbot providing treatment suggestions.

### 🚜 Farmer Tool Rental Marketplace
- Farmers can list their farming tools for rent with necessary details and images.
- Borrowers can browse and rent tools directly through the platform.

### 🌤️ Weather Insights
- 7-day weather forecasts powered by OpenWeather API.
- Integration with Agromonitoring API for real-time farm condition tracking.

### 📢 News & Government Schemes
- AI-curated latest farming news updates.
- Updates on government schemes beneficial for farmers.
  
### 🗣️ Multilingual & Accessibility Support
- Bilingual platform (Hindi & English) powered by Google Translate API.
- Expandable to multiple languages using Google Translate API.
- Text-to-speech and voice input features for an accessible user experience.

---

## 🛠 Technology Stack

### **Frontend:**
- React.js (for a seamless user experience)
- Tailwind CSS (for modern and responsive UI)

### **Backend:**
- Flask (for server-side logic and API handling)

### **Database:**
- MongoDB (for storing farming data and user interactions)

### **Media Storage and Management:**
- Cloudinary (for image storage and processing)

### **APIs:**
- OpenWeather API (real-time weather forecasting)
- Google Maps API (location-based insights and nearby soil testing centers)
- Google Places API (search for nearby agricultural services)
- Google Translate API (multilingual support)
- Gemini API (crop prediction and soil analysis)
- IPinfo API (user location detection for farm recommendations)
- Agromonitoring API (real-time farm condition tracking)
- Fast2SMS API (OTP authentication for user verification)
- News API (latest farming news updates)
- Cloudinary API (image handling for soil and disease detection reports)

---

## 📌 Roadmap 

### **Phase 1: User Authentication & Onboarding**
- User registers with phone number and name.
- OTP verification via Fast2SMS API.
- User logs in and gets onboarding guidance.

### Phase 2: Farm Setup, Soil Analysis & AI-Driven Crop Prediction 
- User fills in farm details (name, land area, available tools, irrigation system).
- System suggests nearby soil testing agencies using Google Maps API.
- User uploads soil test report, and AI analyzes it using Gemini API.
- AI suggests the best crop to grow based on soil quality, location, and weather.
- User selects crop variety and receives a personalized AI-generated farming calendar.

### **Phase 3: Farm Dashboard & Personalized Calendar**
- Farmers access the farm dashboard for real-time updates.
- AI-generated calendar provides step-by-step farming guidance.
- 7-day weather forecast via OpenWeather API.
- AI chatbot assists with plant disease detection using image recognition.
- Voice input and text-to-speech support enhance usability.

### **Phase 4: AI Chatbot for Disease Detection & Treatment**
- Image and voice-integrated AI chatbot for plant disease diagnosis.
- Text-to-speech support for accessibility.

### **Phase 5: Tool Rental & Community Features**
- Farmers can list tools for rent with images and pricing.
- Interested users can browse and rent tools.
- News API provides agricultural news and government scheme updates.

### **Phase 6: Scaling & Multilingual Expansion**
- Additional language support via Google Translate API.
- Expand AI recommendations to include financial planning for farmers.
- Integrate blockchain for smart contract-based tool rental agreements.

## 🌱Workflow
![image](https://github.com/user-attachments/assets/a901180d-5d5d-460a-ab2c-22bee78958b6)

---

### 🌿 Crop Prediction and Pathway Parameters

#### In order to maintain Accuracy we have included following 27 Parameters for Crop Recommendation and Pathway Prediction.

- Farm Area
- Farming Tools
- Irrigation System
- Soil Type
- Crop Season(Rabi, Kharif, Zaid)
- Location
- Altitude
- Latitude
- Longitude
- Tropical Zone
- Cloud Coverage
- Humidity
- Temperature
- Weather Description
- Wind Speed
- Date Time
- Feels Like
- Pressure
- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Soil Ph
- Zinc
- Sulphur
- Organic Carbon
- Crop Name
- Crop Type

---

## 🏗 How to Set Up Locally

### Prerequisites:

- Python installed
- MongoDB installed and running

  
### 📥 Clone the Repository
```bash
git clone https://github.com/rudrika2425/Innovative_Incubators_AgroBooster.git
cd Innovative_Incubators_Hackofiesta_6.0
```

### 🔧 Backend Setup
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 🤖 Chatbot Setup
```bash
cd ChatBoat
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 🎨 Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

## 🔑 Environment Variables

### Frontend
```
 GOOGLE_MAPS_API_KEY = ENTER_YOUR_API_KEY
```

### Backend
```
GENAI_API_KEY=ENTER_YOUR_API_KEY
WEATHER_API_KEY=ENTER_YOUR_API_KEY
SECRET_KEY=ENTER_YOUR_SECRET_KEY
MONGO_URI=ENTER_YOUR_MONGO_URI
CLOUDINARY_CLOUD_NAME=ENTER_YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=ENTER_YOUR_API_KEY
CLOUDINARY_API_SECRET=ENTER_YOUR_API_KEY
WEATHER_API_KEY_OPENWEATHER=ENTER_YOUR_API_KEY
GOOGLE_PLACES_API_KEY=ENTER_YOUR_API_KEY
FAST2SMS_API_KEY=ENTER_YOUR_API_KEY
NEWS_API_KEY = ENTER_YOUR_API_KEY
```

### Chatbot
```
GOOGLE_API_KEY=ENTER_YOUR_API_KEY
```

### 📌 .gitignore Configuration
```
# Ignore virtual environments
venv/

# Ignore compiled Python files
__pycache__/
*.pyc

# Ignore environment files
.env
```
## Glimpse of Our Website 🌐✨

![image](https://github.com/user-attachments/assets/445fd913-17d7-40e7-a75a-f59ebcadb710)
![image](https://github.com/user-attachments/assets/5eb680bc-c7cf-4866-8729-36d8009c2361)
![image](https://github.com/user-attachments/assets/b890b24d-6bae-429a-bf0e-73c14f4a7ab9)
![image](https://github.com/user-attachments/assets/df5c08e8-a407-457f-900b-5f93ac9f1188)
![image](https://github.com/user-attachments/assets/3aaba365-25a5-40a1-acf7-324b101b0b01)
![image](https://github.com/user-attachments/assets/73d44304-d944-4355-ad52-67bd4d69d109)
![image](https://github.com/user-attachments/assets/088310ed-5100-4a32-bdfa-b155876ebc2a)
![image](https://github.com/user-attachments/assets/66ce19a6-c59a-490e-8e35-f7bdc7915281)
![image](https://github.com/user-attachments/assets/a26d8869-d9d3-415c-b55b-12c274a286c4)
![image](https://github.com/user-attachments/assets/dd200321-14ef-4063-8e23-967608308820)
![image](https://github.com/user-attachments/assets/b1280410-0659-4795-98dd-0ac156637090)
![image](https://github.com/user-attachments/assets/e1e1bd6f-0c6c-4c14-ad6c-1f886a9564ef)
![image](https://github.com/user-attachments/assets/1d25202e-1229-443e-9359-a9e69e3cd87b)
![image](https://github.com/user-attachments/assets/07b33969-d7c1-4033-969c-b123efb2d1a4)

---

🎥 **Watch Full Video:** [▶️ Watch on YouTube](YOUR_YOUTUBE_VIDEO_LINK)  

📢 Join us in transforming agriculture with cutting-edge solutions! 🌱  

---
## 🌾 Agriculture Resources & Official Websites  

Explore these official websites for reliable agricultural information, policies, and resources:  

### 🏛️ Government Agriculture Websites  

1. **[Ministry of Agriculture & Farmers Welfare, India](https://www.india.gov.in/website-ministry-agriculture-farmers-welfare)**  
   📌 Responsible for policy formulation and implementation related to agriculture in India. Provides updates on schemes, programs, and services supporting farmers.  

2. **[Departments of Agriculture of States and Union Territories, India](https://www.india.gov.in/departments-agriculture-states-and-union-territories)**  
   📌 Offers region-specific agricultural information and policies.  

3. **[Department of Agriculture & Farmers Welfare, India](https://agricoop.gov.in/)**  
   📌 Official portal with resources on agricultural development, farmer welfare schemes, and market policies.  


## 🚀 Future Scope
- AI-powered crop disease prevention using satellite data.
- Blockchain-based farmer transactions for transparency.
- Expansion to more regional languages for inclusivity.
- App development to extend the website to an Android app.

---













