export default function Button({ children, color, ...props }) {
  return (
    <button
      {...props}
      className={`bg-${color}-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-${color}-600 transition-colors duration-300`}
    >
      {children}
    </button>
  )
}