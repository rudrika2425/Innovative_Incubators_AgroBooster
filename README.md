# 🌱 AgroBooster: AI-Driven Farming Optimization Platform

## 🚀 Project Overview

AgroBooster is an AI-powered precision farming platform designed to maximize crop yield through data-driven insights. It offers AI-personalized crop predictions, an intelligent calendar for farm management, and an AI chatbot for disease detection and treatment suggestions. With seamless soil testing integration, weather forecasting, and a farmer-to-farmer tool rental marketplace, AgroBooster empowers farmers to make informed decisions and optimize their agricultural productivity.

---

## 🔑 Key Features

### **🌾 Soil Testing & Analysis**
* Integration with nearby soil testing agencies via Google Maps API.
* AI-driven analysis of uploaded soil reports to suggest suitable crops.

### **🌱 AI-Powered Crop Prediction**
* AI-generated crop recommendations based on soil analysis, weather conditions, and farm location.
* Personalized yield-maximizing pathways for optimal crop selection.

### **📅 AI-Generated Farming Calendar**
* A dynamic calendar that guides farmers through every stage of crop growth.
* Optimized scheduling for irrigation, fertilization, and pest control.

### **📊 Farm Dashboard**
* A centralized dashboard displaying farm details and AI-generated calendars.
* Weather updates, farming recommendations, and alerts.
* Support for multiple farm registrations.

### **🤖 AI Chatbot for Disease Detection & Treatment**
* Image-based plant disease detection using AI/ML models.
* Voice and text-integrated chatbot providing treatment suggestions.

### **🚜 Farmer Tool Rental Marketplace**
* Farmers can list their farming tools for rent with necessary details and images.
* Borrowers can browse and rent tools directly through the platform.

### **🌤️ Weather Insights**
* 7-day weather forecasts powered by OpenWeather API.
* Integration with Agromonitoring API for real-time farm condition tracking.

### **📢 News & Government Schemes**
* AI-curated latest farming news updates.
* Updates on government schemes beneficial for farmers.

### **🗣️ Multilingual & Accessibility Support**
* Bilingual platform (Hindi & English) powered by Google Translate API.
* Expandable to multiple languages.
* Text-to-speech and voice input features for an accessible user experience.

---

## 🛠 Tech Stack

### **Frontend:**
* React.js
* Tailwind CSS

### **Backend:**
* Flask
* Cloudinary

### **Database:**
* MongoDB

### **APIs:**
* OpenWeather API
* Google Maps API
* Google Places API
* Google Translate API
* Gemini API
* IPinfo API
* Agromonitoring API
* Fast2SMS API
* News API
* Cloudinary API

---

## 📌 Roadmap & Workflow

### **Phase 1: User Authentication & Onboarding**
* User registers with phone number and name.
* OTP verification via Fast2SMS API.
* User logs in and gets onboarding guidance.

### **Phase 2: Farm Setup, Soil Analysis & AI-Driven Crop Prediction**
* User fills in farm details (Name, Area, Irrigation Method, Tools Used).
* Nearby soil testing agencies suggested via Google Maps API.
* User uploads soil test report, analyzed using Gemini API.
* AI suggests best crop based on Soil Type, Weather, and Farm Location.
* Personalized AI-generated farming calendar provided.

### **Phase 3: Farm Dashboard & Personalized Calendar**
* Farmers access the farm dashboard for real-time updates.
* AI-generated calendar provides step-by-step farming guidance.
* 7-day weather forecast via OpenWeather API.
* AI chatbot assists with plant disease detection.

### **Phase 4: AI Chatbot for Disease Detection & Treatment**
* Image and voice-integrated AI chatbot for plant disease diagnosis.
* Text-to-speech support for accessibility.

### **Phase 5: Tool Rental & Community Features**
* Farmers can list tools for rent with images and pricing.
* Users can browse and rent tools.
* News API provides agricultural news and government scheme updates.

### **Phase 6: Scaling & Multilingual Expansion**
* Additional language support via Google Translate API.
* AI recommendations for financial planning.
* Blockchain-based tool rental agreements.

---

## 🌿 Crop Prediction Parameters

* **State Name**
* **District Name**
* **Season** (Rabi, Kharif, Zaid)
* **Crop Name**
* **Temperature**
* **Humidity**
* **Soil Moisture**
* **Soil Type**
* **Crop Type**
* **Nitrogen (N)**
* **Phosphorus (P)**
* **Potassium (K)**
* **Farm Area**
* **Irrigation Method**
* **Tools Used**
* **Soil Testing Report**
* **Weather Conditions**
* **Terrain Type**

---

## 🏗 How to Set Up Locally

### **📥 Clone the Repository**
```bash
 git clone https://github.com/rudrika2425/Innovative_Incubators_AgroBooster.git
 cd agrobooster
```

### **🔧 Backend Setup**
```bash
 cd Backend
 python -m venv venv
 source venv/bin/activate  # On Windows use: venv\Scripts\activate
 pip install -r requirements.txt
 python app.py
```

### **🤖 Chatbot Setup**
```bash
 cd ChatBoat
 python -m venv venv
 source venv/bin/activate  # On Windows use: venv\Scripts\activate
 pip install -r requirements.txt
 python app.py
```

### **🎨 Frontend Setup**
```bash
 cd Frontend
 npm install
 npm run dev
```

---

## 🔑 Environment Variables

### **Frontend**
```
 GOOGLE_MAPS_API_KEY=your_api_key
```

### **Backend**
```
GENAI_API_KEY=your_api_key
WEATHER_API_KEY=your_api_key
SECRET_KEY=agrobooster
SQLALCHEMY_DATABASE_URI=sqlite:///users.db
MONGO_URI=mongodb://localhost:27017/agrobooster
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **Chatbot**
```
GOOGLE_API_KEY=your_api_key
```

---

## 📌 `.gitignore` Configuration
```
# Ignore virtual environments
venv/

# Ignore compiled Python files
__pycache__/
*.pyc

# Ignore environment files
.env
```

---

## 🚀 Future Scope

* AI-powered crop disease prevention using satellite data.
* Blockchain-based farmer transactions for transparency.
* Expansion to more regional languages.
* Mobile app for seamless farming assistance.

---

