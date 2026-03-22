import { IUser, User, UserI } from "@/app/models/User";
import { getById } from "@/app/utility/dbCallUtil";
import { cookies } from "next/headers";
import { getUserId, sanatizePayload } from "@/app/utility/responseUtils";
import { connectDB } from "@/app/db/db";
import { UserInfo } from "@/app/components/EditUserInfo";

export default async function AccountPage() {
    await connectDB();
    let userId = await getUserId(await cookies());
    if (!userId) {
        return <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 flex justify-center">
            <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-700/50">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-3">Account Info</h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">View / Edit Details & Add Address</p>
                </div>
            </div>
        </div>
    }
    const user = await getById<IUser, UserI>(User, userId);
    return <UserInfo user={sanatizePayload(user)} />
}