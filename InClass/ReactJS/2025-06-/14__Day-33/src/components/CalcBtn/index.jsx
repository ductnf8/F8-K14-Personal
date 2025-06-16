//prop
export const CalcBtn = (props) => {
    const {text, backgroundColor} = props
    const onClick = () => {
        console.log('OnClick')
    }

    return (
        <div style={{backgroundColor}} className={'btn'} onClick={() => onClick()}>{text}</div>
    )

}