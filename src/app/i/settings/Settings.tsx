import { TypeUserForm } from "@/types/auth.types"
import { useForm } from "react-hook-form"

export function Settings() {
    const {register, handleSubmit, reset} = useForm<TypeUserForm>({
        mode: "onChange"
    })


    return <div>
        <h1>Settings</h1>
    </div>
}