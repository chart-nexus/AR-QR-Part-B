import re


def match_urls(target, urls):
    for url in urls:
        if len(re.findall(url, target)) == 1:
            return True
    return False


if __name__ == "__main__":
    print(match_urls("/login", ['/login', '/login/', '/login/refresh', '/files/(\d+)/pdf']))
