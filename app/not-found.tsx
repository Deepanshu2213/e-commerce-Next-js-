import { Navbar } from "./components/Navbar";

export default function NotfoundPage() {
    return <div className="bg-slate-900 w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 w-full flex items-center justify-center">
            <h1 className="text-4xl font-bold text-slate-100 text-center">404 - Page Not Found</h1>
        </div>
    </div>
}