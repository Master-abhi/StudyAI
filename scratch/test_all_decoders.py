import googlenewsdecoder

source_url = "https://news.google.com/rss/articles/CBMi3wFBVV95cUxNSVNWT1ktUnhfSHowVGNULW1OYXNVeUlXTkFMdXJOSEZqdlhYTWFYZEhVMDJhczNyMW5DcjJHNHc5c04yc3RrclhYRG5LRFZaOU5CdmZnR0owUVBjSXIzNkRWMW1mRGllN0Z5OWtZV2xIWU5tLXlYbGg2Um9PX2VLT1lqSzg3WTRFUEdMZzJiVUxLWUVHSVhWM2NBYjVpWVg5MXNQWjUxY0s4Vk9ZWlJ2QnJwbW9QXzNXUjFLSmlvOTFiOVNnYmd6eUR4UEtmNDExeGd6VHZwUnI0Nk0yQlpQ0gHkAUFVX3lxTFBqUklsa3F5WVdkQ3dzbzg3b1ZST0ppbmpwekNya0dnYmljYXNIN2Y3RnFKSUUtcGw1LU9sUkhuc25YbDhRVTRqY25zZ3RpeERXRFJoYlg5UzJCYjd3bGJQWTBiWDNtcVFPWWY3Vi1rSnlTQXFoZk9VRVRXRmNKNGNDdVRQY1JGQmhUT2JkWkE4T1NwSEhRcEtkZ2FSdl9LOW50SUd6aFl2ckdTYk9DYThWbXVFSnVxWlRPWmZ3WXBvNmlQUl9yMk5tV2J4NGIxNzFkWVVWUFpOSUtfM1NBWlNPcjBjVg?oc=5"

decoders = [
    ("decoderv1", googlenewsdecoder.decoderv1),
    ("decoderv2", googlenewsdecoder.decoderv2),
    ("decoderv3", googlenewsdecoder.decoderv3),
    ("decoderv4", googlenewsdecoder.decoderv4),
    ("new_decoderv1", googlenewsdecoder.new_decoderv1),
    ("gnewsdecoder", googlenewsdecoder.gnewsdecoder)
]

for name, func in decoders:
    try:
        res = func(source_url)
        print(f"{name} result:", res)
    except Exception as e:
        print(f"{name} error:", e)
