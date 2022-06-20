import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.length > 0) {
    return <div style={style}>{notification}</div>
  }

  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

export default Notification