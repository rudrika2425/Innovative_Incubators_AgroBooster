# # scraper.py
# import requests
# from bs4 import BeautifulSoup
# import urllib3
# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# def scrape_pmkisan():
#     schemes = []
#     try:
#         print("Scraping PM-KISAN...")
#         response = requests.get('https://www.pmkisan.gov.in/', verify=False, timeout=10)
#         response.raise_for_status()
#         soup = BeautifulSoup(response.text, 'html.parser')
        
#         # Fallback data since the site might be unreachable
#         if not soup.find_all('div', class_='scheme-details'):
#             schemes.append({
#                 'id': 'pmkisan-1',
#                 'title': 'PM-KISAN Scheme',
#                 'description': 'Income support of Rs.6000/- per year in three equal installments',
#                 'category': 'financial',
#                 'last_date': 'Ongoing',
#                 'eligibility': 'Small and Marginal Farmers',
#                 'registration_url': 'https://www.pmkisan.gov.in/beneficiaryStatus.aspx'
#             })
#         else:
#             scheme_details = soup.find_all('div', class_='scheme-details')
#             for detail in scheme_details:
#                 title = detail.find('h3').text.strip()
#                 description = detail.find('p').text.strip()
#                 schemes.append({
#                     'id': 'pmkisan-' + str(len(schemes)),
#                     'title': title,
#                     'description': description,
#                     'category': 'financial',
#                     'last_date': 'Ongoing',
#                     'eligibility': 'Small and Marginal Farmers',
#                     'registration_url': 'https://www.pmkisan.gov.in/beneficiaryStatus.aspx'
#                 })
#     except Exception as e:
#         print(f"Error scraping PM-KISAN: {e}")
#         # Add fallback data
#         schemes.append({
#             'id': 'pmkisan-1',
#             'title': 'PM-KISAN Scheme',
#             'description': 'Income support of Rs.6000/- per year in three equal installments',
#             'category': 'financial',
#             'last_date': 'Ongoing',
#             'eligibility': 'Small and Marginal Farmers',
#             'registration_url': 'https://www.pmkisan.gov.in/beneficiaryStatus.aspx'
#         })
#     return schemes

# def scrape_dbt_agriculture():
#     schemes = []
#     try:
#         print("Scraping DBT Agriculture...")
#         response = requests.get('https://dbtdacfw.gov.in/', verify=False, timeout=10)
#         response.raise_for_status()
#         soup = BeautifulSoup(response.text, 'html.parser')
        
#         # Fallback data if scraping fails
#         if not soup.find_all('div', class_='scheme-list'):
#             schemes.append({
#                 'id': 'dbt-1',
#                 'title': 'Direct Benefit Transfer - Agriculture',
#                 'description': 'Direct transfer of benefits to farmers',
#                 'category': 'financial',
#                 'last_date': 'Ongoing',
#                 'eligibility': 'Verified Farmers',
#                 'registration_url': 'https://dbtdacfw.gov.in/schemeinfo'
#             })
#         else:
#             scheme_list = soup.find_all('div', class_='scheme-list')
#             for scheme in scheme_list:
#                 title = scheme.find('h4').text.strip()
#                 description = scheme.find('div', class_='description').text.strip()
#                 eligibility = scheme.find('div', class_='eligibility').text.strip()
#                 schemes.append({
#                     'id': 'dbt-' + str(len(schemes)),
#                     'title': title,
#                     'description': description,
#                     'category': 'financial',
#                     'last_date': 'Ongoing',
#                     'eligibility': eligibility,
#                     'registration_url': 'https://dbtdacfw.gov.in/schemeinfo'
#                 })
#     except Exception as e:
#         print(f"Error scraping DBT Agriculture: {e}")
#         # Add fallback data
#         schemes.append({
#             'id': 'dbt-1',
#             'title': 'Direct Benefit Transfer - Agriculture',
#             'description': 'Direct transfer of benefits to farmers',
#             'category': 'financial',
#             'last_date': 'Ongoing',
#             'eligibility': 'Verified Farmers',
#             'registration_url': 'https://dbtdacfw.gov.in/schemeinfo'
#         })
#     return schemes

# def get_all_schemes():
#     schemes = []
#     schemes.extend(scrape_pmkisan())
#     schemes.extend(scrape_dbt_agriculture())
#     return schemes

# if __name__ == "__main__":
#     all_schemes = get_all_schemes()
#     print(f"Total schemes scraped: {len(all_schemes)}")
#     for scheme in all_schemes:
#         print(scheme)