function ChildComponent(props) {
    const {name, age} = props /* 구조분해를 이용하여 할당시킴 */
    return <div>
        <p>이름은 {name} 이며, {age} 살 입니다</p>
    </div>
}

export default ChildComponent