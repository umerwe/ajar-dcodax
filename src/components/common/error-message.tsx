
interface ErrorMessageProps {
  message?: string
}

const ErrorMessage = ({ message = "Failed to fetch listings." }: ErrorMessageProps) => {

  return (
    <div className="flex flex-col items-center justify-center mt-30 py-8 space-y-4">
      <p className="text-center text-red-600 text-lg font-semibold">{message}</p>
    </div>
  )
}

export default ErrorMessage
