export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
    >
      {children}
    </button>
  )
}