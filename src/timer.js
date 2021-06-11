import React from 'react'

function TimerComponent() {
    const [time, setTime] = React.useState(0) /* 변수의 기본값들은 0으로 시작한다 */
    console.log('컴포넌트 업데이트')

    React.useEffect(function () {
        setTime(time+1)
    }, []) // 주로 한 번만 실행 호출
    // }, [time]) // time 이 update 되면 무한정 호출 된다 | 함수의 호출시점을 결정할 수 있다

    return <div>
        <h3>{time}초</h3>
        <button>1씩 올려주세요</button>
    </div>
}

export default TimerComponent