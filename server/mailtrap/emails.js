import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailTrapClient, sender } from "./mailtrap.config.js"


export const sendVerificationEmail = async (email, verificationToken)=>{
    const recipient = [{email}]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject:"verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        })

        console.log("email sent successfully", response )
    } catch (error) {
        console.log(`Error sending verification email`, error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}