"use server"
import { cookies } from "next/headers";
import { getUserId } from "../utility/responseUtils";
import { ActionError } from "../interfaces/ErrorRes";
import { updateUserSchema } from "../lib/validators/User";
import { User } from "../models/User";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connectDB } from "../db/db";

export const updateUser = async (prevSate: any, formData: FormData): ActionError => {
    await connectDB();
    const userId = await getUserId(await cookies());
    if (!userId) {
        return { errors: { _form: ['User not found'] } };
    }
    const UserData = Object.fromEntries(
        Array.from(formData.entries()).filter(([key, value]) => !key.startsWith('$') && value != '')
    );
    const user = updateUserSchema.safeParse(UserData);
    if (!user.success) {
        return {
            errors: user.error.flatten().fieldErrors,
        }
    }
    await User.findOneAndUpdate({ _id: userId }, { $set: user.data })
    revalidatePath('/account');
    redirect('/');
}