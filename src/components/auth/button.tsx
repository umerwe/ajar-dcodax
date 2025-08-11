import { Button } from '../ui/button'

interface AuthButtonProps {
    text: string,
    className?: string
}

const AuthButton = ({ text, className }: AuthButtonProps) => {
    return (
        <Button
            variant="destructive"
            // disabled={isPending}
            className={`w-full text-white py-5.5 px-4 rounded-full font-semibold
                 hover:from-teal-500 hover:to-teal-600 focus:outline-none 
                 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all 
                 duration-200 text-sm shadow-lg ${className}`}
            type="submit"
        >
            {text}
            {/* {isPending ? "Signing In..." : "Sign In"} */}
        </Button>
    )
}

export default AuthButton
