from flask import Blueprint, jsonify
import requests
import os
from datetime import datetime, timedelta

# Create the blueprint
scheme_bp = Blueprint('agriculture', __name__)

# Configuration
NEWS_API_KEY = os.getenv("NEWS_API_KEY") 
NEWS_CACHE = {'data': None, 'last_updated': None}

# Static Scheme Data
SCHEMES_DATA = [
    {
        "id": 1,
        "name": "PM-KISAN",
        "description": "किसान परिवारों को प्रति वर्ष 6000 रुपये की सीधी आय सहायता",
        "benefits": [
            "प्रति वर्ष 6000 रुपये की वित्तीय सहायता",
            "बैंक खातों में सीधे ट्रांसफर",
            "कृषि आवश्यकताओं के लिए समर्थन"
        ],
        "eligibility": "सभी छोटे और सीमांत किसान",
        "link": "https://pmkisan.gov.in/",
        "image": "https://pmkisan.gov.in/new_images/PradhanMantriKisanSammanNidhiBanner.jpg"
    },
    {
        "id": 2,
        "name": "किसान क्रेडिट कार्ड",
        "description": "किसानों को समय पर क्रेडिट तक पहुंच प्रदान करता है",
        "benefits": [
            "फसलों के लिए आसान क्रेडिट पहुंच",
            "लचीले पुनर्भुगतान विकल्प",
            "बीमा कवरेज"
        ],
        "eligibility": "सभी किसान, शेयरक्रॉपर्स और कृषि करने वाले",
        "link": "https://www.india.gov.in/spotlight/kisan-credit-card",
        "image": "https://pmkisan.gov.in/new_images/SabkaSathSabkaVikasSabkaViswas.jpg"
    }
]

@scheme_bp.route('/schemes', methods=['GET'])
def get_schemes():
    """Endpoint to retrieve agricultural schemes information"""
    try:
        return jsonify({
            "status": "success",
            "data": SCHEMES_DATA
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@scheme_bp.route('/news', methods=['GET'])
def get_news():
    """Endpoint to retrieve agricultural news in Hindi"""
    try:
        # Check cache (refresh every 30 minutes)
        if (NEWS_CACHE['data'] and NEWS_CACHE['last_updated'] and 
            datetime.now() - NEWS_CACHE['last_updated'] < timedelta(minutes=30)):
            return jsonify({"status": "success", "data": NEWS_CACHE['data']})

        # Keywords for Indian agriculture news in Hindi
        indian_agri_keywords = "किसान OR कृषि OR पीएम-किसान OR किसान क्रेडिट कार्ड"

        # Build the API URL with specific parameters for Indian agriculture news in Hindi
        url = (
            f"https://newsapi.org/v2/everything?"
            f"q={indian_agri_keywords}&"
            f"apiKey={NEWS_API_KEY}&"
            f"language=hi&"  # Set language to Hindi
            f"sortBy=publishedAt"
        )

        response = requests.get(url)

        if response.status_code == 200:
            news_data = response.json()

            # Process and filter news
            formatted_news = []
            for article in news_data.get("articles", []):
                if article.get("urlToImage") and article.get("description"):
                    formatted_news.append({
                        "title": article["title"],
                        "description": article["description"],
                        "url": article["url"],
                        "image": article["urlToImage"],
                        "publishedAt": article["publishedAt"],
                        "source": article["source"]["name"]
                    })

            # Update cache with filtered news
            NEWS_CACHE['data'] = formatted_news[:12]  # Store top 12 relevant articles
            NEWS_CACHE['last_updated'] = datetime.now()

            return jsonify({
                "status": "success",
                "data": NEWS_CACHE['data']
            })
        else:
            return jsonify({"error": "Failed to fetch news"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500