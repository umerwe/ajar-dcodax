import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, signUpUser } from "@/services/auth";
import { AxiosError } from "axios";

export const useSignup = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: signUpUser,
        onSuccess: () => {
            router.push("/auth/login");
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            alert(err.response?.data?.message || "Registration failed.");
        },
    });
    return mutation;
};

export const useLogin = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (token: string) => {
            localStorage.setItem("token", token);
            router.push("/");
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            alert(err.response?.data?.message || "Login failed. Please try again.");
        },
    });

    return mutation;
};
