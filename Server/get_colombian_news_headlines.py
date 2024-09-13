import requests
from bs4 import BeautifulSoup
import csv

# url = 'https://www.elcolombiano.com/'
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
