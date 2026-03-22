"use client"
import { useActionState } from "react"
import { UserI } from "../models/User"
import { updateUser } from "../actions/user.action"
import { GetErrorElements } from "../utility/responseUtils"

export const UserInfo = ({ user }: { user: UserI | null }) => {
    const [state, dispatch, loading] = useActionState(updateUser, { errors: {} });
    const { errors } = state;
    return <div className="p-4 sm:p-8 flex justify-center">
        <form className="w-full justify-items-center" action={dispatch}>
            <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-700/50">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-3">Account Info</h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">View / Edit Details & Add Address</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label htmlFor="firstName" className="block text-slate-400 text-sm sm:text-base p-2">First Name <span className="text-rose-500">*</span></label>
                        <input type="text" id="firstName" name="firstName" className="w-full px-4 py-2 rounded-lg bg-slate-950/50 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter the first name" defaultValue={user?.firstName} />
                        {GetErrorElements('firstName', errors)}
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="lastName" className="block text-slate-400 text-sm sm:text-base p-2">Last Name <span className="text-rose-500">*</span></label>
                        <input type="text" id="lastName" name="lastName" className="w-full px-4 py-2 rounded-lg bg-slate-950/50 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent " placeholder="Enter the last name" defaultValue={user?.lastName} />
                        {GetErrorElements('lastName', errors)}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label htmlFor="email" className="block text-slate-400 text-sm sm:text-base p-2">Email <span className="text-rose-500">*</span></label>
                        <input type="email" id="email" name="email" className="w-full min-w-0 px-4 py-2 rounded-lg bg-slate-950/50 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter the email" defaultValue={user?.email || ''} />
                        {GetErrorElements('email', errors)}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label htmlFor="password" className="block text-slate-400 text-sm sm:text-base p-2">Password <span className="text-rose-500">*</span></label>
                        <input type="password" id="password" name="password" className="w-full min-w-0 px-4 py-2 rounded-lg bg-slate-950/50 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter the password" defaultValue={user?.password || ''} />
                        {GetErrorElements('password', errors)}
                    </div>
                    <div className="col-span-2 row-span-4">
                        <label htmlFor="address" className="block text-slate-400 text-sm sm:text-base p-2">Address <span className="text-rose-500">*</span></label>
                        <textarea id="address" name="address" className="w-full min-w-0 px-4 py-2 rounded-lg bg-slate-950/50 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter the address"></textarea>
                        {GetErrorElements('address', errors)}
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <button
                            className="m-2 w-full px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 flex items-center justify-center gap-2"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Update'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>

    </div>
}