import csv
import openai
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("API_KEY")
client = openai.OpenAI(api_key=API_KEY)


def generate_prompt_for_headlines(headlines_with_urls):
    formatted_headlines = "\n".join(
        [
            f"{index + 1}. {headline} (URL: {url})"
            for index, (headline, url) in enumerate(headlines_with_urls)
        ]
    )

    return (
        "# Prompt You are a highly skilled assistant "
        "specializing in analyzing content "
        "to identify topics relevant to specific audiences. "
        "Given the following list of headlines and their URLs, identify the "
        "ones that would be of interest to digital nomads living in"
        "Medellin, Colombia. "
        "Consider factors such as local events, protests, riots"
        "safety "
        "would appeal to digital nomads. "
        "For each relevant headline, provide the headline and "
        "its URL. Format the output as follows:\n\n"
        "# Example of relevant output:\n"
        "After an agreement between truck drivers and the Government, this is "
        "how the price of ACPM will be in Colombia | https://www.elcolombiano.com/negocios/acuerdo-camioneros-gobierno-precio-del-acpm-BC25360436 \n\n"
    ), ("# Headlines to Filter:\n\n" + formatted_headlines + "\n\n")


def translate_using_gpt(headlines_to_translate):
    formatted_headlines = "\n".join(
        [
            f"{index + 1}. {headline}"
            for index, headline in enumerate(headlines_to_translate)
        ]
    )
    base_prompt = (
        "# Prompt Become an expert Spanish to English Translator."
        "I need you to translate these headlines."
        " They need to be listed and then separated by a new line each time."
    )
    prompt = "Here are the articles: " + formatted_headlines
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": base_prompt},
            {"role": "user", "content": prompt},
        ],
    )
    translated = response.choices[0].message.content.strip()
    translated = translated.split("\n")
    ans = []
    for val in translated:
        if val != "":
            ans.append(val)
    return ans


def find_relevant_headlines(file_path):
    headlines = []

    # Read headlines from CSV file
    with open(file_path, newline="", encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            headline = row[0].strip()
            url = row[1].strip()
            headlines.append((headline, url))
    base_prompt, article_prompt = generate_prompt_for_headlines(headlines)

    # Query OpenAI
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": base_prompt},
            {"role": "user", "content": article_prompt},
        ],
    )
    # Extract relevant headlines from response
    relevant_headlines = response.choices[0].message.content.strip()
    print(relevant_headlines)
    ans = relevant_headlines.split("\n")
    spanish_headlines = []
    for headline in ans:
        val = headline.split("|")
        if len(val) > 1:
            spanish_headlines.append(val[0])

    english_headlines = translate_using_gpt(spanish_headlines)
    print("english headlines", english_headlines)
    output_file = "../Frontend/public/colombian_news_info.csv"
    with open(output_file, mode="w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile, delimiter="|")
        writer.writerow(["Headline", "URL"])
        vals = relevant_headlines.split("\n")

        print("LENGTH OF HEADLINES", len(vals))
        print("HEADLINES", vals)
        added = 0
        for i, line in enumerate(vals):
            parts = line.split("|")
            print("GOING THROUGH", len(parts), parts)
            if len(parts) == 2:
                url = parts[1].strip()
                print(i, url)
                headline = english_headlines[added].strip()
                writer.writerow([headline, url])
                added += 1
    print("Successfully written")


find_relevant_headlines("headlines_and_links.csv")
