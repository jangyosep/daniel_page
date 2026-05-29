# 우리 아이의 작은 앨범

Daniel 사진 5장을 담은 귀여운 반응형 사진 앨범 사이트입니다. GitHub Pages에 올리면 휴대폰에서도 주소로 볼 수 있습니다.

## 사진 넣는 방법

1. 사진 파일을 `images` 폴더에 넣습니다.
2. 파일명은 영문, 숫자, 하이픈 위주로 바꾸는 것을 추천합니다.
   - 좋은 예: `first-smile.jpg`, `family-day.png`
   - 피할 예: `우리 아이 사진 1.jpg`
3. `script.js`의 `photos` 목록에서 `src` 값을 사진 경로로 바꿉니다.

```js
{
  title: "활짝 웃은 날",
  description: "처음으로 크게 웃어준 날",
  src: "images/first-smile.jpg",
}
```

사진을 더 추가하려면 같은 형식의 항목을 하나 더 복사해서 붙여 넣으면 됩니다.

현재 등록된 사진은 아래 파일입니다.

- `images/daniel-01.jpg`
- `images/daniel-02.jpg`
- `images/daniel-03.jpg`
- `images/daniel-04.jpg`
- `images/daniel-05.jpg`

## GitHub Pages로 보기

1. 이 폴더를 GitHub 저장소에 올립니다.
2. GitHub 저장소에서 `Settings` 메뉴로 이동합니다.
3. `Pages` 메뉴에서 배포 브랜치를 `main` 또는 `master`로 선택합니다.
4. 저장 후 표시되는 Pages 주소를 휴대폰에서 열면 됩니다.
