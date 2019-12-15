# 프로젝트 실행
dev branch에서 작업하시는 걸 권장합니다.

## 가상환경 설치
다음 명령어를 입력해 가상환경을 설치할 수 있습니다.
litmus-site는 python 2.7 버전을 사용합니다. 따라서 가상환경도 python 2.7 버전으로 설치해야 합니다.
```
pip install virtualenv
virtualenv venv --python=python2.7
```
## 모듈 설치
모듈을 설치하기 전에 가상환경을 실행해야 합니다.
프로젝트에 필요한 모듈은 requirements.txt에 정의되어 있고, 다음 명령어를 통해 한 번에 필요한 모듈을 설치할 수 있습니다.
```
pip install -r requirements.txt
```
> 간혹 `mysqlclient` 모듈을 설치하다 오류가 발생할 수 있습니다. 따로 mysqlclient를 설치한 후 다시 진행해 주세요.

## 설정 파일
`dmoj` 디렉토리에 `local_settings.py`를 만들어 줍니다. 
`local_settings.py`의 내용은 `settings.py`를 그대로 복사한 후, 파일의 맨 마지막에 있는 다음의 내용을 지워줍니다.
```
try:
    with open(os.path.join(os.path.dirname(__file__), 'local_settings.py')) as f:
        exec f in globals()
except IOError:
    pass
```
이후 `local_settings.py`에 정적 파일과 미디어 파일의 경로를 추가해줘야 합니다. `local_settings.py`에 다음의 내용을 추가해 주세요.
```
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
```
캐시 설정도 해주어야 합니다. 현재 `local_settings.py`에서 `CACHES = {}`라고 되어있는 부분을 다음과 같이 바꿔주세요.
```
CACHES = {
    'default': {
        'django.core.cache.backends.locmem.LocMemCache'
    }
}
```

## git submodule 설치
다음 명령어를 통해 필요한 submodule을 설치합니다.
```
git submodule init
git submodule update
```

## 마지막 단계
다음 명령어를 통해 정적 파일을 모아줍니다.
```
python manage.py collectstatic
```

다음 명령어를 통해 데이터베이스를 마이그레이션 해줍니다.
```
python manage.py migrate
```

다음 명령어를 통해 서버를 실행시킵니다.
```
python manage.py runserver
```
