## 기억력 게임

<a href="https://velog.io/@teo/2021-%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B3%B5%EB%B6%80%EB%B2%95-%EC%9E%85%EB%AC%B8%EC%9E%90%ED%8E%B8-%EC%BB%A4%EB%A6%AC%ED%81%98%EB%9F%BC">웹 프론트엔드 공부법-teo.log</a>의 메모리게임을 리액트와 타입스크립트를 이용해서 만들었습니다.

### 사용한 툴

- React
- Typescript
- Styled-components

![ezgif.com-gif-maker (2).gif](<https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5d36d16-cc00-4075-95a1-1967d0674a34/ezgif.com-gif-maker_(2).gif>)

구현한 모습입니다. 글을 보고 똑같이 구현하고 허전한 것 같아서 색을 변경하고 변경한 김에 애니메이션 추가를 고민하다가 겨울이니까 눈내리는 애니메이션도 구현했습니다.

## 첫 구현

- 첫 구현 코드는 first-make branch에 있습니다.

저는 이 게임을 총 두 번 구현했습니다. 처음에 구현할 때는 그래도 모든 기능은 다 완료했으나 타입스크립트를 오래하지는 않았지만 오랜만에 하는거라 기억이 잘 나지 않아서 타입스크립트를 사용하는 것에 집중을 하다보니 다음의 문제에 맞닥뜨렸습니다.

### 1. 코드의 흐름이 뒤죽박죽입니다.

첫 구현을 할 때 게임 시작 전(스타트 버튼 누르기 전), 카드 애니메이션 턴, 유저 턴 이 세가지 상태를 이용해서 구현하는 것이 흐름을 이해하기 좋다고 생각했습니다. 그래서 useEffect의 디펜던시로 status를 감지하여 status의 상태가 변경되었을 때로 게임의 시작을 확인하였는데 이 방식이 코드의 흐름을 뒤죽박죽으로 만들어서 코드를 변경하려고 했을 때 복잡해서 어떤 것부터 건드려야 될 지 확신이 서지 않았습니다.

### 2. 한 번 클릭해서 animation을 적용한 경우 한 번 더 클릭할 경우 animation이 적용되지 않았습니다.

위의 영상을 보면 도형을 한 번 클릭하면 색이 변하는 애니메이션이 적용이 되었습니다. 첫 구현을 할 때는 기능을 구현하고 이 애니메이션을 적용하려고 했으나 active의 상태를 변경해서 애니메이션을 적용하는 방식으로 구현했었는데 이 방식으로 하면 한 번 더 클릭할 경우 상태가 이미 변경되어서 animation이 적용되지 않았습니다. 다시 구현하게 된 가장 큰 이유입니다.

### 3. 맞췄을 경우 모든 화면에 animation을 동작시키고 싶었지만 구현하지 못했습니다.

맞췄을 경우 모든 화면에 색을 변경하는 animation을 주고 싶었으나 코드가 복잡해서 구현하는데 어려움을 느꼈습니다.

```jsx
useEffect(() => {
  if (status === "gaming") {
    const currentGame = [...game];
    const interval = setInterval(() => {
      if (currentGame.length) {
        setCurrent(currentGame.shift());
      }
      if (!currentGame.length) {
        setStatus("Your Turn");
        clearInterval(interval);
      }
    }, 1000);
  }
}, [status]);
```

## 다시 구현하기

위의 문제들을 겪고 위의 문제들을 해결하면서 한 번 더 구현하기로 마음을 먹었습니다.

### 1. 코드의 흐름을 이해하기 쉽게하기

`useEffect`를 사용해서 status가 변경되면 이벤트를 발생시키기 ⇒ 버튼을 클릭할 경우 `handleGaming`이란 함수 실행시키기로 변경했습니다. 버튼을 클릭하는 함수에 바로 코드를 작성하지 않고 `handleGaming`이라는 함수를 따로 만든 이유는 이벤트가 발생하는 경우가 `start`버튼을 누른 경우 그리고 정답을 맞춘 경우이므로 `handleGaming`이라는 함수를 따로 만들었습니다.

### 2. 애니메이션 초기화하기

useState 훅을 이용해서 요소를 클릭하면 상태를 true로 변경하는 방식으로 애니메이션을 적용하면 요소를 한 번 더 클릭할 경우 이전에 상태가 이미 true로 설정되서 애니메이션이 발생하지 않았습니다. 이러한 문제를 해결하기 위해 우선 부모 컴포넌트에서 자식 컴포넌트의 상태를 관리하는 구조로 변경하였습니다. 다음 문제로 애니메이션이 끝나고 혹은 다른 상황이든 이벤트를 상황에 맞게 이벤트를 발생시킬 수 있는 것이 필요했는데 공홈에서 `onAnimationEnd` 라는 합성 이벤트를 찾아서 적용하였습니다.이름에서 보면 알 수 있듯이 애니메이션이 끝나면 발생되는 이벤트입니다.

### 3. 정답을 맞출 경우 요소에 전부 이벤트 주기

부모 컴포넌트에서 자식들의 컴포넌트를 관리하다보니 상태를 변경해서 모든 요소에 애니메이션을 적용하고 `onAnimationEnd` 를 통해 상태를 초기화해서 쉽게 구현할 수 있었습니다.

```jsx
const onClickStartBtn = () => {
  handleGaming();
};
const handleGaming = () => {
  const random = getRandomArbitrary(0, 9);
  const gaming = [...currentGame, random];
  setStatus(GAME);
  setCurrentGame([...currentGame, random]);
  setCurrentClicked([]);
  const interval = setInterval(() => {
    if (gaming.length) {
      const currentTarget = gaming.shift();
      setMemory((prev) => {
        return prev.map((item) => {
          return item.contentId === currentTarget
            ? { ...item, target: true }
            : { ...item };
        });
      });
    }
    if (!gaming.length) {
      setStatus(USER);
      clearInterval(interval);
    }
  }, 1000);
};
```

### 4. 눈 적용하기

기능을 다 구현하고 재밌는 요소를 추가하고 싶어서 예전에 봤던 눈내리는 애니메이션을 추가했습니다. 밑의 블로그를 보고 내용을 너무 쉽게 정리해주셔서 빠르게 적용할 수 있었습니다.

```tsx
const SnowFlakes = ({ random, delay }: SnowFlakesType) => {
  return (
    <Snow random={random} delay={delay}>
      {"\u2745"}
    </Snow>
  );
};
const fall = keyframes`
  0% {
    opacity: 0;
  };
  5% {
    opacity: 0.9;
  };
  50% {
    opacity: 0.9;
  };
  100% {
    transform: translate(0, 650px);
    opacity: 0;
  };
  `;
const Snow = styled.p<SnowFlakesType>`
  opacity: 0;
  font-size: ${(props) => props.random + "px"};
  animation: ${fall} 4s linear infinite;
  animation-delay: ${(props) => props.delay}s;
  color: white;
  height: 13px;
  @media screen and (max-width: 650px) {
    font-size: ${(props) => props.random - 5}px;
  }
`;
```

핵심 코드로, 우선 유니코드로 `Snow`에 눈을 그렸습니다. 그리고 랜덤으로 `font-size`(눈의 크기), `animation-delay`(눈이 내리는 순서)를 주고 `fall`애니매이션을 적용했습니다. 마지막으로 `Snow` 컴포넌트를 눈을 풍성하게 내릴 만큼 만들어서 적용했습니다.

참고:[https://flyingsquirrel.medium.com/다노샵에-눈이-와요-4033065f5f79](https://flyingsquirrel.medium.com/%EB%8B%A4%EB%85%B8%EC%83%B5%EC%97%90-%EB%88%88%EC%9D%B4-%EC%99%80%EC%9A%94-4033065f5f79)

## ❗느낀점

### 부모 컴포넌트에서 관리하기

자식 컴포넌트에서 상태를 관리하는 것에 불편함이 없다면 자식컴포넌트에서 상태를 관리하는 것이 더 코드를 이해하기 쉽고 유지보수 하기 쉽다고 생각했습니다. 단순하게 자식 컴포넌트의 요소를 클릭하면 애니메이션이 발생하는데 굳이 부모컴포넌트에서 상태를 관리해야 되나라고 생각했으나 대실패였습니다. 애니메이션이 발생하는 경우는 클릭만 있던 것이 아니었고 상태를 초기화해야 되는 여러 상황도 존재했습니다. 앱을 구현할 때 모든 상태에 대해서 일일히 체크할 수 있는 실력이 아닌이상 우선 부모 컴포넌트로 구현하고 그 다음에 리팩토링하는 순으로 진행하는게 더 효율적인 것 같습니다.

### 코드의 흐름을 억지로 설정하지 않기?

useEffect를 이용해서 상태를 감지하는 방식으로 구현했는데 기존의 코드를 수정해야 될 때 코드가 복잡하고 이리저리 왔다갔다 하는 느낌을 받았습니다. 생각해보면 클릭하면 상태를 변경하고 변경한 상태로 이벤트를 발생시킨다? 말도 안되는 구조였습니다. 이해하기 쉬운 코드를 작성한다는 생각으로 한 것이지만 억지로 오히려 역효과를 나타낸 것 같습니다.

### 모르는 것이 있을 때 알고있는 것을 적용해보고 안되면 다른 방법을 찾아보기

이번 프로젝트를 하면서 가장 크게 느낀 것입니다. 끝나고 보니 `onAnimationEnd`라는 이벤트가 있는 줄도 모르고 animation이 발생하고 상태를 초기화를 해야 될 때 안되는 것을 알지만 `useEffect`도 적용해보고, `useLayoutEffect`도 적용해보는 등 적용해보고 해결이 되지 않을 때 제가 이해하고 있는 것을 한정하고 정보를 찾으려고 했던 것 같습니다. 알고 있는 것에 한정하는 것이 아니라 검색의 폭을 넓게 설정해야 될 것 같습니다.
