
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from "@/api/auth"
import { useNavigate } from "react-router"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type LoginFormProps = {}

export default function LoginForm({ }: LoginFormProps) {

    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const password = values.password === "" ? null : values.password;
        const response = await login(values.email, password);
        if (response.firstLogin) {
            navigate("/create-password");
        }

        else if (response.error) {
            if (response.error === "INVALID_USER") {
                form.setError("email", {
                    type: "manual",
                    message: response.message,
                })
            }
            else if (response.error === "INVALID_PASSWORD") {
                form.setError("password", {
                    type: "manual",
                    message: response.message,
                })
            }
            else {
                form.setError("password", {
                    type: "manual",
                    message: response.message,
                })
            }
        }
        else {
            navigate("/dashboard");
        }

    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-5">
                        <Button type="submit">Login</Button>
                        <Button disabled={true} variant={"secondary"}>Register </Button>
                    </div>
                </form>
            </Form>

        </>
    )
}