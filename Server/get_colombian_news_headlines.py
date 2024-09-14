import requests
from bs4 import BeautifulSoup
import csv

def retrieve_manizales_section_news():
    url = "https://www.lapatria.com/manizales"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        # Update the selector to match the correct HTML structure for the Manizales section
        articles = soup.find_all("li", class_="grid list-group-item")

        with open("lapatria_manizales_headlines.csv", "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Headline", "URL", "Time"])

            for article in articles:
                # Find the headline
                headline_tag = article.find("h3", class_="field-content")
                if headline_tag:
                    headline_text = headline_tag.get_text(strip=True)

                    # Find the link
                    link_tag = headline_tag.find("a", href=True)
                    if link_tag:
                        article_url = link_tag["href"]
                        full_url = "https://www.lapatria.com" + article_url if article_url.startswith("/") else article_url

                        # Find the time
                        time_tag = article.find("div", class_="views-field-field-fecha-hora")
                        time_text = time_tag.get_text(strip=True) if time_tag else "No time"

                        writer.writerow([headline_text, full_url, time_text])

        print("Headlines, URLs, and times have been saved to 'lapatria_manizales_headlines.csv'")
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

# Call the new function

def retrieve_general_news():
    url = "https://www.lapatria.com/"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        # Update the selector to match the correct HTML structure
        articles = soup.find_all("li", class_="grid list-group-item")

        with open("lapatria_headlines.csv", "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Headline", "URL", "Section"])

            for article in articles:
                # Find the headline
                headline_tag = article.find("h3", class_="field-content")
                if headline_tag:
                    headline_text = headline_tag.get_text(strip=True)

                    # Find the link
                    link_tag = headline_tag.find("a", href=True)
                    if link_tag:
                        article_url = link_tag["href"]
                        full_url = url + article_url if article_url.startswith("/") else article_url

                        # Find the section
                        section_tag = article.find("div", class_="nd-no-exclusivo")
                        section = section_tag.get_text(strip=True) if section_tag else "No section"

                        writer.writerow([headline_text, full_url, section])

        print("Headlines, URLs, and sections have been saved to 'lapatria_headlines.csv'")
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

def retrieve_medellin_news():
    url = "https://www.elcolombiano.com/medellin"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        articles = soup.find_all("article", class_="article")

        with open("headlines_and_links.csv", "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Headline", "URL"])

            for article in articles:
                headline_tag = article.find("span", class_="priority-content")
                if headline_tag:
                    headline_text = headline_tag.get_text(strip=True)

                    link_tag = article.find("a", href=True)
                    if link_tag:
                        article_url = link_tag["href"]
                        full_url = (
                            url + article_url
                            if article_url.startswith("/")
                            else article_url
                        )
                        writer.writerow([headline_text, full_url])
                    else:
                        writer.writerow([headline_text, "No link found"])

        print("Headlines and URLs have been saved to 'headlines_and_links.csv'")
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
print("getting medellin news")
retrieve_medellin_news()
print("getting general news")
retrieve_general_news()
print("getting manizales news")
retrieve_manizales_section_news()