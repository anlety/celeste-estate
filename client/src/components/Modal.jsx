

const Modal = ({children}) => {
  return (
    <div className="fixed inset-0 w-full bg-blend-overlay  h-screen opacity-50">
      <button>X</button>
      <div className="fixed top-0 left-0 shadow-lg bg-red-100 transform translate-x-50 translate-y-50">{children}</div>
    </div>
    
  )
}

export default Modal