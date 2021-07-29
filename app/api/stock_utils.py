import requests
from bs4 import BeautifulSoup


# symbol = "TWST"
symbol = input("Enter a symbol: ")
URL = f"https://finance.yahoo.com/quote/{symbol}?p={symbol}"
page = requests.get(URL)

# Parse page
soup = BeautifulSoup(page.content, "html.parser")

# find element with the given classes (based on page inspection)
price = soup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")

# return text within tag
print(price.text)