import json
import requests
from urllib.parse import quote, urlparse
from bs4 import BeautifulSoup

def get_decoding_params(gn_art_id):
    url = f"https://news.google.com/articles/{gn_art_id}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    div = soup.select_one('[data-n-a-sg]')
    if div is None:
        div = soup.select_one('div[jscontroller="aLI87"]')
    
    if div is None:
        return None
        
    return {
        "signature": div.get("data-n-a-sg"),
        "timestamp": div.get("data-n-a-ts"),
        "gn_art_id": gn_art_id
    }

def decode_url(params):
    payload_data = [
        ["Fbv4je", json.dumps([
            ["garturlreq", [
                ["X", "X", ["X", "X"], None, None, 1, 1, "US:en", None, 1, None, None, None, None, None, 0, 1],
                "X", "X", 1, [1, 1, 1], 1, 1, None, 0, 0, None, 0
            ], params["gn_art_id"], params["timestamp"], params["signature"]]
        ])]
    ]
    
    payload = f"f.req={quote(json.dumps(payload_data))}"
    headers = {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    print("Python payload data:", json.dumps(payload_data))
    
    response = requests.post(
        "https://news.google.com/_/DotsSplashUi/data/batchexecute?rpcids=Fbv4je",
        headers=headers,
        data=payload
    )
    
    print("Python status code:", response.status_code)
    print("Python response snippet:", response.text[:500])
    
    response_data = json.loads(response.text.split("\n\n")[1])
    return json.loads(response_data[0][2])[1]

google_url = 'https://news.google.com/rss/articles/CBMi3wFBVV95cUxNSVNWT1ktUnhfSHowVGNULW1OYXNVeUlXTkFMdXJOSEZqdlhYTWFYZEhVMDJhczNyMW5DcjJHNHc5c04yc3RrclhYRG5LRFZaOU5CdmZnR0owUVBjSXIzNkRWMW1mRGllN0Z5OWtZV2xIWU5tLXlYbGg2Um9PX2VLT1lqSzg3WTRFUEdMZzJiVUxLWUVHSVhWM2NBYjVpWVg5MXNQWjUxY0s4Vk9ZWlJ2QnJwbW9QXzNXUjFLSmlvOTFiOVNnYmd6eUR4UEtmNDExeGd6VHZwUnI0Nk0yQlpQ0gHkAUFVX3lxTFBqUklsa3F5WVdkQ3dzbzg3b1ZST0ppbmpwekNya0dnYmljYXNIN2Y3RnFKSUUtcGw1LU9sUkhuc25YbDhRVTRqY25zZ3RpeERXRFJoYlg5UzJCYjd3bGJQWTBiWDNtcVFPWWY3Vi1rSnlTQXFoZk9VRVRXRmNKNGNDdVRQY1JGQmhUT2JkWkE4T1NwSEhRcEtkZ2FSdl9LOW50SUd6aFl2ckdTYk9DYThWbXVFSnVxWlRPWmZ3WXBvNmlQUl9yMk5tV2J4NGIxNzFkWVVWUFpOSUtfM1NBWlNPcjBjVg?oc=5'

parsed = urlparse(google_url)
path_parts = parsed.path.split('/')
gn_art_id = path_parts[-1]

params = get_decoding_params(gn_art_id)
if params:
    print("Params:", params)
    decoded = decode_url(params)
    print("DECODED RESULT:", decoded)
else:
    print("Failed to get params")
