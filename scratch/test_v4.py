import requests
import base64
from urllib.parse import urlparse

def fetch_decoded_batch_execute(ids):
    try:
        envelopes = []
        for i, id in enumerate(ids, start=1):
            envelope = (
                f'["Fbv4je","[\\"garturlreq\\",[[\\"en-US\\",\\"US\\",[\\"FINANCE_TOP_INDICES\\",\\"WEB_TEST_1_0_0\\"],'
                f'null,null,1,1,\\"US:en\\",null,180,null,null,null,null,null,0,null,null,[1608992183,723341000]],'
                f'\\"en-US\\",\\"US\\",1,[2,3,4,8],1,0,\\"655000234\\",0,0,null,0],\\"{id}\\"]",null,"{i}"]'
            )
            envelopes.append(envelope)

        s = f'[[{",".join(envelopes)}]]'

        headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "Referer": "https://news.google.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }

        response = requests.post(
            url="https://news.google.com/_/DotsSplashUi/data/batchexecute?rpcids=Fbv4je",
            headers=headers,
            data={"f.req": s},
        )

        print("Response status:", response.status_code)
        if response.status_code != 200:
            return {"status": False, "error": f"Failed to fetch data from Google: {response.status_code}"}

        text = response.text
        print("Raw response snippet:", text[:1000])
        
        urls = []
        header = '[\\"garturlres\\",\\"'
        footer = '\\",'
        while header in text:
            start = text.split(header, 1)[1]
            if footer not in start:
                return {"status": False, "error": "Footer not found in response."}
            url = start.split(footer, 1)[0]
            urls.append(url)
            text = start.split(footer, 1)[1]

        return {"status": True, "urls": urls}
    except Exception as e:
        return {"status": False, "error": str(e)}

def decode_url(source_url):
    url = urlparse(source_url)
    path = url.path.split("/")
    base64_str = path[-1]
    
    # Run the offline decoder
    try:
        decoded_bytes = base64.urlsafe_b64decode(base64_str + "==")
        decoded_str = decoded_bytes.decode("latin1")

        prefix = b"\x08\x13\x22".decode("latin1")
        if decoded_str.startswith(prefix):
            decoded_str = decoded_str[len(prefix) :]

        suffix = b"\xd2\x01\x00".decode("latin1")
        if decoded_str.endswith(suffix):
            decoded_str = decoded_str[: -len(suffix)]

        bytes_array = bytearray(decoded_str, "latin1")
        length = bytes_array[0]
        if length >= 0x80:
            decoded_str = decoded_str[2 : length + 1]
        else:
            decoded_str = decoded_str[1 : length + 1]

        print("Offline Decoded string starts with:", decoded_str[:20])
        
        if decoded_str.startswith("AU_yqL"):
            print("Is AU_yqL link, fetching via batch execute...")
            res = fetch_decoded_batch_execute([base64_str])
            return res
        else:
            return {"status": True, "url": decoded_str}
    except Exception as e:
        return {"status": False, "error": str(e)}

source_url = "https://news.google.com/rss/articles/CBMi3wFBVV95cUxNSVNWT1ktUnhfSHowVGNULW1OYXNVeUlXTkFMdXJOSEZqdlhYTWFYZEhVMDJhczNyMW5DcjJHNHc5c04yc3RrclhYRG5LRFZaOU5CdmZnR0owUVBjSXIzNkRWMW1mRGllN0Z5OWtZV2xIWU5tLXlYbGg2Um9PX2VLT1lqSzg3WTRFUEdMZzJiVUxLWUVHSVhWM2NBYjVpWVg5MXNQWjUxY0s4Vk9ZWlJ2QnJwbW9QXzNXUjFLSmlvOTFiOVNnYmd6eUR4UEtmNDExeGd6VHZwUnI0Nk0yQlpQ0gHkAUFVX3lxTFBqUklsa3F5WVdkQ3dzbzg3b1ZST0ppbmpwekNya0dnYmljYXNIN2Y3RnFKSUUtcGw1LU9sUkhuc25YbDhRVTRqY25zZ3RpeERXRFJoYlg5UzJCYjd3bGJQWTBiWDNtcVFPWWY3Vi1rSnlTQXFoZk9VRVRXRmNKNGNDdVRQY1JGQmhUT2JkWkE4T1NwSEhRcEtkZ2FSdl9LOW50SUd6aFl2ckdTYk9DYThWbXVFSnVxWlRPWmZ3WXBvNmlQUl9yMk5tV2J4NGIxNzFkWVVWUFpOSUtfM1NBWlNPcjBjVg?oc=5"
print(decode_url(source_url))
