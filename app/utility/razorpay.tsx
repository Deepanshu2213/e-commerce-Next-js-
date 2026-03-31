import Razorpay from "razorpay";

export class RazorPayUtil {
    static razorpayInstance: Razorpay | undefined;
    constructor() { }
    static getRazorpay(): Razorpay {
        if (!this.razorpayInstance) {
            this.razorpayInstance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID!,
                key_secret: process.env.RAZORPAY_KEY_SECRET!,
            })
        }
        return this.razorpayInstance;
    }
}